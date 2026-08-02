import { useForm } from 'react-hook-form'
import { Search } from 'lucide-react'
import Button from '../common/Button.jsx'
import Select from '../common/Select.jsx'
import { SEARCH_MODES, SEARCH_SORTS } from '../../utils/constants.js'
import SearchInput from '../ui/SearchInput.jsx'

export default function SearchForm({ defaultValues, onSubmit, loading = false }) {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      query: '',
      mode: 'FLEXIBLE',
      includeExplanation: false,
      sort: 'RELEVANCE',
      ...defaultValues,
    },
  })

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="sr-only" htmlFor="query">نص البحث</label>
      <SearchInput id="query" {...register('query')} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Select id="mode" label="طريقة البحث" {...register('mode')}>
          {SEARCH_MODES.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </Select>
        <Select id="sort" label="الترتيب" {...register('sort')}>
          {SEARCH_SORTS.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </Select>
        <label className="flex min-h-12 items-center gap-3 rounded-[16px] border border-[var(--color-border-gold)] bg-white px-4 text-sm font-bold text-[var(--color-text)]">
          <input className="size-5 accent-[var(--color-primary)]" type="checkbox" {...register('includeExplanation')} />
          تضمين الشرح
        </label>
      </div>
      <div>
        <Button type="submit" loading={loading}>
          <Search className="size-4" aria-hidden="true" />
          بحث
        </Button>
      </div>
    </form>
  )
}
