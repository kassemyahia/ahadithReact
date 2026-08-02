import Select from '../common/Select.jsx'
import AccordionSection from '../ui/AccordionSection.jsx'
import LoadingSkeleton from '../common/LoadingSkeleton.jsx'
import EmptyState from '../common/EmptyState.jsx'

function getOptionLabel(option) {
  return option?.label || option?.name || option?.title || option?.value
}

export default function SearchFilters({ filters, values = {}, onChange, isLoading = false }) {
  if (isLoading) return <LoadingSkeleton rows={2} />

  const filterGroups = [
    ['bookIds', 'المصدر', filters?.books],
    ['muhaddithIds', 'المحدث', filters?.muhaddiths],
    ['rawiIds', 'الراوي', filters?.rawis],
    ['rulingIds', 'الخاصية', filters?.rulings],
    ['topicIds', 'التصنيف', filters?.topics],
    ['types', 'النوع', filters?.types],
  ]
  const availableGroups = filterGroups.filter(([, , options]) => Array.isArray(options) && options.length > 0)

  if (!availableGroups.length) {
    return <EmptyState title="لا توجد خيارات تصفية" message="لم يرجع الخادم خيارات تصفية متاحة حاليًا." />
  }

  return (
    <div className="grid gap-3">
      {availableGroups.map(([name, label, options = []], index) => (
        <AccordionSection key={name} title={label} defaultOpen={index === 0}>
          <Select id={name} label={label} value={values[name] || ''} onChange={(event) => onChange(name, event.target.value)}>
            <option value="">الكل</option>
            {options.map((option) => (
              <option key={option.id || option.name || option.value} value={option.id || option.value || option.name}>
                {getOptionLabel(option)}
              </option>
            ))}
          </Select>
        </AccordionSection>
      ))}
    </div>
  )
}
