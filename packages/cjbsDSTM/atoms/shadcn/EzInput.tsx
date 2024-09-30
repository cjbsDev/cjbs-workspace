import { cn } from "../shadcn/mergeStyle";
import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { LuLoader2 } from "@react-icons/all-files/lu/LuLoader2";
import { createPortal } from "react-dom";
import type { ReactElement, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Fragment, useState, useRef, useEffect, useLayoutEffect } from "react";
import { Badge } from "./badge";


const useEffectCustom = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const separateThousands = (value: string | number) => {
    return value.toString().match(/([+-]?\d{1,3})(?=(\d{3})*$)/g); //.split(/\B(?=(\d{3})+(?!\d))/);
};

interface InputProps extends
	InputHTMLAttributes<HTMLInputElement>
{
	icon?: ReactElement;
	height?: "sm" | "default" | "lg";
	tags?: {
		type: "or" | "and",
		value: string[]
	};
}

export const inputVariant = cva(
	[
		"w-full flex flex-row gap-4 items-center z-[2] bg-theme-box",
		"rounded-md border-solid border border-theme-border",
		"hover:border-theme-text focus-within:!border-theme-primary focus:!border-theme-primary",
		"focus-visible:outline-none disabled:cursor-not-allowed disabled:opacoty-50"
	].join(" "),
	{
		variants: {
			height: {
				default: "h-10 px-4 py-2",
				sm: "h-8 px-2 py-1",
				lg: "h-12 px-4 py-2"
			}
		}
	}
)

export const EzInput = forwardRef<HTMLInputElement, InputProps>(({
	className, type,
	icon, height="default",
	...props
}, ref: ForwardedRef<HTMLInputElement>)=>{

	return(
		<div
			className={cn(
				inputVariant({height}),
				"peer",
				className
			)}
			onKeyDown={props.onKeyDown}
		>
			{icon&&<span
				className="h-full flex items-center"
			>
				{icon}
			</span>}
			<input
				ref={ref}
				type={type}
				className={cn(
					"flex h-full w-full rounded-md",
					"text-theme-text bg-theme-box focus-visible:outline-none",
					// "placeholder:text-muted-foreground"
					"placeholder:text-theme-subtext placeholder:text-tall",
					height==="lg" ? "text-[1rem]" : "text-tall"
				)}
				{...props}
			/>
		</div>
	)
})
EzInput.displayName = "EzInput";

export const EzTagInput = forwardRef<HTMLInputElement, InputProps>(({
	className, type,
	icon, height="default",tags,
	...props
}, ref: ForwardedRef<HTMLInputElement>)=>{
	return(
		<div
			className={cn(
				inputVariant({height}),
				"peer overflow-hidden min-w-[300px]",
				className
			)}
			onKeyDown={props.onKeyDown}
		>
			{icon&&<span className="h-full flex items-center">{icon}</span>}
			{tags&&tags.value.length>0&&<span
				className="w-auto h-full flex flex-row gap-1"
			>
				{tags.value.map((v,i)=>(
				<Badge key={`${v}-${i}`} variant={"outline"} className="bg-theme-box">
					{v}
				</Badge>
				))}
			</span>}
			<input
				ref={ref}
				type={type}
				className={cn(
					"flex h-full w-full rounded-md",
					"text-theme-text bg-theme-box focus-visible:outline-none",
					// "placeholder:text-muted-foreground"
					"placeholder:text-theme-subtext"
				)}
				{...props}
			/>
		</div>
	)
})
EzTagInput.displayName = "EzTagInput";

/*
? TODO[epic=TODO]: 2024-04-11 Remember to dynamically change the layout id due to the use of ScrollArea component
*/
interface EzAutoCompleteProps extends InputProps {
	isLoading?: boolean;
	isSearching?: boolean;
	data: any[];
	render?: (name:string, index:number, currentIndex: number) => ReactElement;
	error?:string;
}

