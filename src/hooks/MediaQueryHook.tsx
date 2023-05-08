import { useEffect, useState } from "react";

export function useMediaQuery(query: number, height?: boolean): boolean {
  const windowValue = height ? window.innerHeight : window.innerWidth;

  const [size, setSize] = useState<number>(windowValue);

  useEffect(() => {
    window.addEventListener("resize", () => setSize(window.innerWidth));
  }, []);

  return size <= query;
}
