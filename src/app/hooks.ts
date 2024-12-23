"use client";

import { useWindowSize } from "@uidotdev/usehooks";

export function useMobileBreakpoint() {
  const size = useWindowSize();
  if (size.width === null) {
    return "pending";
  }

  return size.width < 800;
}
