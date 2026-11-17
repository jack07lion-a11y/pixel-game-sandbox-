const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3500);
console.log('boats',await pg.evaluate(()=>BOATS.length+' '+JSON.stringify(BOATS[0])));
// find a deep ocean point & place player in it
const r=await pg.evaluate(()=>{let f=null;for(let y=300;y<WH-300&&!f;y+=64)for(let x=300;x<WW-300&&!f;x+=64)if(deepAt(x,y)&&Math.hypot(x-HOME[0],y-HOME[1])>400)f=[x,y];return f});console.log('deep',r);
await pg.evaluate(([x,y])=>{P.x=x;P.y=y;cam.i=0},r);await pg.waitForTimeout(1500);
console.log(await pg.evaluate(()=>[P.sw,Math.round(P.sta),P.hp]));await pg.screenshot({path:'o1.png'});
// boat near
await pg.evaluate(()=>{const b=BOATS[0];P.x=b.x+10;P.y=b.y;cam.i=0});await pg.waitForTimeout(600);await pg.keyboard.press('b');await pg.keyboard.down('d');await pg.waitForTimeout(1500);await pg.keyboard.up('d');
console.log('boat on',await pg.evaluate(()=>[BT.on,Math.round(P.x),Math.round(P.y)]));await pg.screenshot({path:'o2.png'});
// dive
await pg.keyboard.press('v');await pg.waitForTimeout(2500);console.log('uw',await pg.evaluate(()=>[UW.on,UW.cr.length,Math.round(UW.z),Math.round(UW.air)]));await pg.screenshot({path:'o3.png'});
await pg.keyboard.down('s');await pg.keyboard.down('z');await pg.waitForTimeout(2500);await pg.keyboard.up('s');await pg.keyboard.up('z');await pg.screenshot({path:'o4.png'});
console.log(await pg.evaluate(()=>[UW.on,UW.cr.length,Math.round(UW.z),Math.round(UW.air),UW.cr.map(c=>c.sp).join('')]));
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
await pg.keyboard.down('q');await pg.waitForTimeout(4500);await pg.keyboard.up('q');console.log('after up',await pg.evaluate(()=>[UW.on,P.sw,Math.round(P.sta)]));
console.log(errs.slice(0,5));await b.close()})();
