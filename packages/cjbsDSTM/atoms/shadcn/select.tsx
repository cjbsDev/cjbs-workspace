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
			"twcss-flex twcss-h-8 twcss-w-full twcss-items-center twcss-justify-between twcss-rounded-md twcss-border-solid twcss-border",
			"twcss-border-theme-border twcss-bg-theme-box twcss-px-2 twcss-py-1 text-tall",
			"twcss-text-theme-text",
			"placeholder:twcss-text-muted-foreground",
			"data-[placeholder]:twcss-text-muted-foreground",
			"hover:twcss-border-theme-text focus:twcss-border-theme-text data-[state=open]:twcss-border-theme-primary",
			"focus:twcss-outline-none disabled:twcss-cursor-not-allowed disabled:twcss-opacity-50 [&>span]:twcss-line-clamp-1",
			// "ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
			className
		)}
		{...props}
	>
		{children}
		<Icon asChild>
			<LuChevronDown className="twcss-h-4 twcss-w-4 twcss-opacity-50 text-theme-text"/>
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
			"twcss-flex twcss-cursor-default twcss-items-center twcss-justify-center twcss-py-1",
			className
		)}
		{...props}
	>
		<LuChevronUp className="twcss-h-4 twcss-w-4"/>
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
			"twcss-flex twcss-cursor-default twcss-items-center twcss-justify-center twcss-py-1",
			className
		)}
		{...props}
	>
		<LuChevronDown className="twcss-h-4 twcss-w-4"/>
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
				"twcss-relative twcss-z-50 twcss-max-h-96 twcss-min-w-[8rem] twcss-overflow-hidden twcss-rounded-md twcss-border twcss-shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				// "bg-popover text-popover-foreground",
				"twcss-bg-theme-box twcss-text-theme-text twcss-border-theme-border",
				position === "popper" &&
				"data-[side=bottom]:twcss-translate-y-1 data-[side=left]:-twcss-translate-x-1 data-[side=right]:twcss-translate-x-1 data-[side=top]:-twcss-translate-y-1",
				className
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton/>
			<Viewport
				className={cn(
					"twcss-p-1",
					position === "popper" &&
					"twcss-h-[var(--radix-select-trigger-height)] twcss-w-full twcss-min-w-[var(--radix-select-trigger-width)]",
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
			"twcss-py-1.5 twcss-pl-8 twcss-pr-2 twcss-text-tall twcss-font-semibold",
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
			"twcss-relative twcss-flex twcss-w-full twcss-cursor-default twcss-select-none twcss-items-center twcss-rounded-sm twcss-py-1.5 twcss-pl-8 twcss-pr-2 text-tall twcss-outline-none data-[disabled]:twcss-pointer-events-none data-[disabled]:twcss-opacity-50",
			"focus:twcss-bg-theme-text-hover focus:twcss-text-accent-foreground",
			className
		)}
		{...props}
	>
		<span
			className="twcss-absolute twcss-left-2 twcss-flex twcss-h-3.5 twcss-w-3.5 twcss-items-center twcss-justify-center"
		>
			<ItemIndicator>
				<LuCheck className="twcss-h-4 twcss-w-4"/>
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
		className={cn("-twcss-mx-1 twcss-my-1 twcss-h-px twcss-bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = Separator.displayName;
