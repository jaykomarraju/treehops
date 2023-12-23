import React, { useState } from 'react';
import TextInput from './TextInput'; 
import Button from './Button';
import styled from 'styled-components';
import Logo from './Logo';

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

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSendOtp = () => {
        // Firebase logic to send OTP
        console.log("Sending OTP to", phoneNumber);
        setIsOtpSent(true);
    };

    const handleSignup = () => {
        // Firebase logic to verify OTP and create account
        console.log("Signing up with", username, email, otp);
    };

    return (
        <StyledForm>
            <Logo />
            <Heading>Sign Up</Heading>
            {!isOtpSent ? (
              <>
                <TextInput placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <TextInput placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <TextInput placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                <Button text="Send OTP" onClick={handleSendOtp} />
              </>
            ) : (
              <>
                <TextInput placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                <Button text="Sign Up" onClick={handleSignup} />
              </>
            )}
        </StyledForm>
    );
};

export default SignupForm;
