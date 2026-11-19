import { LineArt } from '@/components/ui/line-art';
import { art, at } from '@/components/ui/line-art-styles';

// Sketsa tinta gambar tangan, satu per bagian situs. Gaya dan aturan: docs/DESIGN.md §6.4.
// Semua goresan ber-pathLength={1} supaya bisa "digambar" (lihat .draw di globals.css); urutan lewat at(ms) pada grup.
// Hero menggambar dirinya saat dimuat; yang di bawah lipatan dibungkus <Reveal> oleh pemakainya dan mulai saat masuk layar.

const Bottle = () => (
  <>
    <path pathLength={1} d="M117 160 L141 158" />
    <path pathLength={1} d="M118 160 L119 178 M140 158 L139 178" />
    <path pathLength={1} d="M120 178 C121 202 96 212 94 248" />
    <path pathLength={1} d="M138 178 C140 202 164 212 164 250" />
    <path pathLength={1} d="M94 248 L95 326 C96 342 110 348 130 348 C152 348 163 340 164 326 L164 250" />
    <path pathLength={1} d="M95 264 C118 272 140 258 164 266" />
    <path pathLength={1} d="M96 302 C120 310 142 298 164 306" />
    <path pathLength={1} d="M150 272 L154 300 M142 276 L146 298" />
  </>
);

/** Beranda (bagian "Mengapa memilah"): jalur dari rumah, melewati limbah (botol, kaleng, kardus bertunas, koran), sampai pin pengepul. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <LineArt
      id="art-hero"
      viewBox="0 0 1040 440"
      sw={3}
      deferred
      className={className}
      label="Ilustrasi garis: sebuah jalur dari rumah melewati botol, kaleng, kardus bertunas, dan koran bekas, berakhir di pin lokasi pengepul"
    >
      <g style={at(0, 2600)} className={art.route}>
        <path pathLength={1} d="M98 402 C150 424 206 390 270 404 C336 418 384 432 452 418 C530 402 620 420 716 410 C790 402 830 360 866 322 C880 308 894 300 928 292" />
      </g>

      <g style={at(0, 1000)}>
        <path className={art.fill} transform="translate(12 8)" d="M40 304 L170 308 L170 396 L40 392 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M40 300 L41 392 L172 398 L170 304" />
          <path pathLength={1} d="M22 308 L104 232 L190 310" />
          <path pathLength={1} d="M142 260 L142 236 L164 236 L164 280" />
          <path pathLength={1} d="M82 398 L82 344 C82 328 114 328 114 344 L114 400" />
          <path pathLength={1} d="M130 330 L152 330 L152 356 L130 356 Z M141 330 L141 356 M130 343 L152 343" />
        </g>
      </g>

      <g style={at(550)} transform="translate(160 0) rotate(-5 130 348)">
        <path className={art.fill} transform="translate(12 8)" d="M118 178 C120 202 94 212 94 248 L95 326 C96 342 110 348 130 348 C152 348 163 340 164 326 L164 250 C164 212 140 202 140 178 Z" />
        <g className={art.ink}>
          <Bottle />
        </g>
      </g>

      <g style={at(950)} transform="translate(176 0) rotate(8 267 340)">
        <path className={art.fill} transform="translate(-10 8)" d="M234 244 L234 336 C238 352 298 352 300 334 L301 244 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M233 242 C232 228 300 228 301 242 C302 256 234 258 233 242 Z" />
          <path pathLength={1} d="M233 242 L234 336" />
          <path pathLength={1} d="M301 242 L300 334" />
          <path pathLength={1} d="M234 336 C238 352 298 352 300 334" />
          <path pathLength={1} d="M234 268 C258 278 280 264 301 272" />
          <path pathLength={1} d="M234 308 C258 318 280 304 300 312" />
          <path pathLength={1} d="M257 240 C265 236 276 238 278 243" />
        </g>
      </g>

      <g style={at(1350)} transform="translate(190 0) rotate(-3 410 372)">
        <path className={art.fill} transform="translate(12 10)" d="M364 288 L460 296 L458 372 L366 364 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M364 288 L460 296 L458 372 L366 364 Z" />
          <path pathLength={1} d="M364 288 L346 252 L412 246 L424 290" />
          <path pathLength={1} d="M460 296 L482 262 L434 250" />
          <path pathLength={1} d="M408 291 L410 326 M418 292 L420 322" />
          <path pathLength={1} d="M424 262 C418 236 424 208 440 184" />
          <path pathLength={1} d="M440 184 C422 178 408 160 412 142 C432 144 446 160 440 184 Z" />
          <path pathLength={1} d="M436 206 C452 198 470 184 472 164 C452 162 436 178 436 206 Z" />
        </g>
      </g>

      <g style={at(1750)} transform="translate(212 -24) rotate(12 560 316)" className={art.ink}>
        <path pathLength={1} d="M520 326 C514 300 534 282 560 284 C590 286 604 306 594 330 C586 346 560 352 540 346" />
        <path pathLength={1} d="M528 316 C526 304 540 296 556 298 C574 300 582 314 574 326" />
        <path pathLength={1} d="M538 312 C540 308 548 308 552 312" />
        <path pathLength={1} d="M526 336 L596 342" />
      </g>

      <g style={at(2150, 1000)} transform="translate(30 0)">
        <path className={art.fill} transform="translate(8 8)" d="M900 196 C880 196 866 210 866 230 C866 252 886 266 898 286 C910 266 930 252 932 230 C932 210 920 196 900 196 Z" />
        <g className={art.route}>
          <path pathLength={1} d="M898 292 C880 268 858 254 858 228 C858 204 876 188 900 188 C924 188 942 204 942 228 C942 254 920 268 898 292 Z" />
        </g>
        <g className={art.ink}>
          <path pathLength={1} d="M900 248 C898 230 908 216 926 212 C928 230 918 244 900 248 Z" />
          <path pathLength={1} d="M900 248 C898 238 896 228 894 220" />
        </g>
      </g>
    </LineArt>
  );
}

/** Cara kerja (beranda): kaca pembesar menyorot sebuah botol. */
export function SortIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-sort" viewBox="0 0 360 300" deferred className={className} label="Ilustrasi garis: kaca pembesar menyorot sebuah botol">
      <g style={at(0, 1100)}>
        <g transform="translate(-24 -68) rotate(-6 130 348)">
          <path className={art.fill} transform="translate(12 8)" d="M118 178 C120 202 94 212 94 248 L95 326 C96 342 110 348 130 348 C152 348 163 340 164 326 L164 250 C164 212 140 202 140 178 Z" />
          <g className={art.ink}>
            <Bottle />
          </g>
        </g>
      </g>
      <g style={at(700, 1000)} className={art.ink}>
        <path pathLength={1} d="M130 150 C128 112 158 84 194 86 C230 88 258 116 256 152 C254 188 226 214 190 212 C154 210 132 184 130 150 Z" />
        <path pathLength={1} d="M152 134 C158 116 172 104 188 102" />
        <path pathLength={1} d="M238 196 L302 264 M252 184 L316 252 M302 264 C306 274 320 266 316 252" />
      </g>
      <g style={at(1300, 900)} className={art.route}>
        <path pathLength={1} d="M20 282 C90 270 150 292 220 278 C270 268 310 282 345 274" />
      </g>
    </LineArt>
  );
}

