Your task is to implement a React component that renders a board representing the sliding puzzle called 15-puzzle. The board consists of 15 numbered square tiles (from 1 up to 15) and one empty space. The aim of the puzzle is to place the tiles in order by making sliding moves that use the empty space.

Requirements
The root of the component tree is a div element with class name board.
Each of the tiles should be rendered as a direct child of the div element and be a div element with class name tile. The empty space should additionally contain an empty class.
The component receives two props: initialConfiguration and onSolveCallback. The first one is an array of length 16 that contains a permutation of the set { 0, 1, 2, ..., 15 }. Each number represents the number that should be placed on a corresponding tile in the initial arrangement. The 0 element refers to the empty space. The callback onSolveCallback should be called when the puzzle is correctly sorted into order the first time.
The first element of the initialConfiguration array corresponds to the top-left tile, the second element to the next tile along the top row, the third to the tile to the left of the top-right tile, and so forth up to the 16th element, which corresponds to the bottom-right tile.
Assumptions
You can assume the initial board's configuration is not the puzzle's solution. At least one move is necessary to reach a solution.
You can assume the initial board's configuration is a valid configuration which means that it's possible to make such sliding moves that lead to the solution.
The "Preview" tab will display your component. You can use it for testing purposes.
Design/styling is not assessed and will not affect the score. You should focus only on implementing the requirements. Using classes: board, tile and empty gives neat styling.
The following imports are allowed: react (v16.12.0) and classnames (v2.2.6). You can find both at the top of the starting code.
You can use console.log and console.error for debugging purposes via your browser's developer tools.
