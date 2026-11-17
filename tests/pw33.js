const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const mode of ['land','port']){
const vp=mode=='land'?{width:844,height:390}:{width:390,height:844};
const cx=await b.newContext({viewport:vp,deviceScaleFactor:2,hasTouch:true,isMobile:true});const pg=await cx.newPage();pg.on('pageerror',e=>errs.push(mode+' '+e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3000);
await pg.evaluate(()=>{Object.keys(INV).forEach(k=>INV[k]=99);bedOpen();SB.rem=0;SB.sel=1;BED.auto=1});await pg.waitForTimeout(300);
// ekran koordinatalari: tugma bosish orqali
async function scr(tx,ty){return pg.evaluate(([tx,ty])=>{const G=bedGeo();let found=null;for(let b=-G.nb;b<=G.nb;b++)for(let a=-G.na;a<=G.na;a++){const t=bedTile(G,a,b);if(t[0]==tx&&t[1]==ty)found=[a,b]}
  const x=(BW/2+(found[0]+G.fu)*G.T)*PX,y=(BH/2+(found[1]+G.fv)*G.th)*PX;
  return ROT?[innerWidth-y,x]:[x,y]},[tx,ty])}
const base=await pg.evaluate(()=>[Math.floor(P.x/16)+4,Math.floor(P.y/16)]);
const p1=await scr(base[0],base[1]);
// 3 marta bosib ustma-ust (avto), 3D
for(let i=0;i<3;i++){await pg.touchscreen.tap(p1[0],p1[1]);await pg.waitForTimeout(150)}
let top=await pg.evaluate(([x,y])=>{bedCol();return BED.col.get(y*TXM+x)},base);
console.log(mode,'3D stack top lv (kutilgan 2):',top);
// tepadan
await pg.evaluate(()=>{BED.tt=0;BED.tl=0});await pg.waitForTimeout(200);
const base2=[base[0]+1,base[1]];const p2=await scr(base2[0],base2[1]);
await pg.touchscreen.tap(p2[0],p2[1]);await pg.waitForTimeout(150);
console.log(mode,'plan placed:',await pg.evaluate(([x,y])=>!!BLK.get(bkey(x,y,0)),base2));
// buzish (rem) tepadan
await pg.evaluate(()=>{SB.rem=1});await pg.touchscreen.tap(p2[0],p2[1]);await pg.waitForTimeout(150);
console.log(mode,'removed:',await pg.evaluate(([x,y])=>!BLK.get(bkey(x,y,0)),base2));
// yer qazish (ushlab turish)
const base3=[base[0]+2,base[1]+1];const p3=await scr(base3[0],base3[1]);
const cd=await pg.context().newCDPSession(pg);
await cd.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:p3[0],y:p3[1]}]});await pg.waitForTimeout(1400);await cd.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
console.log(mode,'dig depth:',await pg.evaluate(([x,y])=>pitD(x,y),base3));
await pg.screenshot({path:'T_'+mode+'.png'});
}
console.log('errors',errs);await b.close()})();
