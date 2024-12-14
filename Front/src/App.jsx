// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'; // Asegúrate de tener tu archivo de estilos CSS



const AppContent = () => {

  return (
    <div>
      hola
      {/* <Routes>
      </Routes> */}
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
