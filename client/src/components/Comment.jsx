import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const Comment = ({ text, author }) => {
  return (
    <CommentContainer>
      <CommentText>{text}</CommentText>
      <CommentAuthor>{author}</CommentAuthor>
    </CommentContainer>
  );
};

export default Comment;
