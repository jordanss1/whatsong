import { useEffect, useState } from "react";

export function useScreenWidth(height?: boolean): number {
  const [size, setSize] = useState<number>(
    height ? window.innerHeight : window.innerWidth
  );

  useEffect(() => {
    window.addEventListener("resize", () =>
      setSize(height ? window.innerHeight : window.innerWidth)
    );
  }, []);

  return size;
}

export function useMediaQuery(query: number, height?: boolean): boolean {
  const size = useScreenWidth(height);

  return size <= query;
}
