"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ADLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
  fill?: boolean; // 👈 NEW
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

export function ADLogo({
  size = "md",
  animated = false,
  className = "",
  fill = false,
}: ADLogoProps) {
  const dimension = sizeMap[size];

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    // 🔥 FULL FILL MODE
    if (fill) {
      return (
        <div className={`relative w-full h-full ${className}`}>{children}</div>
      );
    }

    // fixed size mode
    return (
      <div
        style={{ width: dimension, height: dimension }}
        className="inline-flex items-center justify-center"
      >
        {children}
      </div>
    );
  };

  const Logo = (
    <Image
      src="/logo.png"
      alt="Logo"
      fill={fill} // 🔥 important for full container mode
      width={!fill ? dimension : undefined}
      height={!fill ? dimension : undefined}
      className={`object-contain ${fill ? "w-full h-full" : ""}`}
    />
  );

  const content = <Wrapper>{Logo}</Wrapper>;

  if (animated) {
    return (
      <motion.div
        className={fill ? "w-full h-full" : "inline-flex"}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
