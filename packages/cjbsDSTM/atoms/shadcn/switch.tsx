import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef} from "react";
import { cn } from "./mergeStyle";
import { Root, Thumb } from "@radix-ui/react-switch";

export const Switch = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Root>>) => (
	<Root
		ref={ref}
		className={cn(
			// "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
			"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
			"data-[state=checked]:bg-theme-border data-[state=unchecked]:bg-muted",
			className
		)}
		{...props}
	>
		<Thumb
			className={cn(
				// "bg-background",
				"data-[state=checked]:bg-theme-primary",
				"data-[state=unchecked]:bg-theme-text-hover",
				"pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[calc(1rem+2px)] data-[state=unchecked]:translate-x-0.5"
			)}
		/>
	</Root>
));
Switch.displayName = Root.displayName;


export const SquareSwitch = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Root>>) => (
	<Root
		ref={ref}
		className={cn(
			"peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-md",
			"transition-colors disabled:cursor-not-allowed disabled:opacity-50",
			"bg-theme-border p-1",
			className
		)}
		{...props}
	>
		<Thumb
			className={cn(
				"flex items-center justify-center",
				"bg-theme-box pointer-evenets-none h-6 w-7 rounded-md shadow-lg ring-0",
				"transition-transform data-[state=checked]:translate-x-[calc(1.75rem)] text-short"
			)}
		>
			{props.title}
		</Thumb>
	</Root>
))
SquareSwitch.displayName = Root.displayName;
