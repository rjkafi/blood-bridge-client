import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaHospitalUser, FaMapMarkerAlt, FaHospital, FaCalendarAlt, FaTint, FaInfoCircle, FaCommentDots } from "react-icons/fa";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [donationRequest, setDonationRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDonationRequest = async () => {
      try {
        const response = await axiosPublic.get(`/donation-requests/${id}`);
        setDonationRequest(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching donation request:", error);
        setError("Failed to load donation request details.");
        setIsLoading(false);
      }
    };

    fetchDonationRequest();
  }, [id, axiosPublic]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-20 mx-auto">
      <h2 className="text-2xl font-semibold text-center mt-8">Donation Request Details</h2>
      {donationRequest && (
        <div className="space-y-2 mt-12">
          <div className="flex space-x-2 items-center">
            <FaHospitalUser className="text-xl" />
            <p className="text-2xl font-bold uppercase"><strong className="text-xl font-semibold">Recipient Name:</strong> {donationRequest.recipientName}</p>
          </div>
          
          <div className="flex space-x-2 items-center">
            <FaMapMarkerAlt className="text-xl" />
            <p><strong>Location:</strong> {donationRequest.recipientDistrict}, {donationRequest.recipientUpazila}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <FaHospital className="text-xl" />
            <p><strong>Hospital Name:</strong> {donationRequest.hospitalName}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <FaCalendarAlt className="text-xl" />
            <p><strong>Donation Date:</strong> {donationRequest.donationDate}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <FaTint className="text-xl" />
            <p><strong>Blood Group:</strong> {donationRequest.bloodGroup}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <FaInfoCircle className="text-xl" />
            <p><strong>Status:</strong> {donationRequest.status}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <FaCommentDots className="text-xl" />
            <p><strong>Message:</strong> {donationRequest.requestMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
