(function() {
  var canvas = $('#canvas'); // my placement area - think of paper in drawing
  var updateGridButton = $('#update-grid-button');
  var addColorButton = $('#add-color-button');
  var numberOfRowsInput = $('#number-of-rows');
  var numberOfColsInput = $('#number-of-cols');
  var newColor = $('#new-color');
  var selected_element = $('#paint-color option:selected');
  var nrows, ncols;

  makeGrid(15, 15);
  // clearGrid();
  // makeGrid(30, 30);
  var cells = $('.cell').on('click', toggleColor);

  updateGridButton.on('click', updateGridSize);
  addColorButton.on('click', addNewColor);
  $('#paint-color option').on('click', selectColor);
  document.onkeydown = function(e) {
    selected_element = $('#paint-color option:selected');
    $('#paint-color option').removeAttr("selected");
    switch (e.keyCode) {
        case 38:
          //if (selected_element.prev().val()) {
            //selected_element.removeAttr('selected');
            selected_element.prev().prop('selected', true);
            $('#paint-color').val(selected_element.prev().val());
          //}
          break;
        case 40:
          //if (selected_element.next().val()) {
            //selected_element.removeAttr('selected');
            selected_element.next().prop('selected', true);
            $('#paint-color').val(selected_element.next().val());
          //}
          break;
    }
  };

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
    selected_option = $('#paint-color option:selected');
    selected_cell = $(this);
    if (selected_cell.attr('class') !== 'cell') {
      if (selected_cell.attr('class') !== 'cell '+selected_option.val()) {
        selected_cell.attr('class', 'cell');
      }
    }
    selected_cell.toggleClass( selected_option.val() );
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

  function selectColor(event) {
    selected_element = $(this);
    $('#paint-color option').removeAttr("selected");
    selected_element.attr('selected', 'selected');
  }

  function addNewColor() {
    // http://stackoverflow.com/questions/1212500/create-a-css-rule-class-with-jquery-at-runtime
    var newColorValue = newColor.val();
    var colorName = "hex-"+newColorValue.slice(1);
    if (newColorValue) {
      $("<style>").prop("type", "text/css").html("."+colorName+" {background-color: "+newColorValue+";}").appendTo("head");
      $('#paint-color').append($('<option>', { value: colorName, text: newColorValue }));
      $('#paint-color option').on('click', selectColor);
    }
  }
}());
