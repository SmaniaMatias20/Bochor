import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/custom/navbar";
import './App.css';

const AppContent = () => {
  return (
    <div>
      <Navbar />

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
