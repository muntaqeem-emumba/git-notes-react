import "./App.css";
import HeaderBar from "./components/HeaderBar";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./Routes";

function App() {
  return (
    <Router>
      <HeaderBar />
      <AppRoutes />
    </Router>
  );
}

export default App;
