import * as React from "react"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-[8px] bg-border ${className || ""}`}
      {...props}
    />
  )
}

export { Skeleton }
