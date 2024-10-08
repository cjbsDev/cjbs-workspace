import type { 
    ColumnDef,
    ColumnFiltersState,
    ColumnPinningState,
    SortingState,
    RowSelectionState,
    Table as TableType,
    VisibilityState,
    Row,
    Column,
	TableMeta
} from "@tanstack/react-table";

import type { 
    Dispatch, 
    SetStateAction,
    ReactElement,
    ReactNode,
    CSSProperties,
} from "react";

import { 
    useMemo,
    useState,
    useEffect,
    useCallback,
    useRef,
	Fragment
} from "react";
import {
    useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { LuSlidersHorizontal } from "@react-icons/all-files/lu/LuSlidersHorizontal";
import { LuEye } from "@react-icons/all-files/lu/LuEye";
import { LuEyeOff } from "@react-icons/all-files/lu/LuEyeOff";
import { LuChevronsRight } from "@react-icons/all-files/lu/LuChevronsRight";
import { LuChevronRight } from "@react-icons/all-files/lu/LuChevronRight";
import { LuChevronLeft } from "@react-icons/all-files/lu/LuChevronLeft";
import { LuChevronsLeft } from "@react-icons/all-files/lu/LuChevronsLeft";
import { LuArrowUp } from "@react-icons/all-files/lu/LuArrowUp";
import { LuArrowDown } from "@react-icons/all-files/lu/LuArrowDown";
import { LuX } from "@react-icons/all-files/lu/LuX";
import { LuPlus } from "@react-icons/all-files/lu/LuPlus";

import { useDebounce } from "./useDebounce";
import { cn } from "./mergeStyle";
import { Checkbox } from "./checkbox";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, EzButton } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Label } from "./label";
import { Switch } from "./switch";
import { EzFilterInputs } from "./input";
import { ScrollArea } from "./scrollarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { tablePaginationClasses } from "@mui/material";

// import "./tailwind.scss";
interface EzTableProps<TData, TValue> {
    columns: ColumnDef<TData,TValue>[];
    data: TData[];
    isLoading?: boolean;
    enableSelect?: boolean;
    disableSelectOn?: (row: TData) => boolean;
    enableMultiSelect?: boolean;
    idKey?: string;
    metaKey?: string;
    id?: string;

    /*
    * Dynamic Pagination Options
    */
    enableDynamic?: boolean;
	refetchData?: () => void;
	paginationState?: {
		pageIndex: number;
		pageSize: number;
	},
	setPaginationState?: Dispatch<SetStateAction<any>>;
	rowCount?: number;
	filterState?: ColumnFiltersState;
	setFilterState?: Dispatch<SetStateAction<any>>;
	globalFilterState?: string;
	setGlobalFilterState?: Dispatch<SetStateAction<any>>;
	sortState?: SortingState;
	setSortState?: Dispatch<SetStateAction<any>>;
	rowSelectionState?: RowSelectionState;
	setRowSelectionState?: Dispatch<SetStateAction<any>>;

    /*
    * Table Options
    */
    enableTableOption?: boolean;
	enableTablePageInfo?: boolean;
	enableTopBar?: boolean;
	enableFilter?: boolean;
	enableVirtualization?: boolean;
	enableTabs?: boolean;
	enableEdit?: boolean;
	tabsKey?: string;
	highlightOn?: (row:TData) => boolean;
	highlightStyle?: (row:TData, refs:any) => ReactElement | ReactElement[] | ReactNode;
	highlightOdd?: boolean;
	selectType?: "all" | "page";
	options?: {
		useMultiFilter?: boolean;
		useColumnVisibility?: boolean;
		usePinning?: boolean;
		paginationSibling?: number;
		paginationBoundary?: number;
	},

    /*
    * Custom Function Bar
    */
    customCard?: (columns:ColumnDef<TData,TValue>[],rows:Row<TData>[], currentWidth: number|undefined) => ReactElement | ReactElement[] | ReactNode;
	customCardThreshold?: number | boolean;
	customTopBar?: ReactElement | ReactElement[];
	customTopBarWithData?: (data:TData[]) => ReactElement | ReactElement[];
	customFilter?: {
		useOriginalFilter: boolean;
		renderCustomFilter?: (
			setSelectedCol?: Dispatch<SetStateAction<string>>,
			setColumnFilterState?: Dispatch<SetStateAction<any>>,
			setGlobalFilterState?: Dispatch<SetStateAction<any>>,
			columns?: ColumnDef<TData,TValue>[],
			table?: TableType<any>,
		) => ReactElement;
	}
};

