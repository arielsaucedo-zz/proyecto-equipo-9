window.onload = function () {

    let i = 4

    let cuentaRegresiva = setInterval(function(){
        document.querySelector("h4").innerHTML ="En " + i + " segundos seras redirigido..."

        i--

        if(i == 0) {
            window.location = "http://localhost:3000/"
        }
    }, 1000)

}