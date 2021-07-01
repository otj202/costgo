
class ShortestPathFinder{
    constructor(){
        let jason=require("./map.json");
        console.log("the json object:",jason);
        this.map=jason;
    }

    //@param items
    //array of strings of names of items of shopping cart
    getShortestPath(items){
        //Start path on start node
        let curItem = this.map.start; //curItem is a node
        let path = ["start"]; //array of strings of names of items

        while(items.length > 0) {
            let dists = this.dijkstras(curItem, items);
            nextItem = this.searchForShortestItem(dists)

            let curPathNode = nextItem;

            let pathToNextItem = [curPathNode];
            
            //build path to next item backwards
            while(dists[curPathNode].parent !== curItem) {
                curPathNode = dists[curPathNode].parent;
                pathToNextItem.unshift(curPathNode);       
            }   

            //merge the whole path with the path to next item
            Array.prototype.push.apply(path, pathToNextItem);

            curItem = nextItem;

            //remove current item from items
            const index = items.indexOf(curItem);
            if (index > -1) {
                items.splice(index, 1);
            }
        }

        path.push("exit")
        return path;
    }

    dijkstras(startNode,items){
        
    }

    searchForShortestItem(dists,items){
        var item; 
        var minDistance = Number.MAX_VALUE; 

        for(let i = 0; i < items.length; i++){
            if(dists[items[i]].dist < minDistance){
                item = items[i]; 
                minDistance = dists[items[i]].dist;
            }
        }
        
        return item;
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