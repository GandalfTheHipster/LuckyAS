"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login/login-form";

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Sign in
      </Button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div
                className="relative w-full max-w-sm"
                role="dialog"
                aria-label="Sign in"
                aria-modal="true"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground shadow-sm ring-offset-background transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close sign in"
                >
                  <XIcon className="size-4" />
                </button>
                <LoginForm
                  onSuccess={() => {
                    setOpen(false);
                    router.refresh();
                  }}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
