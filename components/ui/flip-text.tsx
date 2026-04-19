"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface FlipTextProps extends HTMLMotionProps<"div"> {
  children: string | React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FlipText({
  children,
  duration = 0.5,
  delay = 0,
  className,
  ...props
}: FlipTextProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      rotateX: -90, 
      opacity: 0,
      y: 40,
      z: -100
    },
    visible: {
      rotateX: 0,
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === "string") {
      return content.split("").map((char, i) => (
        <motion.span key={i} variants={itemVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }
    
    if (Array.isArray(content)) {
      return content.map((child, i) => <React.Fragment key={i}>{renderContent(child)}</React.Fragment>);
    }

    if (React.isValidElement(content)) {
      const { children: subChildren, className: subClassName, ...subProps } = content.props as {
        children?: React.ReactNode;
        className?: string;
        [key: string]: unknown;
      };
      return (
        <motion.span 
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className={subClassName} 
          {...subProps}
        >
          {renderContent(subChildren)}
        </motion.span>
      );
    }

    return content;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-wrap items-center justify-center", className)}
      style={{ 
        perspective: "1000px",
        ...props.style 
      }}
      {...props}
    >
      {renderContent(children)}
    </motion.div>
  );
}
