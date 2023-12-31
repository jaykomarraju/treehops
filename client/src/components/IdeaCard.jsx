import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border: 2px solid #111;
  border-radius: 8px;
  margin: 20px;
  overflow: hidden;
  font-family: "Rethink Sans", sans-serif;
  width: 300px;
  padding: 20px;
  // Add more styling as needed
`;

const IdeaCard = ({ title, description, onClick }) => {
  return (
    <Card onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Add more elements as necessary */}
    </Card>
  );
};

export default IdeaCard;
