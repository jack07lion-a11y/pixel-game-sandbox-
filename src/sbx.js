// ===================== SANDBOX: resurslar, qurilish, buzish, yasash =====================
const INV={wood:10,stone:6,fiber:2,iron:0,coal:0,gold:0,crystal:0,bone:0,meat:0,wheat:0,food:1,chip:0,cell:0};
const INM={wood:['🪵','Yog‘och'],stone:['🪨','Tosh'],fiber:['🌿','Tola'],iron:['⛓','Temir'],coal:['⚫','Ko‘mir'],gold:['🥇','Oltin'],crystal:['💎','Kristall'],bone:['🦴','Suyak'],meat:['🥩','Go‘sht'],wheat:['🌾','Bug‘doy'],food:['🍞','Ovqat'],chip:['🔲','Mikrosxema'],cell:['🔋','Energiya']};
const TLS={sword:0,armor:0,laser:0,shield:0};
// id: [nom, belgi, narx, qattiq(1), stansiya, jon]
const BD={1:['Yog‘och devor','🟫',{wood:2},1,'',30],2:['Tosh devor','⬜',{stone:2},1,'',80],3:['Oyna','🪟',{stone:1,coal:1},1,'fu',12],4:['Eshik','🚪',{wood:3},1,'',30],5:['Yog‘och pol','🟧',{wood:1},0,'',10],14:['Tosh pol','◻️',{stone:1},0,'',10],
  6:['Panjara','🚧',{wood:1},1,'',16],7:['Mash’al','🔥',{wood:1,coal:1},0,'',6],8:['Gulxan','🏕',{wood:3,stone:2},1,'',20],9:['Karavot','🛏',{wood:4,fiber:2},1,'',20],10:['Sandiq','📦',{wood:4},1,'',20],
  11:['Dastgoh','🛠',{wood:6},1,'',30],12:['O‘choq','♨️',{stone:8},1,'wb',60],13:['Ekin maydoni','🌱',{fiber:1},0,'',6],
  20:['Laboratoriya','🔬',{iron:6,crystal:2,gold:1},1,'wb',60],15:['Lazer minora','🗼',{iron:5,chip:2,cell:1},1,'lab',70],16:['Kuch maydoni','🟦',{cell:1,crystal:1},1,'lab',160],17:['Teleport','🌀',{chip:2,crystal:3},0,'lab',20],
  18:['Quyosh paneli','🔆',{iron:3,crystal:1,chip:1},1,'lab',20],19:['Elektr chiroq','💡',{iron:1,cell:1},1,'lab',16],21:['Robot yordamchi','🤖',{iron:8,chip:3,cell:2},0,'lab',0]};
const BORD=[1,2,4,5,14,6,7,8,9,10,11,13,12,3,20,19,16,15,18,17,21];
const ITM=[['food','🍞 Non',{wheat:2},'','Ovqat +1'],['cook','🍖 Go‘sht pishirish',{meat:1},'cf','Ovqat +1'],['sword','⚔️ Qilich',{iron:3,wood:1},'wb','Zarba ×1.6'],['armor','🛡 Zirh',{iron:6},'wb','Zarar −40%'],
  ['cell','🔋 Energiya',{coal:2,crystal:1},'fu','Kelajak qurilmalari uchun'],['chip','🔲 Mikrosxema',{iron:2,gold:1},'lab','Kelajak qurilmalari uchun'],['laser','🔫 Lazer kuchaytirgich',{chip:2,crystal:2,cell:1},'lab','Olov zarbasi ×2.5'],['shield','✨ Energiya qalqoni',{cell:2,chip:1},'lab','50 zararni yutadi']];
