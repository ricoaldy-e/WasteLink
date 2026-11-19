"use client";

import { useActionState, useState } from "react";
import { loginAction, LoginState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { useSmartEnter } from "@/hooks/useSmartEnter";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const { handleKeyDown } = useSmartEnter();

  return (
    <div className="w-full">
      <h1 className="text-h2 text-ink">Masuk admin</h1>
      <p className="mt-2 text-body text-muted">Gunakan akun admin yang terdaftar untuk membuka panel WasteLink.</p>

      {state.error && <FormNotice tone="error" className="mt-6">{state.error}</FormNotice>}

      <form action={formAction} noValidate onKeyDown={handleKeyDown} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@email.com"
            required
            disabled={isPending}
            error={!!state.error}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={isPending}
              error={!!state.error}
              className="pe-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-0 top-0 inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-ink"
              aria-label="Tampilkan password"
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Button
          id="login-submit"
          type="submit"
          variant="primary"
          className="mt-2 w-full"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Memproses…
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </div>
  );
}
