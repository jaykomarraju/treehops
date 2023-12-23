import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase"; // Assuming you have a Firebase config file
import styled from "styled-components";

// const StyledButton = styled.button`
//   padding: 10px 15px;
//   background-color: #f44336;
//   color: white;
//   position: absolute;
//     top: 20px;
//     right: 10px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   &:hover {
//     background-color: #d32f2f;
//   }
// `;

const StyledButton = styled.button`
  align-items: center;
  background-color: #f44336;
  position: absolute;
  top: 20px;
  right: 10px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: "Rethink Sans", sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  margin: 15px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

//   &:after {
//     background-color: #d1d1d1;
//     border-radius: 8px;
//     content: "";
//     display: block;
//     height: 48px;
//     left: 0;
//     width: 100%;
//     position: absolute;
//     top: -2px;
//     transform: translate(8px, 8px);
//     transition: transform 0.2s ease-out;
//     z-index: -1;
//   }

//   &:hover:after {
//     transform: translate(2px, 2px);
//   }

//   &:active {
//     background-color: #09eb68;
//     outline: 0;
//   }

  &:hover {
    outline: 0;
    // font-size: 17px;
    // transition: font-size .2s ease-out;
  }

  &:hover {
    background-color: #f22516;
  }

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth"); // or any other page you want to redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return <StyledButton onClick={handleLogout}>Logout</StyledButton>;
};

export default LogoutButton;