const STN={wb:[11,'Dastgoh'],fu:[12,'O‘choq'],lab:[20,'Laboratoriya'],cf:[8,'Gulxan']};
const SB={on:0,sel:1,rem:0,cur:null,curT:-9,dirty:0,saveT:3,tpCd:0,beams:[],robots:0,tick:0};
const BLK=new Map(),bkey=(tx,ty)=>ty*TXM+tx,wtx=v=>((Math.floor(v/16)%TXM)+TXM)%TXM,wty=v=>((Math.floor(v/16)%TYM)+TYM)%TYM;
const sbxAt=(x,y)=>BLK.get(bkey(wtx(x),wty(y)));
function invAdd(k,n){INV[k]=(INV[k]||0)+n;SB.dirty=1;pops.push({x:P.x+Math.random()*10-5,y:P.y,z:38+Math.random()*8,t:1,s:'+'+n+' '+INM[k][0]});invUI()}
function invGive(t){TLS[t]=1;sbxApply();SB.dirty=1;pop('Yangi buyum: '+(t=='sword'?'⚔️ Qilich':t),2.2);invUI()}
function sbxApply(){DMGM=TLS.sword?1.6:1;ARMM=TLS.armor?.6:1;LASM=TLS.laser?2.5:1}
const canPay=c=>Object.keys(c).every(k=>(INV[k]||0)>=c[k]),pay=c=>Object.keys(c).forEach(k=>INV[k]-=c[k]);
const costS=c=>Object.keys(c).map(k=>c[k]+INM[k][0]).join(' ');
function nearStn(s){if(!s)return true;const id=STN[s][0];for(const b of BLK.values())if(b.t==id&&Math.hypot(dwx(b.x+8,P.x),dwy(b.y+8,P.y))<90)return true;return false}
function sbxPut(tx,ty,t,quiet,g){const d=BD[t],b={t,tx,ty,x:tx*16,y:ty*16,hp:d[5],g:g||0,fl:0,cd:0};if(d[3]){b.sol={x:b.x+1,y:b.y+1,w:14,h:14};solids.push(b.sol)}BLK.set(bkey(tx,ty),b);if(!quiet){SB.dirty=1;if(AC){t==2||t==12||t==14?sndThud():sndWood()}for(let i=0;i<5;i++)dust.push({x:b.x+Math.random()*16,y:b.y+Math.random()*16,z:0,vz:8+Math.random()*6,l:.4})}return b}
function sbxRemove(b,refund){BLK.delete(bkey(b.tx,b.ty));if(b.sol){const i=solids.indexOf(b.sol);if(i>=0)solids.splice(i,1)}SB.dirty=1;
  for(let i=0;i<10;i++){const a=Math.random()*6.28;fxs.push({x:b.x+8,y:b.y+8,z:6,vx:Math.cos(a)*40,vy:Math.sin(a)*40,vz:30+Math.random()*40,l:.6,c:b.t==2||b.t==12||b.t==14?'#8d8f99':b.t>=15?'#6ae0ff':'#a8793f'})}
  if(refund){const c=BD[b.t][2];Object.keys(c).forEach(k=>{const n=Math.ceil(c[k]/2);if(n)INV[k]+=n});invUI()}if(AC&&onNear(b,500))sndWood()}
function sbxBite(a,x,y){const b=sbxAt(x,y);if(!b||!b.sol)return false;if(a.cd<=0){a.cd=a.c==2?1.4:1;a.st='atk';a.wd=a.w=.4;a.did=1;a.an=0;b.hp-=a.dmg;b.fl=.2;if(AC&&onNear(b,400))sndWood();if(b.hp<=0){sbxRemove(b,0);if(onNear(b,400))pops.push({x:b.x+8,y:b.y+8,z:20,t:1,s:'Devor buzildi!'})}}return true}
function scrTile(cx,cy){const sx=cx/PX,sy=cy/PX,a=cam.x+sx,b=2*(cam.y+sy);return[wtx((a+b)/2),wty((b-a)/2)]}
function sbxCur(){if(SB.cur&&time-SB.curT<4)return SB.cur;const a=P.sec*Math.PI/4,fx=Math.cos(a),fy=Math.sin(a),wx=.5*(fy+fx),wy=.5*(fy-fx),l=Math.hypot(wx,wy)||1;return[wtx(P.x+wx/l*18),wty(P.y+wy/l*18)]}
function sbxAct(tx,ty){const cx=tx*16+8,cy=ty*16+8,k=bkey(tx,ty),ex=BLK.get(k);
  if(Math.hypot(dwx(cx,P.x),dwy(cy,P.y))>120){pop('Juda uzoq — yaqinroq boring');return}
  if(SB.rem){if(!ex){pop('Bu yerda blok yo‘q');return}sbxRemove(ex,1);return}
  const t=SB.sel,d=BD[t];if(ex){pop('Bu joy band');return}
  if(!canPay(d[2])){pop('Yetmaydi: '+costS(d[2]));return}if(!nearStn(d[4])){pop('Avval '+STN[d[4]][1]+' quring va yonida turing');return}
  if(isW(tx,ty)&&!(FZ[ty]==1)){pop('Suv ustiga qurib bo‘lmaydi');return}
  if(t==21){pay(d[2]);SB.robots++;robSpawn(cx,cy);SB.dirty=1;invUI();pop('Robot ishga tushdi 🤖',1.6);return}
  if(d[3]){if(Math.hypot(dwx(cx,P.x),dwy(cy,P.y))<11){pop('O‘zingiz turgan joy');return}if(hit(cx,cy)){pop('Bu yerda to‘siq bor');return}if(CA.some(a=>a.dead<=0&&Math.hypot(dwx(a.x,cx),dwy(a.y,cy))<10)){pop('Bu yerda kimdir turibdi');return}}
  pay(d[2]);sbxPut(tx,ty,t);invUI()}
