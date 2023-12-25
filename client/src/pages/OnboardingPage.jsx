import React, { useState } from 'react';
import styled from 'styled-components';
import OnboardingSlide from '../components/OnboardingSlide';
import Button from '../components/Button'; // Assuming Button is a component you have already
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/logoImage.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';


const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const slides = [
  { image: image1, text: 'Welcome to Tree Hops! Join our mission to greenify the world, one plant at a time.' },
  { image: image2, text: 'Our goal? Share a million plant pictures to raise environmental awareness!' },
  { image: image3, text: 'Snap a plant, share it, earn points! Each plant picture equals 10 points.' },
  { image: image4, text: 'Nominate friends and earn more! Get 15 points for each friend who joins and posts.' },
  { image: image5, text: 'Climb the leaderboard with every plant and nomination. Be a top eco-warrior!' },
  { image: image6, text: 'Each plant shared contributes to a greener planet. Your small steps make a big difference!' },
  // ... add more slides here
];

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide + 1 < slides.length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to dashboard after the last slide
      navigate('/dashboard');
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <OnboardingContainer>
      <OnboardingSlide 
        image={slides[currentSlide].image} 
        text={slides[currentSlide].text} 
      />
      {currentSlide > 0 && <Button text="Previous" onClick={prevSlide} />}
      <Button text={currentSlide + 1 < slides.length ? "Next" : "Finish"} onClick={nextSlide} />
    </OnboardingContainer>
  );
};

export default OnboardingPage;
