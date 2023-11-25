import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />

    </Routes>
  );
}

export default App;
