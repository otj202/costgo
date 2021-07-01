import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';
import data from '../data/map.json';

import apples from '../assets/Apples.png';
import oranges from '../assets/Oranges.png';
import baby from '../assets/Baby.png';
import beans from '../assets/Beans.png';
import bread from '../assets/Bread.png';
import candy from '../assets/Candy.png';

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
        <Item name={data.BabyProducts.name} src={baby}/>
        <Item name={data.Beans.name} src={beans}/>
        <Item name={data.Bread.name} src={bread}/>
        <Item name={data.Candy.name} src={candy}/>
      </Container>
    );
  }
}

export default Inventory;