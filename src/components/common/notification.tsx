"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/utils";

interface NotificationProps {
  type: "success" | "failed";
  message: string;
  duration?: number;
  onClose?: () => void;
}

export default function Notification({ type, message, duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    const timer2 = setTimeout(() => {
      setIsLeaving(true);
      onClose?.();
    }, duration + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [duration, onClose]);

  return (
    <AnimatePresence mode="wait" initial={true}>
      {!isLeaving && (
        <motion.div
          initial={{ opacity: 0, x: isVisible ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isVisible ? -100 : 100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-4 right-4 z-10",
            "px-6 py-4 rounded-lg shadow-lg",
            type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{type === "success" ? "Success!" : "Error!"}</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
