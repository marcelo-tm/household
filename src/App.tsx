import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import SignUpPage from "./pages/SignUp";
import NotFoundPage from "./pages/NotFound";
import SignedOffLayout from "./layouts/SignedOffLayout";
import SignedInLayout from "./layouts/SignedInLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<SignedOffLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route element={<SignedInLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
