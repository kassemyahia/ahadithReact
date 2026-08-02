import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Spinner from './Spinner.jsx'

function normalizeRole(role) {
  return String(role || '').toLowerCase()
}

export default function RoleRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, isInitializing, user } = useAuth()
  const location = useLocation()
  const role = normalizeRole(user?.type)

  if (isInitializing) {
    return (
      <div className="grid min-h-64 place-items-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.map(normalizeRole).includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children || <Outlet />
}
