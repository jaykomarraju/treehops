import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
`;

const Heading = styled.h1`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 26px;
    font-weight: 500;
    line-height: 40px;
`;


const NominationForm = () => {
    const [nomineeName, setNomineeName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNomineeChange = (event) => {
        setNomineeName(event.target.value);
    };

    const handleContactChange = (event) => {
        setContactInfo(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Form submission logic
    };

    const handleBack = () => {
        navigate('/nominations');
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <BackButton backRoute={handleBack}/>
            <Heading>Nominate a Plant Parent</Heading>
            <TextInput 
                placeholder="Nominee's Name" 
                value={nomineeName} 
                onChange={handleNomineeChange} 
            />
            <TextInput 
                placeholder="Phone Number" 
                value={contactInfo} 
                onChange={handleContactChange} 
            />
            {error && <div>{error}</div>}
            <Button text="Nominate" onClick={handleSubmit} />
        </StyledForm>
    );
};

export default NominationForm;
