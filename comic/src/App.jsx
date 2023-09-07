import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "./Store";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import config from "./config";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <h1>Not Found</h1> },
]);

function App() {
  const GOOGLE_CLIENT_ID =
    "677308379740-sc3riuokt0nakmt5vp69ref4euc2lquf.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <GlobalStyles />
          <Elements stripe={stripePromise}>
            <RouterProvider router={router}></RouterProvider>
          </Elements>
        </Provider>
        <Toaster position="top-center" reverseOrder={false} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
