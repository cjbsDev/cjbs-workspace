import type { 
    ColumnDef,
    ColumnFiltersState,
    ColumnPinningState,
    SortingState,
    RowSelectionState,
    Table as TableType,
    VisibilityState,
    Row,
    Column
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
    useRef
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

import { useDebounce } from "./useDebounce";
import { cn } from "./mergeStyle";

interface EzTableProps<TData, TValue> {
    columns: ColumnDef<TData,TValue>[];
    data: TData[];
    isLoading?: boolean;
    enableSelect?: boolean;
    disableSelectOn?: (row: TData) => boolean;
    enableMultiSelect?: boolean;
    idKey?: string;
    metaKey: string;
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

            </div>
            }

            {/* Table Tabs */}

            {/* Table */}

            {/* Table Bottom */}
        </div>
    )
}