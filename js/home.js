$(document).ready(function() {

    $(window).scroll(function() {

        var height = $('#titulo').height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= height) {
            $('.navbar').addClass('solid-nav');
        } else {
            $('.navbar').removeClass('solid-nav');
        }

    });
});
$(document).ready(function() {  
    $('#cookieModal').modal('show');
  });






function validar(){
 
    /*creo una variable de tipo booleano que en principio tendrá un valor true(verdadero),
    y que se convertirá en false(falso) cuando la condición no se cumpla*/
    var todo_correcto = true;

    /*El primer campo a comprobar es el del nombre. Lo traemos por id y verificamos
    la condición, en este caso, por ejemplo, le decimos que tiene que tener más de dos dígitos
    para que sea un nombre válido. Si no tiene más de dos dígitos, la variable todo_correcto
    devolverá false.*/

    if(document.getElementById('Usuario').value.length < 4 ){
        todo_correcto = false;
        alert("Usuario incorrecto. Este campo tiene que tener entre 4 y 9 caracteres.");
    }

    /*Validar contraseña*/

    if(document.getElementById('password').value.length < 5 ){
    	todo_correcto = false;
      alert("Contraseña incorrecta. Este campo tiene que tener entre 5 y 15 caracteres.")
    }


    /*Por último, y como aviso para el usuario, si no está todo bién, osea, si la variable
    todo_correcto ha devuelto false al menos una vez, generaremos una alerta advirtiendo
    al usuario de que algunos datos ingresados no son los que esperamos.*/
    if(todo_correcto) {
      alert("Todo es correcto");
    }
    

    return todo_correcto;
}

