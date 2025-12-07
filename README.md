

<img width="75" height="75" alt="logo2" src="https://github.com/user-attachments/assets/5d9bd8a8-ed8c-4cdc-84eb-8ad8d9221219" /> <h1> Business Intelligence Dashboard </h1>


A modern analytics dashboard for visualizing business metrics, KPIs, and transaction data with interactive charts and real-time insights.


<img width="4536" height="2469" alt="business-intelligence" src="https://github.com/user-attachments/assets/ae3dcf83-e78b-4a37-a7ce-6e547f4a4827" />
<img width="4536" height="2466" alt="bis-intel1" src="https://github.com/user-attachments/assets/d4d817f5-69af-4d76-a209-b2a07edff3d1" />
# Upload Trandactions and Users 
<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 49 29 AM" src="https://github.com/user-attachments/assets/57f4a264-e84c-4e99-aa82-1f43b9fda685" />
<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 49 54 AM" src="https://github.com/user-attachments/assets/70f3fd68-e8b8-4259-ab3f-c40d912efd8d" />
<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 50 08 AM" src="https://github.com/user-attachments/assets/3430a8d5-3919-4e6b-a8f9-fd5d008cb23f" />

# Metrics Graphs and Visualizations

<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 46 53 AM" src="https://github.com/user-attachments/assets/af0bd076-526e-4a8a-9c25-b0bff6066a1c" />


<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 47 13 AM" src="https://github.com/user-attachments/assets/a06c24a2-7e2d-4b7c-a952-2ee1a102e033" />

<img width="1512" height="824" alt="Screenshot 2025-12-08 at 12 47 02 AM" src="https://github.com/user-attachments/assets/06aa35fb-21df-4040-9727-d7524f19d3aa" />

# Collapsed Sidebar
<img width="1512" height="823" alt="Screenshot 2025-12-08 at 12 47 13 AM" src="https://github.com/user-attachments/assets/872b10dc-cf32-4528-b12a-8aa0a04b318d" />



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
