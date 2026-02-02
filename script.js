function openLetter() {
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => {
    document.getElementById('letter').classList.add('visible');
    createConfetti(10);
  }, 400);
}

function personalize() {
  const name = document.getElementById('userName').value;
  if (name.trim() !== "") {
    document.getElementById('greeting').innerText = `¡Feliz Día del Amor y la Amistad, ${name}! 🥳`;
    createConfetti(5);
  }
}

function createConfetti(num) {
  for (let i = 0; i < num; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = ['#74C0FC', '#A7F3D0', '#FFD43B', '#FF92AB'][Math.floor(Math.random() * 4)];
    confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2500);
  }
}

async function downloadImage() {
  const letter = document.getElementById('letter');
  const controls = document.getElementById('controls');
  const btnSave = document.querySelector('.btn-save');
  
  // Feedback visual
  const originalText = btnSave.innerText;
  btnSave.innerText = "Generando imagen...";
  
  // 1. Ocultamos los botones antes de la foto
  controls.style.display = 'none';
  
  // 2. Usamos html2canvas para crear la imagen
  // useCORS: true es vital para cargar la imagen externa en la captura
  try {
    const canvas = await html2canvas(letter, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    // 3. Convertir a imagen y descargar
    const link = document.createElement('a');
    link.download = 'tarjeta-amistad-especial.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error("Error al generar la imagen", err);
    alert("Hubo un problema generando la imagen. Por favor intenta de nuevo.");
  } finally {
    // 4. Volvemos a mostrar los botones y restauramos texto
    controls.style.display = 'flex';
    btnSave.innerText = originalText;
  }
}