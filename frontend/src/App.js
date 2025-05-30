import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import NavBar from "./components/navBar";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
