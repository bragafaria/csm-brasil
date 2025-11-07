// app/components/ConnectionsParticles.js
"use client";

import { useEffect, useRef } from "react";

export default function ConnectionsParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    new ResizeObserver(resize).observe(parent);

    let particles = [];
    const colors = ["#5033c0", "#5f3de0", "#bf00ff", "#feea00"];
    const TOTAL_PARTICLES = 32; // ← AQUI VOCÊ MANDOU: SÓ 32!
    let frame = 0;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 300;
        this.y = canvas.height / 2 + (Math.random() - 0.5) * 300;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 3 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 0;
        this.maxLife = 400 + Math.random() * 300;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        if (this.life % 40 === 0) {
          this.vx += (Math.random() - 0.5) * 0.4;
          this.vy += (Math.random() - 0.5) * 0.4;
        }

        // Respawn se sair da tela ou viver demais
        if (
          this.life >= this.maxLife ||
          this.x < -100 ||
          this.x > canvas.width + 100 ||
          this.y < -100 ||
          this.y > canvas.height + 100
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
      }
    }

    // Cria exatamente 32 partículas de uma vez
    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Fade suave (muito leve)
      ctx.fillStyle = "rgba(11, 14, 17, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenha conexões (só 32 partículas = rapidíssimo)
      if (frame % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (dist < 180) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(80, 51, 192, ${0.6 - dist / 300})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Atualiza e desenha partículas
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      ctx.shadowBlur = 0; // reset shadow
      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
