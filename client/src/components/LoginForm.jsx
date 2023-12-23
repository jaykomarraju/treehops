import React, { useState } from 'react';
import TextInput from './TextInput'; 
import Button from './Button';
import styled from 'styled-components';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled.h1`
font-family: 'Rethink Sans', sans-serif;
    font-size: 26px;
    font-weight: 500;
    line-height: 40px;
`;

const LoginForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleSendOtp = () => {
        // Firebase logic to send OTP
        console.log("Sending OTP to", phoneNumber);
        setIsOtpSent(true);
    };

    const handleLogin = () => {
        // Firebase logic to verify OTP
        console.log("Logging in with OTP", otp);
        navigate('/dashboard');
    };

    return (
        <StyledForm>
            <Logo />
            <Heading>Login</Heading>
            {!isOtpSent ? (
              <>
                <TextInput placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                <Button text="Send OTP" onClick={handleSendOtp} />
              </>
            ) : (
              <>
                <TextInput placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                <Button text="Login" onClick={handleLogin} />
              </>
            )}
        </StyledForm>
    );
};

export default LoginForm;