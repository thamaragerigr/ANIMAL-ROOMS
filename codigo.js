$(document).ready(function() {
	$('ul li:has(ul)').hover(function(e) {
		 $(this).find('ul').css({display: "block"});
	 },
	 function(e) {
		 $(this).find('ul').css({display: "none"});
	 });
});

var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

function jsddm_open()
{  jsddm_canceltimer();
   jsddm_close();
   ddmenuitem = $(this).find('ul').css('visibility', 'visible');}

function jsddm_close()
{  if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function jsddm_timer()
{  closetimer = window.setTimeout(jsddm_close, timeout);}

function jsddm_canceltimer()
{  if(closetimer)
   {  window.clearTimeout(closetimer);
      closetimer = null;}}

$(document).ready(function()
{  $('#jsddm > li').bind('mouseover', jsddm_open)
   $('#jsddm > li').bind('mouseout',  jsddm_timer)});

document.onclick = jsddm_close;
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


$(document).ready(function() {
    $('ul li:has(ul)').hover(function(e) {
         $(this).find('ul').css({display: "block"});
     },
     function(e) {
         $(this).find('ul').css({display: "none"});
     });
});

