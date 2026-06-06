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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      speedX: number;
      twinkleSpeed: number;
    }

    const stars: Star[] = [];
    // Calculate star density based on viewport size
    const starCount = Math.min(Math.floor((width * height) / 14000), 120);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.0 + 0.4, // Small classic dots: 0.4px to 1.4px
        opacity: Math.random() * 0.5 + 0.1, // Soft, non-distracting opacities
        speedY: -(Math.random() * 0.12 + 0.03), // Drift upwards slowly
        speedX: (Math.random() * 0.08 - 0.04), // Subtle sway
        twinkleSpeed: Math.random() * 0.006 + 0.002, // Gentle pulsing
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

        star.y += star.speedY;
        star.x += star.speedX;

        // Wrap particles when they float off the screen boundaries
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        if (star.x < 0) {
          star.x = width;
        } else if (star.x > width) {
          star.x = 0;
        }

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 0.8 || star.opacity < 0.05) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Offset positions slightly by scroll/mouse offsets
        const drawX = (star.x - mouseX + width) % width;
        const drawY = (star.y - mouseY + height) % height;

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
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#0a0a0a]"
    />
  );
}
