import type { HTMLAttributes, ForwardedRef, TdHTMLAttributes } from "react";

import { forwardRef } from "react";
import { cn } from "./mergeStyle";

const Table = forwardRef<
    HTMLTableElement,
    HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableElement>) => (
    <table
        ref={ref}
        className={cn(
            "w-full caption-bottom text-tall"
        )}
        {...props}
    />
));
Table.displayName = "Table";

const TableHeader = forwardRef<
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

const TableBody = forwardRef<
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

const TableFooter = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableSectionElement>) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableRowElement>) => (
    <tr
        ref={ref}
        className={cn(
            "border-t border-theme-border",
            "transition-colors",
            "hover:bg-theme-transparent-hover data-[state=selected]:bg-theme-text-hover",
            className
        )}
        {...props}
    />
))
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
    HTMLTableCellElement,
    HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableCellElement>) => (
    <th
        ref={ref}
        className={cn(
            "transition-colors",
            "text-theme-text bg-theme-box hover:bg-theme-text-hover",
            "h-8 px-2 text-left align-middle font-medium",
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLTableCellElement>) => (
    <td
        ref={ref}
        role="cell"
        className={cn(
            "h-auto px-2 py-1 align-middle",
            "text-theme-text",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref:ForwardedRef<HTMLTableCaptionElement>)=>(
	<caption
		ref={ref}
		className={cn(
			"mt-4 text-tall text-muted-foreground",
			className
		)}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";