import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../Firebase"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";

// Styled components
const CardContainer = styled.div`
  // border: 2px solid #111;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  font-family: "Rethink Sans", sans-serif;
  text-align: center;
`;

const UserInfo = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const LoadingMessage = styled.p`
  font-family: "Rethink Sans", sans-serif;
`;

const UserCard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, "Users", userId);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }

    
  }, [userId]);

  if (!userDetails) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  // Count the number of plants uploaded by the user
  const plantCount = userDetails.uploadedPlants
  ? userDetails.uploadedPlants.length
  : 0;

  return (
    <CardContainer>
      <h3>User Profile</h3>
      <UserInfo>Name: {userDetails.name}</UserInfo>
      <UserInfo>Phone: {userDetails.phoneNumber}</UserInfo>
      <UserInfo>Email: {userDetails.email}</UserInfo>
      <UserInfo>Plants Uploaded: {plantCount}</UserInfo>
      <UserInfo>Hopped By: {userDetails.nominatedBy}</UserInfo>
    </CardContainer>
  );
};

export default UserCard;
