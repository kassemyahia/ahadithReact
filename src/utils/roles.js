export const ROLES = {
  MEMBER: 'MEMBER',
  SCHOLAR: 'SCHOLAR',
  ADMIN: 'ADMIN',
}

function normalizeRoleValue(value) {
  const role = String(value?.authority || value?.name || value || '')
    .replace(/^ROLE_/i, '')
    .trim()
    .toUpperCase()
  return Object.values(ROLES).includes(role) ? role : ''
}

export function normalizeUser(user) {
  if (!user) return user
  return { ...user, role: getUserRole(user) }
}

export function getUserRoles(user) {
  if (!user) return []
  const values = [
    user.role,
    user.type,
    ...(Array.isArray(user.roles) ? user.roles : []),
    ...(Array.isArray(user.authorities) ? user.authorities : []),
  ]
  return [...new Set(values.map(normalizeRoleValue).filter(Boolean))]
}

export function getUserRole(user) {
  const roles = getUserRoles(user)
  if (roles.includes(ROLES.ADMIN)) return ROLES.ADMIN
  if (roles.includes(ROLES.SCHOLAR)) return ROLES.SCHOLAR
  if (roles.includes(ROLES.MEMBER)) return ROLES.MEMBER
  return normalizeRoleValue(user?.type) || ROLES.MEMBER
}

export function hasRole(user, role) {
  return getUserRoles(user).includes(normalizeRoleValue(role))
}

export function hasAnyRole(user, roles = []) {
  return roles.some((role) => hasRole(user, role))
}

export function isMember(user) {
  return hasRole(user, ROLES.MEMBER)
}

export function isScholar(user) {
  return hasRole(user, ROLES.SCHOLAR)
}

export function isAdmin(user) {
  return hasRole(user, ROLES.ADMIN)
}

export function canAccessScholarFeatures(user) {
  return hasAnyRole(user, [ROLES.SCHOLAR, ROLES.ADMIN])
}

export function canAccessAdminFeatures(user) {
  return hasRole(user, ROLES.ADMIN)
}

export function defaultAuthenticatedPath(user) {
  if (isAdmin(user)) return '/admin'
  if (canAccessScholarFeatures(user)) return '/scholar'
  return '/'
}
