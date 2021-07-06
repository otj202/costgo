import React, { Component } from 'react';
import Inventory from './Inventory.jsx';
import Button from './Button.jsx';
import styled from 'styled-components';

const ContentStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
  background-color: #091A45;
  height: 85vh;
  width: 100vw;
  position: fixed;
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
  margin-left: 15%;
  margin-right: 15%;
  font-size: 30px;
  margin-top: 30px;
  font-family: 'Nunito', sans-serif;
`;

class Content extends Component {
  constructor() {
    super()
    this.state = {
      checkedItems: []
    }
  }

  onItemChanged = (name, value) => {
    this.state.checkedItems[name] = value
  }

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
            <Inventory onItemChanged={this.onItemChanged}/>
            <Button checkedItems={this.state.checkedItems}/>
          </Column>
        </ Row>
      </ContentStyle>
    );
  }
}

export default Content;