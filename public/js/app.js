(function() {
  var numberOfRows = 15; // number of rows in the grid
  var numberOfCols = 15; // number of columns in the grid
  var canvas = $('#canvas'); // my placement area - think of paper in drawing

  makeGrid();
  var cells = $('.cell').on('click', changeColor);

  function makeGrid() {
    // make rows and put them in the body
    for(var rowCount = 0; rowCount < numberOfRows; rowCount += 1) {
      var row = $(' <tr></tr>');
      for (var colCount = 0; colCount < numberOfCols; colCount += 1) {
        var column = $('<td></td>');
        column.addClass('cell');
        row.append(column);
      }
      canvas.append(row);
    }
  }

  function changeColor(event) {
    // just 'this' cell's background-color
    $(this).toggleClass('red');
  }

}());
