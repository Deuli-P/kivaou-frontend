import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ResgisterPage from "../pages/ResgisterPage";
import EventPage from "../pages/EventPage";


export const router = createBrowserRouter([ 
    {
        path:'/',
        element:<Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element : <LoginPage />
            },
            {
                path:'/register',
                element: <ResgisterPage />
            },
            {
                path:"/event/:id",
                element: <EventPage />
            }
        ]
    }
]);