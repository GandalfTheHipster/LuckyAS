import { redirect } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

type UserClaims = {
  email?: string;
  role?: string;
  user_metadata?: {
    avatar_url?: string;
    picture?: string;
    full_name?: string;
    name?: string;
  };
};

function getInitials(name: string) {
  return name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function ProfileCard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const claims = data.claims as UserClaims;
  const displayName =
    claims.user_metadata?.full_name ??
    claims.user_metadata?.name ??
    claims.email ??
    "Your profile";
  const avatarUrl =
    claims.user_metadata?.avatar_url ?? claims.user_metadata?.picture;

  return (
    <div className="w-full max-w-3xl">
      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-foreground via-muted-foreground to-muted" />
        <CardHeader className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar size="lg" className="size-24 border-4 border-background">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-2">
              <CardTitle className="text-2xl">{displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Signed in to noahedge.com
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Mail className="size-4 text-muted-foreground" />
              Email
            </div>
            <p className="break-all text-sm text-muted-foreground">
              {claims.email ?? "No email available"}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="size-4 text-muted-foreground" />
              Access
            </div>
            <p className="text-sm text-muted-foreground">
              {claims.role ?? "Authenticated user"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileCard />
    </Suspense>
  );
}
