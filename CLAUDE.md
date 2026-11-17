# Pixel Game — loyiha qoidalari (Claude Code uchun)

- Foydalanuvchi: Билолбек. U bilan HAMISHA ўзбек кирилда гаплаш ва уни «Билолбек» деб чақир. O'yin ichidagi matnlar — lotin o'zbekcha.
- Avval `HANDOFF.md` ni o'qi: arxitektura, modullar, test va yo'l xaritasi o'sha yerda.
- O'yin — bitta fayl: `index.html` (GitHub Pages shu faylni ochadi). Manba modullari `src/`, patcherlar `src/patchers/`, Playwright testlari `tests/`.
- Har o'zgarishdan keyin: `<script>` ni ajratib `node --check`, Playwright bilan FPS (~60) va page error tekshiruvi.
- `main` ga push qilsang, Pages avtomatik yangilanadi: https://jack07lion-a11y.github.io/pixel-game-sandbox-/
- Keyingi rejalar: PWA (manifest + service worker), GitHub Actions orqali APK (Capacitor), keyin HANDOFF.md dagi yo'l xaritasi.
