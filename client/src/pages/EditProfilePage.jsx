import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import EditProfileCard from "../components/EditProfileCard"; // Replace with the actual path
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import LogoutButton from "../components/LogoutButton";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Styled components
const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 80px);
  justify-content: center;
`;

const EditProfilePage = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch user details from the backend and update state
    // Example: fetchUserData(userId).then(data => setUserDetails(data));
    const getUserDetails = async () => {
    //   const docRef = doc(db, "users", currentUser.uid);
      const docRef = doc(db, "Users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUserDetails();
  }, [userId]);

  const handleSaveChanges = async (editedDetails) => {
    if (currentUser) {
      const userRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userRef, editedDetails);
      setUserDetails(editedDetails);
      navigate("/profile");
    }
  };

  return (
    <ProfilePageContainer>
      <LogoutButton />
      {userDetails && (
        <EditProfileCard userDetails={userDetails} onSave={handleSaveChanges} />
      )}
      <BottomNavBar />
    </ProfilePageContainer>
  );
};

export default EditProfilePage;
