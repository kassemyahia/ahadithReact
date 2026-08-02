import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import Spinner from '../components/common/Spinner.jsx'
import { canAccessScholarFeatures, defaultAuthenticatedPath, isAdmin } from '../utils/roles.js'

export default function DashboardRedirectPage() {
  const { isAuthenticated, isInitializing, user } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return (
      <div className="grid min-h-64 place-items-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  if (isAdmin(user) || canAccessScholarFeatures(user)) return <Navigate to={defaultAuthenticatedPath(user)} replace />
  return <Navigate to="/" replace />
}
