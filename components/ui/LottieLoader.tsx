"use client";

import Lottie from "lottie-react";
import animationData from "@/assets/animations/chatbot-lottie.json";

interface LottieLoaderProps {
  width?: number | string;
  height?: number | string;
}

export default function LottieLoader({ width = 300, height = 300 }: LottieLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div style={{ width, height }}>
        <Lottie 
          animationData={animationData} 
          loop={true} 
          className="w-full h-full"
        />
      </div>
      <p className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
        Preparing your experience...
      </p>
    </div>
  );
}
