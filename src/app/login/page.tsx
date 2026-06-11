
'use client';

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-muted/40 p-4">
           <Suspense fallback={<Card className="w-full max-w-sm h-[480px] animate-pulse" />}>
                <LoginForm />
           </Suspense>
        </div>
    );
}
