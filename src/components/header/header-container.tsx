import { cn } from "@/lib/utils";
import React from "react";

const Header = async ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header className={cn("container mx-auto px-4 py-6", className)}>
      {children}
    </header>
  );
};

export default Header;
