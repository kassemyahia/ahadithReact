import HadithList from '../hadith/HadithList.jsx'

export default function SearchResults({ items = [], isLoading = false, error = null, emptyMessage }) {
  return (
    <div className="grid gap-5">
      <HadithList items={items} isLoading={isLoading} error={error} emptyMessage={emptyMessage} />
    </div>
  )
}
