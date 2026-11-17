const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);
await pg.evaluate(()=>{const a=AN.find(a=>a.sp==11);P.x=a.x;P.y=a.y+40;cam.i=0});await pg.waitForTimeout(2500);
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>3000)r(n/3);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps,errs);await b.close()})();
