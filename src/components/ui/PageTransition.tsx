"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? "enter" : "hidden"}
      animate="enter"
      variants={variants}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col flex-1 h-full"
    >
      {children}
    </motion.div>
  );
}
