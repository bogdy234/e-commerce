import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Favorites from "@pages/Favorites";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Profile from "@pages/Profile";
import NavbarWrapper from "@components/NavbarWrapper";
import Cart from "@pages/Cart";
import RequireAuth from "@components/RequireAuth";
import Unauthorized from "@pages/Unauthorized";
import PersistLogin from "@components/PersistLogin";
import Checkout from "@pages/Checkout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PersistLogin />,
        children: [
            {
                path: "/",
                element: <NavbarWrapper />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/signin",
                        element: <SignIn />,
                    },
                    {
                        path: "/signup",
                        element: <SignUp />,
                    },
                    {
                        path: "/",
                        element: <RequireAuth />,
                        children: [
                            {
                                path: "favorites",
                                element: <Favorites />,
                            },
                            {
                                path: "profile",
                                element: <Profile />,
                            },
                            {
                                path: "cart",
                                element: <Cart />,
                            },
                            {
                                path: "checkout",
                                element: <Checkout />,
                            },
                        ],
                    },
                    {
                        path: "/unauthorized",
                        element: <Unauthorized />,
                    },
                ],
            },
        ],
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
