// ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
