

let currentDest =  {
    name:"Bag End- The Shire",
    distance: 0,
    description:"Gandalf arrives at Bag End to celebrate the 111th birthday of Frodo’s uncle, Bilbo. Bilbo leaves the Ring to Frodo. Once it is found by Gandalf, he insists the Frodo leave the Shire. Frodo departs the Shire with his friend Samwise Gamgee.",
    url:"https://static.wikia.nocookie.net/lotr/images/e/e4/Vlcsnap-2013-05-19-19h49m07s0.png/revision/latest?cb=20130519155935 "
}

let nextDest = {
    name:"Tookland",
        distance:5,
        description:"Frodo and Sam reach the edge of Tookland and say goodbye to the Shire.",
        url:"https://lotro-wiki.com/images/thumb/f/f1/Tookland-1.jpg/400px-Tookland-1.jpg "
}

let frontEndInfo = {currentDest,nextDest}


// query database for journey and for loop with if statements
//user binary search to find closest distances
// returns as array of objects

// iterate through array to get closest paast destination and closest to destination. save as variables
//return both objects so they are available to front end
//return as object of ocjects
//frontEndInfo.closestTo.name


let lotrArray = [
    {name: "Bag End",
    distance:0},
    {name: "Tookland",
    distance:5},
    {name: "Black Rider",
    distance:32},
    {name: "Meet Elves",
    distance:41},
    {name: "Farmer Maggot",
    distance:61},
]

function binarySearch(array,element, userMilesWalked, start, end){
    start = 0;
    end = array.length -1
    

    // let lotrDist = 

    if (start>end) return false;

    let middle = Math.floor((start+end)/2)
    console.log(middle)

    if(array[middle]=== element) return true;

    if(array[middle] > element) {
        return binarySearch(array, element, start, mid-1)
    } else {
        return binarySearch(array,element,middle+1, end);
    };
    
    // if(binarySearch(lotrArray.distance,userMilesWalked,0, lotrArray.length-1){

    // }


}
console.log(binarySearch (lotrArray, 13))
