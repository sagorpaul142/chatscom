import PrivateRoute from "@/routing/private-route.jsx";
import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <PrivateRoute>
            <Outlet/>
        </PrivateRoute>
    );
};

export default AuthLayout;