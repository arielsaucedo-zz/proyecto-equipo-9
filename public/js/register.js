window.addEventListener("load", function() {
    let firstName = document.getElementById("validationFirstName");
    let firstNameMsg = document.getElementById("first_name_msg");

    let lastName = document.getElementById("validationLastName");
    let lastNameMsg = document.getElementById("last_name_msg");

    let userName = document.getElementById("validationUserName");
    let userNameMsg = document.getElementById("user_name_msg");

    let imageAvatar = document.getElementById("validationImageAvatar");
    let imageAvatarMsg = document.getElementById("image_avatar_msg");

    let password = document.getElementById("validationPassword");
    let passwordMsg = document.getElementById("password_msg");

    let passwordConfirmation = document.getElementById("validationPasswordConfirmation");
    let passwordConfirmationMsg = document.getElementById("password_confirm_msg");
    
    let form = document.getElementById("registerForm");

    const user = {
        first_name : '',
        last_name : '',
        user_name : '',
        image_avatar : '',
        password : '',
        password_confirm : '', 
    }

    const errors = {
        first_name : '',
        last_name : '',
        user_name : '',
        image_avatar : '',
        password : '',
        password_confirm : '',
    }

    firstName.addEventListener("keyup", function() {
       if(validator.isLength(firstName.value, {min:3})) {
            firstName.classList.remove("border-nok")
            firstName.classList.add("border-ok")
            user.first_name = this.value
            delete errors.first_name
            firstNameMsg.innerHTML = ''
       } else {
            firstName.classList.remove("border-ok")
            firstName.classList.add("border-nok")
            errors.first_name = 'El nombre debe ser de al menos 3 letras'
            firstNameMsg.classList.remove('span_errors')
       }
    })

    lastName.addEventListener("keyup", function() {
        if(validator.isLength(lastName.value, {min:3})) {
            lastName.classList.remove("border-nok")
            lastName.classList.add("border-ok")
            user.last_name = this.value
            delete errors.last_name
            lastNameMsg.innerHTML = ''
        } else {
            lastName.classList.remove("border-ok")
            lastName.classList.add("border-nok")
            errors.last_name = 'El apellido debe ser de al menos 3 letras'
            lastNameMsg.classList.remove('span_errors')
        }
     })

     userName.addEventListener("keyup", function() {
        if(validator.isEmail(userName.value)) {
            userName.classList.remove("border-nok")
            userName.classList.add("border-ok")
            user.user_name = this.value
            delete errors.user_name
            userNameMsg.innerHTML = ''
        } else {
            userName.classList.remove("border-ok")
            userName.classList.add("border-nok")
            errors.user_name = 'El nombre de usuario debe ser un e-mail'
            userNameMsg.classList.remove('span_errors')
        }
     })

/*    let filePath = imageAvatar.value;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(allowedExtensions.exec(filePath)){
        imageAvatar.classList.remove("border-nok")
        imageAvatar.classList.add("border-ok")
        user.image_avatar = this.value
        delete errors.image_avatar
        imageAvatarMsg.innerHTML = ''
    }else{
        imageAvatar.classList.remove("border-ok")
        imageAvatar.classList.add("border-nok")
        errors.image_avatar = 'El tipo de archivo no es valido'
        imageAvatarMsg.classList.remove('span_errors')
    } */

     password.addEventListener("keyup", function() {
        if(/^(?=.*\d).{4,8}$/.test(password.value)) {
            password.classList.remove("border-nok")
            password.classList.add("border-ok")
            user.password = this.value
            delete errors.password
            passwordMsg.innerHTML = ''
        } else {
            password.classList.remove("border-ok")
            password.classList.add("border-nok")
            errors.password = 'La contraseña debe contener entre 4 y 8 caracteres y debe incluir al menos un número'
            passwordMsg.classList.remove('span_errors')
        }
     })

     passwordConfirmation.addEventListener("keyup", function() {
        if(validator.equals(passwordConfirmation.value, password.value )) {
            passwordConfirmation.classList.remove("border-nok")
            passwordConfirmation.classList.add("border-ok")
            user.passwordConfirmation = this.value
            delete errors.passwordConfirmation
            passwordMsg.innerHTML = ''
        } else {
            passwordConfirmation.classList.remove("border-ok")
            passwordConfirmation.classList.add("border-nok")
            errors.password_confirm = 'La contraseña no coincide'
            passwordConfirmationMsg.classList.remove('span_errors')
        }
     })

     form.addEventListener('submit', function(e){
        console.log('llego al submit');
        if(Object.keys(errors).length > 0){
            console.log('no se envía');
            e.preventDefault()
            firstNameMsg.innerHTML = errors.first_name
            firstNameMsg.classList.add('span_errors')

            lastNameMsg.innerHTML = errors.last_name
            lastNameMsg.classList.add('span_errors')

            userNameMsg.innerHTML = errors.user_name
            userNameMsg.classList.add('span_errors')

            imageAvatarMsg.innerHTML = errors.image_avatar
            imageAvatarMsg.classList.add('span_errors')

            passwordMsg.innerHTML = errors.password
            passwordMsg.classList.add('span_errors')

            passwordConfirmationMsg.innerHTML = errors.password_confirm
            passwordConfirmationMsg.classList.add('span_errors')
        } else {
            console.log('se puede enviar');
        }
    })

})


