window.onload = function () {
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

    const errFirstName = "La longitud del nombre debe ser como mínimo de 3 letras."
    const errLastName = "La longitud de la descripción debe ser como mínimo de  letras."
    const errUserName = "El nombre de usuario debe ser un e-mail."
    const errImageAvatar = "El archivo debe ser de extension jpg, jpeg, png o gif."
    const errPassword = "La contraseña debe contener mínimo 8 caracteres y debe incluir al menos un número."
    const errPasswordConfirm = "Las contraseñas deben ser iguales."
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"]

    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    const user = {
        first_name: "",
        last_name: "",
        user_name: "",
       /*  image_avatar: "", */
        password: "",
        password_confirm: "",
    }

    const errors = {
        first_name: "",
        last_name: "",
        user_name: "",
        password: "",
        password_confirm: "",
    }

    function setValidationResult(element, keyName, keyNameU, status, elementMsg, errMsg) {
        if (status === "OK") {
            element.classList.remove("border-nok")
            element.classList.add("border-ok")
            console.log(element.keyName);
            if (elementMsg.classList) {
                elementMsg.classList.remove("span_errors")
                elementMsg.innerHTML = ""
            }
            console.log(errors);
        } else {
            element.classList.remove("border-ok")
            element.classList.add("border-nok")
            if (elementMsg.classList) {
                elementMsg.classList.add("span_errors")
                elementMsg.innerHTML = errMsg
            }
        }
    }

    firstName.addEventListener("keyup", function () {
        if (validator.isLength(firstName.value, {
                min: 3
            })) {
            delete errors.first_name
            setValidationResult(firstName, "first_name", "First_Name", "OK", firstNameMsg, "")
        } else {
            errors.first_name = errFirstName
            setValidationResult(firstName, "first_name", "First_Name", "NOK", firstNameMsg, errFirstName)
        }
    })

    firstName.addEventListener("blur", function () {
        if (validator.isLength(firstName.value, {
                min: 3
            })) {
            delete errors.first_name
            setValidationResult(firstName, "first_name", "First_Name", "OK", firstNameMsg, "")
        } else {
            errors.first_name = errFirstName
            setValidationResult(firstName, "first_name", "First_Name", "NOK", firstNameMsg, errFirstName)
        }
    })

    lastName.addEventListener("keyup", function () {
        if (validator.isLength(lastName.value, {
                min: 3
            })) {
            delete errors.last_name
            setValidationResult(lastName, "last_name", "Last_Name", "OK", lastNameMsg, "")
        } else {
            errors.last_name = errLastName
            setValidationResult(lastName, "last_name", "Last_Name", "NOK", lastNameMsg, errLastName)
        }
    })

    lastName.addEventListener("blur", function () {
        if (validator.isLength(lastName.value, {
                min: 3
            })) {
            delete errors.last_name
            setValidationResult(lastName, "last_name", "Last_Name", "OK", lastNameMsg, "")
        } else {
            errors.last_name = errLastName
            setValidationResult(lastName, "last_name", "Last_Name", "NOK", lastNameMsg, errLastName)
        }
    })

    userName.addEventListener("keyup", function () {
        if (validator.isEmail(userName.value)) {
            delete errors.user_name
            setValidationResult(userName, "user_name", "User_Name", "OK", userNameMsg, "")
        } else {
            errors.user_name = errUserName
            setValidationResult(userName, "user_name", "User_Name", "NOK", userNameMsg, errUserName)
        }
    })

    userName.addEventListener("blur", function () {
        if (validator.isEmail(userName.value)) {
            delete errors.user_name
            setValidationResult(userName, "user_name", "User_Name", "OK", userNameMsg, "")
        } else {
            errors.user_name = errUserName
            setValidationResult(userName, "user_name", "User_Name", "NOK", userNameMsg, errUserName)
        }
    })

    imageAvatar.addEventListener("change", function () {
        let imageExtension = ""
        imageExtension = getFileExtension(imageAvatar.value)
        let flag = false
        for (let i = 0; i < allowedExtensions.length; i++) {
            if (allowedExtensions[i] == imageExtension) {
                flag = true
                break
            } 
        }
        if (flag) {
            delete errors.image_avatar
            setValidationResult(imageAvatar, "image_avatar", "Image_Avatar", "OK", imageAvatarMsg, "")
        } else {
            if (imageExtension != "") {
            errors.image_avatar = errImageAvatar
            setValidationResult(imageAvatar, "image_avatar", "Image_Avatar", "NOK", imageAvatarMsg, errImageAvatar)
            }
        }
    })

    password.addEventListener("keyup", function () {
        if (/^(?=.*\d).{8,20}$/.test(password.value)) {
            delete errors.password
            setValidationResult(password, "password", "Password", "OK", passwordMsg, "")
        } else {
            errors.password = errPassword
            setValidationResult(password, "password", "Password", "NOK", passwordMsg, errPassword)
        }
    })

    password.addEventListener("blur", function () {
        if (/^(?=.*\d).{8,20}$/.test(password.value)) {
            delete errors.password
            setValidationResult(password, "password", "Password", "OK", passwordMsg, "")
        } else {
            errors.password = errPassword
            setValidationResult(password, "password", "Password", "NOK", passwordMsg, errPassword)
        }
    })

    passwordConfirmation.addEventListener("keyup", function () {
        if (validator.equals(passwordConfirmation.value, password.value)) {
            delete errors.password_confirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "OK", passwordConfirmationMsg, "")
            console.log("OK");
        } else {
            errors.password_confirm = errPasswordConfirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "NOK", passwordConfirmationMsg, errPasswordConfirm)
            console.log("NOK");
        }
    })

    passwordConfirmation.addEventListener("blur", function () {
        if (validator.equals(passwordConfirmation.value, password.value)) {
            delete errors.password_confirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "OK", passwordConfirmationMsg, "")
        } else {
            errors.password_confirm = errPasswordConfirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "NOK", passwordConfirmationMsg, errPasswordConfirm)
        }
    })

    passwordConfirmation.addEventListener("change", function () {
        if (validator.equals(passwordConfirmation.value, password.value)) {
            delete errors.password_confirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "OK", passwordConfirmationMsg, "")
        } else {
            errors.password_confirm = errPasswordConfirm
            setValidationResult(passwordConfirmation, "password_confirm", "Password_Confirm", "NOK", passwordConfirmationMsg, errPasswordConfirm)
        }
    })

    form.addEventListener("submit", function (e) {
        if (Object.keys(errors).length > 0) {
            console.log("no se envía");
            e.preventDefault()
            console.log(Object.keys(errors));
            for (i = 0; i < Object.keys(errors).length; i++) {
                switch (Object.keys(errors)[i]) {
                    case "first_name":
                        firstName.classList.remove("border-ok")
                        firstName.classList.add("border-nok")
                        if (firstNameMsg.classList) {
                            firstNameMsg.classList.add('span_errors')
                            firstNameMsg.innerHTML = errFirstName
                        }
                        break;
                    case "last_name":
                        lastName.classList.remove("border-ok")
                        lastName.classList.add("border-nok")
                        if (lastNameMsg.classList) {
                            lastNameMsg.classList.add('span_errors')
                            lastNameMsg.innerHTML = errLastName
                        }
                        break;
                    case "user_name":
                        userName.classList.remove("border-ok")
                        userName.classList.add("border-nok")
                        if (userNameMsg.classList) {
                            userNameMsg.classList.add('span_errors')
                            userNameMsg.innerHTML = errUserName
                        }
                        break;
                    case "image_avatar":
                        imageAvatar.classList.remove("border-ok")
                        imageAvatar.classList.add("border-nok")
                        if (imageAvatarMsg.classList) {
                            imageAvatarMsg.classList.add('span_errors')
                            imageAvatarMsg.innerHTML = errImageAvatar
                        }
                        break;
                    case "password":
                        password.classList.remove("border-ok")
                        password.classList.add("border-nok")
                        if (passwordMsg.classList) {
                            passwordMsg.classList.add('span_errors')
                            passwordMsg.innerHTML = errPassword
                        }
                        break;
                    case "password_confirm":
                        passwordConfirmation.classList.remove("border-ok")
                        passwordConfirmation.classList.add("border-nok")
                        if (passwordConfirmationMsg.classList) {
                            passwordConfirmationMsg.classList.add('span_errors')
                            passwordConfirmationMsg.innerHTML = errPasswordConfirm
                        }
                        break;
                    default:
                        break;
                }
            }
        } else {
            /* e.preventDefault() */
            let i = 4
            let cuentaRegresiva = setInterval(function(){
                document.querySelector("h4").innerHTML ="En " + i + " segundos seras redirigido..."
                i--
                    if(i === 0) {
                        window.location = "http://localhost:3000/"
                    }
            }, 1000)
            console.log('se puede enviar');
        }
    })

}