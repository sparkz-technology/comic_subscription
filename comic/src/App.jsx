import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import store from "./Store";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Trial from "./pages/Trial";
import Home from "./pages/Home";
import config from "./config";
import Loader from "./ui/Loader";
const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  { path: "/", element: <Trial /> },
  { path: "/home", element: <Home /> },
  { path: "/test", element: <Loader /> },
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
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <Elements stripe={stripePromise}>
          <RouterProvider router={router}></RouterProvider>
        </Elements>
      </Provider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
