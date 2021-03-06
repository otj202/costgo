import React, { Component } from 'react';
import Checkbox from './Checkbox.jsx';
import Emoji from './Emoji.jsx';
import styled from 'styled-components';

const ItemBox = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
  
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
  width: 25%;
  text-align: center;
`;

const ItemName = styled.p`
  color: white;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;
  font-family: 'Nunito', sans-serif;
`;

const ItemImg = styled.img`
  padding-left: 0;
  margin: 0;
  width: 50%;
`;

const Description = styled.p`
  color: white;
  font-style: italic;
  font-family: 'Nunito', sans-serif;
`;

class Item extends Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
    this.props.onItemChanged(this.props.name, event.target.checked)
  }

  render() {
    return (
      <ItemBox>
        <Column>
          <ItemImg src={this.props.img}/>
        </Column>
        <Column>
          <ItemName>{this.props.name}</ItemName>
        </Column>
        <Column>
          <Description>${this.props.price}</Description>
          <Description><Emoji symbol="⭐️" label="star"/> {this.props.rating}</Description>
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