import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components';
import data from '../data/map.json';
import images from './Images.jsx';

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
  
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
  font-family: 'Nunito', sans-serif;
`;

const Section = styled.h3`
  color: white;
  padding-top: 2%;
  padding-left: 15%;
  font-family: 'Nunito', sans-serif;
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
    var current = "";
    let list = [];

    arr.map(item => {
      if (item.category == current) {
        list.push(<Item key={item.name} name={item.name} img={images[item.name]} onItemChanged={this.props.onItemChanged} category={item.category} rating={item.rating} price={item.price}/>)
      } else {
        current = item.category;
        list.push(<>
              <Section>{item.category}</Section>
              <Item key={item.name} name={item.name} img={images[item.name]} onItemChanged={this.props.onItemChanged} category={item.category} rating={item.rating} price={item.price}/>
              </>)
      }
    });

    return (
      <Container>
        <Title>Inventory</Title>
        {list}
      </Container>
    );
  }
}

export default Inventory;