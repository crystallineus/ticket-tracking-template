import { useWindowSize } from "@uidotdev/usehooks";

export function useMobileBreakpoint() {
  const size = useWindowSize();
  return size?.width === null ? false : size.width < 800;
}
