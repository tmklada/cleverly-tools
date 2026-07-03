"use client";

import { motion } from "framer-motion";
import { buttonTap } from "@/lib/animations";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function AnimatedButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}: AnimatedButtonProps) {
  const base = "font-semibold rounded-xl transition-colors text-sm px-6 py-3";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50",
    secondary: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : buttonTap}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
