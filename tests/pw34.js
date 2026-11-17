const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const fps=pg=>pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(Math.round(n/2));else requestAnimationFrame(f)};requestAnimationFrame(f)}));
for(const [w,h,n] of [[667,320,'se'],[932,430,'pm'],[1180,820,'ipad'],[1366,768,'desk']]){
const cx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push(n+' '+e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3000);
const info=await pg.evaluate(()=>[VW,VH,PX,W,H,getComputedStyle(document.getElementById('root')).getPropertyValue('--u')]);
await pg.screenshot({path:'S_'+n+'.png'});
console.log(n,info,'fps',await fps(pg));
if(n=='pm'){await pg.evaluate(()=>{Object.keys(INV).forEach(k=>INV[k]=99);bedOpen()});await pg.waitForTimeout(500);console.log('editor fps',await fps(pg));await pg.evaluate(()=>bedClose());
 // xarita
 await pg.click('#mm');await pg.waitForTimeout(800);await pg.screenshot({path:'S_map.png'});await pg.click('#gx');await pg.waitForTimeout(300);
 await pg.click('#ed0');await pg.waitForTimeout(800);await pg.screenshot({path:'S_wed.png'});}
await cx.close()}
// saqlash/yuklash
const cx=await b.newContext({viewport:{width:844,height:390}});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push('persist '+e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(2500);
const tt=await pg.evaluate(()=>{Object.keys(INV).forEach(k=>INV[k]=50);const tx=Math.floor(P.x/16)+3,ty=Math.floor(P.y/16)+3;SB.rem=0;SB.sel=2;sbxAct(tx,ty,0,true);sbxAct(tx,ty,1,true);SB.sel=26;sbxAct(tx,ty,3,true);for(let i=0;i<40;i++)digHit(tx+1,ty,.3,false);SB.dirty=1;SB.saveT=0;return[tx,ty,pitD(tx+1,ty)]});
await pg.waitForTimeout(1500);await pg.reload();await pg.waitForTimeout(2500);
console.log('reload',await pg.evaluate(([tx,ty])=>({b0:!!BLK.get(bkey(tx,ty,0)),b1:!!BLK.get(bkey(tx,ty,1)),b3:!!BLK.get(bkey(tx,ty,3)),pit:pitD(tx+1,ty),sol:solids.length}),tt));
console.log('errors',errs);await b.close()})();
