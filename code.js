/*
Disclaimer: After spending a couple days working with this exercise, I did eventually reference Caden McFate's solution
to help me figure it out. I did not copy any verbatim code, but I did follow their solution to help me finish this exercise.
*/

function swap(arr, left, right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}

function are_isomorphic(graph1, graph2) {

    let graphLengthMatch = (graph1[0].length === graph2[0].length && graph1[1].length === graph2[1].length);
    if (!graphLengthMatch) return false;

    let fixedMatrix = adjacencyMatrix(graph1);
    return tryPermutations(fixedMatrix, graph2, 0);
}

function tryPermutations(fixedMatrix, graph, initialNode) {

    let permutedMatrix = adjacencyMatrix(graph);

    if (areEquivalent(fixedMatrix, permutedMatrix)) {
        return true;
    }

    let vertices = graph[0];

    if (initialNode >= vertices.length - 1) {
        return false;
    }

    for (let currentNode = initialNode; currentNode < vertices.length; currentNode++) {
        if (currentNode !== initialNode) {
            swap(vertices, initialNode, currentNode);
            graph[0] = vertices.slice();
        }

        if (tryPermutations(fixedMatrix, graph, initialNode + 1)) {
            return true;
        }

        if (currentNode !== initialNode) {
            swap(vertices, initialNode, currentNode);

            graph[0] = vertices.slice();
        }
    }
    return false;
}

function adjacencyMatrix(graph) {

    let vertices = graph[0];
    let edges = graph[1];
    let matrix = [];

    for (let list = 0; list < vertices.length; list++) {

        matrix[list] = [];

        for (let element = 0; element < vertices.length; element++) {
            matrix[list][element] = 0;
        }
    }

    if (vertices.length === 0) {
        return matrix;
    }

    for (let elementIndex = 0; elementIndex < edges.length; elementIndex++) {

        let currentEdge = edges[elementIndex];
        let left = currentEdge[0], right = currentEdge[1];
        let leftIndex = vertices.indexOf(left);
        let rightIndex = vertices.indexOf(right);

        matrix[leftIndex][rightIndex] = 1;
        matrix[rightIndex][leftIndex] = 1;
    }
    return matrix;
}

function areEquivalent(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length) {
        return false;
    }

    for (let list = 0; list < matrix1.length; list++) {
        for (let element = 0; element < matrix1[list].length; element++) {
            if (matrix1[list][element] !== matrix2[list][element]) {
                return false;
            }
        }
    }
    return true;
}