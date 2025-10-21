// desktop/Folders/CompletionScreen.tsx

interface CompletionScreenProps {
  onFinish: () => void;
}

export default function CompletionScreen({ onFinish }: CompletionScreenProps) {
  return (
    <div className="text-center space-y-6 bg-gradient-to-br from-green-50 to-blue-50 p-10 rounded-lg border-2 border-green-500 shadow-2xl max-w-xl">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-4xl">✅</span>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-green-700">System Odzyskany!</h2>
      <div className="space-y-3 text-gray-700 text-left bg-white/50 p-5 rounded-lg">
        <p className="text-center font-semibold text-lg text-blue-800">
          🎮 Zapraszam w podróż do lat 2000! 🎮
        </p>
        <p className="leading-relaxed">
          Na pulpicie czeka prawdziwa nostalgiczna przygoda. <strong>Kliknij w ikonki</strong> -
          każda z nich kryje coś wyjątkowego:
        </p>
        <ul className="space-y-2 pl-4">
          <li>
            🎵 <strong>Winamp</strong> z hitami z lat 2000
          </li>
          <li>
            💬 <strong>Gadu-Gadu</strong> - kultowy komunikator
          </li>
          <li>
            🎯 <strong>Docelowo</strong> - Będzie to bardziej rozbudowane portfolio niż obecnie, ale
            szukam zatrudnienia =)
          </li>
        </ul>
        <p className="text-center text-sm italic text-gray-600 pt-2">
          Nie jest to zwykłe portfolio - to interaktywne doświadczenie! 🚀
        </p>
      </div>
      <button
        onClick={onFinish}
        className="group relative bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-10 py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
        <span className="text-lg">URUCHOM PULPIT</span>
        <span className="text-2xl group-hover:-rotate-12 transition-transform">💻</span>
      </button>
    </div>
  );
}
