import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput'; // Replace with your TextInput component path
import Button from '../components/Button'; // Assuming Button is in the same directory
import SelectInput2 from '../components/SelectInput2'; // Add a Select component for dropdowns

// Styled components
const CardContainer = styled.div`
    border-radius: 8px;
    min-width: 300px;
    margin: 20px;
    font-family: 'Rethink Sans', sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const EditProfileCard = ({ userDetails, onSave }) => {
    const [editedUserDetails, setEditedUserDetails] = useState({ ...userDetails });

    const [politicalParties, setPoliticalParties] = useState([]);

    useEffect(() => {
        // Convert the parties to the expected format
        const partyOptions = ["Democratic", "Republican", "Libertarian", "Green", "Constitution", "Independent",  "Other"]
            .map(party => ({ value: party, label: party }));
        setPoliticalParties(partyOptions);
    }, []);

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
            <SelectInput2
                placeholder="Select Party"
                options={politicalParties}
                value={editedUserDetails.party}
                onChange={(e) => handleInputChange('party', e.target.value)}
            />
            <Button text="Save Changes" onClick={() => onSave(editedUserDetails)} />
        </CardContainer>
    );
};

export default EditProfileCard;
