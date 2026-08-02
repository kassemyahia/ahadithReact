# Backend API Coverage

Source inspected: `https://github.com/jamilhelal37/Ahadith-spring` cloned to `/tmp/Ahadith-spring-inspect-1785685277`.

Canonical routes use `/api/v1`.

| Feature | Method | Path | Role | Request | Response | Frontend API | UI flow | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Auth | POST | `/api/v1/auth/register` | Public | `RegisterRequestDto` | `AuthResponseDto` | `register` | Register | Complete |
| Auth | POST | `/api/v1/auth/login` | Public | `LoginRequestDto` | `AuthResponseDto` | `login` | Login | Complete |
| Auth | POST | `/api/v1/auth/refresh` | Public | `RefreshTokenRequestDto` | `AuthResponseDto` | Axios client | Session refresh | Complete |
| Auth | POST | `/api/v1/auth/logout` | Public | `LogoutRequestDto` optional | `MessageResponseDto` | `logout` | Settings/AuthProvider | Complete |
| Auth | POST | `/api/v1/auth/verify-email` | Public | `VerifyEmailRequestDto` | `MessageResponseDto` | `verifyEmail` | Verify email | Complete |
| Auth | POST | `/api/v1/auth/resend-verification` | Public | `ResendVerificationRequestDto` | `MessageResponseDto` | `resendVerification` | No dedicated UI | Partial |
| Auth | POST | `/api/v1/auth/forgot-password` | Public | `ForgotPasswordRequestDto` | `MessageResponseDto` | `forgotPassword` | Forgot password | Complete |
| Auth | POST | `/api/v1/auth/reset-password` | Public | `ResetPasswordRequestDto` | `MessageResponseDto` | `resetPassword` | Reset password | Complete |
| Profile | GET | `/api/v1/me` | Authenticated | None | `AuthUserDto` | `getCurrentUser` | Profile/Auth restore | Complete |
| Profile | POST | `/api/v1/me/profile-image` | Authenticated | multipart `file` | `ProfileImageResponse` | `uploadProfileImage` | Profile image upload | Complete |
| Profile | DELETE | `/api/v1/me/profile-image` | Authenticated | None | 204 | `removeProfileImage` | Profile image removal | Complete |
| Profile | POST | `/api/v1/me/logout-all` | Authenticated | None | `MessageResponseDto` | `logoutAllSessions` | Settings | Complete |
| Hadith | POST | `/api/v1/ahadith/search` | Public | `HadithSearchRequest` | `SearchResponse<HadithSearchItemDto>` | `searchHadiths` | Search | Complete |
| Hadith | GET | `/api/v1/ahadith/{id}` | Public, viewer state when authenticated | Path UUID | `PublicHadithDetailsDto` | `getHadith` | Hadith details | Complete |
| Search filters | GET | `/api/v1/search/filters` | Public | None | `FiltersListResponseDto` | `getSearchFilters` | Search filters | Complete |
| Books | GET | `/api/v1/books` | Public | None | `List<PublicBookResponseDto>` | `getBooks` | Books | Complete |
| Books | GET | `/api/v1/books/{id}` | Public | Path UUID | `PublicBookResponseDto` | `getBook` | Book details | Complete |
| Books | GET | `/api/v1/books/{bookId}/ahadith` | Public | `page`, `size` | `SearchResponse<HadithSearchItemDto>` | `getBookHadiths` | Book Hadith list | Complete |
| Rawis | GET | `/api/v1/rawis` | Public | None | `List<PublicRawiListItemDto>` | `getNarrators` | Narrators | Complete |
| Rawis | GET | `/api/v1/rawis/{id}` | Public | Path UUID | `SimpleReferenceDto` | `getNarrator` | No detail page | Partial |
| Rulings | GET | `/api/v1/rulings` | Public | None | `List<SimpleReferenceDto>` | `getRulings` | Search metadata | Complete |
| Rulings | GET | `/api/v1/rulings/{id}` | Public | Path UUID | `SimpleReferenceDto` | `getRuling` | No detail page | Partial |
| Topics | GET | `/api/v1/topics` | Public | None | `List<SimpleReferenceDto>` | `getTopics` | Search metadata | Complete |
| Topics | GET | `/api/v1/topics/{id}` | Public | Path UUID | `SimpleReferenceDto` | `getTopic` | No detail page | Partial |
| Muhaddiths | GET | `/api/v1/muhaddiths` | Public | None | `List<PublicMuhaddithListItemDto>` | `getMuhaddiths` | Muhaddiths | Complete |
| Muhaddiths | GET | `/api/v1/muhaddiths/{id}` | Public | Path UUID | `SimpleReferenceDto` | `getMuhaddith` | No detail page | Partial |
| Explanations | GET | `/api/v1/explaining` | Public | `page`, `size` | `SearchResponse<PublicTextDto>` | `getExplanations` | Used on details when related | Partial |
| Explanations | GET | `/api/v1/explaining/{id}` | Public | Path UUID | `PublicTextDto` | `getExplanation` | No standalone page | Partial |
| Invalid Hadith | GET | `/api/v1/fake-ahadith` | Public | `page`, `size` | `SearchResponse<PublicTextDto>` | `getInvalidHadiths` | Invalid Hadith list | Complete |
| Invalid Hadith | GET | `/api/v1/fake-ahadith/{id}` | Public | Path UUID | `PublicTextDto` | `getInvalidHadith` | No detail page | Partial |
| Favorites | GET | `/api/v1/me/favorites` | Authenticated | `page`, `size` | `SearchResponse<HadithSearchItemDto>` | `getFavorites` | Favorites | Complete |
| Favorites | POST | `/api/v1/me/favorites/{hadithId}` | Authenticated | Path UUID | `FavoriteResponseDto` | `addFavorite` | Hadith details | Complete |
| Favorites | DELETE | `/api/v1/me/favorites/{hadithId}` | Authenticated | Path UUID | 204 | `removeFavorite` | Details/Favorites | Complete |
| Search history | GET | `/api/v1/me/search-history` | Authenticated | `limit` | `List<SearchHistoryResponseDto>` | `getSearchHistory` | Search history | Complete |
| Search history | GET | `/api/v1/me/search-history/search` | Authenticated | `keyword`, `limit` | `List<SearchHistoryResponseDto>` | `searchSearchHistory` | API only | Partial |
| Search history | DELETE | `/api/v1/me/search-history` | Authenticated | None | 204 | `clearSearchHistory` | Search history | Complete |
| Search history | DELETE | `/api/v1/me/search-history/{id}` | Authenticated | Path UUID | 204 | `deleteSearchHistoryItem` | Search history | Complete |
| Questions | POST | `/api/v1/me/questions` | Authenticated | `QuestionCreateRequestDto` | `MemberQuestionResponseDto` | `createQuestion` | Questions | Complete |
| Questions | GET | `/api/v1/me/questions` | Authenticated | None | `List<MemberQuestionResponseDto>` | `getMyQuestions` | Questions | Complete |
| Questions | GET | `/api/v1/me/questions/{id}` | Authenticated | Path UUID | `MemberQuestionResponseDto` | `getMyQuestion` | API only | Partial |
| Questions | DELETE | `/api/v1/me/questions/{id}` | Authenticated | Path UUID | 204 | `deleteMyQuestion` | Questions | Complete |
| Comments | GET | `/api/v1/me/comments` | Authenticated | None | `List<CommentResponseDto>` | `getMyComments` | No comments UI | API only |
| Comments | POST | `/api/v1/me/hadiths/{hadithId}/comments` | Authenticated | `CommentRequestDto` | `CommentResponseDto` | `createHadithComment` | No comments UI | API only |
| Comments | PATCH | `/api/v1/me/comments/{id}` | Authenticated owner | `CommentUpdateDto` | `CommentResponseDto` | `updateMyComment` | No comments UI | API only |
| Comments | DELETE | `/api/v1/me/comments/{id}` | Authenticated owner | Path UUID | 204 | `deleteMyComment` | No comments UI | API only |
| Upgrade | POST | `/api/v1/me/upgrade-requests` | Authenticated | multipart `document`, `notes` | `MemberUpgradeRequestResponseDto` | `createUpgradeRequest` | Upgrade request | Complete |
| Upgrade | GET | `/api/v1/me/upgrade-requests/current` | Authenticated | None | `MemberUpgradeRequestResponseDto` | `getCurrentUpgradeRequest` | API only | Partial |
| Upgrade | GET | `/api/v1/me/upgrade-requests` | Authenticated | None | `List<MemberUpgradeRequestResponseDto>` | `getMyUpgradeRequests` | Upgrade request | Complete |
| Upgrade | GET | `/api/v1/me/upgrade-requests/{id}/document` | Authenticated owner | Path UUID | `SignedDocumentDownloadResponseDto` | `getMyUpgradeDocument` | Upgrade request | Complete |
| Scholar questions | GET | `/api/v1/scholar/questions` | Scholar/Admin | `page`, `size`, `sort` | `SearchResponse<ScholarQuestionResponseDto>` | `getScholarQuestions` | No scholar UI | API only |
| Scholar questions | GET | `/api/v1/scholar/questions/{id}` | Scholar/Admin | Path UUID | `ScholarQuestionResponseDto` | Not added | No scholar UI | Missing |
| Scholar questions | PATCH | `/api/v1/scholar/questions/{id}/answer` | Scholar/Admin | `QuestionAnswerRequestDto` | `ScholarQuestionResponseDto` | `answerScholarQuestion` | No scholar UI | API only |
| Scholar questions | PATCH | `/api/v1/scholar/questions/{id}/status` | Scholar/Admin | `QuestionStatusUpdateRequestDto` | `ScholarQuestionResponseDto` | `updateScholarQuestionStatus` | No scholar UI | API only |
| Scholar comments | GET | `/api/v1/scholar/comments` | Scholar/Admin | `page`, `size`, `sort` | `SearchResponse<CommentResponseDto>` | `getScholarComments` | No scholar UI | API only |
| Admin dashboard | GET | `/api/v1/admin/dashboard` | Admin | None | `AdminDashboardResponseDto` | `getAdminDashboard` | No admin UI | API only |
| Admin catalog/content | GET/POST/PUT/DELETE | `/api/v1/admin/books`, `/muhaddiths`, `/rawis`, `/rulings`, `/topics`, `/explaining`, `/fake-ahadith`, `/similar-ahadith` | Admin | Domain DTOs | Domain response DTOs | `adminApi` generic helpers | No admin UI | API only |
| Admin Hadith | GET/POST/PUT/PATCH/DELETE | `/api/v1/admin/ahadith` and `/{id}` | Admin | `HadithRequestDto`, `HadithUpdateDto`, `HadithPatchDto` | `HadithResponseDto` | `adminApi` generic helpers | No admin UI | API only |
| Admin favorites | GET/DELETE | `/api/v1/admin/favorites` and `/{id}` | Admin | `page`, `size`, `sort` | `SearchResponse<FavoriteResponseDto>` / 204 | `adminApi` generic helpers | No admin UI | API only |
| Admin questions | GET/PATCH/DELETE | `/api/v1/admin/questions` routes | Admin | Question DTOs | `ScholarQuestionResponseDto` | `adminApi` generic helpers | No admin UI | API only |
| Admin comments | GET/DELETE | `/api/v1/admin/comments` routes | Admin | Pagination/path UUID | `CommentResponseDto` / 204 | `adminApi` generic helpers | No admin UI | API only |
| Admin notifications | GET/POST/DELETE | `/api/v1/admin/notifications` routes | Admin | `NotificationRequestDto` | `NotificationResponseDto` | `notificationsApi` | No admin UI | API only |
| Admin upgrade review | GET/PATCH/DELETE | `/api/v1/admin/upgrade-requests` routes | Admin | `UpgradeReviewRequestDto`, params | Upgrade response DTOs | `upgradeRequestsApi` | No admin UI | API only |
| Admin activity logs | GET | `/api/v1/admin/activity-logs` | Admin | Filters + pagination | `SearchResponse<ActivityLogResponseDto>` | `getActivityLogs` | No admin UI | API only |

## Notes

- Search, catalog, details, profile, favorites, search history, questions, and member upgrade requests are implemented as UI flows.
- Admin and scholar routes are inventoried and API helpers exist for the highest-value shared admin operations, but full admin/scholar screens remain deferred.
- No backend source was modified.