function sbxTap(cx,cy){const c=scrTile(cx,cy);SB.cur=c;SB.curT=time;sbxAct(c[0],c[1])}
function robSpawn(x,y){caNew(3,'v','rb',x,y,{hp:90,dmg:11,spd:66,nm:'Robot'})}
function robTick(a,dt){const d=cdist(a,P);if(d>700){a.x=P.x+20;a.y=P.y+20;return}if(d>44)caMove(a,P.x,P.y,d>140?120:66,dt);else a.mv=0}
function sbxSleep(){if(dayN<.5){pop('Hali kunduz — uxlab bo‘lmaydi');return}for(let i=0;i<400&&solV()<.18;i++)solarStep(3);P.hp=100;P.sta=100;flashT2=.6;pop('Tong otdi ☀️ — dam oldingiz',2)}
function sbxEat(){if(INV.food<=0){pop('Ovqat yo‘q — non yoping yoki go‘sht pishiring');return}if(P.hp>=100&&!(P.pois>0)){pop('Jon to‘la');return}INV.food--;P.hp=Math.min(100,P.hp+30);P.pois=0;SB.dirty=1;if(AC)sndApple();pop('+30 ❤️');invUI()}
function sbxCraft(i){const r=ITM[i];if(!canPay(r[2])){pop('Yetmaydi: '+costS(r[2]));return}if(!nearStn(r[3])){pop(STN[r[3]][1]+' yonida turing');return}
  if(TLS[r[0]]){pop('Bu buyum sizda bor');return}pay(r[2]);const k=r[0];if(k=='food'||k=='cook')INV.food++;else if(k=='cell'||k=='chip')INV[k]++;else{TLS[k]=1;if(k=='shield')P.shd=50;sbxApply()}
  SB.dirty=1;if(AC)sndCoin();pop('Yasaldi: '+r[1],1.6);invUI()}
function sbxUpdate(dt){SB.tpCd-=dt;SB.tick-=dt;const tick=SB.tick<=0;if(tick)SB.tick=.5;
  SB.beams.forEach(b=>b.t-=dt);if(SB.beams.length)SB.beams=SB.beams.filter(b=>b.t>0);
  const ptx=wtx(P.x),pty=wty(P.y),pb=BLK.get(bkey(ptx,pty));
  if(pb&&P.z<4){if(pb.t==13&&pb.g>=1){pb.g=0;invAdd('wheat',2);if(Math.random()<.5)invAdd('fiber',1)}
    if(pb.t==17&&SB.tpCd<=0){const pads=[...BLK.values()].filter(b=>b.t==17);if(pads.length>1){const n=pads[(pads.indexOf(pb)+1)%pads.length];P.x=n.x+8;P.y=n.y+8;cam.i=0;SB.tpCd=1.6;flashT2=.35;if(AC)sndWarp();rings.push({x:P.x,y:P.y,t:.25,n:2})}}}
  if(P.shd>0&&!TLS.shield)P.shd=0;
  for(const b of BLK.values()){if(b.fl>0)b.fl-=dt;
    if(b.t==13){if(b.g<1)b.g+=dt/55*(dayN<.5?1:.3)}
    else if(b.t==4){const op=Math.hypot(dwx(b.x+8,P.x),dwy(b.y+8,P.y))<24;if(op!=b.op){b.op=op;b.sol.x=op?-999:b.x+1;if(AC&&onNear(b,300))sndCreak()}}
    else if(b.t==8){if(Math.hypot(dwx(b.x+8,P.x),dwy(b.y+8,P.y))<34&&P.dead<=0)P.hp=Math.min(100,P.hp+3*dt)}
    else if(b.t==18){if(dayN<.3){b.g+=dt;if(b.g>90){b.g=0;if(INV.cell<20){INV.cell++;SB.dirty=1;if(onNear(b,300))pops.push({x:b.x+8,y:b.y+8,z:20,t:1,s:'+1 🔋'});invUI()}}}}
    else if(b.t==15&&tick){b.cd-=.5;if(b.cd<=0){let best=null,bd=160;for(const a of CA){if(a.dead>0||a.hid||!(a.c==1||(a.c==2&&GH>0)))continue;const d=Math.hypot(dwx(a.x,b.x+8),dwy(a.y,b.y+8));if(d<bd){bd=d;best=a}}
        for(const e of EN){if(e.dead>0)continue;const d=Math.hypot(e.x-b.x-8,e.y-b.y-8);if(d<bd){bd=d;best=e}}
        if(best){b.cd=.5;b.ang=Math.atan2(dwy(best.y,b.y+8),dwx(best.x,b.x+8));const dx=dwx(best.x,b.x+8),dy=dwy(best.y,b.y+8),d=Math.hypot(dx,dy)||1;SB.beams.push({x0:b.x+8,y0:b.y+8,x1:best.x,y1:best.y,z1:(best.z||0)+12*(best.sc||1),t:.14});
          if(best.c!==undefined)caHit(best,9,dx/d*.3,dy/d*.3,null);else eHit(best,9,dx/d*.3,dy/d*.3);if(AC&&onNear(b,420)){tone(1400,AC.currentTime,.08,'square',sfxG,.05);tone(700,AC.currentTime+.03,.1,'sawtooth',sfxG,.04)}}}}}
  if(SB.dirty){SB.saveT-=dt;if(SB.saveT<=0){SB.saveT=3;SB.dirty=0;sbxSave()}}}
