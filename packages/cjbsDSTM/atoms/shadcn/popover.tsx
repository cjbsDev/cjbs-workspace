import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { Root, Trigger, Content, Portal } from "@radix-ui/react-popover";
import { cn } from "./mergeStyle";

export const Popover = Root;
export const PopoverTrigger = Trigger;
export const PopoverContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content> & {
		container?: HTMLElement | null | undefined;
	}
>(({ className, container, align="center", sideOffset=4, ...props }, ref:ForwardedRef<ElementRef<typeof Content>>)=>(
	<Portal container={container}>
		<Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"z-50 w-72 rounded-md border border-theme-border bg-theme-box p-4 text-theme-text",
				"shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className
			)}
			{...props}
		/>
	</Portal>
));
PopoverContent.displayName = Content.displayName;