/** Penutup teal (beranda): truk pengepul. Garis terang karena di atas latar teal. */
export function TruckIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-truck" viewBox="0 0 520 300" deferred className={className} label="Ilustrasi garis: truk pengepul membawa karung berisi limbah">
      <g style={at(0, 1400)} className={art.routeLight}>
        <path pathLength={1} d="M10 266 C120 254 260 274 360 262 C430 254 480 264 512 258" />
      </g>
      <g style={at(300, 1300)}>
        <path className={art.fillLight} transform="translate(10 8)" d="M34 96 L304 96 L304 222 L34 222 Z" />
        <path className={art.fillLight} transform="translate(8 6)" d="M304 134 L372 134 L414 174 L444 180 L444 222 L304 222 Z" />
        <g className={art.inkLight}>
          <path pathLength={1} d="M30 92 L302 94 L304 220 L32 218 Z" />
          <path pathLength={1} d="M302 134 L372 132 L412 172 L444 178 L442 220 L304 220" />
          <path pathLength={1} d="M330 146 L364 146 L390 172 L330 172 Z" />
          <path pathLength={1} d="M152 158 C142 134 166 120 190 124 C192 148 174 162 152 158 Z M152 158 L178 132" />
        </g>
      </g>
      <g style={at(1000, 1100)} className={art.inkLight}>
        <path pathLength={1} d="M62 92 C52 62 84 38 112 46 C142 38 170 60 156 92" />
        <path pathLength={1} d="M98 48 L112 40 L126 48" />
        <path pathLength={1} d="M172 92 C170 58 206 42 234 54 C264 48 282 72 272 92" />
        <path pathLength={1} d="M208 56 L222 48 L236 56" />
      </g>
      <g style={at(1500, 900)} className={art.inkLight}>
        <path pathLength={1} d="M60 224 C58 252 74 270 92 270 C110 270 126 252 124 224" />
        <path pathLength={1} d="M74 244 C78 256 86 260 92 260 C100 260 106 254 110 244" />
        <circle pathLength={1} cx="92" cy="242" r="5" />
        <path pathLength={1} d="M340 224 C338 252 354 270 372 270 C390 270 406 252 404 224" />
        <path pathLength={1} d="M354 244 C358 256 366 260 372 260 C380 260 386 254 390 244" />
        <circle pathLength={1} cx="372" cy="242" r="5" />
      </g>
    </LineArt>
  );
}

