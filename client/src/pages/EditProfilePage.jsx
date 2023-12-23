import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditProfileCard from '../components/EditProfileCard'; // Replace with the actual path
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import LogoutButton from '../components/LogoutButton';

// Styled components
const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: calc(100vh - 80px);
    justify-content: center;
`;

const EditProfilePage = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from the backend and update state
        // Example: fetchUserData(userId).then(data => setUserDetails(data));
        setUserDetails({
            name: 'Jayanth',
            phone: '+1 201-555-0123',
            email: 'jay@gmail.com', 
            plantCount: 2,
        });
    }, [userId]);

    const handleSaveChanges = (editedDetails) => {
        // Update user details in the backend
        // Example: updateUserDetails(userId, editedDetails).then(() => ...)
        setUserDetails(editedDetails);

        // Navigate back to the profile page
        navigate('/profile');
    };

    return (
        <ProfilePageContainer>
            <LogoutButton />    
            {userDetails && (
                <EditProfileCard
                    userDetails={userDetails}
                    onSave={handleSaveChanges}
                />
            )}
            <BottomNavBar />
        </ProfilePageContainer>
    );
};

export default EditProfilePage;
