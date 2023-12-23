import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../Firebase"; // Assuming you have a Firebase config file
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  position: absolute;
    top: 20px;
    right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #d32f2f;
  }
`;

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/auth'); // or any other page you want to redirect after logout
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <StyledButton onClick={handleLogout}>
            Logout
        </StyledButton>
    );
};

export default LogoutButton;
