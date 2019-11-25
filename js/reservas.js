$(document).ready(function(){
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
})
function validarCampos(x) {
	if (x==='email') {
		var email = document.getElementById('email').value;
		/*alert("email--"+ email)*/
		var emailValidation = document.getElementById('emailValidation');
		if (email.includes("@")) {
			emailValidation.classList.add('d-none');
		} else {
			emailValidation.classList.remove('d-none');

		}

	}
	if (x==='phone') {
		var phone = document.getElementById('phone').value;

		var phoneValidation = document.getElementById('phoneValidation');
		var regexp = "0123456789";
		// alert(this.validarRegexp(phone, regexp))
		if(this.validarRegexp(phone, regexp)  === false){
			phoneValidation.textContent = 'El número de teléfono no puede contener letras';
			phoneValidation.classList.remove('d-none');
		}
		else if (phone.length >= 9) {
			phoneValidation.textContent = 'El número de teléfono debe contener 9 dígitos';
			phoneValidation.classList.remove('d-none');
		}
		else{phoneValidation.classList.add('d-none');}
	}
}
	
function validarRegexp(campo, regexp) {
	var todoOK=true;

	for (i=0;i<campo.length;i++){
		var caracter=campo.charAt(i);
		//pregunta si el caracter es o no es
		for(j=0;j<regexp.length;j++){
			if(!regexp.includes(caracter)) {return false}
		}
	}

	return todoOK;
	
}
