import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlantList from '../components/PlantList'; 
import NominationList from '../components/NominationList';
import ProgressTracker from '../components/ProgressTracker';
import UserCard from '../components/UserCard';
import BottomNavBar from '../components/BottomNavBar';

// Styled components for the Dashboard
const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    height: calc(100vh - 80px);
`;

const Dashboard = ({ userId }) => {
    // States and effects for fetching user data and checking if they uploaded a plant
    const [hasUploadedPlant, setHasUploadedPlant] = useState(true);

    useEffect(() => {
        // Fetch user data and update state
        // Placeholder for fetch logic
        // Update setHasUploadedPlant based on fetched data
    }, [userId]);

    return (
        <DashboardContainer>
            {/* <UserCard userId={userId} /> */}
            <ProgressTracker />
            <PlantList />
            {/* <NominationList hasUploadedPlant={hasUploadedPlant} /> */}
            <BottomNavBar />
        </DashboardContainer>
    );
};

export default Dashboard;
