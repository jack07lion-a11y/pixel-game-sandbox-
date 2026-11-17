const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m1');await pg.waitForTimeout(3000);console.log('m1',errs,await pg.evaluate(()=>[CIV.length,CA.length]));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.reload();await pg.waitForTimeout(4500);console.log('m5',errs);
await pg.mouse.click(450,300);
// bo'ri ovi
const w=await pg.evaluate(()=>{const a=AN.find(a=>a.sp==16);if(!a)return null;P.x=a.x+60;P.y=a.y+60;cam.i=0;hero=true;P.pw=100;P.hp=100;const pr=newA(13,a.x+50,a.y,null);AN.filter(q=>q.sp==16&&Math.abs(q.x-a.x)<200).forEach(q=>q.hung=0);return[a.x|0,a.y|0]});console.log('wolf',w);
await pg.waitForTimeout(6000);console.log('eco',await pg.evaluate(()=>[AN.filter(a=>a.eco).map(a=>a.sp+':'+a.eco).join(' ')]));await pg.screenshot({path:'e1.png'});
// maxsus zarbalar zombilarda
await pg.evaluate(()=>{const c=CIV[1];P.x=c.x+30;P.y=c.y+60;cam.i=0;P.hp=100;P.pw=100});await pg.waitForTimeout(1500);
for(const k of ['l','i','o','h','j','j','j','j','j','j']){await pg.keyboard.press(k);await pg.waitForTimeout(650)}
await pg.click('#sx');await pg.waitForTimeout(700);await pg.screenshot({path:'e2.png'});
console.log('fight',await pg.evaluate(()=>[ko,P.hp|0,P.pw|0,civPop(1),JSON.stringify(INV)]));
// saqlash
await pg.evaluate(()=>{P.x=HOME[0]+60;P.y=HOME[1]+90;INV.wood=30;SB.sel=1;const tx=wtx(P.x),ty=wty(P.y);sbxAct(tx+2,ty);sbxAct(tx+2,ty+1);sbxSave()});
await pg.reload();await pg.waitForTimeout(4500);console.log('reload',await pg.evaluate(()=>[BLK.size,INV.wood]),errs.slice(0,5));
// devlar bilan jang
await pg.mouse.click(450,300);await pg.evaluate(()=>{const c=CIV[2];P.x=c.x+30;P.y=c.y+70;cam.i=0;hero=true;P.hp=100;P.pw=100});await pg.waitForTimeout(1200);
for(let i=0;i<10;i++){await pg.keyboard.press('j');await pg.waitForTimeout(300)}await pg.waitForTimeout(2500);await pg.screenshot({path:'e3.png'});
console.log('giants',await pg.evaluate(()=>[GH|0,P.hp|0,civPop(2),CPJ.length]));
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
console.log(errs.slice(0,6));await b.close()})();
