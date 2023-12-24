import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button'; // Assuming Button is a previously defined component
import Card from './Card'; // Import Card component
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../Firebase'; 

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

const GridView = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }

`;


const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3); // 3 days in your desired format
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPlants = async () => {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, 'Users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userPlantsIds = userDoc.data().uploadedPlants || [];
                const plantPromises = userPlantsIds.map(plantId => 
                    getDoc(doc(db, 'Plants', plantId))
                );
                const plantDocs = await Promise.all(plantPromises);
                const plantsData = plantDocs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlants(plantsData);
                console.log(plantsData);
            }
        };

        fetchUserPlants();
    }, []);

    const handleUpload = () => {
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
            <GridView>
            {plants.map((plant, index) => (
                <Card
                    key={plant.id}
                    title={plant.description}
                    description={`Plant Number: ${index + 1}`}
                    imageUrl={plant.imageURL}
                />
            ))}
            </GridView>
            <Button text="Upload Plant Picture" onClick={handleUpload} />
        </Container>
    );
};


export default PlantList;