/** Header Kategori: toples, tumpukan koran terikat, dan apel. */
export function CategoriesIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-categories" viewBox="0 0 520 300" className={className} label="Ilustrasi garis: toples kaca, tumpukan koran terikat, dan sebuah apel">
      <g style={at(0, 1400)} className={art.route}>
        <path pathLength={1} d="M16 288 C120 276 240 296 360 282 C420 276 470 284 506 280" />
      </g>
      <g style={at(100, 1100)}>
        <path className={art.fill} transform="translate(12 8)" d="M70 130 C64 150 62 160 62 180 L64 250 C64 266 84 274 110 274 C138 274 156 266 158 250 L160 180 C160 160 152 148 148 130 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M70 92 L150 90 L152 112 L72 114 Z" />
          <path pathLength={1} d="M78 114 C70 130 64 142 64 172 L66 250 C66 268 84 276 112 276 C140 276 158 268 158 250 L160 172 C160 142 152 130 146 114" />
          <path pathLength={1} d="M82 160 L84 226" />
          <path pathLength={1} d="M112 232 C108 206 118 188 136 178 C140 202 130 224 112 232 Z M112 232 C112 218 114 206 120 194" />
        </g>
      </g>
      <g style={at(700, 1000)}>
        <path className={art.fill} transform="translate(8 6)" d="M212 214 L338 222 L336 270 L214 262 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M212 214 L338 222 L336 270 L214 262 Z" />
          <path pathLength={1} d="M214 238 L338 246 M214 252 L337 258" />
          <path pathLength={1} d="M214 214 L222 196 L344 204 L338 222" />
          <path pathLength={1} d="M236 224 L300 228 M236 232 L284 235" />
          <path pathLength={1} d="M274 200 L278 266 M300 203 L304 268" />
        </g>
      </g>
      <g style={at(1300, 1000)}>
        <path className={art.fill} transform="translate(10 6)" d="M376 150 C358 138 334 148 336 180 C338 214 358 242 378 236 C398 242 420 214 420 180 C420 148 398 138 378 150 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M378 150 C358 138 332 148 334 180 C336 214 356 244 378 238 C400 244 422 214 422 180 C422 148 398 138 378 150 Z" />
          <path pathLength={1} d="M378 150 C378 136 384 124 396 118 M384 134 C396 120 412 124 416 134 C406 144 392 144 384 134 Z" />
          <path pathLength={1} d="M410 168 C400 172 400 188 412 192" />
        </g>
      </g>
    </LineArt>
  );
}

