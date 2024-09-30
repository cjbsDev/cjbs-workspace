import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "./popover";


import {
	Button
} from "./button";

import {
	Calendar
} from "./calendar";

import { LuCalendar } from "@react-icons/all-files/lu/LuCalendar";
import { format } from "date-fns";
import { cn } from "./mergeStyle";
import { FormControl } from "./form";
import { ForwardedRef, forwardRef } from "react";

export interface DatePickerProps {
	value: any;
	setValue: any;
	placeholder?: string;
	container?: HTMLElement | undefined | null;
	mode?: "single" | "range" | "multiple";
	isForm?: boolean;
	disableDays?: "before" | "after";
	className?: string;
}

/*
_ COMPLETED[epic=COMPLETED]: 2024-04-05 Disable days before start range | change it to mode="range"
*/
export const DatePicker = forwardRef(({
	value, setValue, placeholder="Pick a date", container, mode="single", isForm=false,
	disableDays=undefined, className
}:DatePickerProps, ref?:ForwardedRef<any>) => {

	const printValue = () => {
		if(mode==="single") {
			return format(value, "yyyy-MM-dd")
		}
		else if(mode==="range") {
			if(!value.from || !value.to) return <span>{placeholder}</span>
			return `${format(value.from, "yyyy-MM-dd")} ~ ${format(value.to, "yyyy-MM-dd")}`
		}
		else if(mode==="multiple") {
			return value.map((v:any) => format(v, "yyyy-MM-dd")).join(", ")
		}
		return "";
	}

	if(isForm) {
		return(
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={"outline"}
							size="sm"
							className={cn(
								"h-8 min-w-[150px] w-auto justify-start text-left font-normal",
								"text-theme-text border-theme-border hover:border-theme-text focus-within:border-theme-primary",
								!value && "text-muted-foreground",
								className
							)}
						>
							<LuCalendar className="mr-2 h-4 w-4" />
							{value ? printValue() : <span>{placeholder}</span>}
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent container={container} className="p-0 w-auto">
					<Calendar
						mode={mode}
						selected={value}
						onSelect={setValue}
						disableDays={disableDays}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		)
	}

	return(
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					size="sm"
					className={cn(
						"h-8 min-w-[150px] w-auto justify-start text-left font-normal",
						"text-theme-text border-theme-border hover:border-theme-text focus-within:border-theme-primary",
						!value && "text-muted-foreground",
						className
					)}
				>
					<LuCalendar className="mr-2 h-4 w-4" />
					{value ? printValue() : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent container={container} className="p-0 w-auto">
				<Calendar
					mode={mode}
					selected={value}
					onSelect={setValue}
					disableDays={disableDays}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
})
