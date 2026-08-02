export const APP_NAME = 'موسوعة الأحاديث'
export const DEFAULT_PAGE_SIZE = 20
export const CATALOG_STALE_TIME = 5 * 60 * 1000
export const QUERY_STALE_TIME = 60 * 1000

export const ROUTES = {
  home: '/',
  search: '/search',
  hadithDetails: '/hadith/:hadithId',
  books: '/books',
  bookDetails: '/books/:bookId',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  favorites: '/favorites',
}

export const SEARCH_MODES = [
  { value: 'FLEXIBLE', label: 'بحث مرن' },
  { value: 'EXACT', label: 'مطابقة دقيقة' },
]

export const SEARCH_SORTS = [
  { value: 'RELEVANCE', label: 'الأكثر صلة' },
  { value: 'HADITH_NUMBER_ASC', label: 'رقم الحديث تصاعديًا' },
  { value: 'HADITH_NUMBER_DESC', label: 'رقم الحديث تنازليًا' },
]
