import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
`;

const NominationItem = styled.div`
    border: 2px solid #111;
    border-radius: 8px;
    margin: 10px;
    padding: 20px;
    font-family: 'Rethink Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
`;

const Status = styled.p`
    color: ${props => props.uploaded ? '#0e9c49' : '#ba2307'};
`;

const NoNominationsMessage = styled.p`
    font-family: 'Rethink Sans', sans-serif;
`;

const NominationList = ({ hasUploadedPlant }) => {
    const [nominations, setNominations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasUploadedPlant) {
            setNominations([
                // Sample data
                // {
                //     name: 'Santosh',
                //     phoneNumber: '123-456-7890',
                //     uploaded: true,
                //     timeRemaining: 3,
                // },
                // {
                //     name: 'Michael',
                //     phoneNumber: '098-765-4321',
                //     uploaded: false,
                //     timeRemaining: 2,
                // },
                // {
                //     name: 'Katie',
                //     phoneNumber: '111-111-1111',
                //     uploaded: false,
                //     timeRemaining: 0,
                // },
            ]);
        }
    }, [hasUploadedPlant]);

    const handleNewNomination = () => {
        // Logic to handle new nomination
        navigate('/nominate');
    };

    if (!hasUploadedPlant) {
        return null; // Or display a suitable placeholder if needed
    }

    return (
        <Container>
            <h3>Your Hoppers</h3>
            {nominations.length > 0 ? (
                nominations.map((nomination, index) => (
                    <NominationItem key={index}>
                        <div>Name: {nomination.name}</div>
                        <div>Phone: {nomination.phoneNumber}</div>
                        <Status uploaded={nomination.uploaded}>
                            {nomination.uploaded 
                             ? `Uploaded 🌱` 
                             : `Time Remaining: ${nomination.timeRemaining} days`}
                        </Status>
                        {nomination.timeRemaining === 0 && (
                            <Button text="Nominate New Candidate" onClick={handleNewNomination}/>
                        )}
                    </NominationItem>
                ))
            ) : (
                <NoNominationsMessage>No nominations yet.
                    <Button text="Nominate Candidates" onClick={handleNewNomination}/>
                </NoNominationsMessage>
            )}
        </Container>
    );
};

export default NominationList;
