import * as React from "react"

/**
 * Skeleton – shimmer halus (kilau bg-alt menyapu bg-border). Di prefers-reduced-motion
 * animasinya mati dan tersisa blok statis.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-sm bg-border bg-[linear-gradient(90deg,transparent,var(--color-bg-alt),transparent)] bg-[length:200%_100%] bg-no-repeat motion-safe:animate-shimmer ${className || ""}`}
      {...props}
    />
  )
}

export { Skeleton }
