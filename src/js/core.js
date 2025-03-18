if(localStorage.getItem('reserva') !== null || localStorage.getItem('reserva') !== undefined) {
    obtenerReservas();
}
function obtenerReservas() {
    let reserva = JSON.parse(localStorage.getItem('reserva')) || [];
    if (!Array.isArray(reserva)) {
        console.warn("No hay reservas válidas en localStorage.");
        return;
    }
    const container = document.getElementById("reservasContainer");
    container.innerHTML = ""; // Limpia el contenedor antes de renderizar

    const fragment = document.createDocumentFragment();

    reserva.forEach((reserva) => {
        const card = document.createElement("div");
        card.classList.add("reserva-card");
        card.innerHTML = `<div class="card" style="width: 18rem;">
        <span class="badge bg-primary"> Numero de reserva: ${reserva.id}</span>
        <img src="https://fastly.picsum.photos/id/615/500/150.jpg?hmac=E3rgnIFxumRBv6_O1TJHt2tL-fjlasPsZhNU_Z9VKhg" class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">Nombre : ${reserva.nombre}</h5>
            <p class="card-text">Telefono : ${reserva.telefono}</p>
            <p class="card-text">Fecha : ${reserva.telefono}</p>
            <p class="card-text">Numero de personas : ${reserva.numero}</p>
            <a href="#" class="btn btn-primary">Ver Reserva</a>
        </div>
        </div><br>`;
        fragment.appendChild(card);

        
    });

    container.appendChild(fragment);

}
 class Reserva {

    static reservas = []; // Lista de todas las reservas
    static limitePorHora = 4; // Límite de reservas por hora y fecha
  
    constructor(id, nombre, telefono, fecha, hora, numero) {


        if (!Reserva.puedeReservar(fecha, hora)) {
            alert(`No se puede reservar a las ${hora} el ${fecha}, límite alcanzado.`);
            return false; 
        }


        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.numero = numero;


        Reserva.reservas.push(this);
    }

   static puedeReservar(fecha, hora) {
        // Filtra las reservas que coincidan con la misma fecha y hora
        const reservasEnHora = Reserva.reservas.filter(
        (reserva) => reserva.fecha === fecha && reserva.hora === hora
        );

        return reservasEnHora.length < Reserva.limitePorHora;
    }
                
  
}
var newreserva = [] ;
const reservar = document.getElementById('reservar');
reservar.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value = Date.now();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const numero = document.getElementById('numero').value;

    const reservas = new Reserva(id, nombre, telefono, fecha, numero);
      

    

    if(localStorage.getItem('reserva') === null || localStorage.getItem('reserva') === undefined) {
        localStorage.setItem('reserva', JSON.stringify([reservas]) );
    } else {    
        
        let reserva = JSON.parse(localStorage.getItem('reserva'));
       
        reserva.push(reservas);
        localStorage.setItem('reserva', JSON.stringify(reserva));
       
        
        /* localStorage.setItem('reserva', JSON.stringify(newreserva)); */
        console.log(reserva);

        /* let nuevaReserva = reserva.push(reserva);
        localStorage.setItem('reserva', JSON.stringify(nuevaReserva)); */


    }
    obtenerReservas();
    console.log(reservas);
});
/* console.log(new Reserva(1, "Juan", "123456789", "2025-03-18", "10:00", 2)); // ✅
console.log(new Reserva(2, "Ana", "987654321", "2025-03-18", "10:00", 3)); // ✅
console.log(new Reserva(3, "Carlos", "555555555", "2025-03-18", "10:00", 1)); // ✅
console.log(new Reserva(4, "Lucía", "111222333", "2025-03-18", "10:00", 4)); // ✅
console.log(new Reserva(5, "Pedro", "777888999", "2025-03-18", "10:00", 2));


console.log(Reserva.reservas); */ // ✅


/* function renderReservas() {
        const container = document.getElementById("reservasContainer");
        container.innerHTML = ""; // Limpia el contenedor antes de renderizar

        const fragment = document.createDocumentFragment(); // Fragmento para evitar múltiples reflows

        Reserva.reservas.forEach((reserva) => {
        const card = document.createElement("div");
        card.classList.add("reserva-card");
        card.innerHTML = `
            <h3>${reserva.nombre}</h3>
            <p>Teléfono: ${reserva.telefono}</p>
            <p>Fecha: ${reserva.fecha}</p>
            <p>Hora: ${reserva.hora}</p>
            <p>Número: ${reserva.numero}</p>
        `;
        fragment.appendChild(card);
        });

        container.appendChild(fragment); // Se añade todo el fragmento de una vez
    } */

    /* document.addEventListener("DOMContentLoaded", obtenerReservas); */