"use client";

import { useState, useEffect, useRef } from "react";

export default function ABTestingPage() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [testVariations, setTestVariations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentContent, setCurrentContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Add message listener for iframe communication
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "elementSelected") {
        setSelectedElement(event.data.elementId);
        setCurrentContent(event.data.content);
        setError(null);
      } else if (event.data.type === "elementHovered") {
        setHoveredElement(event.data.elementId);
      } else if (event.data.type === "elementUnhovered") {
        setHoveredElement(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Function to handle element selection in the preview
  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId);
  };

  // Function to generate variations using OpenAI
  const generateVariations = async () => {
    if (!selectedElement) return;

    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-variations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elementId: selectedElement,
          currentContent: currentContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate variations");
      }

      if (!data.variations || data.variations.length === 0) {
        throw new Error("No variations were generated");
      }

      // Group variations by removing "Variation X:" entries and keeping content only
      const groupedVariations = data.variations.filter((variation: any) => {
        return !variation.content.startsWith("Variation");
      });

      setTestVariations(groupedVariations);
    } catch (error) {
      console.error("Error generating variations:", error);
      setError(error instanceof Error ? error.message : "Failed to generate variations");
      setTestVariations([]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to apply a variation
  const applyVariation = (variation: any) => {
    try {
      // Store the variation in localStorage
      const currentTests = JSON.parse(localStorage.getItem("ab-tests") || "{}");
      currentTests[selectedElement!] = variation;
      localStorage.setItem("ab-tests", JSON.stringify(currentTests));

      // Send message to iframe to update the content
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "applyVariation",
            elementId: selectedElement,
            content: variation.content,
          },
          "*"
        );
      }
    } catch (error) {
      console.error("Error applying variation:", error);
      setError("Failed to apply variation");
    }
  };

  // Function to inject selection script into iframe
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const script = `
      // Add styles for hover and selection effects
      const style = document.createElement('style');
      style.textContent = \`
        [data-test-id]:hover {
          outline: 2px dashed #3b82f6;
          cursor: pointer;
        }
        [data-test-id].selected {
          outline: 2px solid #10b981;
          background-color: rgba(16, 185, 129, 0.1);
        }
        [data-test-id].hovered {
          outline: 2px dashed #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
        }
      \`;
      document.head.appendChild(style);

      // Function to get element content based on its type
      const getElementContent = (element) => {
        if (element.tagName === 'IMG') {
          return element.src;
        } else if (element.tagName === 'BUTTON') {
          return element.textContent;
        } else if (element.tagName === 'INPUT') {
          return element.value;
        } else {
          return element.textContent;
        }
      };

      // Function to handle element hover
      const handleElementHover = (element) => {
        element.classList.add('hovered');
        window.parent.postMessage({
          type: 'elementHovered',
          elementId: element.getAttribute('data-test-id')
        }, '*');
      };

      // Function to handle element unhover
      const handleElementUnhover = (element) => {
        element.classList.remove('hovered');
        window.parent.postMessage({
          type: 'elementUnhovered'
        }, '*');
      };

      // Add hover listeners to all testable elements
      document.querySelectorAll('[data-test-id]').forEach(element => {
        element.addEventListener('mouseenter', () => handleElementHover(element));
        element.addEventListener('mouseleave', () => handleElementUnhover(element));
      });

      // Handle element selection
      document.addEventListener('click', (e) => {
        const element = e.target.closest('[data-test-id]');
        if (element) {
          e.preventDefault();
          e.stopPropagation();
          
          // Remove selection from previously selected element
          document.querySelectorAll('[data-test-id].selected').forEach(el => {
            el.classList.remove('selected');
          });
          
          // Add selection to clicked element
          element.classList.add('selected');
          
          window.parent.postMessage({
            type: 'elementSelected',
            elementId: element.getAttribute('data-test-id'),
            content: getElementContent(element)
          }, '*');
        }
      });

      // Listen for variation updates
      window.addEventListener('message', (event) => {
        if (event.data.type === 'applyVariation') {
          const element = document.querySelector(\`[data-test-id="\${event.data.elementId}"]\`);
          if (element) {
            if (element.tagName === 'IMG') {
              element.src = event.data.content;
            } else if (element.tagName === 'INPUT') {
              element.value = event.data.content;
            } else {
              element.textContent = event.data.content;
            }
          }
        }
      });
    `;

    if (iframe.contentWindow) {
      const scriptElement = iframe.contentWindow.document.createElement("script");
      scriptElement.textContent = script;
      iframe.contentWindow.document.head.appendChild(scriptElement);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">A/B Testing Settings</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <div className="relative">
              <iframe
                ref={iframeRef}
                id="preview-iframe"
                src="/"
                className="w-full h-[600px] border rounded"
                title="E-commerce Preview"
                onLoad={handleIframeLoad}
              />
              {hoveredElement && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                  Hovering: {hoveredElement}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Test Settings</h2>

            {selectedElement ? (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Selected Element:</p>
                  <p className="text-gray-600">{selectedElement}</p>
                </div>
                <div>
                  <p className="font-semibold">Current Content:</p>
                  <p className="text-gray-600">
                    {selectedElement.includes("image") ? (
                      <img src={currentContent} alt="Selected" className="max-w-full h-auto" />
                    ) : (
                      currentContent
                    )}
                  </p>
                </div>
                <button
                  onClick={generateVariations}
                  disabled={isGenerating}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 w-full"
                >
                  {isGenerating ? "Generating..." : "Generate Variations"}
                </button>

                {testVariations.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Generated Variations:</h3>
                    {testVariations.map((variation, index) => (
                      <div key={index} className="border p-2 rounded">
                        <p className="font-medium mb-2">Variation {index + 1}:</p>
                        {selectedElement.includes("image") ? (
                          <img src={variation.content} alt="Variation" className="max-w-full h-auto mb-2" />
                        ) : (
                          <p className="text-gray-700">{(variation.content as string).replace(/\"/g, "")}</p>
                        )}
                        <button
                          onClick={() => applyVariation(variation)}
                          className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-600">Click on any element in the preview to select it for testing</p>
                <p className="text-sm text-gray-500 mt-2">Hover over elements to see which ones can be selected</p>
                <div className="mt-4 space-y-2 text-left">
                  <p className="text-sm font-semibold">Testable Elements:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>Product names</li>
                    <li>Product prices</li>
                    <li>Product descriptions</li>
                    <li>Product images</li>
                    <li>Add to Cart buttons</li>
                    <li>Any element with data-test-id attribute</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
