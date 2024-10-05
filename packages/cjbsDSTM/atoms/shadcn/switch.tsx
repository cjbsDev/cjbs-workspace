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
			"peer twcss-inline-flex twcss-h-5 twcss-w-9 twcss-shrink-0 twcss-cursor-pointer twcss-items-center twcss-rounded-full twcss-border-2 twcss-border-transparent twcss-shadow-sm twcss-transition-colors focus-visible:twcss-outline-none focus-visible:twcss-ring-2 focus-visible:twcss-ring-ring focus-visible:twcss-ring-offset-2 focus-visible:twcss-ring-offset-background disabled:twcss-cursor-not-allowed disabled:twcss-opacity-50",
			"data-[state=checked]:twcss-bg-theme-border data-[state=unchecked]:twcss-bg-muted",
			className
		)}
		{...props}
	>
		<Thumb
			className={cn(
				// "bg-background",
				"data-[state=checked]:twcss-bg-theme-primary",
				"data-[state=unchecked]:twcss-bg-theme-text-hover",
				"twcss-pointer-events-none twcss-block twcss-h-4 twcss-w-4 twcss-rounded-full twcss-shadow-lg twcss-ring-0 twcss-transition-transform data-[state=checked]:twcss-translate-x-[calc(1rem+2px)] data-[state=unchecked]:twcss-translate-x-0.5"
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
			"peer twcss-inline-flex twcss-h-8 twcss-w-16 twcss-shrink-0 twcss-cursor-pointer twcss-items-center twcss-rounded-md",
			"twcss-transition-colors disabled:twcss-cursor-not-allowed disabled:twcss-opacity-50",
			"twcss-bg-theme-border twcss-p-1",
			className
		)}
		{...props}
	>
		<Thumb
			className={cn(
				"twcss-flex twcss-items-center twcss-justify-center",
				"twcss-bg-theme-box twcss-pointer-evenets-none twcss-h-6twcss- w-7 twcss-rounded-md twcss-shadow-lg twcss-ring-0",
				"twcss-transition-transform data-[state=checked]:twcss-translate-x-[calc(1.75rem)] twcss-text-short"
			)}
		>
			{props.title}
		</Thumb>
	</Root>
))
SquareSwitch.displayName = Root.displayName;
