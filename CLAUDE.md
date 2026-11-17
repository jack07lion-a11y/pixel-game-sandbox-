# Pixel Game — loyiha qoidalari (Claude Code uchun)

- Foydalanuvchi: Билолбек. U bilan HAMISHA ўзбек кирилда гаплаш ва уни «Билолбек» деб чақир. O'yin ichidagi matnlar — lotin o'zbekcha.
- Avval `HANDOFF.md` ni o'qi: arxitektura, modullar, test va yo'l xaritasi o'sha yerda.
- O'yin — bitta fayl: `index.html` (GitHub Pages shu faylni ochadi). Manba modullari `src/`, patcherlar `src/patchers/`, Playwright testlari `tests/`.
- Har o'zgarishdan keyin: `<script>` ni ajratib `node --check`, Playwright bilan FPS (~60) va page error tekshiruvi.
- `main` ga push qilsang, Pages avtomatik yangilanadi: https://jack07lion-a11y.github.io/pixel-game-sandbox-/
- BIRINCHI VAZIFA: o'yinni Билолбек xohishi bilan tahrirlashni davom ettirish. Avval undan nima o'zgartirishni so'ra; o'zing reja tuzma.
- PWA/APK (Capacitor + GitHub Actions) keyinroq, faqat u so'raganda.
- ДОИМИЙ ҚОИДА (Билолбек буюрган): ўйин ўзгарса, `index.html` ни Artifact га ЯНГИЛА (бир хил ҳавола, `url` билан: https://claude.ai/artifact/U7LtJjVxJmmum5bh7JdpPd) ва ҲАР жавобнинг ОХИРИДА шу артефакт ҳаволасини (интерактив охирги версия) ташла. GitHub Pages ҳаволасини ташлама. Янгилагандан кейин ҲАР ўзгарган жой учун АЛОҲИДА скриншот ташла (нечта жой ўзгарса, шунча): битта расмда ёнма-ён — чапда АВВАЛГИ версия, ўнгда ЯНГИ версия (Playwright билан олиб, PIL билан бирлаштир). Скриншотлар сонидан ортиқча ташлама.
