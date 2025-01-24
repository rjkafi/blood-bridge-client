import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 

import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';

const DonorHome = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    // console.log(user);

    const userRole = sessionStorage.getItem('userRole');
    if(userRole !== 'donar'){
        navigate('/dashboard')
    }

    const { data: donationRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const response = await axiosPublic.get('/donation-requests/recent');
            return response.data;
        },
    });

    const updateDonationStatus = async (id, status) => {
        try {
            const response = await axiosPublic.put(`/donation-requests/${id}`, { status });
            console.log(`Status updated to ${status}:`, response.data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDone = async (id) => {
        await updateDonationStatus(id, 'done');
        refetch(); // Refetch data after updating status
    };

    const handleCancel = async (id) => {
        await updateDonationStatus(id, 'canceled');
        refetch(); // Refetch data after updating status
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/edit-donation-request/${id}`);
    };

    const deleteDonationRequest = async (id) => {
        try {
            await axiosPublic.delete(`/donation-requests/${id}`);
            refetch(); // Refetch data after deleting request
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDonationRequest(id).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your donation request has been deleted.',
                        'success'
                    );
                });
            }
        });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">Welcome, {user.displayName} !</h2>
            

            {donationRequests.length > 0 ? (
                <div>
                    <h3 className="text-xl mb-4">Your Recent Donation Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
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
                                                    <button className="btn btn-success" onClick={() => handleDone(request._id)}>
                                                        Done
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleCancel(request._id)}>
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            <button className="btn btn-primary" onClick={() => handleEdit(request._id)}>
                                                Edit
                                            </button>
                                            <button className="btn bg-red-400 text-white" onClick={() => handleDelete(request._id)}>
                                                Delete
                                            </button>
                                            <button className="btn btn-info text-white" onClick={() => navigate(`/donation-request-details/${request._id}`)}>
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
