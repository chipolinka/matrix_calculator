
function mul(matrix_b, matrix_a){
	var result_matrix = new Matrix();
	matrix_c = []
    for (var i = 0; i < matrix_b.length; i++) 
    	matrix_c[i] = [];

    for (var k = 0; k < matrix_b.length; k++){ 
     	for (var i = 0; i < matrix_b.length; i++){ 
        	var temp = 0;
          	for (var j = 0; j < matrix_a.length; j++) 
          		temp += matrix_b[i][j]*matrix_a[j][k];
          	matrix_c[i][k] = temp;
        }
     }
	return matrix_c;
}

function create_matrix(rows, cols){
	matrix = [];
	for (var i = 0; i < rows; i++) {
		matrix[i] = new Array(cols);
	return matrix;
}