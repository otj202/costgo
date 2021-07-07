import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';
import data from '../data/map.json';
import images from './Images.jsx';

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
    var arr = [];
    Object.keys(data).forEach(function(key) {
      //console.log(key + ' - ' + data[key].connectorType);
      //console.log(key + ' - ' + data[key].rating);
      if (data[key].connectorType == null) {
        arr.push(data[key]);
      }
    });

    return (
      <Container>
        <Title>Inventory</Title>
        { arr.map(item =>
         <Item key={item.name} name={item.name} img={images[item.name]} onItemChanged={this.props.onItemChanged} category={item.category} rating={item.rating} price={item.price}/>
          ) 
        }
      </Container>
    );
  }
}

export default Inventory;