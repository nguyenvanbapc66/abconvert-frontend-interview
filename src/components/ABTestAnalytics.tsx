"use client";

import { useState, useEffect } from "react";

interface TestInteraction {
  elementId: string;
  action: string;
  group: "A" | "B";
  timestamp: string;
}

interface TestVariation {
  content: string;
  elementId: string;
  timestamp: string;
  contentType: string;
}

export default function ABTestAnalytics() {
  const [interactions, setInteractions] = useState<TestInteraction[]>([]);
  const [activeTests, setActiveTests] = useState<Record<string, TestVariation>>({});
  const [selectedTimeRange, setSelectedTimeRange] = useState<"day" | "week" | "month">("week");

  useEffect(() => {
    // Load interactions and active tests from localStorage
    const storedInteractions = JSON.parse(localStorage.getItem("ab-test-interactions") || "[]");
    const storedTests = JSON.parse(localStorage.getItem("ab-tests") || "{}");

    setInteractions(storedInteractions);
    setActiveTests(storedTests);
  }, []);

  const getTimeFilteredInteractions = () => {
    const now = new Date();
    const filterDate = new Date();

    switch (selectedTimeRange) {
      case "day":
        filterDate.setDate(now.getDate() - 1);
        break;
      case "week":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(now.getMonth() - 1);
        break;
    }

    return interactions.filter((interaction) => new Date(interaction.timestamp) >= filterDate);
  };

  const getConversionRate = (elementId: string, group: "A" | "B") => {
    const filteredInteractions = getTimeFilteredInteractions().filter(
      (i) => i.elementId === elementId && i.group === group
    );

    const totalViews = filteredInteractions.filter((i) => i.action === "view").length;
    const totalClicks = filteredInteractions.filter((i) => i.action === "click").length;

    return totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">A/B Test Analytics</h2>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value as "day" | "week" | "month")}
          className="border rounded px-3 py-1"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(activeTests).map(([elementId, test]) => (
          <div key={elementId} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">{elementId}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Control (Group A)</p>
                <p className="text-lg">Original Content</p>
                <p className="text-sm text-gray-500">
                  Conversion Rate: {getConversionRate(elementId, "A").toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Test (Group B)</p>
                <p className="text-lg">{test.content}</p>
                <p className="text-sm text-gray-500">
                  Conversion Rate: {getConversionRate(elementId, "B").toFixed(2)}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Started: {new Date(test.timestamp).toLocaleDateString()}</span>
                <button
                  onClick={() => {
                    const newTests = { ...activeTests };
                    delete newTests[elementId];
                    localStorage.setItem("ab-tests", JSON.stringify(newTests));
                    setActiveTests(newTests);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  End Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(activeTests).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No active A/B tests. Create some variations in the A/B Testing Settings page.
        </div>
      )}
    </div>
  );
}
