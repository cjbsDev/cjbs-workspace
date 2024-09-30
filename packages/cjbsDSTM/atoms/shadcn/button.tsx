import {
	forwardRef,
	type ForwardedRef,
	type ButtonHTMLAttributes,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { LuLoader2 } from "@react-icons/all-files/lu/LuLoader2";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./mergeStyle";

export const buttonVariants = cva(
	[
		"inline-flex items-center justify-center whitespace-nowrap rounded-md text-tall font-medium",
		"transition-colors",
		// "focus-visible:outline-none",
		// "ring-offset-background focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset",
		"disabled:pointer-events-none disabled:opacity-50",
	].join(" "),
	{
		variants: {
			variant: {
				default:
					// "bg-primary text-primary-foreground hover:bg-primary/90",
					"bg-theme-primary text-white hover:bg-theme-primary-hover",
				destructive:
					// "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					"bg-theme-danger text-white hover:bg-theme-danger-hover",
				outline:
					"border border-solid text-theme-primary border-theme-primary bg-transparent hover:bg-theme-transparent-hover",
				"outline-danger":
					"border border-solid text-theme-danger border-theme-danger bg-transparent hover:bg-theme-transparent-hover",
				secondary:
					"bg-theme-secondary text-white hover:bg-theme-secondary-hover",
				// ghost: "hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-theme-transparent-hover text-theme-text",
				invertedGhost: "text-white hover:border-theme-primary border border-transparent border-solid",
				link: "text-theme-primary hover:text-theme-primary-hover !px-0",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-8 rounded-md px-2",
				lg: "h-12 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps extends
	ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants>
{
	asChild?: boolean;
	isLoading?: boolean;
	wrapperStyle?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	className, variant, size, asChild=false, isLoading=false, ...props
}, ref: ForwardedRef<HTMLButtonElement>) => {
	const Comp = asChild ? Slot : "button";

	return(
		<Comp
			className={cn(
				// "font-manrope",
				buttonVariants({ variant, size, className })
			)}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = "Button";

export const EzButton = forwardRef<HTMLButtonElement, ButtonProps>(({
	className, variant, size, asChild=false, isLoading=false, wrapperStyle,...props
}, ref: ForwardedRef<HTMLButtonElement>)=>{

	const Comp = asChild ? Slot : "button";

	return(
		<Comp
			className={cn(
				"font-manrope",
				buttonVariants({ variant, size, className }),
				isLoading ? "items-center justify-center pointer-events-none opacity-50" : ""
			)}
			ref={ref}
			{...props}
		>
			{isLoading&&<LuLoader2 className="animate-spin h-6 w-6 absolute"/>}
			<span className={cn(
				isLoading ? "opacity-0" :
				props.disabled ? "opacity-50" : "",
				wrapperStyle
			)}>
				{props.children}
			</span>
		</Comp>
	)
})
EzButton.displayName = "EzButton";
