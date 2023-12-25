import React from 'react';
import styled from 'styled-components';

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 300px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Text = styled.p`
  font-family: 'Rethink Sans', sans-serif;
  text-align: center;
  font-size: 19px;
`;

const OnboardingSlide = ({ image, text }) => {
  return (
    <Slide>
      <Image src={image} alt="Onboarding" />
      <Text>{text}</Text>
    </Slide>
  );
};

export default OnboardingSlide;
