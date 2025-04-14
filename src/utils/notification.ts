"use client";
import { createRoot } from "react-dom/client";

export const showNotification = (content: JSX.Element) => {
  const notificationContainer = document.createElement("div");
  notificationContainer.id = "notification-container";
  document.body.appendChild(notificationContainer);

  const root = createRoot(notificationContainer);
  root.render(content);

  setTimeout(() => {
    root.unmount();
    notificationContainer.remove();
  }, 6000);
};
