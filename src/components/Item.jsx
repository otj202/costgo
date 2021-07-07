import React, { Component } from 'react';
import Checkbox from './Checkbox.jsx';
import styled from 'styled-components';

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
  width: 33%;
  text-align: center;
`;

const ItemName = styled.p`
  color: white;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;
`;

const ItemImg = styled.img`
  padding-left: 0;
  margin: 0;
  width: 50%;
`;

class Item extends Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
    this.props.onItemChanged(this.props.name, event.target.checked)
  }

  render() {
    console.log(this.props.category)
    return (
      <ItemBox>
        <Column>
          <ItemImg src={this.props.img}/>
        </Column>
        <Column>
          <ItemName>{this.props.name}</ItemName>
          {this.props.category}
          <br/>
          {this.props.price}
          <br/>
          {this.props.rating}
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