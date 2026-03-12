"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";

const Features = dynamic(() => import("./Features"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />,
});

const CTA = dynamic(() => import("./CTA"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />,
});

export default function HomeSections() {
  return (
    <>
      <ScrollReveal delay={100}>
        <Features />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <CTA />
      </ScrollReveal>
    </>
  );
}
