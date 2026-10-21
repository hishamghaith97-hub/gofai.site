import type { CSSProperties } from "react";

/** Delay slot for the .rise entrance animation (see globals.css). */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
