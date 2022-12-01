import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from "../selectors/auth.selectors";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(getIsAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
};