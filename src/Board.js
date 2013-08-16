(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var count = 0;
      var result = false;

      _.each(this.rows()[rowIndex], function(value) {
        count += value;
      });

      if (count > 1) {
        result = true;
      }
      return result;
    },

    hasAnyRowConflicts: function(){
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        result = result || this.hasRowConflictAt(i);
      }
      return result;
    },

    hasColConflictAt: function(colIndex){
      var count = 0;
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        count += this.rows()[i][colIndex];
      }
      if (count > 1) result = true;
      return result;
    },

    hasAnyColConflicts: function(){
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        result = result || this.hasColConflictAt(i);
      }
      return result;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var col = 0;
      var rowStart = majorDiagonalColumnIndexAtFirstRow;
      while (rowStart < 0) {
        // make it go up to 0
        rowStart++;
        col++;
      }

      var count = 0;

      for (var row = rowStart; row < this.get('n'); row++) {
        if ( col < this.get('n')) {
         count += this.rows()[col++][row];
       }
      }

      return ( count > 1 );
    },

    hasAnyMajorDiagonalConflicts: function(){
      var n = this.get('n');
      return _.range((n-1) * -1, n).some(function(index){
        return this.hasMajorDiagonalConflictAt(index);
      }, this);
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var col = minorDiagonalColumnIndexAtFirstRow;
      var rowStart = 0;
      while (col >= this.get('n')) {
        col--;
        rowStart++;
      }

      var count = 0;

      for( var row = rowStart; row < this.get('n'); row ++ ) {
        if ( col >= 0 ) {
          count += this.rows()[col--][row];
        }
      }

      return ( count > 1 );
    },

    hasAnyMinorDiagonalConflicts: function(){
      var n = this.get('n');
      return _.range(0, 2*(n-1)+1).some(function(index) {
        return this.hasMinorDiagonalConflictAt(index);
      }, this);
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