export const EzAutoComplete = forwardRef<HTMLInputElement, EzAutoCompleteProps>(({
	className, type,
	icon, height="default",
	isLoading=true,
	isSearching=false,
	data, render, error,
	...props
}, ref: ForwardedRef<HTMLInputElement>)=>{

	// console.log(data);
	const container = useRef<HTMLDivElement>(null);
	const [ isRendered, setIsRendered ] = useState<boolean>(false);
	const [ isFocused, setIsFocused ] = useState<boolean>(false);
	const [ cursorIdx, setCursorIdx ] = useState<number>(0);
	useEffectCustom(()=>{
		setIsRendered(true)
	},[])

	useEffectCustom(()=>{
		if(isFocused) {
			document.getElementById("viewport-appLayout")!.style.overflow="hidden";
		}
		else {
			document.getElementById("viewport-appLayout")!.style.overflow="scroll";
		}
	},[isFocused])

	const more = separateThousands(data.length - 10)?.join();

	const onKeyDown = (e:KeyboardEvent<HTMLElement>) => {
		const { code } = e;
		const navKeys = ["ArrowDown","ArrowUp"];
		const navLogics = [
			{
				code: "ArrowDown",
				do: 1
			},
			{
				code: "ArrowUp",
				do: -1
			}
		];

		if(navKeys.includes(code)) {
			// console.log("Up Down!")
			const idx = navLogics.findIndex((v)=>v.code===code);
			if(cursorIdx===0&&code==="ArrowUp") return;
			else if(cursorIdx===9&&code==="ArrowDown") return;
			const moveBy = cursorIdx+navLogics[idx].do
			setCursorIdx(moveBy);
		}
		else if(code==="Enter") {
			document.getElementById(data[cursorIdx])?.click();
			e.currentTarget.blur();
			setIsFocused(false);
		}
		else return;
	}

	return (
    <div className="z-[2] flex flex-col relative" ref={container}>
      {!isSearching && (
        <EzInput
          type={type}
          ref={ref}
          height={height}
          icon={icon}
          autoComplete="off"
          className={cn(className)}
          onFocus={e => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={onKeyDown}
          {...props}
        />
      )}
      {isSearching && (
        <span
          className={cn(
            inputVariant({height}),
            "w-full rounded-l-full rounded-r-full flex",
            "items-center justify-center border border-solid border-theme-border pointer-events-none gap-2",
          )}
        >
          <span className="h-full flex items-center animate-text-flash">
            <LuLoader2 className="w-6 h-6 animate-spin text-theme-text" />
          </span>
          <span className="text-theme-text text-[1rem] animate-text-flash">
            {props.value}
          </span>
        </span>
      )}
      {isRendered &&
        isFocused &&
        createPortal(
          <motion.div
            id={`${props.id}-autocomplete`}
            className={cn(
              "absolute w-full rounded-md shadow-md bg-theme-box h-auto z-[2]",
              "border border-theme-border border-solid p-6 smm:p-4",
              "flex flex-col opacity-0",
              "peer-focus-within:opacity-100 transition-opacity duration-200 peer-focus-within:translate-y-[1rem]",
              data.length === 0
                ? "items-center justify-center"
                : "justify-center",
              isFocused ? "pointer-events-auto" : "pointer-events-none",
            )}
            animate={{
              opacity: isFocused ? 1 : 0,
            }}
            style={{
              translateY:
                container.current!.getBoundingClientRect().y +
                container.current!.getBoundingClientRect().height +
                16,
              // translateX: container.current?.offsetLeft,
              translateX: container.current!.getBoundingClientRect().x,
              // width: container.current?.offsetWidth,
              width: container.current!.getBoundingClientRect().width,
            }}
          >
            {isLoading ? (
              <LuLoader2 className="h-6 w-6 animate-spin text-theme-text" />
            ) : (
              <>
                {error && (
                  <span className="h-8 text-[1rem] text-theme-danger flex items-center justify-center">
                    {error}
                  </span>
                )}
                {data.length === 0 && (
                  <span className="h-8 text-[1rem] text-theme-subtext flex items-center justify-center">
                    No results found
                  </span>
                )}
                {data.length > 0 &&
                  data.slice(0, 10).map((v: any, i: number) => {
                    return render ? (
                      <Fragment key={`${v}-${i}`}>
                        <span onMouseOver={() => setCursorIdx(i)}>
                          {render(v, i, cursorIdx)}
                        </span>
                      </Fragment>
                    ) : (
                      <span key={`${v}-${i}`}>{props.value}</span>
                    );
                  })}
                {data.length > 0 &&
                  more &&
                  Number(more.replace(/\,/g, "")) > 1 && (
                    <span className="h-8 text-tall flex items-center italic px-2 py-1 text-theme-text">
                      {more} more...
                    </span>
                  )}
              </>
            )}
          </motion.div>,
          document.getElementById("bodyWrapper")!,
        )}
    </div>
  );
})
EzAutoComplete.displayName = "EzAutoComplete";
