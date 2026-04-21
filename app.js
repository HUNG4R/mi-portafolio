// Arreglo para almacenar los productos en memoria
let inventario = [];

function agregarAlInventario() {
    // 1. Capturar los valores de los inputs
    const nombre = document.getElementById('p-nombre').value;
    const cantidad = document.getElementById('p-cantidad').value;
    const fechaLlegada = document.getElementById('p-fecha-llegada').value;
    const fechaVence = document.getElementById('p-fecha-vence').value;
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    // 2. Validación básica de campos vacíos
    if (nombre === "" || cantidad === "" || fechaVence === "") {
        alert("Por favor, completa los campos principales.");
        return;
    }

    // 3. Crear el objeto del producto
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        cantidad: cantidad,
        llegada: fechaLlegada,
        vence: fechaVence,
        estado: calcularEstado(fechaVence)
    };

    // 4. Guardar en el arreglo y actualizar la tabla
    inventario.push(nuevoProducto);
    actualizarTabla();
    limpiarFormulario();
}

function calcularEstado(fechaVencimiento) {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    
    // Calculamos la diferencia en días
    const diferenciaDias = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));

    if (diferenciaDias < 0) {
        return '<span class="status-warn">VENCIDO</span>';
    } else if (diferenciaDias <= 7) {
        return '<span class="status-warn">CRÍTICO (7d)</span>';
    } else {
        return '<span class="status-safe">ESTABLE</span>';
    }
}

function actualizarTabla() {
    const cuerpoTabla = document.getElementById('tabla-cuerpo');
    cuerpoTabla.innerHTML = ""; // Limpiar tabla antes de rellenar

    inventario.forEach(producto => {
        const fila = `
            <tr>
                <td>${producto.nombre} (${producto.cantidad})</td>
                <td>${producto.vence}</td>
                <td>${producto.estado}</td>
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });

    // Actualizar mensaje de sistema
    const alerta = document.getElementById('mensaje-alerta');
    const hayVencidos = inventario.some(p => p.estado.includes("VENCIDO") || p.estado.includes("CRÍTICO"));
    
    if (hayVencidos) {
        alerta.innerHTML = '<button class="btn-alerta">⚠️ REVISAR STOCK CRÍTICO</button>';
    } else {
        alerta.innerHTML = 'SISTEMA DE MONITOREO ACTIVO';
    }
}

function limpiarFormulario() {
    document.getElementById('p-nombre').value = "";
    document.getElementById('p-cantidad').value = "";
    document.getElementById('p-fecha-llegada').value = "";
    document.getElementById('p-fecha-vence').value = "";
    document.getElementById('p-nombre').focus();
}

function actualizarTabla() {
    const cuerpoTabla = document.getElementById('tabla-cuerpo');
    cuerpoTabla.innerHTML = ""; 

    // Filtrar cuáles están vencidos para el correo
    let productosVencidos = [];

    inventario.forEach(producto => {
        if (producto.estado.includes("VENCIDO")) {
            productosVencidos.push(producto.nombre);
        }

        const fila = `
            <tr>
                <td>${producto.nombre} (${producto.cantidad})</td>
                <td>${producto.vence}</td>
                <td>${producto.estado}</td>
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });

    const alerta = document.getElementById('mensaje-alerta');
    
    if (productosVencidos.length > 0) {
        // Creamos el contenido del correo
        const destinatario = "gerente@empresa.com"; // Puedes cambiarlo
        const asunto = "URGENTE: Cambio de Stock por Vencimiento";
        const cuerpoMensaje = `Hola, se requiere el cambio urgente de los siguientes productos vencidos en el sistema: %0D%0A%0D%0A - ${productosVencidos.join("%0D%0A - ")} %0D%0A%0D%0AFavor gestionar el cambio a la brevedad.`;
        
        const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${cuerpoMensaje}`;

        // El botón ahora tiene el link de correo
        alerta.innerHTML = `<a href="${mailtoLink}" class="btn-alerta" style="text-decoration:none; display:inline-block;">⚠️ ENVIAR CORREO DE CAMBIO URGENTE</a>`;
    } else {
        alerta.innerHTML = 'SISTEMA DE MONITOREO ACTIVO';
    }
}

function actualizarTabla() {
    const cuerpoTabla = document.getElementById('tabla-cuerpo');
    cuerpoTabla.innerHTML = ""; 

    // Arreglo para guardar los detalles de los vencidos
    let detalleVencidos = [];

    inventario.forEach(producto => {
        // Verificamos si el estado es VENCIDO
        if (producto.estado.includes("VENCIDO")) {
            // Guardamos el nombre y la cantidad formateados
            detalleVencidos.push(`${producto.nombre} (Cantidad: ${producto.cantidad})`);
        }

        const fila = `
            <tr>
                <td>${producto.nombre} (${producto.cantidad})</td>
                <td>${producto.vence}</td>
                <td>${producto.estado}</td>
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });

    const alerta = document.getElementById('mensaje-alerta');
    
    if (detalleVencidos.length > 0) {
        const destinatario = "gerente@empresa.com";
        const asunto = "URGENTE: Retiro de Stock Vencido";
        
        // Creamos la lista detallada para el cuerpo del correo
        const listaParaCorreo = detalleVencidos.join("%0D%0A - "); // %0D%0A es el salto de línea en URL
        
        const cuerpoMensaje = `ATENCIÓN: Se ha detectado stock vencido que requiere retiro inmediato: %0D%0A%0D%0A - ${listaParaCorreo} %0D%0A%0D%0A Por favor, confirmar el cambio de estas unidades.`;
        
        const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${cuerpoMensaje}`;

        alerta.innerHTML = `<a href="${mailtoLink}" class="btn-alerta" style="text-decoration:none; display:inline-block;">⚠️ ENVIAR REPORTE: ${detalleVencidos.length} PRODUCTO(S) VENCIDOS</a>`;
    } else {
        alerta.innerHTML = 'SISTEMA DE MONITOREO ACTIVO';
    }
}
