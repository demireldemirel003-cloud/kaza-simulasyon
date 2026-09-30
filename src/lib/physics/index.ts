/**
 * Eğitici kinematik zaman ölçeği.
 * Gerçek çarpışma ~100–150 ms; sahnede okunabilirlik için yavaşlatılır.
 */
export const SIM_DURATION_MS = 2800;

export function deltaVFromSpeed(speedKmh: number): number {
  // Tam frontal duvar: yaklaşık %90 hız değişimi varsayımı (eğitici).
  return speedKmh * 0.9;
}
