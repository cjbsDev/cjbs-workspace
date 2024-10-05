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
		"twcss-w-full twcss-flex twcss-flex-row twcss-gap-4 twcss-items-center twcss-z-[2] twcss-bg-theme-box",
		"twcss-rounded-md twcss-border-solid twcss-border twcss-border-theme-border",
		"hover:twcss-border-theme-text focus-within:!twcss-border-theme-primary focus:!twcss-border-theme-primary",
		"focus-visible:twcss-outline-none disabled:twcss-cursor-not-allowed disabled:twcss-opacity-50"
	].join(" "),
	{
		variants: {
			height: {
				default: "twcss-h-10 twcss-px-4 twcss-py-2",
				sm: "twcss-h-8 twcss-px-2 twcss-py-1",
				lg: "twcss-h-12 twcss-px-4 twcss-py-2"
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
				className="twcss-h-full twcss-flex twcss-items-center"
			>
				{icon}
			</span>}
			<input
				ref={ref}
				type={type}
				className={cn(
					"twcss-flex twcss-h-full twcss-w-full twcss-rounded-md",
					"twcss-text-theme-text twcss-bg-theme-box focus-visible:twcss-outline-none",
					// "placeholder:text-muted-foreground"
					"placeholder:twcss-text-theme-subtext placeholder:twcss-text-tall",
					height==="lg" ? "twcss-text-[1rem]" : "twcss-text-tall"
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
				"peer twcss-overflow-hidden twcss-min-w-[300px]",
				className
			)}
			onKeyDown={props.onKeyDown}
		>
			{icon&&<span className="twcss-h-full twcss-flex twcss-items-center">{icon}</span>}
			{tags&&tags.value.length>0&&<span
				className="twcss-w-auto twcss-h-full twcss-flex twcss-flex-row twcss-gap-1"
			>
				{tags.value.map((v,i)=>(
				<Badge key={`${v}-${i}`} variant={"outline"} className="twcss-bg-theme-box">
					{v}
				</Badge>
				))}
			</span>}
			<input
				ref={ref}
				type={type}
				className={cn(
					"twcss-flex twcss-h-full twcss-w-full twcss-rounded-md",
					"twcss-text-theme-text twcss-bg-theme-box focus-visible:twcss-outline-none",
					// "placeholder:text-muted-foreground"
					"placeholder:twcss-text-theme-subtext"
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
    <div className="twcss-z-[2] twcss-flex twcss-flex-col twcss-relative" ref={container}>
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
            "twcss-w-full twcss-rounded-l-full twcss-rounded-r-full twcss-flex",
            "twcss-items-center twcss-justify-center twcss-border twcss-border-solid twcss-border-theme-border twcss-pointer-events-none twcss-gap-2",
          )}
        >
          <span className="twcss-h-full twcss-flex twcss-items-center animate-text-flash">
            <LuLoader2 className="twcss-w-6 twcss-h-6 animate-spin twcss-text-theme-text" />
          </span>
          <span className="twcss-text-theme-text twcss-text-[1rem] animate-text-flash">
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
              "twcss-absolutetwcss- w-full twcss-rounded-md twcss-shadow-md twcss-bg-theme-box twcss-h-auto twcss-z-[2]",
              "twcss-border twcss-border-theme-border twcss-border-solid twcss-p-6 smm:twcss-p-4",
              "twcss-flex twcss-flex-col twcss-opacity-0",
              "peer-focus-within:twcss-opacity-100 twcss-ransition-opacity twcss-duration-200 peer-focus-within:twcss-translate-y-[1rem]",
              data.length === 0
                ? "twcss-items-center twcss-justify-center"
                : "twcss-justify-center",
              isFocused ? "twcss-pointer-events-auto" : "twcss-pointer-events-none",
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
              <LuLoader2 className="twcss-h-6 twcss-w-6 animate-spin twcss-text-theme-text" />
            ) : (
              <>
                {error && (
                  <span className="twcss-h-8 twcss-text-[1rem] twcss-text-theme-danger twcss-flex twcss-items-center twcss-justify-center">
                    {error}
                  </span>
                )}
                {data.length === 0 && (
                  <span className="twcss-h-8 twcss-text-[1rem] twcss-text-theme-subtext twcss-flex twcss-items-center twcss-justify-center">
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
                    <span className="twcss-h-8 twcss-text-tall twcss-flex twcss-items-center twcss-italic twcss-px-2 twcss-py-1 twcss-text-theme-text">
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
