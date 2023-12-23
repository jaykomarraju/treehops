import React, { useState } from 'react';
import LoginForm from '../components/LoginForm'; 
import SignupForm from '../components/SignupForm';
import styled from 'styled-components';

const SwitchButton = styled.button`
    background-color: transparent;
    border: 0;
    color: #111;
    cursor: pointer;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
    margin: 15px;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
`;


const SignUp = () => {
   


    return (
        <Container>
            <SignupForm />
        </Container>
    );
};

export default SignUp;
