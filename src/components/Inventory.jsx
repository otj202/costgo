import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 60px;
  margin-right: 60px;
  height: 400px;
`;

const Title = styled.h1`
  color: white;
  padding-top: 20px;
  padding-left: 70px;
`;

class Inventory extends Component {
  render() {
    return (
      <Container>
        <Title>Inventory</Title>
        <Item name="Apples" />
        <Item name="Oranges"/>
        <Item name="Bananas"/>
      </Container>
    );
  }
}

export default Inventory;