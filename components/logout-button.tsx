"use client";

import { createClient } from "@/lib/supabase/noahedgedotcom/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/bape/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
