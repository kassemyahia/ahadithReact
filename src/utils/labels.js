export const roleLabels = {
  member: 'عضو',
  scholar: 'محدث',
  admin: 'مدير',
}

export const statusLabels = {
  pending_confirmation: 'بانتظار تأكيد البريد',
  active: 'نشط',
  disabled: 'معطل',
  pending_documents: 'بانتظار المستندات',
  under_review: 'قيد المراجعة',
  approved: 'مقبول',
  rejected: 'مرفوض',
}

export const hadithTypeLabels = {
  marfu: 'مرفوع',
  mawquf: 'موقوف',
  qudsi: 'قدسي',
  atharSahaba: 'أثر صحابي',
}

export const searchSourceLabels = {
  Hadith: 'حديث',
  fake_hadith: 'حديث لا يصح',
}

export function labelFrom(map, value) {
  return map[value] || value || ''
}
