"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-red-600 justify-start hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
