import {  useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const VolunteerBloodRequests = () => {
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const { data: users = { data: [], total: 0 }, isLoading, error, refetch } = useQuery({
        queryKey: ['users', currentPage, filter],
        queryFn: async () => {
            const response = await axiosSecure.get(`/donation-requests?page=${currentPage}&filter=${filter}`);
            return {
                data: response.data.data,
                total: response.data.total,
            };
        },
        keepPreviousData: true, // Keep previous data while fetching new data
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/blood-requests/${id}`, { status });
            // Refresh requests after update
            refetch();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const { data: requests, total } = users;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">All Blood Donation Requests</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Recipient Name</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td className="border border-gray-300 p-2">{request._id}</td>
                            <td className="border border-gray-300 p-2">{request.recipientName}</td>
                            <td className="border border-gray-300 p-2">{request.status}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 mr-2"
                                    onClick={() => handleStatusUpdate(request._id, 'Approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2"
                                    onClick={() => handleStatusUpdate(request._id, 'Rejected')}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 mr-2"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage}</span>
                <button
                    className="px-4 py-2 bg-gray-300"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={requests.length < 10} // Assuming pageSize is 10
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VolunteerBloodRequests;
