import React from 'react'
import styled from 'styled-components'

// The back button component should contain a back arrow that takes the user back to the previous page.

const StyledBackButton = styled.button`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 50px;
    font-weight: 500;
    line-height: 40px;
    padding-left: 15px;
    position: absolute;
    color: #111;
    top: 20px;
    left: 10px;
    background-color: #fff;
    border:none;
    cursor: pointer;
    `




const BackButton = ({backRoute}) => {
  return (
    <StyledBackButton onClick={backRoute}>←</StyledBackButton>
  )
}

export default BackButton