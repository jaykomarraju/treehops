import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border: 2px solid #111;
  border-radius: 8px;
  font-family: "Rethink Sans", sans-serif;
  width: 300px;
  padding: 20px;
  margin: 20px;
`;

const Title = styled.h3`
    color: #111;
    font-size: 18px;
    margin: 0 0 10px 0;
`;

const Desc = styled.p`
    color: #000;
    font-size: 16px;
    margin: 0;
`;

const User = styled.p`
    color: #666;
    margin-bottom: 0;
`;

const Time = styled.p`
    color: #666;
    margin-bottom: 0;
`;

const Flexer = styled.div`
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
`;


const IdeaCard = ({ title, description, creator, onClick }) => {
    return (
      <Card onClick={onClick}>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
        {/* <Flexer> */}
        <User>{creator}</User>
        {/* <Time>{timestamp}</Time> */}
        {/* </Flexer> */}
        {/* Add more elements as necessary */}
      </Card>
    );
  };
  

export default IdeaCard;
