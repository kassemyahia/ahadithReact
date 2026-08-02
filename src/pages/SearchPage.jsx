import SearchForm from '../components/search/SearchForm.jsx'
import SearchFilters from '../components/search/SearchFilters.jsx'
import SearchResults from '../components/search/SearchResults.jsx'

export default function SearchPage() {
  return (
    <section className="grid gap-5" aria-labelledby="search-heading">
      <div>
        <h1 id="search-heading" className="text-2xl font-bold text-stone-950">
          البحث في الأحاديث
        </h1>
        <p className="mt-2 text-sm text-stone-600">سيتم ربط نموذج البحث بنتائج الخادم في مرحلة لاحقة.</p>
      </div>
      <SearchForm onSubmit={() => null} />
      <SearchFilters filters={null} values={{}} onChange={() => null} />
      <SearchResults items={[]} emptyMessage="لم يتم تنفيذ بحث بعد." />
    </section>
  )
}
