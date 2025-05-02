import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const EditDonationRequest = () => {
    const { id } = useParams(); 
    const [donationRequest, setDonationRequest] = useState({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        address: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
    });
    const [districts, setDistricts] = useState([]); 
    const [upazilas, setUpazilas] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate(); 

    // Fetch the donation request data based on the ID
    useEffect(() => {
        const fetchDonationRequest = async () => {
            try {
                const response = await axiosPublic.get(`/donation-requests/${id}`);
                setDonationRequest(response.data);  
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching donation request:", error);
                setIsLoading(false);
            }
        };

        // Mock data for districts and upazilas 
        setDistricts(["Dhaka", "Chittagong", "Khulna"]); 
        setUpazilas(["Uttara", "Mirpur", "Bashundhara"]); 
        
        fetchDonationRequest();
    }, [id, axiosPublic]);

    const handleChange = (e) => {
        setDonationRequest({
            ...donationRequest,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axiosPublic.put(`/donation-requests/${id}`, donationRequest);
            Swal.fire({
                title: "Updated!",
                text: "Your donation request has been updated.",
                icon: "success",
            });
            navigate("/dashboard/my-donation-requests");  
        } catch (error) {
            console.error("Error updating request:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue updating your request.",
                icon: "error",
            });
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Edit Donation Request</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="recipientName" className="block">Recipient Name</label>
                    <input
                        type="text"
                        id="recipientName"
                        name="recipientName"
                        value={donationRequest.recipientName}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="recipientDistrict" className="block">Recipient District</label>
                    <select
                        id="recipientDistrict"
                        name="recipientDistrict"
                        value={donationRequest.recipientDistrict} 
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="recipientUpazila" className="block">Recipient Upazila</label>
                    <select
                        id="recipientUpazila"
                        name="recipientUpazila"
                        value={donationRequest.recipientUpazila}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila) => (
                            <option key={upazila} value={upazila}>
                                {upazila}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="hospitalName" className="block">Hospital Name</label>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={donationRequest.hospitalName}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block">Full Address Line</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={donationRequest.address}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="bloodGroup" className="block">Blood Group</label>
                    <select
                        id="bloodGroup"
                        name="bloodGroup"
                        value={donationRequest.bloodGroup}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="donationDate" className="block">Donation Date</label>
                    <input
                        type="date"
                        id="donationDate"
                        name="donationDate"
                        value={donationRequest.donationDate}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="donationTime" className="block">Donation Time</label>
                    <input
                        type="time"
                        id="donationTime"
                        name="donationTime"
                        value={donationRequest.donationTime}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="requestMessage" className="block">Request Message</label>
                    <textarea
                        id="requestMessage"
                        name="requestMessage"
                        value={donationRequest.requestMessage}  
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        rows="4"
                    ></textarea>
                </div>

                <button type="submit" className="btn bg-blue-400 text-white text-xl font-semibold">Update  Request</button>
            </form>
        </div>
    );
};

export default EditDonationRequest;
