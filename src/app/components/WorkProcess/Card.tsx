"use client";
import { cn } from "@/utils/cn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WorkProgressCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.8 });

  return (
    <div
      ref={ref}
      className={cn(
        "h-[300px] items-center justify-around  flex flex-col",
        Number(index) % 2 === 0 ? "ml-[50%]" : "mr-[50%]"
      )}
    >
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex  items-center">
            <h2 className="text-8xl mr-4">{index}</h2>
            <h1
              className={cn(
                "text-3xl text-primary tracking-tight mb-2",
                isInView && "border-b-4 transition-all duration-75 border-black"
              )}
            >
              {title}
            </h1>
          </div>
          {/* <div className="text-xl w-1/2 text-primary/70 text-center ">
            {description}
          </div> */}
        </motion.div>
      )}
    </div>
  );
}
