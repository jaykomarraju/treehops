import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom"; // For getting URL parameters
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import IdeaCard from "./IdeaCard";
import CommentSection from "./CommentSection"; // New component for comments

const PageContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IdeaDetailPage = () => {
  const [idea, setIdea] = useState(null);
  const { ideaId } = useParams(); // Assuming the route parameter is 'ideaId'

  useEffect(() => {
    const fetchIdea = async () => {
      const ideaRef = doc(db, "Ideas", ideaId);
      const ideaDoc = await getDoc(ideaRef);

      if (ideaDoc.exists()) {
        setIdea({ id: ideaDoc.id, ...ideaDoc.data() });
      }
    };

    fetchIdea();
  }, [ideaId]);

  return (
    <PageContainer>
      {idea && (
        <>
          <IdeaCard
            title={idea.title}
            description={idea.description}
            creator={idea.creator} // Adjust this if you store the creator's name differently
          />
          <CommentSection ideaId={ideaId} />
        </>
      )}
    </PageContainer>
  );
};

export default IdeaDetailPage;
