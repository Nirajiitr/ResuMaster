import React, { Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { QueryClient, QueryClientProvider } from "react-query";

import Spinner from "./components/Spinner";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<DefaultPage />} />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <DefaultPage />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
