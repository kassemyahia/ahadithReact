import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Spinner from './Spinner.jsx'

export default function GuestRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <div className="grid min-h-64 place-items-center">
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) return <Navigate to="/" replace />

  return children || <Outlet />
}
