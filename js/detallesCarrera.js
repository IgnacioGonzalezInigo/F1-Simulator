let pilotos = JSON.parse(localStorage.getItem("pilotos"))

function cargarPodio (){
    let i = 1
    pilotos.forEach (piloto => {
        const divPosicion = document.createElement("div")
        divPosicion.classList.add("fila-podio")
        
        const urlPosicion = '../img/'+ (i) +'.png'
        const urlPiloto = '../img/' + (piloto.nombre) + '.png'
        let puntos = 0

        divPosicion.innerHTML = `<img src = "${urlPosicion}" class = "img-div"></img>`
        divPosicion.innerHTML += `<img src = "${urlPiloto}" class = "img-div"></img>`
        divPosicion.innerHTML += `<h4> ${piloto.nombre} </h4>`
        
        i++

        document.getElementById("detalles-carrera").appendChild(divPosicion)

    })
}

cargarPodio()