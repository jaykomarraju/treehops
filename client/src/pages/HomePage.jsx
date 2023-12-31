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
    // padding: 20px;
    text-align: center;
    // margin: 20px;
`;

const MissionStatement2Blue = styled.h2`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 18px;
    font-weight: 200;
    text-align: center;
    // margin: 20px;
    text-transform: uppercase;
    color: #0275d8;
`;

const MissionStatement2Red = styled.h2`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 18px;
    font-weight: 200;
    text-align: center;
    // margin: 20px;
    text-transform: uppercase;
    color: #d9534f;
    margin-left: 5px;
`;

const Flexer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const HomePage = () => {

    const navigate = useNavigate();

    const navigateToAuth = () => {
        navigate('/auth');
    };

    return (
        <Container>
            <Logo />
            <MissionStatement>Balancing Perspectives: Fair and Informed Debates on Todays's Ideas</MissionStatement>
            <Flexer><MissionStatement2Blue>CENSORSHIP </MissionStatement2Blue><MissionStatement2Red>RESISTANT</MissionStatement2Red></Flexer>
            <Button text="Join Us" onClick={navigateToAuth} />
        </Container>
    );
};

export default HomePage;
