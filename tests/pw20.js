const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,400)));
const t0=Date.now();await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);console.log('load',errs);
console.log(JSON.stringify(await pg.evaluate(()=>CIV.map(c=>c&&[c.sn,c.x,c.y,c.bld.length,civPop(c.id),rgT(c.x>>4,c.y>>4),biome(c.x>>4,c.y>>4)]))));
for(const i of [0,1,2]){await pg.evaluate(i=>{const c=CIV[i];P.x=c.x+10;P.y=c.y+60;cam.i=0;hero=true;P.hp=100;P.pw=100},i);await pg.waitForTimeout(2500);await pg.screenshot({path:'c'+i+'.png'});console.log(i,errs.slice(0,3))}
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
console.log(errs.slice(0,5));await b.close()})();
