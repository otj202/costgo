import React, { Component } from 'react';
import ShortestPathFinder from "./shortestPathFinder.js";

import map from '../map.js'
import tests from '../test.js'




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
        
                ctx.strokeStyle = '#add8e6';
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

    //depthSearch(map["start"]);

    function draw_path(array){

        for(let i = 0; i < array.length; i++){
            
            if((i+1)!= array.length){
                let curr_node = map[array[i]];
                let next_node = map[array[i+1]]; 
    
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 3;
            
                // draw a red line
                ctx.beginPath();
                ctx.moveTo(curr_node.x, curr_node.y);
                ctx.lineTo(next_node.x, next_node.y);
                ctx.stroke();
    
            }
    
    
        }
    } 

    var pos = 1; //Tests stored in an array, there are a total of 4 tests
    document.getElementById("items").innerHTML= tests[pos].items;
    draw_path(tests[pos].path_final);    
    //let path = new ShortestPathFinder().getShortestPath(tests[pos].items);
    //draw_path(path);


}
  render() {
    return (
        <div>
            <h1 id="items">Hellow World</h1> 
            <canvas id="canvas" height="400" width="1600"></canvas>
        </div>
    );
  }
}


console.log("Heloooo!!!!");


export default Graph;