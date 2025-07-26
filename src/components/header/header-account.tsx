"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

type HeaderAccountProps = {
  session: Session;
};

export default function HeaderAccount({ session }: HeaderAccountProps) {
  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-3 cursor-pointer">
            <Avatar>
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || "User"}
              />
              <AvatarFallback>
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{session.user.name}</span>
            {session.user.plan === "PRO" && (
              <Badge variant="secondary" className="text-indigo-900">
                PREMIUM
              </Badge>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">{session.user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="w-full hover:outline-none focus:outline-none"
              onClick={handleLogout}
            >
              Logout
              <LogOut />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
