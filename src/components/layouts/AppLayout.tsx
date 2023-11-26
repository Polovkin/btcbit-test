import React, {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Button, Navbar} from "react-bootstrap";
import AuthHook from "../../hooks/auth.hook";
import HttpService from "../../services/Http.service";
import AppError from "../AppError";
import {useAtom} from "jotai/index";
import {AppAtom} from "../../store";

type Props = {
    isAuthenticated: boolean;
}

const AppLayout: FC<Props> = ({isAuthenticated}) => {
    const [{error}] = useAtom(AppAtom)
    const {logout} = AuthHook(HttpService)
    if (!isAuthenticated) return <Navigate to="/auth/login"/>
    return (
        <div>

            <Navbar className={'justify-content-between p-2 bg-dark'}>
                <Navbar.Brand className={'text-white'} href="/">Navbar</Navbar.Brand>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </Navbar>
            <AppError error={error}/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AppLayout
