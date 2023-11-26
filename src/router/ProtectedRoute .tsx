import React, {FC} from "react";
import {Navigate} from "react-router-dom";

type Props = {
    isAuthorized?: boolean;
    children: React.ReactNode;
};



const ProtectedRoute:FC<Props> = ({ isAuthorized,children }) => {
    console.log(isAuthorized);
    return isAuthorized ?  <Navigate to="/"/> : <Navigate to="/auth/login"/>;
}

export default ProtectedRoute;
