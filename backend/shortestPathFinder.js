
class ShortestPathFinder{
    constructor(){
        let jason=require("./map.json");
        console.log("the json object:",jason);
        this.map=jason;
    }
    getShortestPath(items){
        
    }
    dijkstras(node,items){

    }
    searchForShortestItem(dists,items){

    }
}
let p = new ShortestPathFinder();
console.log(p);
/* IDEAS:
let curr=map["start"];
let path=[curr];
while(items.length > 0)
{
    dists = dijkstras(curr);//dists["chicken"] = length of shortest path from curr to chicken
    curr = searchForShortestItem(dists);
    items.remove(curr);
    path.append(curr);
}
path.append(map["end"]);
*/