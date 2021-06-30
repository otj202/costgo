import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';

import apples from '../assets/Apples.png';
import oranges from '../assets/Oranges.png';

const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 30px;
  height: 60vh;
  overflow: scroll;
`;

const Title = styled.h1`
  color: white;
  padding-top: 2%;
  padding-left: 15%;
`;

class Inventory extends Component {
  render() {
    return (
      <Container>
        <Title>Inventory</Title>
        <Item name="Apples" src={apples}/>
        <Item name="Oranges" src={oranges}/>
        <Item name="Oranges" src={oranges}/>
        <Item name="Oranges" src={oranges}/>
      </Container>
    );
  }
}

export default Inventory;