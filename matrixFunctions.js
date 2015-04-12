function multiply(matrix_a, matrix_b){
    var menu = document.getElementById("menu");
    var error_message = document.getElementById("error_message");
    if (!is_correct(matrix_a, matrix_b)) {
        menu.style.background = "#f6c1c0";
        error_message.style.display = "block";
        return new Matrix(matrix_a.data.length, matrix_b.data[0].length);
    }
    error_message.style.display = "none";
    menu.style.background = "#ccc";
    var result = new Matrix(matrix_a.data.length, matrix_b.data[0].length);
    for (var k = 0; k < matrix_b.data[0].length; k++){ 
        for (var i = 0; i < matrix_a.data.length; i++){ 
            var temp = null;
            for (var j = 0; j < matrix_b.data.length; j++)
                if (!(matrix_a.data[i][j].val == null || matrix_b.data[j][k].val == null))
                {
                    if (!temp)
                        temp = 0;
                    temp += matrix_a.data[i][j].val * matrix_b.data[j][k].val;
                }
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
    create_all_matrix();
}

function change_count_rows(is_adding){
    var menu = document.getElementById("menu");
    var type = get_type_radio(menu);
    if (type == "matrix_a"){
        if (is_adding){
            MATRIX_CALCULATOR.matrix_a.add_row();
        }
        else{
            MATRIX_CALCULATOR.matrix_a.del_row();
        }
        del_all_tables();
        create_all_matrix();
    }
    else {
        if (is_adding){
            MATRIX_CALCULATOR.matrix_b.add_row();
        }
        else{
            MATRIX_CALCULATOR.matrix_b.del_row();
        }
        MATRIX_CALCULATOR.matrix_b.del_table();
        MATRIX_CALCULATOR.matrix_b.create("matrix_b");
    }   
    var c = multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix);
}

function change_count_cols(is_adding){
    var menu = document.getElementById("menu");
    var type = get_type_radio(menu);
    if (type == "matrix_a"){
        if (is_adding){
            MATRIX_CALCULATOR.matrix_a.add_col();
        }
        else{
            MATRIX_CALCULATOR.matrix_a.del_col();
        }
        MATRIX_CALCULATOR.matrix_a.del_table();
        MATRIX_CALCULATOR.matrix_a.create("matrix_a");
    }
    else {
        if (is_adding){
            MATRIX_CALCULATOR.matrix_b.add_col();
        }
        else{
            MATRIX_CALCULATOR.matrix_b.del_col();
        }
        del_all_tables();
        create_all_matrix();
    }
    var c = multiply(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix);
}

function get_type_radio(menu){
    
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

function show_mul(){
    MATRIX_CALCULATOR.matrix_c.mul(MATRIX_CALCULATOR.matrix_a.matrix, MATRIX_CALCULATOR.matrix_b.matrix);
    MATRIX_CALCULATOR.matrix_c.del_table();
    MATRIX_CALCULATOR.matrix_c.create("matrix_c");
}
