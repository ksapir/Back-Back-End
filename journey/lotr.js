

let lotrArray = [
    {
        name: "Bag End",
        distance: 0
    },
    {
        name: "Tookland",
        distance: 5
    },
    {
        name: "Black Rider",
        distance: 32
    },
    {
        name: "Meet Elves",
        distance: 41
    },
    {
        name: "Farmer Maggot",
        distance: 61
    },
]


const linearSearch = (array, userMiles) => {
    // Loop the given array.
    for (let index = 0; index < array.length; index++) {
        const element = array[index].distance
        // Check to see if the index of the given array is equal to the element we are searching for.
        console.log(userMiles)
        if (userMiles > 0 && userMiles < 5) {
            return array[0];
        } else if (userMiles > 5 && userMiles < 32) {
            return array[1];
        } else if (userMiles > 32 && userMiles < 41) {
            return array[2];
        } else if (userMiles > 41 && userMiles < 61) {
            return array[3];
        } else if (userMiles > 61 && userMiles < 70) {
            return array[4];
        } else if (userMiles > 70 && userMiles < 98) {
            return array[5];
        } else if (userMiles > 98 && userMiles < 135) {
            return array[6];
        }else if (userMiles > 135 && userMiles < 241) {
            return array[7];
        }else if (userMiles > 241 && userMiles < 298) {
            return array[8];
        } else if (userMiles > 298 && userMiles < 362) {
            return array[9];
        }else if (userMiles > 362 && userMiles < 393) {
            return array[10];
        }else if (userMiles > 393 && userMiles < 458) {
            return array[11];
        }else if (userMiles > 458 && userMiles < 460) {
            return array[12];
        }else if (userMiles > 460 && userMiles < 585) {
            return array[13];
        }else if (userMiles > 585 && userMiles < 708) {
            return array[14];
        }else if (userMiles > 708 && userMiles < 798) {
            return array[15];
        }else if (userMiles > 798 && userMiles < 839) {
            return array[16];
        }else if (userMiles > 839 && userMiles < 855) {
            return array[17];
        }else if (userMiles > 855 && userMiles < 920) {
            return array[18];
        }else if (userMiles > 920 && userMiles < 1063) {
            return array[19];
        }else if (userMiles > 1063 && userMiles < 1267) {
            return array[20];
        } else if (userMiles > 1267 && userMiles < 1288) {
            return array[21];
        }else if (userMiles > 1288 && userMiles < 1319) {
            return array[22];
        }else if (userMiles > 1319 && userMiles < 1393) {
            return array[23];
        }else if (userMiles > 1393 && userMiles < 1418) {
            return array[24];
        }else if (userMiles > 1418 && userMiles < 1433) {
            return array[25];
        }else if (userMiles > 1433 && userMiles < 1474) {
            return array[26];
        }else if (userMiles > 1474 && userMiles < 1532) {
            return array[27];
        }else if (userMiles > 1532 && userMiles < 1576) {
            return array[28];
        }else if (userMiles > 1576 && userMiles < 1599) {
            return array[29];
        }else if (userMiles > 1599 && userMiles < 1600) {
            return array[30];
        }else if (userMiles > 1600 && userMiles < 1612) {
            return array[31];
        }else if (userMiles > 1612 && userMiles < 1649) {
            return array[32];
        }else if (userMiles > 1649 && userMiles < 1721) {
            return array[33];
        }else if (userMiles > 1721 && userMiles < 1731) {
            return array[34];
        }else if (userMiles > 1731 && userMiles < 1776) {
            return array[35];
        }else if (userMiles > 1776 && userMiles < 1780) {
            return array[36];
        }else if (userMiles > 1780 && userMiles < 1786) {
            return array[37];
        }else if (userMiles > 1786 && userMiles < 1800) {
            return array[38];
        }else if (userMiles > 1800 && userMiles < 1906) {
            return array[39];
        } else if (userMiles >= 1906 ) {
            return array[40];
        } 

    }
    // -1 when no matching element was found in the given array.
    return -1;
};
console.log(linearSearch(lotrArray, 45))
