import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';

// Styled components
const Container = styled.div`
    text-align: center;
    margin: 20px;
    // width: 100%;
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
        const fetchPlantCount = async () => {
            const q = query(collection(db, "Plants"));
            const querySnapshot = await getDocs(q);
            const totalPlants = querySnapshot.size;
            // const totalPlants = 100000;
            const progressPercentage = (totalPlants / 1000000) * 100;
            setProgress(progressPercentage);
        };

        fetchPlantCount();
    }, []);

    return (
        <Container>
            <h3>Progress Towards 1 Million Trees</h3>
            <ProgressBarContainer>
                <ProgressBar style={{ width: `${progress}%` }}></ProgressBar>
            </ProgressBarContainer>
            <ProgressText>{Math.round(progress * 10000)} trees planted so far</ProgressText>
        </Container>
    );
};

export default ProgressTracker;