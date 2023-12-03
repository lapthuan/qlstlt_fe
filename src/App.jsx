import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import SignIn from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dangnhap" element={<SignIn />} />
      <Route path="/*" element={<Dashboard />} />

    </Routes>
  );
}

export default App;
