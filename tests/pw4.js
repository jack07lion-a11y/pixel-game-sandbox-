const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3500);
console.log(await pg.evaluate(()=>[!!PMD,HS.length,trees.length,AN.length]));
await pg.evaluate(()=>{P.x=252*32+16;P.y=30*32+16;cam.i=0;P.fly=1});await pg.waitForTimeout(1200);await pg.screenshot({path:'coast1.png'});
await pg.evaluate(()=>{P.x=252*32+16;P.y=30*32+16;P.fly=0});await pg.waitForTimeout(300);
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
await pg.keyboard.press('m');await pg.waitForTimeout(2500);await pg.screenshot({path:'globe3.png'});
console.log(errs.slice(0,5));await b.close()})();
