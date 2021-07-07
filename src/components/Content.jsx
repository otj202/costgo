import React, { Component } from 'react';
import Inventory from './Inventory.jsx';
import Button from './Button.jsx';
import styled from 'styled-components';

import carty from '../assets/Carty.png';

const ContentStyle = styled.div`
  background-color: #091A45;
  height: 85vh;
  width: 100vw;
  position: fixed;
  font-family: 'Nunito', sans-serif;
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
  margin-right: 10%;
  font-size: 30px;
  margin-top: 30px;
  font-weight: 300;
`;

const Intro = styled.p`
  color: white;
  font-size: 30px;
  margin-right: 10%;
  margin-left: 15%;
  font-weight: 300;
  padding: 0;
  float: right;
`;

const Logo = styled.img`
  height: 140px;
  width: 190px;
  margin-right: 15%;
  float: left;
`;

const Highlight = styled.p`
  color: #6D7FAB;
  font-size: 30px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  display: inline;
`;

class Content extends Component {
  constructor() {
    super()
    this.state = {
      checkedItems: []
    }
  }

  onItemChanged = (name, value) => {
    let changedItems = this.state.checkedItems
    changedItems[name] = value
    this.setState({
      checkedItems: changedItems
    })
  }

  render() {
    return (
      <ContentStyle>
        <Row>
          <Column>
          <Intro><Logo src={carty} />Hello, welcome to Costco! <br /><br /> My name is <Highlight>Carty</Highlight>, your personal shopping buddy.</Intro>
          <Instructions>
            Costco hired me to help you streamline your shopping experience.
            <br />
            <br />
            Simply select the items on your grocery list and I'll show you how to navigate our store to get everything you need... 
            in the <em>fastest</em> way possible! 
            <br />
            <br />
            You'll be in and out in no time!
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