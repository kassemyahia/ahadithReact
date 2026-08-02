# Ahadith React Frontend

Arabic-first Vite React scaffold for the Ahadith web application.

## Purpose

This project provides the initial frontend architecture for public Hadith browsing, search, authentication, user profiles, profile images, and favorites. It intentionally avoids fake Hadith data and does not include admin, scholar, comments, questions, notifications, or search-history screens yet.

Backend repository: https://github.com/jamilhelal37/Ahadith-spring

## Technology Stack

- React JavaScript
- Vite
- React Router
- Axios
- TanStack Query
- React Hook Form
- Tailwind CSS with `@tailwindcss/vite`
- Vitest
- React Testing Library
- ESLint

## Prerequisites

- Node.js compatible with the installed Vite version
- npm
- The backend API running separately when testing real API calls

Expected local backend API base URL:

```text
http://localhost:8080/api/v1
```

## Installation

```bash
npm install
```

## Environment Configuration

Create a local `.env` only when overriding defaults. Do not commit `.env`.

```text
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

`.env.example` is provided with the expected local value.

## Commands

```bash
npm run dev
npm run lint
npm run test
npm run build
```

## Folder Structure

- `src/api`: Shared Axios client and API modules.
- `src/components`: Common UI, layout, Hadith, books, search, and auth components.
- `src/contexts`: Authentication provider.
- `src/hooks`: `useAuth`, `useDebounce`, and `usePagination`.
- `src/pages`: Route-level placeholder pages.
- `src/routes`: React Router route tree.
- `src/services`: Local token storage.
- `src/utils`: API error normalization, query params, constants, and validators.
- `src/styles`: Tailwind entry stylesheet and minimal global CSS.
- `src/test`: Vitest/RTL setup.

## Routes

- `/`
- `/search`
- `/hadith/:hadithId`
- `/books`
- `/books/:bookId`
- `/login`
- `/register`
- `/verify-email`
- `/forgot-password`
- `/reset-password`
- `/profile`
- `/favorites`
- `*`

`/profile` and `/favorites` are protected by `ProtectedRoute`.

## Authentication Architecture

`AuthProvider` centralizes login, logout, and session restoration. It keeps the user object in memory and stores only access and refresh tokens in localStorage for this scaffold. Before production, refresh-token storage should be revisited with the backend, preferably using Secure HttpOnly cookies.

The Axios client attaches the access token, includes a minimal 401 refresh foundation, avoids redirecting from the API layer, and clears tokens when refresh fails.

## API Modules

- `authApi.js`: login, register, refresh, logout, email verification, password reset flows.
- `hadithApi.js`: Hadith search, search filters, Hadith details.
- `catalogApi.js`: books, book Hadiths, narrators, scholars, topics, rulings, explanations.
- `profileApi.js`: current user, profile image upload/removal, logout all sessions.
- `favoritesApi.js`: list, add, and remove favorites.

Endpoint paths were based on inspected backend Spring controllers and DTOs under `/api/v1`.

## Current Status

- Project scaffold and routing are in place.
- Public pages are semantic Arabic placeholders and do not fetch live data yet.
- API functions are ready for future feature wiring.
- Auth forms use confirmed backend payload shapes.
- Tailwind v4 Vite integration is configured.
- Basic tests cover protected routing, route rendering, token storage, query-page conversion, API error normalization, button behavior, and `useAuth` misuse.

## Known Limitations

- No production visual design yet.
- No full refresh-token concurrency queue.
- No focus trap in `Modal` yet.
- No profile image UI flow yet.
- No real search-results page wiring yet.
- No admin, scholar, comments, questions, notifications, or search-history screens.

## Next Steps

- Wire search pages to `searchHadiths` and `getSearchFilters`.
- Wire books pages to `getBooks`, `getBook`, and `getBookHadiths`.
- Add Hadith details loading with favorite state.
- Build profile image upload and removal UI.
- Add mutation handling for favorites.
- Add broader component tests as page behavior becomes real.
