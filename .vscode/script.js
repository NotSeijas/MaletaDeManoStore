const productos = [
  { nombre: "Vinagre de manzana en gomitas", precio: 150 },
  { nombre: "Centrum Women +50", precio: 120 },
  { nombre: "Triple Omega 3-6-9", precio: 130 },
  { nombre: "Multivitamínico diario", precio: 110 },
  { nombre: "Colágeno hidrolizado", precio: 90 },
];

const carrito = [];

const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const mensajeWhatsApp = document.getElementById("mensaje-whatsapp");
const botonWhatsApp = document.getElementById("whatsapp-button");

function agregarAlCarrito(index) {
  const producto = productos[index];
  const existente = carrito.find((p) => p.nombre === producto.nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(Number(index), 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  if (!listaCarrito || !totalElemento || !mensajeWhatsApp || !botonWhatsApp)
    return;

  listaCarrito.innerHTML = "";

  let total = 0;
  let mensaje = "";

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} x${producto.cantidad} - S/ ${subtotal.toFixed(2)}
      <button class="eliminar-btn" data-index="${index}">Eliminar</button>
    `;

    listaCarrito.appendChild(li);
    mensaje += `• ${producto.nombre} x${
      producto.cantidad
    } - S/ ${subtotal.toFixed(2)}\n`;
  });

  totalElemento.textContent = `Total: S/. ${total.toFixed(2)}`;
  mensajeWhatsApp.textContent = carrito.length
    ? mensaje
    : "Tu carrito está vacío";

  // Actualizar el enlace de WhatsApp
  const mensajeFinal = carrito.length
    ? `${mensaje}\nTotal: S/. ${total.toFixed(2)}`
    : "Mi carrito está vacío.";
  botonWhatsApp.href = `https://wa.me/1234567890?text=${encodeURIComponent(
    mensajeFinal
  )}`;

  // Agregar eventos a botones de eliminar
  document.querySelectorAll(".eliminar-btn").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      eliminarDelCarrito(index);
    });
  });
}
