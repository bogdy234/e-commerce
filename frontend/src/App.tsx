import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Navbar from "@components/Navbar";
import Favorites from "@pages/Favorites";

const router = createBrowserRouter([
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
        path: "/favorites",
        element: <Favorites />,
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
