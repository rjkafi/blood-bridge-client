import { useState } from "react";
import useAuth from "../../../hooks/useAuth";


const Profile = () => {
    const {user}=useAuth();
    const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  
  // Handle input changes for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    });
  };

  // Handle save button click
  const handleSave = () => {
    // Save the updated user data to the database (you can replace this with an actual API call)
    console.log('Updated User Data:', updatedUser);
    setIsEditing(false);
  };



    return (
        <>
          <div className="profile-container">
      <h2>User Profile</h2>
      <button onClick={() => setIsEditing(!isEditing)} disabled={isEditing}>Edit</button>
      
      <form className="profile-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            disabled
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input
            type="file"
            name="avatar"
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={updatedUser.district}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Upazila:</label>
          <input
            type="text"
            name="upazila"
            value={updatedUser.upazila}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={updatedUser.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <button type="button" onClick={handleSave}>Save</button>
        )}
      </form>
    </div>  
        </>
    );
};

export default Profile;