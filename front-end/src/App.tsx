import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD:front-end/src/App.tsx
import EncryptPage from "./pages/EncryptPage";
import DecryptPage from "./pages/DecryptPage";
=======
import EncryptPage from "./pages/Encrypt/EncryptPage";
import DecryptPage from "./pages/Decrypt/DecryptPage";
>>>>>>> 417645424aef1aedd31584cd421a36ba290d99bd:src/App.tsx
import LogInPage from "./pages/Login/LogInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
