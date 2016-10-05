(function() {
  var numberOfRows = 40; // number of rows in the grid
  var numberOfCols = 40; // number of columns in the grid
  var canvas = $('#canvas'); // my placement area - think of paper in drawing

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
}());
