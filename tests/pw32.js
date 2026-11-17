const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const cx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()=='error')errs.push('console '+m.text())});
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3000);
await pg.evaluate(()=>{Object.keys(INV).forEach(k=>INV[k]=99);bedOpen();});
await pg.waitForTimeout(500);await pg.screenshot({path:'B0.png'});
// uy qurish: 6x5 devor 2 qavat + eshik + oyna + tom
const n=await pg.evaluate(()=>{const tx=Math.floor(P.x/16)+3,ty=Math.floor(P.y/16)-2;let ok=0,fail=[];
 const put=(x,y,t,lv)=>{SB.rem=0;SB.sel=t;const r=sbxAct(tx+x,ty+y,lv,true);if(r&&r.put)ok++;else fail.push([x,y,t,lv])};
 for(let x=0;x<6;x++)for(let y=0;y<5;y++){const edge=x==0||y==0||x==5||y==4;if(!edge){put(x,y,14,0);continue}
   if(x==2&&y==4){put(x,y,4,0);continue}
   const t=(y==0&&(x==2||x==3))?3:(x==0&&y==2)?3:(x%2?24:2);put(x,y,t,0);put(x,y,t==3?3:1,1)}
 for(let x=-1;x<7;x++)for(let y=-1;y<6;y++)put(x,y,26,2);
 BED.cx=tx+2.5;BED.cy=ty+2;return{ok,fail:fail.slice(0,5),nf:fail.length}});
console.log(JSON.stringify(n));
await pg.waitForTimeout(500);await pg.screenshot({path:'B1.png'});
await pg.evaluate(()=>{BED.cut=1;BED.lv=0;BED.auto=0});await pg.waitForTimeout(400);await pg.screenshot({path:'B2.png'});
await pg.evaluate(()=>{BED.cut=0;BED.auto=1;BED.tt=0});await pg.waitForTimeout(600);await pg.screenshot({path:'B3.png'});
await pg.evaluate(()=>{BED.tt=1;BED.r=1;BED.cut=1;BED.lv=0});await pg.waitForTimeout(600);await pg.screenshot({path:'B4.png'});
console.log('errors',errs);await b.close()})();
