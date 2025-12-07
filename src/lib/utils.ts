import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const endMonth = endDate.toLocaleString("en-US", { month: "long" });

  const year = startDate.getFullYear(); // assume same year; you can modify if needed

  // If both months are same → show single month
  if (startMonth === endMonth) {
    return `${startMonth} ${year}`;
  }

  return `${startMonth} – ${endMonth} ${year}`;
}
