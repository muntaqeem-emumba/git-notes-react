import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import GistDetail from './pages/GistDetail';
import ProtectedRoute from './ProtectedRoute';


function AppRoutes() {
  return (
    <Routes>
			<Route path="/" element={<Home />} />
			<Route path="/gist/:id" element={<GistDetail />} />
			<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
			{/* <Route path="/create-gist" element={<ProtectedRoute><CreateGist /></ProtectedRoute>}/> */}
    </Routes>
  );
}

export default AppRoutes;