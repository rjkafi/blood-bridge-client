import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaHospitalUser, FaRegCalendarAlt} from 'react-icons/fa';
import { MdAccessTime, MdBloodtype } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';



const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const [donationRequests, setDonationRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   const navigate= useNavigate();

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosPublic.get('/donation-requests');
                setDonationRequests(response.data.data);
            } catch (error) {
                setError('Failed to fetch donation requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchDonationRequests();
    }, [axiosPublic]);

    if (loading) {
        return <div className='flex text-center justify-center min-h-screen'>Loading...</div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className=' py-12 container mx-auto'>
            <h2 className='text-center text-2xl font-semibold'>Donation Requests</h2>
            {
                donationRequests.length > 0 ? <div className="donation-requests-container  mt-3 grid grid-cols-1 md:grid-cols-3 gap-5">

                    {donationRequests.map((request,idx )=> <div key={idx} className="card bg-base-100  border border-amber-500 shadow-lg">
                        <div className="card-body">

                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    {/* icon */}
                                    <div className=' border   base-content rounded-full p-4 text-xl' ><FaHospitalUser /></div>
                                    <div>
                                        <p className='text-gray-400'>Recipient</p>
                                        <h4 className='text-xl'>{request.recipientName}</h4>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-2 items-center'>
                                        {/* icon */}
                                        <div className=' border   base-content rounded-full p-4 text-xl' ><MdBloodtype /></div>
                                        <div>
                                            <p className='text-gray-400'>Blood Group</p>
                                            <h4 className='text-xl'>" {request.bloodGroup} "</h4>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    {/* icon */}
                                    <div className=' border  base-content rounded-full p-4 text-xl' ><FaRegCalendarAlt /></div>
                                    <div>

                                        <p className='text-gray-400'>DonationDate</p>
                                        <h4 className='text-xl'>{request.donationDate}</h4>
                                    </div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    {/* icon */}
                                    <div className=' border  base-content rounded-full p-4 text-xl' ><MdAccessTime></MdAccessTime></div>
                                    <div>

                                    <p className='text-gray-400'>Donation Time</p>
                                    <h4 className='text-xl'>{request.donationTime}</h4>
                                    </div>
                                </div>

                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-info text-white"
                                    onClick={() => navigate(`/donation-request-details/${request._id}`)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    )}
                </div> :
                    <p className='text-center text-xl text-gray-200 mt-10'>No Request here</p>
             
            }
        
        </div>
    );
};

export default DonationRequests;
