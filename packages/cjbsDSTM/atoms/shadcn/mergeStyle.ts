import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twExtend(clsx(inputs));
}

const twExtend = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": [
                "text-tall",
                "text-short"
            ]
        }
    }
})