function sbxSave(){try{localStorage.setItem('jsSbx'+MSZ,JSON.stringify({i:INV,t:TLS,r:SB.robots,b:[...BLK.values()].map(b=>[b.tx,b.ty,b.t,+(b.g||0).toFixed(2)])}))}catch(e){}}
function sbxLoad(){try{const d=JSON.parse(localStorage.getItem('jsSbx'+MSZ));if(!d)return;Object.assign(INV,d.i||{});Object.assign(TLS,d.t||{});(d.b||[]).forEach(q=>{if(BD[q[2]]&&q[0]<TXM&&q[1]<TYM)sbxPut(q[0],q[1],q[2],1,q[3])});SB.robots=Math.min(4,d.r||0);for(let i=0;i<SB.robots;i++)robSpawn(P.x+20+i*10,P.y+20);if(TLS.shield)P.shd=50}catch(e){}sbxApply()}
// ---------- chizish ----------
function sbxGround(){const c=SB.on?sbxCur():null;
  for(const b of BLK.values()){if(b.t!=5&&b.t!=14&&b.t!=13&&b.t!=17)continue;if(!onS(b.x+8,b.y+8))continue;const o=pj(b.x,b.y),X=o[0]-16,Y=o[1];
    if(b.t==5){dmd(X,Y,'#b08a56');ctx.fillStyle='#8a6a40';for(let r=3;r<16;r+=4){const w=r<8?4*(r+1):4*(16-r);ctx.fillRect(X+16-w/2,Y+r,w,1)}}
    else if(b.t==14){dmd(X,Y,'#9a9ca6');ctx.fillStyle='#7c7d88';ctx.fillRect(X+8,Y+8,16,1);ctx.fillRect(X+16,Y+3,1,5);ctx.fillRect(X+12,Y+9,1,4)}
    else if(b.t==13){dmd(X,Y,'#5a3e26');const hh=1+Math.round(Math.min(1,b.g)*5),col=b.g>=1?'#e8c84a':b.g>.5?'#9ac04a':'#5aa84a';for(let j=3;j<16;j+=5)for(let i=3;i<16;i+=4){const q=pj(b.x+i,b.y+j);ctx.fillStyle=col;ctx.fillRect(q[0],q[1]-hh,1,hh);if(b.g>=1){ctx.fillStyle='#fff3a0';ctx.fillRect(q[0],q[1]-hh-1,1,1)}}}
    else{dmd(X,Y,'#2a3a5a');const q=pj(b.x+8,b.y+8);ctx.fillStyle='rgba(120,220,255,'+(.5+.4*Math.sin(time*5))+')';for(let a=0;a<12;a++){const t=a*.524+time*2;ctx.fillRect(q[0]+Math.round(Math.cos(t)*9),q[1]+Math.round(Math.sin(t)*4.5),2,1)}ctx.fillStyle='rgba(180,240,255,.5)';ctx.fillRect(q[0]-1,q[1]-14-Math.round((time*20)%10),2,6)}}
  if(c){const o=pj(c[0]*16,c[1]*16),ex=BLK.get(bkey(c[0],c[1])),ok=SB.rem?!!ex:(!ex&&canPay(BD[SB.sel][2]));dmd(o[0]-16,o[1],ok?'rgba(120,255,140,'+(.3+.15*Math.sin(time*6))+')':'rgba(255,90,80,.35)')}}
