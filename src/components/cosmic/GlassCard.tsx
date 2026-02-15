"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "hover" | "glow";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
  onClick,
}: GlassCardProps) {
  const baseStyles =
    "backdrop-blur-md border border-[rgba(74,128,240,0.2)]";
  const variants = {
    default: "bg-[rgba(42,46,55,0.5)]",
    hover:
      "bg-[rgba(42,46,55,0.5)] hover:bg-[rgba(42,46,55,0.7)] hover:border-[rgba(74,128,240,0.4)] transition-all duration-300",
    glow:
      "bg-[rgba(42,46,55,0.5)] hover:shadow-[0_0_30px_rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all duration-300",
  };

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={variant !== "default" ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
