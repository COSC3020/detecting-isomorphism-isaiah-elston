const fs = require('fs');
const jsc = require('jsverify');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

/*
NOTE: I did look up some good examples rather than trying to come up with them myself, but I did write the tests myself.
*/

const pentagon = 
[
    [0,1,2,3,4],
    [
        [0,1],
        [1,2],
        [2,3],
        [3,4],
        [4,0]
    ]
];

const star = 
[
    [0,1,2,3,4],
    [
        [0,2],
        [2,4],
        [4,1],
        [1,3],
        [3,0]
    ]
];

const empty = [[],[]];
const line = [[0,1,2],[[0,1],[1,2]]];

const square = [
    [0,1,2,3],
    [
        [0,1],
        [1,2],
        [2,3],
        [3,0]
    ]
];

const hourglass = [
    [0,1,2,3],
    [
        [0,2],
        [2,3],
        [3,1],
        [1,0]
    ]
];

const pentaCross = [
    [0,1,2,3,4],
    [
        [0,1],
        [1,2],
        [2,3],
        [3,4],
        [4,2],
        [4,0]
    ]
];

const complex = [
    [0,1,2,3,4],
    [
        [0,1],
        [0,3],
        [1,2],
        [2,0],
        [2,3],
        [0,4]
    ]
];

const G = [
    [0,1,2,3,4,5,6,7],
    [
        [0,1],
        [0,3],
        [0,5],
        [1,2],
        [1,4],
        [2,3],
        [2,7],
        [3,6],
        [4,5],
        [4,7],
        [5,6],
        [6,7]
    ]
];

const H = [
    [0,1,2,3,4,5,6,7],
    [
        [0,1],
        [1,2],
        [2,3],
        [3,0],
        [4,5],
        [5,6],
        [6,7],
        [7,4],
        [6,2],
        [1,5],
        [7,3],
        [4,0]
    ]
];



assert(JSON.stringify(are_isomorphic(pentagon,star)) === JSON.stringify(true));
assert(JSON.stringify(are_isomorphic(empty,line)) === JSON.stringify(false));
assert(JSON.stringify(are_isomorphic(pentagon,line)) === JSON.stringify(false));
assert(JSON.stringify(are_isomorphic(square,hourglass)) === JSON.stringify(true));
assert(JSON.stringify(are_isomorphic(square, pentagon)) === JSON.stringify(false));
assert(JSON.stringify(are_isomorphic(pentaCross, complex)) === JSON.stringify(false));
assert(JSON.stringify(are_isomorphic(G,H)) === JSON.stringify(true));
assert(JSON.stringify(are_isomorphic(G,G)) === JSON.stringify(true));