function sbxDraw(b){const x=b.x,y=b.y,o=pj(x+8,y+8),X=o[0]+(b.fl>0?Math.round(Math.sin(time*70)):0),Y=o[1],nt=dayN>.3;
  switch(b.t){
  case 1:cub(x,y,16,16,0,17,'#c2955a','#9a6f3a','#7a5429');{const a=pj(x,y+16);ctx.fillStyle='#6b4a2a';for(let k=5;k<17;k+=6)for(let i=0;i<16;i++)ctx.fillRect(a[0]+i,a[1]+(i>>1)-k,1,1);const c=pj(x+16,y+16);for(let k=5;k<17;k+=6)for(let i=0;i<16;i++)ctx.fillRect(c[0]+i,c[1]-(i>>1)-k,1,1)}break;
  case 2:cub(x,y,16,16,0,17,'#a8aab4','#7c7d88','#62636e');{const a=pj(x,y+16);ctx.fillStyle='#55565f';for(let k=4;k<17;k+=4)for(let i=0;i<16;i++){ctx.fillRect(a[0]+i,a[1]+(i>>1)-k,1,1);if((i+k*2)%8==0)ctx.fillRect(a[0]+i,a[1]+(i>>1)-k,1,4)}}break;
  case 3:ctx.globalAlpha=.5;cub(x,y,16,16,0,17,'#cfeeff','#9fd4f0','#7fbfe0');ctx.globalAlpha=1;{const a=pj(x,y+16);ctx.fillStyle='rgba(255,255,255,.7)';for(let i=3;i<8;i++)ctx.fillRect(a[0]+i,a[1]+(i>>1)-14+i,1,2)}break;
  case 4:if(b.op){cub(x,y,3,16,0,16,'#8a5a2c','#74481f','#5c3816')}else{cub(x,y+6,16,4,0,16,'#a06a36','#8a5a2c','#6e4620');const a=pj(x,y+10);ctx.fillStyle='#ffd23a';ctx.fillRect(a[0]+11,a[1]-3,2,2)}break;
  case 6:cub(x+1,y+6,3,3,0,10,'#b8894f','#96693a','#7a5429');cub(x+12,y+6,3,3,0,10,'#b8894f','#96693a','#7a5429');cub(x+1,y+7,14,1,6,2,'#c89a5b','#9a6f3a','#7a5429');cub(x+1,y+7,14,1,2,2,'#c89a5b','#9a6f3a','#7a5429');break;
  case 7:E(X,Y,3,1,'rgba(0,0,0,.25)');ctx.fillStyle='#6b4a2a';ctx.fillRect(X-1,Y-12,2,12);fireAt(X,Y-12,2,'#e8641c','#ffb030','#fff0a0');break;
  case 8:E(X,Y+1,8,3,'rgba(0,0,0,.25)');ctx.fillStyle='#7c7d88';for(let i=0;i<6;i++){const a=i/6*6.28;ctx.fillRect(X+Math.round(Math.cos(a)*7)-1,Y+Math.round(Math.sin(a)*3)-1,3,2)}ctx.fillStyle='#5a3b22';ctx.fillRect(X-5,Y-2,10,2);fireAt(X,Y-2,3,'#e8641c','#ffb030','#fff0a0');break;
  case 9:cub(x+1,y+2,14,12,0,5,'#d04a4a','#8a5a2c','#6e4620');cub(x+1,y+2,4,12,5,2,'#f4f0e6','#d8d2c4','#bcb6a8');break;
  case 10:cub(x+2,y+4,12,8,0,7,'#b8832a','#8a5a1c','#6e4616');cub(x+2,y+4,12,8,7,3,'#c9922c','#a8761f','#8a5e18');{const a=pj(x+2,y+12);ctx.fillStyle='#ffe27a';ctx.fillRect(a[0]+5,a[1]-5,2,3)}break;
  case 11:cub(x+1,y+3,14,10,0,9,'#c89a5b','#9a6f3a','#7a5429');{ctx.fillStyle='#8d8f99';ctx.fillRect(X-4,Y-13,6,2);ctx.fillStyle='#6b4a2a';ctx.fillRect(X-1,Y-12,1,5);ctx.fillStyle='#e04a3a';ctx.fillRect(X+3,Y-11,3,1)}break;
  case 12:cub(x+1,y+1,14,14,0,14,'#8e8f99','#70717c','#585962');{const a=pj(x+1,y+15);ctx.fillStyle='#1a1210';ctx.fillRect(a[0]+4,a[1]-7,6,6);ctx.fillStyle=Math.sin(time*9)>0?'#ffb030':'#e8641c';ctx.fillRect(a[0]+5,a[1]-5,4,4);ctx.fillStyle='#585962';ctx.fillRect(X+2,Y-24,3,6)}break;
  case 20:cub(x+1,y+1,14,14,0,13,'#c8d0d8','#8e9aa6','#6e7a86');{const a=pj(x+1,y+15);ctx.fillStyle='#1a2a3a';ctx.fillRect(a[0]+3,a[1]-9,8,5);ctx.fillStyle=Math.sin(time*4)>0?'#6ae0ff':'#3a9ac0';ctx.fillRect(a[0]+4,a[1]-8,6,3);ctx.fillStyle='#8e9aa6';ctx.fillRect(X,Y-27,1,10);ctx.fillStyle=Math.sin(time*6)>0?'#ff4a4a':'#7a1a1a';ctx.fillRect(X-1,Y-29,3,3)}break;
  case 15:{cub(x+3,y+3,10,10,0,9,'#8e9aa6','#6e7a86','#55606a');const a=b.ang||time*.6,sx=Math.cos(a)-Math.sin(a),sy=(Math.cos(a)+Math.sin(a))*.5,l=Math.hypot(sx,sy)||1;E(X,Y-14,4,3,'#c8d0d8');ctx.fillStyle='#55606a';for(let i=0;i<8;i++)ctx.fillRect(X+Math.round(sx/l*i)-1,Y-15+Math.round(sy/l*i),2,2);ctx.fillStyle=Math.sin(time*8)>0?'#ff4a4a':'#7a1a1a';ctx.fillRect(X-1,Y-18,2,2)}break;
  case 16:ctx.globalAlpha=.38+.14*Math.sin(time*4+x);cub(x,y,16,16,0,20,'#aef4ff','#5ad0ff','#3aa8e8');ctx.globalAlpha=1;{const a=pj(x,y+16);ctx.fillStyle='rgba(255,255,255,.8)';const k=((time*14)|0)%20;for(let i=0;i<16;i++)ctx.fillRect(a[0]+i,a[1]+(i>>1)-k,1,1)}break;
  case 18:E(X,Y+1,8,3,'rgba(0,0,0,.25)');ctx.fillStyle='#55606a';ctx.fillRect(X-1,Y-6,2,6);for(let r=0;r<7;r++){ctx.fillStyle=r%3==0?'#8ab8e8':'#2a4a9a';ctx.fillRect(X-9+r,Y-13+r,14,1)}ctx.fillStyle='rgba(255,255,255,.6)';if(dayN<.3)ctx.fillRect(X-4+((time*6|0)%8),Y-11,2,1);break;
  case 19:E(X,Y,3,1,'rgba(0,0,0,.25)');ctx.fillStyle='#55606a';ctx.fillRect(X-1,Y-19,2,19);E(X,Y-21,3,3,nt?'#fff6c8':'#c8d0d8');break}}
