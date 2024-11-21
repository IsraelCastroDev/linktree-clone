import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import AuthLayout from "@/layouts/AuthLayout";
import { Toaster } from "@/components/ui/sonner";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
