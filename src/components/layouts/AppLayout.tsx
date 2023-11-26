import React, {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";

type Props = {
    isAuthenticated: boolean;
}

const AppLayout:FC<Props> = ({isAuthenticated}) => {
    if (!isAuthenticated) return <Navigate to="/auth/login"/>
    return (
        <div>
            <header>App header</header>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AppLayout