function sbxItems(items){for(const b of BLK.values()){if(b.t==5||b.t==14||b.t==13||b.t==17)continue;if(!onS(b.x+8,b.y+8))continue;const s=b.t==4&&!b.op?{x0:b.x,x1:b.x+16,y0:b.y+6,y1:b.y+10}:{x0:b.x+1,x1:b.x+15,y0:b.y+1,y1:b.y+15};items.push({...s,f(){sbxDraw(b)}})}}
// ---------- UI ----------
document.body.insertAdjacentHTML('beforeend','<style>#bd,#iv,#sx{position:fixed;width:56px;height:56px;border-radius:50%;border:3px solid #fff;font-size:22px;color:#fff;padding:0;z-index:5}#bd{right:156px;bottom:calc(env(safe-area-inset-bottom,0px) + 172px);background:rgba(150,100,40,.85)}#bd.on{background:#c98a10;border-color:#ffe27a}#iv{right:218px;bottom:calc(env(safe-area-inset-bottom,0px) + 44px);background:rgba(90,60,130,.85)}#sx{right:94px;bottom:calc(env(safe-area-inset-bottom,0px) + 172px);background:rgba(170,40,40,.85);border-color:#ffe27a}'
 +'#bbar{position:fixed;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 62px);display:none;gap:5px;overflow-x:auto;padding:6px;background:rgba(10,14,24,.82);border:2px solid #ffe27a;border-radius:12px;z-index:6;max-width:760px;margin:0 auto;touch-action:pan-x}#bbar button{flex:0 0 auto;min-width:58px;height:58px;border-radius:10px;border:2px solid #556;background:#1c2436;color:#fff;font:11px ui-monospace,monospace;padding:2px 4px;line-height:1.15}#bbar button b{font-size:19px;display:block}#bbar button.on{border-color:#ffe27a;background:#4a3a10}#bbar button.no{opacity:.45}#bbar button.fut{border-color:#3ac0ff}'
 +'#ivp{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,520px);max-height:84vh;overflow:auto;display:none;background:rgba(10,14,24,.95);border:2px solid #b48aff;border-radius:14px;padding:12px;color:#fff;font:13px ui-monospace,monospace;z-index:30}#ivp h3{margin:4px 0 8px;font-size:15px;color:#ffe27a}#ivg{display:grid;grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:5px;margin-bottom:10px}#ivg div{background:#1c2436;border-radius:8px;padding:5px;text-align:center}#ivg div b{display:block;font-size:17px}#ivr button{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;margin:4px 0;padding:8px 10px;border-radius:9px;border:2px solid #556;background:#1c2436;color:#fff;font:12px ui-monospace,monospace;text-align:left}#ivr button.ok{border-color:#5ad06a}#ivr button.has{border-color:#ffe27a;opacity:.7}#ivr small{color:#9ab;display:block}#ivx{position:absolute;right:10px;top:8px;width:34px;height:34px;border-radius:50%;border:2px solid #fff;background:#3a1a2a;color:#fff}</style>'
 +'<button id="bd">🔨</button><button id="iv">🎒</button><div id="bbar"></div><div id="ivp"><button id="ivx">✕</button><h3>🎒 Buyumlar</h3><div id="ivg"></div><h3>🛠 Yasash</h3><div id="ivr"></div><h3>🌍 Dunyo holati</h3><div id="ivw" style="line-height:1.7;color:#cde"></div><h3>ℹ️ Yordam</h3><small style="color:#9ab;line-height:1.5">🔨 — qurish rejimi: blokni tanlang va yerga bosing (yoki Y). ⛏ — buzish (yarmi qaytadi). Daraxt yiqitsangiz yog‘och, tosh maydalasangiz tosh/temir/ko‘mir/oltin tushadi. Zombilar devorni kemiradi — tosh devor mustahkamroq. Jang san’ati (🥋): L aylanma tepki, I apperkot, O yer zarbasi, H chaqmoq zarba, P blok; ZARBA ni ketma-ket bossangiz kombo davom etadi. Karavot yonida Y — uxlash. Tugmalar: N qurish, Y qo‘yish, X buzish, C buyumlar, G ovqat. Kelajak buyumlari uchun Dastgoh → O‘choq → Laboratoriya quring.</small></div>');
