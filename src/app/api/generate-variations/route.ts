import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with proper error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
        contentType === "price"
          ? "- Different price points and discount strategies\n- Price anchoring techniques\n- Bundling options"
          : contentType === "cta"
          ? "- Different action words and urgency\n- Value proposition emphasis\n- Social proof elements"
          : contentType === "description"
          ? "- Different feature emphasis\n- Benefit-focused vs feature-focused\n- Storytelling approaches"
          : "- Different messaging angles\n- Emotional vs rational appeals\n- Length variations"
      }`;

    const userPrompt =
      contentType === "image"
        ? `Find 3 different Unsplash photo page URLs of black dropper bottles. The images should be:
          - High quality professional product photos
          - Clear and well-lit
          - Showing the dropper bottle from different angles
          - Mix of close-up and full product shots
          - Clean backgrounds that highlight the product

          Current image URL: "${currentContent}"
          
          Search Unsplash for "black dropper" and return 3 random photo page URLs from the results.
          Return only the URLs in the format https://unsplash.com/photos/{photo-id}, one per line, with no additional text or formatting.`
        : `Generate 3 different variations for the following element: ${elementId}\nCurrent content: "${currentContent}"\nFocus on creating variations that would be good for A/B testing. Each variation should be significantly different from the others.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    if (!completion.choices[0]?.message?.content) {
      return NextResponse.json({ error: "Failed to generate variations" }, { status: 500 });
    }

    const variations = completion.choices[0].message.content
      ?.split("\n")
      .filter((line) => line.trim())
      .map((content) => ({
        content: content.trim().replace(/^\d+\.\s*/, ""), // Remove numbering if present
        elementId,
        timestamp: new Date().toISOString(),
        contentType,
      }));

    if (variations.length === 0) {
      return NextResponse.json({ error: "No variations generated" }, { status: 500 });
    }

    // For image variations, ensure the content is a valid URL
    if (contentType === "image") {
      const invalidUrls = variations.filter((v) => !v.content.startsWith("http"));
      if (invalidUrls.length > 0) {
        return NextResponse.json(
          {
            error: "Invalid image URLs generated",
            details: "Some variations are not valid URLs",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ variations });
  } catch (error) {
    console.error("Error generating variations:", error);
    return NextResponse.json(
      {
        error: "Failed to generate variations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
