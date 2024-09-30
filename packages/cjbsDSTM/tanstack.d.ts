import type { Dispatch, ReactElement, SetStateAction } from "react";
import type { FilterFn } from "@tanstack/react-table";
import '@tanstack/react-table' //or vue, svelte, solid, etc.
import '@tanstack/table-core'
import { RowData } from "@tanstack/react-table";

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		isVisible?: boolean;
		header?: string;
		dataType?: "string" | "number" | "date" | "enum" | "tag";
		enum?: string[];
		enumObject?: {
			name: string;
			value: string;
			icon?: ReactElement;
		}[];
		enableMultiline?: boolean;
		isEditable?: boolean;
		isMetadata?: boolean;
		isDeletable?: boolean;
	}

	interface FilterFns {
		inDateRange: FilterFn<unknown>;
		inEnum: FilterFn<unknown>;
		// tagsSome: FilterFn<unknown>;
		// tagsAll: FilterFn<unknown>;
		inTags: FilterFn<unknown>;
		advanced: FilterFn<unknown>;
	}

	interface TableMeta<TData extends RowData> {
		enableMultiFilter: boolean;
		setEnableMultiFilter: Dispatch<SetStateAction<boolean>>;
		enableVisibility: boolean;
		setEnableVisibility: Dispatch<SetStateAction<boolean>>;
		enablePinning: boolean;
		setEnablePinning: Dispatch<SetStateAction<boolean>>;
		enableEdit?: boolean;
		updateMeta: (rowIndex: number, columnId: string, value: unknown, newArray?: any) => void;
		updateColumn: (columnIndex: number, value: string, newCols?:any) => void;
	}
}

declare module '@tanstack/table-core' {
	interface TableMeta<TData> {
		enableMultiFilter: boolean;
		setEnableMultiFilter: Dispatch<SetStateAction<boolean>>;
		enableVisibility: boolean;
		setEnableVisibility: Dispatch<SetStateAction<boolean>>;
		enablePinning: boolean;
		setEnablePinning: Dispatch<SetStateAction<boolean>>;
		enableEdit?: boolean;
		updateMeta?: (rowIndex: number, columnId: string, value: unknown, newArray?: any) => void;
		updateColumn?: (columnIndex: number, value: string, newCols?:any) => void;
	}
	interface FilterFns {
		inDateRange: FilterFn<unknown>;
		inEnum: FilterFn<unknown>;
		// tagsSome: FilterFn<unknown>;
		// tagsAll: FilterFn<unknown>;
		inTags: FilterFn<unknown>;
		advanced: FilterFn<unknown>;
	}
}
