import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    align-items: center;
    background-color: #d69d66;

    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    color: #111;
    cursor: pointer;
    display: flex;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    height: 48px;
    justify-content: center;
    line-height: 24px;
    max-width: 100%;
    padding: 0 25px;
    position: relative;
    margin: 15px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:after {
        background-color: #111;
        border-radius: 8px;
        content: "";
        display: block;
        height: 48px;
        left: 0;
        width: 100%;
        position: absolute;
        top: -2px;
        transform: translate(8px, 8px);
        transition: transform .2s ease-out;
        z-index: -1;
    }

    &:hover:after {
        transform: translate(0, 0);
    }

    &:active {
        background-color: #c57e3b;
        outline: 0;
    }

    &:hover {
        outline: 0;
        // font-size: 17px;
        // transition: font-size .2s ease-out;
    }

    @media (min-width: 768px) {
        padding: 0 40px;
    }
`;




const Button = ({ text, onClick }) => {
  return (
    <StyledButton className="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
