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
    var menu = document.getElementById("menu");
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

function multiply(matrix_a, matrix_b){
    if (!is_correct(matrix_a, matrix_b))
        throw new MatrixValueError("Wrong matrices!");

    var result = new Matrix(matrix_a.data.length, matrix_b.data[0].length);
    for (var k = 0; k < matrix_b.data[0].length; k++){ 
        for (var i = 0; i < matrix_a.data.length; i++){ 
            var temp = 0;
            for (var j = 0; j < matrix_b.data.length; j++)
                if (!(matrix_a.data[i][j] == null || matrix_b.data[j][k] == null))
                    temp += matrix_a.data[i][j] * matrix_b.data[j][k];
            result.data[i][k] = new Cell(temp);
        }
     }
    return result;
}

function is_correct(matrix_a, matrix_b) {
    return matrix_a.data[0].length == matrix_b.data.length;
}

function change() {
    MATRIX_CALCULATOR.matrix_a.tranpose();
    MATRIX_CALCULATOR.matrix_b.tranpose();

    MATRIX_CALCULATOR.matrix_a.del_table();
    MATRIX_CALCULATOR.matrix_b.del_table();  
    MATRIX_CALCULATOR.matrix_c.del_table();

    var temp = MATRIX_CALCULATOR.matrix_a.matrix;
    MATRIX_CALCULATOR.matrix_a.matrix = MATRIX_CALCULATOR.matrix_b.matrix;
    MATRIX_CALCULATOR.matrix_b.matrix = temp;

    // не забыть умножать с
    MATRIX_CALCULATOR.matrix_a.create("matrix_a");
    MATRIX_CALCULATOR.matrix_b.create("matrix_b");
    MATRIX_CALCULATOR.matrix_c = new MatrixVisualisator("c", "matrix_c", multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix));
}


function init() {
    MATRIX_CALCULATOR.matrix_a = new MatrixVisualisator("a", "matrix_a", new Matrix(4, 2));
    MATRIX_CALCULATOR.matrix_b = new MatrixVisualisator("b", "matrix_b", new Matrix(2, 3));
    MATRIX_CALCULATOR.matrix_c = new MatrixVisualisator("c", "matrix_c", multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix));
}

init();
var change_button = document.getElementById("change");
change_button.addEventListener("click", function () {
    change();
});

var clear_button = document.getElementById("clear");
clear_button.addEventListener("click", function() { 
    MATRIX_CALCULATOR.matrix_b.clear();
    MATRIX_CALCULATOR.matrix_a.clear();
    MATRIX_CALCULATOR.matrix_c.clear();
});

var row_add_button = document.getElementById("add_row");
row_add_button.addEventListener("click", function(){

});