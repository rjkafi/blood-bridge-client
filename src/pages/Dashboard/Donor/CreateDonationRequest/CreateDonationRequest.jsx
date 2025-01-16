import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


const CreateDonationRequest = () => {
          // State for form fields
    const [requesterName, setRequesterName] = useState(""); 
    const [requesterEmail, setRequesterEmail] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientDistrict, setRecipientDistrict] = useState("");
    const [recipientUpazila, setRecipientUpazila] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [donationDate, setDonationDate] = useState("");
    const [donationTime, setDonationTime] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [status] = useState("pending"); 
    const axiosPublic=useAxiosPublic();

    const [districts, setDistricts] = useState([]); 
    const [upazilas, setUpazilas] = useState([]);

 
    useEffect(() => {
        // Assuming you're fetching district and upazila data from an API or have predefined options
        setDistricts(["Dhaka", "Chittagong", "Khulna"]);
        setUpazilas(["Gulshan", "Bashundhara", "Mirpur"]);
        
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the backend
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
            status, // Default value is "pending"
        };

        try {
            // API call to create the donation request
            const response = await axiosPublic.post("/donation-requests", donationRequest);
            console.log("Donation request created successfully:", response.data);
            // Redirect user or show success message after creating the request
        } catch (error) {
            console.error("Error creating donation request:", error);
        }
    };



    return (
        <>
            <div>
            <h2 className="text-2xl mb-4">Create Donation Request</h2>
            
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
                        id="recipientDistrict"
                        value={recipientDistrict}
                        onChange={(e) => setRecipientDistrict(e.target.value)}
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
                        value={recipientUpazila}
                        onChange={(e) => setRecipientUpazila(e.target.value)}
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
       
        </>
    );
};

export default CreateDonationRequest;