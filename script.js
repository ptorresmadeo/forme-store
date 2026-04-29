// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('oculto');
  }, 2000);
});

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05 });

function observarCards() {
  document.querySelectorAll('.producto-card').forEach(card => {
    observer.observe(card);
  });
}

// PARALLAX EN EL HERO
// EFECTO SCROLL - estilo Nude Project
window.addEventListener('scroll', () => {
  const heroContent = document.getElementById('hero-content');
  const scrollY = window.scrollY;

  if (scrollY > 80) {
    heroContent.classList.add('scrolled');
  } else {
    heroContent.classList.remove('scrolled');
  }
});

// CATEGORIAS FOR HIM / FOR HER
function setCategoria(categoria) {
  const btnHim = document.getElementById('btn-him');
  const btnHer = document.getElementById('btn-her');

  btnHim.classList.remove('activo');
  btnHer.classList.remove('activo');

  if (categoria === 'him') {
    btnHim.classList.add('activo');
  } else {
    btnHer.classList.add('activo');
  }

  renderProductos(categoria);
}

// PRODUCTOS
const productos = {
  him: [
    { id: 1, nombre: 'Zip Hoodie Tartan', precio: 38500, emoji: '🧥', badge: 'NUEVO', tallas: ['S','M','L','XL'] },
    { id: 2, nombre: '6-Panel Star Cap', precio: 14000, emoji: '🧢', badge: 'SOLD OUT', tallas: ['ONE SIZE'] },
    { id: 3, nombre: 'Cargo Baggy', precio: 26900, emoji: '👖', badge: 'LAST', tallas: ['M','L'] },
    { id: 4, nombre: 'Oversized Tee', precio: 18900, emoji: '👕', badge: 'NUEVO', tallas: ['S','M','L','XL'] },
  ],
  her: [
    { id: 5, nombre: 'Crop Hoodie', precio: 32000, emoji: '🧥', badge: 'NUEVO', tallas: ['XS','S','M'] },
    { id: 6, nombre: 'Mini Skirt Tartan', precio: 22000, emoji: '👗', badge: 'NUEVO', tallas: ['XS','S','M','L'] },
    { id: 7, nombre: 'Baby Tee Star', precio: 16500, emoji: '👕', badge: 'LAST', tallas: ['XS','S','M'] },
    { id: 8, nombre: 'Bucket Hat', precio: 12000, emoji: '🎩', badge: 'SOLD OUT', tallas: ['ONE SIZE'] },
  ]
};

function renderProductos(categoria) {
  const grid = document.getElementById('productos-grid');
  const lista = productos[categoria];

  grid.innerHTML = lista.map(p => `
    <article class="producto-card">
      <div class="producto-img">
        <span class="producto-badge ${p.badge === 'SOLD OUT' ? 'sold' : ''}">${p.badge}</span>
        <span>${p.emoji}</span>
      </div>
      <div class="producto-info">
        <p class="producto-nombre">${p.nombre}</p>
        <p class="producto-precio">$${p.precio.toLocaleString('es-AR')}</p>
        <div class="producto-tallas">
          ${p.tallas.map(t => `<span class="talla">${t}</span>`).join('')}
        </div>
        <button class="btn-agregar" onclick="agregarAlCarrito(${p.id}, '${p.nombre}', ${p.precio})" ${p.badge === 'SOLD OUT' ? 'disabled' : ''}>
          ${p.badge === 'SOLD OUT' ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
        </button>
      </div>
    </article>
  `).join('');

  setTimeout(() => observarCards(), 50);
}

// CARRITO
let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const items = document.getElementById('carrito-items');
  const total = document.getElementById('total');
  const count = document.getElementById('cart-count');

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  count.textContent = totalItems;
  total.textContent = totalPrecio.toLocaleString('es-AR');

  if (carrito.length === 0) {
    items.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
    return;
  }

  items.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
    </div>
  `).join('');
}

// Mostrar productos him por defecto
setCategoria('him');
// VALIDACIÓN DEL FORMULARIO
document.getElementById('form-contacto').addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  let valido = true;

  // Validar nombre
  if (nombre === '') {
    document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
    valido = false;
  } else {
    document.getElementById('error-nombre').textContent = '';
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    document.getElementById('error-email').textContent = 'El email es obligatorio.';
    valido = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('error-email').textContent = 'Ingresá un email válido.';
    valido = false;
  } else {
    document.getElementById('error-email').textContent = '';
  }

  // Validar mensaje
  if (mensaje === '') {
    document.getElementById('error-mensaje').textContent = 'El mensaje es obligatorio.';
    valido = false;
  } else if (mensaje.length < 10) {
    document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 10 caracteres.';
    valido = false;
  } else {
    document.getElementById('error-mensaje').textContent = '';
  }

  // Si todo está bien
  if (valido) {
    alert('¡Mensaje enviado! Nos contactamos pronto.');
    document.getElementById('form-contacto').reset();
  }
});