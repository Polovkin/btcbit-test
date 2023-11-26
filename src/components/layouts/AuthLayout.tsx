import React, {FC} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";


type Props = {
    isAuthenticated: boolean;
}

const AuthLayout: FC<Props> = ({isAuthenticated}) => {
    const location = useLocation()

    if (['/auth/login', '/auth/register'].includes(location.pathname) && isAuthenticated) {
        return <Navigate to="/"/>
    }

    return (
        <div className="d-flex flex-column flex-root">
            <header>Auth header</header>
            <div className="d-flex flex-row flex-column-fluid page">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout
