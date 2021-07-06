import React, { Component } from 'react';

import map from '../map.js'

console.log(map["Chips"]);

class Graph extends Component {

componentDidMount(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    var total_aisle = 11;

    var position = 0;
    function drawAisle(aisleWidth, shelfWidth, shelfLength ){
        ctx.fillStyle = 'brown';
        for(let i = 0; i < total_aisle; i++){
            ctx.beginPath();
            ctx.fillRect(position, 30, shelfWidth, shelfLength);
            position += shelfWidth+ aisleWidth;
        }
        
    }

    drawAisle(100,40,180);


    var visited_array = {};
    ctx.fillStyle = 'black';
    for (var key in map) {
        
        if (map.hasOwnProperty(key)) {

            visited_array[key] = false;

            let id_str = key;
            let x = map[key].x;
            let y = map[key].y;
            ctx.font = "8px Arial";
            ctx.fillText(id_str.substring(0, 5), x, y);
        }
    }


    function depthSearch(root){
        //console.log(root);

        visited_array[root.name] = true;
        var neighbors = root.neighbors; 
    
        for (var node in neighbors) {
            if (neighbors.hasOwnProperty(node)) {
                
                //console.log("Node "+node);
                let curr_node = root.name;
                let next_node = node; 
        
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 2;
            
                // draw a red line
                ctx.beginPath();
                ctx.moveTo(map[curr_node].x, map[curr_node].y);
                ctx.lineTo(map[next_node].x, map[next_node].y);
                ctx.stroke();
        
                if(visited_array[node] == false){
                    depthSearch(map[node]);
                }

            }
        }
    } 

    depthSearch(map["start"]);



}
  render() {
    return (
        <div>
            <h1>Hellow World</h1> 
            <canvas id="canvas" height="400" width="1500"></canvas>
        </div>
    );
  }
}


console.log("Heloooo!!!!");


export default Graph;