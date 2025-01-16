import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const DonorHome = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const {user}=useAuth();
    // const [user, setUser] = useState({ name: "Donor Name" }); // Get logged-in user info (you can fetch this from context or API)
    const navigate = useNavigate();

    // Simulate fetching donation requests for the logged-in donor
    useEffect(() => {
        // Replace with an API call to fetch the donor's recent donation requests
        const fetchDonationRequests = async () => {
            try {
                const response = await axios.get("/api/donation-requests"); // API endpoint
                const userRequests = response.data.filter(request => request.requesterId === user.id);
                setDonationRequests(userRequests.slice(0, 3)); // Show max 3 recent requests
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            }
        };

        fetchDonationRequests();
    }, [user.id]);

    // Handle the 'done' button click
    const handleDone = (id) => {
        // API call to update status to 'done'
        console.log("Donation marked as done:", id);
    };

    // Handle the 'cancel' button click
    const handleCancel = (id) => {
        // API call to update status to 'canceled'
        console.log("Donation marked as canceled:", id);
    };

    // Handle the 'edit' button click
    const handleEdit = (id) => {
        navigate(`/dashboard/edit-donation-request/${id}`);
    };

    // Handle the 'delete' button click
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this donation request?")) {
            // API call to delete the request
            console.log("Donation request deleted:", id);
        }
    };

    // Handle the 'view' button click
    const handleView = (id) => {
        navigate(`/dashboard/donation-request/${id}`);
    };

    return (
        <>
         <div>
            <h2 className="text-2xl mb-4">Welcome, {user.displayName}!</h2>

            {/* Recent Donation Requests */}
            {donationRequests.length > 0 ? (
                <div>
                    <h3 className="text-xl mb-4">Your Recent Donation Requests</h3>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Donation Date</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.recipientName}</td>
                                    <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.bloodGroup}</td>
                                    <td>{request.status}</td>
                                    <td className="flex space-x-2">
                                        {request.status === "inprogress" && (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleDone(request.id)}
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleCancel(request.id)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        <button className="btn btn-primary" onClick={() => handleEdit(request.id)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-warning" onClick={() => handleDelete(request.id)}>
                                            Delete
                                        </button>
                                        <button className="btn btn-info" onClick={() => handleView(request.id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* View all requests button */}
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white"
                        onClick={() => navigate("/dashboard/my-donation-requests")}
                    >
                        View All Donation Requests
                    </button>
                </div>
            ) : (
                <p className="mt-4">You have not made any donation requests yet.</p>
            )}
        </div>   
        </>
    );
};

export default DonorHome;