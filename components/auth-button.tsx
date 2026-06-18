import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserClaims = {
  email?: string;
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

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims as UserClaims | undefined;
  const displayName =
    user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email;
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;
  const initials = getInitials(displayName ?? "User");

  return user ? (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        className="h-10 gap-2 rounded-full px-2 pr-3"
      >
        <Link href="/profile" aria-label="Open profile">
          <Avatar size="sm" className="ring-2 ring-background">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-32 truncate text-sm sm:inline">
            {displayName}
          </span>
        </Link>
      </Button>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      {/* <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button> */}
    </div>
  );
}
