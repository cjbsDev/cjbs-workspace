import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useResultObject = () => {
  const searchParams = useSearchParams();

  const resultObject = useMemo(() => {
    const obj = {};
    for (const [key, value] of searchParams.entries()) {
      obj[key] = value;
    }
    return obj;
  }, [searchParams]);

  const resultString = useMemo(() => {
    return JSON.stringify(resultObject) !== "{}"
      ? `?${new URLSearchParams(resultObject).toString()}`
      : "";
  }, [resultObject]);

  return [resultObject, resultString];
};
