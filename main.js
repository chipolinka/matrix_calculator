window.onload = function(e) {
    init();

    var row_add_button = document.getElementById("add_row");
    var clear_button = document.getElementById("clear");
    var change_button = document.getElementById("change");
    var row_del_button = document.getElementById("del_row");
    var col_add_button = document.getElementById("add_col");
    var col_del_button = document.getElementById("del_col");
    var mul_button = document.getElementById("mul");
    

    if (change_button.addEventListener) {
        change_button.addEventListener("click", function () {
            change();
        });
      
        clear_button.addEventListener("click", function() { 
            MATRIX_CALCULATOR.matrix_b.clear();
            MATRIX_CALCULATOR.matrix_a.clear();
            MATRIX_CALCULATOR.matrix_c.clear();
        });

        row_add_button.addEventListener("click", function(){
            change_count_rows(true);
        });

        row_del_button.addEventListener("click", function(){
            change_count_rows(false);
        });

        col_add_button.addEventListener("click", function(){
            change_count_cols(true);
        });

        col_del_button.addEventListener("click", function(){
            change_count_cols(false);
        });

        mul_button.addEventListener("click", function(){
            show_mul();
        });
    } else {
        change_button.attachEvent("onclick", function () {
            change();
        });
      
        clear_button.attachEvent("onclick", function() { 
            MATRIX_CALCULATOR.matrix_b.clear();
            MATRIX_CALCULATOR.matrix_a.clear();
            MATRIX_CALCULATOR.matrix_c.clear();
        });

        row_add_button.attachEvent("onclick", function(){
            change_count_rows(true);
        });

        row_del_button.attachEvent("onclick", function(){
            change_count_rows(false);
        });

        col_add_button.attachEvent("onclick", function(){
            change_count_cols(true);
        });

        col_del_button.attachEvent("onclick", function(){
            change_count_cols(false);
        });

        mul_button.attachEvent("onclick", function(){
            show_mul();
        });

    }
}