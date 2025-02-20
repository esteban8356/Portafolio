document.addEventListener("DOMContentLoaded", function() {
  console.log("Portafolio de Esteban Muñoz García cargado exitosamente.");

  const progressBars = document.querySelectorAll('.progress-bar');
  const options = {
    threshold: 0.5
  };

  const fillProgressBar = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
        observer.unobserve(bar);
      }
    });
  };

  const observer = new IntersectionObserver(fillProgressBar, options);
  progressBars.forEach(bar => {
    observer.observe(bar);
  });

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const canvas = document.getElementById("bubbleCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let bubbles = [];
  const bubbleCount = 50;
  
  function initBubbles() {
    bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 20 + 5,
        speed: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }
  
  function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(57, 255, 20, ${bubble.alpha})`;
      ctx.fill();
    });
  }
  
  function updateBubbles() {
    bubbles.forEach(bubble => {
      bubble.y -= bubble.speed;
      if (bubble.y + bubble.r < 0) {
        bubble.y = canvas.height + bubble.r;
        bubble.x = Math.random() * canvas.width;
      }
    });
  }
  
  function animateBubbles() {
    drawBubbles();
    updateBubbles();
    requestAnimationFrame(animateBubbles);
  }
  
  initBubbles();
  animateBubbles();
});
