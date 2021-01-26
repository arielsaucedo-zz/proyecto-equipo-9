validar = () => {
    let nombre, apellido, email, password, expresion_user,expresion_password, confirm;
    nombre = document.getElementById('validationTooltip01').value; 
    apellido = document.getElementById('validationTooltip02').value;
    userName = document.getElementById('validationTooltipUsername').value;
    password = document.getElementById('validationTooltip03').value;
    confirm = document.getElementById('validationTooltip04').value;
    expresion_user =  /@/;
    expresion_password = /^(?=.*\d).{8,35}$/;
    if(nombre.length < 2) {
        document.getElementById('span_name').style.display = 'block';
        return false;
    }
    else if(apellido.length < 2) {
        document.getElementById('span_last_name').style.display = 'block';
        return false;
    }
    else if(!expresion_user.test(userName)) {
        document.getElementById('span_user_name').style.display = 'block';
        return false;
    }

    else if(!expresion_password.test(password)) {
    document.getElementById('span_password').style.display = 'block';
    return false;
    }
    else if(confirm !== password) {
        document.getElementById('span_confirm').style.display = 'block';
        return false;
        }
}