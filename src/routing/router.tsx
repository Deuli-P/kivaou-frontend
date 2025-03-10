import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateOrganization from "../pages/organization/create";
import OrganizationDetail from "../pages/organization/detail";
import EventCreate from "../pages/organization/event/create";
import EventList from "../pages/organization/event/list";
import EventDetail from "../pages/organization/event/detail";


import IsConnected from "../middlewares/IsConnected";
import IsMember from "../middlewares/IsMember";
import Profile from "../pages/profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: "auth",
                children: [
                    { path: "login", element: <Login /> }, 
                    { path: "register", element: <Register /> }
                ], 
            },
            {
                path: "",
                element: <IsConnected />,
                children: [
                    { path: "", element: <Home /> },
                    { path: "orga/create", element: <CreateOrganization /> },
                    { path: 'profile', element: <Profile />},
                    { 
                        path: "orga",
                        element: <IsMember />,
                        children: [
                            { path: ":id", element: <OrganizationDetail /> },
                            {
                                path: "event", 
                                children: [
                                    { path: "create", element: <EventCreate /> },
                                    { path: ":id", element: <EventDetail /> },
                                    { path: "", element: <EventList /> }
                                ],
                            },
                        ]
                    }
                ]
            },
            { path: "*", element: <Navigate to='/' replace /> }
        ]
    }
]);