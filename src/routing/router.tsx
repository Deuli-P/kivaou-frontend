import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import CreateOrganization from "../pages/organization/Create/Create";
import OrganizationDetail from "../pages/organization/Detail/Detail";
import EventCreate from "../pages/organization/event/Create/Create";
import EventDetail from "../pages/organization/event/Detail";
import Profile from "../pages/Profile/Profile";
import DestinationCreate from "../pages/organization/destination/Create/Create";


import IsConnected from "../middlewares/IsConnected";
import IsMember from "../middlewares/IsMember";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
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
                            { path: "destination/create", element: <DestinationCreate /> },
                            {
                                path: "event", 
                                children: [
                                    { path: "create", element: <EventCreate /> },
                                    { path: ":eventId", element: <EventDetail /> }
                                ],
                            },
                        ]
                    }
                ]
            },
            {
                path: "auth",
                children: [
                    { path: "login", element: <Login /> }, 
                    { path: "register", element: <Register /> }
                ], 
            },
            { path: "*", element: <Navigate to='/' replace /> }
        ]
    }
]);