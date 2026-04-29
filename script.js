// LOADER - oculta la pantalla de carga después de 2 segundos
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('oculto');
  }, 2000);
});