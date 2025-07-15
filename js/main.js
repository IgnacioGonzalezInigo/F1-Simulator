let pilotos = [
    { nombre: "Verstappen", puntos: 0 },
    { nombre: "Norris", puntos: 0 },
    { nombre: "Leclerc", puntos: 0 },
    { nombre: "Hamilton", puntos: 0 },
    { nombre: "Colapinto", puntos: 0 },
]

const puntaje = [25,15,10]
const vueltasCargadas = []


function mostrarRanking (){
    pilotos.sort((a,b) => b.puntos - a.puntos)
    divRanking.innerHTML = `<ul>`
    pilotos.forEach(piloto => {
        divRanking.innerHTML += `<li>${piloto.nombre} - ${piloto.puntos} pts</li>`
    })
    divRanking.innerHTML += `</ul>`
}

function simularCarrera(){
    // ACLARACION!! La logica para ordenar de manera aleatoria la saque de videos de youtube .
    // ordeno la lista de manera aleatoria y asigno puntajes en el orden que quedaron, recorriendo la lista con el mismo index que el array puntaje.
    pilotos.sort(() => Math.random() - 0.5)
    for (i = 0 ; i < 3; i++){
        pilotos[i].puntos += puntaje[i]
    }
    divSimular.innerHTML = `<p> ${pilotos[0].nombre} gano la carrera!. Tabla actualizada</p>`

    let guardarPilotos = JSON.stringify (pilotos)
    localStorage.setItem ("pilotos", guardarPilotos)

    mostrarRanking()
}

function cargarVuelta() {
    let tiempo = document.getElementById("tiempo").value
    let circuito = document.getElementById("circuito").value
    let piloto = document.getElementById("piloto").value
    let neumatico = document.getElementById("neumatico").value

    if (tiempo !== "" && circuito !== "" && piloto !== "" && neumatico !== "" && tiempo >= 50) {
        let vuelta = {
        piloto,
        circuito,
        tiempo,
        neumatico,
        }
        vueltasCargadas.push(vuelta)

        let guardarVuelta = JSON.stringify (vueltasCargadas)
        localStorage.setItem ("vueltas", guardarVuelta)

        divVuelta.innerHTML = `<p> Vuelta cargada con exito. </p><p>Piloto: ${vuelta.piloto} ,  Circuito: ${vuelta.circuito} ,  Tiempo: ${vuelta.tiempo} seg ,  Neumatico: ${vuelta.neumatico}</p>`
    }
    else {
        divVuelta.innerHTML = `<p> tenes que completar todos los datos, recorda que usando tiempos realistas, el tiempo debe ser mayor a 50seg</p>`
    }

}

function verVueltasDe (){
    let i = 0
    let piloto = document.getElementById("vueltas-de-piloto").value;
    let vueltasDe = vueltasCargadas.filter(function(vuelta){
        return vuelta.piloto === piloto
    })

    if (piloto !== ""){
        divVerVueltasDe.innerHTML = `<h2>VUELTAS DE ${piloto} </h2>`
        if (vueltasDe.length === 0){
            divVerVueltasDe.innerHTML += `<p>No se encontraron vueltas registradas</p>`
        }
        else {
            for (const vuelta of vueltasDe){
                i++
                divVerVueltasDe.innerHTML += `<div class = vuelta><h4> Vuelta ${i} </h4> `
                divVerVueltasDe.innerHTML += `<p>Circuito: ${vuelta.circuito}, Tiempo: ${vuelta.tiempo} seg , Neumatico: ${vuelta.neumatico}</p></div>`
            }
        }
    }
    else {
        divVerVueltasDe.innerHTML = `<p> Debes seleccionar un piloto </p>`
    }
}

function verVueltaRapida (){
    let circuito = document.getElementById('vuelta-rapida-de').value
    let vueltasDelCircuito = vueltasCargadas.filter(function(vuelta){
        return vuelta.circuito === circuito
    })

    if (circuito !== ""){
        divVueltaRapida.innerHTML += `<h2> VUELTA RAPIDA EN ${circuito} </h2>`
        if (vueltasDelCircuito.length === 0){
            divVueltaRapida.innerHTML += `<p> Aun no hay vueltas cargadas en ${circuito} </p>`
        }
        else {
            let vueltaRapida = vueltasDelCircuito[0]
            for (const vuelta of vueltasDelCircuito) {
                if (vueltaRapida > vuelta.tiempo){
                    vueltaRapida = vuelta
                }
            }
            divVueltaRapida.innerHTML += `<p>Piloto: ${vueltaRapida.piloto}</p><p>Tiempo: ${vueltaRapida.tiempo} seg</p><p>Neumatico: ${vueltaRapida.neumatico}</p></div>`
        }
    }
    else{
        divVueltaRapida.innerHTML = `<p>Debes seleccionar un circuito </p>`
    }
}

let botonRanking = document.getElementById('btn-ranking')
let divRanking = document.getElementById('div-ranking')

botonRanking.addEventListener("click", mostrarRanking)

let botonCarrera = document.getElementById('btn-simular')
botonCarrera.addEventListener("click",simularCarrera)
let divSimular = document.getElementById('div-carrera')

let botonVuelta = document.getElementById('btn-cargar-vuelta')
botonVuelta.addEventListener("click",cargarVuelta)
let divVuelta = document.getElementById('div-cargar-vuelta')

let botonVerVueltasDe = document.getElementById('btn-ver-vueltas-de')
botonVerVueltasDe.addEventListener("click",verVueltasDe)
let divVerVueltasDe = document.getElementById('div-vueltas-de')

let botonVerVueltaRapida = document.getElementById('btn-ver-vuelta-rapida')
botonVerVueltaRapida.addEventListener("click",verVueltaRapida)
let divVueltaRapida = document.getElementById('div-vuelta-rapida')

let botonReset = document.getElementById('btn-reset')
botonReset.addEventListener("click", () => {
    localStorage.clear()

    pilotos.forEach(piloto => piloto.puntos = 0)
    localStorage.setItem("pilotos", JSON.stringify(pilotos))

    vueltasCargadas.length = 0
    localStorage.setItem("vueltas", JSON.stringify(vueltasCargadas))

    divRanking.innerHTML = ""
    divSimular.innerHTML = ""
    divVuelta.innerHTML = ""
    divVerVueltasDe.innerHTML = ""
    divVueltaRapida.innerHTML = ""
} )