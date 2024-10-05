import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./mergeStyle";

export const badgeVariants = cva(
	[
		"twcss-inline-flex twcss-items-center twcss-border twcss-px-2 twcss-py-0.5 text-tall twcss-font-normal",
		"twcss-transition-colors focus:twcss-outline-none",
		// "focus:ring-2 focus:ring-ring focus:ring-offset-2"
	].join(" "),
	{
		variants: {
			variant: {
				default: "twcss-border-transparent bg-theme-primary twcss-text-white twcss-shadow",
				secondary: "twcss-border-transparent bg-theme-secondary-bg text-theme-secondary twcss-shadow dark:bg-theme-secondary dark:text-theme-secondary-bg",
				destructive: "twcss-border-transparent bg-theme-danger twcss-text-white twcss-shadow",
				outline: "border-theme-border text-theme-text twcss-shadow",
				success: "bg-theme-success-bg text-theme-success dark:bg-theme-success dark:text-theme-success-bg",
				danger: "bg-theme-danger-bg text-theme-danger dark:bg-theme-danger dark:text-theme-danger-bg",
				grey: "bg-theme-grey-bg text-theme-grey dark:bg-theme-grey dark:text-theme-grey-bg",
			},
			shape: {
				square: "twcss-rounded-none",
				rounded: "twcss-rounded-md",
				ellipse: "twcss-rounded-l-full twcss-rounded-r-full"
			},
			border: {
				none: "twcss-border-none",
				border: "twcss-border twcss-border-solid"
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
