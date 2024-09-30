import type { Column } from "@tanstack/react-table";
import { useState, useEffect, type ReactElement, Dispatch, SetStateAction } from "react";
import { EzInput, EzTagInput } from "./EzInput";
import { ToggleGroup, ToggleGroupItem } from "./togglegroup";
import { cn } from "./mergeStyle";
import { DatePicker } from "./datepicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { SquareSwitch } from "./switch";

interface FilterInputProps<TData> {
	dataType?: "string" | "enum" | "number" | "date" | "tag";
	initialValue?: any;
	column?: Column<TData>;
	dataList?: {
		name: string;
		value: string;
		icon: ReactElement;
	}[] | string[];
	onChange?: (val:any) => void;
	container?: HTMLElement | null;
	className?: string;
}



export function EzFilterInputs({
	dataType="string",
	column,
	initialValue,
	dataList=[],
	onChange,
	container,
	className
}:FilterInputProps<any>) {
	const [ value, setValue ] = useState<any>(initialValue);
	const [ tagValue, setTagValue ] = useState<string>("");
	const [ tagToggle, setTagToggle ] = useState<"or"|"and">("or");
	// console.log(value, initialValue);
	useEffect(()=>{
		if(column) setValue(initialValue)
		else if(!column) setValue("")
	},[column?.columnDef.id])

	useEffect(()=>{
		// console.log(column?.id, column?.getFilterValue(),value)
		if(!column?.getFilterValue()) {
			setValue(
				dataType==="string" ? "" :
				dataType==="tag" ? {isAnd: false, value: []} :
				dataType==="enum" ? (column?.columnDef.meta?.enumObject?.map((v)=>v.name) ?? column?.columnDef.meta?.enum) :
				dataType==="number" ? ["",""] :
				dataType==="date" ? {from: undefined, to: undefined} :
				[]
			);
		}
	},[column?.getFilterValue()])

	// console.log(dataType, Array.isArray(value))
	if(dataType==="string"&&typeof value==="string") return(
		<EzInput
			className={cn(
				"h-8 text-tall font-normal !w-[minmax(100px,auto)] px-2 py-1",
				className
			)}
			placeholder="Type to filter..."
			value={value}
			onChange={(event) =>{
				setValue(event.target.value)
				if(onChange) onChange(event.target.value)
			}}
		/>
	)
	else if(dataType==="enum"&&Array.isArray(value)) {
		const enums = column?.columnDef.meta?.enumObject ?? column?.columnDef.meta?.enum;
		return(
			<ToggleGroup
				type="multiple"
				variant={"outline"}
				className={cn(
					className
				)}
				value={value}
				defaultValue={value}
				onValueChange={(val)=>{
					setValue(val);
					if(onChange) {
						// console.log(value, val)
						onChange(val);
					}

				}}
			>
				{enums?.map((item)=>{
				// console.log(value, column?.getFilterValue())
				return(
					<ToggleGroupItem
						key={`enum-item-${typeof item==="string" ? item : item.value}`}
						size="sm"
						value={typeof item==="string" ? item : item.value}
					>
						{typeof item==="string" ? item : item.icon}
					</ToggleGroupItem>
				// <TooltipProvider delayDuration={500} key={`enum-item-${typeof item==="string" ? item : item.value}`}>
				// 	<Tooltip>
				// 		<TooltipTrigger asChild>
				// 			<ToggleGroupItem
				// 				size="sm"
				// 				value={typeof item==="string" ? item : item.value}
				// 			>
				// 				{typeof item==="string" ? item : item.icon}
				// 			</ToggleGroupItem>
				// 		</TooltipTrigger>
				// 		<TooltipContent>
				// 			{typeof item==="string" ? item : item.name}
				// 		</TooltipContent>
				// 	</Tooltip>
				// </TooltipProvider>
				)})}
			</ToggleGroup>
		)
	}
	else if(dataType==="number"&&Array.isArray(value)) {
		return(
			<span
				className={cn(
					"w-fit h-8 flex flex-row gap-1 items-center"
				)}
			>
				<EzInput
					className={cn(
						"h-8 font-normal w-20 px-2 py-1",
						className
					)}
					placeholder="Min"
					type="number"
					value={value[0]}
					onChange={(event)=>{
						setValue([event.target.value,value[1]])
						if(onChange) onChange([event.target.value,value[1]])
					}}
				/>
				<EzInput
					className={cn(
						"h-8 font-normal w-20 px-2 py-1",
						className
					)}
					placeholder="Max"
					type="number"
					value={value[1]}
					onChange={(event)=>{
						setValue([value[0],event.target.value])
						if(onChange) onChange([value[0],event.target.value])
					}}
				/>
			</span>
		)
	}
	else if(dataType==="date"&&typeof value==="object") {
		return(
			<span
				className={cn(
					"w-full h-8 flex flex-row gap-1 items-center"
				)}
			>
				<DatePicker
					container={document.getElementById("appWrapper") ?? undefined}
					className={className}
					mode="range"
					value={value}
					disableDays="after"
					// container={container}
					setValue={(value:any)=>{
						setValue(value);
						if(onChange) onChange(value);
					}}
				/>
			</span>
		)
	}
	else if(dataType==="tag"&&Object.keys(value).includes("isAnd")) {
		return(
			<div className="flex w-full flex-row h-8 gap-1">
				{/* <ToggleGroup
					type="single"
					variant="outline"
					className={cn(

					)}
					value={value.type}
					onValueChange={(val:"or"|"and")=>{
						setValue({
							...value,
							type: val
						})
						// if(val==="or") column?.columnDef.filterFn = "tagsSome";
						// else column?.columnDef.filterFn = "tagsAll";
					}}
				>
					<ToggleGroupItem
						size="sm"
						value="and"
					>
						And
					</ToggleGroupItem>
					<ToggleGroupItem
						size="sm"
						value="or"
					>
						Or
					</ToggleGroupItem>
				</ToggleGroup> */}
				<div className="flex h-full items-center justify-center">
				{/* <Switch
					id="switchFilterType"
					checked={value.isAnd}
					onCheckedChange={(checked)=>{
						setValue({
							...value,
							isAnd: checked
						})
						if(onChange) onChange({
							...value,
							isAnd : checked
						})
					}}
				/> */}
				<SquareSwitch
					id="switchFilterType"
					checked={value.isAnd}
					onCheckedChange={(checked)=>{
						setValue({
							...value,
							isAnd: checked
						})
						if(onChange) onChange({
							...value,
							isAnd : checked
						})
					}}
					title={value.isAnd ? "All" : "Some"}
				/>
				{/* <Label>
					{value.isAnd ? "All" : "Some"}
				</Label> */}
				</div>
				<EzTagInput
					className={cn(
						"h-8 text-tall font-normal !w-full px-2 py-1",
						className
					)}
					placeholder="Type and press 'Enter' to add a tag filter"
					value={tagValue}
					tags={typeof value==="string" ? [] : value}
					onKeyDown={(e)=>{
						if(e.key==="Enter") {
							if(!value.value.includes(tagValue)&&tagValue!=="") {
								setValue({
									...value,
									value: [...value.value, tagValue]
								});
								setTagValue("")
								if(onChange) onChange({
									...value,
									value: [...value.value, tagValue]
								})
							}
						}
						if(e.key==="Backspace"&&tagValue==="") {
							setValue({
								...value,
								value: [...value.value.slice(0,-1)]
							})
							if(onChange) {
								if([...value.value.slice(0,-1)].length===0) {
									column?.setFilterValue(undefined)
								}
								else onChange({
									...value,
									value: [...value.value.slice(0,-1)]
								})
							}
						}
					}}
					onChange={(event)=>{
						setTagValue(event.target.value)
						// if(onChange) onChange(event.target.value)
					}}
				/>
			</div>
		)
	}
	return <></>;
}

