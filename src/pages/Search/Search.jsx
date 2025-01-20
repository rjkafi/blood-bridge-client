import React, { useState } from 'react';
import districts from '/public/districts.json'; 
import upazilas from '/public/upazilas.json'; 
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Search = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);
  const axiosPublic=useAxiosPublic();

  const handleSearch = async () => {
    try {
      const response = await axiosPublic.get(`/users`, {bloodGroup, district, upazila });
      setDonors(response.data.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
     
    }
  };
  
  

  return (
    <div className="py-32">
      <div className="max-w-screen-md mx-auto">
        
        {/* Blood Group Select Dropdown */}
        <select 
          className="input input-bordered mt-4" 
          value={bloodGroup} 
          onChange={(e) => setBloodGroup(e.target.value)}
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
        
        {/* District Select Dropdown */}
        <select 
          className="input input-bordered mt-4" 
          value={district} 
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
        {/* Upzila Select Dropdown */}
        <select 
          className="input input-bordered mt-4" 
          value={upazila} 
          onChange={(e) => setUpazila(e.target.value)}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((upazila) => (
            <option key={upazila.id} value={upazila.name}>
              {upazila.name}
            </option>
          ))}
        </select>
        
        <button 
          className="btn btn-primary mt-4"
          onClick={handleSearch}
        >
          Search
        </button>

        {/* Display Donors */}
        <div className="mt-8">
          {donors.length > 0 ? (
            donors.map((donor) => (
              <div key={donor._id} className="donor-item">
                <h3>{donor.name}</h3>
                <p>{donor.bloodGroup} | {donor.district} | {donor.upazila}</p>
              </div>
            ))
          ) : (
            <p className='text-center text-xl text-gray-400'>No donors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
