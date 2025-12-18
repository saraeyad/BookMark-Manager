# Bookmark Manager

A modern, feature-rich bookmark management application built with React, TypeScript, and Vite.

## 🚀 Features

- User authentication (Login/Signup)
- Create, read, update, and delete bookmarks
- Organize bookmarks with tags
- Pin and archive bookmarks
- Sort bookmarks by title, date, visit count, and last visited
- Search bookmarks
- Dark/Light theme support
- Responsive design
- Visit tracking for bookmarks

## 📁 Project Structure

```
bookmark-manager/
├── public/                      # Static assets
│   └── assets/
│       └── fonts/              # Font files (Manrope)
│
├── src/                        # Source code
│   ├── assets/                 # Images and static assets
│   │   └── bookmarkiconpng.png
│   │
│   ├── components/             # Reusable UI components
│   │   ├── bookmarks/         # Bookmark-specific components
│   │   │   ├── Logo.tsx       # Application logo component
│   │   │   └── TagsContainer.tsx  # Tag display and selection
│   │   │
│   │   ├── form/              # Form components
│   │   │   ├── FormField.tsx      # Generic form field wrapper
│   │   │   ├── PasswordInput.tsx  # Password input with show/hide toggle
│   │   │   ├── LoginForm.tsx      # Login form component
│   │   │   ├── SignupForm.tsx     # Signup form component
│   │   │   └── index.ts           # Form components exports
│   │   │
│   │   └── ui/                # UI primitives (shadcn/ui components)
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── field.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sonner.tsx
│   │       ├── spinner.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── ThemedToaster.tsx  # Toast notifications with theme support
│   │
│   ├── config/                 # Configuration files
│   │   └── index.ts           # App configuration
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts           # Routes, months, and other constants
│   │
│   ├── context/                # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state management
│   │   ├── TagContext.tsx     # Tag filtering state management
│   │   └── ThemeContext.tsx   # Theme (dark/light) management
│   │
│   ├── lib/                    # Library utilities
│   │   └── utils.ts           # Utility functions (cn helper for Tailwind)
│   │
│   ├── router/                 # Routing configuration
│   │   ├── AppRouter.tsx      # Main router component
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   └── routes.tsx         # Route definitions
│   │
│   ├── schemas/                # Zod validation schemas
│   │   └── index.ts           # Form validation schemas and types
│   │
│   ├── services/               # API and service layer
│   │   ├── authService.ts     # Authentication service
│   │   │
│   │   └── bookmarkService/   # Bookmark service (modular structure)
│   │       ├── index.ts              # Main service export
│   │       ├── constants.ts          # Service constants (DEV_MODE, STORAGE_KEY)
│   │       ├── helpers.ts            # Helper functions (storage, tags, ID generation)
│   │       │
│   │       ├── getBookmarks.ts       # Get all bookmarks with filtering/sorting
│   │       ├── getBookmark.ts        # Get single bookmark by ID
│   │       ├── getTags.ts            # Get all tags
│   │       ├── createBookmark.ts     # Create new bookmark
│   │       ├── updateBookmark.ts     # Update existing bookmark
│   │       ├── deleteBookmark.ts     # Delete bookmark
│   │       ├── togglePinBookmark.ts  # Toggle pin status
│   │       ├── toggleArchiveBookmark.ts  # Toggle archive status
│   │       ├── visitBookmark.ts      # Record bookmark visit
│   │       └── resetToDefault.ts     # Reset bookmarks to default data
│   │
│   ├── utils/                  # Utility functions
│   │   ├── index.ts           # Utility exports
│   │   ├── api.ts             # API client utilities
│   │   ├── storage.ts         # localStorage utilities
│   │   ├── sort.ts            # Sorting utilities
│   │   └── form.ts            # Form validation utilities
│   │
│   ├── views/                  # Page components (route-level)
│   │   ├── auth/              # Authentication pages
│   │   │   ├── LoginPage.tsx      # Login page
│   │   │   ├── SignupPage.tsx     # Signup page
│   │   │   └── index.ts           # Auth exports
│   │   │
│   │   ├── bookmarks/         # Bookmark management pages
│   │   │   ├── BookmarksPage.tsx   # Main bookmarks page
│   │   │   │
│   │   │   ├── components/         # Bookmark page components
│   │   │   │   ├── AddBookmarkDialog.tsx   # Dialog for adding bookmarks
│   │   │   │   ├── BookmarkCard.tsx        # Individual bookmark card
│   │   │   │   ├── BookmarksHeader.tsx     # Page header with search
│   │   │   │   ├── BookmarksSidebar.tsx    # Sidebar with tags
│   │   │   │   ├── EmptyState.tsx          # Empty state component
│   │   │   │   ├── LoadingSkeleton.tsx     # Loading skeleton
│   │   │   │   ├── SortDropdown.tsx        # Sort options dropdown
│   │   │   │   ├── UserMenu.tsx            # User menu with logout
│   │   │   │   └── index.ts                # Components exports
│   │   │   │
│   │   │   ├── hooks/                      # Bookmark-specific hooks
│   │   │   │   ├── useBookmarks.ts         # Bookmark data management hook
│   │   │   │   └── index.ts                # Hooks exports
│   │   │   │
│   │   │   ├── types/                      # Bookmark-specific types
│   │   │   │   └── index.ts                # Type definitions
│   │   │   │
│   │   │   ├── utils/                      # Bookmark-specific utilities
│   │   │   │   └── index.ts                # Utility functions (formatDate, getDomain, etc.)
│   │   │   │
│   │   │   └── index.ts                    # Bookmark views exports
│   │   │
│   │   └── error/              # Error pages
│   │       ├── ErrorPage.tsx   # Error page component
│   │       └── index.ts        # Error exports
│   │
│   ├── index.css              # Global styles and Tailwind CSS
│   └── main.tsx               # Application entry point
│
├── data.json                   # Mock data for bookmarks
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node-specific TypeScript config
├── vite.config.ts              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── components.json             # shadcn/ui configuration

```

