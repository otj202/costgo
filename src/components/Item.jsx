import React, { Component } from 'react';
import styled from 'styled-components';

const ItemBox = styled.div`
  background-color: #6D7FAB;
  border-radius: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
`;

const ItemName = styled.p`
  color: white;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 30px;
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