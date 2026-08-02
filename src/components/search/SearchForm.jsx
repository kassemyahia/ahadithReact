import { useForm } from 'react-hook-form'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'
import Select from '../common/Select.jsx'
import { SEARCH_MODES, SEARCH_SORTS } from '../../utils/constants.js'

export default function SearchForm({ defaultValues, onSubmit }) {
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
    <form className="grid gap-4 rounded-md border border-stone-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <Input id="query" label="نص البحث" placeholder="اكتب كلمة أو عبارة" {...register('query')} />
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
        <label className="flex items-end gap-2 pb-3 text-sm text-stone-700">
          <input className="h-4 w-4 accent-emerald-800" type="checkbox" {...register('includeExplanation')} />
          تضمين الشرح
        </label>
      </div>
      <div>
        <Button type="submit">بحث</Button>
      </div>
    </form>
  )
}
