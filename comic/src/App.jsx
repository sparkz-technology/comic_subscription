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
const stripePromise = loadStripe(
  "pk_test_51Nd9n5SGCEU7P6TIZ5bjqcl4OzWz5rt9ToV1RVFeEB8vdXBBCFB0grO7YgpSd5igNEUi3YiNH66kdvJ5x2vcLeqW00OLHo4Okn"
);

const router = createBrowserRouter([
  { path: "/", element: <Trial /> },
  { path: "/home", element: <Home /> },
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
