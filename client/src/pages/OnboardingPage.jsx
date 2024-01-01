import React, { useState } from 'react';
import styled from 'styled-components';
import OnboardingSlide from '../components/OnboardingSlide';
import Button from '../components/Button'; // Assuming Button is a component you have already
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/ideas2024.png';
import image2 from '../assets/debate.png';
import image3 from '../assets/balance.png';
import image4 from '../assets/spark.png';
import image5 from '../assets/election.png';
import image6 from '../assets/thinkers.png';


const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const slides = [
  { 
    image: image1, 
    text: 'Welcome to ideas2024.org - A platform where your ideas inspire change and spark debate.' 
  },
  { 
    image: image2, 
    text: 'Explore diverse perspectives. Every idea can be debated from "for" and "against" viewpoints.' 
  },
  { 
    image: image3, 
    text: 'Contribute to balanced discussions. Share your thoughts on either side of the debate.' 
  },
  { 
    image: image4, 
    text: 'Spark your own idea or join existing debates. Engage in meaningful discussions and expand your understanding.' 
  },
  { 
    image: image5, 
    text: 'Election Year Focus: Participate in discussions on political topics, influencing and learning from the community.' 
  },
  { 
    image: image6, 
    text: 'Join a community of thinkers. Collaborate, debate, and grow in a platform built for open and democratic dialogue.' 
  },
  // ... add more slides if necessary
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
