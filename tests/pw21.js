const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,400)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(4500);
// uzoq simulyatsiya (o'yinchi uzoqda)
const sim=await pg.evaluate(()=>{const out=[];for(let m=0;m<24;m++){for(let i=0;i<1200;i++){time+=.05;solarStep(.05);dayN=Math.max(0,Math.min(1,.5-solV()*1.2));civUpdate(.05)}out.push([m+1,civPop(0),civPop(1),civPop(2),CIV[0].bld.filter(b=>b.t=='house').length,CA.filter(a=>a.c==0&&a.k=='c').length,CA.filter(a=>a.raid).length,!!CIV[0].king,!!CIV[1].king,dayN.toFixed(1)].join(','))}return out});
console.log(sim.join('\n'));console.log(errs);
// kunduz, odamlar
await pg.evaluate(()=>{while(solV()<.6)solarStep(4);const c=CIV[0];P.x=c.x+10;P.y=c.y+70;cam.i=0;hero=true;P.hp=100;P.pw=100});await pg.waitForTimeout(2500);await pg.screenshot({path:'d0.png'});
await pg.evaluate(()=>{const c=CIV[1];P.x=c.x+10;P.y=c.y+70;cam.i=0;P.hp=100});await pg.waitForTimeout(2500);await pg.screenshot({path:'d1.png'});
// jang
await pg.keyboard.press('l');await pg.waitForTimeout(700);await pg.keyboard.press('o');await pg.waitForTimeout(1500);for(let i=0;i<8;i++){await pg.keyboard.press('j');await pg.waitForTimeout(260)}
console.log('fight',await pg.evaluate(()=>[ko,P.hp|0,P.pw|0,civPop(1),INV.bone,P.pois>0]));await pg.screenshot({path:'d2.png'});
await pg.evaluate(()=>{const c=CIV[2];P.x=c.x+10;P.y=c.y+90;cam.i=0;P.hp=100;P.pw=100});await pg.waitForTimeout(2500);await pg.screenshot({path:'d3.png'});
// qurilish
await pg.evaluate(()=>{P.x=HOME[0]+60;P.y=HOME[1]+90;cam.i=0;INV.wood=60;INV.stone=40;INV.iron=30;INV.chip=9;INV.cell=9;INV.crystal=9;INV.gold=5;INV.fiber=9;INV.coal=9});await pg.waitForTimeout(800);
await pg.keyboard.press('n');await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{const tx=wtx(P.x),ty=wty(P.y);let n=0;const put=(dx,dy,t)=>{SB.sel=t;sbxAct(tx+dx,ty+dy);n++};
 for(let i=-2;i<=2;i++){put(i,-3,1);put(i,2,i==0?4:2)}for(let j=-2;j<=1;j++){put(-3,j,1);put(3,j,3)}put(-1,-1,5);put(0,-1,5);put(1,-1,14);put(-2,-2,9);put(2,-2,10);put(0,4,8);put(2,4,7);put(-2,4,11);put(-4,4,12);put(4,4,20);put(5,2,15);put(5,0,16);put(-5,0,17);put(-5,2,18);put(5,-2,19);put(-1,5,13);put(0,6,21);return[BLK.size,n,CA.filter(a=>a.c==3).length,JSON.stringify(INV)]});console.log('build',r);
await pg.waitForTimeout(1500);await pg.screenshot({path:'d4.png'});
await pg.keyboard.press('c');await pg.waitForTimeout(400);await pg.screenshot({path:'d5.png'});
console.log(errs.slice(0,6));await b.close()})();
