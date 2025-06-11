// ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAuthData } from './stores/AuthStore';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuthData();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
