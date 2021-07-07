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
  handleEmptyCart = () => {
    return(
      <h3>Please Select an Item</h3>
    )
  }

  renderButton = () => {
    if(Object.values(this.props.checkedItems).includes(true)) {
      return(
        <StyledLink to={{
          pathname:"/path", 
          state:{ checkedItems:this.props.checkedItems }
        }}>
          <Logo src={carty}/>
        </StyledLink>
      )
    }
    return(
      <StyledLink to="/error" onClick={this.handleEmptyCart}>
        <Logo src={carty}/>
      </StyledLink>
    )
  }

  render() {
    return (
      this.renderButton()
  );
  }
}

export default Button;