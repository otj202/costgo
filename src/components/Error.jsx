import React, { Component } from 'react';
import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from 'styled-components';

const ContentStyle = styled.div`
  background-color: #091A45;
  height: 85vh;
  width: 100vw;
  position: fixed;
  font-family: 'Nunito', sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  background-color: #364C83; 
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito', sans-serif;
  padding: 100px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 5px;
  border-radius: 20px;
`;

const Message = styled.p`
  color: white;
  font-size: 40px;
  text-align: center;
`;

const Link = ({isActive, children, ...props}) => {
  return (
    <ReactRouterDomLink {...props}>
      {children}
    </ReactRouterDomLink>
  );
}

const StyledLink = styled(Link)`
  background-color: #E31837;
  margin-bottom: 40px;
  padding: 15px;
  border-radius: 30px;
  text-align: center;
  text-decoration: none;
  color: #091A45;
  font-size: 20px;
  font-weight: 600;

  :hover {
    cursor: pointer;
    background-color: #8A1829;
  }
`;

class Error extends Component {
  render() {
    return (
      <ContentStyle>
        <Container>
          <Message>Oops! <br />It looks like you forgot to select your items.</Message>
          <StyledLink to="/">Try again</StyledLink>
        </Container>
      </ContentStyle>
    );
  }
}

export default Error;