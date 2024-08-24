"use client";
import { motion, useInView } from "framer-motion";
import React, { ForwardedRef, forwardRef } from "react";

interface Props {
  className?: string; // className is optional
  children?: React.ReactNode; // children can be any valid React node
}

// Use React.forwardRef to forward the ref
const AnimatedLeftDiv = forwardRef<HTMLDivElement, Props>(
  ({ className, children }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    // Type assertion to ensure ref is handled as RefObject
    const inView = useInView(ref as React.RefObject<HTMLDivElement>, {
      once: true,
      amount: 0.6,
    });

    return (
      <div ref={ref} className={className}>
        <motion.div
          id="left"
          initial={{ x: -1000, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

// Set a display name for the component
AnimatedLeftDiv.displayName = "AnimatedLeftDiv";

export default AnimatedLeftDiv;
