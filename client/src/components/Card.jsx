import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    background-color: #fff;
    border: 2px solid #111;
    border-radius: 8px;
    margin: 20px;
    overflow: hidden;
    width: 300px;
`;

const CardImage = styled.img`
    width: 100%;
    height: auto;
`;

const CardContent = styled.div`
    padding: 20px;
`;

const CardTitle = styled.h3`
    color: #111;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 18px;
    margin: 0 0 10px 0;
`;

const CardDescription = styled.p`
    color: #666;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    margin: 0;
`;

const Card = ({ title, description, imageUrl }) => {
    return (
        <CardContainer>
            {imageUrl && <CardImage src={imageUrl} alt={title} />}
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </CardContainer>
    );
};

export default Card;
