// CSS Keyframe animations for glitch effects

export const GLITCH_ANIMATIONS = `
@keyframes glitchFadeIn {
  0% {
    opacity: 0;
    transform: scale(1.5) rotate(10deg);
    filter: blur(20px) brightness(3);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8) rotate(-5deg);
    filter: blur(10px) brightness(2);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px) brightness(1);
  }
}

@keyframes glitchFadeOut {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px) brightness(1);
  }
  30% {
    opacity: 0.7;
    transform: scale(1.1) rotate(5deg);
    filter: blur(5px) brightness(1.5);
  }
  60% {
    opacity: 0.3;
    transform: scale(0.9) rotate(-10deg);
    filter: blur(15px) brightness(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(20deg);
    filter: blur(30px) brightness(0);
  }
}

@keyframes screenShakeExtreme {
  0% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-8px, -5px) rotate(-2deg); }
  20% { transform: translate(-10px, 0px) rotate(2deg); }
  30% { transform: translate(8px, 5px) rotate(0deg); }
  40% { transform: translate(5px, -8px) rotate(2deg); }
  50% { transform: translate(-5px, 10px) rotate(-2deg); }
  60% { transform: translate(-10px, 5px) rotate(0deg); }
  70% { transform: translate(10px, 5px) rotate(-2deg); }
  80% { transform: translate(-5px, -5px) rotate(2deg); }
  90% { transform: translate(5px, 8px) rotate(0deg); }
  100% { transform: translate(5px, -10px) rotate(-2deg); }
}

@keyframes glitchBlock {
  0% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
  50% {
    transform: translate(-10px, 10px);
    opacity: 0.2;
  }
  100% {
    transform: translate(10px, -10px);
    opacity: 0.8;
  }
}

@keyframes scanlines {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

@keyframes textGlitch {
  0% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(20% 0 60% 0); }
  40% { clip-path: inset(60% 0 20% 0); }
  60% { clip-path: inset(40% 0 40% 0); }
  80% { clip-path: inset(80% 0 10% 0); }
  100% { clip-path: inset(0 0 0 0); }
}

@keyframes megaGlitch {
  0%, 100% { transform: translate(0, 0) scale(1); }
  10% { transform: translate(-10px, -10px) scale(1.05); }
  20% { transform: translate(-15px, 0px) scale(0.95); }
  30% { transform: translate(15px, 10px) scale(1.1); }
  40% { transform: translate(5px, -15px) scale(0.9); }
  50% { transform: translate(-5px, 15px) scale(1.05); }
  60% { transform: translate(-15px, 5px) scale(0.95); }
  70% { transform: translate(15px, 5px) scale(1.1); }
  80% { transform: translate(-5px, -5px) scale(0.9); }
  90% { transform: translate(5px, 10px) scale(1.05); }
}

@keyframes slideGlitch {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}
`;
