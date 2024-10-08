import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { Root, Trigger, Provider, Content, Portal } from "@radix-ui/react-tooltip";
import { cn } from "./mergeStyle";

export const TooltipProvider = Provider;
export const Tooltip = Root;
export const TooltipTrigger = Trigger;
export const TooltipPortal = Portal;

export const TooltipContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset=4, ...props }, ref: ForwardedRef<ElementRef<typeof Content>>)=>(
	<Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			"text-theme-text bg-theme-box border-theme-border",
			"z-50 overflow-hidden rounded-md border px-3 py-1.5 text-tall shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className
		)}
		{...props}
	/>
));
TooltipContent.displayName = Content.displayName;
