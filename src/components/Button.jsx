import React from 'react';
import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from 'styled-components';

const Link = ({isActive, children, ...props}) => {
  return (
    <ReactRouterDomLink {...props}>
      {children}
    </ReactRouterDomLink>
  );
}

const StyledLink = styled(Link)`
  background-color: #E31837;
  background-color: #E31837;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 25px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;

  :hover {
    cursor: pointer;
    background-color: #8A1829;
  }
`;

const Label = styled.p`
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin: 3vh 0 ;
`;

function Button() {
  return (
    <StyledLink to="/path">
      <Label>
        costGO!
      </Label>
    </StyledLink>
  );
}

export default Button;