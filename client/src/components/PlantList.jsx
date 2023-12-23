import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button'; // Assuming Button is a previously defined component
import Card from './Card'; // Import Card component
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TimerContainer = styled.div`
    margin: 20px;
    font-size: 18px;
    font-family: 'Rethink Sans', sans-serif;
`;

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3); // 3 days in your desired format
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch plant data and update state
        // Placeholder for fetch logic

        // setPlants([
        //     {
        //         name: 'Arkansas Oak',
        //         imageUrl: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1629245918-51w2is3YV4L._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*',
        //     },
        // ]);
    }, []);

    // Placeholder function for upload button
    const handleUpload = () => {
        console.log('Upload Plant Picture');
        navigate('/upload');

    };

    if (plants.length === 0) {
        return (
            <Container>
                <TimerContainer>
                    Time left to upload: {timeLeft} days
                </TimerContainer>
                <Button text="Upload Plant Picture" onClick={handleUpload} />
            </Container>
        );
    }

    return (
        <Container>
            {plants.map((plant, index) => (
                <Card
                    key={index}
                    title={plant.name}
                    description={`Plant Number: ${index + 1}`}
                    imageUrl={plant.imageUrl}
                />
            ))}
        </Container>
    );
};

export default PlantList;
