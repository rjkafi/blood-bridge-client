import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading}=useContext(AuthContext);
    const [isAdmin, isAdminLoading]=useAdmin();

    if(loading || isAdminLoading){
        return <div className="py-12 mx-auto">
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/' state={{form:location.pathname}} replace></Navigate>
};

export default AdminRoute;