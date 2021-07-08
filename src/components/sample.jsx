import React, { Component } from 'react';

import map from '../data/map.json'

import styled from 'styled-components';


const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  height: 60vh;
  display: flexbox;
  justify-content: center; 
  align-items: center;
  
`;


console.log(map["Chips"]);

class Graph extends Component {

componentDidMount(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    var total_aisle = 12;
    var position = 0;

    var shelfWidth = 45;
    var aisleWidth = 80;
    var shelfLength = 350;

    function drawAisle(aisleWidth, shelfWidth, shelfLength ){
        ctx.fillStyle = 'brown';
        for(let i = 0; i < total_aisle; i++){
            ctx.beginPath();
            ctx.fillRect(position, 60, shelfWidth, shelfLength);
            position += shelfWidth+ aisleWidth;
        }
        
    }

    drawAisle(aisleWidth,shelfWidth,shelfLength);


    var visited_array = {};

    var lineHeight = 26;
    ctx.fillStyle = 'white';
    for (var key in map) {
        
        if (map.hasOwnProperty(key)) {

            visited_array[key] = false;

            let id_str = key;
            let x = map[key].x;
            let y = map[key].y;

            if(map[key].connectorType == null){
                ctx.save();
                ctx.translate(x, y);
    
                ctx.rotate(90 * Math.PI / 180);
    
                ctx.textAlign = 'center';
                ctx.font = "15px Arial";
                
                if(map[key].side == "r"){
                    ctx.fillText(id_str, 0, (lineHeight / 2)-15, 800);
                }
                else{
                    ctx.fillText(id_str, 0, (lineHeight / 2)+0, 800);
                }
    
                ctx.restore();
                
            }
            else{
                ctx.font = "15px Arial";
                ctx.textAlign = 'center';
                ctx.fillText(map[key].aisle, x, y);
            }
            
        }
    }

    function drawLocator(x, y, length, num){
  

        ctx.fillStyle = 'orange';
      
        ctx.beginPath();
        ctx.arc(x, y-length, 12, 0, 2 * Math.PI);
        ctx.fill();
      
        var height = length * (Math.sqrt(3)/2); 
      
        var  X = x;
        var Y = y;
        ctx.moveTo(X, Y);
        ctx.lineTo(X+10, Y-height);
        ctx.lineTo(X-10, Y-height);
        ctx.moveTo(X, Y);
        ctx.fill();
        ctx.closePath(); 
      
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = "18px Arial";
        ctx.fillText(num, x, (y-length)+5); 
      
    } 


    function draw_path(array){

        var count = 1;
        for(let i = 0; i < array.length; i++){
            
            if((i+1)!= array.length){
                let curr_node = map[array[i]];
                let next_node = map[array[i+1]]; 
    
                ctx.strokeStyle = '#88F37F';
                ctx.lineWidth = 3;
                
                // draw a red line

                //ctx.font = "15px Arial";
                //ctx.fillText(i+1, curr_node.x, curr_node.y);

                if(next_node.connectorType == null){
                    drawLocator(next_node.x, next_node.y, 30, count);
                    count+=1;
                }
                

                ctx.beginPath();
                ctx.moveTo(curr_node.x, curr_node.y);
                ctx.lineTo(next_node.x, next_node.y);
                ctx.stroke();
    
            }
    
    
        }
    } 

    //document.getElementById("items").innerHTML= this.props.path;
    draw_path(this.props.path);    
 
    function drawSingleRack(x , y){
        ctx.lineWidth=1;
        ctx.fillStyle = 'white';

        var x_pos = x;
        var y_pos = y;
        var length = 10;
        var width = 10;
        for(let x = 0; x < 3; x++){
            for(let i = 0; i <4; i++){
                ctx.strokeRect(x_pos+(i*width), y_pos, width, length);  
            }
            y_pos = y_pos+length;
        }
    }


    function drawRacks(column, row, x, y, num_row, num_col){
        var x_init = x;    
        for(let i = 0; i < num_row; i++){
            for(let z = 0; z < num_col; z++){
                drawSingleRack(x, y); 
                x = x+column;
            }
            x = x_init;
            y = y+row;
        }
    } 

    //drawSingleRack(10, 295);
    drawRacks(180, 85, 30, 450, 3, 2 );
    drawRacks(180, 85, 30, 705, 1, 4 );

    

}
  render() {
    return (
        <Container>
            <canvas  id="canvas" width="1550" height="800"></canvas>
        </Container>
    );
  }
}


console.log("Heloooo!!!!");



export default Graph;