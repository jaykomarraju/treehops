import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const CardContainer = styled.div`
    // border: 2px solid #111;
    border-radius: 8px;
    padding: 20px;
    margin: 20px;
    font-family: 'Rethink Sans', sans-serif;
    text-align: center;
`;

const UserInfo = styled.p`
    font-size: 16px;
    margin: 10px 0;
`;

const LoadingMessage = styled.p`
    font-family: 'Rethink Sans', sans-serif;
`;

const UserCard = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch user details based on userId and update the state
        // Placeholder for fetch logic

        setUserDetails({
            name: 'Jayanth',
            phone: '+1 201-555-0123',
            email: 'jay@gmail.com',
            plantCount: 0,
            nominatedBy: 'John Doe',
        });

    }, [userId]);

    if (!userDetails) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }

    return (
        <CardContainer>
            <h3>User Profile</h3>
            <UserInfo>Name: {userDetails.name}</UserInfo>
            <UserInfo>Phone: {userDetails.phone}</UserInfo>
            <UserInfo>Email: {userDetails.email}</UserInfo>
            <UserInfo>Plants Uploaded: {userDetails.plantCount}</UserInfo>
            <UserInfo>Hopped By: {userDetails.nominatedBy}</UserInfo>
        </CardContainer>
    );
};

export default UserCard;
