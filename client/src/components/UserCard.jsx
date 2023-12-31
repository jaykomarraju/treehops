import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../Firebase"; // Adjust path as needed
import { doc, getDoc,
  collection, query, where, getDocs
} from "firebase/firestore";


// Styled components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Rethink Sans', sans-serif;
  text-align: center;
`;

const UserInfo = styled.p`
  color: #333;
  font-size: 17px;
  margin: 5px 0;
  padding: 5px;
`;

const LoadingMessage = styled.p`
  color: #666;
  font-family: 'Rethink Sans', sans-serif;
`;

const UserCard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [hoppedByName, setHoppedByName] = useState('');


  useEffect(() => {
    if (userId) {
      const userRef = doc(db, "Users", userId);
      getDoc(userRef)
        .then(async (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails(userData);

            // If hoppedBy is available, find the user who invited them
            if (userData.hoppedBy) {
              const usersRef = collection(db, "Users");
              const querySnapshot = await getDocs(query(usersRef, where("phoneNumber", "==", userData.hoppedBy)));

              if (!querySnapshot.empty) {
                // Assuming there is only one user with this phone number
                const hoppedByUserData = querySnapshot.docs[0].data();
                setHoppedByName(hoppedByUserData.name);
              }
            }
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
  const plantCount = userDetails.ideasCreated
  ? userDetails.ideasCreated.length
  : 0;

  return (
    <CardContainer>
      <h3>User Profile</h3>
      <UserInfo>Name: {userDetails.name}</UserInfo>
      <UserInfo>Phone: {userDetails.phoneNumber}</UserInfo>
      <UserInfo>Email: {userDetails.email}</UserInfo>
      <UserInfo>Ideas Sparked: {plantCount}</UserInfo>
      <UserInfo>Party Affiliation: {userDetails.party}</UserInfo>
      {/* <UserInfo>Hopped By: {hoppedByName}</UserInfo> */}
    </CardContainer>
  );
};

export default UserCard;
