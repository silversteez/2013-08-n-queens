// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  var starter = new Board({'n':n});
  var testBoard;

  var possibleBoards = function(board, row, legalMoves) {
    var newBoard;
    var childLegalMoves;
    legalMoves = legalMoves || _.range(n).map(function() { return 1; });

    if( row < n ) {
      for( var i = 0; i < n; i++ ) {
        if( legalMoves[i] === 1 ) {
          newBoard = [];

          // Slice to creat a copy not reference
          childLegalMoves = legalMoves.slice();

          // Clone board into newBoard
          for (var j = 0; j < n; j++) {
            newBoard.push(board[j].slice());
          }

          // Set a rook
          newBoard[row][i] = 1;
          // Invalidate this position for next moves
          childLegalMoves[i] = 0;

          possibleBoards(newBoard, row + 1, childLegalMoves);
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
  var solutionCount = findNRooksSolution(n).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [];
  var starter = new Board({'n':n});
  var testBoard;

  var possibleBoards = function(board, row, colLegalMoves, majorLegalMoves, minorLegalMoves) {
    var newBoard;
    var childColLegalMoves, childMajorLegalMoves, childMinorLegalMoves;
    colLegalMoves = colLegalMoves || _.range(n).map(function() { return 1; });
    majorLegalMoves = majorLegalMoves || _.range(n).map(function() { return 1; });
    minorLegalMoves = minorLegalMoves || _.range(n).map(function() { return 1; });

    if( row < n ) {
      for( var i = 0; i < n; i++ ) {
        if( colLegalMoves[i] === 1 && majorLegalMoves[i] === 1 && minorLegalMoves[i] === 1 ) {
          newBoard = [];

          // Slice to create a copy not reference
          childColLegalMoves = colLegalMoves.slice();
          childMajorLegalMoves = majorLegalMoves.slice();
          childMinorLegalMoves = minorLegalMoves.slice();

          // Clone board into newBoard
          for (var j = 0; j < n; j++) {
            newBoard.push(board[j].slice());
          }

          // Set a rook
          newBoard[row][i] = 1;
          // Invalidate this position for next moves
          childColLegalMoves[i] = 0;

          // Deal with diagonals
          childMajorLegalMoves.unshift(1);
          childMajorLegalMoves.pop();
          childMajorLegalMoves[i+1] = 0;

          childMinorLegalMoves.push(1);
          childMinorLegalMoves.shift();
          childMinorLegalMoves[i-1] = 0;

          // Recurse
          possibleBoards(newBoard, row + 1, childColLegalMoves, childMajorLegalMoves, childMinorLegalMoves);
        }
      }
    } else {
      solution.push(board);
    }

  };

  possibleBoards(starter.rows(), 0);
  _.each(solution, function(board, index) {
    setTimeout(function() {
      displayBoard(board);
    }, index*200);
  });

  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = findNQueensSolution(n).length;

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
