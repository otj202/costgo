import React, { Component } from 'react';
import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from 'styled-components';
import ShortestPathFinder from "./shortestPathFinder.js";
import Graph from './sample.jsx'; 
import Direction from './Direction.jsx';

const ContentStyle = styled.div`
  background-color: #091A45;
  height: 85vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.h2`
  color: white;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 0;
  margin-bottom: 2px;
  padding: 0;
`;

const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  height: 60vh;
  overflow: scroll;
`;

const Message = styled.p`
  color: white;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 20px;
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
  background-color: #E31837;
  margin-left: 43%;
  margin-right: 43%;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: white;

  :hover {
    cursor: pointer;
    background-color: #8A1829;
  }
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
        <Title>Your quickest path:</Title>
        <Container>
          <Graph path={path}></Graph>
          <Direction path={path}></Direction>
        </Container>
        <Message>Thanks for shopping at Costco!</Message>
        <StyledLink to="/">Continue shopping</StyledLink>
      </ContentStyle>
    );
  }
}

export default Path;