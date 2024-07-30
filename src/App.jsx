import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts/Root/RootLayout";

import { Home } from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import { SignUp } from "./pages/SignUp/SignUp";
import Transactions from "./pages/Transactions/Transactions";
import DashBoard from "./pages/DashBoard/DashBoard";

import Content from "./components/Content/Content";
import { useState } from "react";

export default function App() {
  const [userDetails, setUserDetails] = useState(null);

  // Create routes based on user authentication state
  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={userDetails ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route
        path="signup"
        element={userDetails ? <Navigate to="/dashboard" /> : <SignUp />}
      />
      <Route
        path="login"
        element={userDetails ? <Navigate to="/dashboard" /> : <LogIn />}
      />
      <Route
        path="dashboard"
        element={userDetails ? <DashBoard /> : <Navigate to="/login" />}
      >
        <Route index element={<Content />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routes);

  const styles = {
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
  };

  return <RouterProvider router={router} />;
}
