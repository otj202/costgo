import React, { Component } from 'react';
import styled from 'styled-components';

const ItemBox = styled.div`
  background-color: #6D7FAB;
  border-radius: 20px;
  margin-left: 70px;
  margin-right: 70px;
  margin-bottom: 20px;
`;

const ItemName = styled.p`
  color: white;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;
`;

class Item extends Component {
  render() {
    return (
      <ItemBox>
        <ItemName>{this.props.name}</ItemName>
      </ItemBox>
    );
  }
}

export default Item;