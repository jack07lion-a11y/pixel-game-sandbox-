const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);console.log('load',errs);
console.log(await pg.evaluate(()=>{const S=SOL;const d0=solDate(),a0=Math.atan2(S.ry,S.rx);let acc=0,prev=a0,rmin=1e9,rmax=0;for(let i=0;i<1800;i++){solarStep(1);const a=Math.atan2(S.ry,S.rx);let d=a-prev;if(d<-3.14)d+=6.2832;acc+=d;prev=a;rmin=Math.min(rmin,S.r);rmax=Math.max(rmax,S.r)}return[d0,solDate(),(acc/6.2832).toFixed(3),rmin.toFixed(1),rmax.toFixed(1)]}));
// qish ga o'tkazish: ~ 4-yanvar (ST ~ 1200)
await pg.evaluate(()=>{while(solSeason()!='Qish'||SOL.dec>-.35)solarStep(5)});
console.log(await pg.evaluate(()=>[solDate(),solSeason(),(SOL.dec*57.3).toFixed(1),FZ.reduce((a,b)=>a+b,0)]));
// shimol qutb tomon: qatorni topish: muzlagan suv va suv bor joy
const r=await pg.evaluate(()=>{let best=null;for(let ty=20;ty<200;ty+=4)if(FZ[ty]){for(let tx=100;tx<WW/16-100&&!best;tx+=6)if(isW(tx,ty)&&isW(tx+3,ty)&&isW(tx,ty+3)&&isW(tx-3,ty)&&!isOc(tx,ty)){best=[tx*16,ty*16]}if(best)break}return best});console.log('river/lake frozen',r);
let place=r;
if(!place)place=await pg.evaluate(()=>{for(let ty=20;ty<200;ty+=4)if(FZ[ty])for(let tx=100;tx<WW/16-100;tx+=6)if(isOc(tx,ty)&&isOc(tx+3,ty)&&isOc(tx,ty+3))return[tx*16,ty*16];return null});
console.log('place',place);
await pg.evaluate(([x,y])=>{P.x=x;P.y=y;cam.i=0;time=1},place);await pg.waitForTimeout(2500);await pg.screenshot({path:'w1.png'});
console.log(await pg.evaluate(()=>[document.getElementById('tp').textContent,P.sw,oc(P.x,P.y),hit(P.x,P.y),dayN.toFixed(2),sunV.toFixed(2),snowA.toFixed(2)]));
// yoz: kun bor
await pg.evaluate(()=>{while(solSeason()!='Yoz'||SOL.dec<.35)solarStep(5)});
await pg.evaluate(()=>{P.x=P.x+0;});await pg.waitForTimeout(2000);await pg.screenshot({path:'w2.png'});
console.log(await pg.evaluate(()=>[document.getElementById('tp').textContent,solDate(),FZ[(P.y/16)|0],dayN.toFixed(2)]));
// ekvator
await pg.evaluate(()=>{const ty=225;let f=null;for(let tx=100;tx<WW/16&&!f;tx+=7)if(!isW(tx,ty)&&!isP(tx,ty))f=[tx*16,ty*16];P.x=f[0];P.y=f[1];cam.i=0});await pg.waitForTimeout(2000);await pg.screenshot({path:'w3.png'});
console.log(await pg.evaluate(()=>[document.getElementById('tp').textContent,dayN.toFixed(2)]));
const fps=await pg.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)}));console.log('fps',fps);
console.log(errs.slice(0,5));await b.close()})();
