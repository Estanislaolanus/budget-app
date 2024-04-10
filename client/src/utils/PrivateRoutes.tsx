import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth'


export default function PrivateRoutes() {
    const authContext = useAuth();
    const location = useLocation();
    return (
        authContext?.auth ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}
