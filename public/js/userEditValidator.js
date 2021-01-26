validar = () => {
    let nombre, apellido, email, password, expresion_user,expresion_password, confirm;
    nombre = document.getElementById('validationTooltip01').value; 
    apellido = document.getElementById('validationTooltip02').value;
    userName = document.getElementById('validationTooltipUsernamePrepend').value;
    password = document.getElementById('validationTooltip03').value;
    confirm = document.getElementById('validationTooltip04').value;
    expresion_user =  /@/;
    expresion_password = /^(?=.*\d).{4,8}$/;
    if(nombre.length < 3) {
        document.getElementById('span_name').style.display = 'block';
        return false;
    }
    else if(apellido.length < 3) {
        document.getElementById('span_last_name').style.display = 'block';
        return false;
    }
    else if(!expresion_user.test(userName)) {
        document.getElementById('span_user_name').style.display = 'block';
        return false;
    }
<<<<<<< HEAD:public/js/userEditValidator.js
})

password.addEventListener("change", function () {
    if (/^(?=.*\d).{4,8}$/.test(password.value)) {
        password.classList.remove("border-nok")
        password.classList.add("border-ok")
        user.password = true;
    } else {
        password.classList.remove("border-ok")
        password.classList.add("border-nok")
        innerHTML('La contraseña debe contener entre 4 y 8 caracteres e incluir al menos un número')
=======

    else if(!expresion_password.test(password)) {
    document.getElementById('span_password').style.display = 'block';
    return false;
>>>>>>> 48eefa0f7d88ed6470cedfa6a58f36d1101cdf39:public/js/userEdit.js
    }
    else if(confirm !== password) {
        document.getElementById('span_confirm').style.display = 'block';
        return false;
        }
}