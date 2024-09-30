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
			"inline-flex items-center justify-center rounded-md bg-theme-bg",
			"p-1 text-theme-subtext",
			size==="lg"&&"h-12",
			size==="md"&&"h-10",
			size==="sm"&&"h-8",
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
			"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 font-medium",
			"ring-offset-background transition-all disabled:opacity-50",
			"focus-visible:outline-none disabled:pointer-events-none",
			"data-[state=active]:bg-theme-box data-[state=active]:text-theme-text data-[state=active]:shadow-sm",
			// "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			size==="lg"&&"text-[1.2rem]",
			size==="md"&&"text-[1rem]",
			size==="sm"&&"text-tall",
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
			"mt-2 focus-visible:outline-none",
			// "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			className
		)}
		{...props}
	/>
))
TabsContent.displayName = Content.displayName
