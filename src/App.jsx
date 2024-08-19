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
import NotFound from "./pages/NotFound/NotFound";

import Content from "./components/Content/Content";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebaseSDK/config";

import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from "@mui/material";
import { keyframes } from "@emotion/react";

export default function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails(null);
          console.log("User data Not Found, Please sign-up");
        }
      } else {
        setUserDetails(null);
        console.log("User is not logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

  const progressBarAnimation = keyframes`
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
`;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e)",
          backgroundSize: "400% 400%",
          animation: `${gradientAnimation} 15s ease infinite`,
          color: "#333",
          textAlign: "center",
          padding: 2,
        }}
      >
        <CircularProgress size={80} thickness={6} sx={{ color: "#ff6f61" }} />
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            animation: "fadeIn 3s ease-in-out infinite",
          }}
        >
          We’re getting things ready...
        </Typography>
        <Box sx={{ width: "80%", position: "relative" }}>
          <LinearProgress
            sx={{
              height: "10px",
              borderRadius: "5px",
              overflow: "hidden",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ff6f61",
                animation: `${progressBarAnimation} 3s ease infinite`,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              top: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ff6f61",
              fontWeight: "bold",
            }}
          >
            Loading, please wait...
          </Typography>
        </Box>
      </Box>
    );
  }

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
      <Route path="*" element={<NotFound />} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
