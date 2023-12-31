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

const Heading = styled.h3`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 28px;
    margin: 20px;
    margin-bottom: 40px;
    text-align: center;
    color: #111;
`;



const PlantList = () => {
    const [ideas, setIdeas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdeas = async () => {
            const ideasCollectionRef = collection(db, 'Ideas');
            const ideasSnapshot = await getDocs(ideasCollectionRef);
            const ideasData = ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setIdeas(ideasData);
        };

        fetchIdeas();
    }, []);

    const handleSparkIdea = () => {
        navigate('/upload');
    };

    return (
        <Container>
            <Heading>My Ideas</Heading>
            {ideas.length === 0 && <Button text="Spark an Idea" onClick={handleSparkIdea} />}
            <GridView>
                {ideas.map((idea, index) => (
                    <Card
                        key={idea.id}
                        title={idea.title}
                        description={idea.description}
                        // Remove imageUrl if not relevant
                    />
                ))}
            </GridView>
            <Button text="Spark an Idea" onClick={handleSparkIdea} />
        </Container>
    );
};

export default PlantList;
