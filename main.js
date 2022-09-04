
let estudiantes = [];
let notaMaxima = document.getElementById('notaMax');
let cantidadNotas = document.getElementById('cantNotas');
let notas = [];
let porcentajes = [];
let botonGuardar = document.getElementById('guardar');
let isNoPressed2 = true;
let isNoPressed = true;
let cantNotasRecordatorio = 0;
let nombreFormulario = document.getElementById('nombreF');
let filasForm = document.getElementById('filas');
let botonGuardarActivado = false;
let botonAgregar = document.getElementById('Agregar');
let botonFinalizar = document.getElementById('Finalizar');
let notasPonderadas = [];
let nombre = '';
let nota = 0;
let notaPonderada = 0;
let porcentaje = 0;
let definitiva = 0;
let exportName = "Resultado estudiantes";


let reiniciar = document.getElementById('reiniciar');
reiniciar.addEventListener('click', _ => {
            location.reload();
})

class estudiante {
    constructor(nombre, definitiva, estado, position) {
        this.nombre = nombre;
        this.definitiva = definitiva;
        this.estado = estado;
        this.position = position;
    };
};

function desplegarNombre() {

    nombreFormulario.innerHTML = `<form>
    <label for="nombre">Nombre estudiante:</label>
<input type="text" id="nombre1" inputTag="input" name="nombre1" placeholder="Ingrese el nombre del estudiante...">
</form>`

};

function desplegarFilas(cantNotas) {

    for (let i = 1; i <= cantNotas; i += 1) {

        filasForm.innerHTML = filasForm.innerHTML + `<div class="container">
        <div class="left">
        <label for="nota${i}">Nota #${i}:</label>
        <input type="number" inputTag="input" id="nota${i}" name="nota${i}" position="${i - 1}" placeholder="Ej: 1, 2, 3... ">
        </div>
        <div class="right">
        <label for="porcentaje${i}">Porcentaje de la nota #${i}:</label>
        <input type="number" inputTag="input" id="porcentaje${i}" name="porcentaje${i}" position="${i - 1}" placeholder="Ej: 10, 20, 30...">
        </div>
        </div>`
    }
    filasForm.innerHTML = filasForm.innerHTML + `<div class="container">
    <div class="left"><button id="Agregar">Agregar estudiante</button></div>
    <div class="right"><button id="Finalizar">Finalizar</button></div> `
};

function AgregarDefinitiva() {

    definitiva = 0;

    for (let i = 0; i < notas.length; i += 1) {
        notasPonderadas[i] = notas[i] * porcentajes[i];
    }

    for (let i = 0; i < notasPonderadas.length; i += 1) {
        definitiva += notasPonderadas[i];
    }
    definitiva = (definitiva / 100).toFixed(1);

    definitiva < notaMaxima.value * 0.6 ? estado = "Reprobó el curso" : estado = "Aprobó el curso";

    const estNuevo = new estudiante(nombre, definitiva, estado, estudiantes.length);

    estudiantes.length === estNuevo.position ? estudiantes.push(estNuevo) : estudiantes[estNuevo.position] = estNuevo;

    for (let i = 0; i < estNuevo.length; i += 1) {
        const [i] = estNuevo;
        console.log(estNuevo);
    }

    const inputs = document.querySelectorAll('[inputTag="input"]');
    for (i = 0; i < inputs.length; i += 1) {
        inputs[i].value = "";

    }

};


