import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 60;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.pulsePhase += this.pulseSpeed;
        this.opacity = 0.2 + Math.sin(this.pulsePhase) * 0.3;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(
        100,
        Math.floor((canvas.width * canvas.height) / 15000)
      );

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative left-0 w-full h-[calc(100vh-60px)] bg-[#0a1022] z-10 overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(10,16,34,0)_0%,rgba(10,16,34,0.8)_80%,rgba(10,16,34,1)_100%)] z-2"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-3">
        <div className="absolute top-[-50px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_25s_infinite_alternate]"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_20s_2s_infinite_alternate]"></div>
        <div className="absolute top-[20%] right-[15%] w-[150px] h-[150px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_15s_1s_infinite_alternate]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-11 w-[90%] max-w-[1200px]">
        <div className="mb-[30px] transform translate-y-0 opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.2s]">
          <div className="w-[120px] h-[120px] mx-auto mb-[15px] relative">
            <svg
              className="absolute top-0 left-0 w-full h-full animate-[pulse_5s_infinite] filter drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
              viewBox="0 0 100 100"
            >
              <path
                d="M20 40 C20 25, 40 15, 50 15 C60 15, 80 25, 80 40 C80 50, 70 60, 60 65 C70 70, 80 80, 80 90 C80 105, 60 115, 50 115 C40 115, 20 105, 20 90 C20 80, 30 70, 40 65 C30 60, 20 50, 20 40 Z"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            </svg>
            <svg
              className="absolute top-0 left-0 w-full h-full animate-[glow_3s_infinite]"
              viewBox="0 0 100 100"
            >
              <path
                d="M35 40 H65 M50 40 V80 M35 60 H65 M25 50 H75"
                stroke="#93c5fd"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="35" cy="40" r="2" fill="#93c5fd" />
              <circle cx="65" cy="40" r="2" fill="#93c5fd" />
              <circle cx="50" cy="60" r="2" fill="#93c5fd" />
              <circle cx="35" cy="80" r="2" fill="#93c5fd" />
              <circle cx="65" cy="80" r="2" fill="#93c5fd" />
            </svg>
          </div>
        </div>

        <h1 className="text-[2.986rem] md:text-[2.986rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#2563eb] m-0 tracking-tight transform translate-y-[20px] opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.5s]">
          Clin Technologies
        </h1>

        <p className="text-[1.728rem] md:text-[1.728rem] font-normal text-[#94a3b8] mt-[10px] mb-0 tracking-normal transform translate-y-[20px] opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.8s]">
          Revolutionizing clinical documentation through{" "}
          <span className="text-[#f59e0b] font-semibold">HIPAA COMPLIANT</span>{" "}
          advanced artificial intelligence, giving healthcare providers more
          time for what truly matters — patient care. try it for{" "}
          <span className="text-[#f59e0b] font-semibold">FREE</span> today
        </p>

        <p className="text-[1.44rem] text-[#e2e8f0] max-w-[700px] mx-auto mt-[30px] leading-normal opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_1.1s]">
          Our sophisticated AI platform intelligently processes clinical
          conversations, creating accurate documentation that integrates with
          your existing EMR system.
        </p>

        <div className="mt-[40px] opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_1.4s] flex justify-center gap-5 md:flex-row flex-col">
          <a
            className="bg-transparent border-2 border-[#3b82f6] text-white px-8 py-4 rounded-full hover:bg-[rgba(59,130,246,0.1)] transition-colors shadow-[0_5px_15px_rgba(37,99,235,0.2)] inline-block text-center"
            href="/login"
          >
            Login
          </a>
          <Link
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
            href="/signUp"
          >
            Signup
          </Link>
        </div>
      </div>

      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-[fadeIn_1s_forwards_2s]">
        <div className="w-[24px] h-[38px] border-2 border-[rgba(148,163,184,0.5)] rounded-[12px] relative">
          <div className="absolute top-[6px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-[#60a5fa] rounded-full animate-[scrollDown_2s_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scrollDown {
          0% {
            top: 6px;
            opacity: 1;
          }
          100% {
            top: 18px;
            opacity: 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 5px rgba(147, 197, 253, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(147, 197, 253, 0.8));
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
