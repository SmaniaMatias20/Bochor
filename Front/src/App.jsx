
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRouteLogout from './protected/ProtectedRouteLogout.js';
import ProtectedRouteLogin from "./protected/ProtectedRouteLogin.js";
import { Home } from "./components/custom/pages/Home.jsx"

import Navbar from "./components/custom/Navbar.jsx"



const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {/* Renderiza el Navbar solo si no estamos en la página de Login */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
};
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
