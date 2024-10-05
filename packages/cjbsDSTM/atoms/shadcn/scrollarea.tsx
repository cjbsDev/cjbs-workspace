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
			"twcss-flex twcss-touch-none twcss-select-none twcss-transition-colors twcss-z-[5]",
			orientation === "vertical" &&
			"twcss-h-full twcss-w-2.5 twcss-border-l twcss-border-l-transparent twcss-pl-[3px]", //"p-[1px]"
			orientation === "horizontal" &&
			"twcss-h-2.5 twcss-flex-col twcss-border-t twcss-border-t-transparent twcss-pt-[3px]", //"p-[1px]"
			"[&[data-state=hidden]>div]:!twcss-opacity-50",
			className
		)}
		{...props}
	>
		<ScrollAreaThumb className={cn(
			"twcss-relative twcss-flex-1 twcss-rounded-full twcss-bg-theme-scroll twcss-transition-opacity",
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
		className={cn("twcss-relative twcss-overflow-hidden", className)}
		{...props}
	>
		<Viewport id={`viewport-${props.id}`} onScroll={onScroll} className={cn(
			"twcss-h-full twcss-w-full twcss-rounded-[inherit]",
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
