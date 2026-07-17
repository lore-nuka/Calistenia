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
// ===============================
// TEMPORIZADOR
// ===============================

let tiempo = 0;
let intervalo = null;

function iniciarTemporizador(segundos){

    clearInterval(intervalo);

    tiempo = segundos;

    actualizarTemporizador();

    intervalo = setInterval(()=>{

        tiempo--;

        actualizarTemporizador();

        if(tiempo<=0){

            clearInterval(intervalo);

            if(navigator.vibrate){
                navigator.vibrate([300,150,300]);
            }

            alert("✅ Tiempo terminado");

        }

    },1000);

}
function actualizarTemporizador(){

    const reloj = document.getElementById("temporizador");

    if(reloj){

        const min = Math.floor(tiempo/60);

        const seg = tiempo%60;

        reloj.innerHTML =
            String(min).padStart(2,"0")
            +":"
            +String(seg).padStart(2,"0");

    }

    const barra = document.getElementById("barraTiempo");

    if(barra){

        const porcentaje = Math.max(0,(tiempo/30)*100);

        barra.style.width = porcentaje+"%";

    }

}
// ===============================
// BOTONES
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    const play=document.getElementById("playBtn");

    if(play){

        play.addEventListener("click",()=>{

            iniciarTemporizador(30);

        });

    }

});
const finalizar=document.getElementById("finalizarBtn");

if(finalizar){

    finalizar.addEventListener("click",()=>{

        finalizarSesion();

    });
}
// ===============================
// NAVEGACIÓN ENTRE PANTALLAS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const empezarBtn = document.getElementById("empezarBtn");

    if (empezarBtn) {

        empezarBtn.addEventListener("click", () => {

            document.getElementById("pantallaInicio").style.display = "none";
            document.getElementById("pantallaCalendario").style.display = "block";

        });

    }
    // ===============================
// CALENDARIO
// ===============================

function crearCalendario() {

    const calendario = document.getElementById("calendario");

    if (!calendario) return;

    calendario.innerHTML = "";

    for (let i = 1; i <= 31; i++) {

        const boton = document.createElement("button");

        boton.textContent = "Día " + i;

        boton.style.margin = "8px";
        boton.style.width = "100%";

        boton.onclick = function () {

            document.getElementById("pantallaCalendario").style.display = "none";
            document.getElementById("pantallaEntreno").style.display = "block";

            document.getElementById("tituloDia").textContent = "Día " + i;

        };

        calendario.appendChild(boton);

    }

}

document.addEventListener("DOMContentLoaded", crearCalendario);

});
