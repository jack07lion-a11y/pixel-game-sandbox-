const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(let run=0;run<3;run++){
const cx=await b.newContext({viewport:{width:844,height:390}});const pg=await cx.newPage();pg.on('pageerror',e=>console.log('PAGEERR',e.message,(e.stack||'').split('\n').slice(0,5).join(' | ')));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(2500);
const tt=await pg.evaluate(()=>{Object.keys(INV).forEach(k=>INV[k]=50);const tx=Math.floor(P.x/16)+2,ty=Math.floor(P.y/16)+2;SB.rem=0;SB.sel=2;sbxAct(tx,ty,0,true);sbxAct(tx,ty,1,true);SB.sel=26;sbxAct(tx,ty,3,true);SB.rem=1;for(let i=0;i<60;i++)digHit(tx-1,ty,.3,false);SB.dirty=1;SB.saveT=0;return[tx,ty,pitD(tx-1,ty)]});
await pg.waitForTimeout(1500);await pg.reload();await pg.waitForTimeout(2500);
console.log('run',run,tt,await pg.evaluate(([tx,ty])=>({b0:!!BLK.get(bkey(tx,ty,0)),b1:!!BLK.get(bkey(tx,ty,1)),b3:!!BLK.get(bkey(tx,ty,3)),pit:pitD(tx-1,ty),n:BLK.size}),tt));
await cx.close()}
await b.close()})();
