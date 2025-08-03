'use client';

import React, { useState, useEffect } from 'react';

interface RecoverySystemProps {
  onFinish: () => void;
}

type RecoveryStep = 
  | 'scanning' 
  | 'defragmenting' 
  | 'installing_updates' 
  | 'optimizing' 
  | 'finalizing' 
  | 'complete';

const RECOVERY_STEPS: Array<{
  key: RecoveryStep;
  title: string;
  description: string;
  duration: number;
  files: string[];
}> = [
  {
    key: 'scanning',
    title: 'Skanowanie systemu',
    description: 'Searching for corrupted files and malware...',
    duration: 3000,
    files: ['system32.dll', 'kernel.exe', 'explorer.exe', 'winlogon.exe']
  },
  {
    key: 'defragmenting',
    title: 'Defragmentacja dysku',
    description: 'Optimizing disk performance...',
    duration: 2500,
    files: ['C:/Windows/System32/*', 'C:/Program Files/*', 'C:/Users/*']
  },
  {
    key: 'installing_updates',
    title: 'Instalowanie aktualizacji',
    description: 'Installing critical system updates...',
    duration: 4000,
    files: ['KB2024001.msu', 'KB2024002.msu', 'KB2024003.msu', 'SecurityPatch.exe']
  },
  {
    key: 'optimizing',
    title: 'Optymalizacja systemu',
    description: 'Configuring system settings...',
    duration: 2000,
    files: ['registry.dat', 'boot.ini', 'system.cfg', 'performance.ini']
  },
  {
    key: 'finalizing',
    title: 'Finalizacja',
    description: 'Completing system recovery...',
    duration: 1500,
    files: ['recovery.log', 'system.restore', 'backup.dat']
  }
];

export default function RecoverySystem({ onFinish }: RecoverySystemProps) {
  const [currentStep, setCurrentStep] = useState<RecoveryStep>('scanning');
  const [progress, setProgress] = useState(0);
  const [fileIndex, setFileIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const currentStepData = RECOVERY_STEPS.find(s => s.key === currentStep);

  useEffect(() => {
    if (currentStep === 'complete') return;

    const stepData = RECOVERY_STEPS.find(s => s.key === currentStep);
    if (!stepData) return;

    // Reset progress and file index for new step
    setProgress(0);
    setFileIndex(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          
          // Move to next step
          const currentIndex = RECOVERY_STEPS.findIndex(s => s.key === currentStep);
          if (currentIndex < RECOVERY_STEPS.length - 1) {
            setCurrentStep(RECOVERY_STEPS[currentIndex + 1].key);
          } else {
            setCurrentStep('complete');
          }
          
          return 100;
        }
        return prev + (100 / (stepData.duration / 100));
      });
    }, 100);

    // File processing animation
    const fileInterval = setInterval(() => {
      if (stepData.files.length > 0) {
        setFileIndex(prev => {
          const next = (prev + 1) % stepData.files.length;
          
          // Add log entry
          const timestamp = new Date().toLocaleTimeString();
          const action = getActionForStep(currentStep);
          const filename = stepData.files[prev];
          setLogs(prevLogs => [
            ...prevLogs.slice(-15), // Keep only last 15 logs
            `[${timestamp}] ${action} ${filename}... OK`
          ]);
          
          return next;
        });
      }
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(fileInterval);
    };
  }, [currentStep]);

  const getActionForStep = (step: RecoveryStep): string => {
    switch (step) {
      case 'scanning': return 'Scanning';
      case 'defragmenting': return 'Defragmenting';
      case 'installing_updates': return 'Installing';
      case 'optimizing': return 'Optimizing';
      case 'finalizing': return 'Finalizing';
      default: return 'Processing';
    }
  };

  const getOverallProgress = (): number => {
    const currentIndex = RECOVERY_STEPS.findIndex(s => s.key === currentStep);
    if (currentStep === 'complete') return 100;
    return Math.floor(((currentIndex * 100) + progress) / RECOVERY_STEPS.length);
  };

  if (currentStep === 'complete') {
    return (
      <div className="fixed inset-0 bg-blue-800 text-white flex flex-col items-center justify-center p-8 z-50">
        <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-2 text-center font-bold">
            ✅ SYSTEM RECOVERY COMPLETE
          </div>
          
          <div className="p-8 text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600">System odzyskany!</h2>
            
            <div className="text-left bg-gray-100 p-4 rounded text-sm font-mono">
              <div>Recovery Summary:</div>
              <div>• Files scanned: 847</div>
              <div>• Threats removed: 12</div>
              <div>• System files repaired: 3</div>
              <div>• Performance improved: 23%</div>
              <div>• Uptime: 99.9%</div>
            </div>
            
            <div className="text-lg text-purple-600 font-bold mb-2">
              🌟 Witaj w przeszłości! 🌟
            </div>
            <div className="text-sm text-gray-600">
              Twój system został przywrócony do stanu z roku 2000. <br />
              Teraz możesz podróżować po najlepszych latach internetu!
            </div>
            
            <div className="text-xs text-blue-600 animate-pulse">
              ♪ Ring ding ding daa baa baa aramba baa bom baa barooumba ♪
            </div>
            
            <button
              onClick={onFinish}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-3 rounded hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105"
            >
              WEJDŹ DO RETRO DESKTOPU
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">WINDOWS RECOVERY CONSOLE</div>
          <div className="text-sm">System Recovery in Progress...</div>
        </div>

        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{getOverallProgress()}%</span>
          </div>
          <div className="w-full h-4 bg-gray-800 rounded">
            <div 
              className="h-full bg-green-400 rounded transition-all duration-300"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-gray-900 border border-green-400 rounded p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">{currentStepData?.title}</div>
            <div className="text-sm">{Math.floor(progress)}%</div>
          </div>
          
          <div className="text-sm text-gray-300 mb-4">
            {currentStepData?.description}
          </div>
          
          <div className="w-full h-2 bg-gray-700 rounded mb-4">
            <div 
              className="h-full bg-green-400 rounded transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {currentStepData && (
            <div className="text-sm">
              Currently processing: <span className="text-yellow-300">{currentStepData.files[fileIndex]}</span>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6 text-xs">
          {RECOVERY_STEPS.map((step, index) => {
            const currentIndex = RECOVERY_STEPS.findIndex(s => s.key === currentStep);
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            
            return (
              <div 
                key={step.key}
                className={`flex flex-col items-center ${
                  isActive ? 'text-yellow-300' : 
                  isCompleted ? 'text-green-400' : 'text-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                  isActive ? 'border-yellow-300 bg-yellow-300 text-black' :
                  isCompleted ? 'border-green-400 bg-green-400 text-black' : 'border-gray-600'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className="text-center">{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Log Console */}
        <div className="bg-black border border-green-400 rounded p-4 h-48 overflow-y-auto">
          <div className="text-xs space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="text-green-300">
                {log}
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-500">System recovery log will appear here...</div>
            )}
          </div>
        </div>

        {/* Warning */}
        <div className="text-center mt-6 text-red-400 text-sm animate-pulse">
          ⚠️ DO NOT TURN OFF YOUR COMPUTER DURING RECOVERY ⚠️
        </div>
      </div>
    </div>
  );
}