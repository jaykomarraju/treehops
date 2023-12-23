import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    align-items: center;
    background-color: #fff; // Changed to white for input field
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    color: #111;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    height: 48px;
    margin: 10px;
    margin-right: 0;
    margin-left: 0;
    line-height: 24px;
    width: 100%;
    padding: 15px;
    position: relative;
    outline: none; // No outline for focused state
    user-select: none;
    -webkit-user-select: none;

    &:focus {
        background-color: #e8f0fe; // Slight background change on focus
    }

    @media (min-width: 768px) {
        padding: 22px;
    }
`;

const TextInput = ({ placeholder, onChange, value }) => {
    return (
      <StyledInput
        className="text-input"
        type="text"
        placeholder={placeholder}
        value={value} 
        onChange={onChange}
      />
    );
  };
  

export default TextInput;
