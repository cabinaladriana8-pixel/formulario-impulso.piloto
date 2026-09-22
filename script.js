document.addEventListener('DOMContentLoaded', () => {
  // Casillas de una sola opción por grupo
  document.querySelectorAll('[data-check]').forEach(box => {
    box.addEventListener('change', () => {
      if (!box.checked) return;
      document.querySelectorAll(`[data-check="${box.dataset.check}"]`).forEach(x => {
        if (x !== box) x.checked = false;
      });
    });
  });

  // Archivos cargados
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.files.length && input.nextElementSibling) {
        input.nextElementSibling.classList.add('ok');
      }
    });
  });

  // Firma digital: un solo sistema de dibujo, compatible con mouse, dedo y lápiz.
  const canvas = document.getElementById('firma');
  const limpiar = document.getElementById('limpiarFirma');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const configurarCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#17324d';
  };

  // Espera a que el tamaño responsive esté calculado.
  requestAnimationFrame(configurarCanvas);

  let dibujando = false;
  let ultimo = null;

  const posicion = e => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  canvas.addEventListener('pointerdown', e => {
    e.preventDefault();
    dibujando = true;
    ultimo = posicion(e);
    canvas.setPointerCapture?.(e.pointerId);
    ctx.beginPath();
    ctx.moveTo(ultimo.x, ultimo.y);
  });

  canvas.addEventListener('pointermove', e => {
    if (!dibujando) return;
    e.preventDefault();
    const actual = posicion(e);
    ctx.beginPath();
    ctx.moveTo(ultimo.x, ultimo.y);
    ctx.lineTo(actual.x, actual.y);
    ctx.stroke();
    ultimo = actual;
  });

  const terminar = e => {
    if (!dibujando) return;
    e.preventDefault();
    dibujando = false;
    ultimo = null;
    try { canvas.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };

  canvas.addEventListener('pointerup', terminar);
  canvas.addEventListener('pointercancel', terminar);
  canvas.addEventListener('pointerleave', e => {
    if (e.pointerType === 'mouse' && dibujando) terminar(e);
  });

  limpiar?.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  window.addEventListener('resize', () => {
    // No redimensionamos mientras el usuario está firmando.
    if (!dibujando) configurarCanvas();
  });
});

function imprimir() {
  window.print();
}
