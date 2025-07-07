export interface CloudPosition {
  top: string;
  left?: string;
  right?: string;
}

export interface StarPosition {
  top: string;
  left?: string;
  right?: string;
  scale: number;
  layer: number;
}

export interface CharacterPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const cloudPositions: CloudPosition[] = [
  { top: '10%', left: '5%' },
  { top: '15%', right: '15%' },
  { top: '30%', left: '20%' },
  { top: '50%', right: '10%' },
  { top: '65%', left: '15%' },
  { top: '80%', right: '25%' },
  { top: '85%', left: '30%' },
  { top: '25%', right: '30%' },
];

export const starPositions: StarPosition[] = [
  { top: '8%', left: '12%', scale: 1.2, layer: 2 },
  { top: '15%', right: '25%', scale: 0.9, layer: 1 },
  { top: '22%', left: '35%', scale: 1.4, layer: 3 },
  { top: '30%', right: '40%', scale: 1.1, layer: 2 },
  { top: '45%', left: '8%', scale: 1.3, layer: 3 },
  { top: '50%', right: '15%', scale: 1.0, layer: 1 },
  { top: '65%', left: '25%', scale: 1.2, layer: 2 },
  { top: '70%', right: '30%', scale: 0.8, layer: 1 },
  { top: '85%', left: '40%', scale: 1.5, layer: 3 },
  { top: '20%', left: '75%', scale: 1.2, layer: 2 },
  { top: '40%', left: '60%', scale: 1.0, layer: 1 },
  { top: '60%', right: '55%', scale: 1.3, layer: 3 },
  { top: '75%', left: '80%', scale: 1.1, layer: 2 },
  { top: '90%', right: '70%', scale: 0.9, layer: 1 },
  { top: '5%', left: '50%', scale: 1.4, layer: 3 },
];

export const characterEmojis = ['🐰', '🤖', '🐱', '🧑‍🚀', '🐻', '🦊', '🐧'];

export const characterPositions: CharacterPosition[] = [
  { top: '15%', left: '10%' },
  { top: '25%', right: '15%' },
  { bottom: '20%', left: '20%' },
  { bottom: '30%', right: '20%' },
  { top: '50%', left: '5%' },
  { top: '60%', right: '8%' },
  { bottom: '15%', left: '40%' },
  { top: '40%', right: '5%' },
]; 