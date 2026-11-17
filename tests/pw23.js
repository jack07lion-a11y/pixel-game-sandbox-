const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const cx=await b.newContext({...devices['iPhone 13']});const pg=await cx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);
await pg.tap('#bd');await pg.waitForTimeout(500);await pg.screenshot({path:'m1.png'});
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('mobile fps',fps,errs);await b.close()})();
