// Client-side Component (DonorHome.js)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaStreetView } from 'react-icons/fa';

const DonorHome = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosSecure.get('/donation-requests/recent', { email: user.email });
                if (response.data) {
                    setDonationRequests(response.data);
                    console.log(response.data);
                } else {
                    console.error('No data received:', response);
                }
            } catch (error) {
                console.error('Error fetching donation requests:', error);
            }
        };
        
        fetchDonationRequests();
    }, [user.email]);
    

    const handleDone = async (id) => {
        try {
            await axiosSecure.put(`/donation-requests/${id}`, { status: 'done' });
            setDonationRequests(donationRequests.map(req => req.id === id ? { ...req, status: 'done' } : req));
        } catch (error) {
            console.error('Error marking as done:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axiosSecure.put(`/donation-requests/${id}`, { status: 'canceled' });
            setDonationRequests(donationRequests.map(req => req.id === id ? { ...req, status: 'canceled' } : req));
        } catch (error) {
            console.error('Error marking as canceled:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/edit-donation-request/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this donation request?')) {
            try {
                await axiosSecure.delete(`/donation-requests/${id}`);
                setDonationRequests(donationRequests.filter(req => req.id !== id));
            } catch (error) {
                console.error('Error deleting donation request:', error);
            }
        }
    };

    const handleView = (id) => {
        navigate(`/dashboard/donation-request/${id}`);
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Welcome, {user.displayName}!</h2>

            {donationRequests.length > 0 ? (
                <div>
                    <h3 className="text-xl mb-4">Your Recent Donation Requests</h3>
                    <div className="overflow-x-auto"> {/* This enables horizontal scrolling */}
                        <table className="table-auto w-full border-collapse">
                            <thead className='items-center justify-center border'>
                                <tr >
                                   
                                    <th>Recipient Name</th>
                                    <th>Location</th>
                                    <th>Donation Date</th>
                                    <th>Blood Group</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' items-center justify-center border'>
                                {donationRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.recipientName}</td>
                                        <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                        <td>{request.donationDate}</td>
                                        <td>{request.bloodGroup}</td>
                                        <td>{request.status}</td>
                                        <td className="flex space-x-2">
                                            {request.status === 'inprogress' && (
                                                <>
                                                    <button className="btn btn-success" onClick={() => handleDone(request.id)}>Done</button>
                                                    <button className="btn btn-danger" onClick={() => handleCancel(request.id)}>Cancel</button>
                                                </>
                                            )}
                                            <button className="btn btn-primary " onClick={() => handleEdit(request.id)}>Edit</button>
                                            <button className="btn bg-red-400 text-white" onClick={() => handleDelete(request.id)}>Delete</button>
                                            <button className="btn btn-info text-white" onClick={() => handleView(request.id)}>View </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => navigate('/dashboard/my-donation-requests')}>View All Donation Requests</button>
                </div>
            ) : (
                <p className="mt-4">You have not made any donation requests yet.</p>
            )}
        </div>
    );
};

export default DonorHome;
