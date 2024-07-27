import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
