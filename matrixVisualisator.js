var MATRIX_CALCULATOR = MATRIX_CALCULATOR || {};

var Cell = function(val) { this.val = val }
var Matrix = function(rows, cols) { this.data = this.create(rows, cols) };
var MatrixValueError = function(message) { this.message = message; this.name = "MatrixValueError" }

Matrix.prototype.create = function(rows, cols) {
    var data = [];
    for (var i = 0; i < rows; i++) {
        data[i] = [];
        for (var j = 0; j < cols; j++) {
            data[i][j] = new Cell(null);
        }
    }
    return data;
}

var MatrixVisualisator = function(name, div_id, matrix) { this.name = name; this.matrix = matrix; this.create(div_id); }

MatrixVisualisator.prototype.create = function(div_id) {
    var matrix = this.matrix;
    menu = document.getElementById("menu");
    this.div = document.getElementById(div_id);
    var table = document.createElement("table");
    for (var i = 0; i < this.matrix.data.length; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < this.matrix.data[0].length; j++) {
            var td = document.createElement("td");
            var input = document.createElement("input");
            input.dataset["row"] = i;
            input.dataset["col"] = j;
            input.size = 1;
            input.placeholder = this.name + (i + 1) + "," + (j + 1);
            if (this.name == "c") {
                input.disabled = true;
            }
            if (this.matrix.data[i][j].val) {
              input.value = this.matrix.data[i][j].val;
            }
            input.addEventListener("change", function () {
                matrix.data[this.dataset["row"]][this.dataset["col"]].val = this.value;
            });
            input.addEventListener("focus", function () {
                menu.style.background = "#5199db";    
            });
            input.addEventListener("blur", function () {
                menu.style.background = "#ccc";    
            });
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    this.div.appendChild(table);
}

MatrixVisualisator.prototype.tranpose = function() {
    var new_matrix = [];
    for (var i = 0; i < this.matrix.data[0].length; i++) {
        new_matrix[i] = [];
        for (var j = 0; j < this.matrix.data.length; j++) {
            new_matrix[i][j] = new Cell(this.matrix.data[j][i].val);
        };
    };

    this.matrix.data = new_matrix;
}

MatrixVisualisator.prototype.del_table = function() {
    var table = this.div.getElementsByTagName("table")[0];
    table.remove();
}

MatrixVisualisator.prototype.clear = function() {
    var inputs = this.div.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    for (var i = 0; i < this.matrix.data.length; i++) {
        for (var j = 0; j < this.matrix.data[0].length; j++) {
            this.matrix.data[i][j] = new Cell(null);
        };
    };
}

MatrixVisualisator.prototype.add_row = function() {
    var new_matrix = [];
    for (var i = 0; i < this.matrix.data.length + 1; i++) {
        new_matrix[i] = [];
        for (var j = 0; j < this.matrix.data[0].length; j++) {
            if (i < this.matrix.data.length)
                new_matrix[i][j] = new Cell(this.matrix.data[i][j].val);
            else new_matrix[i][j] = new Cell(null);
        };
    };
    this.matrix.data = new_matrix;
}

MatrixVisualisator.prototype.del_row = function() {
    var new_matrix = [];
    for (var i = 0; i < this.matrix.data.length - 1; i++) {
        new_matrix[i] = [];
        for (var j = 0; j < this.matrix.data[0].length; j++) {
            new_matrix[i][j] = new Cell(this.matrix.data[i][j].val);
        };
    };
    this.matrix.data = new_matrix;
}

MatrixVisualisator.prototype.add_col = function() {
    var new_matrix = [];
    for (var i = 0; i < this.matrix.data.length; i++) {
        new_matrix[i] = [];
        for (var j = 0; j < this.matrix.data[0].length + 1; j++) {
            if (j < this.matrix.data[0].length)
                new_matrix[i][j] = new Cell(this.matrix.data[i][j].val);
            else new_matrix[i][j] = new Cell(null);
        };
    };
    this.matrix.data = new_matrix;
}

MatrixVisualisator.prototype.del_col = function() {
    var new_matrix = [];
    for (var i = 0; i < this.matrix.data.length; i++) {
        new_matrix[i] = [];
        for (var j = 0; j < this.matrix.data[0].length - 1; j++) {
            new_matrix[i][j] = new Cell(this.matrix.data[i][j].val);
        };
    };
    this.matrix.data = new_matrix;
}