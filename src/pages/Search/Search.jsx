import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import districts from '../../json/districts.json';
import upazilas from '../../json/upazilas.json'


const Search = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);
  const[district,setDistrict]=useState();
  const[upazila,setUpazila]=useState();
  const axiosPublic = useAxiosPublic();


  const handleSearch = async () => {
    try {
      const response = await axiosPublic.get('/users', {
        params: { bloodGroup, district, upazila },
      });
      setDonors(response.data.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  return (
    <div className="py-32">
      <div className="max-w-screen-md mx-auto">
        <h3 className="text-center font-semibold text-3xl py-4">Search Donors</h3>
        <div className="border rounded-md px-2 py-3 items-center justify-evenly md:flex gap-2">
          {/* Blood Group Select Dropdown */}
          <select 
            className="input input-bordered" 
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
            className="input input-bordered" 
            value={district} 
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Upazila Select Dropdown */}
          <select 
            className="input input-bordered" 
            value={upazila} 
            onChange={(e) => setUpazila(e.target.value)}
          >
            <option value="">Select Upazila</option>
            {upazilas.map(upazila => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>

          <button 
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Display Donors */}
        <div className="mt-8">
          {donors.length > 0 ? (
            donors.map(donor => (
              <div key={donor._id} className="donor-item">
                <h3 className='text-2xl'>Name: <span className='text-xl text-slate-700'> {donor.name}</span> </h3>
                <h3 className='text-2xl'>Email: <span className='text-xl text-slate-700'>{donor.email}</span></h3>
                <p className='text-xl'>Blood Group: <span className='text-lg text-slate-700'>{donor.bloodGroup}</span></p>
                <p className='text-xl'>Location: <span className='text-lg text-slate-700'>{donor.district} , {donor.upazila}</span></p>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-400">No donors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
