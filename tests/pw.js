const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:520}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text())});
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(2500);
console.log('size',await pg.evaluate(()=>[WW,WH,trees.length]));
// walk to the east edge
await pg.evaluate(()=>{P.x=WW-30;P.y=800;cam.i=0});await pg.waitForTimeout(500);
await pg.screenshot({path:'edge1.png'});
await pg.evaluate(()=>{P.x=WW-4});await pg.keyboard.down('d');await pg.keyboard.down('s');await pg.waitForTimeout(1500);await pg.keyboard.up('d');await pg.keyboard.up('s');
console.log('after',await pg.evaluate(()=>[P.x|0,P.y|0]));
await pg.screenshot({path:'edge2.png'});
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));
console.log('fps',fps);
await pg.keyboard.press('m');await pg.waitForTimeout(2500);await pg.screenshot({path:'globe.png'});
await pg.click('#gs');await pg.waitForTimeout(500);await pg.screenshot({path:'flat.png'});
console.log('errors',errs.slice(0,5));
await b.close()})();
