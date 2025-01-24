import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin;
            } catch (err) {
                console.error('Failed to fetch admin status:', err);
                throw err;
            }
        },
    });

    if (error) {
        console.log("Query Error: ", error.response?.data || error.message);
    }

    return [isAdmin, isAdminLoading];
};

/*
const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin;
            } catch (err) {
                console.error('Failed to fetch admin status:', err);
                throw err;
            }
        },
    });

    if (error) {
        console.log("Query Error: ", error.response?.data || error.message);
    }

    return [isAdmin, isAdminLoading];
};
*/

export default useAdmin;
