import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Logo from '../components/Logo'; 
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
`;

const MissionStatement = styled.h2`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 22px;
    font-weight: 500;
    padding: 20px;
    text-align: center;
    margin: 20px;
`;

const HomePage = () => {

    const navigate = useNavigate();

    const navigateToAuth = () => {
        navigate('/auth');
    };

    return (
        <Container>
            <Logo />
            <MissionStatement>Our Mission: Connect 1,000,000 Dogs</MissionStatement>
            <Button text="Join Us" onClick={navigateToAuth} />
        </Container>
    );
};

export default HomePage;
