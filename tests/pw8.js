const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);
console.log(errs);
console.log(await pg.evaluate(()=>{const c={};AN.forEach(a=>c[a.sp]=(c[a.sp]||0)+1);return JSON.stringify([AN.length,c])}));
const pos=await pg.evaluate(()=>{const o={};AN.forEach(a=>{if(a.sp>=11&&!o[a.sp])o[a.sp]=[a.x,a.y]});return o});
for(const k of Object.keys(pos)){const [x,y]=pos[k];await pg.evaluate(([x,y])=>{P.x=x-20;P.y=y+30;P.fly=0;cam.i=0},[x,y]);await pg.waitForTimeout(900);await pg.screenshot({path:'an'+k+'.png'})}
// river & road view
const rv=await pg.evaluate(()=>{for(let ty=60;ty<TYM-20;ty+=5)for(let tx=70;tx<TXM-20;tx+=5)if(isW(tx,ty)&&!isOc(tx,ty)&&isW(tx+1,ty)&&isW(tx,ty+8)&&biome(tx,ty)==0)return[tx*16,ty*16];return null});
console.log('river',rv);
if(rv){await pg.evaluate(([x,y])=>{P.x=x;P.y=y-60;P.fly=1;cam.i=0},rv);await pg.waitForTimeout(1500);await pg.screenshot({path:'river1.png'})}
await pg.keyboard.press('m');await pg.waitForTimeout(3000);await pg.screenshot({path:'globe4.png'});
console.log(errs.slice(0,3));await b.close()})();
