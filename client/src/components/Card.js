import React from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

// Define your styled components
const CardContainer = styled.div`
width: 42rem;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
width: 100%;
height: auto;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
`;

const CardBody = styled.div`
padding: 1rem;
`;

const CardDateText = styled.p`
color: #1F7B44;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 157%; /* 21.98px */
letter-spacing: 0.1px;
`;

const CardTitle = styled.h5`
font-family: Roboto;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 160%; /* 32px */
letter-spacing: 0.15px;
`;

const CardDescriptionText = styled.p`
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 24px */
letter-spacing: 0.15px;
color: #686868;
`;

function Card({ title, description, datetime, image }) {
    const parsedDate = parseISO(datetime);
    const formattedDate = format(parsedDate, 'd MMM yyyy');

    return (
        <div className="col-12 d-flex justify-content-center align-items-center mb-3">
            <CardContainer>
                <CardImage src={image} alt="Card" />
                <CardBody>
                    <CardDateText>{formattedDate}</CardDateText>
                    <CardTitle>{title}</CardTitle>
                    <CardDescriptionText>{description}</CardDescriptionText>
                </CardBody>
            </CardContainer>
        </div>
    );
}

export default Card;
