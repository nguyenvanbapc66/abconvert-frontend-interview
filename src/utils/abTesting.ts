export const AB_TEST_GROUP_KEY = "ab-test-group";

export function getTestGroup(): "A" | "B" {
  // Check if user already has a test group assigned
  const storedGroup = localStorage.getItem(AB_TEST_GROUP_KEY);
  if (storedGroup) {
    return storedGroup as "A" | "B";
  }

  // Randomly assign a test group (50/50 split)
  const group = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(AB_TEST_GROUP_KEY, group);
  return group;
}

export function getTestVariation(elementId: string): any {
  const tests = JSON.parse(localStorage.getItem("ab-tests") || "{}");
  return tests[elementId];
}

export function applyTestVariation(elementId: string, content: string): string {
  const variation = getTestVariation(elementId);
  if (!variation) return content;

  // Apply the variation based on the user's test group
  const group = getTestGroup();
  if (group === "A") {
    return content; // Control group
  } else {
    return variation.content; // Test group
  }
}

export function trackTestInteraction(elementId: string, action: string) {
  const group = getTestGroup();
  const interactions = JSON.parse(localStorage.getItem("ab-test-interactions") || "[]");

  interactions.push({
    elementId,
    action,
    group,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("ab-test-interactions", JSON.stringify(interactions));
}
