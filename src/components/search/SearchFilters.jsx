import Select from '../common/Select.jsx'

export default function SearchFilters({ filters, values = {}, onChange }) {
  if (!filters) return null

  const filterGroups = [
    ['bookIds', 'الكتاب', filters.books],
    ['muhaddithIds', 'المحدث', filters.muhaddiths],
    ['rawiIds', 'الراوي', filters.rawis],
    ['rulingIds', 'الحكم', filters.rulings],
    ['topicIds', 'الموضوع', filters.topics],
    ['types', 'النوع', filters.types],
  ]

  return (
    <div className="grid gap-3 rounded-md border border-stone-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
      {filterGroups.map(([name, label, options = []]) => (
        <Select key={name} id={name} label={label} value={values[name] || ''} onChange={(event) => onChange(name, event.target.value)}>
          <option value="">الكل</option>
          {options.map((option) => (
            <option key={option.id || option.name} value={option.id}>
              {option.label || option.name}
            </option>
          ))}
        </Select>
      ))}
    </div>
  )
}
