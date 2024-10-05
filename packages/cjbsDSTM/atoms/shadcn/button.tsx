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
		"twcss-inline-flex twcss-items-center twcss-justify-center twcss-whitespace-nowrap twcss-rounded-md twcss-text-tall twcss-font-medium",
		"twcss-transition-colors",
		// "focus-visible:outline-none",
		// "ring-offset-background focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset",
		"disabled:twcss-pointer-events-none disabled:twcss-opacity-50",
	].join(" "),
	{
		variants: {
			variant: {
				default:
					// "bg-primary text-primary-foreground hover:bg-primary/90",
					"twcss-bg-theme-primary twcss-text-white hover:twcss-bg-theme-primary-hover",
				destructive:
					// "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					"twcss-bg-theme-danger twcss-text-white hover:twcss-bg-theme-danger-hover",
				outline:
					"twcss-border twcss-border-solid twcss-text-theme-primary twcss-border-theme-primary twcss-bg-transparent hover:twcss-bg-theme-transparent-hover",
				"outline-danger":
					"twcss-border twcss-border-solid twcss-text-theme-danger twcss-border-theme-danger twcss-bg-transparent hover:twcss-bg-theme-transparent-hover",
				secondary:
					"twcss-bg-theme-secondary twcss-text-white hover:twcss-bg-theme-secondary-hover",
				// ghost: "hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:twcss-bg-theme-transparent-hover twcss-text-theme-text",
				invertedGhost: "twcss-text-white hover:border-theme-primary twcss-border twcss-border-transparent twcss-border-solid",
				link: "twcss-text-theme-primary hover:text-theme-primary-hover !twcss-px-0",
			},
			size: {
				default: "twcss-h-10 twcss-px-4 twcss-py-2",
				sm: "twcss-h-8 twcss-rounded-md twcss-px-2",
				lg: "twcss-h-12 twcss-rounded-md twcss-px-8",
				icon: "twcss-h-10 twcss-w-10",
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
				isLoading ? "twcss-items-center twcss-justify-center twcss-pointer-events-none twcss-opacity-50" : ""
			)}
			ref={ref}
			{...props}
		>
			{isLoading&&<LuLoader2 className="twcss-animate-spin twcss-h-6 twcss-w-6 twcss-absolute"/>}
			<span className={cn(
				isLoading ? "twcss-opacity-0" :
				props.disabled ? "twcss-opacity-50" : "",
				wrapperStyle
			)}>
				{props.children}
			</span>
		</Comp>
	)
})
EzButton.displayName = "EzButton";
