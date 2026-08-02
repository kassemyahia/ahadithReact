import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { defaultAuthenticatedPath } from '../../utils/roles.js'
import Spinner from './Spinner.jsx'

export default function GuestRoute({ children }) {
  const { isAuthenticated, isInitializing, user } = useAuth()

  if (isInitializing) {
    return (
      <div className="grid min-h-64 place-items-center">
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) return <Navigate to={defaultAuthenticatedPath(user)} replace />

  return children || <Outlet />
}
