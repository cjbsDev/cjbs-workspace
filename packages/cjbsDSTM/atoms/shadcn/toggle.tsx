import type { ForwardedRef, ElementRef, ComponentPropsWithoutRef } from "react";

import { forwardRef } from "react";
import {
	Root
} from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./mergeStyle";

export const toggleVariants = cva(
	"inline-flex items-center justify-center rounded-md text-tall font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:shadow-inner data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-solid border-theme-border bg-transparent hover:bg-theme-transparent-hover",
			},
			size: {
				// default: "h-10 px-3",
				// sm: "h-9 px-2.5",
				// lg: "h-11 px-5",
				default: "h-10 w-10 p-2",
				sm: "h-8 w-8 p-1",
				lg: "h-12 w-12 p-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export const Toggle = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root>&
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref: ForwardedRef<ElementRef<typeof Root>>) => (
	<Root
		ref={ref}
		className={cn(
			toggleVariants({ variant, size, className })
		)}
		{...props}
	/>
))
Toggle.displayName = Root.displayName;
