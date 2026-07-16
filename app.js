// ===============================
// CALISTENIA PRO
// ===============================

let estado = {
    dia: 1,
    puntos: 0,
    nivel: 1,
    fuerza: 0,
    resistencia: 0,
    movilidad: 0,
    sesiones: []
};

function guardarEstado(){
    localStorage.setItem(
        "calistenia_estado",
        JSON.stringify(estado)
    );
}

function cargarEstado(){

    const datos =
        localStorage.getItem("calistenia_estado");

    if(datos){

        estado = JSON.parse(datos);

    }

}
function actualizarCabecera(){

    const dia = document.getElementById("diaActual");
    const puntos = document.getElementById("puntosActuales");

    if(dia)
        dia.textContent = estado.dia;

    if(puntos)
        puntos.textContent = estado.puntos;

}
window.onload = function(){

    cargarEstado();

    actualizarCabecera();

}
