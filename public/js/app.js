(function() {
  var canvas = $('#canvas'); // my placement area - think of paper in drawing
  var updateGridButton = $('#update-grid-button');
  var numberOfRowsInput = $('#number-of-rows');
  var numberOfColsInput = $('#number-of-cols');
  var paintColor = $('select');
  var nrows, ncols;

  makeGrid(15, 15);
  // clearGrid();
  // makeGrid(30, 30);
  var cells = $('.cell').on('click', toggleColor);

  updateGridButton.on('click', updateGridSize);

  function makeGrid(numberOfRows, numberOfCols) {
    // make rows and put them in the body
    for(var rowCount = 0; rowCount < numberOfRows; rowCount += 1) {
      var row = $('<tr></tr>');
      for (var colCount = 0; colCount < numberOfCols; colCount += 1) {
        var column = $('<td></td>');
        column.addClass('cell');
        row.append(column);
      }
      canvas.append(row);
    }
  }

  function toggleColor(event) {
    // just 'this' cell's background-color
    $(this).toggleClass( paintColor.val() );
  }

  function updateGridSize() {
    if (isGridInputOK()) {
      canvas.empty();
      makeGrid(nrows, ncols);
      cells = $('.cell').on('click', toggleColor);
    }
  }

  function isGridInputOK() {
    var nr = parseInt( numberOfRowsInput.val() );
    var nc = parseInt( numberOfColsInput.val() );
    if (!nr || !nc) {
      nrows = 15;
      ncols = 15;
      return true;
    } else if (nr*nc >= 10000) {
      alert("Your grid is deemed too dense to display. Adjust your numbers to try again.");
      return false;
    } else {
      nrows = nr;
      ncols = nc;
      return true;
    }
  }

}());
