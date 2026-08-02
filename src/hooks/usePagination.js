import { useCallback, useMemo, useState } from 'react'
import { DEFAULT_PAGE_SIZE } from '../utils/constants.js'
import { toBackendPage } from '../utils/queryParams.js'

export function usePagination(initialPage = 1, initialSize = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const changePage = useCallback((nextPage) => {
    setPage(Math.max(Number.parseInt(nextPage, 10) || 1, 1))
  }, [])

  return useMemo(
    () => ({
      page,
      size,
      backendPage: toBackendPage(page),
      setPage: changePage,
      setSize,
      nextPage: () => setPage((current) => current + 1),
      previousPage: () => setPage((current) => Math.max(1, current - 1)),
      resetPage: () => setPage(1),
    }),
    [changePage, page, size],
  )
}
