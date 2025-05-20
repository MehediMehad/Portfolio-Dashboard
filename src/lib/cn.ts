import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
