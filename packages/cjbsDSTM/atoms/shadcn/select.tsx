import { forwardRef, type ForwardedRef, type ElementRef, type ComponentPropsWithoutRef } from "react";

import {
	Root, Group, Value, Trigger, Icon,
	ScrollDownButton, ScrollUpButton,
	Content, Portal, Viewport, ItemIndicator, Item,
	Separator, Label, ItemText
} from "@radix-ui/react-select";
import { LuCheck } from "@react-icons/all-files/lu/LuCheck";
import { LuChevronUp } from "@react-icons/all-files/lu/LuChevronUp";
import { LuChevronDown } from "@react-icons/all-files/lu/LuChevronDown";

import { cn } from "./mergeStyle";

export const Select = Root;
export const SelectGroup = Group;
export const SelectValue = Value;

export const SelectTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref: ForwardedRef<ElementRef<typeof Trigger>>)=>(
	<Trigger
		ref={ref}
		className={cn(
			"flex h-8 w-full items-center justify-between rounded-md border-solid border",
			"border-theme-border bg-theme-box px-2 py-1 text-tall",
			"text-theme-text",
			"placeholder:text-muted-foreground",
			"data-[placeholder]:text-muted-foreground",
			"hover:border-theme-text focus:border-theme-text data-[state=open]:border-theme-primary",
			"focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
			// "ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
			className
		)}
		{...props}
	>
		{children}
		<Icon asChild>
			<LuChevronDown className="h-4 w-4 opacity-50 text-theme-text"/>
		</Icon>
	</Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

export const SelectScrollUpButton = forwardRef<
	ElementRef<typeof ScrollUpButton>,
	ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof ScrollUpButton>>)=>(
	<ScrollUpButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className
		)}
		{...props}
	>
		<LuChevronUp className="h-4 w-4"/>
	</ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

export const SelectScrollDownButton = forwardRef<
	ElementRef<typeof ScrollDownButton>,
	ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof ScrollDownButton>>)=>(
	<ScrollDownButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className
		)}
		{...props}
	>
		<LuChevronDown className="h-4 w-4"/>
	</ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

export const SelectContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content> & {
		container?: HTMLElement | undefined | null;
	}
>(({ className, children, position = "popper", container, ...props }, ref: ForwardedRef<ElementRef<typeof Content>>)=>(
	<Portal container={container ?? undefined}>
		<Content
			ref={ref}
			className={cn(
				"relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				// "bg-popover text-popover-foreground",
				"bg-theme-box text-theme-text border-theme-border",
				position === "popper" &&
				"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
				className
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton/>
			<Viewport
				className={cn(
					"p-1",
					position === "popper" &&
					"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
				)}
			>
				{children}
			</Viewport>
			<SelectScrollDownButton/>
		</Content>
	</Portal>
));
SelectContent.displayName = Content.displayName;

export const SelectLabel = forwardRef<
	ElementRef<typeof Label>,
	ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Label>>)=>(
	<Label
		ref={ref}
		className={cn(
			"py-1.5 pl-8 pr-2 text-tall font-semibold",
			className
		)}
		{...props}
	/>
));
SelectLabel.displayName = Label.displayName;

export const SelectItem = forwardRef<
	ElementRef<typeof Item>,
	ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref: ForwardedRef<ElementRef<typeof Item>>)=>(
	<Item
		ref={ref}
		className={cn(
			"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-tall outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			"focus:bg-theme-text-hover focus:text-accent-foreground",
			className
		)}
		{...props}
	>
		<span
			className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
		>
			<ItemIndicator>
				<LuCheck className="h-4 w-4"/>
			</ItemIndicator>
		</span>

		<ItemText>{children}</ItemText>
	</Item>
));
SelectItem.displayName = Item.displayName;

export const SelectSeparator = forwardRef<
	ElementRef<typeof Separator>,
	ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Separator>>)=>(
	<Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = Separator.displayName;
