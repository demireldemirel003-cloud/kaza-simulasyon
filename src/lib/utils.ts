import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function bmiFrom(heightM: number, weightKg: number): number {
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}
