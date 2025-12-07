"use client";

import * as React from "react";
import { useMetrics } from "@/context/metrics-context";
import { COUNTRIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Earth } from "lucide-react";

export function RegionFilterDropdown() {
  const { filters, setFilters } = useMetrics();

  React.useEffect(() => {
    if (filters.regions.length === 0) {
      setFilters((prev) => ({
        ...prev,
        regions: COUNTRIES.map((country) => country.code),
      }));
    }
  }, [filters.regions.length, setFilters]);

  const handleRegionToggle = (countryCode: string) => {
    setFilters((prev) => {
      const regions = prev.regions.includes(countryCode)
        ? prev.regions.filter((code) => code !== countryCode)
        : [...prev.regions, countryCode];

      return {
        ...prev,
        regions,
      };
    });
  };

  const selectedCount = filters.regions.length;
  const totalCount = COUNTRIES.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Earth className="mr-2 h-4 w-4 text-primary" />
          Change Region
          {selectedCount > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({selectedCount}/{totalCount})
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Select Regions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COUNTRIES.map((country) => (
          <DropdownMenuCheckboxItem
            key={country.code}
            checked={filters.regions.includes(country.code)}
            onCheckedChange={() => handleRegionToggle(country.code)}
          >
            <div className="flex items-center gap-2">
              <img
                src={country.logo_url}
                alt={country.name}
                className="w-5 h-5 rounded-sm object-cover"
              />
              <span>{country.name}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
