import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlantList from '../components/PlantList'; 
import NominationList from '../components/NominationList';
import ProgressTracker from '../components/ProgressTracker';
import UserCard from '../components/UserCard';
import BottomNavBar from '../components/BottomNavBar';
import LogoutButton from '../components/LogoutButton';
import { db, auth } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';


// Styled components for the Dashboard
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    min-height: calc(100vh - 80px);
    margin-bottom: 150px;
`;

const NominationPage = () => {
    // States and effects for fetching user data and checking if they uploaded a plant
    const [hasUploadedPlant, setHasUploadedPlant] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // Check if user is authenticated
            if (auth.currentUser) {
                const userId = auth.currentUser.uid; // Get the user ID from auth
                const userRef = doc(db, "Users", userId);
                const userSnap = await getDoc(userRef);
        
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setHasUploadedPlant(userData.uploadedPlants && userData.uploadedPlants.length > 0);
                    console.log(hasUploadedPlant)
                } else {
                    console.log("No such user!");
                }
            } else {
                console.log("User not authenticated");
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <Container>
            <LogoutButton />
            {/* <UserCard userId={userId} /> */}
            {/* <ProgressTracker /> */}
            {/* <PlantList /> */}
            <NominationList hasUploadedPlant={hasUploadedPlant} />
            <BottomNavBar />
        </Container>
    );
};

export default NominationPage;
