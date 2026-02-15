"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface CosmicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
}

export function CosmicButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon,
}: CosmicButtonProps) {
  const variants = {
    primary:
      "bg-nebula-blue hover:bg-[#5A90FF] text-white shadow-[0_0_20px_rgba(74,128,240,0.3)] hover:shadow-[0_0_30px_rgba(74,128,240,0.5)]",
    secondary:
      "bg-[rgba(42,46,55,0.8)] hover:bg-[rgba(42,46,55,1)] text-white border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)]",
    ghost:
      "bg-transparent hover:bg-[rgba(74,128,240,0.1)] text-white",
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      {children}
    </motion.button>
  );
}
