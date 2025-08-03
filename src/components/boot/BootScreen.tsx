import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onFinish?: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [showStartupText, setShowStartupText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Przyspieszone ładowanie - większy przyrost
        return prev + Math.random() * 4 + 1.5;
      });
    }, 150); // Częstsze aktualizacje

    return () => {
      clearInterval(progressInterval);
    };
  }, []);
  
  // Po osiągnięciu 100% pokaż tekst uruchamiania
  useEffect(() => {
    if (progress === 100) {
      console.log("BootScreen: Progress reached 100%, showing startup text");
      
      // Czekaj 1 sekundę, potem pokaż tekst uruchamiania
      const startupTimer = setTimeout(() => {
        setShowStartupText(true);
        
        // Po 3 sekundach rozpocznij fade out
        const finishTimer = setTimeout(() => {
          console.log("BootScreen: Starting fade out");
          setFadeOut(true);
          
          // Po fade out wywołaj onFinish
          const callbackTimer = setTimeout(() => {
            console.log("BootScreen: Calling onFinish");
            if (onFinish) {
              onFinish();
            }
          }, 1000);
          
          return () => clearTimeout(callbackTimer);
        }, 3000);
        
        return () => clearTimeout(finishTimer);
      }, 1000);
      
      return () => clearTimeout(startupTimer);
    }
  }, [progress, onFinish]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center font-sans relative"
      style={{
        background: 'linear-gradient(to bottom, #245edb 0%, #1941a5 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-out'
      }}
    >
      {/* Logo Windows XP - dokładna replika */}
      <div className="mb-20">
        {/* Flagka Windows - 4 kolorowe prostokąty */}
        <div className="relative mb-6 mx-auto w-20 h-12">
          {/* Czerwony */}
          <div 
            className="absolute w-12 h-8 bg-gradient-to-br from-red-400 to-red-600"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              left: '0px',
              top: '0px'
            }}
          ></div>
          {/* Zielony */}
          <div 
            className="absolute w-12 h-8 bg-gradient-to-br from-green-400 to-green-600"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              left: '40px',
              top: '0px'
            }}
          ></div>
          {/* Niebieski */}
          <div 
            className="absolute w-12 h-8 bg-gradient-to-br from-blue-400 to-blue-700"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              left: '0px',
              top: '20px'
            }}
          ></div>
          {/* Żółty */}
          <div 
            className="absolute w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              left: '40px',
              top: '20px'
            }}
          ></div>
        </div>

        {/* Tekst Microsoft */}
        <div className="text-center mt-16">
          <div className="text-white text-base font-normal tracking-wider mb-2">
            Microsoft<span className="text-xs align-top">®</span>
          </div>
          
          {/* Windows XP */}
          <div className="flex items-baseline justify-center">
            <span className="text-white text-5xl font-light tracking-wide">Windows</span>
            <span className="text-orange-500 text-2xl font-bold ml-1 align-top">XP</span>
            <span className="text-orange-500 text-lg align-top ml-0.5">™</span>
          </div>
        </div>
      </div>

      {/* Pasek ładowania lub tekst uruchamiania */}
      <div className="w-72">
        {!showStartupText ? (
          // Pasek ładowania
          <>
            <div className="w-full h-3 bg-gray-900 border border-gray-700 rounded-sm overflow-hidden mb-2">
              {/* Tło paska */}
              <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 relative">
                {/* Progress bar */}
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 relative transition-all duration-200 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {/* Highlight na górze */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-200 opacity-70"></div>
                  {/* Animowane światełka */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Procent ładowania */}
            <div className="text-center">
              <span 
                className="text-white text-sm font-mono"
                style={{
                  fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {Math.floor(progress)}%
              </span>
            </div>
          </>
        ) : (
          // Tekst uruchamiania
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

      {/* Copyright na dole z lewej */}
      <div className="absolute bottom-6 left-6 text-gray-300 text-xs font-light">
        Copyright © Microsoft Corporation
      </div>

      {/* Subtelny vignette effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-black opacity-10"></div>
      </div>

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

export default BootScreen;