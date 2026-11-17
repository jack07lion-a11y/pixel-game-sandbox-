const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
async function mk(w,h,opts={}){const cx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:!!opts.touch,isMobile:!!opts.touch});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push(w+'x'+h+' '+e.message));pg.on('console',m=>{if(m.type()=='error')errs.push('console '+m.text())});await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3500);return pg}
// 1) gorizontal telefon
let pg=await mk(844,390,{touch:1});
console.log('land',await pg.evaluate(()=>[VW,VH,ROT,PX,W,H]));
await pg.screenshot({path:'L1.png'});
// 2) portret -> burilgan
let pp=await mk(390,844,{touch:1});
console.log('port',await pp.evaluate(()=>[VW,VH,ROT,PX,W,H,document.getElementById('root').style.transform]));
await pp.screenshot({path:'L2.png'});
// bosish tekshiruvi: portretda ekranning "ZARBA" tugmasini topamiz
const r=await pp.evaluate(()=>{const e=document.getElementById('atk').getBoundingClientRect();return [e.x+e.width/2,e.y+e.height/2]});
console.log('atk screen',r);
await pp.evaluate(()=>{window.__t=0;document.getElementById('atk').addEventListener('pointerdown',()=>window.__t++)});
await pp.touchscreen.tap(r[0],r[1]);await pp.waitForTimeout(200);
console.log('atk tapped',await pp.evaluate(()=>window.__t));
// joystick: dunyoga bosib surish (portret): koordinata xaritasi
await pp.evaluate(()=>{window.__c=[];addEventListener('pointerdown',e=>window.__c.push([e.clientX,e.clientY,e.pointerType]),true)});
await pp.touchscreen.tap(100,200);
console.log('mapped',await pp.evaluate(()=>window.__c));
console.log('errors',errs);
await b.close()})();
