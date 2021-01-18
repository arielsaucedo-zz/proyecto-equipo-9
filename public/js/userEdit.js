window.addEventListener('load', () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
})


const user = {
    firstName: '',
    lastName: '',
    userName: '',
    image_avatar: '',
    password: '',
    confirm: '',
}

const errors = {
    name: '',
    lastName: '',
    user_name: '',
    image_avatar: '',
    password: '',
    confirm: '',
}

firstName.addEventListener("change", function () {
    if (validator.isLength(firstName.value, {
            min: 3
        })) {
        firstName.classList.remove("border-nok")
        firstName.classList.add("border-ok")
        user.name = this.value
        delete errors.name
        firstNameMsg.innerHTML = ''
    } else {
        firstName.classList.remove("border-ok")
        firstName.classList.add("border-nok")
        errors.first_name = 'El nombre debe tener al menos 3 letras'
        firstNameMsg.classList.remove('span_errors')
    }
})