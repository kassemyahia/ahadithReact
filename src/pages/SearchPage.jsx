import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { getSearchFilters, searchHadiths } from '../api/hadithApi.js'
import Pagination from '../components/common/Pagination.jsx'
import SearchForm from '../components/search/SearchForm.jsx'
import SearchFilters from '../components/search/SearchFilters.jsx'
import SearchResults from '../components/search/SearchResults.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { getItems, getPagination, toIdList } from '../utils/apiData.js'
import { readPositivePage, readStringParam, toBackendPage } from '../utils/queryParams.js'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterValues, setFilterValues] = useState({
    bookIds: readStringParam(searchParams, 'bookId'),
    muhaddithIds: readStringParam(searchParams, 'muhaddithId'),
    rawiIds: readStringParam(searchParams, 'rawiId'),
    rulingIds: readStringParam(searchParams, 'rulingId'),
    topicIds: readStringParam(searchParams, 'topicId'),
    types: readStringParam(searchParams, 'type'),
  })
  const filtersQuery = useQuery({ queryKey: ['search-filters'], queryFn: ({ signal }) => getSearchFilters({ signal }) })
  const uiPage = readPositivePage(searchParams.get('page'), 1)
  const initialValues = {
    query: readStringParam(searchParams, 'query'),
    mode: readStringParam(searchParams, 'mode', 'FLEXIBLE'),
    includeExplanation: searchParams.get('includeExplanation') === 'true',
    sort: readStringParam(searchParams, 'sort', 'RELEVANCE'),
  }

  function handleFilterChange(name, value) {
    setFilterValues((current) => ({ ...current, [name]: value }))
  }

  const hasSearchCriteria = ['query', 'bookId', 'muhaddithId', 'rawiId', 'rulingId', 'topicId', 'type'].some((key) => searchParams.get(key))

  function buildPayload(values, filters = filterValues, page = 1) {
    return {
      query: values.query?.trim(),
      mode: values.mode,
      includeExplanation: Boolean(values.includeExplanation),
      sort: values.sort,
      page: toBackendPage(page),
      size: 20,
      bookIds: toIdList(filters.bookIds),
      muhaddithIds: toIdList(filters.muhaddithIds),
      rawiIds: toIdList(filters.rawiIds),
      rulingIds: toIdList(filters.rulingIds),
      topicIds: toIdList(filters.topicIds),
      types: toIdList(filters.types),
    }
  }

  function buildPayloadFromUrl() {
    return buildPayload(
      initialValues,
      {
        bookIds: readStringParam(searchParams, 'bookId'),
        muhaddithIds: readStringParam(searchParams, 'muhaddithId'),
        rawiIds: readStringParam(searchParams, 'rawiId'),
        rulingIds: readStringParam(searchParams, 'rulingId'),
        topicIds: readStringParam(searchParams, 'topicId'),
        types: readStringParam(searchParams, 'type'),
      },
      uiPage,
    )
  }

  const resultsQuery = useQuery({
    queryKey: ['hadith-search', searchParams.toString()],
    queryFn: ({ signal }) => searchHadiths(buildPayloadFromUrl(), { signal }),
    enabled: hasSearchCriteria,
  })

  function syncUrl(values, page = 1) {
    const next = new URLSearchParams()
    if (values.query?.trim()) next.set('query', values.query.trim())
    if (values.mode && values.mode !== 'FLEXIBLE') next.set('mode', values.mode)
    if (values.includeExplanation) next.set('includeExplanation', 'true')
    if (values.sort && values.sort !== 'RELEVANCE') next.set('sort', values.sort)
    if (page > 1) next.set('page', String(page))
    if (filterValues.bookIds) next.set('bookId', filterValues.bookIds)
    if (filterValues.muhaddithIds) next.set('muhaddithId', filterValues.muhaddithIds)
    if (filterValues.rawiIds) next.set('rawiId', filterValues.rawiIds)
    if (filterValues.rulingIds) next.set('rulingId', filterValues.rulingIds)
    if (filterValues.topicIds) next.set('topicId', filterValues.topicIds)
    if (filterValues.types) next.set('type', filterValues.types)
    setSearchParams(next)
  }

  function handleSubmit(values) {
    syncUrl(values, 1)
  }

  function handlePageChange(page) {
    syncUrl(initialValues, page)
  }

  const results = getItems(resultsQuery.data)
  const pagination = getPagination(resultsQuery.data)

  return (
    <PageContainer labelledBy="search-heading" className="max-w-3xl">
      <h1 id="search-heading" className="sr-only">البحث المتقدم</h1>
      <SearchForm key={searchParams.toString()} defaultValues={initialValues} onSubmit={handleSubmit} loading={resultsQuery.isFetching} />
      <SectionCard className="border-[var(--color-border-gold)] bg-[var(--color-page)]/65">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-black text-[var(--color-text)]">إعدادات البحث</h2>
        </div>
        <SearchFilters filters={filtersQuery.data} values={filterValues} onChange={handleFilterChange} isLoading={filtersQuery.isLoading} />
      </SectionCard>
      <SearchResults
        items={results}
        isLoading={resultsQuery.isLoading}
        error={resultsQuery.error}
        emptyMessage={!hasSearchCriteria ? 'ابدأ البحث لعرض النتائج.' : 'لا توجد نتائج مطابقة.'}
      />
      {pagination.totalPages > 1 && (
        <Pagination currentPage={uiPage} totalPages={pagination.totalPages} disabled={resultsQuery.isFetching} onPageChange={handlePageChange} />
      )}
    </PageContainer>
  )
}
