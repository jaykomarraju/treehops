import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    align-items: center;
    background-color: #fff;
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    color: #111;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    margin: 10px;
    margin-right: 0;
    margin-left: 0;
    line-height: 24px;
    width: 100%;
    padding: 15px;
    position: relative;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    resize: vertical; // Allows resizing vertically
    min-height: 100px; // Minimum height to accommodate paragraphs

    &:focus {
        background-color: #e8f0fe;
    }

    @media (min-width: 768px) {
        padding: 22px;
    }
`;

const LongTextInput = ({ placeholder, onChange, value }) => {
    return (
        <StyledTextArea
            className="long-text-input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default LongTextInput;
