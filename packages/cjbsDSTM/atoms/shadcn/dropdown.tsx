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
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-tall outline-none",
			// "focus:bg-accent data-[state=open]:bg-accent",
			inset && "pl-8",
			"focus:bg-theme-text-hover data-[state=open]:bg-theme-text-hover",
			className
		)}
		{...props}
	>
		{children}
		<LuChevronRight className="ml-auto h-4 w-4" />
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
			"z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			// "bg-popover text-popover-foreground",
			"bg-theme-box text-theme-text",
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
				"z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
				"bg-theme-box text-theme-text",
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
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-tall outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			inset && "pl-8",
			// "focus:bg-accent focus:text-accent-foreground",
			"focus:bg-theme-text-hover",
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
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-tall outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-tall outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<LuCircle className="h-2 w-2 fill-current" />
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
			"px-2 py-1.5 text-tall font-semibold",
			inset && "pl-8",
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
			"bg-theme-border",
			"-mx-1 my-1 h-px",
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
				"ml-auto text-short tracking-widest opacity-60",
				className
			)}
			{...props}
		/>
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
