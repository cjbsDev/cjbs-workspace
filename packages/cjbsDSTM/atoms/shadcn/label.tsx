import { forwardRef, type ForwardedRef, type ElementRef, ComponentPropsWithRef } from "react";
import { cn } from "./mergeStyle";
import { cva } from "class-variance-authority";
import { Root } from "@radix-ui/react-label";

const labelVariants = cva(
	"text-tall font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);


interface LabelProps extends ComponentPropsWithRef<typeof Root> {
    className?: string;
}

export const Label = forwardRef<
	ElementRef<typeof Root>,
	// ComponentPropsWithRef<typeof Root>
	LabelProps
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Root>>)=>(
	<Root
		ref={ref}
		className={cn(
			labelVariants(),
			"text-theme-text",
			className
		)}
		{...props}
	/>
));
Label.displayName = Root.displayName;
