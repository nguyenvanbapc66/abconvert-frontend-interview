"use client";

import { useState, useEffect } from "react";

interface TestInteraction {
  elementId: string;
  action: string;
  group: "A" | "B";
  timestamp: string;
  price?: number;
}

interface TestVariation {
  content: string;
  elementId: string;
  timestamp: string;
  contentType: string;
  strategy?: string;
}

interface PriceTestMetrics {
  revenuePerVisitor: number;
  averageOrderValue: number;
  conversionRate: number;
  totalRevenue: number;
  totalVisitors: number;
  totalConversions: number;
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

  const calculatePriceMetrics = (elementId: string, group: "A" | "B"): PriceTestMetrics => {
    const filteredInteractions = getTimeFilteredInteractions().filter(
      (i) => i.elementId === elementId && i.group === group
    );

    const totalVisitors = filteredInteractions.filter((i) => i.action === "view").length;
    const totalConversions = filteredInteractions.filter((i) => i.action === "click").length;
    const totalRevenue = filteredInteractions.reduce((sum, i) => {
      if (i.action === "click" && i.price) {
        return sum + i.price;
      }
      return sum;
    }, 0);

    return {
      revenuePerVisitor: totalVisitors > 0 ? totalRevenue / totalVisitors : 0,
      averageOrderValue: totalConversions > 0 ? totalRevenue / totalConversions : 0,
      conversionRate: totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0,
      totalRevenue,
      totalVisitors,
      totalConversions,
    };
  };

  const PriceTestResults = ({ elementId }: { elementId: string }) => {
    const metricsA = calculatePriceMetrics(elementId, "A");
    const metricsB = calculatePriceMetrics(elementId, "B");

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border rounded p-4">
          <h4 className="font-semibold mb-2">Control Group (A)</h4>
          <div className="space-y-2">
            <p>Revenue/Visitor: ${metricsA.revenuePerVisitor.toFixed(2)}</p>
            <p>Avg Order Value: ${metricsA.averageOrderValue.toFixed(2)}</p>
            <p>Conversion Rate: {metricsA.conversionRate.toFixed(2)}%</p>
            <p>Total Revenue: ${metricsA.totalRevenue.toFixed(2)}</p>
            <p>Total Visitors: {metricsA.totalVisitors}</p>
            <p>Total Conversions: {metricsA.totalConversions}</p>
          </div>
        </div>
        <div className="border rounded p-4">
          <h4 className="font-semibold mb-2">Test Group (B)</h4>
          <div className="space-y-2">
            <p>Revenue/Visitor: ${metricsB.revenuePerVisitor.toFixed(2)}</p>
            <p>Avg Order Value: ${metricsB.averageOrderValue.toFixed(2)}</p>
            <p>Conversion Rate: {metricsB.conversionRate.toFixed(2)}%</p>
            <p>Total Revenue: ${metricsB.totalRevenue.toFixed(2)}</p>
            <p>Total Visitors: {metricsB.totalVisitors}</p>
            <p>Total Conversions: {metricsB.totalConversions}</p>
          </div>
        </div>
      </div>
    );
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
              </div>
              <div>
                <p className="text-sm text-gray-500">Test (Group B)</p>
                <p className="text-lg">{test.content}</p>
                {test.strategy && <p className="text-sm text-gray-500">Strategy: {test.strategy}</p>}
              </div>

              {elementId.includes("price") && <PriceTestResults elementId={elementId} />}

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
