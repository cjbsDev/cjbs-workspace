import type {
	ForwardedRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes
} from "react";

import {
	Root, Trigger, Group, Portal, Sub, Item,
	RadioGroup, SubTrigger, SubContent, Content,
	CheckboxItem, RadioItem, ItemIndicator, Label, Separator
} from "@radix-ui/react-dropdown-menu";


import { forwardRef } from "react";
import { LuCircle } from "@react-icons/all-files/lu/LuCircle";
import { LuCheck } from "@react-icons/all-files/lu/LuCheck";
import { LuChevronRight } from "@react-icons/all-files/lu/LuChevronRight";

import { cn } from "./mergeStyle";

export const DropdownMenu = Root;
export const DropdownMenuTrigger = Trigger;
export const DropdownMenuGroup = Group;
export const DropdownMenuPortal = Portal;
export const DropdownMenuSub = Sub;
export const DropdownMenuRadioGroup = RadioGroup;

export const DropdownMenuSubTrigger = forwardRef<
	ElementRef<typeof SubTrigger>,
	ComponentPropsWithoutRef<typeof SubTrigger> & {
		inset?: boolean
	}
>(({ className, inset, children, ...props }, ref: ForwardedRef<ElementRef<typeof SubTrigger>>) => (
	<SubTrigger
		ref={ref}
		className={cn(
			"twcss-flex twcss-cursor-default twcss-select-none twcss-items-center twcss-rounded-sm twcss-px-2 twcss-py-1.5 twcss-text-tall twcss-outline-none",
			// "focus:bg-accent data-[state=open]:bg-accent",
			inset && "pl-8",
			"focus:twcss-bg-theme-text-hover data-[state=open]:twcss-bg-theme-text-hover",
			className
		)}
		{...props}
	>
		{children}
		<LuChevronRight className="twcss-ml-auto twcss-h-4 twcss-w-4" />
	</SubTrigger>
));
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

export const DropdownMenuSubContent = forwardRef<
	ElementRef<typeof SubContent>,
	ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof SubContent>>)=>(
	<SubContent
		ref={ref}
		className={cn(
			"twcss-z-50 twcss-min-w-[8rem] twcss-overflow-hidden twcss-rounded-md twcss-border twcss-p-1 twcss-shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			// "bg-popover text-popover-foreground",
			"twcss-bg-theme-box twcss-text-theme-text",
			className
		)}
		{...props}
	/>
));
DropdownMenuSubContent.displayName = SubContent.displayName;

export const DropdownMenuContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content> & {
		container?: HTMLElement | null | undefined;
	}
>(({ className, sideOffset = 4, container, ...props }, ref: ForwardedRef<ElementRef<typeof Content>>)=>(
	<Portal container={container}>
		<Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
				"data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				"twcss-z-50 twcss-min-w-[8rem] twcss-overflow-hidden twcss-rounded-md twcss-border twcss-p-1 twcss-shadow-md",
				"twcss-bg-theme-box twcss-text-theme-text",
				// "bg-popover text-popover-foreground",
				className
			)}
			{...props}
		/>
	</Portal>
));
DropdownMenuContent.displayName = Content.displayName;

export const DropdownMenuItem = forwardRef<
	ElementRef<typeof Item>,
	ComponentPropsWithoutRef<typeof Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref: ForwardedRef<ElementRef<typeof Item>>)=>(
	<Item
		ref={ref}
		className={cn(
			"twcss-relative twcss-flex twcss-cursor-default twcss-select-none twcss-items-center twcss-rounded-sm twcss-px-2 twcss-py-1.5 twcss-text-tall twcss-outline-none twcss-transition-colors data-[disabled]:twcss-pointer-events-none data-[disabled]:twcss-opacity-50",
			inset && "pl-8",
			// "focus:bg-accent focus:text-accent-foreground",
			"focus:twcss-bg-theme-text-hover",
			className
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = Item.displayName;

export const DropdownMenuCheckboxItem = forwardRef<
	ElementRef<typeof CheckboxItem>,
	ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref: ForwardedRef<ElementRef<typeof CheckboxItem>>)=>(
	<CheckboxItem
		ref={ref}
		className={cn(
			"twcss-relative twcss-flex twcss-cursor-default twcss-select-none twcss-items-center twcss-rounded-sm twcss-py-1.5 twcss-pl-8 twcss-pr-2 twcss-text-tall twcss-outline-none twcss-transition-colors focus:twcss-bg-accent focus:twcss-text-accent-foreground data-[disabled]:twcss-pointer-events-none data-[disabled]:twcss-opacity-50",
			className
		)}
		checked={checked}
		{...props}
	>
		<span className="twcss-absolute twcss-left-2 twcss-flex twcss-h-3.5 twcss-w-3.5 twcss-items-center twcss-justify-center">
			<ItemIndicator>
				<LuCheck className="h-4 w-4" />
			</ItemIndicator>
		</span>
		{children}
	</CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;

export const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof RadioItem>,
	ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref: ForwardedRef<ElementRef<typeof RadioItem>>)=>(
	<RadioItem
		ref={ref}
		className={cn(
			"twcss-relative twcss-flex twcss-cursor-default twcss-select-none twcss-items-center twcss-rounded-sm twcss-py-1.5 twcss-pl-8 twcss-pr-2 twcss-text-tall twcss-outline-none twcss-transition-colors focus:twcss-bg-accent focus:twcss-text-accent-foreground data-[disabled]:twcss-pointer-events-none data-[disabled]:twcss-opacity-50",
			className
		)}
		{...props}
	>
		<span className="twcss-absolute twcss-left-2 twcss-flex twcss-h-3.5 twcss-w-3.5 twcss-items-center twcss-justify-center">
			<ItemIndicator>
				<LuCircle className="twcss-h-2 twcss-w-2 twcss-fill-current" />
			</ItemIndicator>
		</span>
		{children}
	</RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;

export const DropdownMenuLabel = forwardRef<
	ElementRef<typeof Label>,
	ComponentPropsWithoutRef<typeof Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref: ForwardedRef<ElementRef<typeof Label>>)=>(
	<Label
		ref={ref}
		className={cn(
			"twcss-px-2 twcss-py-1.5 twcss-text-tall twcss-font-semibold",
			inset && "twcss-pl-8",
			className
		)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = Label.displayName;

export const DropdownMenuSeparator = forwardRef<
	ElementRef<typeof Separator>,
	ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref: ForwardedRef<ElementRef<typeof Separator>>)=>(
	<Separator
		ref={ref}
		className={cn(
			// "bg-muted"
			"twcss-bg-theme-border",
			"-twcss-mx-1 twcss-my-1 twcss-h-px",
			className
		)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName = Separator.displayName;

export const DropdownMenuShortcut = ({
	className,
	...props
}:HTMLAttributes<HTMLSpanElement>) => {
	return(
		<span
			className={cn(
				"twcss-ml-auto twcss-text-short twcss-tracking-widest twcss-opacity-60",
				className
			)}
			{...props}
		/>
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
