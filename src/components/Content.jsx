import React, { Component } from 'react';
import Inventory from './Inventory.jsx';
import Button from './Button.jsx';
import styled from 'styled-components';

const ContentStyle = styled.div`
  background-color: #091A45;
  height: 80vh;
  width: 100vw;
`;

const Row = styled.div`
  :after {     
    content: "";
    display: table;
    clear: both;
  }
`;

const Column = styled.div`
  float: left;
  width: 50%;
  display: flex;
  align-self: center;
  flex-direction: column;
`;

const Instructions = styled.p`
  color: white;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 30px;
  margin-top: 30px;
`;

class Content extends Component {
  render() {
    return (
      <ContentStyle>
        <Row>
          <Column>
          <Instructions>
            Welcome! My name is Carty your shopping buddy!
            <br />
            <br />
            I'm here to help you streamline your shopping experience at Costco.
            <br />
            <br />
            Select the products on your grocery list and I'll show you the quickest way to navigate the stored to get everything you need.
          </Instructions>
          </Column>
          <Column>
            <Inventory />
            <Button />
          </Column>
        </ Row>
      </ContentStyle>
    );
  }
}

export default Content;