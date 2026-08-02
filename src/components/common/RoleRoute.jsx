import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { hasAnyRole } from '../../utils/roles.js'
import Spinner from './Spinner.jsx'

export default function RoleRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, isInitializing, user } = useAuth()
  const location = useLocation()

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

  if (!hasAnyRole(user, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children || <Outlet />
}
