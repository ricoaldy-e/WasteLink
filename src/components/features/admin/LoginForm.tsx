"use client";

import { useActionState, useState } from "react";
import { loginAction, LoginState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSmartEnter } from "@/hooks/useSmartEnter";
import Image from "next/image";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const { handleKeyDown } = useSmartEnter();

  return (
    <div className="w-full max-w-[380px] mx-auto">
      {/* Logo / Brand */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="relative w-12 h-12 mb-4 bg-white border border-border rounded-xl flex items-center justify-center shadow-sm">
          <Image
            src="/logo.png"
            alt="WasteLink Icon"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Masuk Admin
        </h1>
        <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
          Gunakan kredensial terdaftar untuk mengakses panel admin WasteLink.
        </p>
      </div>

      {/* Error Alert */}
      {state.error && (
        <div
          role="alert"
          className="mb-5 px-3.5 py-2.5 rounded-lg border border-red-200 bg-red-50/50 text-xs font-semibold text-red-800 text-left"
        >
          {state.error}
        </div>
      )}

      {/* Form */}
      <form action={formAction} noValidate onKeyDown={handleKeyDown} className="flex flex-col gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-text-secondary">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@email.com"
            required
            disabled={isPending}
            error={!!state.error}
            className="h-10 text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5 text-left">
          <Label htmlFor="password" className="text-xs font-semibold text-text-secondary">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              required
              disabled={isPending}
              error={!!state.error}
              className="h-10 text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none focus:text-brand-green"
              tabIndex={-1}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          id="login-submit"
          type="submit"
          variant="primary"
          className="w-full h-10 mt-2 font-semibold text-sm rounded-lg"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin text-white"
                width="14"
                height="14"
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
    </div>
  );
}

