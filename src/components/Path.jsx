import React, { Component } from 'react';
import { Link as ReactRouterDomLink } from "react-router-dom";
import ShortestPathFinder from "./shortestPathFinder.js";
import Graph from './sample.jsx';
import styled from 'styled-components';
import Direction from './Direction.jsx';
import carty from '../assets/whitecarty.png';

const ContentStyle = styled.div`
  background-color: #091A45;
  //height: 85vh;
  overflow: scroll;
  width: 100vw;
  //position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: 'Nunito', sans-serif;
`;

const Title = styled.h1`
  color: white;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 0;
  margin-bottom: 2px;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 50px;
  margin-top: 10px;
  height: 80vh;
  overflow: scroll;
`;

const Message = styled.p`
  color: white;
  padding: 0;
  margin: 20px;
  text-align: center;
  font-size: 30px;
  font-style: italic;
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
  margin-left: 43%;
  margin-right: 43%;
  margin-bottom: 40px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #091A45;

  :hover {
    cursor: pointer;
    background-color: #8A1829;
  }
`;

const Logo = styled.img`
  width: 60px;
  padding-right: 10px;
`;

class Path extends Component {
  render() {
    let checked = []
    for(const [key, value] of Object.entries(this.props.location.state.checkedItems)) {
      if(value) {
        checked.push(key)
      }
    }
    let path = new ShortestPathFinder().getShortestPath(checked)
    return (
      <ContentStyle>
        <Title><Logo src={carty} />Your personalized map:</Title>
        <Container>
          <Graph path={path}></Graph>
        </Container>
        <Title><Logo src={carty} />Your personalized instructions:</Title>
        <Direction path={path}></Direction>
        <Message>Thanks for shopping at Costco!</Message>
        <StyledLink to="/">Continue shopping</StyledLink>
      </ContentStyle>
    );
  }
}

export default Path;