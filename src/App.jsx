import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {UserContext} from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import HojePage from "./pages/HojePage";
import HabitosPage from "./pages/HabitosPage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route
            path="/hoje"
            element={user ? <HojePage /> : <Navigate to="/" />}
          />
          <Route
            path="/habitos"
            element={user ? <HabitosPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
