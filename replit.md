# Love Questionnaire Application

## Overview

This is a romantic-themed web application built as a love questionnaire with an animated, interactive frontend. The application features floating emoji animations, romantic styling, and a modern React-based architecture. It's designed to create an engaging, visually appealing experience for users taking a love-themed questionnaire.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/UI component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Animations**: Framer Motion for smooth animations and transitions, particularly for floating emoji effects
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API structure with route prefix `/api`
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) for development
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite for fast development cycles

### Build System
- **Frontend Bundler**: Vite for fast development and optimized production builds
- **Backend Bundler**: ESBuild for efficient server-side bundling
- **TypeScript**: Shared type definitions between client and server via `shared/` directory
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)

### Data Storage
- **Database**: PostgreSQL with Neon serverless database integration
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Centralized schema definitions in `shared/schema.ts`
- **Validation**: Drizzle-Zod integration for runtime type validation

### UI/UX Design
- **Design System**: New York variant of Shadcn/UI with neutral base colors
- **Theme**: Romantic theme with pink/purple gradient accents and heart emojis
- **Responsive**: Mobile-first design with Tailwind's responsive utilities
- **Animations**: Floating background elements and smooth transitions for enhanced user experience
- **Typography**: Inter font family for clean, modern text rendering

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **framer-motion**: Animation library for UI transitions
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI Component Libraries
- **@radix-ui/***: Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **lucide-react**: Modern icon library
- **class-variance-authority**: Utility for creating type-safe component variants
- **tailwindcss**: Utility-first CSS framework

### Database and Backend
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-kit**: Database migration and introspection tools
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **vite**: Frontend build tool and development server
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

### Date and Utility Libraries
- **date-fns**: Modern date utility library
- **clsx**: Utility for constructing className strings
- **tailwind-merge**: Utility for merging Tailwind CSS classes