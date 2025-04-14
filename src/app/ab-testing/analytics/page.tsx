"use client";

import ABTestAnalytics from "@/components/ABTestAnalytics";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">A/B Test Analytics</h1>
      <ABTestAnalytics />
    </div>
  );
}
