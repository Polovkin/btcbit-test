import React, {FC} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAtom} from "jotai";
import {AppAtom, AuthAtom} from "../../store";
import AppError from "../AppError";

type Props = {
    isAuthenticated: boolean;
}

const AuthLayout: FC<Props> = ({isAuthenticated}) => {
    const [{error}] = useAtom(AppAtom)
    const [{otpStage}] = useAtom(AuthAtom)
    const location = useLocation()
    const isAuthPage = ['/auth/login', '/auth/register', '/auth/otp'].includes(location.pathname)

    if (isAuthPage && isAuthenticated) {
        return <Navigate to="/"/>
    }

    if (location.pathname === '/auth/otp') {
        if (!otpStage) {
            return <Navigate to="/auth/login"/>
        }
    }

    return (
        <main className="container min-vh-100 d-flex justify-content-center align-items-center position-relative">
            <AppError error={error}/>
            <Outlet/>
        </main>
    )
}

export default AuthLayout
