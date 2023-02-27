import React, { useState, useEffect } from "react";
import profilePic from '../../assets/profilePic.jpg'
import EditIcon from '../../assets/pencil_icon.png'
import { editUserDetails } from "../users/api";


const UserBio = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [updatedUserDetails, updateDetails] = useState(props.currentUser);
  const handleEditClick = () => {
    setEditMode(true)
  };

  const handleSaveClick =(e) => { 
    editUserDetails(props.currentUser.id, updatedUserDetails)
    //  
    // Need to update the user details
    .then(() => {
      console.log("User profile updated successfully");
      setEditMode(false);
      props.updateCurrentUserFromDatabase(props.currentUser.id)
    })
    .catch((error) => {
      console.error("Error editing post:", error);
    });
  }

  const handleDetailsChange = (e) => {
    const fieldName = e.target.id
    updateDetails(existingValues => ({...existingValues, [fieldName]: e.target.value}));
  }

  return (
      <>
      {editMode ? ( 
        <div className="profile-details-wrapper">
        <div className="image-wrapper">
          <img className="profile-image" src={profilePic}/>
          <img className='pencil-icon' src={EditIcon} onClick={handleEditClick} width={50}/>
          </div>
          <div className="profile-details">
          <p>FirstName:</p><textarea id='firstName' value={updatedUserDetails.firstName} onChange={handleDetailsChange}/>          
          <p>LastName:</p><textarea id='lastName' value={updatedUserDetails.lastName} onChange={handleDetailsChange}/>
          <p>UserName:</p><textarea id='userName' value={updatedUserDetails.userName} onChange={handleDetailsChange}/>
          <p>Email:</p><textarea id='email' value={updatedUserDetails.email} onChange={handleDetailsChange}/>
          <p>Location:</p><textarea id='location' value={updatedUserDetails.location} onChange={handleDetailsChange}/>
          <button onClick={handleSaveClick}>Save</button>
          </div>
      </div>     
      ) : (
        <div className="profile-details-wrapper">
          <div className="image-wrapper">
        <img className="profile-image" src={profilePic}/>
        <img className='pencil-icon' src={EditIcon} onClick={handleEditClick} width={20}/>
        </div>
        <div className="profile-details">
        <h3>{props.currentUser.firstName} {props.currentUser.lastName}</h3>
        <p>Alias: {props.currentUser.userName}</p>
        <p>From: {props.currentUser.location}</p>
        </div>
      </div>
      )}
    </>
  )
}

export default UserBio