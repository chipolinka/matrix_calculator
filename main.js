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
            result.data[i][k] = temp;
        }
     }
    return result;
}

function is_correct(matrix_a, matrix_b){
    return matrix_a.data[0].length == matrix_b.data.length;
}

MATRIX_CALCULATOR.matrix_a = new Matrix(3, 4);
MATRIX_CALCULATOR.matrix_b = new Matrix(2, 3);
MATRIX_CALCULATOR.matrix_c = multiply(MATRIX_CALCULATOR.matrix_b, MATRIX_CALCULATOR.matrix_a);

var change_button = document.getElementById("change");
change_button.addEventListener("click", function () { console.log("CLICKED") });
