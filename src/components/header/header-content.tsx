import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderContent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <FileText className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">ResumeSnap</span>
      </Link>
      {children}
    </div>
  );
}