## 🏗️ Architecture Overview

### **Service Layer** (`src/services/`)
The service layer handles all data operations and API communication. The bookmark service is modularly structured with separate files for each operation:

- **Constants**: Configuration values (DEV_MODE, storage keys)
- **Helpers**: Reusable utility functions (storage operations, tag calculations)
- **Operation Files**: Each CRUD operation has its own file for better organization

### **Components** (`src/components/`)
Organized into three main categories:
- **bookmarks/**: Bookmark-specific components
- **form/**: Reusable form components
- **ui/**: Base UI components (shadcn/ui primitives)

### **Views** (`src/views/`)
Route-level components organized by feature:
- Each view can have its own components, hooks, types, and utils
- Promotes code organization and reusability

### **Utils** (`src/utils/`)
Shared utility functions:
- **api.ts**: API client with error handling
- **storage.ts**: localStorage operations
- **sort.ts**: Sorting algorithms
- **form.ts**: Form validation helpers

### **Context** (`src/context/`)
React Context providers for global state:
- **AuthContext**: User authentication state
- **TagContext**: Tag filtering state
- **ThemeContext**: Theme preference

## 🛠️ Key Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - UI component library
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Development Mode

The application runs in development mode by default, using `localStorage` for data persistence instead of a backend API. This allows for local development without requiring a server.

To switch to production mode, update `DEV_MODE` in:
- `src/services/authService.ts`
- `src/services/bookmarkService/constants.ts`

## 📝 Code Organization Principles

1. **Separation of Concerns**: Each file has a single, clear responsibility
2. **Modular Services**: Service operations are split into individual files
3. **Component Composition**: Small, reusable components
4. **Type Safety**: Full TypeScript coverage
5. **Feature-Based Views**: Views organized by feature with local components/hooks/utils

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** in `index.css` for animations and global styles
- **Theme Support** via next-themes (dark/light mode)

## 🔐 Authentication

- Local authentication using email/password
- JWT token-based auth (in development mode, uses mock tokens)
- Protected routes via `ProtectedRoute` component

## 📱 Features

- ✅ User registration and login
- ✅ Create, edit, and delete bookmarks
- ✅ Tag management and filtering
- ✅ Bookmark pinning and archiving
- ✅ Search functionality
- ✅ Sort by multiple criteria
- ✅ Visit tracking
- ✅ Dark/Light theme
- ✅ Responsive design

## 📄 License

Private project

---

Built with ❤️ using React and TypeScript
