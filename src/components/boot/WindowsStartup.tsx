import React, { useEffect, useState } from 'react';

interface WindowsStartupProps {
  onFinish?: () => void;
}

const WindowsStartup: React.FC<WindowsStartupProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Opóźnienie pokazania tekstu
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 800);

    // Po 4 sekundach rozpocznij fade out
    const finishTimer = setTimeout(() => {
      setFadeOut(true);
      
      // Po fade out wywołaj onFinish
      setTimeout(() => {
        if (onFinish) {
          onFinish();
        }
      }, 1500);
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center font-sans"
      style={{
        background: 'linear-gradient(to bottom, #2952a3 0%, #1e3c72 25%, #2a5298 75%, #1e3c72 100%)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1.5s ease-out'
      }}
    >
      {/* Windows Logo */}
      <div className="flex flex-col items-center">
        <div className="relative mb-6" style={{ width: '58px', height: '48px' }}>
          {/* Czerwony */}
          <div 
            className="absolute"
            style={{
              width: '32px',
              height: '20px',
              background: 'linear-gradient(45deg, #ff4444 0%, #cc0000 100%)',
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
              left: '0px',
              top: '2px',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}
          ></div>
          {/* Zielony */}
          <div 
            className="absolute"
            style={{
              width: '32px',
              height: '20px',
              background: 'linear-gradient(45deg, #44ff44 0%, #00aa00 100%)',
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
              left: '26px',
              top: '2px',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}
          ></div>
          {/* Niebieski */}
          <div 
            className="absolute"
            style={{
              width: '32px',
              height: '20px',
              background: 'linear-gradient(45deg, #4488ff 0%, #0044cc 100%)',
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
              left: '0px',
              top: '26px',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}
          ></div>
          {/* Żółty */}
          <div 
            className="absolute"
            style={{
              width: '32px',
              height: '20px',
              background: 'linear-gradient(45deg, #ffff44 0%, #ddaa00 100%)',
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
              left: '26px',
              top: '26px',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}
          ></div>
        </div>

        {/* Microsoft Text */}
        <div className="text-center mb-1">
          <span 
            className="text-white tracking-wide"
            style={{
              fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
              fontSize: '13px',
              fontWeight: '400',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Microsoft<span style={{ fontSize: '10px', verticalAlign: 'super' }}>®</span>
          </span>
        </div>

        {/* Windows XP */}
        <div className="text-center mb-12">
          <div className="flex items-baseline justify-center">
            <span 
              className="text-white tracking-wide"
              style={{
                fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
                fontSize: '32px',
                fontWeight: '300',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Windows
            </span>
            <span 
              className="ml-1"
              style={{
                fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ff6600',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                verticalAlign: 'top',
                marginTop: '4px'
              }}
            >
              XP
            </span>
            <span 
              className="ml-1"
              style={{
                fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
                fontSize: '14px',
                color: '#ff6600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                verticalAlign: 'super'
              }}
            >
              ™
            </span>
          </div>
        </div>

        {/* Tekst ładowania */}
        {showText && (
          <div className="text-center">
            <p 
              className="text-white mb-8"
              style={{
                fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                animation: 'fadeInText 0.8s ease-in-out'
              }}
            >
              Trwa uruchamianie systemu Windows...
            </p>
            
            {/* Animowane kropki */}
            <div className="flex justify-center space-x-1">
              <div 
                className="w-2 h-2 bg-white rounded-full"
                style={{
                  animation: 'dotPulse 1.4s ease-in-out 0s infinite',
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))'
                }}
              ></div>
              <div 
                className="w-2 h-2 bg-white rounded-full"
                style={{
                  animation: 'dotPulse 1.4s ease-in-out 0.2s infinite',
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))'
                }}
              ></div>
              <div 
                className="w-2 h-2 bg-white rounded-full"
                style={{
                  animation: 'dotPulse 1.4s ease-in-out 0.4s infinite',
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))'
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div 
        className="absolute bottom-6 left-6 text-white"
        style={{
          fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
          fontSize: '11px',
          opacity: 0.7,
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}
      >
        Copyright © Microsoft Corporation
      </div>

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%)'
        }}
      ></div>

      <style jsx>{`
        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default WindowsStartup;