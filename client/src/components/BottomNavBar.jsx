import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import plantIcon from '../assets/plant.png'; // Update the path as needed
import nominateIcon from '../assets/nominate.png'; // Update the path as needed
import profileIcon from '../assets/profile.png'; // Update the path as needed

// Styled components
const MenuWrapper = styled.div`
    position: fixed;
    bottom: 25px;
    display: flex;
    justify-content: center;
    background: #eee;
    width: fit-content;
    border-radius: 50px;
`;

const MenuItem = styled.div`
    background: #159a1f;
    opacity: 0.75;
    padding: 3px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.img`
    width: 30px;
`;

const BottomNavBar = () => {
    return (
        <MenuWrapper>
            <Link to="/dashboard">
                <MenuItem>
                    <Icon src={plantIcon} alt="Dashboard" />
                </MenuItem>
            </Link>
            <Link to="/nominations">
                <MenuItem>
                    <Icon src={nominateIcon} alt="Nominations" />
                </MenuItem>
            </Link>
            <Link to="/profile">
                <MenuItem>
                    <Icon src={profileIcon} alt="Profile" />
                </MenuItem>
            </Link>
        </MenuWrapper>
    );
};

export default BottomNavBar;
