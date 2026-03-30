import { useEffect, useState } from "react";

export const useDebounceInput = (value: string, time: number) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => clearTimeout(timerId);
  }, [value, time]);
  return [debounceValue];
};
