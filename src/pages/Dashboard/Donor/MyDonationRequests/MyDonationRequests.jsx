import { useEffect, useState } from "react";

const MyDonationRequests = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const requestsPerPage = 5; // You can adjust this number to change how many requests show per page

    // Simulate fetching donation requests for the logged-in donor
    useEffect(() => {
        // Replace with an API call to fetch the donor's donation requests
        const fetchDonationRequests = async () => {
            try {
                const response = await axios.get("/api/donation-requests"); 
                const userRequests = response.data.filter(request => request.requesterId === 1); 
                setDonationRequests(userRequests);
                setFilteredRequests(userRequests);
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            }
        };

        fetchDonationRequests();
    }, []);


     // Filter donation requests based on status
     const filterByStatus = (status) => {
        setStatusFilter(status);
        if (status === "") {
            setFilteredRequests(donationRequests);
        } else {
            const filtered = donationRequests.filter(request => request.status === status);
            setFilteredRequests(filtered);
        }
    };

    // Handle page change for pagination
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Calculate the current page's requests
    const currentRequests = filteredRequests.slice((page - 1) * requestsPerPage, page * requestsPerPage);


    return (
        <>
           <div>
            <h2 className="text-2xl mb-4">My Donation Requests</h2>

            {/* Filtering Section */}
            <div className="mb-4">
                <select
                    value={statusFilter}
                    onChange={(e) => filterByStatus(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Donation Requests Table */}
            <table className="table-auto w-full border-collapse mb-4">
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
                    {currentRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.recipientName}</td>
                            <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                            <td>{request.donationDate}</td>
                            <td>{request.bloodGroup}</td>
                            <td>{request.status}</td>
                            <td className="flex space-x-2">
                                {request.status === "inprogress" && (
                                    <>
                                        <button className="btn btn-success">Done</button>
                                        <button className="btn btn-danger">Cancel</button>
                                    </>
                                )}
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-warning">Delete</button>
                                <button className="btn btn-info">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {Math.ceil(filteredRequests.length / requestsPerPage)}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === Math.ceil(filteredRequests.length / requestsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>  
        </>
    );
};

export default MyDonationRequests;