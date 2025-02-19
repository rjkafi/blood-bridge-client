import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsersLine } from "react-icons/fa6";
import { TiThListOutline } from "react-icons/ti";
import { RiRefund2Line } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const userRole = sessionStorage.getItem('userRole');

    if(userRole !== 'admin'){
        Navigate('/dashboard');
    }

    const { data: stats = {}, isLoading, isError } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <p>Loading stats...</p>;
    }

    if (isError) {
        return <p>Failed to load stats. Please try again later.</p>;
    }

    // Sample data for chart (can be dynamic based on stats)
    const chartData = [
        { name: 'January', donationRequests: stats.donationRequests },
        { name: 'February', donationRequests: stats.donationRequests + 50 },  // Example increment
        { name: 'March', donationRequests: stats.donationRequests + 100 },
        { name: 'April', donationRequests: stats.donationRequests + 150 },
        { name: 'May', donationRequests: stats.donationRequests + 200 },
    ];

    return (
        <div>
            <h2 className="text-3xl uppercase">
                <span>Hi, Welcome </span>
                {user.displayName ? user.displayName : ''}
            </h2>
            <div className="py-20">
                <div className="gap-3 grid grid-cols-2">
                    <div className="stat bg-gradient-to-r from-teal-400 to-blue-500 rounded-md">
                        <div className="stat-figure ">
                            <FaUsersLine className="text-3xl" />
                        </div>
                        <div className="stat-title text-slate-700">Total Users</div>
                        <div className="stat-value">{stats.users}</div>
                    </div>

                    <div className="stat bg-gradient-to-b from-amber-200 to-teal-500 rounded-md">
                        <div className="stat-figure ">
                            <TiThListOutline className=" text-3xl" />
                        </div>
                        <div className="stat-title text-slate-600">Donation Requests</div>
                        <div className="stat-value">{stats.donationRequests}</div>
                    </div>

                    <div className="stat bg-gradient-to-t from-indigo-300 to-emerald-300 rounded-md">
                        <div className="stat-figure ">
                            <RiRefund2Line className=" text-3xl"/>
                        </div>
                        <div className="stat-title">Total Fundings</div>
                        <div className="stat-value">{stats.fundings}</div>
                    </div>
                </div>

                {/* Recharts Line Chart for Donation Requests Overview */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold">Donation Requests Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="donationRequests" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
