import React from 'react'
import PlantFeed from '../components/PlantFeed'
import BottomNavBar from '../components/BottomNavBar'
import styled from 'styled-components'
import LogoutButton from '../components/LogoutButton';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 80px);

    @media (max-width: 768px) {
      margin-top: 60px;
    }
`;

const FeedPage = () => {
  return (
    <Container>
        <LogoutButton   />
        <PlantFeed />
        <BottomNavBar />
    </Container>
  )
}

export default FeedPage