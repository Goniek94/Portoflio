import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onFinish?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log('WelcomeScreen loaded - transition to desktop');

    // Krótszy czas wyświetlania - 2 sekundy
    const welcomeTimer = setTimeout(() => {
      console.log('WelcomeScreen finished, starting fade out...');
      setFadeOut(true);

      // Po fade out - sygnał do rodzica
      setTimeout(() => {
        console.log('WelcomeScreen fade out completed, calling onFinish...');
        if (onFinish) {
          onFinish();
        }
      }, 800);
    }, 2000); // 2 sekundy wyświetlania

    return () => {
      clearTimeout(welcomeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center font-sans"
      style={{
        backgroundImage: 'url("/img/Windowsxp.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      {/* Overlay dla efektu welcome screen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(135,206,235,0.9) 0%, rgba(65,105,225,0.8) 50%, rgba(30,60,114,0.9) 100%)',
        }}
      />
      {/* Dokładne odwzorowanie oryginalnego Windows XP Welcome Screen */}
      <div className="flex flex-col items-center relative z-10">
        {/* Logo Windows XP - DOKŁADNIE jak w oryginale */}
        <div className="relative mb-8" style={{ width: '150px', height: '120px' }}>
          {/* Flagka Windows - 4 prostokąty z dokładnymi kolorami i kształtem XP */}

          {/* Czerwony (lewy górny) */}
          <div
            className="absolute"
            style={{
              width: '68px',
              height: '45px',
              background: 'linear-gradient(135deg, #ff4444 0%, #cc1111 50%, #aa0000 100%)',
              borderRadius: '8px 0px 0px 8px',
              left: '8px',
              top: '15px',
              transform: 'perspective(200px) rotateY(-15deg)',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          ></div>

          {/* Zielony (prawy górny) */}
          <div
            className="absolute"
            style={{
              width: '68px',
              height: '45px',
              background: 'linear-gradient(135deg, #44ff44 0%, #22cc22 50%, #009900 100%)',
              borderRadius: '0px 8px 8px 0px',
              left: '74px',
              top: '15px',
              transform: 'perspective(200px) rotateY(15deg)',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          ></div>

          {/* Niebieski (lewy dolny) */}
          <div
            className="absolute"
            style={{
              width: '68px',
              height: '45px',
              background: 'linear-gradient(135deg, #4488ff 0%, #2266cc 50%, #0044aa 100%)',
              borderRadius: '8px 0px 0px 8px',
              left: '8px',
              top: '58px',
              transform: 'perspective(200px) rotateY(-15deg)',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          ></div>

          {/* Żółty (prawy dolny) */}
          <div
            className="absolute"
            style={{
              width: '68px',
              height: '45px',
              background: 'linear-gradient(135deg, #ffdd44 0%, #ddaa22 50%, #bb8800 100%)',
              borderRadius: '0px 8px 8px 0px',
              left: '74px',
              top: '58px',
              transform: 'perspective(200px) rotateY(15deg)',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          ></div>
        </div>

        {/* Tekst Microsoft Windows XP - DOKŁADNIE jak w oryginale */}
        <div className="text-center">
          {/* Microsoft - małe, delikatne */}
          <div className="mb-2">
            <span
              style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
              }}
            >
              Microsoft<span style={{ fontSize: '12px', verticalAlign: 'super' }}>®</span>
            </span>
          </div>

          {/* Windows XP - duże, charakterystyczne */}
          <div className="flex items-end justify-center">
            <span
              style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '52px',
                fontWeight: '300',
                color: '#ffffff',
                textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                letterSpacing: '2px',
              }}
            >
              Windows
            </span>
            <span
              style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#ff6600',
                textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                marginLeft: '8px',
                letterSpacing: '1px',
              }}
            >
              XP
            </span>
          </div>
        </div>
      </div>

      {/* Subtelny efekt światlny w tle - jak w oryginale */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          mixBlendMode: 'soft-light',
        }}
      ></div>

      {/* Delikatny vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.4) 100%)',
        }}
      ></div>
    </div>
  );
};

export default WelcomeScreen;
