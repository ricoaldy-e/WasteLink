import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'WasteLink: temukan pengepul limbah di sekitar Anda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const read = (p: string) => readFile(path.join(process.cwd(), p));

/**
 * Gambar share (Open Graph + Twitter) 1200×630, dirender saat build dari komponen ini.
 * Font ada di src/app/_og/ (TTF statis Fraunces + Plus Jakarta Sans, karena satori tidak membaca woff2/variable font).
 * Warna mengikuti token di globals.css: bg #F5F7F6, ink #111C1B, muted #4A5957, primary #0A5A55.
 */
export default async function OpengraphImage() {
  const [serif, sans500, sans700, mark] = await Promise.all([
    read('src/app/_og/fraunces-600.ttf'),
    read('src/app/_og/jakarta-500.ttf'),
    read('src/app/_og/jakarta-700.ttf'),
    read('public/logo-mark.png'),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  const headline = { display: 'flex', fontFamily: 'Fraunces', fontWeight: 600, fontSize: 120, lineHeight: 1, letterSpacing: -2.5, color: '#111C1B' } as const;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#F5F7F6' }}>
        <div style={{ display: 'flex', flex: 1, padding: '64px 80px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            <div style={{ display: 'flex', fontFamily: 'Jakarta', fontWeight: 700, fontSize: 24, letterSpacing: 2.4, color: '#4A5957' }}>
              DIREKTORI PENGEPUL LIMBAH
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={headline}>Temukan</div>
              <div style={{ ...headline, color: '#0A5A55' }}>pengepul</div>
              <div style={headline}>limbah</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Jakarta', fontWeight: 700, fontSize: 30, color: '#0A5A55' }}>
              wastelinkhub.app
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 400 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={360} height={273} alt="" />
          </div>
        </div>

        <div style={{ display: 'flex', height: 16, background: '#0A5A55', marginTop: 40 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: serif, weight: 600, style: 'normal' },
        { name: 'Jakarta', data: sans500, weight: 500, style: 'normal' },
        { name: 'Jakarta', data: sans700, weight: 700, style: 'normal' },
      ],
    }
  );
}
