import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
    text-align: center;
    margin: 20px;
    font-family: 'Rethink Sans', sans-serif;
`;

const ProgressBarContainer = styled.div`
    background-color: #e0e0e0;
    border-radius: 8px;
    margin: 20px;
`;

const ProgressBar = styled.div`
    background-color: #10cc5f;
    height: 20px;
    border-radius: 8px;
    transition: width 1s ease-in-out;
`;

const ProgressText = styled.p`
    font-size: 16px;
`;

const ProgressTracker = () => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        // Fetch global progress data and update the state
        // Placeholder for fetch logic

    setProgress(32.345);
    }, []);

    return (
        <Container>
            <h3>Progress Towards 1 Million Trees</h3>
            <ProgressBarContainer>
                <ProgressBar style={{ width: `${progress}%` }}></ProgressBar>
            </ProgressBarContainer>
            <ProgressText>{(progress/100)*1000000} trees planted so far</ProgressText>
        </Container>
    );
};

export default ProgressTracker;
