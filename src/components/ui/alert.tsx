import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: cn(
          "bg-stone-100 text-stone-900 border-stone-300",
          "dark:bg-stone-950 dark:text-stone-200 dark:border-stone-700",
        ),
        info: cn(
          "bg-sky-200 text-sky-900 border-sky-300 [&>svg]:text-sky-500",
          "dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-700 dark:[&>svg]:text-sky-500",
        ),
        success: cn(
          "bg-emerald-200 text-emerald-900 border-emerald-300 [&>svg]:text-emerald-500",
          "dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-700 dark:[&>svg]:text-emerald-500",
        ),
        warning: cn(
          "bg-amber-200 text-amber-900 border-amber-300 [&>svg]:text-amber-500",
          "dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700 dark:[&>svg]:text-amber-500",
        ),
        error: cn(
          "bg-rose-200 text-rose-900 border-rose-300 [&>svg]:text-rose-500",
          "dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-700 dark:[&>svg]:text-rose-500",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
