// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];

  var starter = new Board({'n':n});

  var possibleBoards = function(board, row) {
    var newBoard;
    if( row < n ) {
      for( var i = 0; i < n; i++ ) {
        newBoard = [];
        for (var j = 0; j < n; j++) {
          newBoard.push(board[j].slice());
        }
        newBoard[row][i] = 1;

        var testBoard = new Board(newBoard)
        if( !testBoard.hasAnyRooksConflicts()) {
          possibleBoards(newBoard, row + 1);
        }
      }
    } else {
      solution.push(board);
    }
  };

  possibleBoards(starter.rows(), 0);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = findNRooksSolution(n).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
