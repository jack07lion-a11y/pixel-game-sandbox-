const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const cx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()=='error')errs.push('console '+m.text())});
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3500);
// 1) qazish
const r=await pg.evaluate(()=>{const tx=Math.floor(P.x/16),ty=Math.floor(P.y/16);INV.dirt=0;INV.stone=0;const out=[];
  let n=0;for(let dx=2;dx<=4;dx++)for(let dy=-1;dy<=1;dy++){for(let i=0;i<60;i++){digHit(tx+dx,ty+dy,.3,false)}n++}
  // chuqurroq
  for(let k=0;k<400;k++)digHit(tx+3,ty,.3,false);
  return{tile:[tx,ty],dg:[...DG].map(([k,v])=>[k%TXM-tx,((k/TXM)|0)-ty,v.d,v.w]),inv:{dirt:INV.dirt,sand:INV.sand,stone:INV.stone,coal:INV.coal,iron:INV.iron,snowb:INV.snowb,gold:INV.gold,crystal:INV.crystal},mat:[0,1,2,3].map(k=>matAt(tx+3,ty,k)),bi:biome(tx,ty)}});
console.log(JSON.stringify(r));
await pg.waitForTimeout(600);await pg.screenshot({path:'D1.png'});
// 2) ushlab turish bilan qazish (sichqoncha)
const h=await pg.evaluate(()=>{sbxToggle(1);SB.rem=1;const tx=Math.floor(P.x/16),ty=Math.floor(P.y/16);const o=pj((tx-2)*16+8,(ty+1)*16+8);return{x:o[0]*PX,y:o[1]*PX,tx:tx-2,ty:ty+1,d0:pitD(tx-2,ty+1)}});
console.log('hold target',h);
await pg.mouse.move(h.x,h.y);await pg.mouse.down();await pg.waitForTimeout(1500);await pg.mouse.up();
console.log('after hold',await pg.evaluate((h)=>({d:pitD(h.tx,h.ty),dirt:INV.dirt}),h));
// 3) to'ldirish
const f=await pg.evaluate(()=>{const tx=Math.floor(P.x/16)+3,ty=Math.floor(P.y/16);INV.dirt=20;SB.rem=0;SB.sel=22;const d0=pitD(tx,ty);const res=sbxAct(tx,ty,0,false);return{d0,d1:pitD(tx,ty),res:JSON.stringify(res),dirt:INV.dirt}});
console.log('fill',f);
console.log('errors',errs);await b.close()})();
