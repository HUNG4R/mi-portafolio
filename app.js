// 1. MEMORIA DEL SISTEMA
let inventario = [];

// 2. GESTIÓN DE INVENTARIO
function agregarAlInventario() {
    const nombre = document.getElementById('p-nombre').value;
    const cantidad = document.getElementById('p-cantidad').value;
    const fechaLlegada = document.getElementById('p-fecha-llegada').value;
    const fechaVence = document.getElementById('p-fecha-vence').value;

    if (nombre === "" || cantidad === "" || fechaVence === "") {
        alert("Por favor, completa los campos principales.");
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        cantidad: cantidad,
        llegada: fechaLlegada,
        vence: fechaVence,
        estado: calcularEstado(fechaVence)
    };

    inventario.push(nuevoProducto);
    actualizarTabla();
    limpiarFormulario();
}

function calcularEstado(fechaVencimiento) {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferenciaDias = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));

    if (diferenciaDias < 0) return '<span class="status-warn">VENCIDO</span>';
    if (diferenciaDias <= 7) return '<span class="status-warn">CRÍTICO (7d)</span>';
    return '<span class="status-safe">ESTABLE</span>';
}

function actualizarTabla() {
    const cuerpoTabla = document.getElementById('tabla-cuerpo');
    cuerpoTabla.innerHTML = ""; 
    let detalleVencidos = [];

    inventario.forEach(producto => {
        if (producto.estado.includes("VENCIDO")) {
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
        const listaParaCorreo = detalleVencidos.join("%0D%0A - ");
        const cuerpoMensaje = `ATENCIÓN: Se ha detectado stock vencido: %0D%0A%0D%0A - ${listaParaCorreo}`;
        const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${cuerpoMensaje}`;

        alerta.innerHTML = `<a href="${mailtoLink}" class="btn-alerta" style="text-decoration:none; display:inline-block;">⚠️ ENVIAR REPORTE: ${detalleVencidos.length} VENCIDOS</a>`;
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

function comprarProducto(nombreProducto) {
    const telefono = "573011368654"; // Reemplaza con tu número real (con código de país)
    const mensaje = `Hola! Me interesa comprar el producto: ${nombreProducto}`;
    
    // Codifica el mensaje para que sea una URL válida
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abre WhatsApp en una pestaña nueva
    window.open(url, '_blank');
}

/*Portal de Feedback Inteligente*/
function registrarYContinuar() {
    const nombre = document.getElementById('db-nombre').value;
    const correo = document.getElementById('db-correo').value;

    if (nombre === "" || correo === "") {
        alert("Por favor, introduce tus datos para continuar.");
        return;
    }

    // Cambiar de paso
    document.getElementById('dash-registro').style.display = 'none';
    document.getElementById('dash-feedback').style.display = 'block';

    // Saludo agradeciendo
    document.getElementById('saludo-personalizado').innerText = 
        `¡Gracias por tu visita, ${nombre}!`;
}

function calificar(nivel) {
    const msg = document.getElementById('feedback-msg');
    const telefono = "573011368654"; // Tu número

    if (nivel >= 4) {
        msg.style.color = "#2ecc71";
        msg.innerText = "¡Increíble! Me alegra que te guste. Redirigiendo para hablar de tu proyecto...";
        
        // Esperamos 2 segundos para que lea el mensaje y redirigimos
        setTimeout(() => {
            const waMsg = encodeURIComponent("¡Hola Edwin! Califiqué tu portafolio con un " + nivel + " y me gustaría hablar contigo para contratarte.");
            window.open(`https://wa.me/${telefono}?text=${waMsg}`, '_blank');
        }, 2000);

    } else {
        msg.style.color = "#555";
        msg.innerText = "¡Gracias por tu feedback! Seguiré mejorando cada día.";
    }
}
function actualizarMetricas() {
    // Simulamos que obtenemos datos de una base de datos
    const ventas = Math.floor(Math.random() * 5000000);
    const conversion = (Math.random() * 10).toFixed(1);

    document.getElementById('m-ventas').innerText = `$${ventas.toLocaleString()}`;
    document.getElementById('m-conversion').innerText = `${conversion}%`;

    // Animamos las barras del gráfico
    const barras = document.querySelectorAll('.bar');
    barras.forEach(bar => {
        const nuevaAltura = Math.floor(Math.random() * 100) + 10;
        bar.style.height = `${nuevaAltura}%`;
    });
}