import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { auth } from "@/lib/auth";

type HeaderButtonProps = {
  href: string;
  variant: string;
  children: React.ReactNode;
  needAuth?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default async function HeaderButton({
  href,
  variant,
  children,
  needAuth,
}: HeaderButtonProps) {
  const session = await auth();

  if (needAuth && !session?.user.id) {
    return null;
  }

  return (
    <Link href={href}>
      <Button variant={variant}>{children}</Button>
    </Link>
  );
}
