window.onload = function ()  {

/** INICIO 
 * JS para permitir SHOW o HIDE de password en vis changePassword  */
    $(document).ready(function(){
    $('.pass_show').append('<span class="ptxt">Show</span>');  
    });
      
    
    $(document).on('click','.pass_show .ptxt', function(){ 
    
    $(this).text($(this).text() == "Show" ? "Hide" : "Show"); 
    
    $(this).prev().attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; }); 
    
    });  
/** FIN  
* JS para permitir SHOW o HIDE de password en vis changePassword  */

/** INICIO VALIDACIONES DE CAMPOS PASSWORD */
    let form = document.getElementById("changePasswordForm"); 

    let password_old = document.getElementById("password_old");
    let passwordOldMsg = document.getElementById("password_old_msg");

    let password_new = document.getElementById("password_new");
    let passwordNewMsg = document.getElementById("password_new_msg");

    let password_confirmation = document.getElementById("password_confirmation");
    let passwordConfirmationMsg = document.getElementById("password_confirmation_msg");

    const errPasswordOld = "La contraseña actual es incorrecta. Por favor, verifique y reingrese."
    const errPasswordNew = "Las nueva contraseña y su confirmación deben ser iguales." 
    const errPasswordConfirmation = "La confirmación de la constraseña debe ser igual a la nueva contraseña." 

    const user = {
        password_old: "",
        password_new,
        password_confirmation: "",
    }
    const errors = {
        password_old: "",
        password_new,
        password_confirmation: "",
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
    
    password_old.addEventListener("keyup", function () {
        if (/^(?=.*\d).{8,20}$/.test(password_old.value)) {
            delete errors.password_old
            setValidationResult(password_old, "password_old", "Password_old", "OK", passwordOldMsg, "")
        } else {
            errors.password_old = errPasswordNew
            setValidationResult(password_old, "password_old", "Password_old", "NOK", passwordOldMsg, errPasswordOld)
        }
    })

    password_old.addEventListener("blur", function () {
        if (/^(?=.*\d).{8,20}$/.test(password_old.value)) {
            delete errors.password_old
            setValidationResult(password_old, "password_old", "Password_old", "OK", passwordOldMsg, "")
        } else {
            errors.password_old = errPasswordNew
            setValidationResult(password_old, "password_old", "Password_old", "NOK", passwordOldMsg, errPasswordOld)
        }
    })

    password_new.addEventListener("keyup", function () {
        if (validator.equals(password_new.value, password_confirmation.value)) {
            delete errors.password_new
            setValidationResult(password_new, "password_new", "Password_new", "OK", passwordNewMsg, "")
        } else {
            errors.password_new = errPasswordNew
            setValidationResult(password_new, "password_new", "Password_new", "NOK", passwordNewMsg, errPasswordNew)
        }
    })

    password_new.addEventListener("blur", function () {
        if (validator.equals(password_new.value, password_confirmation.value)) {
            delete errors.password_new
            setValidationResult(password_new, "password_new", "Password_new", "OK", passwordNewMsg, "")
        } else {
            errors.password_new = errPasswordNew
            setValidationResult(password_new, "password_new", "Password_new", "NOK", passwordNewMsg, errPasswordNew)
        }
    })

    password_new.addEventListener("change", function () {
        if (validator.equals(password_new.value, password_confirmation.value)) {
            delete errors.password_new
            setValidationResult(password_new, "password_new", "Password_new", "OK", passwordNewMsg, "")
        } else {
            errors.password_new = errPasswordNew
            setValidationResult(password_new, "password_new", "Password_new", "NOK", passwordNewMsg, errPasswordNew)
        }
    }) 
    /** */
    password_confirmation.addEventListener("keyup", function () {
        if (validator.equals(password_confirmation.value, password_new.value)) {
            delete errors.password_confirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "OK", passwordConfirmationMsg, "")
        } else {
            errors.password_confirmation = errPasswordConfirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "NOK", passwordConfirmationMsg, errPasswordConfirmation)
        }
    })

    password_confirmation.addEventListener("blur", function () {
        if (validator.equals(password_confirmation.value, password_new.value)) {
            delete errors.password_confirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "OK", passwordConfirmationMsg, "")
            setValidationResult(password_new, "password_new", "password_new", "OK", passwordNewMsg, "")
        } else {
            errors.password_confirmation = errPasswordConfirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "NOK", passwordConfirmationMsg, errPasswordConfirmation)
        }
    })

    password_confirmation.addEventListener("change", function () {
        if (validator.equals(password_confirmation.value, password_new.value)) {
            delete errors.password_confirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "OK", passwordConfirmationMsg, "")
        } else {
            errors.password_confirmation = errPasswordConfirmation
            setValidationResult(password_confirmation, "password_confirmation", "Password_Confirmation", "NOK", passwordConfirmationMsg, errPasswordConfirmation)
        }
    }) 

    form.addEventListener("submit", function (e) {
        if (Object.keys(errors).length > 0) {
            console.log("no se envía");
            e.preventDefault()
            console.log(Object.keys(errors));
            for (i = 0; i < Object.keys(errors).length; i++) {
                switch (Object.keys(errors)[i]) {
                    case "password_old":
                        password_old.classList.remove("border-ok")
                        password_old.classList.add("border-nok")
                        if (passwordOldMsg.classList) {
                            passwordOldMsg.classList.add('span_errors')
                            passwordOldMsg.innerHTML = errPasswordOld
                        }
                        break;
                    case "password_new":
                        password_new.classList.remove("border-ok")
                        password_new.classList.add("border-nok")
                        if (passwordNewMsg.classList) {
                            passwordNewMsg.classList.add('span_errors')
                            passwordNewMsg.innerHTML = errPasswordNew
                        }
                        break;
                    case "password_confirmation":
                        passwordConfirmation.classList.remove("border-ok")
                        passwordConfirmation.classList.add("border-nok")
                        if (passwordConfirmationMsg.classList) {
                            passwordConfirmationMsg.classList.add('span_errors')
                            passwordConfirmationMsg.innerHTML = errPasswordConfirmation
                        }
                        break;
                    default:
                        break; 
                }
            }
        } else {
            console.log('se puede enviar');
        }
    })

}