/** Header Pengepul: gerobak dengan karung dan bal kardus. */
export function CartIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-cart" viewBox="0 0 520 300" className={className} label="Ilustrasi garis: gerobak pengepul membawa karung dan bal kardus">
      <g style={at(0, 1400)} className={art.route}>
        <path pathLength={1} d="M14 290 C130 278 250 296 380 284 C440 278 480 284 508 280" />
      </g>
      <g style={at(100, 1300)}>
        <path className={art.fill} transform="translate(10 8)" d="M96 152 L330 152 L320 206 L106 206 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M92 150 L332 152 L322 206 L100 206 Z" />
          <path pathLength={1} d="M92 160 L16 118 M16 118 C8 112 6 124 14 126" />
          <path pathLength={1} d="M100 206 L80 262 M322 206 L332 262" />
        </g>
      </g>
      <g style={at(800, 1100)} className={art.ink}>
        <path pathLength={1} d="M104 150 C96 112 130 92 152 104 C178 92 206 116 198 150" />
        <path pathLength={1} d="M140 98 L152 90 L164 98" />
        <path pathLength={1} d="M208 150 C206 120 240 100 264 112 C290 106 306 132 300 150" />
        <path pathLength={1} d="M254 106 L266 98 L278 106" />
        <path pathLength={1} d="M310 150 L308 104 L352 108 L350 152 M310 124 L350 128 M310 138 L350 142" />
      </g>
      <g style={at(1400, 1000)} className={art.ink}>
        <path pathLength={1} d="M188 236 C188 212 208 192 232 192 C256 192 276 212 276 236 C276 260 256 280 232 280 C208 280 188 260 188 236 Z" />
        <path pathLength={1} d="M232 192 L232 280 M188 236 L276 236 M201 205 L263 267 M263 205 L201 267" />
        <circle pathLength={1} cx="232" cy="236" r="6" />
      </g>
    </LineArt>
  );
}

/** Header Tentang: tiga panah daur ulang melingkari tunas. */
export function LoopIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-loop" viewBox="0 0 520 300" className={className} label="Ilustrasi garis: tiga panah daur ulang melingkari sebuah tunas">
      <path className={art.fill} transform="translate(10 8)" d="M260 70 C316 70 360 108 360 152 C360 196 316 232 260 232 C204 232 160 196 160 152 C160 108 204 70 260 70 Z" />
      <g style={at(0, 1500)} className={art.route}>
        {[0, 120, 240].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 260 152)`}>
            <path pathLength={1} d="M296 58 A100 100 0 0 1 338 216" />
            <path pathLength={1} d="M341 202 L338 216 L352 211" />
          </g>
        ))}
      </g>
      <g style={at(900, 1200)} className={art.ink}>
        <path pathLength={1} d="M260 206 C258 176 262 156 262 132" />
        <path pathLength={1} d="M262 150 C240 148 224 132 226 112 C248 112 262 128 262 150 Z" />
        <path pathLength={1} d="M262 136 C282 134 298 118 298 100 C278 100 262 114 262 136 Z" />
        <path pathLength={1} d="M232 208 C246 198 276 198 290 208" />
      </g>
    </LineArt>
  );
}

/** 404: tong terguling dengan tutup yang menggelinding dan tanda tanya. */
export function LostBinIllustration({ className }: { className?: string }) {
  return (
    <LineArt id="art-lost" viewBox="0 0 520 300" className={className} label="Ilustrasi garis: tong sampah terguling, tutupnya menggelinding pergi, dan tanda tanya">
      <g style={at(0, 1400)} className={art.route}>
        <path pathLength={1} d="M14 286 C130 274 260 294 380 282 C440 276 480 282 508 278" />
      </g>
      <g style={at(100, 1300)}>
        <path className={art.fill} transform="translate(10 8)" d="M154 104 L326 116 L326 238 L154 252 Z" />
        <g className={art.ink}>
          <path pathLength={1} d="M150 100 L326 112 L326 236 L150 252" />
          <path pathLength={1} d="M326 112 C342 140 342 208 326 236" />
          <path pathLength={1} d="M150 100 C122 126 122 226 150 252 C178 226 178 126 150 100 Z" />
          <path pathLength={1} d="M214 106 L214 246 M256 110 L256 242 M298 114 L298 238" />
        </g>
      </g>
      <g style={at(900, 1000)} className={art.ink}>
        <path pathLength={1} d="M406 232 C406 212 468 212 468 232 C468 252 406 252 406 232 Z" />
        <path pathLength={1} d="M426 214 C430 202 446 202 450 214" />
        <path pathLength={1} d="M478 258 L504 262 M474 272 L496 278" />
        <path pathLength={1} d="M78 226 C68 204 92 190 106 200 C122 210 114 232 96 232 C88 234 82 230 78 226 Z" />
        <path pathLength={1} d="M30 262 C44 244 66 244 74 256 C58 266 42 268 30 262 Z M30 262 L56 252" />
      </g>
      <g style={at(1500, 900)} className={art.ink}>
        <path pathLength={1} d="M200 78 C198 44 262 40 262 72 C262 94 232 96 232 118" />
        <circle pathLength={1} cx="232" cy="136" r="2.5" />
      </g>
    </LineArt>
  );
}
