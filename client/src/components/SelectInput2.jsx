import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
    // align-items: center;
    background-color: #fff; // White background for dropdown
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    padding-left: 15px;
    color: #111;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    color: #111;
    height: 48px;
    // margin-right: 10px;
    // width: 75px;
    position: relative;
    outline: none; // No outline for focused state
    user-select: none;
    -webkit-user-select: none;

    &:focus {
        background-color: #e8f0fe; // Slight background change on focus
    }

`;

const SelectInput2 = ({ options, onChange, value, placeholder }) => {
    return (
      <StyledSelect
        className="select-input"
        value={value} 
        onChange={onChange}
        isSearchable={true}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
};

export default SelectInput2;
