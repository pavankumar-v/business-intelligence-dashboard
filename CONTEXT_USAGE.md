# Filter and Metrics Context

This document explains how to use the Filter and Metrics Context to share data between components.

## Overview

The `MetricsContext` provides a centralized way to manage:

- **Filters**: Date range and region filters that apply to all metrics
- **Metrics Data**: Shared metrics data fetched from the API based on the current filters
- **State Management**: Loading, error states, and refetch functionality

## Setup

The context is already integrated in `App.tsx`:

```tsx
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MetricsProvider>
        <DashboardContent />
      </MetricsProvider>
    </ThemeProvider>
  );
}
```

## Usage in Components

### Basic Usage

```tsx
import { useMetrics } from "@/context/metrics-context";

function MyComponent() {
  const { metrics, filters, setFilters, isLoading, isError } = useMetrics();

  return (
    <div>
      <h1>Total Cost: {metrics?.total_cost}</h1>
    </div>
  );
}
```

### Available Properties

| Property     | Type                              | Description                                           |
| ------------ | --------------------------------- | ----------------------------------------------------- |
| `metrics`    | `KpiMetricsResponse \| undefined` | The fetched metrics data                              |
| `filters`    | `MetricsFilter`                   | Current filter values (regions, start_date, end_date) |
| `setFilters` | `Function`                        | Update filters (triggers automatic refetch)           |
| `isLoading`  | `boolean`                         | Loading state of the metrics query                    |
| `isError`    | `boolean`                         | Error state of the metrics query                      |
| `error`      | `Error \| null`                   | Error object if query failed                          |
| `refetch`    | `Function`                        | Manually refetch metrics data                         |

### Updating Filters

```tsx
function FilterComponent() {
  const { filters, setFilters } = useMetrics();

  const handleRegionChange = (regions: string[]) => {
    setFilters({
      ...filters,
      regions: regions,
    });
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    setFilters({
      ...filters,
      start_date: startDate,
      end_date: endDate,
    });
  };

  return (
    <div>
      <button onClick={() => handleRegionChange(["EU", "US"])}>
        Filter by EU and US
      </button>
      <button onClick={() => handleDateChange("2024-01-01", "2024-12-31")}>
        Set Date Range
      </button>
    </div>
  );
}
```

### Using with Functional Updates

```tsx
function FilterComponent() {
  const { setFilters } = useMetrics();

  const addRegion = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      regions: [...prev.regions, region],
    }));
  };

  return <button onClick={() => addRegion("EU")}>Add EU Region</button>;
}
```

## Default Filter Values

The context initializes with these default values:

```tsx
{
  regions: [],
  start_date: "2024-01-01",
  end_date: "2024-03-31",
}
```

You can override these when creating the provider:

```tsx
<MetricsProvider
  defaultFilters={{
    regions: ["US"],
    start_date: "2024-06-01",
    end_date: "2024-12-31",
  }}
>
  <App />
</MetricsProvider>
```

## Benefits

1. **Single Source of Truth**: All components use the same metrics data
2. **Automatic Synchronization**: Changing filters updates all components
3. **Reduced API Calls**: Data is fetched once and shared, with smart caching via React Query
4. **Better Performance**: React Query handles caching, deduplication, and background updates
5. **Simplified Components**: No need to pass props through multiple levels

## Example: Complete Filter Component

```tsx
import { useMetrics } from "@/context/metrics-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function MetricsFilterPanel() {
  const { filters, setFilters, isLoading } = useMetrics();
  const [startDate, setStartDate] = useState(filters.start_date);
  const [endDate, setEndDate] = useState(filters.end_date);

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      start_date: startDate,
      end_date: endDate,
    });
  };

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter((r) => r !== region)
      : [...filters.regions, region];

    setFilters({
      ...filters,
      regions: newRegions,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3>Date Range</h3>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={handleApplyFilters} disabled={isLoading}>
          Apply Date Filter
        </Button>
      </div>

      <div>
        <h3>Regions</h3>
        <Button onClick={() => toggleRegion("EU")}>
          {filters.regions.includes("EU") ? "✓" : ""} EU
        </Button>
        <Button onClick={() => toggleRegion("US")}>
          {filters.regions.includes("US") ? "✓" : ""} US
        </Button>
        <Button onClick={() => toggleRegion("ASIA")}>
          {filters.regions.includes("ASIA") ? "✓" : ""} Asia
        </Button>
      </div>

      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default MetricsFilterPanel;
```

## Implementation Details

- Built with React Context API
- Integrates with React Query for data fetching
- Follows the same pattern as `ThemeContext` for consistency
- TypeScript support with full type safety
- Automatic re-fetching when filters change (via React Query's dependency array)
