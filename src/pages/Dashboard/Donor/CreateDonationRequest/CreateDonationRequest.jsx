import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import districts from '../../../../json/districts.json';
import upazilas from '../../../../json/upazilas.json';

const CreateDonationRequest = () => {
    // State for form fields
    const [requesterName, setRequesterName] = useState("");
    const [requesterEmail, setRequesterEmail] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientDistrict, setRecipientDistrict] = useState('');
    const [recipientUpazila, setRecipientUpazila] = useState('');
    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [donationDate, setDonationDate] = useState("");
    const [donationTime, setDonationTime] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [status] = useState("pending");
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching logged-in user data for requesterName and requesterEmail
        const fetchUserData = async () => {
            try {
                const response = await axiosPublic.get("/users");
                setRequesterName(response.data.name);
                setRequesterEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [axiosPublic]);
    useEffect(() => {
        if (recipientDistrict) {
            // Filter Upazilas based on selected recipientDistrict
            const filtered = upazilas.filter((recipientUpazila) => recipientUpazila.district_id === districts.find(d => d.name === recipientDistrict)?.id);
            setFilteredUpazilas(filtered);
            setRecipientUpazila(''); // Reset recipientUpazila selection
        } else {
            setFilteredUpazilas([]);
        }
    }, [recipientDistrict]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const donationRequest = {
            requesterName,
            requesterEmail,
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            address,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            status,
            userEmail: user.email
        };

        try {
            const response = await axiosPublic.post("/donation-requests", donationRequest);
            console.log("Donation request created successfully:", response.data);
            if (response.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Donation request created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/my-donation-requests");
            }
        } catch (error) {
            console.error("Error creating donation request:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4 font-semibold text-center">Create Donation Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="requesterName" className="block">Requester Name</label>
                    <input
                        type="text"
                        id="requesterName"
                        value={requesterName}
                        readOnly
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="requesterEmail" className="block">Requester Email</label>
                    <input
                        type="email"
                        id="requesterEmail"
                        value={requesterEmail}
                        readOnly
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="recipientName" className="block">Recipient Name</label>
                    <input
                        type="text"
                        id="recipientName"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="recipientDistrict" className="block">Recipient District</label>
                    <select
                        className="input input-bordered mt-4"
                        value={recipientDistrict}
                        onChange={(e) => setRecipientDistrict(e.target.value)}
                    >
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="recipientUpazila" className="block">Recipient Upazila</label>
                    <select
                        id="recipientUpazila"
                        value={recipientUpazila}
                        onChange={(e) => setRecipientUpazila(e.target.value)}
                        disabled={!recipientDistrict}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="hospitalName" className="block">Hospital Name</label>
                    <input
                        type="text"
                        id="hospitalName"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block">Full Address Line</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="bloodGroup" className="block">Blood Group</label>
                    <select
                        id="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
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
                        value={donationDate}
                        onChange={(e) => setDonationDate(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="donationTime" className="block">Donation Time</label>
                    <input
                        type="time"
                        id="donationTime"
                        value={donationTime}
                        onChange={(e) => setDonationTime(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="requestMessage" className="block">Request Message</label>
                    <textarea
                        id="requestMessage"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className="p-2 border rounded w-full"
                        rows="4"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded"
                >
                    Request Donation
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
