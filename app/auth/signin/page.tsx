'use client';

import { signIn } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-center">
            <Button
              onClick={() => signIn("microsoft-entra-id")}
              className="w-full max-w-xs"
            >
              Sign in with Microsoft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 