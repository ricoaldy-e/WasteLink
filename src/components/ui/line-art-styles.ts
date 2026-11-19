import type { CSSProperties } from 'react';

// Bahasa gambar bersama untuk semua ilustrasi (docs/DESIGN.md §6.4): sketsa tinta gambar tangan yang rapi.
// Garis tipis, jalur hijau tua, dan satu warna isi lembut yang sengaja bergeser dari garis (seperti cetakan).
// Tebal garis dalam unit viewBox lewat variabel --sw, dikalikan di layar kecil agar tetap terbaca.
// Animasi "digambar": lihat .draw di globals.css; setiap <path> garis wajib ber-pathLength={1}.
const base = '[stroke-linecap:round] [stroke-linejoin:round] [stroke-width:calc(var(--sw)*1.6)] lg:[stroke-width:var(--sw)]';
export const art = {
  ink: `fill-none stroke-ink ${base}`,
  route: `fill-none stroke-primary ${base}`,
  inkLight: `fill-none stroke-on-primary ${base}`,
  routeLight: `fill-none stroke-accent ${base}`,
  fill: 'art-fill fill-primary/12 stroke-none',
  fillLight: 'art-fill fill-on-primary/15 stroke-none',
};

/** Jeda mulai (ms) untuk satu grup goresan; goresan di dalamnya mewarisi variabel ini. */
export const at = (ms: number, dur?: number) => ({ '--d': `${ms}ms`, ...(dur ? { '--draw-dur': `${dur}ms` } : {}) }) as CSSProperties;
