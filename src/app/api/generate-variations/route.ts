import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with proper error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generatePriceVariations(basePrice: number): number[] {
  // Convert base price to number if it's a string
  const price = typeof basePrice === "string" ? parseFloat((basePrice as string).replace("$", "")) : basePrice;

  // Generate variations with different pricing strategies
  const variations = [
    price * 0.9, // 10% lower
    price * 1.1, // 10% higher
    Math.floor(price * 0.95), // Psychological pricing (e.g., $9.99)
    Math.ceil(price * 1.05), // Rounded up price
    price * 0.8, // 20% lower (clearance)
    price * 1.2, // 20% higher (premium)
  ];

  // Format prices with $ and 2 decimal places
  return variations.map((p) => parseFloat(p.toFixed(2)));
}

export async function POST(request: Request) {
  try {
    const { elementId, currentContent } = await request.json();

    if (!elementId || !currentContent) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Determine the type of content based on the element ID
    let contentType = "text";
    if (elementId.includes("price")) {
      contentType = "price";
    } else if (elementId.includes("button") || elementId.includes("cta")) {
      contentType = "cta";
    } else if (elementId.includes("description")) {
      contentType = "description";
    } else if (elementId.includes("image")) {
      contentType = "image";
    }

    let variations = [];

    if (contentType === "price") {
      // Generate price variations
      const priceVariations = generatePriceVariations(currentContent);
      variations = priceVariations.map((price, index) => ({
        content: `$${price}`,
        type: "price",
        strategy: [
          "10% Discount",
          "10% Premium",
          "Psychological Pricing",
          "Rounded Up",
          "Clearance Price",
          "Premium Price",
        ][index],
      }));
    } else {
      const systemPrompt =
        contentType === "image"
          ? `You are an expert at finding relevant product images on Unsplash.
      Your task is to find 3 different black dropper bottle images that would work well for product photography.
      Focus on finding high quality, professional product photos that showcase the dropper bottle clearly.
      Return the Unsplash photo page URLs in the format: https://unsplash.com/photos/{random-name-photo}
      Note: random-name-photo is a random name of the photo, not the photo id.`
          : `You are an expert A/B testing specialist for e-commerce websites. 
      Generate 3 different variations for the given content that would be effective for A/B testing.
      Focus on creating variations that could potentially improve conversion rates.
      For ${contentType} content, consider the following:
      ${
        contentType === "cta"
          ? "- Different action words and urgency\n- Value proposition emphasis\n- Social proof elements"
          : contentType === "description"
          ? "- Different feature emphasis\n- Benefit-focused vs feature-focused\n- Storytelling approaches"
          : "- Different messaging angles\n- Emotional vs rational appeals\n- Length variations"
      }`;

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: currentContent },
        ],
        model: "gpt-3.5-turbo",
      });

      variations =
        completion.choices[0].message.content
          ?.split("\n")
          .filter((line) => line.trim() && !line.startsWith("Variation"))
          .map((content, index) => ({
            content: content.trim(),
            type: contentType,
            strategy: `Variation ${index + 1}`,
          })) || [];
    }

    return NextResponse.json({ variations });
  } catch (error) {
    console.error("Error generating variations:", error);
    return NextResponse.json({ error: "Failed to generate variations" }, { status: 500 });
  }
}
