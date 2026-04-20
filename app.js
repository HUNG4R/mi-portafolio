// DECLARA EL ARRAY AL PRINCIPIO
let productos = []; 

function agregarAlInventario() {
    const nombreInput = document.getElementById('p-nombre');
    const fechaInput = document.getElementById('p-fecha');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    if (nombreInput.value === "" || fechaInput.value === "") {
        alert("Por favor llena ambos campos.");
        return;
    }

    const hoy = new Date();
    const fechaVence = new Date(fechaInput.value);
    const diffTime = fechaVence - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        mensajeAlerta.innerHTML = `⚠️ El último item añadido (${nombreInput.value}) vence en <strong>${diffDays} días</strong>.`;
        mensajeAlerta.style.color = diffDays <= 5 ? "#ff3b30" : "#1a1a1a";
    } else if (diffDays === 0) {
        mensajeAlerta.innerHTML = `🚨 ¡El producto ${nombreInput.value} vence HOY!`;
        mensajeAlerta.style.color = "#ff3b30";
    } else {
        mensajeAlerta.innerHTML = `❌ El producto ${nombreInput.value} ya está vencido.`;
    }

    productos.push({
        nombre: nombreInput.value,
        fecha: fechaInput.value,
        avisado: false
    });

    nombreInput.value = "";
    fechaInput.value = "";
    renderTable(); // Esta función falta en tu código original, agrégala abajo
}

// AGREGA ESTA FUNCIÓN PARA QUE SE VEAN LOS PRODUCTOS EN LA TABLA
function renderTable() {
    const tabla = document.getElementById('tabla-cuerpo');
    tabla.innerHTML = ""; // Limpia la tabla
    
    productos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.fecha}</td>
            <td><span class="status-safe">ACTIVO</span></td>
        `;
        tabla.appendChild(fila);
    });
}