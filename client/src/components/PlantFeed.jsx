import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs, getDoc, doc } from "firebase/firestore"; // Ensure correct import of `doc`
// import { db } from "../Firebase";
import { db } from "../Firebase";
import IdeaCard from "./IdeaCard";
import IdeaInfo from "./IdeaInfo";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-bottom: 150px;
`;

const Heading = styled.h3`
  font-family: "Rethink Sans", sans-serif;
  font-size: 28px;
  margin: 20px;
  margin-bottom: 40px;
  text-align: center;
  color: #111;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PlantFeed = () => {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchIdeas = async () => {
      const ideasCollectionRef = collection(db, "Ideas");
      const ideasSnapshot = await getDocs(ideasCollectionRef);

      const ideasDataPromises = ideasSnapshot.docs.map(async (docSnapshot) => {
        // Renamed variable to 'docSnapshot'
        const ideaData = docSnapshot.data();
        const userRef = doc(db, "Users", ideaData.userId); // `doc` function is used correctly here
        const userDoc = await getDoc(userRef);

        return {
          id: docSnapshot.id, // Use 'docSnapshot' here
          title: ideaData.title,
          description: ideaData.description,
          creator: userDoc.exists() ? userDoc.data().name : "Unknown",
          timestamp: ideaData.timestamp.toDate().toLocaleString(),
        };
      });

      const ideasData = await Promise.all(ideasDataPromises);
      setIdeas(ideasData);
    };

    fetchIdeas();
  }, []);

  const handleIdeaClick = (ideaId) => {
    navigate(`/idea/${ideaId}`); // Navigate to the IdeaDetailPage
  };

  return (
    <FeedContainer>
      <Heading>Ideas Feed</Heading>
      <Grid>
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            title={idea.title}
            description={idea.description}
            creator={idea.creator}
            onClick={() => handleIdeaClick(idea.id)}
          />
        ))}
      </Grid>
    </FeedContainer>
  );
};

export default PlantFeed;