export function EzTable<TData, TValue>({
    columns,
    data,
    isLoading=false,
    enableSelect=false,
    disableSelectOn,
    enableMultiSelect,
    idKey,
    metaKey,
    id,

    /*
    * Dynamic Properties
    */
    enableDynamic=false,
    refetchData,
    paginationState,
    setPaginationState,
    rowCount,
    filterState,
    setFilterState,
    globalFilterState,
    setGlobalFilterState,
    sortState,
    setSortState,
    rowSelectionState,
    setRowSelectionState,

    /*
    * Table Options
    */
    enableTableOption=false,
    enableTablePageInfo=true,
    enableTopBar=true,
    enableFilter=true,
    enableVirtualization=false,
    enableTabs=false,
    enableEdit=false,
    tabsKey,
    highlightOn,
    highlightStyle,
	highlightOdd=false,
    selectType="all",
    options={
		useMultiFilter: false,
		useColumnVisibility: false,
		usePinning: false,
		paginationSibling:2,
		paginationBoundary:1
	},

    /*
    * Custom Function Bar
    */
    customCard,
	customCardThreshold=512,
	customTopBar,
	customTopBarWithData,
	customFilter={
		useOriginalFilter: false,
		renderCustomFilter: undefined,
	},
}:EzTableProps<TData, TValue>) {
    /*
    * Initial State & Internal State
    */
    const initialColState = useMemo(()=>columns.map((v: ColumnDef<TData, TValue>)=>({
		[v.id as string]: v.meta!==undefined ? v.meta.isVisible as boolean : true
	})).reduce((obj, item) => ({
		...obj,
		...item
	}),{}),[columns]);
    const [ colVis, setColVis ] = useState<VisibilityState>(initialColState);
	const [ enableVis, setEnableVis ] = useState<boolean>(true);
	const [ activeTab, setActiveTab ] = useState<string>("");
	const [ editableData, setEditableData ] = useState<TData[]>([]);
	const [ editableColumns, setEditableColumns ] = useState<ColumnDef<TData,TValue>[]>([]);

    useEffect(()=>{
		setEditableData(data)
	},[data])
	useEffect(()=>{
		setEditableColumns(columns);
	},[columns])

    const containerRef = useRef<HTMLDivElement>(null);

    /*
	* Pagination
	*/
	const [ pagination, setPagination ] = useState(paginationState ?? {
		pageIndex: 0,
		pageSize: 25
	});

	/*
	* Sort
	*/
	const [ sortOrder, setSortOrder ] = useState<SortingState>([]);

	/*
	* Selection
	*/
	const [ rowSelection, setRowSelection ] = useState({});

	/*
	* Pinning
	* Needs to define sizes for every single column to work flawlessly
	*/
	const [ enablePinning, setEnablePinning ] = useState<boolean>(false);
	const [ columnPinning, setColumnPinning ] = useState<ColumnPinningState>({
		left: enableSelect ? ["selectRow"] : [],
		right: []
	});

	/*
	* Filters
	*/
	const [ enableMultiFilter, setEnableMultiFilter ] = useState<boolean>(false);
	const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([]);
	const [ globalFilters, setGlobalFilters ] = useState("")
	const [ selectedCol, setSelectedCol ] = useState<string>("");
    const debouncedFilter = useDebounce(filterState ?? columnFilters, 500);
	const debouncedGlobalFilter = useDebounce(globalFilterState ?? globalFilters, 500);

    /*
    * Table Column
    */
    const tableColumns:ColumnDef<TData, TValue>[] = useMemo(()=>enableSelect&&data.length>0
		? [
			{
				id: "selectRow",
				accessorKey: "selectRow",
				accessorFn: (row:any, rowIdx:number)=>{
					if(idKey) {
						if(rowSelectionState) {
							if(Object.keys(rowSelectionState).includes(row[idKey])) return true
							return false
						}
						else {
							if(Object.keys(rowSelection).includes(row[idKey])) return true
							return false
						}
					}
					else {
						if(rowSelectionState) {
							if(Object.keys(rowSelectionState).includes(rowIdx.toString())) return true
							return false
						}
						else {
							if(Object.keys(rowSelection).includes(rowIdx.toString())) return true
							return false
						}
					}
				},
				header: ({ table }) => {
					if(enableSelect&&([undefined,true].includes(enableMultiSelect))) {
						// console.log(table.getSelectedRowModel)
						return(
							<span className="flex h-full items-center justify-center" onClick={(e)=>{
								e.preventDefault();
								e.stopPropagation();
							}}>
							<Checkbox
								className="border-theme-text hover:borer-theme-text"
								checked={
									disableSelectOn&&rowSelectionState
									? table.getSelectedRowModel().rows.length===Object.keys(rowSelectionState).length&&table.getSelectedRowModel().rows.length!==0&&Object.keys(rowSelectionState).length!==0
									: disableSelectOn&&!rowSelectionState&&rowSelection
									? table.getSelectedRowModel().rows.length===Object.keys(rowSelection).length&&table.getSelectedRowModel().rows.length!==0&&Object.keys(rowSelection).length!==0
									: selectType==="all"
									? table.getIsAllPageRowsSelected()
									: table.getIsSomePageRowsSelected() && "indeterminate"
									// table.getIsAllPageRowsSelected() ||
									// (table.getIsSomePageRowsSelected() && "indeterminate")
								}
								// onCheckedChange={(value)=>table.toggleAllPageRowsSelected(!!value)}
								onCheckedChange={(value)=>{
									if(disableSelectOn) {
										if(selectType==="all") {
											// console.log(table.getCoreRowModel().rows)
											const rowsToSelect = table.getCoreRowModel().rows
												// .filter((v)=>!disableSelectOn(v.original))
												.map((v:any,idx:number)=>{
													if(!disableSelectOn(v.original)) {

														if(idKey) return v.original[idKey as any]
														return idx;
													}
													return undefined
												})
												.filter((v)=>v!==undefined)
												.reduce((acc,cur)=>{
														acc[cur] = value;
                                                        return acc;
												},{})
											;
											// console.log("Header Checkbox :",table.getCoreRowModel().rows.map((v:any,idx:number)=>{
											// 	if(!disableSelectOn(v.original)) {

											// 		if(idKey) return v.original[idKey as any]
											// 		return idx;
											// 	}
											// 	return undefined
											// }))
											table.setRowSelection(rowsToSelect);
										}
										else {
											const rowsToSelect = table.getPaginationRowModel().rows
												.map((v:any,idx:number)=>{
													if(!disableSelectOn(v.original)) {

														if(idKey) return v[idKey as any]
														return idx;
													}
													return undefined
												})
												.filter((v)=>v!==undefined)
												.reduce((acc,cur)=>{
														acc[cur] = value;
                                                        return acc;
												},{})
											;
											table.setRowSelection(rowsToSelect);
										}
									}
									else {
										if(selectType==="all") return table.toggleAllRowsSelected(!!value)
										else return table.toggleAllPageRowsSelected(!!value)
									}
								}}
								aria-label="Select all"
								// disabled={disableSelectOn ? disableSelectOn(row.original) : undefined}
							/>
							</span>
						);
					}
					return(
						<span className="flex h-full items-center justify-center">
							Select
						</span>
					)
				},
				cell: ({ row }) => {
					if(enableSelect&&([undefined,true].includes(enableMultiSelect))) {
						return(
							<span className="flex h-full items-center justify-center">
							<Checkbox
								className="border-theme-text hover:borer-theme-text"
								checked={row.getIsSelected()}
								onCheckedChange={(value) => row.toggleSelected(!!value)}
								aria-label="Select row"
								disabled={disableSelectOn ? disableSelectOn(row.original) : undefined}
							/>
							</span>
						);
					}
					return(
						<span className="flex h-full items-center justify-center">
							<Checkbox
								// className="hover:borer-theme-text"
								checked={row.getIsSelected()}
								onCheckedChange={(value) => {
									table.resetRowSelection();
									row.toggleSelected(!!value);
								}}
								radioShape
								aria-label="Select row"
								disabled={disableSelectOn ? disableSelectOn(row.original) : undefined}
							/>
						</span>
					);
				},
				enableColumnFilter: false,
				enableGlobalFilter: false,
				enableSorting: true,
				enableMultiSort: true,
				enablePinning: false,
				enableHiding: false,
				size: 'auto' as unknown as number,
				sortingFn: (a:any,b:any)=>{
					if(idKey) {
						if(rowSelectionState) {
							const aV = Object.keys(rowSelectionState).includes(a.original[idKey].toString()) ? 1 : 0;
							const bV = Object.keys(rowSelectionState).includes(b.original[idKey].toString()) ? 1 : 0;
							// console.log("Sorting Fn :",Object.keys(rowSelectionState), a.original[idKey], Object.keys(rowSelectionState).includes(a.original[idKey]))
							return aV - bV;
						}
						else {
							const aV = Object.keys(rowSelection).includes(a.original[idKey].toString()) ? 1 : 0;
							const bV = Object.keys(rowSelection).includes(b.original[idKey].toString()) ? 1 : 0;
							return aV - bV;
						}
					}
					else {
						const idxA = a.index;
						const idxB = b.index;
						if(rowSelectionState) {
							const aV = Object.keys(rowSelectionState).includes(idxA.toString()) ? 1 : 0;
							const bV = Object.keys(rowSelectionState).includes(idxB.toString()) ? 1 : 0;
							return aV - bV;
						}
						else {
							const aV = Object.keys(rowSelection).includes(idxA.toString()) ? 1 : 0;
							const bV = Object.keys(rowSelection).includes(idxB.toString()) ? 1 : 0;
							return aV - bV;
						}
					}
				},
				meta: {
					isVisible: false,
					header: "Select"
				}
			},
			...editableColumns
		]
		: editableColumns
	,[editableColumns,data.length,enableSelect, selectType,columns,disableSelectOn,rowSelection,rowSelectionState]);

    /*
    * Table Define
    */
    const table = useReactTable({
		// data: data ?? [],
		data: editableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),

		/*
		* Filter
		*/
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setFilterState ?? setColumnFilters,
		enableGlobalFilter: selectedCol==="",
		onGlobalFilterChange: setGlobalFilterState ?? setGlobalFilters,
		globalFilterFn: enableMultiFilter ? "includesString" : "includesString",

		/*
		* Pagination
		*/
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPaginationState ?? setPagination,
		autoResetPageIndex: !enableDynamic,

		/*
		* Server Side Pagination
		*/
		manualPagination: enableDynamic,
		rowCount: enableDynamic ? rowCount : data.length,
		pageCount: enableDynamic ? Math.ceil(rowCount!/paginationState!.pageSize!) : Math.ceil(data.length/pagination.pageSize),

		/*
		* Visibility
		*/
		onColumnVisibilityChange: setColVis,

		/*
		* Sorting
		*/
		enableSorting: true,
		enableSortingRemoval: true,
		enableMultiSort: true,
		enableMultiRemove: true,
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSortState ?? setSortOrder,

		/*
		* Pinning
		*/
		enablePinning: true,
		onColumnPinningChange: setColumnPinning,

		/*
		* Row Selection
		*/
		onRowSelectionChange: setRowSelectionState ?? setRowSelection,
		getRowId: idKey ?  (row:any) => row[idKey] : undefined,
		enableRowSelection: enableSelect,
		enableMultiRowSelection: enableMultiSelect ? enableMultiSelect : enableSelect ? enableSelect : false,

		/*
		* Column Resize
		*/
		columnResizeMode: "onChange",
		columnResizeDirection: "rtl",
		defaultColumn: {
			minSize: 20,
			maxSize: 500,
			// cell: enableEdit ? EditableCell.cell : undefined
			// size: 300
		},

		/*
		* Custom Filters
		*/
		filterFns: {
			inDateRange: (rows, columnIds, filterValue) => {
				if(!filterValue) return true;
				const startDate = filterValue&&filterValue.from ? filterValue.from : new Date();
				const endDate = filterValue&&filterValue.to ? new Date(filterValue.to.getTime()+(1000*60*60*24-1000)) : new Date();
				const value = rows.getValue(columnIds) as string;
				const nowDate = new Date(value);
				function isValidDate(date:any) {
					return date instanceof Date && !isNaN(date.getTime());
				}
				const sd = isValidDate(startDate);
				const ed = isValidDate(endDate);
				// console.log(sd)
				// console.log(value, startDate, endDate)
				if(sd&&ed) {
					// console.log("Both Date Valid")
					if(nowDate>=startDate&&nowDate<=endDate) return true;
					return false;
				} else if(sd) {
					// console.log("SD Date Valid")
					if(nowDate>=startDate) return true;
					return false;
				} else if(ed) {
					// console.log("ED Date Valid")
					if(nowDate<=endDate) return true;
					return false;
				}
				// console.log("inDateRange rows :", rows);
				// console.log("inDateRange columnIds :", columnIds);
				// console.log("inDateRange filterValue :", filterValue);

				return true;
			},
			inEnum: (rows, columnIds, filterValue) => {
				const value = rows.getValue(columnIds) as string;
				const enums = filterValue;
				if(enums.includes(value)) return true;
				return false;
			},
			inTags: (rows, columnIds, filterValue) => {
				// console.log(filterValue)
				if(!filterValue||!filterValue.value||filterValue.value.length===0) return true;
				const targetValue = rows.getValue(columnIds) as string;
				const targetArray = targetValue
					.split(',')
					.filter((item:string) => !["",undefined,null].includes(item))
					.map((item:string) => item.toUpperCase())
				;
				if(!filterValue.isAnd) {
					const hasElement = filterValue.value
						.some((item:string)=>targetArray.includes(item.toUpperCase()))
					;
					if(hasElement) return true;
					return false
				}
				const hasElement = filterValue.value.
					every((item:string)=>targetArray.includes(item.toUpperCase()))
				;
				if(hasElement) return true;
				return false;
			},
			advanced: (rows, columnIds, filterValue) => {
				return true
			}
		},

		/*
		* Initial State
		*/
		initialState: {
			columnVisibility: {
				...initialColState
			},
			pagination: {
				pageIndex: 0,
				pageSize: 25
			},
			columnFilters: debouncedFilter,
			globalFilter: debouncedGlobalFilter,
			columnPinning,
		},

		/*
		* State
		*/
		state: {
			columnVisibility: colVis,
			pagination: paginationState ?? pagination,
			sorting: sortState ?? sortOrder,
			rowSelection: rowSelectionState ?? rowSelection,
			columnFilters: debouncedFilter,
			globalFilter: debouncedGlobalFilter,
			columnPinning
		},

		/*
		* Meta (Custom)
		*/
		meta: {
			enableMultiFilter: enableMultiFilter,
			setEnableMultiFilter: setEnableMultiFilter,
			enableVisibility: enableVis,
			setEnableVisibility: setEnableVis,
			enablePinning: enablePinning,
			setEnablePinning: setEnablePinning,
			// enableEdit: enableEdit ?? false,
			updateMeta: (rowIndex, columnId, value, newArray:TData[]) => {
				// console.log("updateMeta received parameters :",rowIndex, columnId, value, newArray)
				if(newArray) {
					// console.log("Updating Data to",newArray)
					setEditableData(newArray);
				}
				// setEditableData(value);
				// setEditableData(old =>
				// 	old.map((row, index) => {
				// 	  if (index === rowIndex) {
				// 		return {
				// 		  ...old[rowIndex]!,
				// 		  [columnId]: value,
				// 		}
				// 	  }
				// 	  return row
				// 	})
				//   )
			},
			updateColumn: (columnIndex, value, newCols) => {
				// console.log(editableColumns,columnIndex,value,newCols)
				if(newCols) {
					// console.log("updateColumn received :",newCols)
					setEditableColumns(newCols);
				}
				else {
					// console.log(
					// 	"updateColumn received.",
					// 	"updating",
					// 	columnIndex,
					// 	"column",
					// 	tableColumns[columnIndex],
					// 	"to",
					// 	value,

					// )
					setEditableColumns((_prev)=>_prev.map((col,colIdx)=>{
						if(enableSelect) {
							if(colIdx===columnIndex-1) {
								// console.log(tableColumns[colIdx])
								return {
									...col,
									id: `*${value}`,
									accessorFn: (d:any)=>d.metadata?.[value],
									header: value,
									cell: ({row, cell, renderValue, getValue}:any) => {
										return row.original.metadata?.[value]?.toString()
									},
									filterFn: "includesString",
									meta: {
										dataType: "string",
										isEditable: true,
										isMetadata: true,
										isDeletable: true,
										header: value
									}
								}
							}
							return col
						}
						if(colIdx===columnIndex) {
							return {
								...col,
								id: `*${value}`,
								accessorFn: (d:any)=>d.metadata?.[value],
								header: value,
								cell: ({row, cell, renderValue, getValue}:any) => {
									return row.original.metadata?.[value]?.toString()
								},
								filterFn: "includesString",
								meta: {
									dataType: "string",
									isEditable: true,
									isMetadata: true,
									isDeletable: true,
									header: value
								}
							}
						}
						return col
					}))
				}
			}
		}
	});

    /*
    * Virtualisation
    */
    const visibleColumns:any = table.getVisibleLeafColumns();
    const colVirt = useVirtualizer({
		count: visibleColumns.length,
		estimateSize: useCallback((index) => {
			if(visibleColumns[index].getSize()) return visibleColumns[index].getSize()
			return 150
		},[visibleColumns]),
		// estimateSize: ()=>150,
		getScrollElement: () => {
			if(typeof window==="undefined") return null;
			return document.getElementById(`viewport-table-container-${id}`)
		},
		horizontal: true,
		overscan: 3,
	});
    const virtualCols = colVirt.getVirtualItems();
    let virtualPaddingLeft: number | undefined
	let virtualPaddingRight: number | undefined
    if (colVirt && virtualCols?.length) {
		virtualPaddingLeft = virtualCols[0]?.start ?? 0
		virtualPaddingRight =
		colVirt.getTotalSize() -
		(virtualCols[virtualCols.length - 1]?.end ?? 0)
	}
    const getCommonPinningStyles = (column: Column<TData>, isHeader?:boolean): CSSProperties => {
		const isPinned = column.getIsPinned()
		const isLastLeftPinnedColumn =
			isPinned === 'left' && column.getIsLastColumn('left')
		const isFirstRightPinnedColumn =
			isPinned === 'right' && column.getIsFirstColumn('right')
		return {
			left: isPinned === 'left' ? `${column.columnDef.id==="selectRow" ? 0 : column.getAfter("left")}px` : undefined,
			opacity: isPinned ? 0.95 : 1,
			position: isPinned || isHeader ? 'sticky' : 'relative',
			// width: column.getSize(),
			zIndex: isHeader&&isPinned
				? 3
				: isPinned || isHeader
				? 2
				: 1
		}
	}

    return(
        <div
            id="ezTable"
            className={"flex flex-col overflow-hidden w-full h-full @container/table"}
        >
            {/* Table Top Bar */}
            {enableTopBar&&
            <div
                className={cn(
                    "w-full flex flex-row items-center jusitfy-end",
                    "flex-wrap gap-y-1 flex-shrink-0 py-2",
                )}
            >
                <div>
                    {customTopBarWithData
                    ? customTopBarWithData(editableData)
                    : customTopBar
                    ? customTopBar
                    : undefined
                    }
                </div>

                <div className="grow min-w-1"/>

                <EzTableTopBar
					enableFilter={enableFilter}
					enableMultiFilter={enableMultiFilter}
					enableTableOption={enableTableOption}
					options={options}
					customFilter={customFilter}
					columnFilters={filterState ?? columnFilters}
					setColumnFilters={setFilterState ?? setColumnFilters}
					globalFilters={globalFilterState ?? globalFilters}
					setGlobalFilters={setGlobalFilterState ?? setGlobalFilters}
					columns={columns}
					table={table}
					selectedCol={selectedCol}
					setSelectedCol={setSelectedCol}
				/>
            </div>
            }

            {/* Table Tabs */}
			{enableTabs&&tabsKey&&
			<Tabs
				defaultValue={activeTab}
				value={activeTab}
				onValueChange={(val)=>setActiveTab(val)}
				className="pb-2"
			>
				<TabsList size="sm" className="p-0">
				<TabsTrigger size="sm" value="">{`All (${table.getRowModel().rows.length})`}</TabsTrigger>
				{[...new Set(data.map((v:any)=>v[tabsKey]))].map((v:string)=>(
				<TabsTrigger key={`tab-${tabsKey}-${v}`} size="sm" value={v}>{`${capitalise(v)} (${table.getRowModel().rows.filter((row)=>{
					if(!enableTabs||!tabsKey) return true;
					else {
						if(v==="") return true;
						return row.original[tabsKey]===v;
					}
				}).length})`}</TabsTrigger>
				))}
				</TabsList>
			</Tabs>
			}
			
            {/* Table */}
			<ScrollArea
				id={`table-container-${id}`}
				type="hover"
				orientation="both"
				className={cn(
					"flex-grow pr-2.5"
				)}
				ref={containerRef}
			>
				<Table
					className={cn(
						"h-full grow",
						"w-full caption-bottom text-tall",
						customCard&&
						(
							(typeof customCardThreshold==="number"&&Number(containerRef.current?.clientWidth)<customCardThreshold) ||
							(typeof customCardThreshold==="boolean"&&customCardThreshold)
						) ? `hidden` : "",
						enableVirtualization && "table-fixed"
					)}
				>
					<TableHeader>
					{table.getHeaderGroups().map((headerGroup,headerGroupIdx)=>(
						<TableRow
							key={`ez-adv-table-header-${headerGroup.id}`}
							className="rounded-tl-md rounded-tr-md border-t-0 hover:bg-transparent"
						>
							{/* Pre-Padding When Virtualised */}
							{enableVirtualization&&virtualPaddingLeft ? (
								<th style={{width:virtualPaddingLeft}}/>
							) : null}

							{( enableVirtualization ? virtualCols : headerGroup.headers).map((vc:any,vci:number)=>{
							const header = enableVirtualization ? headerGroup.headers[vc.index] : vc;
							const isAsc = header.column.getIsSorted()==="asc";
							const isDesc = header.column.getIsSorted()==="desc";
							return(
							<TableHead
								key={`header-${header.id}-${vci}`}
								id={`header-${header.id}-${vci}`}
								className={cn(
									"sticky top-0 font-bold text-tall py-1",
									"[&:has([role=checkbox])>span]:justify-center",
									"[&:has([role=checkbox])>span>span]:justify-center",
									// header.column.getIndex()===1 ? "pl-0" : "",
									"bg-theme-box",
									[false,null,undefined].includes(header.column.columnDef.meta?.isEditable) &&
									[false,null,undefined].includes(header.column.columnDef.meta?.isDeletable) && "!cursor-default"&&(
									header.column.getCanSort() ||
									header.column.getCanMultiSort())
									? "cursor-pointer"
									: "cursor-default",
									header.column.getIsPinned() ? "bg-theme-box" : "",
									enableVirtualization && "!w-[150px] text-left"
								)}
								style={{
									// width: enableVirtualization ? 150 : undefined,
									maxWidth: header.column.columnDef.maxSize ?? "auto",
									...getCommonPinningStyles(header.column,true),
								}}
							>
								<span
									className={cn(
										"flex flex-row gap-2 w-full h-full items-center",
										enableVirtualization && "justify-start"
									)}
									onClick={()=>{
										if(
												[false,null,undefined].includes(header.column.columnDef.meta?.isEditable) &&
												[false,null,undefined].includes(header.column.columnDef.meta?.isDeletable) &&
												(header.column.getCanSort()||
												header.column.getCanMultiSort())
										) {
											if(isAsc) header.column.toggleSorting(true, true);
											else if(isDesc) header.column.clearSorting();
											else header.column.toggleSorting(false, true);
										}
										else return;
									}}
								>
									{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									{[false,null,undefined].includes(header.column.columnDef.meta?.isEditable)&&isAsc&&<LuArrowUp className="h-4 w-4"/>}
									{[false,null,undefined].includes(header.column.columnDef.meta?.isEditable)&&isDesc&&<LuArrowDown className="h-4 w-4"/>}
									{header.column.columnDef.meta?.isEditable&&
									header.column.columnDef.meta?.isMetadata&&
									header.column.columnDef.meta?.isDeletable&&
									<LuX
										className={cn(
											"h-4 w-4 text-theme-danger hover:text-theme-danger-hover cursor-pointer",
										)}
										onClick={(()=>{
											// console.log(header.column)
											const isMetadata = header.column.columnDef.meta?.isMetadata;

											const newData = [...editableData].map((dat:any)=>{
												if(isMetadata&&metaKey) {
													const { [header.column.id.replace("*","")]:colId, ...rest } = dat[metaKey];
													// console.log("DELETE COLUMN",colId, dat.metadata, rest)
													return {
														...dat,
														[metaKey]: { ...rest }
													}
												}
												else {
													const { [header.column.id]:colId, ...rest } = dat;
													return {
														...rest
													}
												}
											});
											// console.log(newData);
											setEditableData(newData);
											setEditableColumns((_prev)=>[..._prev.filter((prevCol)=>prevCol.id!==header.column.id)])
										})}
									/>}
									{header.column.columnDef.meta?.isEditable&&
									header.column.columnDef.meta?.isMetadata&&
									vci===headerGroup.headers.length-1&&
									<LuPlus
										className={cn(
											"h-4 w-4 text-theme-primary hover:text-theme-primary-hover cursor-pointer"
										)}
										onClick={()=>{
											const isMetadata = header.column.columnDef.meta?.isMetadata;

											const newData = [...editableData].map((dat:any)=>{
												if(isMetadata&&metaKey) {
													return {
														...dat,
														[metaKey]: {
															...dat[metaKey],
															[`newMeta_${vci}`]: ""
														}
													}
												}
												else {
													return {
														...dat,
														[`newColumn_${vci}`]: ""
													}
												}
											})


											const newCols:any = [
												...editableColumns,
												{
													id: isMetadata&&metaKey ? `*newMeta_${vci}` : `newColumn_${vci}`,
													// accessorKey:`newMeta_${vci}`,
													accessorFn: (d:any)=> isMetadata&&metaKey ? d.meta?.[`newMeta_${vci}`] : d.meta?.[`newColumn_${vci}`],
													// header: (
													// 	<div title={`*newMeta_${vci}`} className={cn("min-w-16 line-clamp-2")}>
													// 		<MdCategory className="inline" title="Categorical"/>
													// 		{` newMeta_${vci}`}
													// 	</div>
													// ),
													header: ({table,header,column}:any)=>{
														// console.log("Meta Header",table,header,column)
														return(
															<div title={isMetadata&&metaKey ? `newMeta_${vci}` : `newColumn_${vci}`} className={cn("min-w-16 line-clamp-2")}>
																{/* {isNumber
																? <TbNumbers className="inline" title="Numberical"/>
																: <MdCategory className="inline" title="Categorical"/>
																} */}

																{table&&header&&column?<EzEditableHeader
																	table={table}
																	header={header}
																	column={column}
																	nestKey={metaKey}
																/>:
																isMetadata&&metaKey ? ` newMeta_${vci}` : ` newColumn_${vci}`}
														</div>
														)
													},
													// cell: ({row, cell, renderValue, getValue}:any) => {
													// 	return row.original.metadata?.[`newMeta_${vci}`]?.toString()
													// },
													cell: ({table, row, column, cell, renderValue, getValue}:any) => {
														return <EzEditableCell
															table={table}
															row={row}
															column={column}
															cell={cell}
															getValue={getValue}
															renderValue={renderValue}
															nestKey={metaKey}
														/>
													},
													filterFn: "includesString",
													meta: {
														dataType: "string",
														isEditable: true,
														isMetadata: true,
														isDeletable: true,
														header: isMetadata&&metaKey ? `newMeta_${vci}` : `newColumn_${vci}`
													}
												}
											];
											// console.log("Adding Data and Columns",newData, newCols)
											setEditableColumns(newCols)
											// setEditableData(newData);
											if(table.options.meta?.updateMeta) {
												table.options.meta?.updateMeta(0,"",null,newData);
											}
											// if(table.options.meta?.updateColumn) {
											// 	table.options.meta?.updateColumn(vci,`newMeta_${vci}`,newCols)
											// }
										}}
									/>
									}
								</span>
							</TableHead>
							)})}

							{/* Post-Padding When Virtualised */}
							{enableVirtualization&&virtualPaddingRight ? (
								<th style={{width:virtualPaddingRight}}/>
							) : null}
						</TableRow>
					))}
					</TableHeader>
					<TableBody className="min-h-24">
						{/* Data */}
						{!isLoading&&table.getRowModel().rows?.length>0&&table.getRowModel().rows.filter((row)=>{
						if(!enableTabs||!tabsKey) return true;
						else {
							if(activeTab==="") return true;
							return row.original[tabsKey]===activeTab;
						}
						}).map((row,idx)=>{
						const visibleCells = row.getVisibleCells();
						return(
						<TableRow
							// key={row.id}
							key={`ez-adv-table-body-${row.id}`}
							data-state={row.getIsSelected() && "selected"}
							className={cn(
								"relative group/tablerow",
								highlightOdd&&"group",
								!highlightStyle&&highlightOn&&highlightOn(row.original)
								? "!bg-theme-warning-mild/15"
								: ""
							)}
						>
							{/* Pre-Padding When Virtualised */}
							{enableVirtualization&&virtualPaddingLeft ? (
								<th style={{width:virtualPaddingLeft}}/>
							) : null}

							{/* Table Cells */}
							{(enableVirtualization ? virtualCols : row.getVisibleCells()).map((vc:any)=>{
							const cell = enableVirtualization ? visibleCells[vc.index] : vc;
							// console.log("Table Cell ID",cell.id)
							return(
								<TableCell
									// key={`${row.id}-${cell.id}`}
									id={`cell-${cell.id}-${row.index}`}
									key={`cell-${cell.id}-${row.index}`}
									className={cn(
										"text-tall group-hover/tablerow:bg-theme-transparent-hover transition-colors",
										cell.column.columnDef.meta?.enableMultiline
										? "whitespace-normal"
										: "whitespace-nowrap text-ellipsis overflow-hidden",
										// cell.column.getIndex()===1 ? "pl-0" : "",
										cell.column.getIsPinned()&&row.getIsSelected()
										? "bg-theme-text-hover"
										: cell.column.getIsPinned()
										? "bg-theme-box" : "",
										highlightOdd&&"group-odd:bg-muted",
										enableVirtualization && "!w-[150px] text-left"
									)}
									style={{
										maxWidth: cell.column.columnDef.maxSize ?? "auto",
										...getCommonPinningStyles(cell.column,false)
									}}
									// ref={enableVirtualization ? vc.measureElement : null}
									// data-index={enableVirtualization ? vc.index : null}
									data-index={enableVirtualization ? cell.id : null}
								>
									{flexRender(
										// cell.column.columnDef.meta?.isEditable
										// ? EditableCell.cell
										// :
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</TableCell>
							)
							})}

							{/* Post-Padding When Virtualised */}
							{enableVirtualization&&virtualPaddingRight ? (
								<th style={{width:virtualPaddingRight}}/>
							) : null}
						</TableRow>
						)})}

						{/* No Data */}
						{!isLoading&&table.getRowModel().rows?.length===0&&
						<TableRow>
							<TableCell
								colSpan={table.getAllLeafColumns().length}
								rowSpan={10}
								className="row-span-full w-full h-full min-h-24 text-center pointer-events-none py-2 text-tall text-theme-perma-grey font-semibold"
							>
								No Results
							</TableCell>
						</TableRow>
						}

						{/* Loading State */}
						{isLoading&&
						<TableRow>
							<TableCell
								colSpan={table.getAllLeafColumns().length}
								rowSpan={10}
								className="w-full h-full text-center col-span-full row-span-full min-h-24"
							>
								Loading...
							</TableCell>
						</TableRow>
						}
					</TableBody>
				</Table>
				{customCard&&
				(
					(typeof customCardThreshold==="number"&&Number(containerRef.current?.clientWidth)<customCardThreshold) ||
					(typeof customCardThreshold==="boolean"&&customCardThreshold)
				)&&customCard(columns, table.getRowModel().rows.filter((row)=>{
					if(!enableTabs||!tabsKey) return true;
					else {
						if(activeTab==="") return true;
						return row.original[tabsKey]===activeTab;
					}
				}), containerRef.current?.clientWidth)}
			</ScrollArea>

            {/* Table Bottom */}
			{enableTablePageInfo&&<EzTablePagination
				table={table}
				colFilters={filterState ?? columnFilters}
				globalFilters={globalFilterState ?? globalFilters}
				paginationState={paginationState ?? pagination}
				setPaginationState={setPaginationState ?? setPagination}
				siblingCounts={options.paginationSibling}
				boundaryCounts={options.paginationBoundary}
			/>}
        </div>
    )
}

interface EzTableTopBarProps<TData,TValue> {
	enableFilter?: boolean;
	enableMultiFilter?: boolean;
	enableTableOption?: boolean;
	options?: {
		useMultiFilter?: boolean;
		useColumnVisibility?: boolean;
		usePinning?: boolean;
	},
	customFilter?: {
		useOriginalFilter: boolean;
		renderCustomFilter?: (
			setSelectedCol?: Dispatch<SetStateAction<string>>,
			setColumnFilterState?: Dispatch<SetStateAction<any>>,
			setGlobalFilterState?: Dispatch<SetStateAction<any>>,
			columns?: ColumnDef<TData,TValue>[],
			table?: TableType<any>,
		) => ReactElement;
	};
	table: TableType<TData>;
	columns: ColumnDef<TData, TValue>[];
	selectedCol: string;
	setSelectedCol: Dispatch<SetStateAction<string>>;
	columnFilters: ColumnFiltersState;
	setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
	globalFilters: any;
	setGlobalFilters: Dispatch<SetStateAction<any>>;
}

function EzTableTopBar<TData,TValue>({
	enableFilter=true,
	enableMultiFilter=false,
	enableTableOption=false,
	options={
		useMultiFilter: false,
		useColumnVisibility: false,
		usePinning: false,
	},
	customFilter={
		useOriginalFilter: false,
		renderCustomFilter: undefined,
	},
	table,
	columns,
	selectedCol,
	setSelectedCol,
	columnFilters,
	setColumnFilters,
	globalFilters,
	setGlobalFilters
}:EzTableTopBarProps<TData,TValue>) {
	const allCols = table.getAllLeafColumns();

	return(
		<div className="flex flex-row items-center gap-2 w-auto portrait:mdm:w-full">
			{/* No Original Filters */}
			{!enableFilter&&customFilter.renderCustomFilter&&customFilter?.renderCustomFilter(
				setSelectedCol,
				setColumnFilters,
				setGlobalFilters,
				columns,
				table
			)}

			{/* Original + Custom or Just Original */}
			{(
				enableFilter ||
				(!enableFilter&&customFilter.useOriginalFilter)
			)&&!enableMultiFilter&&
			<>
			<Select
				onValueChange={(val)=>{
					if(val==="unassigned") setSelectedCol("")
					else setSelectedCol(val);
					setColumnFilters([]);
					setGlobalFilters("");
				}}
				value={selectedCol}
				defaultValue={selectedCol}
			>
				<SelectTrigger>
					<SelectValue placeholder="Column"/>
				</SelectTrigger>
				<SelectContent
					container={typeof window!=="undefined" ? document.getElementById("appWrapper") : undefined}
				>
					<SelectItem value={"unassigned"} className="italic">
						None
					</SelectItem>
					{columns.filter((v)=>v.enableColumnFilter!==false).filter((v)=>v.meta?.isVisible!==false).map((v)=>(
					<SelectItem key={v.id} value={v.id as string}>
						{v.meta?.header ?? v.header as string}
					</SelectItem>
					))}
				</SelectContent>
			</Select>
			<EzFilterInputs
				dataType={selectedCol ? table.getColumn(selectedCol)?.columnDef.meta?.dataType : "string"}
				column={selectedCol ? table.getColumn(selectedCol) : undefined}
				initialValue={
					selectedCol
					? (
						table.getColumn(selectedCol)?.columnDef.meta?.dataType==="string" ? "" :
						table.getColumn(selectedCol)?.columnDef.meta?.dataType==="enum" ? (table.getColumn(selectedCol)?.columnDef.meta?.enumObject?.map((v)=>v.name) ?? table.getColumn(selectedCol)?.columnDef.meta?.enum) :
						table.getColumn(selectedCol)?.columnDef.meta?.dataType==="number" ? ["",""] :
						table.getColumn(selectedCol)?.columnDef.meta?.dataType==="date" ? {from: undefined, to: undefined} :
						table.getColumn(selectedCol)?.columnDef.meta?.dataType==="tag" ? {isAnd: false, value: []} :
						[]
					)
					: ""
				}
				onChange={(value)=>{
					if(selectedCol) {
						const exist = columnFilters.find((v)=>v.id===selectedCol);

						if(exist) {
							const idx = columnFilters.indexOf(exist);
							if(value==="") setColumnFilters([
								...columnFilters.filter((v,i)=>i!==idx)
							]);
							else setColumnFilters([
								...columnFilters.slice(0,idx),
								{
									id: selectedCol,
									value: value
								},
								...columnFilters.slice(idx+1)
							]) ;
						}
						else {
							setColumnFilters([
								...columnFilters,
								{
									id: selectedCol,
									value: value
								}
							])
						}
					}
					else {
						setGlobalFilters(value)
					}
				}}
			/>
			</>
			}

			{/* Multifilter Enabled */}
			{(enableFilter||(!enableFilter&&customFilter.useOriginalFilter))&&enableMultiFilter&&
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="text-theme-text border-theme-text"
					>
						Open Filter
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className="max-w-[600px] max-h-[600px] min-w-[400px] overflow-y-auto"
					container={typeof window !== "undefined" ? document.getElementById("appWrapper") : undefined}
				>
					<div className={cn(
						"w-full h-auto grid grid-cols-4 gap-2"
					)}>
						<span className="col-span-full">
							<EzButton
								size="sm"
								variant="ghost"
								onClick={()=>table.resetColumnFilters()}
							>
								Reset
							</EzButton>
						</span>
						{allCols.map((col,i)=>{
							// console.log(col.getCanFilter())
						if(col.id==="selectRow"||!col.getCanFilter()) return;
						const headerName = typeof col.columnDef.header==="string"
							? col.columnDef.header
							: col.columnDef.meta?.header
						;
						const dataType = col.columnDef.meta?.dataType;



						return(
							<Fragment key={col.id}>
								<span className="col-span-1 flex items-center text-tall">
									{headerName}
								</span>
								<span className="col-span-3 flex items-center">
									<EzFilterInputs
										className={cn(
											dataType==="number"
											? "!w-auto"
											: dataType==="date"
											? "!w-full"
											: dataType==="tag"
											? "!min-w-0"
											: ""
										)}
										dataType={dataType}
										column={table.getColumn(col.id)}
										initialValue={
											columnFilters.find((v)=>v.id===col.id)
											? columnFilters.find((v)=>v.id===col.id)?.value
											: (
												dataType==="string"
												? ""
												: dataType==="tag"
												? {isAnd: false, value: []}
												: dataType==="number"
												? ["",""]
												: dataType==="date"
												? {from:undefined, to:undefined}
												: dataType==="enum"
												? table.getColumn(col.id)?.columnDef.meta?.enumObject
													? table.getColumn(col.id)?.columnDef.meta?.enumObject
														? table.getColumn(col.id)?.columnDef.meta?.enumObject?.map((v)=>v.value)
														: table.getColumn(col.id)?.columnDef.meta?.enum
													: []
												: ""
											)
										}
										onChange={(value)=>{
											const exist = columnFilters.find((v)=>v.id===col.id);
											if(exist) {
												const idx = columnFilters.indexOf(exist);
												if(value==="") setColumnFilters([
													...columnFilters.filter((v,i)=>i!==idx)
												]);
												else setColumnFilters([
													...columnFilters.slice(0,idx),
													{
														id: col.id,
														value: value
													},
													...columnFilters.slice(idx+1)
												]);
											}
											else {
												setColumnFilters([
													...columnFilters,
													{
														id: col.id,
														value: value
													}
												])
											}
										}}
									/>
								</span>
							</Fragment>
						)
						})}
					</div>
				</PopoverContent>
			</Popover>
			}

			{/* Table Options */}
			{enableTableOption&&<EzTableOptions
				table={table}
				useColumnPinning={options.usePinning}
				useMultiFilter={options.useMultiFilter}
				useVisibilityControl={options.useColumnVisibility}
			/>}
		</div>
	)
}

interface EzTablePaginationProps<TData> {
	table: TableType<TData>;
	enableDynamic?: boolean;
	siblingCounts?:number;
	boundaryCounts?:number;
	refetchData?: () => void;
	colFilters: ColumnFiltersState;
	globalFilters: any;
	paginationState: {
		pageIndex: number;
		pageSize: number;
	};
	setPaginationState: Dispatch<SetStateAction<{pageIndex:number;pageSize:number}>>;
}

export function EzTablePagination<TData>({
	table,
	enableDynamic=false,
	siblingCounts=2,
	boundaryCounts=1,
	refetchData,
	colFilters,
	globalFilters,
	paginationState,
	setPaginationState
}:EzTablePaginationProps<TData>) {

	const range = (start:number, end:number) => {
		const len = end - start + 1;
		return Array.from({length: len},(_,i)=> start+i);
	};

	const getDynamicPageCount = useCallback(()=>{
		if(colFilters.length>0||globalFilters) {
			const allItems = table.getFilteredRowModel().rows.length;
			const allPageSize = paginationState.pageSize;
			const final = Math.ceil(allItems/allPageSize);
			return final;
		}
		return table.getPageCount();
	},[]);

	const siblingCount = siblingCounts;
	const boundaryCount = boundaryCounts;
	const startRange = useMemo(()=>range(
		1,
		Math.min(
			boundaryCount,
			getDynamicPageCount()
		)
	),[getDynamicPageCount(),paginationState]);
	const endRange = useMemo(()=>range(
		Math.max(
			getDynamicPageCount() - boundaryCount + 1,
			boundaryCount +1
		),
		getDynamicPageCount()
	),[getDynamicPageCount(),paginationState]);
	const preEllipsis = useMemo(()=>Math.max(
		Math.min(
			paginationState.pageIndex - siblingCount,
			getDynamicPageCount() - boundaryCount - siblingCount * 2 -1
		),
		boundaryCount + 2
	),[getDynamicPageCount(),paginationState]);
	const postEllipsis = useMemo(()=>Math.min(
		Math.max(
			paginationState.pageIndex + siblingCount,
			boundaryCount + siblingCount * 2 + 2
		),
		endRange.length > 0 ? endRange[0] - 2 : getDynamicPageCount() - 1
	),[getDynamicPageCount(),paginationState]);
	const midRange = useMemo(()=>range(
		preEllipsis,
		postEllipsis
	),[getDynamicPageCount(),paginationState]);
	const pageRangeStart = useMemo(()=>
		1 + paginationState.pageIndex * paginationState.pageSize
	,[getDynamicPageCount(),paginationState]);
	const pageRangeEnd = useMemo(()=>
		paginationState.pageSize * (paginationState.pageIndex + 1)
	,[getDynamicPageCount(),paginationState]);
	const finalList = useMemo(()=>[
		"first",
		"previous",
		...startRange,
		...(preEllipsis > boundaryCount + 2
			? ["pre-ellipsis"]
			: boundaryCount + 1 < getDynamicPageCount() - boundaryCount
				? [boundaryCount + 1]
				: []
		),
		...midRange,
		...(postEllipsis < getDynamicPageCount() - boundaryCount - 1
			? ["post-ellipsis"]
			: getDynamicPageCount() - boundaryCount > boundaryCount
				? [getDynamicPageCount() - boundaryCount]
				: []
		),
		...endRange,
		"next",
		"last"
	],[getDynamicPageCount(),paginationState, startRange, endRange, preEllipsis, postEllipsis, midRange, pageRangeEnd, pageRangeStart]);

	const renderRowInfo = useCallback(()=>{
		const printRowCount = () => {
			const selected = table.getSelectedRowModel().rows.length;
			const firstPrint = selected>0
				? `Selected ${selected} row(s) | `
				: ""
			;
			const filtered = table.getFilteredRowModel().rows.length;
			const startRange = filtered===0
				? 0
				: pageRangeStart
			;
			const endRange = pageRangeEnd<filtered
				? pageRangeEnd
				: filtered
			;
			const printRange = `Showing ${startRange} - ${endRange} of ${filtered}  `;
			const hasFilter = (globalFilters || colFilters.length>0 )
				? "filtered"
				: ""
			;


			const fin = `${firstPrint}${printRange}${hasFilter} rows ${(globalFilters || colFilters.length>0)?`| Originally ${table.getRowCount()} rows`:""}`;
			return fin;
		}

		return(
			<div className="flex flex-row gap-4">
				<div className="text-tall flex items-center text-theme-text mdm:text-short">
					{printRowCount()}
				</div>
				<div className="flex flex-row items-center gap-2">
					<Select
						onValueChange={(val)=>{
							setPaginationState({
								...paginationState,
								pageSize: Number(val)
							})
						}}
						value={paginationState.pageSize.toString()}
					>
						<SelectTrigger className="pl-2 pr-1">
							<SelectValue asChild placeholder="Rows">
								<span className="text-theme-text text-tall mdm:text-short">
									{paginationState.pageSize}
								</span>
							</SelectValue>
						</SelectTrigger>
						<SelectContent
							container={typeof window!=="undefined" ? document.getElementById("appWrapper") : undefined}
						>
							<SelectItem className="mdm:text-short" value={"25"}>25</SelectItem>
							<SelectItem className="mdm:text-short" value={"50"}>50</SelectItem>
							<SelectItem className="mdm:text-short" value={"100"}>100</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		)
	},[table,paginationState,colFilters, globalFilters, pageRangeStart, pageRangeEnd,getDynamicPageCount()]);

	const renderPagination = useCallback(()=>finalList.map((v,i)=>{
		switch(v){
			case "first":
				return(
					<Button
						key={i}
						onClick={() => {
							table.firstPage()
							if(enableDynamic&&refetchData) {
								refetchData();
							}
						}}
						variant={"ghost"}
						size="sm"
						className="mdm:px-0"
						disabled={!table.getCanPreviousPage()}
					>
						<LuChevronsLeft className="h-4 w-4"/>
					</Button>
				);
			case "previous":
				return(
					<Button
						key={i}
						onClick={() => {
							table.previousPage()
							if(enableDynamic&&refetchData) {
								refetchData();
							}
						}}
						variant={"ghost"}
						size="sm"
						className="mdm:px-0"
						// className="rounded-full"
						disabled={!table.getCanPreviousPage()}
					>
						<LuChevronLeft className="h-4 w-4"/>
					</Button>
				);
			case "next":
				return(
					<Button
						key={i}
						onClick={() => {
							table.nextPage()
							if(enableDynamic&&refetchData) {
								refetchData();
							}
						}}
						variant={"ghost"}
						size="sm"
						className="mdm:px-0"
						// className="rounded-full"
						disabled={!table.getCanNextPage()}
					>
						<LuChevronRight className="h-4 w-4"/>
					</Button>
				);
			case "last":
				return(
					<Button
						key={i}
						onClick={() => {
							table.lastPage()
							if(enableDynamic&&refetchData) {
								refetchData();
							}
						}}
						variant={"ghost"}
						size="sm"
						className="mdm:px-0"
						// className="rounded-full"
						disabled={!table.getCanNextPage()}
					>
						<LuChevronsRight className="h-4 w-4"/>
					</Button>
				);
			case "pre-ellipsis":
				return(
					<span
						key={i}
						className="text-theme-text text-short"
					>
						...
					</span>
				);
			case "post-ellipsis":
				return(
					<span
						key={i}
						className="text-theme-text text-short"
					>
						...
					</span>
				);
			default:
				return(
					<Button
						key={i}
						onClick={() => table.setPageIndex(v as number - 1)}
						variant={"ghost"}
						size="sm"
						className={cn(
							"w-8 mdm:w-4 mdm:px-0",
							enableDynamic&&paginationState.pageIndex===(Number(v)-1)
							? "font-bold text-theme-primary"
							: !enableDynamic&&paginationState.pageIndex===(Number(v)-1)
							? "font-bold text-theme-primary"
							: ""
						)}
						// disabled={paginationState ? paginationState.pageIndex===(Number(v)-1):pagination.pageIndex===(v as number - 1)}
					>
						{v}
					</Button>
				);
		}
	}),[table,paginationState,colFilters, globalFilters, pageRangeStart, pageRangeEnd,getDynamicPageCount()])

	return(
		<div
			className={cn(
				"w-full flex flex-row items-center justify-end flex-wrap",
				"gap-y-1 flex-shrink-0 py-2 @container"
			)}
		>
			{renderRowInfo()}
			<div className="grow min-w-1"/>
			<div className="flex flex-row flex-grow-0 flex-shrink @xs:gap-0 @lg:gap-2 text-tall mdm:gap-1">
				{renderPagination()}
			</div>
		</div>
	)
}

interface EzTableOptionsProps<TData> {
	table: TableType<TData>;
	useMultiFilter?: boolean;
	useVisibilityControl?: boolean;
	useColumnPinning?: boolean;
}

export function EzTableOptions<TData,TValue>({
	table,
	useMultiFilter=false,
	useVisibilityControl=false,
	useColumnPinning=false,
}:EzTableOptionsProps<TData>) {

	const {
		enableMultiFilter, setEnableMultiFilter,
		enablePinning, setEnablePinning,
		enableVisibility, setEnableVisibility
	} = table.options.meta as TableMeta<TData>;

	const visibleCols = table.getAllColumns().filter((col)=>{
		// const { meta } = col.columnDef;
		// if(!meta||(meta&&meta.isVisible)||(meta&&meta.isVisible===undefined)) return col;
		return [undefined,null,true].includes(col.columnDef.enableHiding);
	}).map((col)=>{
		const { meta, id, header } = col.columnDef;
		return {
			...meta,
			id: id,
			header: typeof header==="string" ? header : meta?.header ? meta.header : id,
			visibility: col.getIsVisible()
		}
	});

	const pinnableCols = table.getAllColumns().filter((col)=>{
		if(col.columnDef.enablePinning!==false) return col;
	}).map((col)=>{
		const { meta, id, header } = col.columnDef;
		return {
			...meta,
			id: id,
			header: typeof header==="string" ? header : meta?.header ? meta.header : id,
			visibility: col.getIsVisible()
		}
	});

	return(
		<DropdownMenu>
			<TooltipProvider
				delayDuration={200}
				skipDelayDuration={200}
			>
				<Tooltip>
					<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="ml-auto h-8 lg:flex"
						>
							<LuSlidersHorizontal className="h-4 w-4"/>
						</Button>
					</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipPortal container={typeof window!=='undefined' ? document.getElementById("appWrapper") : undefined}>
					<TooltipContent>
						Table options
					</TooltipContent>
					</TooltipPortal>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent
				align="end"
				className="w-max"
				container={typeof window!=="undefined" ? document.getElementById("appWrapper") : undefined}
				onCloseAutoFocus={(e)=>e.preventDefault()}
			>
				{useMultiFilter&&<DropdownMenuItem
					className="flex flex-row gap-1 h-10"
					onSelect={(e)=>{
						e.preventDefault();
					}}
				>
					<Switch
						id="multiFilter"
						checked={enableMultiFilter}
						onCheckedChange={(checked)=>{
							setEnableMultiFilter(checked);
							table.resetColumnFilters();
							table.resetGlobalFilter();
						}}
					/>
					<Label htmlFor="multiFilter">
						{/* Enable Multi-Filter */}
						Enable Advanced Search
					</Label>
				</DropdownMenuItem>}
				{/* {useColumnPinning&&
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="h-10">
						<span>Pin column(s)</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal
						container={typeof window!=="undefined" ? document.getElementById("appWrapper") : undefined}
					>
						<DropdownMenuSubContent className="max-h-[600px] overflow-auto">
							{pinnableCols.map((v,i:number)=>(
							<DropdownMenuItem
								key={`table-option-vis-${v.id}`}
								className="flex flex-row gap-1 items-center cursor-pointer justify-between h-10"
								onSelect={(e)=>{
									e.preventDefault();
									if(table.getColumn(v.id!)?.getIsPinned()) table.getColumn(v.id!)?.pin(false)
									else table.getColumn(v.id!)?.pin("left")
								}}
							>
								<span title={v.header} className="max-w-[250px] overflow-x-hidden text-ellipsis whitespace-nowrap">{v.header}</span>
								{table.getColumn(v.id!)?.getIsPinned() ?
								<LuPinOff className="h-4 w-4" />
								:
								<LuPin className="h-4 w-4" />}
							</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>} */}
				{useVisibilityControl&&<DropdownMenuSub>
					<DropdownMenuSubTrigger className="h-10">
						<span>Hide column(s)</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal
						container={typeof window!=="undefined" ? document.getElementById("appWrapper") : undefined}
					>
						<DropdownMenuSubContent className="max-h-[600px] overflow-y-auto">
							{visibleCols.map((v,i:number)=>(
								<DropdownMenuItem
									key={`table-option-vis-${v.id}`}
									className="flex flex-row gap-1 items-center cursor-pointer justify-between h-10"
									onSelect={(e)=>{
										e.preventDefault();
										table.getColumn(v.id!)?.toggleVisibility(
											v.visibility ? false : true
										)
									}}
								>
								<span title={v.header} className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{v.header}</span>
								{v.visibility ? <LuEye className="h-4 w-4"/> : <LuEyeOff className="h-4 w-4"/>}
							</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
