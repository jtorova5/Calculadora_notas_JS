
let name = document.getElementById('nombre')
let e_mail = document.getElementById('e-mail')
let cel = document.getElementById('cel')


fetch("./contacto.json")
    .then(resp => resp.json())
    .then(data => {
        name.innerHTML = data['Nombre'];
        e_mail.innerHTML = data['e-mail'];
        cel.innerHTML = data['Cel'];
        console.log(data)
    })

    