# HANDOFF — Pixel Game (Билолбек)

**Қоида:** Билолбек билан ҳамиша ЎЗБЕК КИРИЛЛДА гаплашинг ва уни «Билолбек» деб чақиринг. Ўйин ичидаги матнлар — лотин ўзбекча.
Ўйинчи — Жасурбек (оддий ↔ супер қаҳрамон, ⚡), NPC — Жумаманзар.

## Файллар
- `index.html` — тайёр ўйин (~420 KB, битта файл). Артефакт: https://claude.ai/artifact/U7LtJjVxJmmum5bh7JdpPd (v32).
- `src/*.js, land.css` — модуллар. `src/patchers/*.py` — ҳар бири базавий HTML'га модулни қўшади (ҳар бир алмаштириш assert билан текширилади).
- `src/bases/bak_v31.html` — v32 дан олдинги база. `src/patchers/landpatch.py` уни v32 га айлантиради.
- `tests/pw*.js` — Playwright/Chromium синовлари (pw30–pw36 — охирги ишлар).

## Архитектура
- Canvas, торус дунё: `MSZ=5`, WW=11520, WH=7200, тайл 16 px, TXM=720, TYM=450. Ўраш: `dwx/dwy/wxy/pj`. Тўқнашув: `solids[]`. Рендерда painter's algorithm, илгаклар `xGround()` ва `xItems(items)`.
- `sol.js` қуёш системаси; `civ.js` 3 цивилизация; `sbx.js/sbx2.js` sandbox; `eco.js` экология; `fx.js` атмосфера/овоз; `fly.js` учиш; `ocean.js` океан.
- **Макет (`lay.js`, `lay2.js`, `land.css`)**: ҳамма нарса `#root` ичида. Портретда `ROT=1` ва root 90° айланади, pointer координаталари capture-фазада қайта ёзилади. CSS ўзгарувчилар: `--u`, `--sat/--sar/--sab/--sal`, `--vw/--vh`. `rs()` `PX=clamp(round(VH/190),2,6)`. Тугмалар `#tbar` (юқори-ўнг) ва `#rbtn` (пастки-ўнг грид)га жойлашади. Скриптда `innerWidth/innerHeight` ўрнига `VW/VH` ишлатилади.
- **Қазиш (`dig.js`)**: `DG` Map калити `ty*TXM+tx` → `{d,w}`, `DMAX=4`. `MAT` жадвали (тупроқ, қум, қор, қоя, тош, кўмир, темир, олтин, кристалл, бедрок). `digHit`, `digBreak`, `digFlood` (сув BFS, макс 90), `digFill`, `digUpdate`, `pitDraw`, `digCrack`. Асбоблар: shovel (юмшоқ ×3), pick (қаттиқ ×2.5).
- **Sandbox**: `bkey(tx,ty,lv)`, блокларда `b.lv` (фақат lv0 тўқнашади). Блок id 22–27: тупроқ, қум, ғишт, қор, том, устун. Сақлаш: localStorage `jsSbx5` (`b:[tx,ty,t,g,lv]`, `g:[tx,ty,d,w]`).
- **Қурилиш таҳрирчиси (`bed.js`)**: алоҳида `#bc` canvas, ўйин ортда янгиланади. Ҳолат `BED` (dig.js да). Проекция `brot/binv/bedGeo/bedTile/bedPick`. Тугмалар bX,bV,bR,bU,bZp/bZm,bL1/bL2,bA,bM,bC. Клавишалар: Esc/B, Q/E, Tab, +/-, R/F, X, Z, WASD.

## Синов ва публикация
- Синтаксис: `<script>` ни `/tmp/x.js` га чиқариб `node --check`.
- Playwright: `node tests/pw36.js` (Chromium). Ҳар ўзгаришдан кейин FPS (~60) ва page error текширилади.

## Бажарилган
Горизонтал/авто-мослашув макет; қазиш; кўп қаватли блоклар; қурилиш таҳрирчиси (тепадан + 3D); сақлаш; 60 FPS.

## Йўл харитаси
1. Ҳар хил ҳайвонлар учун алоҳида спрайтлар.
2. Цивилизация ҳолатини сақлаш.
3. Ҳақиқий қурилмаларда FPS синови.
4. Кўпроқ уруш геймплейи.
5. Фасл мослашуви.
6. Қум қулаши физикаси.
7. Тайёр уй шаблонлари.

## Янги чатда
«pixel-game репозиторийни улаб, HANDOFF.md ни ўқи ва давом эт».

## Yer xaritasi (haqiqiy dunyo)
- Dunyo endi Yer: qit'alar, okean chuqurligi (4 daraja), relyef. Manba — fizik xarita rasmi. Asboblar: `tools/earth_tex.py` (Miller → ekvirectangular tekstura), `tools/earth_cls.py` (sinflash), `tools/earth_build.py` (PMD, daryo, yo'l, shahar, chuqurlik, JPEG) → `src/earth/earth.json` → `src/patchers/earthpatch.py` index.html ga joylaydi.
- Uy vodiysi (`tx<60,ty<45`) protsedurali va Skandinaviya ustida (LON0=8°E). Globus teksturasi — rasm (`EIMG`), o'yin plitkalari — PMD.
- UI: `src/ui.css`, `ui.js`, `colors.js` (plitka teksturasi + chuqurlik), `radar.js` (GTA radar), `patchers/uipatch.py`.
