import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const MyDonationRequests = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const requestsPerPage = 5;
    const axiosSecure = useAxiosSecure();
    const {user}=useAuth()

    // Assuming donorEmail is part of the logged-in user info
    const donorEmail = user.email;

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosSecure.get("/donation-requests", {
                    params: {
                        page,
                        filter: statusFilter,
                        donorEmail, // Pass donor email to the API
                    }
                });
                setDonationRequests(response.data.data);
                setFilteredRequests(response.data.data);
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            }
        };

        fetchDonationRequests();
    }, [page, statusFilter, donorEmail]);

    // Filter donation requests based on status
    const filterByStatus = (status) => {
        setStatusFilter(status);
        setPage(1);  // Reset to the first page when the filter changes
    };

    // Handle page change for pagination
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Calculate the current page's requests
    const currentRequests = filteredRequests.slice((page - 1) * requestsPerPage, page * requestsPerPage);

    return (
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
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
       <th>Recipient Name</th>
        <th>Location</th>
        <th>Donation Date</th>
        <th>Blood Group</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentRequests.map((request,index)=>(
        <tr key={request._id}>
            <td>{index+1}</td>
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
          <button className="btn bg-red-400 text-white">Delete</button>
          <button className="btn btn-info text-white">View</button>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>


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
    );
};

export default MyDonationRequests;




