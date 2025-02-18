import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';
import { FaUser } from 'react-icons/fa6';

const DonorHome = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: donationRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const response = await axiosPublic.get('/donation-requests/recent');
            return response.data;
        },
    });

    const handleEdit = (id) => {
        navigate(`/dashboard/edit-donation-request/${id}`);
    };

    const deleteDonationRequest = async (id) => {
        try {
            await axiosPublic.delete(`/donation-requests/${id}`);
            refetch(); 
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
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Profile Section */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL || <FaUser></FaUser>}
                        alt=""
                        className="w-20 h-20 rounded-full border-2 border-gray-300"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user.displayName}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <span className="text-green-600 text-sm font-semibold">Active</span>
                    </div>
                </div>
               {/* TODO:  Edit Profile Button */}
            </div>

            {/* Recent Donation Requests Table */}
            {donationRequests.length > 0 ? (
                <div>
                    <h3 className="text-xl font-semibold mb-3">Your Recent Donation Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border rounded-md">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-3">Recipient Name</th>
                                    <th className="p-3">Location</th>
                                    <th className="p-3">Donation Date</th>
                                    <th className="p-3">Blood Group</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donationRequests.map((request) => (
                                    <tr key={request._id} className="border-t">
                                        <td className="p-3">{request.recipientName}</td>
                                        <td className="p-3">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                        <td className="p-3">{request.donationDate}</td>
                                        <td className="p-3 font-semibold">{request.bloodGroup}</td>
                                        <td className={`p-3 font-medium ${request.status === 'done' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {request.status}
                                        </td>
                                        <td className="p-3 flex justify-center gap-2">
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
                </div>
            ) : (
                <p className="mt-4 text-gray-500">You have not made any donation requests yet.</p>
            )}
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => navigate('/dashboard/my-donation-requests')}>
                View All Donation Requests
            </button>
        </div>
    );
};

export default DonorHome;





