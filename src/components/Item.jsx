import React, { Component } from 'react';
import Checkbox from './Checkbox.jsx';
import styled from 'styled-components';
import Apples from '../assets/Apples.png'

const ItemBox = styled.div`
  background-color: #6D7FAB;
  border-radius: 20px;
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Column = styled.div`
  float: left;
`;

const ItemName = styled.p`
  color: white;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;

`;

const ItemImg = styled.img`
  padding-left: 10px;
  padding-right: 0px;
  width: 30%;

`;

class Item extends Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }

  render() {
    return (
      <ItemBox>
        <Column>
          <ItemImg src={Apples}/>
        </Column>
        <Column>
        <ItemName>{this.props.name}</ItemName>
        </Column>
        <Column>
        <label>
          <Checkbox 
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}/>
            </label>
        </Column>
      </ItemBox>
    );
  }
}

export default Item;