const bbar=document.getElementById('bbar'),ivp=document.getElementById('ivp');
function bbarUI(){let h='<button data-r="1" class="'+(SB.rem?'on':'')+'"><b>⛏</b>Buzish</button>';BORD.forEach(t=>{const d=BD[t];h+='<button data-b="'+t+'" class="'+(!SB.rem&&SB.sel==t?'on ':'')+(canPay(d[2])?'':'no ')+(t>=15?'fut':'')+'" title="'+d[0]+'"><b>'+d[1]+'</b>'+costS(d[2])+'</button>'});bbar.innerHTML=h}
function invUI(){if(SB.on)bbarUI();if(ivp.style.display!='block')return;
  document.getElementById('ivg').innerHTML=Object.keys(INM).map(k=>'<div><b>'+INM[k][0]+'</b>'+INM[k][1]+'<br>'+(INV[k]||0)+'</div>').join('')+Object.keys(TLS).filter(k=>TLS[k]).map(k=>'<div><b>'+({sword:'⚔️',armor:'🛡',laser:'🔫',shield:'✨'})[k]+'</b>bor</div>').join('');
  document.getElementById('ivw').innerHTML=CIV.length?('👑 Odamlar: '+civPop(0)+' kishi, '+CIV[0].bld.filter(b=>b.t=='house').length+' uy — munosabat: '+(REP<=-3?'<b style="color:#f66">dushman</b>':REP>=3?'<b style="color:#6f8">do‘st</b>':'betaraf')+'<br>🧟 Zombilar: '+civPop(1)+(CA.some(a=>a.raid)?' — <b style="color:#f66">hujumda!</b>':'')+'<br>🗿 Devlar: '+civPop(2)+' — '+(GH>0?'<b style="color:#f66">g‘azabda</b>':'tinch')+'<br><small>Xaritada (🗺) uchala saltanat belgilangan</small>'):'Bu kichik xaritada sivilizatsiyalar yo‘q — «Olam» xaritasini tanlang';
  document.getElementById('ivr').innerHTML='<button data-eat="1" class="'+(INV.food>0?'ok':'')+'"><span>🍽 Ovqat yeyish<small>+30 ❤️, zaharni ketkazadi</small></span><span>'+INV.food+'🍞</span></button>'+ITM.map((r,i)=>'<button data-i="'+i+'" class="'+(TLS[r[0]]?'has':canPay(r[2])&&nearStn(r[3])?'ok':'')+'"><span>'+r[1]+'<small>'+r[4]+(r[3]?' · kerak: '+STN[r[3]][1]:'')+'</small></span><span>'+costS(r[2])+'</span></button>').join('')}
