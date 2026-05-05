import { useEffect, useRef } from 'react';

export default function PortfolioCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

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

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '192, 192, 192';
    };

    // Theme color and silver
    const accentRgb = hexToRgb(theme?.colors?.accent || '#C0C0C0');
    const colors = [
      `rgba(${accentRgb},`,   // Theme Accent
      `rgba(${accentRgb},`,   // Theme Accent (more weight)
      'rgba(192, 192, 192,',  // Silver
      'rgba(220, 220, 230,',  // Light Silver
    ];

    // Particles with 3D z-depth and crazy paths
    const COUNT = 150;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // Reduced speed
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 1,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.05 + 0.01,
      });
    }

    // Crazy shapes
    const shapes = [];
    for (let i = 0; i < 10; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 800 + 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        type: Math.floor(Math.random() * 4), // 0=diamond, 1=hexagon, 2=triangle, 3=star
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const project = (x, y, z, w, h) => {
      const fov = 600; // tighter FOV for more dramatic depth
      const scale = fov / (fov + z);
      return {
        x: (x - w / 2) * scale + w / 2,
        y: (y - h / 2) * scale + h / 2,
        scale,
      };
    };

    const drawShape = (ctx, shape, projected) => {
      const { size, rotation, type, colorPrefix, pulse } = shape;
      const pulseFactor = 1 + Math.sin(time * 1.5 + pulse) * 0.2; // Softer pulse
      const s = size * projected.scale * pulseFactor;
      const alpha = Math.max(0, 0.15 - shape.z / 4000); // Lower opacity
      if (alpha <= 0) return;

      ctx.save();
      ctx.translate(projected.x, projected.y);
      ctx.rotate(rotation);
      ctx.strokeStyle = `${colorPrefix} ${alpha})`;
      ctx.lineWidth = projected.scale * 2.5;
      
      // Glow for shapes
      ctx.shadowBlur = 15;
      ctx.shadowColor = `${colorPrefix} ${alpha * 2})`;

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
      } else if (type === 2) {
        // Triangle
        ctx.moveTo(0, -s * 0.7);
        ctx.lineTo(s * 0.6, s * 0.5);
        ctx.lineTo(-s * 0.6, s * 0.5);
        ctx.closePath();
      } else {
        // Star
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? s : s * 0.4;
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Update & project particles
      const projected = particles.map((p) => {
        // Softer sine wave movement
        p.x += p.vx + Math.sin(time * 1.5 + p.phase) * 0.8;
        p.y += p.vy + Math.cos(time + p.phase) * 0.8;
        p.z += p.vz;

        // Wrap
        if (p.x < -100) p.x = w + 100;
        if (p.x > w + 100) p.x = -100;
        if (p.y < -100) p.y = h + 100;
        if (p.y > h + 100) p.y = -100;
        if (p.z < 0) p.z = 1000;
        if (p.z > 1000) p.z = 0;

        // Stronger mouse repulsion (but less violent than before)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 5;
          p.y += (dy / dist) * force * 5;
        }

        const pr = project(p.x, p.y, p.z, w, h);
        return { ...pr, colorPrefix: p.colorPrefix, z: p.z, phase: p.phase };
      });

      // Draw connections
      const connDist = 160;
      ctx.globalCompositeOperation = 'screen'; // Make overlapping colors vibrant
      
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          
          // Connect if close
          if (d < connDist) {
            const alpha = (1 - d / connDist) * 0.15 * Math.min(a.scale, b.scale);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            // Use gradient for lines connecting different colors
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `${a.colorPrefix} ${alpha})`);
            grad.addColorStop(1, `${b.colorPrefix} ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = Math.min(a.scale, b.scale) * 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles (depth-sorted)
      projected
        .sort((a, b) => b.z - a.z)
        .forEach((p) => {
          // Pulsing size based on time and phase
          const pulse = 1 + Math.sin(time * 3 + p.phase) * 0.3; // softer pulse
          const radius = p.scale * 2.5 * pulse;
          const alpha = p.scale * 0.7; // lower opacity
          const glow = p.scale * 10 * pulse;

          // Glow
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
          grad.addColorStop(0, `${p.colorPrefix} ${alpha * 0.6})`);
          grad.addColorStop(1, `${p.colorPrefix} 0)`);
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix} ${alpha})`;
          ctx.fill();
        });

      ctx.globalCompositeOperation = 'source-over';

      // Draw floating shapes
      shapes.forEach((s) => {
        s.x += s.vx + Math.sin(time * 0.5 + s.pulse) * 1;
        s.y += s.vy + Math.cos(time * 0.5 + s.pulse) * 1;
        s.rotation += s.rotSpeed;
        if (s.x < -150) s.x = w + 150;
        if (s.x > w + 150) s.x = -150;
        if (s.y < -150) s.y = h + 150;
        if (s.y > h + 150) s.y = -150;
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
  }, [theme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35, // More subtle so it doesn't overpower
      }}
    />
  );
}
