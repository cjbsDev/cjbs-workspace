import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./mergeStyle";

export const badgeVariants = cva(
	[
		"inline-flex items-center border px-2 py-0.5 text-tall font-normal",
		"transition-colors focus:outline-none",
		// "focus:ring-2 focus:ring-ring focus:ring-offset-2"
	].join(" "),
	{
		variants: {
			variant: {
				default: "border-transparent bg-theme-primary text-white shadow",
				secondary: "border-transparent bg-theme-secondary-bg text-theme-secondary shadow dark:bg-theme-secondary dark:text-theme-secondary-bg",
				destructive: "border-transparent bg-theme-danger text-white shadow",
				outline: "border-theme-border text-theme-text shadow",
				success: "bg-theme-success-bg text-theme-success dark:bg-theme-success dark:text-theme-success-bg",
				danger: "bg-theme-danger-bg text-theme-danger dark:bg-theme-danger dark:text-theme-danger-bg",
				grey: "bg-theme-grey-bg text-theme-grey dark:bg-theme-grey dark:text-theme-grey-bg",
			},
			shape: {
				square: "rounded-none",
				rounded: "rounded-md",
				ellipse: "rounded-l-full rounded-r-full"
			},
			border: {
				none: "border-none",
				border: "border border-solid"
			}
		},
		defaultVariants: {
			variant: "default",
			shape: "rounded",
			border: "border",
		}
	}
);

export interface BadgeProps extends
	HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, shape, ...props }: BadgeProps) {
	return(
		<div
			className={cn(badgeVariants({ variant, shape }),className)}
			{...props}
		/>
	)
}