function sbxToggle(v){SB.on=v===undefined?!SB.on:v;bbar.style.display=SB.on?'flex':'none';document.getElementById('bd').classList.toggle('on',!!SB.on);if(SB.on){bbarUI();if(!SB.hint){SB.hint=1;pop('Blokni tanlang → yerga bosing yoki Y',2.5)}}}
function ivToggle(){const s=ivp.style.display=='block';ivp.style.display=s?'none':'block';if(!s)invUI()}
const stopE=e=>{e.stopPropagation()};
document.getElementById('bd').onpointerdown=e=>{e.stopPropagation();e.preventDefault();sbxToggle();sndClick()};
document.getElementById('iv').onpointerdown=e=>{e.stopPropagation();e.preventDefault();ivToggle();sndClick()};
document.getElementById('ivx').onpointerdown=e=>{e.stopPropagation();e.preventDefault();ivToggle()};
ivp.onpointerdown=stopE;bbar.onpointerdown=stopE;
bbar.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.r){SB.rem=!SB.rem}else{SB.rem=0;SB.sel=+b.dataset.b;pop(BD[SB.sel][0],.9)}bbarUI()};
document.getElementById('ivr').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.eat)sbxEat();else sbxCraft(+b.dataset.i)};
let bTp=null;
addEventListener('pointerdown',e=>{if(SB.on&&e.target===cv)bTp={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId}},true);
addEventListener('pointerup',e=>{if(bTp&&e.pointerId===bTp.id){if(SB.on&&Math.hypot(e.clientX-bTp.x,e.clientY-bTp.y)<12&&performance.now()-bTp.t<450)sbxTap(e.clientX,e.clientY);bTp=null}},true);
addEventListener('pointermove',e=>{if(SB.on&&e.pointerType=='mouse'&&e.target===cv){SB.cur=scrTile(e.clientX,e.clientY);SB.curT=time}});
addEventListener('keydown',e=>{if(e.repeat||gmOpen||edOpen)return;const k=e.key.toLowerCase();if(k=='n')sbxToggle();else if(k=='c')ivToggle();else if(k=='g')sbxEat();
  else if(k=='y'){if(SB.on){const c=sbxCur();sbxAct(c[0],c[1])}else{for(const b of BLK.values())if(b.t==9&&Math.hypot(dwx(b.x+8,P.x),dwy(b.y+8,P.y))<26){sbxSleep();return}}}
  else if(k=='x'&&SB.on){SB.rem=!SB.rem;bbarUI()}});
sbxLoad();
