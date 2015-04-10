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
    change_count_rows(true);
});

var row_del_button = document.getElementById("del_row");
row_del_button.addEventListener("click", function(){
    change_count_rows(false);
});

var col_add_button = document.getElementById("add_col");
col_add_button.addEventListener("click", function(){
    change_count_cols(true);
});

var col_del_button = document.getElementById("del_col");
col_del_button.addEventListener("click", function(){
    change_count_cols(false);
});

var mul_button = document.getElementById("mul");
mul_button.addEventListener("click", function(){
    show_mul();
});