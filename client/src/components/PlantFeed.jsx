import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import IdeaCard from "./IdeaCard";
import IdeaInfo from "./IdeaInfo";

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

  useEffect(() => {
    const fetchIdeas = async () => {
      const ideasCollectionRef = collection(db, "Ideas");
      const ideasSnapshot = await getDocs(ideasCollectionRef);
      const ideasData = ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIdeas(ideasData);
    };

    fetchIdeas();
  }, []);

  return (
    <FeedContainer>
      <Heading>Ideas Feed</Heading>
      <Grid>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} title={idea.title} description={idea.description}>
          <IdeaInfo title={idea.title} description={idea.description} />
          {/* Optionally add more details */}
        </IdeaCard>
      ))}
      </Grid>
    </FeedContainer>
  );
};

export default PlantFeed;
