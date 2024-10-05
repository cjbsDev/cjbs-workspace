import type { HTMLAttributes, ForwardedRef, TdHTMLAttributes } from "react";

import { forwardRef } from "react";
import { cn } from "./mergeStyle";

export const Table = forwardRef<
    HTMLTableElement,
    HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableElement>) => (
    <table
        ref={ref}
        className={cn(
            "twcss-w-full twcss-caption-bottom twcss-text-tall"
        )}
        {...props}
    />
));
Table.displayName = "Table";

export const TableHeader = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableSectionElement>) => (
    <thead
        ref={ref}
        className={cn(
            className
        )}
        {...props}
    />
));
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableSectionElement>) => (
    <tbody
        ref={ref}
        className={cn(
            className
        )}
        {...props}
    />
));
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableSectionElement>) => (
    <tfoot
        ref={ref}
        className={cn(
            "twcss-border-t twcss-bg-muted/50 twcss-font-medium [&>tr]:last:twcss-border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableRowElement>) => (
    <tr
        ref={ref}
        className={cn(
            "twcss-border-t twcss-border-theme-border",
            "twcss-transition-colors",
            "hover:twcss-bg-theme-transparent-hover data-[state=selected]:twcss-bg-theme-text-hover",
            className
        )}
        {...props}
    />
))
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
    HTMLTableCellElement,
    HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableCellElement>) => (
    <th
        ref={ref}
        className={cn(
            "twcss-transition-colors",
            "twcss-text-theme-text twcss-bg-theme-box hover:twcss-bg-theme-text-hover",
            "twcss-h-8 twcss-px-2 twcss-text-left twcss-align-middle twcss-font-medium",
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableCellElement>) => (
    <td
        ref={ref}
        role="cell"
        className={cn(
            "twcss-h-auto twcss-px-2 twcss-py-1 twcss-align-middle",
            "twcss-text-theme-text",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref:ForwardedRef<HTMLTableCaptionElement>)=>(
	<caption
		ref={ref}
		className={cn(
			"twcss-mt-4 text-tall twcss-text-muted-foreground",
			className
		)}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";