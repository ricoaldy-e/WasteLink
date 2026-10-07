# WasteLink

WasteLink is an early-stage MVP information platform and waste-collector directory. It helps the public find collectors by waste category and available contact information, without creating an account.

Production website: https://wastelinkhub.app · Public contact: founder@wastelinkhub.app

WasteLink does not process payments or transactions, book pickups, operate logistics, verify collectors, or guarantee their services. No production AI integration is implemented.

## Key Features

**Public Interface**
- **Categorized Directory**: Browse waste collectors filtered by specific recycling categories (e.g., Plastic, Metal, Paper).
- **Collector Profiles**: Detailed pages featuring operational hours, addresses, and accepted materials.
- **Contact Links**: WhatsApp and location links where provided by directory records.
- **Educational Content**: Category descriptions and waste-handling information where available.
- **Product Information**: About, Contact, Privacy, and Terms pages accessible from the public footer.

**Admin Dashboard**
- **Content Management**: Complete CRUD operations for Collectors and Categories.
- **Media Handling**: Integrated image uploading and storage management via Supabase.
- **Admin Authentication**: Supabase login and session management; deployed database and storage permissions require separate verification.
- **Responsive Management**: Fully optimized interface for both desktop and mobile administration.

## Tech Stack

- **Framework**: [Next.js 16.2.9](https://nextjs.org/) (App Router), React 19.2.4
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Services**: [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Storage)

## Prerequisites

- Node.js 20.9 or later (as required by the installed Next.js package)
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

## Public readiness

Canonical URLs and public metadata use `https://wastelinkhub.app` through `src/lib/site.ts`. The sitemap lists the seven stable public entry pages; directory detail pages are discoverable through category and collector links. `robots.txt` permits public pages and excludes admin/auth paths from crawling; it is not an authorization mechanism.

See [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) for current scope and planned work.
