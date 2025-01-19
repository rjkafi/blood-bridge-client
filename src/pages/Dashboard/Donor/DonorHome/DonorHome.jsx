import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';


const DonorHome = () => {
    
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {user}=useAuth();

    // Fetch donation requests using Tanstack Query
    const { data: donationRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['donationRequests'], // Pass the user email to the query key
        queryFn: async () => {
            const response = await axiosPublic.get('/donation-requests/recent');
              console.log(response.data);  // Check the response here
              return response.data;  // Ensure you're getting the correct data from the response
        },
    });
    

    // Mutation hooks for handling the update and delete actions
    const updateDonationStatus =async ({ id, status }) => {
            const response = await axiosSecure.put(`/donation-requests/${id}`, { status });
            return response.data; 
            
        }
        
        

    const handleDone = (id) => {
        updateDonationStatus.mutate({ id, status: 'done' });
    };

    const handleCancel = (id) => {
        updateDonationStatus.mutate({ id, status: 'canceled' });
    };

    const handleEdit = (id) => {
        // Redirect to the edit page with the donation request ID
        navigate(`/dashboard/edit-donation-request/${id}`)
    };

    const deleteDonationRequest = async (id) => {
         await axiosSecure.delete(`/donation-requests/${id}`);
         refetch();
        }

  

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">Welcome,{user.displayName}!</h2>

            {donationRequests.length > 0 ? (
                <div>
                    <h3 className="text-xl mb-4">Your Recent Donation Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
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
                                    <tr key={request._id}>
                                        <td>{request.recipientName}</td>
                                        <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                        <td>{request.donationDate}</td>
                                        <td>{request.bloodGroup}</td>
                                        <td>{request.status}</td>
                                        <td className="flex space-x-2">
                                            {request.status === 'inprogress' && (
                                                <>
                                                    <button className="btn btn-success" onClick={() => handleDone(request.id)}>
                                                        Done
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleCancel(request.id)}>
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                           <button
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(request._id)} // 
                                        >
                                            Edit
                                        </button>
                                            <button className="btn bg-red-400 text-white" onClick={() => deleteDonationRequest(request._id)}>
                                                Delete
                                            </button>
                                            <button
                                            className="btn btn-info text-white"
                                            onClick={() => navigate(`/dashboard/donation-request-details/${request._id}`)}
                                        >
                                            View
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => navigate('/dashboard/my-donation-requests')}>
                        View All Donation Requests
                    </button>
                </div>
            ) : (
                <p className="mt-4">You have not made any donation requests yet.</p>
            )}
        </div>
    );
};

export default DonorHome;
