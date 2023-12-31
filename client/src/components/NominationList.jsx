import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Firebase"; // Assuming this is the correct path
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const NominationItem = styled.div`
  border: 2px solid #111;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  font-family: "Rethink Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

const Status = styled.p`
  color: ${(props) => {
    switch (props.status) {
      case 'active':
        return '#f0ad4e'; // Bootstrap's warning color (orange)
      case 'accepted':
        return '#5cb85c'; // Bootstrap's success color (green)
      case 'planted':
        return '#0275d8'; // Bootstrap's info color (blue)
      default:
        return '#d9534f'; // Bootstrap's danger color (red)
    }
  }};
`;

const NoNominationsMessage = styled.p`
  font-family: "Rethink Sans", sans-serif;
`;

const UploadPrompt = styled.div`
  text-align: center;
  margin: 20px;
  font-family: "Rethink Sans", sans-serif;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const UploadPromptMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`;


const calculateTimeRemaining = (createdAt) => {
  const now = new Date();
  const expiryDate = new Date(
    createdAt.seconds * 1000 + 3 * 24 * 60 * 60 * 1000
  );
  const timeLeft = expiryDate - now;

  if (timeLeft <= 0) {
    return "Expired";
  }

  const days = Math.floor(timeLeft / (24 * 3600 * 1000));
  const hours = Math.floor((timeLeft % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((timeLeft % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const NominationList = ({ hasUploadedPlant }) => {
  const [nominations, setNominations] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserNominations = async () => {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userNominationsIds = userDoc.data().nominations || [];
        const nominationPromises = userNominationsIds.map((nominationId) =>
          getDoc(doc(db, "Nominations", nominationId))
        );
        const nominationDocs = await Promise.all(nominationPromises);
        const nominationsData = nominationDocs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNominations(nominationsData);
        console.log(nominationsData);
      }
    };

    fetchUserNominations();
  }, [hasUploadedPlant]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNominations((currentNominations) =>
        currentNominations.map((nomination) => ({
          ...nomination,
          timeRemaining: calculateTimeRemaining(nomination.createdAt),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nominations]);

  const handleNewNomination = () => {
    // Logic to handle new nomination
    navigate("/nominate");
  };

  if (!hasUploadedPlant) {
    return (
      <Container>
        <UploadPrompt>
          <UploadPromptMessage>
            You need to spark an idea to invite others!
          </UploadPromptMessage>
          <Button
            text="Spark an Idea"
            onClick={() => navigate("/upload")}
          />
        </UploadPrompt>
      </Container>
    );
  }

  const getStatusDisplay = (nomination) => {
    switch (nomination.status) {
      case "active":
        return `Time Remaining: ${calculateTimeRemaining(nomination.createdAt)}`;
      case "accepted":
        return "Accepted ✅";
      case "planted":
        return "Planted 🌱";
      default:
        return "Expired";
    }
  };

  return (
    <Container>
      <h3>Your Hoppers</h3>
      <Button text="Nominate Candidates" onClick={handleNewNomination} />
      {nominations.length > 0 ? (
        nominations.map((nomination, index) => (
          <NominationItem key={index}>
            <div>Name: {nomination.name}</div>
            <div>Phone: {nomination.phoneNumber}</div>
            {/* <Status uploaded={nomination.uploaded}>
              {nomination.uploaded
                ? `Uploaded 🌱`
                : `Time Remaining: ${nomination.timeRemaining}`}
            </Status> */}
            <Status status={nomination.status}>
              {getStatusDisplay(nomination)}
            </Status>
            {/* {nomination.timeRemaining === "Expired" && (
              <Button
                text="Nominate New Candidate"
                onClick={handleNewNomination}
              />
            )} */}
          </NominationItem>
        ))
      ) : (
        <NoNominationsMessage>
          No nominations yet.
          {/* <Button text="Nominate Candidates" onClick={handleNewNomination} /> */}
        </NoNominationsMessage>
      )}
    </Container>
  );
};

export default NominationList;
