// Glitch configuration constants

export const ERROR_MESSAGES = [
  'CRITICAL SYSTEM FAILURE',
  'MEMORY CORRUPTION DETECTED',
  'KERNEL PANIC',
  'FATAL EXCEPTION 0xDEADBEEF',
  'STACK OVERFLOW',
  'SEGMENTATION FAULT',
  'ACCESS VIOLATION',
  'BUFFER OVERRUN',
];

export const GLITCH_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];

export const MATRIX_CHARS =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const TIMINGS = {
  GLITCH_INTENSITY_UPDATE: 50, // ms
  AUTO_FINISH: 3000, // ms
  FADE_OUT: 600, // ms
} as const;

export const CANVAS_CONFIG = {
  FONT_SIZE: 14,
  MATRIX_FADE_ALPHA: 0.08,
  SHADOW_BLUR: 20,
} as const;
