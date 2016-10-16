(function() {
  var canvas = $('#canvas'); // my placement area - think of paper in drawing
  var canvasSizeButton = $('#canvas-size');
  var clearCanvasButton = $('#clear-canvas');
  var addColorButton = $('#add-color');
  var numberOfRowsInput = $('#number-of-rows');
  var numberOfColsInput = $('#number-of-cols');
  var newColor = $('#new-color');
  var currentColor = $('#color-button').attr('class');
  var newGridSize = {nr: 15, nc: 15};

  makeGrid(15, 15);
  // clearGrid();
  // makeGrid(30, 30);
  $('.cell').on('click', toggleCellColor);
  var colorClicked = $('.li-color').on('click', selectColorPatch);

  canvasSizeButton.on('click', updateGridSize);
  clearCanvasButton.on('click', clearCanvas);
  addColorButton.on('click', addNewColor);

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

  function toggleCellColor(event) {
    selected_cell = $(this);
    if (selected_cell.attr('class') !== 'cell') {
      if (selected_cell.attr('class') !== 'cell '+currentColor) {
        selected_cell.attr('class', 'cell');
      }
    }
    selected_cell.toggleClass( currentColor );
  }

  function updateGridSize() {
    var newRows = prompt('Enter number of rows:', '15');
    var newCols = prompt('Enter number of columns:', '15');
    if ( isGridInputOK(parseInt( newRows ), parseInt( newCols)) ) {
      canvas.empty();
      makeGrid(newGridSize.nr, newGridSize.nc);
      $('.cell').on('click', toggleCellColor);
    }
  }

  function isGridInputOK(nr, nc) {
    if (!nr || !nc) {
      newGridSize.nr = 15;
      newGridSize.nc = 15;
      return true;
    } else if (nr*nc >= 10000) {
      alert("Your grid is deemed too dense to display. Adjust your numbers to try again.");
      return false;
    } else {
      newGridSize.nr = nr;
      newGridSize.nc = nc;
      return true;
    }
  }

  function clearCanvas() {
    $('.cell').attr('class','cell');
  }

  function selectColorPatch(event) {
    selectedPatch = $(this).text();
    currentColor = selectedPatch;
    $('#color-button').attr('class', selectedPatch);
  }

  function addNewColor() {
    // http://stackoverflow.com/questions/1212500/create-a-css-rule-class-with-jquery-at-runtime
    var newColorValue = prompt("Please enter a new hex color to paint with:"); // newColor.val();
    currentColor = "hex-"+newColorValue.slice(1);
    if (newColorValue) {
      $("style").append("."+currentColor+" {background-color: "+newColorValue+"; border: 1px solid "+newColorValue+"; text-shadow: 2px 2px black;}")
      $('#color-list').append('<li class="li-color"><div class="'+currentColor+' color-patch" title="'+currentColor+'"></div>'+currentColor+'</li>');
      $('#color-button').attr('class', currentColor);
      colorClicked = $('.li-color').on('click', selectColorPatch);
    }
  }
}());
