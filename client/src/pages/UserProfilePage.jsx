import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCard from '../components/UserCard'; // Assuming UserCard is in the same directory
import Button from '../components/Button'; // Replace with your button component
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

// Styled components for the profile page
const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: calc(100vh - 80px);
    justify-content: center;
`;

const ProfileActions = styled.div`
    margin-top: 20px;
`;

const UserProfilePage = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from the backend and update state
        // Example: fetchUserData(userId).then(data => setUserDetails(data));
    }, [userId]);

    const handleEditProfile = () => {
        // Handle edit profile action
        navigate('/edit');

    };

    return (
        <ProfilePageContainer>
            <UserCard userId={userId} />
            <ProfileActions>
                <Button text="Edit Profile" onClick={handleEditProfile} />
                {/* Add more actions as needed */}
            </ProfileActions>
            <BottomNavBar />
        </ProfilePageContainer>
    );
};

export default UserProfilePage;
