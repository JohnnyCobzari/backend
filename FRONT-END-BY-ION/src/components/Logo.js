import React from "react";
import styled from "styled-components";

// Definim stilurile folosind styled-components
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '100%'};
   @media (max-width: 480px) {
    transform: translateX(25%) scale(0.8); /* Aplicăm translate și scale */
  }
`;

const LogoText = styled.p`
  font-family: 'Neuton', serif;
  font-weight: 300; /* Bold */
  color: rgba(107, 94, 73, 1);
  font-size: 36px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

const LogoImage = styled.img`
  margin: 20px 5px;
  width: auto;
  height: 32px;
`;

function Logo({ width }) {
    return (
      <LogoContainer width={width}>
        <LogoText>PawPaw</LogoText>
        <LogoImage src="/images/paw.png" alt="PawPaw Logo" />
      </LogoContainer>
    );
  }
  
  export default Logo;
