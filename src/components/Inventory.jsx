import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 30px;
  height: 400px;
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
        <Item name="Apples" />
        <Item name="Oranges"/>
      </Container>
    );
  }
}

export default Inventory;