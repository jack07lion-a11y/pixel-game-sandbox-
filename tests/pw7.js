const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
const t0=Date.now();await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(4500);
console.log('load ok',Date.now()-t0,errs);
console.log(await pg.evaluate(()=>{const c={};LMK.forEach(m=>c[m.t]=(c[m.t]||0)+1);return JSON.stringify([RZS.length,LMK.length,trees.length,AN.length,c])}));
const types=await pg.evaluate(()=>{const o={};LMK.forEach(m=>{if(!o[m.t])o[m.t]=[m.x,m.y,m.nm]});return o});
for(const t of Object.keys(types)){const [x,y,nm]=types[t];await pg.evaluate(([x,y])=>{P.x=x+6;P.y=y+46;P.fly=0;cam.i=0;RF.length=0},[x,y]);await pg.waitForTimeout(1300);await pg.screenshot({path:'rg'+t+'.png'});console.log(t,nm)}
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
console.log(errs.slice(0,5));await b.close()})();
