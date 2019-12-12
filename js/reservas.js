let tabOrder = 1;

function siguienteTab() {
    const previousTab = document.getElementById("tab-content-" + tabOrder);
    tabOrder++;
    const selectedTab = document.getElementById("tab-content-" + tabOrder);
	previousTab.classList.remove('current');
	selectedTab.classList.add('current');
	document.getElementById('tab-'+(tabOrder-1)).classList.remove('current');
	document.getElementById('tab-'+ tabOrder).classList.add('current');
	this.checkButtons()

}

function anteriorTab() {
	const previousTab = document.getElementById("tab-content-" + tabOrder);
	tabOrder--;
	const selectedTab = document.getElementById("tab-content-" + tabOrder);
	previousTab.classList.remove('current');
	selectedTab.classList.add('current');
	document.getElementById('tab-'+(tabOrder+1)).classList.remove('current');
	document.getElementById('tab-'+ tabOrder).classList.add('current');
	this.checkButtons()

}

function checkButtons(){
	console.log(tabOrder);
	if (tabOrder===3){

		document.getElementById("nextReservas").classList.add('d-none');}
	if (tabOrder===1){
		document.getElementById("prevReservas").classList.add('d-none');	}

	if (tabOrder!==1){
		document.getElementById("prevReservas").classList.remove('d-none');}
	if (tabOrder!==3){
		document.getElementById("nextReservas").classList.remove('d-none');}
}

$(document).ready(function () {
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        tabOrder=tab_id;
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#tab-content-" + tab_id).addClass('current');
    })
})

function validarCampos(x) {
    if (x === 'email') {
        var email = document.getElementById('email').value;
        /*alert("email--"+ email)*/
        var emailValidation = document.getElementById('emailValidation');
        if (email.includes("@")) {
            emailValidation.classList.add('d-none');
        } else {
            emailValidation.classList.remove('d-none');

        }

    }
    if (x === 'phone') {
        var phone = document.getElementById('phone').value;

        var phoneValidation = document.getElementById('phoneValidation');
        var regexp = "0123456789";
        // alert(this.validarRegexp(phone, regexp))
        if (this.validarRegexp(phone, regexp) === false) {
            phoneValidation.textContent = 'El número de teléfono no puede contener letras';
            phoneValidation.classList.remove('d-none');
        } else if (phone.length >= 9) {
            phoneValidation.textContent = 'El número de teléfono debe contener 9 dígitos';
            phoneValidation.classList.remove('d-none');
        } else {
            phoneValidation.classList.add('d-none');
        }
    }
}

function validarRegexp(campo, regexp) {
    var todoOK = true;

    for (i = 0; i < campo.length; i++) {
        var caracter = campo.charAt(i);
        //pregunta si el caracter es o no es
        for (j = 0; j < regexp.length; j++) {
            if (!regexp.includes(caracter)) {
                return false
            }
        }
    }

    return todoOK;

}

function nMascotas(event) {
    console.log(event)
    let acumulador = '';

    const objeto = {1: 'primera', 2: 'segunda', 3: 'tercera', 4: 'cuarta'};
    const contadorMascotas = document.getElementById("contadorMascotas");
    for (var i = 0; i < event.target.value; i++) {
        acumulador = acumulador + "<br>Nombre de la " + objeto[i + 1] + " mascota<span style=\" color:red\">*</span><br><input type=\"text\"  class=\"form-control form-control-sm\"  name=\"text\" value=\"\"> <br> Raza " + objeto[i + 1] + " mascota <span style=\" color:red\">*</span> <br> <input type=\"text\"  class=\"form-control form-control-sm\" name=\"text\" value=\"\"><br>Información adicional <br><input type=\"text\"  class=\"form-control form-control-sm\"  name=\"text\" value=\"\"><br>"
    }
    contadorMascotas.innerHTML = acumulador;
}