[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NYae883E)
# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not. It takes two graphs as an argument and returns `true` or `false`, depending on whether the graphs are isomorphic or not. Your algorithm needs to handle both the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from other exercises. Your tests must check the correctness of the result of running the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

### Answer

#### TL;DR

`are_isomorphic` $\in \mathrm{\Theta}(\lvert V! \rvert * \lvert V^{2} \rvert)$ in the worst case

#### Reasoning...༼;´༎ຶ ۝ ༎ຶ༽

First and foremost, it is imperative to note that this implementation utilizes adjacency *matrices*, which does change the time complexity for some of the following operations.

With that in mind, we can see that there are five distinct functions within this implementation. The `swap` function is entirely constant, and doesn't need to be considered in the rest of this asymptotic analysis. 

The `tryPermutations` function only has a single `for` loop within it that iterates up to the number of *vertices* in the graph. Therefore, in the worst case we must assume that `tryPermutations` will have to parse over **every** vertex of the input graph, which would be an element of $\mathrm{\Theta}(\lvert V \rvert)$ is the arbitrary number of vertices within the graph. However, the `tryPermutations` function does contain a recursive statement within the `for` loop that will call `tryPermutations` again, but considering exactly one less vertex. In the worst case, this recursive call will be made for *every* vertex in the input graph, which would behave like: $V * (V - 1) * (V - 2) * \cdots * (V - (V - 1))$. That pattern denotes that `tryPermutations` is **factorial** to the number of vertices in the input graph in the worst case. Therefore, the `tryPermutations` function has a worst-case time complexity of $\mathrm{\Theta}(\lvert V! \rvert)$.

Next, we have the `adjacencyMatrix` function, which initializes adjacency matrices for the input graphs. `adjacencyMatrix` contains a few `for` loops that are the only *non-constant* operations within it. The first `for` loop iterates over the number of vertices in the input graph, which would consider *every* vertex in the worst case *($\mathrm{\mathit{\Theta}}(\mathit{\lvert V \rvert})$ from above)*. The `for` loop nested inside of that `for` loop **also** could parse up to every vertex in the graph in the worst case. Therefore, the former pair of `for` loops would be an element of $\mathrm{\Theta}(\lvert V^{2} \rvert)$ in the worst case.

 The second `for` loop considers the **edges** of the input graph, and iterates up to the number of edges in the graph. In the worst case, the latter `for` loop will have to parse over every *edge* in the input graph, which would be an element of $\mathrm{\Theta}(\lvert V^{2} \rvert)$ since the implementation uses adjacency matrices instead of lists.
 
  Since the two `for` loops are sequential to each other, the time function for `adjacencyMatrix` is: $\mathrm{T} = \lvert V^{2} \rvert + \lvert V^{2} \rvert = 2(\lvert V^{2} \rvert)$, which depicts that the `adjacencyMatrix` has a worst case time complexity of $\mathrm{\Theta}(\lvert V^{2} \rvert)$.

After that, we have the `areEquivalent` function that considers two adjacency matrices and determines whether they are equivalent to each other or not. The nested `for` loops each iterate up to the number of vertices in the input graph, which would be an element of $\mathrm{\Theta}(\lvert V^{2} \rvert)$ in the worst case. 

We can now analyze the `are_isomorphic` function since it requires each of the previous functions to be called. `are_isomorphic` will call the `adjacencyMatrix` function each time it is called, and `are_isomorphic` will recursively call itself until the `tryPermutations` function returns `true` for one reason or another. The worst case for `tryPermutations` is $\mathrm{\Theta}(\lvert V!\rvert)$, and the worst case for `adjacencyMatrix` is $\mathrm{\Theta}(\lvert V^{2} \rvert)$. Since passing the `adjacencyMatrix` into the `tryPermutations` function is effectively nesting them together, we have a worst case time complexity of $\mathrm{\Theta}(\lvert V! \rvert * \lvert V^{2} \rvert)$ for the `are_isomorphic` function. Of course, this is dropping all of the lower order terms and constants, such as the the potential calls of `areEquivalent` within the `tryPermutations` function.