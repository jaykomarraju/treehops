import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  //   background-color: #f8f8f8;
  border: 1.5px solid #111;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Rethink Sans", sans-serif;
`;

const CommentText = styled.p`
  color: #333;
  margin: 5px 0;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: #555;
`;

const Flexer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Comment = ({ text, author, timestamp }) => {
  return (
    <CommentContainer>
      <CommentText>{text}</CommentText>
      <Flexer>
        <CommentAuthor>{author}</CommentAuthor>
        <CommentText>{timestamp}</CommentText>
      </Flexer>
    </CommentContainer>
  );
};

export default Comment;
