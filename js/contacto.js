var email = document.getElementById("correo");

email.addEventListener("keyup", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Introduce una direccion de correo electronico correcta");
    } else {
        email.setCustomValidity("");
    }
});
