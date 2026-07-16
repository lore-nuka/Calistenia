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
const entrenamientos = {

principiante: [

[
"10 Flexiones",
"20 Sentadillas",
"15 Abdominales",
"30 segundos Plancha"
],

[
"12 Flexiones inclinadas",
"25 Sentadillas",
"20 Mountain Climbers",
"40 segundos Plancha"
],

[
"8 Burpees",
"15 Fondos en banco",
"20 Zancadas",
"30 Jumping Jacks"
]

],

intermedio: [

[
"20 Flexiones",
"40 Sentadillas",
"10 Dominadas",
"1 minuto Plancha"
],

[
"15 Fondos",
"30 Zancadas",
"20 Burpees",
"15 Elevaciones de piernas"
]

],

avanzado: [

[
"40 Flexiones",
"20 Dominadas",
"60 Sentadillas",
"2 minutos Plancha"
],

[
"25 Burpees",
"30 Fondos",
"20 Dominadas explosivas",
"100 Saltos"
]

]

};
function obtenerNivel(){

if(estado.nivel<=1)
return "principiante";

if(estado.nivel==2)
return "intermedio";

return "avanzado";

}
function generarEntrenamiento(){

const nivel = obtenerNivel();

const lista = entrenamientos[nivel];

const indice =
Math.floor(Math.random()*lista.length);

return lista[indice];

}
function mostrarEntrenamiento(){

const entrenamiento =
generarEntrenamiento();

alert(entrenamiento.join("\n"));

}
function completarEntrenamiento(){

    estado.puntos += 50;

    estado.fuerza += 1;

    estado.resistencia += 1;

    estado.dia += 1;

    guardarEstado();

    actualizarCabecera();

    alert("🎉 Entrenamiento completado.\n\n+50 puntos");

}
function subirNivel(){

    if(estado.puntos>=500){

        estado.nivel++;

        estado.puntos=0;

        guardarEstado();

        alert("🏆 ¡Has subido de nivel!");

    }

}
function finalizarSesion(){

    completarEntrenamiento();

    subirNivel();

}
