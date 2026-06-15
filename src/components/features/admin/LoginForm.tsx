"use client";

import { useActionState } from "react";
import { loginAction, LoginState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSmartEnter } from "@/hooks/useSmartEnter";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const { handleKeyDown } = useSmartEnter();

  return (
    <Card className="w-full max-w-md mx-auto p-8 md:p-10">
      {/* Logo / Brand */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-[8px] mb-4"
          style={{ background: "linear-gradient(135deg, #299E63, #1F7A4A)" }}
          aria-hidden="true"
        >
          {/* Recycling icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2L8.5 8H4l4 6-1.5 6L12 17l5.5 3L16 14l4-6h-4.5L12 2z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-h3 text-text-primary text-center">WasteLink</h1>
        <p className="text-body-sm text-text-secondary text-center mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-h3 text-text-primary">Masuk</h2>
        <p className="text-body-sm text-text-secondary mt-1">
          Masukkan kredensial admin Anda untuk melanjutkan.
        </p>
      </div>

      {/* Error Alert */}
      {state.error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-[6px] border border-error/30 bg-error-bg px-4 py-3"
        >
          <svg
            className="mt-0.5 shrink-0 text-error"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5zM8 11a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 11z" />
          </svg>
          <p className="text-body-sm text-error">{state.error}</p>
        </div>
      )}

      {/* Form */}
      <form action={formAction} noValidate onKeyDown={handleKeyDown} className="flex flex-col gap-5">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@wastelink.id"
            required
            disabled={isPending}
            error={!!state.error}
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            disabled={isPending}
            error={!!state.error}
          />
        </div>

        {/* Submit */}
        <Button
          id="login-submit"
          type="submit"
          variant="primary"
          className="w-full mt-1"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                />
                <path
                  d="M14 8a6 6 0 0 0-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Memproses…
            </span>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </Card>
  );
}
