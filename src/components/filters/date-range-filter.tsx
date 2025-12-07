"use client";

import * as React from "react";
import { Calendars, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { useMetrics } from "@/context/metrics-context";

export function DateRangeFilter() {
  const { filters, setFilters } = useMetrics();
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(filters.start_date),
    to: new Date(filters.end_date),
  });

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            <Calendars className="mr-2 h-4 w-4 text-purple-500" />
            {dateRange?.from
              ? dateRange.from.toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(dateRange) => {
              setDateRange(dateRange);
              setFilters((prev) => ({
                ...prev,
                start_date:
                  dateRange?.from?.toISOString().split("T")[0] ||
                  prev.start_date,
                end_date:
                  dateRange?.to?.toISOString().split("T")[0] || prev.end_date,
              }));
            }}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
