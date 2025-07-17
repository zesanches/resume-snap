"use client";

import dynamic from "next/dynamic";

const DynamicCratePage = dynamic(() => import("./CreatePage"), {
  ssr: false,
});

export default function CreatePage() {
  return <DynamicCratePage />;
}
