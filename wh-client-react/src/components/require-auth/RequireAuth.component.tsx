import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';

const RequireAuth = (allowedRoles: any) => {
    const { authorization } = useSelector((store: AppStore) => store.app);
    const roles = allowedRoles['allowedRoles']
    const location = useLocation();

    return (
        roles.includes(authorization.role)
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;