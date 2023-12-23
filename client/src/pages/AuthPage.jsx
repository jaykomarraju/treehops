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


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // true for login, false for signup

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Container>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <SwitchButton onClick={toggleAuthMode}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </SwitchButton>
        </Container>
    );
};

export default AuthPage;
