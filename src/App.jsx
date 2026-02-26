import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./assets/pages/Dashboard";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import ResumeBuilder from "./assets/pages/ResumeBuilder";
import TemplateSelection from "./assets/pages/TemplateSelection";
import Profile from "./assets/pages/Profile";
import Upgrade from "./assets/pages/Upgrade";
import ProtectedRoute from "./assets/components/ProtectedRoutes";
import { useAuth } from "./assets/context/AuthContext";
import Home from './assets/pages/Home';
import PaymentSuccess from './assets/pages/PaymentSuccess';

const AppRoutes = () => {
  const { user } = useAuth(); // ✅ valid here inside a component

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/resumebuilder"
        element={
          <ProtectedRoute user={user}>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/templates"
        element={
          <ProtectedRoute user={user}>
            <TemplateSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upgrade"
        element={
          <ProtectedRoute user={user}>
            <Upgrade />
          </ProtectedRoute>
        }
      />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
};

export default AppRoutes;
