import { Login } from "./components/custom/pages/Login.jsx";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRouteLogout from './protected/ProtectedRouteLogout.js';
import ProtectedRouteLogin from "./protected/ProtectedRouteLogin.js";
import { Home } from "./components/custom/pages/Home.jsx"
import { Statistics } from "./components/custom/pages/Statistics.jsx"
import Navbar from "./components/custom/Navbar.jsx"
import { PageTest } from "./components/custom/pages/PageTest.jsx";
import { PageUsers } from "./components/custom/pages/PageUsers.jsx";


const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {/* Renderiza el Navbar solo si no estamos en la página de Login */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Users" element={<PageUsers />} />
        <Route path="/Tests" element={<PageTest />} />
        <Route path="/Statics/:estado" element={<Statistics />} />
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
