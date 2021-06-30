class Node{
    constructor(name,aisle,side,connectorType=null){
        this.connectorType=connectorType;
        this.name=name;
        this.aisle=aisle;
        this.side=side;
        this.x=null;
        this.y=null;
        this.neighbors={};
    }
    setXY(x,y){
        this.x=x;
        this.y=y;
    }
    distanceTo(node){
        if(this.x == null || this.y == null || node.x == null || node.y == null){
            console.log("cannot calculate distance to node of unspecified location")
            return -1;
        }
        let dx = node.x - this.x;
        let dy= node.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    addEdge(node){
        this.neighbors[node.name]=this.distanceTo(node);
    }
}

function getCoords(node, index, length){
    let shelf_width=10;
    let aisle_width=10;
    let shelf_length=10;
    var x_pos = (shelf_width+aisle_width)*(node.aisle);
    var y_pos = 30; 

    var x = 0;
    var y = 0;

    if(node.connectorType == "top"){
        x = x_pos-(aisle_width/2) 
        y = y_pos - 5;
    }
    else if(node.connectorType == "bottom"){
        x = x_pos - (aisle_width/2) 
        y = y_pos + 5 + shelf_length;
    }
    else{

        var z = shelf_length/length;
        y = y_pos + (z*index) + (z/2);

        if(node.side == "r"){
            x = x_pos;
        }
        else{
            x = x_pos - aisle_width;
        }
    }

    node.setXY(x,y);

}
var aislesJSON = require("./aisles.json");
function parseAisles(aisles) {
    let nodes=[];
    aisleNumber=1;
    for (const aisleDict of Object.values(aisles)){       
        let aisleNodes = [];
        let leftSideLength=aisleDict["left"].length;
        let rightSideLength=aisleDict["right"].length;
        for(i=0;i<leftSideLength;i++){
            let node= new Node(aisleDict["left"][i],aisleNumber,"l");
            getCoords(node,i,leftSideLength);
            aisleNodes.push(node);
        }
        for(i=0;i<rightSideLength;i++){
            let node= new Node(aisleDict["right"][i],aisleNumber,"r");
            getCoords(node,i,rightSideLength);
            aisleNodes.push(node);
        }
        nodes.push(aisleNodes);
        aisleNumber += 1;
    }    
    return nodes;
}
let res= parseAisles(aislesJSON);
console.log(res);