import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { FaUser } from 'react-icons/fa6';

const DonorProfile = () => {
    const { user } = useAuth();
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/user/${user.email}`)
                .then((res) => {
                    setDonor(res.data);
                    console.log("Fetched Donor Data:", res.data);
                })
                .catch((err) => {
                    console.error("Error fetching donor data:", err);
                    setError("Failed to fetch donor profile.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    // Show loading state
    if (loading) return <p>Loading...</p>;

    // Show error if request fails
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    // Ensure donor data exists before rendering
    if (!donor) return <p>No donor found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
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

            <div className='px-5'>
                <h2 className='text-xl font-semibold my-4'>Info</h2>
                <div className='space-y-2'>
                    <p className='flex justify-between'>
                        <strong>Name:</strong>
                        <span>{donor.name}</span>
                    </p>
                    <p className='flex justify-between'>
                        <strong>Email:</strong>
                        <span>{donor.email}</span>
                    </p>
                    <p className='flex justify-between'>
                        <strong>Blood Group:</strong>
                        <span>{donor.bloodGroup}</span>
                    </p>
                    <p className='flex justify-between'>
                        <strong>Location:</strong>
                        <span>{donor.district}, {donor.upazila}</span>
                    </p>
                    <p className='flex justify-between'>
                        <strong>Status:</strong>
                        <span>{donor.status}</span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default DonorProfile;
