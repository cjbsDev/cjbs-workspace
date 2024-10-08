import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { Root, Viewport, Corner, ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { cn } from "./mergeStyle";

export const ScrollBar = forwardRef<
	ElementRef<typeof ScrollAreaScrollbar>,
	ComponentPropsWithoutRef<typeof ScrollAreaScrollbar> & {
		disableScroll?: boolean;
	}
>(({ className, orientation="vertical", disableScroll=false, ...props }, ref: ForwardedRef<ElementRef<typeof ScrollAreaScrollbar>>)=>(
	<ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		forceMount={disableScroll ? undefined : true}
		className={cn(
			"flex touch-none select-none transition-colors z-[5]",
			orientation === "vertical" &&
			"h-full w-2.5 border-l border-l-transparent pl-[3px]", //"p-[1px]"
			orientation === "horizontal" &&
			"h-2.5 flex-col border-t border-t-transparent pt-[3px]", //"p-[1px]"
			"[&[data-state=hidden]>div]:!opacity-50",
			className
		)}
		{...props}
	>
		<ScrollAreaThumb className={cn(
			"relative flex-1 rounded-full bg-theme-scroll transition-opacity",
		)}/>
	</ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export const ScrollArea = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root> & {
		viewportClass?: string;
		orientation?: "horizontal" | "vertical" | "both";
		disableScroll?: boolean;
	}
>(({ className, children, onScroll, viewportClass, orientation="vertical", disableScroll=false, ...props }, ref: ForwardedRef<ElementRef<typeof Root>>)=>(
	<Root
		ref={ref}
		className={cn("relative overflow-hidden", className)}
		{...props}
	>
		<Viewport id={`viewport-${props.id}`} onScroll={onScroll} className={cn(
			"h-full w-full rounded-[inherit]",
			viewportClass
		)}>
			{children}
		</Viewport>
		{["both","horizontal"].includes(orientation)&&<ScrollBar disableScroll={disableScroll} orientation="horizontal"/>}
		{["both","vertical"].includes(orientation)&&<ScrollBar disableScroll={disableScroll} orientation="vertical"/>}
		<Corner/>
	</Root>
))
ScrollArea.displayName = Root.displayName;
