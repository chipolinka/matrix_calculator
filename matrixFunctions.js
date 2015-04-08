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

    del_all_tables();

    var temp = MATRIX_CALCULATOR.matrix_a.matrix;
    MATRIX_CALCULATOR.matrix_a.matrix = MATRIX_CALCULATOR.matrix_b.matrix;
    MATRIX_CALCULATOR.matrix_b.matrix = temp;
    // не забыть умножать с
    create_all_matrix();
}

function change_count_rows(is_adding){
    var type = get_type_radio();
    if (type == "matrix_a"){
        if (is_adding){
            MATRIX_CALCULATOR.matrix_a.add_row();
        }
        else{
            MATRIX_CALCULATOR.matrix_a.del_row();
        }
    }
    else {
        if (is_adding){
            MATRIX_CALCULATOR.matrix_b.add_row();
        }
        else{
            MATRIX_CALCULATOR.matrix_b.del_row();
        }
    }
    del_all_tables();
    create_all_matrix();
}

function change_count_cols(is_adding){
    var type = get_type_radio();
    if (type == "matrix_a"){
        if (is_adding){
            MATRIX_CALCULATOR.matrix_a.add_col();
        }
        else{
            MATRIX_CALCULATOR.matrix_a.del_col();
        }
    }
    else {
        if (is_adding){
            MATRIX_CALCULATOR.matrix_b.add_col();
        }
        else{
            MATRIX_CALCULATOR.matrix_b.del_col();
        }
    }
    del_all_tables();
    create_all_matrix();
}

function get_type_radio(){
    var menu = document.getElementById("menu");
    var types_matrix = menu.getElementsByTagName('input');
    for (var i = 0; i < types_matrix.length; i++) 
        if (types_matrix[i].type === 'radio' && types_matrix[i].checked && types_matrix[i].name === 'matrix') {
            return types_matrix[i].value;
        }
}

function del_all_tables(){
    MATRIX_CALCULATOR.matrix_a.del_table();
    MATRIX_CALCULATOR.matrix_b.del_table();  
    MATRIX_CALCULATOR.matrix_c.del_table();
}

function create_all_matrix(){
    MATRIX_CALCULATOR.matrix_a.create("matrix_a");
    MATRIX_CALCULATOR.matrix_b.create("matrix_b");
    MATRIX_CALCULATOR.matrix_c = new MatrixVisualisator("c", "matrix_c", multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix));

}

function init() {
    MATRIX_CALCULATOR.matrix_a = new MatrixVisualisator("a", "matrix_a", new Matrix(4, 2));
    MATRIX_CALCULATOR.matrix_b = new MatrixVisualisator("b", "matrix_b", new Matrix(2, 3));
    MATRIX_CALCULATOR.matrix_c = new MatrixVisualisator("c", "matrix_c", multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix));
}
