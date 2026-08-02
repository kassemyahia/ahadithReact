# Ahadith React Frontend

Arabic RTL React frontend for the Ahadith application. The app connects to the Spring Boot API under `/api/v1` and supports public Hadith search/catalog browsing plus authenticated member flows.

Backend reference: https://github.com/jamilhelal37/Ahadith-spring

## Stack

- React JavaScript with Vite
- React Router
- TanStack Query
- Axios
- React Hook Form
- Tailwind CSS v4
- Vitest and React Testing Library

## Requirements

- Node.js and npm
- Ahadith Spring backend running separately for real API calls

## Environment

Create `.env` from `.env.example` when you need a custom API URL:

```text
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

In production, set `VITE_API_BASE_URL` to the deployed canonical `/api/v1` backend URL or serve the frontend behind the same origin with `/api/v1` proxied to the backend.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Current Features

- Public home, Hadith search, Hadith details, books, book Hadith list, narrators, muhaddiths, and invalid Hadith pages.
- Authentication: registration, login, logout, email verification, forgot password, reset password, session restoration, and refresh-token retry.
- Member profile display, profile image upload/removal, logout current session, and logout all sessions.
- Member favorites list, favorite add/remove, and favorite state on Hadith details.
- Member questions: ask, list, answer display, and delete.
- Member search history: list, search again, delete one item, and clear all.
- Member upgrade requests: PDF upload, request history, status display, and signed document download.
- Arabic loading, empty, error, and pending states.

## Routes

- Public: `/`, `/search`, `/hadith/:hadithId`, `/books`, `/books/:bookId`, `/invalid-hadiths`, `/narrators`, `/muhaddiths`, `/verify-email`, `/unauthorized`
- Guest only: `/login`, `/register`, `/forgot-password`, `/reset-password`
- Authenticated member: `/profile`, `/favorites`, `/questions`, `/settings`, `/search-history`, `/upgrade-request`

## Authentication

`AuthProvider` owns the current user and session actions. Access and refresh tokens are isolated in `src/services/tokenStorage.js`. The Axios client attaches access tokens, queues concurrent refresh attempts through one shared refresh request, retries failed 401 requests once, and clears local auth state if refresh fails.

Moving refresh tokens to Secure, HttpOnly cookies requires coordinated backend changes.

## File Uploads

- Profile images: JPEG, PNG, or WebP, maximum 2 MB.
- Upgrade documents: PDF only. The backend validates MIME type, extension, PDF content, page count, and size.

## Backend Coverage

See `docs/backend-api-coverage.md` for the endpoint inventory, frontend mapping, and remaining UI limitations.

## Deployment Notes

- Configure `VITE_API_BASE_URL`.
- Ensure SPA fallback routes serve `index.html`.
- Configure backend CORS for the deployed frontend origin.
- Configure backend email verification and password-reset frontend URLs.
