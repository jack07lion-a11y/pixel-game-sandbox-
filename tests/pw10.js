const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);console.log('load',errs);
await pg.evaluate(()=>{hero=true;P.pw=100;P.hp=100;const a=AN.find(a=>a.sp==11);P.x=a.x-300;P.y=a.y-300;cam.i=0;toggleFly()});await pg.waitForTimeout(1200);
await pg.keyboard.down('d');await pg.waitForTimeout(1500);await pg.screenshot({path:'f1.png'});
console.log('cruise',await pg.evaluate(()=>[Math.round(FS),Math.round(P.z),FTire.toFixed(2),P.pw|0]));
await pg.keyboard.down('Shift');await pg.waitForTimeout(1800);await pg.screenshot({path:'f2.png'});
console.log('boost',await pg.evaluate(()=>[Math.round(FS),Math.round(P.z),FTire.toFixed(2),P.pw|0,sonic]));
await pg.keyboard.up('Shift');await pg.keyboard.up('d');await pg.waitForTimeout(600);await pg.screenshot({path:'f3.png'});
console.log('glide',await pg.evaluate(()=>[Math.round(FS)]));
await pg.waitForTimeout(3500);await pg.screenshot({path:'f4.png'});console.log('hover',await pg.evaluate(()=>[Math.round(FS),FTire.toFixed(2)]));
// impact: fly through animals
const info=await pg.evaluate(()=>{const g=AN.filter(a=>a.sp==11);const a=g[0];P.x=a.x-120;P.y=a.y-120;ALT=5;P.z=5;FVx=0;FVy=0;cam.i=0;return[g.length,AN.length]});console.log('herd',info);
await pg.waitForTimeout(600);
await pg.keyboard.down('d');await pg.keyboard.down('s');await pg.keyboard.down('Shift');await pg.waitForTimeout(1500);await pg.screenshot({path:'f5.png'});
await pg.keyboard.up('d');await pg.keyboard.up('s');await pg.keyboard.up('Shift');
console.log('after',await pg.evaluate(()=>[AN.length,AN.filter(a=>a.dead>0).length,AN.filter(a=>a.down>0).length,AN.filter(a=>a.hurt>0).length,trees.filter(t=>t[4].st>0).length]));
// ocean plunge
const r=await pg.evaluate(()=>{let f=null;for(let y=400;y<WH-300&&!f;y+=64)for(let x=300;x<WW-300&&!f;x+=64)if(deepAt(x,y)&&deepAt(x+90,y)&&deepAt(x,y+90)&&Math.hypot(x-HOME[0],y-HOME[1])>400)f=[x,y];return f});
await pg.evaluate(([x,y])=>{P.fly=1;hero=true;P.pw=100;P.x=x;P.y=y;P.z=40;ALT=40;FVx=0;FVy=0;cam.i=0},r);await pg.waitForTimeout(800);
await pg.keyboard.down('z');await pg.waitForTimeout(950);await pg.screenshot({path:'f6.png'});await pg.keyboard.up('z');
console.log('plunge',await pg.evaluate(()=>[UW.on,Math.round(UW.z),UW.enter]));await pg.waitForTimeout(350);await pg.screenshot({path:'f7.png'});
await pg.waitForTimeout(1500);await pg.screenshot({path:'f8.png'});
await pg.keyboard.down('q');await pg.waitForTimeout(4000);await pg.keyboard.up('q');
console.log('breach',await pg.evaluate(()=>[UW.on,P.fly,Math.round(P.z),Math.round(FS),UW.air|0]));await pg.screenshot({path:'f9.png'});
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
console.log(errs.slice(0,5));await b.close()})();
