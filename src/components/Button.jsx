import React, { Component } from 'react';
import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from 'styled-components';

import carty from '../assets/CostGObtn.png';

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

const Logo = styled.img`
  height: 70px;
  margin: 2.5vh 0 ;
`;

class Button extends Component {
  render() {
    return (
    <StyledLink to={{
      pathname:"/path", 
      state:{ checkedItems:this.props.checkedItems }
    }}>
      <Logo src={carty}/>
    </StyledLink>
  );
  }
}

export default Button;