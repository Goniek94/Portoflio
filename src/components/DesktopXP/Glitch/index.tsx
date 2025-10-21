'use client';

import React from 'react';
import { useGlitchAnimation } from './hooks/useGlitchAnimation';
import {
  MatrixRain,
  StaticNoise,
  RGBSplitEffect,
  PixelationBlocks,
  HorizontalGlitchBars,
  ScanLines,
} from './components/effects';
import { ErrorMessages, SkipButton } from './components/ui';
import { GLITCH_ANIMATIONS } from './styles/animations';

interface GlitchOverlayProps {
  onFinish: () => void;
}

export default function GlitchOverlay({ onFinish }: GlitchOverlayProps) {
  const { isVisible, isFadingOut, glitchIntensity, handleFinish } = useGlitchAnimation({
    onFinish,
  });

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      style={{
        animation: isFadingOut
          ? 'glitchFadeOut 0.6s ease-out forwards'
          : 'glitchFadeIn 0.3s ease-in, screenShakeExtreme 0.1s infinite 0.3s',
      }}
    >
      {/* Canvas Effects */}
      <MatrixRain />
      <StaticNoise />

      {/* RGB Split Effect */}
      <RGBSplitEffect glitchIntensity={glitchIntensity} />

      {/* Pixelation Blocks */}
      <PixelationBlocks />

      {/* Scan Lines */}
      <ScanLines />

      {/* Error Messages */}
      <ErrorMessages />

      {/* Horizontal Glitch Bars */}
      <HorizontalGlitchBars />

      {/* Skip Button */}
      <SkipButton onClick={handleFinish} />

      {/* Animations */}
      <style jsx>{GLITCH_ANIMATIONS}</style>
    </div>
  );
}
