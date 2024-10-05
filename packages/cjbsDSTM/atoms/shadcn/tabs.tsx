import {
	forwardRef, type ElementRef, type ComponentPropsWithoutRef, type ForwardedRef
} from "react";
import {
	Root,
	List,
	Trigger,
	Content
} from "@radix-ui/react-tabs";

import { cn } from "./mergeStyle";

export const Tabs = Root;

export const TabsList = forwardRef<
	ElementRef<typeof List>,
	ComponentPropsWithoutRef<typeof List>&{size?:"sm"|"md"|"lg"}
>(({ className,size="md", ...props }, ref:ForwardedRef<ElementRef<typeof List>>) => (
	<List
		ref={ref}
		className={cn(
			"twcss-inline-flex twcss-items-center twcss-justify-center twcss-rounded-md twcss-bg-theme-bg",
			"twcss-p-1 twcss-text-theme-subtext",
			size==="lg"&&"twcss-h-12",
			size==="md"&&"twcss-h-10",
			size==="sm"&&"twcss-h-8",
			className
		)}
		{...props}
	/>
))
TabsList.displayName = List.displayName

export const TabsTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>&{size?:"sm"|"md"|"lg"}
>(({ className,size="md", ...props }, ref:ForwardedRef<ElementRef<typeof Trigger>>) => (
	<Trigger
		ref={ref}
		className={cn(
			"twcss-inline-flex twcss-items-center twcss-justify-center twcss-whitespace-nowrap twcss-rounded-sm twcss-px-2 twcss-py-1 twcss-font-medium",
			"twcss-ring-offset-background twcss-transition-all disabled:twcss-opacity-50",
			"focus-visible:twcss-outline-none disabled:twcss-pointer-events-none",
			"data-[state=active]:twcss-bg-theme-box data-[state=active]:twcss-text-theme-text data-[state=active]:twcss-shadow-sm",
			// "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			size==="lg"&&"twcss-text-[1.2rem]",
			size==="md"&&"twcss-text-[1rem]",
			size==="sm"&&"twcss-text-tall",
			className
		)}
		{...props}
	/>
))
TabsList.displayName = Trigger.displayName

export const TabsContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref:ForwardedRef<ElementRef<typeof Content>>) => (
	<Content
		ref={ref}
		className={cn(
			"twcss-mt-2 focus-visible:twcss-outline-none",
			// "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			className
		)}
		{...props}
	/>
))
TabsContent.displayName = Content.displayName
