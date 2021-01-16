window.addEventListener("load", function() {
    let firstName = document.getElementById("validationFirstName");
    let lastName = document.getElementById("validationLastName");
    let userName = document.getElementById("validationUserName");
    let imageAvatar = document.getElementById("validationImageAvatar");
    let password = document.getElementById("validationPassword");
    let passwordConfirmation = document.getElementById("validationPasswordConfirmation");

    firstName.addEventListener("blur", function() {
       if(validator.isLength(firstName.value, {min:3})) {
           firstName.classList.remove()
           firstName.classList.add()
       } else {
            firstName.classList.remove()
            firstName.classList.add()
       }
    })

    lastName.addEventListener("blur", function() {
        if(validator.isLength(lastName.value, {min:3})) {
            lastName.classList.remove()
            lastName.classList.add()
        } else {
            lastName.classList.remove()
            lastName.classList.add()
        }
     })

     userName.addEventListener("blur", function() {
        if(validator.isEmail(userName.value) {
            userName.classList.remove()
            userName.classList.add()
        } else {
            userName.classList.remove()
            userName.classList.add()
        }
     })

     imageAvatar.addEventListener("blur", function() {
        if(validator.isLength(imageAvatar.value, {min:3})) {
            imageAvatar.classList.remove()
            imageAvatar.classList.add()
        } else {
            imageAvatar.classList.remove()
            imageAvatar.classList.add()
        }
     })

     password.addEventListener("blur", function() {
        if(validator.isLength(lastName.value, {min:3})) {
            password.classList.remove()
            password.classList.add()
        } else {
            password.classList.remove()
            password.classList.add()
        }
     })

     passwordConfirmation.addEventListener("blur", function() {
        if(validator.isLength(lastName.value, {min:3})) {
            alert("Esta OK")
        } else {
            alert("Ameo, la estas errando");
        }
     })



})


