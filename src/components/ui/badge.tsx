
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        accent: 
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        success:
          "border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80",
        teal:
          "border-transparent bg-teal text-white hover:bg-teal/80",
        charcoal:
          "border-transparent bg-charcoal text-white hover:bg-charcoal/80",
        mediumgray:
          "border-transparent bg-mediumgray text-white hover:bg-mediumgray/80",
        lightgray:
          "border-transparent bg-lightgray text-charcoal hover:bg-lightgray/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
