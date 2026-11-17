const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(4000);
await pg.evaluate(()=>{const c=document.createElement('canvas');c.width=900;c.height=560;c.style.cssText='position:fixed;left:0;top:0;z-index:999;image-rendering:pixelated;background:#567';document.body.appendChild(c);const g=c.getContext('2d');g.imageSmoothingEnabled=false;
 const Z={...RP,suit:['#6a7a52','#4c5a3a','#34402a','#1e2618'],skin:['#9ac27a','#78a05c','#547a40','#36522a'],hair:['#3a4a2a','#26321c','#161e10','#0a0e08'],pant:['#4a4038','#342c26','#221c18','#12100c'],boot:['#3a3430','#26221e','#161412','#0a0908']};
 [[null,0],[null,1],[null,2],[null,3],[Z,1],[Z,2],[Z,3]].forEach((q,i)=>{MKR=q[0];[0,3,6,9,12,15].forEach((f,j)=>{if(q[1]&&f>7)return;[0,2,4].forEach((d,k)=>{g.drawImage(mk(d,f,q[1]),j*120+k*38,i*78,60,78)})})});MKR=null});
await pg.screenshot({path:'sp.png'});console.log(errs);await b.close()})();