interface EzSingleFilterProps<TData> {
	dataType?: "string" | "enum" | "number" | "date";
	// initialValue?: any;
	column?: Column<TData>;
	// dataList?: {
	// 	name: string;
	// 	value: string;
	// 	icon: ReactElement;
	// }[] | string[];
	value: any;
	setValue: Dispatch<SetStateAction<any>>;
	onChange?: (val:any) => void;
}

export function EzSingleFilter({
	dataType="string",
	column,
	value,
	setValue,
	onChange
}:EzSingleFilterProps<any>) {
	if(dataType==="string") return(
		<EzInput
			className="h-8 text-tall font-normal !w-[minmax(100px,auto)] px-2 py-1"
			placeholder="Type to filter..."
			value={value}
			onChange={(event) =>{
				setValue(event.target.value)
				if(onChange) onChange(event.target.value)
			}}
		/>
	)
	else if(dataType==="enum") {
		const enums = column?.columnDef.meta?.enumObject ?? column?.columnDef.meta?.enum;

		return(
			<ToggleGroup
				type="multiple"
				variant={"outline"}
				value={value}
				onValueChange={(val)=>{
					setValue(val);
					if(onChange) onChange(val);
				}}
			>
				{enums?.map((item)=>(
				<TooltipProvider delayDuration={500} key={`enum-item-${typeof item==="string" ? item : item.value}`}>
					<Tooltip>
						<TooltipTrigger asChild>
							<ToggleGroupItem
								size="sm"
								value={typeof item==="string" ? item : item.value}
							>
								{typeof item==="string" ? item : item.icon}
							</ToggleGroupItem>
						</TooltipTrigger>
						<TooltipContent>
							{typeof item==="string" ? item : item.name}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				))}
			</ToggleGroup>
		)
	}
	else if(dataType==="number") {
		return(
			<span
				className={cn(
					"w-fit h-8 flex flex-row gap-1 items-center"
				)}
			>
				<EzInput
					className="h-8 font-normal w-20 px-2 py-1"
					placeholder="Min"
					type="number"
					value={value[0]}
					onChange={(event)=>{
						setValue([event.target.value,value[1]])
						if(onChange) onChange([event.target.value,value[1]])
					}}
				/>
				<EzInput
					className="h-8 font-normal w-20 px-2 py-1"
					placeholder="Max"
					type="number"
					value={value[1]}
					onChange={(event)=>{
						setValue([value[0],event.target.value])
						if(onChange) onChange([value[0],event.target.value])
					}}
				/>
			</span>
		)
	}
	else if(dataType==="date") {
		console.log(document.getElementById("appWrapper"))
		return(
			<span
				className={cn(
					"w-fit h-8 flex flex-row gap-1 items-center"
				)}
			>
				<DatePicker
					container={document.getElementById("appWrapper") ?? undefined}
					mode="range"
					value={value}
					disableDays="after"
					setValue={(value:any)=>{
						setValue(value);
						if(onChange) onChange(value);
					}}
				/>
			</span>
		)
	}
}
