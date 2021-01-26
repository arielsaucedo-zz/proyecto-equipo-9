window.onload = function () {
    let name = document.getElementById("nombre");
    let nameMsg = document.getElementById("name_msg");

    let email = document.getElementById("email");
    let emailMsg = document.getElementById("email_msg");

    let tel = document.getElementById("telefono");
    let telMsg = document.getElementById("tel_msg");

    const errName = "Debe ingresar su nombre."
    const errEmail = "Debe ingresar un e-mail valido."
    const errTel = "Debe ingresar un telefono valido."

    const errors = {
        name: "",
        email: "",
        tel: "",
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

    name.addEventListener("keyup", function () {
        if (validator.isLength(name.value, {
                min: 3
            })) {
            delete errors.name
            setValidationResult(name, "name", "Name", "OK", nameMsg, "")
        } else {
            errors.name = errName
            setValidationResult(name, "name", "Name", "NOK", nameMsg, errName)
        }
    })

    name.addEventListener("blur", function () {
        if (validator.isLength(name.value, {
                min: 3
            })) {
            delete errors.name
            setValidationResult(name, "name", "Name", "OK", nameMsg, "")
        } else {
            errors.name = errName
            setValidationResult(name, "name", "Name", "NOK", nameMsg, errName)
        }
    })

    email.addEventListener("keyup", function () {
        if (validator.isEmail(email.value)) {
            delete errors.email
            setValidationResult(email, "email", "Email", "OK", emailMsg, "")
        } else {
            errors.email = errEmail
            setValidationResult(email, "email", "Email", "NOK", emailMsg, errEmail)
        }
    })

    email.addEventListener("blur", function () {
        if (validator.isEmail(email.value)) {
            delete errors.email
            setValidationResult(email, "email", "Email", "OK", emailMsg, "")
        } else {
            errors.email = errEmail
            setValidationResult(email, "email", "Email", "NOK", emailMsg, errEmail)
        }
    })

    tel.addEventListener("keyup", function () {
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,6}$/.test(tel.value)) {
            delete errors.tel
            setValidationResult(tel, "tel", "Tel", "OK", telMsg, "")
        } else {
            errors.tel = errTel
            setValidationResult(tel, "tel", "Tel", "NOK", telMsg, errTel)
        }
    })

    tel.addEventListener("blur", function () {
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,6}$/.test(tel.value)) {
            delete errors.tel
            setValidationResult(tel, "tel", "Tel", "OK", telMsg, "")
        } else {
            errors.tel = errTel
            setValidationResult(tel, "tel", "Tel", "NOK", telMsg, errTel)
        }
    })



}