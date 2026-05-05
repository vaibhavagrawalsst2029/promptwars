import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    // Particles with 3D z-depth
    const COUNT = 120;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.8,
        // Gold or silver
        isGold: Math.random() > 0.4,
      });
    }

    // Floating geometric shapes
    const shapes = [];
    for (let i = 0; i < 6; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500 + 200,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: i % 3, // 0=diamond, 1=hexagon, 2=triangle
        isGold: Math.random() > 0.5,
      });
    }

    const project = (x, y, z, w, h) => {
      const fov = 800;
      const scale = fov / (fov + z);
      return {
        x: (x - w / 2) * scale + w / 2,
        y: (y - h / 2) * scale + h / 2,
        scale,
      };
    };

    const drawShape = (ctx, shape, projected) => {
      const { size, rotation, type, isGold } = shape;
      const s = size * projected.scale;
      const alpha = Math.max(0, 0.15 - shape.z / 5000) * 1.5;
      if (alpha <= 0) return;

      ctx.save();
      ctx.translate(projected.x, projected.y);
      ctx.rotate(rotation);
      ctx.strokeStyle = isGold
        ? `rgba(212, 175, 55, ${alpha})`
        : `rgba(192, 192, 192, ${alpha})`;
      ctx.lineWidth = projected.scale * 1.5;
      ctx.beginPath();

      if (type === 0) {
        // Diamond
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.6, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.6, 0);
        ctx.closePath();
      } else if (type === 1) {
        // Hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = Math.cos(angle) * s * 0.6;
          const py = Math.sin(angle) * s * 0.6;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
      } else {
        // Triangle
        ctx.moveTo(0, -s * 0.7);
        ctx.lineTo(s * 0.6, s * 0.5);
        ctx.lineTo(-s * 0.6, s * 0.5);
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Update & project particles
      const projected = particles.map((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        if (p.z < 0) p.z = 1000;
        if (p.z > 1000) p.z = 0;

        // Mouse repulsion (subtle)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        const pr = project(p.x, p.y, p.z, w, h);
        return { ...pr, isGold: p.isGold, z: p.z };
      });

      // Draw connections (only nearby particles)
      const connDist = 140;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connDist) {
            const alpha = (1 - d / connDist) * 0.12 * Math.min(a.scale, b.scale);
            const isGoldLine = a.isGold && b.isGold;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isGoldLine
              ? `rgba(212, 175, 55, ${alpha})`
              : `rgba(192, 192, 192, ${alpha * 0.7})`;
            ctx.lineWidth = Math.min(a.scale, b.scale) * 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles (depth-sorted)
      projected
        .sort((a, b) => b.z - a.z)
        .forEach((p) => {
          const radius = p.scale * 2.2;
          const alpha = p.scale * 0.8;
          const glow = p.scale * 6;

          // Glow
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
          if (p.isGold) {
            grad.addColorStop(0, `rgba(212, 175, 55, ${alpha * 0.3})`);
            grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          } else {
            grad.addColorStop(0, `rgba(220, 220, 230, ${alpha * 0.2})`);
            grad.addColorStop(1, 'rgba(220, 220, 230, 0)');
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.isGold
            ? `rgba(212, 175, 55, ${alpha})`
            : `rgba(210, 210, 220, ${alpha * 0.7})`;
          ctx.fill();
        });

      // Draw floating shapes
      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        if (s.x < -100) s.x = w + 100;
        if (s.x > w + 100) s.x = -100;
        if (s.y < -100) s.y = h + 100;
        if (s.y > h + 100) s.y = -100;
        const sp = project(s.x, s.y, s.z, w, h);
        drawShape(ctx, s, sp);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
