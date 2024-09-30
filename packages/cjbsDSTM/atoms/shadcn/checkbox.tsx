import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { LuCheck } from "@react-icons/all-files/lu/LuCheck";
import { cn } from "./mergeStyle";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { LuCircle } from "@react-icons/all-files/lu/LuCircle";


export const Checkbox = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root>&{
		radioShape?: boolean
	}
>(({ className, radioShape, ...props }, ref:ForwardedRef<ElementRef<typeof Root>>)=>(
	<Root
		ref={ref}
		className={cn(
			[
				"peer h-4 w-4 shrink-0 rounded-sm border border-solid",
				"ring-offset-background focus-visible:outline-none focus-visible:ring-2",
				"focus-visible:ring-ring focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"bg-transparent",
				"border-theme-border hover:border-theme-text",
				"data-[state=checked]:bg-theme-primary data-[state=checked]:text-white",
				radioShape&&"rounded-full data-[state=checked]:border-theme-primary data-[state=checked]:bg-theme-transparent"
			].join(" "),
			className
		)}
		{...props}
	>
		<Indicator
			className={cn(
				"flex items-center justify-center",
				!radioShape&&"text-current"
			)}
		>
			{radioShape
			? <LuCircle className="h-2 w-2 fill-current text-theme-primary"/>
			: <LuCheck className="h-4 w-4" />
			}
		</Indicator>
	</Root>
));
Checkbox.displayName = Root.displayName;