function mostrarEstudiantes(estudiantess) {

    if (isNoPressed2) {
        for (est of estudiantes) {
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<p> Nombre: ${est.nombre} </p>
                                <p> Nota Final: ${est.definitiva}</p>
                                <p> Estado: ${est.estado}</p>`;
            document.body.appendChild(contenedor);
            contenedor.setAttribute("class", 'containere');
        }
        isNoPressed2 = false;
    };
    estudiantess = estudiantes;
    exportNames = exportName;
};

botonGuardar.addEventListener("click", () => {

    notas = new Array(parseInt(cantidadNotas.value));
    porcentajes = new Array(parseInt(cantidadNotas.value));

    if (isNoPressed && isNaN(parseInt(cantidadNotas.value)) == false && isNaN(parseInt(notaMaxima.value)) == false) {

        desplegarNombre();
        desplegarFilas(cantidadNotas.value);
        isNoPressed = false;
        cantNotasRecordatorio = parseInt(cantidadNotas.value);
        botonGuardarActivado = true;
        botonAgregar = document.getElementById('Agregar');
        botonFinalizar = document.getElementById('Finalizar');

        botonAgregar.addEventListener("click", () => {

            Swal.fire({
                title: '¿Realmente desea calificar a otro estudiante?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {

                if (result.isConfirmed) {

                    AgregarDefinitiva();

                } else if (result.isDenied) {

                    mostrarEstudiantes();

                }
            })

        });

        filasForm.addEventListener('change', (e) => {

            const position = e.target.getAttribute("position");

            e.target.id.includes('nota') ? (nota = e.target.value) && (notas[position] = nota) : "";

            e.target.id.includes('porcentaje') ? (porcentaje = e.target.value) && (porcentajes[position] = porcentaje) : "";
        });

        botonFinalizar.addEventListener("click", () => {

            AgregarDefinitiva();
            mostrarEstudiantes();

        });

        nombreFormulario.addEventListener('change', (e) => {
            nombre = e.target.value
        })

    } else if (isNoPressed == false && cantNotasRecordatorio != parseInt(cantidadNotas.value) && isNaN(parseInt(cantidadNotas.value)) == false && isNaN(parseInt(notaMaxima.value)) == false) {

        filasForm.innerHTML = '';
        desplegarNombre();
        desplegarFilas(cantidadNotas.value);
        isNoPressed = false;
        cantNotasRecordatorio = parseInt(cantidadNotas.value);
        botonGuardarActivado = true;
        botonAgregar = document.getElementById('Agregar');
        botonFinalizar = document.getElementById('Finalizar');
        botonAgregar.addEventListener("click", () => {

            Swal.fire({
                title: '¿Realmente desea calificar a otro estudiante?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {

                if (result.isConfirmed) {

                    AgregarDefinitiva();

                } else if (result.isDenied) {

                    mostrarEstudiantes();

                }
            })

        });

        filasForm.addEventListener('click', (e) => {
            console.log(e);

        });

        botonFinalizar.addEventListener("click", () => {

            AgregarDefinitiva();
            mostrarEstudiantes();

        });

    } else if (isNoPressed == false && cantNotasRecordatorio == parseInt(cantidadNotas.value)) {

        filasForm.innerHTML = '';
        desplegarNombre();
        desplegarFilas(cantidadNotas.value);
        isNoPressed = false;
        cantNotasRecordatorio = parseInt(cantidadNotas.value);
        botonGuardarActivado = true;
        botonAgregar = document.getElementById('Agregar');
        botonFinalizar = document.getElementById('Finalizar');

        botonAgregar.addEventListener("click", () => {

            Swal.fire({
                title: '¿Realmente desea calificar a otro estudiante?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {

                if (result.isConfirmed) {

                    AgregarDefinitiva();

                } else if (result.isDenied) {

                    mostrarEstudiantes();

                }
            })

        });

        filasForm.addEventListener('click', (e) => {

            console.log(e);
        });

        botonFinalizar.addEventListener("click", () => {

            AgregarDefinitiva();
            mostrarEstudiantes();

        });

    } else {

        alert('Cuidado, ningún espacio puede ser vacío o tener un número menor a 0');
        console.log(isNaN(cantidadNotas.value));
    }

})

let saludoArr = ['Bienvenido al portal'];
let saludo2 = alert([...saludoArr, 'para calcular notas de estudiantes']);


