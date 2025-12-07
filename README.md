# Business Intelligence Dashboard

A modern analytics dashboard for visualizing business metrics, KPIs, and transaction data with interactive charts and real-time insights.

## Prerequisites

This is the frontend application. You need to set up the backend API first:

**Backend Repository:** [business-intelligence-api](https://github.com/pavankumar-v/business-intelligence-api)

Follow the backend setup instructions before running this frontend application.

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Other Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite (Rolldown)
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Charts:** Recharts
- **State Management:** React Context API
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod validation

### Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context providers (metrics, theme)
├── services/         # API service layer
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and constants
├── config/           # Configuration files
└── assets/           # Static assets (images, icons)
```

### Key Features

- **KPI Cards:** Real-time business metrics visualization
- **Interactive Charts:** Line charts, bar charts, and custom visualizations
- **Transaction Upload:** CSV file upload with progress tracking
- **Region Filtering:** Multi-select country/region filters
- **Dark Mode:** Theme switching support
- **Responsive Design:** Mobile-first approach

### Data Flow

1. User interactions trigger actions in components
2. React Query manages API calls to the backend
3. Data is cached and synchronized automatically
4. Context providers manage global state (filters, theme)
5. Components re-render with updated data
