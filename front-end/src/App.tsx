import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EncryptPage from "./pages/Encrypt/EncryptPage";
import DecryptPage from "./pages/Decrypt/DecryptPage";
import LogInPage from "./pages/Login/LogInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import KeyPage from "./pages/Key/KeyPage";
import { AppContextProvider } from "./auth-provider";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/encrypt" element={<EncryptPage />} />
          <Route path="/decrypt" element={<DecryptPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/key" element={<KeyPage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
