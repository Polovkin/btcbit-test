import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../components/views/Home";
import AppLayout from "../components/layouts/AppLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../components/views/Login";
import Register from "../components/views/Register";
import PageNotFound from "../components/views/PageNotFound";
import {AuthAtom} from "../store";
import {useAtom} from "jotai";
import Otp from "../components/views/Otp";

const AppRouter: FC = () => {
    const [{isAuthenticated}] = useAtom(AuthAtom)

    return (
        <Routes>
            <Route path="/" element={<AppLayout isAuthenticated={isAuthenticated}/>}>
                <Route index path="/" element={<Home/>}/>
            </Route>
            <Route path="/auth" element={<AuthLayout isAuthenticated={isAuthenticated}/>}>
                <Route index path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="otp" element={<Otp/>}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRouter;
