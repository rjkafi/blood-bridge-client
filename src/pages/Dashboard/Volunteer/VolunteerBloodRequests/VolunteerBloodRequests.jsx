

const VolunteerBloodRequests = () => {
    const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axiosSecure.get('/blood-requests');
      setRequests(res.data);
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    await axiosSecure.patch(`/blood-requests/${id}`, { status });
    // Refresh requests after update
    const res = await axiosSecure.get('/blood-requests');
    setRequests(res.data);
  };

  return (
    <div>
      <h2>All Blood Donation Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.donor}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleStatusUpdate(request.id, 'Approved')}>Approve</button>
                <button onClick={() => handleStatusUpdate(request.id, 'Rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerBloodRequests;