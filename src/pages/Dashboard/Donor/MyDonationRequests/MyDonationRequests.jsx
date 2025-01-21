import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyDonationRequests = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [donationRequests, setDonationRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonationRequests = async () => {
            if (!user) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await axiosPublic.get('/donation-requests',
                    
                        {email: user.email},
                       { filter: statusFilter},
                   
               );
                setDonationRequests(response.data.data || []);
            } catch (error) {
                console.error("Error fetching donation requests:", error);
                setError("Failed to load donation requests.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonationRequests();
    }, [user, statusFilter, axiosPublic]);

    const filterByStatus = (status) => {
        setStatusFilter(status);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/edit-donation-request/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/donation-requests/${id}`);
                    setDonationRequests(prevRequests => prevRequests.filter(request => request._id !== id));
                    Swal.fire("Deleted!", "Your request has been deleted.", "success");
                } catch (error) {
                    console.error('Error deleting request:', error);
                    Swal.fire("Error!", "There was an issue deleting your request.", "error");
                }
            }
        });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mb-4">My Donation Requests</h2>

            <div className="mb-4">
                <select
                    value={statusFilter}
                    onChange={(e) => filterByStatus(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {donationRequests.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Donation Date</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.bloodGroup}</td>
                                    <td>{request.status}</td>
                                    <td className="flex space-x-2">
                                        <button className="btn btn-primary" onClick={() => handleEdit(request._id)}>Edit</button>
                                        <button className="btn bg-red-400 text-white" onClick={() => handleDelete(request._id)}>Delete</button>
                                        <button className="btn btn-info text-white" onClick={() => navigate(`/donation-request-details/${request._id}`)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No donation requests found.</p>
            )}
        </div>
    );
};

export default MyDonationRequests;
