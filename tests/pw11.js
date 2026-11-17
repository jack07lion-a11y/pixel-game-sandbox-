const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message+(e.stack||'').slice(0,300)));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(5000);console.log('load',errs);
// fizika: bir yil
const orb=await pg.evaluate(()=>{const S=SOL;const out=[];let rmin=1e9,rmax=0;const st0=S.ST;let ang0=Math.atan2(S.ry,S.rx),acc=0,prev=ang0;
 for(let i=0;i<1800;i++){solarStep(1);const a=Math.atan2(S.ry,S.rx);let d=a-prev;if(d<-3.14)d+=6.2832;acc+=d;prev=a;rmin=Math.min(rmin,S.r);rmax=Math.max(rmax,S.r);if(i%150==149)out.push([S.ST|0,solDate(),solSeason(),(S.dec*57.3).toFixed(1),S.r.toFixed(1)])}
 return{rmin,rmax,turn:acc/6.2832,out}});console.log(JSON.stringify(orb));
// iqlim: qish/yoz
const cl=await pg.evaluate(()=>{const r=[];for(let k=0;k<4;k++){SOL.ST+=450;solarStep(0.01);let f=0,mn=1e9,mx=-1e9;for(let y=0;y<TYR;y++){f+=FZ[y];}r.push([solDate(),solSeason(),'frozenRows',f,'Teq',TRW[225].toFixed(0),'T@N',TRW[40].toFixed(0),'T@S',TRW[410].toFixed(0)])}return r});console.log(JSON.stringify(cl));
// kun-tun: o'yinchi uchun
const dn=await pg.evaluate(()=>{const o=[];for(let i=0;i<8;i++){SOL.ST+=SOL.DAY/8;solarStep(.01);o.push(solV().toFixed(2))}return o});console.log('sunV',dn.join(' '));
// xarita: globus
await pg.evaluate(()=>{toggleMap()});await pg.waitForTimeout(1500);await pg.screenshot({path:'s1.png'});
await pg.evaluate(()=>{setMode(2)});await pg.waitForTimeout(1500);await pg.screenshot({path:'s2.png'});
await pg.evaluate(()=>{focusTo(2)});await pg.waitForTimeout(2500);await pg.screenshot({path:'s3.png'});
await pg.evaluate(()=>{SP.foc=0;SP.cx=0;SP.cy=0;SP.tz=2.2});await pg.waitForTimeout(1800);await pg.screenshot({path:'s4.png'});
await pg.evaluate(()=>{SP.ts=400});await pg.waitForTimeout(1500);await pg.screenshot({path:'s5.png'});
await pg.evaluate(()=>{SP.ts=1;focusTo(1)});await pg.waitForTimeout(2500);await pg.screenshot({path:'s6.png'});
await pg.evaluate(()=>{setMode(0)});await pg.waitForTimeout(800);await pg.screenshot({path:'s7.png'});
await pg.evaluate(()=>{toggleMap()});
console.log(errs.slice(0,5));await b.close()})();
