import { forwardRef, type ForwardedRef, type ElementRef, ComponentPropsWithRef } from "react";
import { cn } from "./mergeStyle";
import { cva } from "class-variance-authority";
import { Root } from "@radix-ui/react-label";

const labelVariants = cva(
	"twcss-text-tall twcss-font-medium twcss-leading-none peer-disabled:twcss-cursor-not-allowed peer-disabled:twcss-opacity-70",
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
			"twcss-text-theme-text",
			className
		)}
		{...props}
	/>
));
Label.displayName = Root.displayName;
