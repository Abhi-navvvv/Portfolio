'use client';

import { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth || 800);
    let height = (canvas.height = window.innerHeight || 600);

    interface Star {
      x: number; // Normalized coordinate [0, 1]
      y: number; // Normalized coordinate [0, 1]
      size: number;
      opacity: number;
      speedY: number; // Normalized speed
      speedX: number; // Normalized speed
      twinkleSpeed: number;
    }

    const stars: Star[] = [];
    const starCount = 120; // Fixed count to ensure robust rendering regardless of initial load width

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.4 + 0.6, // Star dot sizes: 0.6px to 2.0px
        opacity: Math.random() * 0.6 + 0.3, // Brighter visual range
        speedY: -(Math.random() * 0.0006 + 0.0002), // Gentle upward drift
        speedX: (Math.random() * 0.0002 - 0.0001), // Very slight sway
        twinkleSpeed: Math.random() * 0.005 + 0.001,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate responsive offsets for parallax
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Smoothly interpolate coordinate movements for lag-free parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#fafafa';

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Update positions in normalized space
        star.y += star.speedY;
        star.x += star.speedX;

        // Wrap particles in normalized space
        if (star.y < 0) {
          star.y = 1;
          star.x = Math.random();
        }
        if (star.x < 0) {
          star.x = 1;
        } else if (star.x > 1) {
          star.x = 0;
        }

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 0.9 || star.opacity < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Scale to current pixel dimensions
        const pixelX = star.x * width;
        const pixelY = star.y * height;

        // Offset positions slightly by scroll/mouse offsets
        const drawX = (pixelX - mouseX + width) % width;
        const drawY = (pixelY - mouseY + height) % height;

        ctx.globalAlpha = Math.max(0, Math.min(star.opacity, 1));
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none bg-transparent"
      style={{ zIndex: 1 }}
    />
  );
}
