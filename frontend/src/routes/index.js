import { useRoutes } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';

import IndexLayout from "../containers/IndexLayout";

import LoginPage from "../pages/login";
import BookingsPage from "../pages/bookings";

export default function ApplicationRouter() {
    const routes = useRoutes([
        {
            element: <IndexLayout />,
            children: [
                {
                    path: "/",
                    element: <LoginPage />
                },
                {
                    path: '/bookings',
                    element: <ProtectedRoute>
                        <BookingsPage />
                    </ProtectedRoute>
                }
            ]
        }
    ]);
    return routes;
}