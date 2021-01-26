window.addEventListener('load', () => {
    const form = document.getElementById('form');
    const send = document.getElementById('send');

    const firstName = document.getElementById('validationTooltip01');
    const lastName = document.getElementById('validationTooltip02');
    const userName = document.getElementById('uvalidationTooltipUsername');
    const password = document.getElementById('validationTooltip03');
    const confirm = document.getElementById('validationTooltip04');
})


const user = {
    firstName: false,
    lastName: false,
    userName: false,
    image_avatar: false,
    password: false,
    confirm: false,
}

form.addEventListener('send', (e) => {
    e.preventDefault()
    validateForm()
})

firstName.addEventListener("change", (e) => {
    if (e.target.trim().length > 3) {
        user.firstName = true;
        firstName.classList.remove("border-nok");
        firstName.classList.add("border-ok");
    } else {
        firstName.classList.remove("border-ok");
        firstName.classList.add("border-nok");
        innerHTML('El nombre debe tener al menos 3 letras');
    }
})
lastName.addEventListener("change", (e) => {
    if (e.target.trim().length > 3) {
        user.lastName = true;
        lastName.classList.remove("border-nok");
        lastName.classList.add("border-ok");
    } else {
        firstName.classList.remove("border-ok");
        firstName.classList.add("border-nok");
        innerHTML('El apellido debe tener al menos 3 letras');
    }
})
userName.addEventListener("change", (e) => {
    if (validator.isEmail(userName.value)) {
        user.userName = true;
        userName.classList.remove("border-nok");
        userName.classList.add("border-ok");

    } else {
        userName.classList.remove("border-ok");
        userName.classList.add("border-nok");
        innerHTML('El nombre de usuario debe ser un e-mail')
    }
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
    }
})

confirmn.addEventListener("change", function () {
    if (validator.equals(confirmn.value, password.value)) {
        confirmn.classList.remove("border-nok")
        confirmn.classList.add("border-ok")
        user.confirmn = true;

    } else {
        confirmn.classList.remove("border-ok")
        confirmn.classList.add("border-nok")
        innerHTML('La contraseña no coincide')

    }
})


const validateForm = () => {
    const userValues = Object.values(user)
    const valid = userValues.findIndex(value => value == false)
    if (valid == -1) form.send()
    else alert('Por favor corrija los campos con error')
}