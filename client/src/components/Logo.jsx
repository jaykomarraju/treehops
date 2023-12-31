import React from 'react'
import styled from 'styled-components'
import logoImage from '../assets/myinu.png'

// The logo component should contain a image and the text "Tree Hop" next to it in one line.

const StyledLogo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `

const StyledImage = styled.img`
    width: 50px;
    height: 50px;
    `

const StyledText = styled.div`
    font-family: 'Rethink Sans', sans-serif;
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    padding-left: 15px;
    `


const Logo = () => {
  return (
    <StyledLogo>
      <StyledImage src={logoImage} />
      <StyledText>Myinu.club</StyledText>
    </StyledLogo>
  )
}

export default Logo