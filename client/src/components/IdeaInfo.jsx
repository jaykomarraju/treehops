import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  padding: 20px;
  // Add more styling as needed
  font-family: "Rethink Sans", sans-serif;
`;

const IdeaInfo = ({ title, description, additionalInfo }) => {
  return (
    <Info>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Render additional information if available */}
      {additionalInfo && <p>{additionalInfo}</p>}
    </Info>
  );
};

export default IdeaInfo;
