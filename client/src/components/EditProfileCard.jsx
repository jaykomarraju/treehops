import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput'; // Replace with your TextInput component path
import Button from '../components/Button'; // Assuming Button is in the same directory

// Styled components
const CardContainer = styled.div`
    border-radius: 8px;
    // padding: 20px;
    min-width: 300px;
    margin: 20px;
    font-family: 'Rethink Sans', sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    // background-color: pink;
`;

const EditProfileCard = ({ userDetails, onSave }) => {
    const [editedUserDetails, setEditedUserDetails] = useState({ ...userDetails });

    const handleInputChange = (field, value) => {
        setEditedUserDetails({ ...editedUserDetails, [field]: value });
    };

    return (
        <CardContainer>
            <h3>Edit Profile</h3>
            <TextInput
                label="Name"
                value={editedUserDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Name"
            />
            <TextInput
                label="Email"
                value={editedUserDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
            />
            <Button text="Save Changes" onClick={() => onSave(editedUserDetails)} />
        </CardContainer>
    );
};

export default EditProfileCard;
