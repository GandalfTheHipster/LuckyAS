"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { getAuthErrorMessage } from "@/lib/supabase/errors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error(getAuthErrorMessage(error));
    } finally {
      router.push("/");
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={logout} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
