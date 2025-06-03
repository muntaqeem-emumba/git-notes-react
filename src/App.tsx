import "./App.css";
import HeaderBar from "./components/HeaderBar";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./Routes";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <HeaderBar />
          <AppRoutes />
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
