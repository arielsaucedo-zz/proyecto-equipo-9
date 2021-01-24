validar = () => {
    let nombre, apellido, email, password, expresion_user,expresion_password, confirm;
    nombre = document.getElementById('first_name').value; 
    apellido = document.getElementById('last_name').value;
    userName = document.getElementById('user_name').value;
    password = document.getElementById('password_initial').value;
    confirm = document.getElementById('password_confirmation').value;
    expresion_user =  /\w+@\w+\.+[a-z]/;
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

    else if(expresion_password.test(password)) {
    document.getElementById('span_password').style.display = 'block';
    return false;
    }
    else if(confirm !== password) {
        document.getElementById('span_confirm').style.display = 'block';
        return false;
        }
}