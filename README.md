# WasteLink

A modern platform connecting individuals with local waste collectors. Built to simplify recycling management, WasteLink enables users to find specific recycling facilities based on waste categories and seamlessly connect with collectors via WhatsApp.

## Key Features

**Public Interface**
- **Categorized Directory**: Browse waste collectors filtered by specific recycling categories (e.g., Plastic, Metal, Paper).
- **Collector Profiles**: Detailed pages featuring operational hours, addresses, and accepted materials.
- **Direct Integration**: Seamless WhatsApp integration for immediate communication with collectors.
- **Educational Content**: Embedded recycling guidelines and material-specific disposal instructions.

**Admin Dashboard**
- **Content Management**: Complete CRUD operations for Collectors and Categories.
- **Media Handling**: Integrated image uploading and storage management via Supabase.
- **Secure Authentication**: Protected dashboard access with session management.
- **Responsive Management**: Fully optimized interface for both desktop and mobile administration.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Services**: [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Storage)

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Supabase project and account

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wastelink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory based on the `.env.example` structure:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to view the application.

## Architecture & Structure

- `/src/app/(public)` - Public-facing routing group (Home, Directories, Detail Pages)
- `/src/app/(admin)` - Protected routing group for the admin dashboard
- `/src/components` - Reusable UI components and feature-specific modules
- `/src/lib` - Utility configurations (e.g., Supabase client initialization)
- `/src/actions` - Server actions handling database mutations
- `/src/types` - TypeScript interfaces
