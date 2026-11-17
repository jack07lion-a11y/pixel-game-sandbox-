// ===================== SIVILIZATSIYALAR: odamlar, zombilar, devlar =====================
const rmp=h=>{const n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,f=k=>'#'+[r,g,b].map(v=>Math.max(0,Math.min(255,v*k|0)).toString(16).padStart(2,'0')).join('');return[f(1.28),f(1),f(.72),f(.48)]};
const PALX=(suit,skin,hair,pant,boot,cape,mask)=>({suit:rmp(suit),skin:rmp(skin),hair:rmp(hair),pant:rmp(pant),boot:rmp(boot||'#2e2e38'),cape:rmp(cape||'#c02a45'),mask:rmp(mask||'#1f1830')});
const CSET={
  h0:{cv:1,p:PALX('#3a6ea8','#c99a78','#2a211d','#3a3a44')},h1:{cv:1,p:PALX('#3f8a4a','#e0b090','#6a4a2a','#4a4034')},h2:{cv:1,p:PALX('#b8862a','#a8744e','#17110f','#3a3430')},
  h3:{cv:1,p:PALX('#8a4a9a','#e0b090','#3a2616','#8a4a9a','#5a3a2a')},h4:{cv:1,p:PALX('#c0506a','#c99a78','#c8a050','#c0506a','#6a3a3a')},h5:{cv:1,p:PALX('#2a9a9a','#a8744e','#2a211d','#2a9a9a','#3a4a4a')},
  h6:{cv:1,p:PALX('#7a7a82','#d8b8a0','#b8b8c0','#4a4a52')},
  hg:{cv:0,p:PALX('#6a7a8a','#c99a78','#2a211d','#3a4048','#2a2a34','#2a4a9a','#7a8a9a')},hK:{cv:0,p:PALX('#7a2a8a','#d8a888','#8a8a90','#3a2a4a','#5a3a1a','#c8a030','#7a2a8a')},hQ:{cv:1,p:PALX('#b03a7a','#e0b090','#3a2616','#b03a7a','#7a2a4a')},
  z0:{cv:3,p:PALX('#5a5a48','#8ab86a','#3a4a2a','#4a4038','#3a3430')},z1:{cv:3,p:PALX('#4a3a4a','#7a9a8a','#2a3230','#3a3a40','#2a2a2e')},z2:{cv:3,p:PALX('#3a4a5a','#a0a860','#4a4a28','#4a3a30','#30281e')},
  zK:{cv:0,p:PALX('#2a3a2a','#78c05a','#1a2414','#1e241e','#141a14','#3a1a4a','#101410')},zQ:{cv:3,p:PALX('#5a2a6a','#9ad07a','#e8e0d0','#5a2a6a','#2a1a30')},
  g0:{cv:1,p:PALX('#6a5038','#b8a890','#d8d0c0','#4a3a2a','#3a2e22')},g1:{cv:1,p:PALX('#5a4a40','#9aa8b8','#3a2a20','#3a3028','#2a221c')},
  gK:{cv:0,p:PALX('#5a4030','#a8b0c0','#e8e0d0','#3a2e22','#2a2018','#8a6a2a','#5a4030')},gQ:{cv:1,p:PALX('#8a5a3a','#b8a890','#e8e0d0','#8a5a3a','#4a3020')},
  rb:{cv:3,p:PALX('#5a6a78','#b8c0c8','#8a94a0','#48525c','#30383f')}};
function cspr(id,d,f){const S=CSET[id];if(!S.c)S.c=[];if(S.cv&&f>7)f=6;let r=S.c[d*20+f];if(!r){MKR=S.p;r=S.c[d*20+f]=mk(d,f,S.cv);MKR=null}return r}
const MP8=[[2,0],[3,0],[0,0],[3,1],[2,1],[4,1],[1,0],[4,0]];
let CA=[],CIV=[],CPJ=[],ZCV=[],REP=0,GH=0,curCiv=null,giftK=0,DMGM=1,ARMM=1,LASM=1,stompT=0;
const cdist=(a,b)=>Math.hypot(dwx(a.x,b.x),dwy(a.y,b.y));
const onNear=(a,r)=>Math.abs(dwx(a.x,P.x))<r&&Math.abs(dwy(a.y,P.y))<r;
function caNew(c,k,set,x,y,o){const a=Object.assign({c,k,set,x,y,sec:2,fr:Math.random()*6,hp:24,sc:1,spd:34,dmg:6,st:'idle',t:Math.random()*3,tx:x,ty:y,hx:x,hy:y,cd:0,cd2:2,fl:0,stun:0,dead:0,gone:0,z:0,vz:0,kx:0,ky:0,scan:Math.random(),tg:null,w:0,wd:.4,an:0,did:0,age:999,sex:Math.random()<.5?0:1,mate:null,bcd:40+Math.random()*60,say:'',sayT:0,hid:0,mv:0,stk:0,det:null,fear:0,job:null,raid:null,fid:0,hamT:0,podT:20},o||{});a.mh=a.hp;CA.push(a);return a}
const civPop=c=>CA.filter(a=>a.c==c&&a.dead<=0).length;
// ---------- joy tanlash va qurilish ----------
function civSite(pref,taken){const dH=Math.min(1700,WW*.25),dT=Math.min(2400,WW*.3);let best=null,bs=-9;
  for(let gy=300;gy<WH-300;gy+=240)for(let gx=300;gx<WW-300;gx+=240){
    if(Math.hypot(dwx(gx,HOME[0]),dwy(gy,HOME[1]))<dH)continue;if(taken.some(t=>Math.hypot(dwx(gx,t.x),dwy(gy,t.y))<dT))continue;
    let ok=0;for(let i=0;i<28;i++){const a=i*2.4,r=30+(i*37)%200,x=gx+Math.cos(a)*r,y=gy+Math.sin(a)*r;if(!isW(x>>4,y>>4))ok++}
    if(ok<26)continue;const tx=gx>>4,ty=gy>>4,rt=rgT(tx,ty),bi=biome(tx,ty);let s=ok/28+(pref.r.includes(rt)?1:0)+(pref.b.includes(bi)?.5:0)+(hs(gx,gy)%100)/400;
    if(Math.abs(.5-gy/WH)>.34)s-=1.5;if(s>bs){bs=s;best={x:gx,y:gy}}}
  return best}
function civPlace(c,t,w,h,r0,r1,sol,o){for(let i=0;i<60;i++){const a=Math.random()*6.283,r=r0+Math.random()*(r1-r0),x=Math.round(c.x+Math.cos(a)*r-w/2),y=Math.round(c.y+Math.sin(a)*r-h/2);
    let bad=0;for(const q of[[0,0],[w,0],[0,h],[w,h],[w/2,h/2],[w/2,h+8],[-6,h/2],[w+6,h/2]])if(blk(0,x+q[0],y+q[1])){bad=1;break}
    if(bad||c.bld.some(b=>Math.abs(b.x+b.w/2-x-w/2)<(b.w+w)/2+12&&Math.abs(b.y+b.h/2-y-h/2)<(b.h+h)/2+12))continue;return civAdd(c,t,x,y,w,h,sol,o)}return null}
function civAdd(c,t,x,y,w,h,sol,o){const b=Object.assign({t,x,y,w,h,p:1,c:c.id},o||{});if(sol){b.sol={x:x+1,y:y+1,w:w-2,h:h-2};solids.push(b.sol)}c.bld.push(b);return b}
function civInit(){if(WW<2800)return;const tk=[];
  const defs=[{id:0,sn:'Odamlar',name:'Oltin Vodiy qirolligi',sub:'Odamlar · Podshoh Temur va Malika Zuhra',col:'#ffd23a',pref:{r:[2,1,5],b:[0]}},
    {id:1,sn:'Zombilar',name:'Zulmat — zombilar mamlakati',sub:'Qirol Morg‘ul va Malika Zahrona · ehtiyot bo‘ling!',col:'#7ae04a',pref:{r:[3,9],b:[0,3]}},
    {id:2,sn:'Devlar',name:'Devlar tog‘ saltanati',sub:'Shoh Gurgon va Malika Tog‘ora · ulkan velikanlar',col:'#b8a0ff',pref:{r:[14,7,11],b:[3,2]}}];
  defs.forEach(d=>{const s=civSite(d.pref,tk);if(!s)return;tk.push(s);const c=Object.assign(d,{x:s.x,y:s.y,r:330,bld:[],t1:5,t2:20,t3:60,raidT:150,site:null,king:null,queen:null,heirT:0,alarm:0,bell:0});CIV[d.id]=c;
    const rnd=(r)=>[c.x+(Math.random()*2-1)*r,c.y+(Math.random()*2-1)*r];
    if(d.id==0){const cs=civAdd(c,'castle',c.x-38,c.y-90,76,60,1);c.gate=[c.x,c.y-22];civAdd(c,'well',c.x-5,c.y+14,10,10,1);
      for(let i=0;i<7;i++)civPlace(c,'house',30,24,95,215,1,{v:i%3});for(let i=0;i<4;i++)civPlace(c,'farm',46,30,150,260,0,{g:Math.random()});civPlace(c,'stall',16,10,40,80,1,{v:0});civPlace(c,'stall',16,10,40,80,1,{v:1});
      const hs2=c.bld.filter(b=>b.t=='house');
      c.king=caNew(0,'K','hK',c.x-10,c.y-14,{hp:170,dmg:13,sex:0,nm:'Podshoh Temur'});c.queen=caNew(0,'Q','hQ',c.x+10,c.y-14,{hp:50,sex:1,nm:'Malika Zuhra'});c.king.mate=c.queen;c.queen.mate=c.king;
      for(let i=0;i<5;i++){const p=rnd(120);caNew(0,'g','hg',p[0],p[1],{hp:44,dmg:9,spd:40,sex:0})}
      hs2.forEach((h,i)=>{const hx=h.x+h.w/2,hy=h.y+h.h+7,m=caNew(0,'v','h'+[0,1,2,6][i%4],hx,hy,{sex:0,hx,hy}),f=caNew(0,'v','h'+[3,4,5][i%3],hx+6,hy,{sex:1,hx,hy});if(i%2==0){m.mate=f;f.mate=m}
        if(i%3==0)caNew(0,'c','h'+(i%6),hx,hy+6,{age:Math.random()*80,sc:.6,hp:10,hx,hy})})}
    if(d.id==1){civAdd(c,'citadel',c.x-28,c.y-70,56,48,1);c.gate=[c.x,c.y-10];for(let i=0;i<6;i++)civPlace(c,'crypt',26,22,90,220,1);for(let i=0;i<16;i++)civPlace(c,'grave',6,5,40,250,0,{v:i%3});
      civPlace(c,'zfire',10,8,30,70,1);civPlace(c,'zfire',10,8,120,200,1);
      c.king=caNew(1,'K','zK',c.x-10,c.y-4,{hp:220,dmg:15,spd:32,sex:0,nm:'Qirol Morg‘ul'});c.queen=caNew(1,'Q','zQ',c.x+10,c.y-4,{hp:70,dmg:9,sex:1,nm:'Malika Zahrona'});
      for(let i=0;i<20;i++){const p=rnd(190);caNew(1,'v','z'+i%3,p[0],p[1],{hp:32,dmg:7,spd:22,hx:p[0],hy:p[1]})}}
    if(d.id==2){for(let i=0;i<8;i++){const a=i/8*6.283;civAdd(c,'stone',Math.round(c.x+Math.cos(a)*58-5),Math.round(c.y-40+Math.sin(a)*40-4),10,8,1)}civAdd(c,'throne',c.x-9,c.y-58,18,12,1);civAdd(c,'gfire',c.x-7,c.y+22,14,12,1);c.gate=[c.x,c.y+50];
      for(let i=0;i<5;i++)civPlace(c,'ghut',52,42,130,250,1);for(let i=0;i<4;i++)civPlace(c,'totem',6,6,80,240,1,{v:i});
      c.king=caNew(2,'K','gK',c.x-16,c.y-20,{hp:420,dmg:30,spd:30,sc:2.8,sex:0,nm:'Shoh Gurgon'});c.queen=caNew(2,'Q','gQ',c.x+16,c.y-20,{hp:260,dmg:20,spd:28,sc:2.4,sex:1,nm:'Malika Tog‘ora'});
      for(let i=0;i<6;i++){const p=rnd(170);caNew(2,'v','g'+i%2,p[0],p[1],{hp:170,dmg:22,spd:28,sc:2.1+Math.random()*.3,hx:p[0],hy:p[1]})}
      caNew(2,'c','g0',c.x+30,c.y+40,{hp:60,dmg:8,spd:30,sc:1.2,age:20})}})}
// ---------- harakat va jang ----------
function cblk(a,x,y){return blk(0,x,y)}
function caMove(a,tx,ty,sp,dt){if(a.det){a.det.t-=dt;if(a.det.t<=0)a.det=null;else{tx=a.det.x;ty=a.det.y}}
  const dx=dwx(tx,a.x),dy=dwy(ty,a.y),d=Math.hypot(dx,dy);if(d<2){a.mv=0;if(a.det)a.det=null;return d}
  const st=Math.min(d,sp*dt),mx=dx/d*st,my=dy/d*st;a.sec=(Math.round(Math.atan2(dx+dy,dx-dy)/(Math.PI/4))+8)%8;a.mv=1;a.fr+=dt*(sp>50?12:8)*(a.c==2?.55:a.c==1?.7:1);
  if(!onNear(a,1300)){a.x+=mx;a.y+=my;wxy(a);return d}
  let m=0;if(!cblk(a,a.x+mx,a.y)){a.x+=mx;m=1}if(!cblk(a,a.x,a.y+my)){a.y+=my;m++}
  if(m<2){a.stk+=dt*(m?.5:1);if(a.stk>.45){a.stk=0;if(typeof sbxBite=='function'&&a.c!=0&&a.tg&&sbxBite(a,a.x+mx*3,a.y+my*3))return d;const s=Math.random()<.5?1:-1,r=30+Math.random()*40;a.det={x:a.x-dy/d*r*s+dx/d*10,y:a.y+dx/d*r*s+dy/d*10,t:.9+Math.random()*.6}}}else a.stk=Math.max(0,a.stk-dt);
  wxy(a);return d}
function caFind(a){const R=a.raid?200:a.c==1?175:a.c==2?150:165;let best=null,bd=R;
  const fighter=a.c!=0||a.k=='g'||a.k=='K',hp=a.c==1||(a.c==0&&REP<=-3)||(a.c==2&&GH>0);
  if(hp&&fighter&&P.dead<=0&&!UW.on&&P.z<46){const dp=cdist(a,P);if(dp<bd){best=P;bd=dp}}
  for(let i=0;i<CA.length;i++){const b=CA[i];if(b.c==a.c||b.dead>0||b.hid||b===a)continue;
    if(!((a.c==1)||(b.c==1)||(a.c==3&&b.c==2&&GH>0)||(a.c==2&&b.c==3&&GH>0)))continue;if(a.c==1&&b.c==1)continue;
    const dx=dwx(b.x,a.x);if(dx>bd||dx<-bd)continue;const d=Math.hypot(dx,dwy(b.y,a.y));if(d<bd){bd=d;best=b}}
  if(!fighter){if(best&&best!==P){a.fear=6}return null}return best}
function caHit(a,d,ux,uy,src){if(a.dead>0)return;a.hp-=d;a.fl=.18;a.stun=Math.max(a.stun,.28/a.sc);a.kx=ux*110/a.sc;a.ky=uy*110/a.sc;if(a.st=='atk'&&a.sc<2)a.st='idle';
  const col=a.c==1?'#8ae05a':a.c==2?'#c8c0b0':a.c==3?'#ffe27a':'#e05a4a';for(let i=0;i<6;i++){const q=Math.random()*6.28;fxs.push({x:a.x,y:a.y,z:10*a.sc,vx:Math.cos(q)*40,vy:Math.sin(q)*40,vz:20+Math.random()*30,l:.4,c:col})}
  if(src===P){sndHit(a.c==2?2:1,(a.x-a.y-cam.x-W/2)/(W/2));if(a.c==0){REP-=1;if(REP<=-3&&REP>-4.1)pop('Qirollik sizga dushman bo‘ldi!',2);a.fear=5}if(a.c==2){if(GH<=0)pop('Devlar g‘azablandi!',2);GH=150}if(a.c!=0||a.k=='g'||a.k=='K')a.tg=P}
  else if(src&&src.c!==undefined&&!a.tg&&(a.c!=0||a.k=='g'||a.k=='K'))a.tg=src;
  if(a.hp<=0)caDie(a,src)}
function caDie(a,src){a.dead=1.3;a.tg=null;if(a.mate){a.mate.mate=null;a.mate=null}const c=CIV[a.c];
  if(src===P){ko++;kills++;document.getElementById('ko').textContent=ko;P.pw=Math.min(100,P.pw+5);sndKO((a.x-a.y-cam.x-W/2)/(W/2));pops.push({x:a.x,y:a.y,z:30*a.sc,t:.9,s:a.c==1?'ZOMBI YO‘Q!':a.c==2?'DEV YIQILDI!':'YIQILDI!'});
    if(typeof invAdd=='function'){if(a.c==1){invAdd('bone',1+(Math.random()*2|0));if(Math.random()<.25)invAdd('crystal',1)}if(a.c==2){invAdd('iron',3);invAdd('gold',1);invAdd('stone',4)}}
    if(a.c==1){const h=CIV[0];if(h&&Math.hypot(dwx(a.x,h.x),dwy(a.y,h.y))<420){REP=Math.min(8,REP+1);CA.forEach(v=>{if(v.c==0&&v.dead<=0&&!v.hid&&cdist(v,a)<160&&Math.random()<.4){v.say=['Rahmat, qahramon!','Yashang!','Bizni qutqardingiz!'][Math.random()*3|0];v.sayT=2.5}})}}
    if(a.c==0)REP-=2}
  if(a.c==0&&src&&src.c==1)ZCV.push({x:a.x,y:a.y,t:2.6});
  if(c&&(a.k=='K'||a.k=='Q')){if(a.k=='K')c.king=null;else c.queen=null;c.heirT=50;if(onNear(a,900))rzShow(a.nm+' halok bo‘ldi!',c.name)}
  if(a.c==2&&onNear(a,400)){shake=Math.max(shake,.4);sndThud()}}
function caStrike(a,T){const dx=dwx(T.x,a.x),dy=dwy(T.y,a.y),d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d;
  if(T===P){hurtP(a.dmg,ux,uy);if(a.c==1){P.pois=Math.max(P.pois||0,6);if(Math.random()<.5)pop('Zombi tishladi! ☣')}if(a.c==2){shake=Math.max(shake,.45);sndThud()}}
  else caHit(T,a.dmg,ux,uy,a);
  if(a.c==2){for(let i=0;i<6;i++)dust.push({x:a.x+ux*16+Math.random()*12-6,y:a.y+uy*16+Math.random()*12-6,z:0,vz:8+Math.random()*8,l:.5});if(onNear(a,260)&&T!==P){shake=Math.max(shake,.15)}}}
function caFight(a,dt){const T=a.tg,isP=T===P;if(isP?(P.dead>0||UW.on):(T.dead>0||T.gone||T.hid)){a.tg=null;return}
  const d=cdist(T,a),reach=(a.c==2?12*a.sc:13)+(isP?3:(T.sc||1)*4);
  if(a.st=='atk'){a.w-=dt;a.mv=0;if(a.w<=a.wd*.45&&!a.did){a.did=1;if(a.thr){a.thr=0;CPJ.push({x:a.x,y:a.y,sx:a.x,sy:a.y,tx:T.x,ty:T.y,t:0,d:Math.max(.5,d/190),own:a})}else if(d<reach+9&&(isP?P.z<16*a.sc:1))caStrike(a,T)}
    if(a.w<=0){a.st='idle';a.cd=a.c==2?1.5:a.c==1?1:.75}return}
  if(d>(a.raid?520:430)){a.tg=null;return}
  const dx=dwx(T.x,a.x),dy=dwy(T.y,a.y);
  if(a.c==2&&a.sc>1.6&&d>80&&d<240&&a.cd2<=0){a.cd2=4+Math.random()*3;a.thr=1;a.st='atk';a.wd=a.w=.7;a.did=0;a.an=0;a.sec=(Math.round(Math.atan2(dx+dy,dx-dy)/(Math.PI/4))+8)%8;return}
  if(d>reach)caMove(a,T.x,T.y,a.spd*(a.c==1?(dayN>.5?1.7:1.25):1.45),dt);
  else{a.mv=0;a.sec=(Math.round(Math.atan2(dx+dy,dx-dy)/(Math.PI/4))+8)%8;if(a.cd<=0){a.st='atk';a.wd=a.w=a.c==2?.7:.42;a.did=0;a.an=Math.random()*3|0}}}
const GREET=['Salom, Jasurbek!','Xush kelibsiz!','Ob-havo yaxshi-a?','Zombilardan ehtiyot bo‘ling','Podshoh sizni kutyapti','Hosil mo‘l bo‘ldi!','Assalomu alaykum!'];
function humTick(a,c,dt){
  if(a.k=='c'){a.age+=dt;a.sc=.55+.45*Math.min(1,a.age/130);if(a.age>130){a.k='v';a.sc=1;a.hp=a.mh=24;a.age=999}}
  a.bcd-=dt;const night=dayN>.62,fighter=a.k=='g'||a.k=='K';
  if(!fighter&&a.fear>0){a.fear-=dt;const d=caMove(a,a.hx,a.hy,62,dt);if(d<10){a.hid=1;a.mv=0}return}
  if(a.hid){if(!night&&!c.alarm){a.hid=0}return}
  if(a.job){const s=a.job;if(s.p>=1||!c.bld.includes(s)){a.job=null;return}const d=caMove(a,s.x+s.w/2,s.y+s.h+8,40,dt);
    if(d<14){a.mv=0;a.sec=6;s.p+=dt/40;a.hamT-=dt;if(a.hamT<=0){a.hamT=.55;if(onNear(a,240)){sndWood();dust.push({x:s.x+Math.random()*s.w,y:s.y+s.h,z:4,vz:8,l:.4})}}if(s.p>=1){s.p=1;c.site=null;if(onNear(a,500))pops.push({x:s.x+s.w/2,y:s.y+s.h,z:30,t:1.6,s:'Yangi uy qurildi! 🏠'})}}return}
  if(night&&a.k!='g'){const hx=a.k=='K'||a.k=='Q'?c.gate[0]:a.hx,hy=a.k=='K'||a.k=='Q'?c.gate[1]:a.hy,d=caMove(a,hx,hy,36,dt);if(d<9){a.hid=1;a.mv=0}return}
  a.t-=dt;if(a.t<=0){a.t=3+Math.random()*7;const r=Math.random();
    if(a.k=='g'){const q=Math.random()*6.28,rr=120+Math.random()*120;a.tx=c.x+Math.cos(q)*rr;a.ty=c.y+Math.sin(q)*rr}
    else if(a.k=='K'||a.k=='Q'){a.tx=c.x+Math.random()*80-40;a.ty=c.y-10+Math.random()*50}
    else if(a.k=='c'){a.tx=c.x+Math.random()*140-70;a.ty=c.y+Math.random()*120-30}
    else if(r<.45){const f=c.bld.filter(b=>b.t=='farm'||b.t=='stall'),b=f[(a.hx*7|0)%Math.max(1,f.length)];if(b){a.tx=b.x+Math.random()*b.w;a.ty=b.y+b.h+4+Math.random()*4;a.wk=b.t=='farm'}}
    else if(r<.8){a.tx=c.x+Math.random()*120-60;a.ty=c.y+10+Math.random()*70;a.wk=0}else{a.tx=a.hx+Math.random()*20-10;a.ty=a.hy+Math.random()*10;a.wk=0}}
  const d=caMove(a,a.tx,a.ty,a.spd*(a.k=='c'?1.35:1),dt);
  if(d<4){a.mv=0;if(a.wk&&Math.random()<dt*1.5&&onNear(a,300))dust.push({x:a.x+Math.random()*8-4,y:a.y+Math.random()*4,z:0,vz:6,l:.35})}
  if(REP>-3&&a.sayT<=0&&Math.random()<dt*.06&&cdist(a,P)<46&&P.dead<=0){a.say=a.k=='K'?(REP>=3?'Sen bizning qahramonimizsan!':'Qirolligimizga xush kelibsan'):a.k=='c'?'Uchib ko‘rsating! 🤩':GREET[Math.random()*GREET.length|0];a.sayT=2.6}}
function zomTick(a,c,dt){if(a.k=='c'){a.age+=dt;a.sc=.55+.45*Math.min(1,a.age/70);if(a.age>70){a.k='v';a.sc=1;a.hp=a.mh=26;a.age=999}}
  if(a.raid){a.raid.t-=dt;if(a.raid.t<=0){a.raid=null}else{const d=Math.hypot(dwx(a.raid.x,a.x),dwy(a.raid.y,a.y));if(d>210){caMove(a,a.raid.x,a.raid.y,46,dt);return}}}
  if(a.k=='Q'){a.podT-=dt;if(a.podT<=0){a.podT=34+Math.random()*16;if(civPop(1)<46){const q=Math.random()*6.28;civAdd(c,'pod',Math.round(a.x+Math.cos(q)*14),Math.round(a.y+Math.sin(q)*10),6,6,0,{p:0});if(onNear(a,300))pops.push({x:a.x,y:a.y,z:34,t:1.2,s:'Malika tuxum qo‘ydi 🥚'})}}}
  a.t-=dt;if(a.t<=0){a.t=3+Math.random()*6;const ox=a.raid?a.raid.x:(a.k=='v'||a.k=='c'?a.hx:c.x),oy=a.raid?a.raid.y:(a.k=='v'||a.k=='c'?a.hy:c.y),r=a.k=='K'||a.k=='Q'?50:a.raid?150:90;a.tx=ox+Math.random()*2*r-r;a.ty=oy+Math.random()*2*r-r;
    if(!a.raid&&Math.hypot(dwx(a.hx,c.x),dwy(a.hy,c.y))>600){a.hx=c.x+Math.random()*300-150;a.hy=c.y+Math.random()*300-150}}
  if(caMove(a,a.tx,a.ty,a.raid?40:17,dt)<4)a.mv=0}
function giTick(a,c,dt){if(a.k=='c'){a.age+=dt;a.sc=1.2+.9*Math.min(1,a.age/220);if(a.age>220){a.k='v';a.hp=a.mh=170;a.dmg=22;a.age=999}}
  const night=dayN>.62;a.t-=dt;if(a.t<=0){a.t=5+Math.random()*9;if(night){const q=Math.random()*6.28;a.tx=c.x+Math.cos(q)*46;a.ty=c.y+28+Math.sin(q)*34}else{const r=a.k=='K'||a.k=='Q'?70:210;a.tx=c.x+Math.random()*2*r-r;a.ty=c.y+Math.random()*2*r-r}}
  const d=caMove(a,a.tx,a.ty,a.spd,dt);if(d<5)a.mv=0;
  if(a.mv&&a.sc>1.6&&onNear(a,330)){const k=Math.floor(a.fr/3);if(k!==a.lk){a.lk=k;if(stompT<=0){stompT=.22;const v=Math.max(.05,1-cdist(a,P)/330);if(AC){tone(52,AC.currentTime,.22,'sine',sfxG,.5*v);noise(.12,300,.25*v)}if(v>.6)shake=Math.max(shake,.08)}dust.push({x:a.x+Math.random()*8-4,y:a.y+Math.random()*6-3,z:0,vz:6,l:.4})}}
  if(GH<=0&&a.sayT<=0&&cdist(a,P)<120&&Math.random()<dt*.12&&P.dead<=0){a.say=['Ket bu yerdan, mitti!','Hmm... odam hidi','Tegma — tegmayman','Toshimni ko‘rdingmi?'][Math.random()*4|0];a.sayT=2.8}}
function civUpdate(dt){if(!CIV.length)return;stompT-=dt;GH=Math.max(0,GH-dt);if(REP<0)REP=Math.min(0,REP+dt*.012);
  if(P.pois>0){P.pois-=dt;if(P.dead<=0){P.hp=Math.max(1,P.hp-1.3*dt)}}
  for(let i=0;i<CA.length;i++){const a=CA[i];
    if(a.dead>0){a.dead-=dt;if(a.dead<=0)a.gone=1;continue}
    a.fl-=dt;a.cd-=dt;a.cd2-=dt;a.sayT-=dt;
    if(a.z>0||a.vz>0){a.vz-=420*dt;a.z+=a.vz*dt;if(a.z<=0){a.z=0;a.vz=0;if(a.lau){a.lau=0;caHit(a,3,0,0,P);dust.push({x:a.x,y:a.y,z:0,vz:10,l:.5})}}}
    if(a.kx||a.ky){const mx=a.kx*dt,my=a.ky*dt;if(!onNear(a,1300)||!blk(0,a.x+mx,a.y+my)){a.x+=mx;a.y+=my}const k=Math.pow(.002,dt);a.kx*=k;a.ky*=k;if(Math.abs(a.kx)+Math.abs(a.ky)<3)a.kx=a.ky=0}
    if(a.stun>0){a.stun-=dt;a.mv=0;continue}
    if(a.hid){if(a.c==0)humTick(a,CIV[0],dt);continue}
    a.scan-=dt;if(a.scan<=0){a.scan=.45+Math.random()*.3;if(!a.tg||a.tg.dead>0||a.c==1||Math.random()<.3){const t=caFind(a);if(t||!a.tg||a.tg.dead>0)a.tg=t}}
    if(a.tg)caFight(a,dt);else if(a.c==0)humTick(a,CIV[0],dt);else if(a.c==1)zomTick(a,CIV[1],dt);else if(a.c==2)giTick(a,CIV[2],dt);else if(typeof robTick=='function')robTick(a,dt)}
  if(CA.some(a=>a.gone))CA=CA.filter(a=>!a.gone);
  // snaryadlar
  CPJ.forEach(p=>{p.t+=dt;const u=Math.min(1,p.t/p.d);p.x=p.sx+dwx(p.tx,p.sx)*u;p.y=p.sy+dwy(p.ty,p.sy)*u;p.z=24+Math.sin(u*3.1416)*46*(1+p.d*.4)-u*24;
    if(u>=1){p.gone=1;if(onNear(p,420)){sndThud();shake=Math.max(shake,.3)}for(let i=0;i<10;i++){const q=Math.random()*6.28;fxs.push({x:p.x,y:p.y,z:4,vx:Math.cos(q)*50,vy:Math.sin(q)*50,vz:40+Math.random()*50,l:.7,c:i%2?'#9b9ca6':'#62636e'})}
      if(Math.hypot(dwx(P.x,p.x),dwy(P.y,p.y))<24&&P.z<18&&GH>0){const dx=dwx(P.x,p.x),dy=dwy(P.y,p.y),d=Math.hypot(dx,dy)||1;hurtP(16,dx/d,dy/d)}
      CA.forEach(b=>{if(b.c!=2&&b.dead<=0&&!b.hid&&Math.hypot(dwx(b.x,p.x),dwy(b.y,p.y))<24){const dx=dwx(b.x,p.x),dy=dwy(b.y,p.y),d=Math.hypot(dx,dy)||1;if(b.c==1||(b.c==3&&GH>0))caHit(b,20,dx/d,dy/d,p.own)}})}});
  if(CPJ.some(p=>p.gone))CPJ=CPJ.filter(p=>!p.gone);
  // zombiga aylanish
  ZCV.forEach(z=>{z.t-=dt;if(z.t<=0){z.gone=1;const n=caNew(1,'v','z'+(Math.random()*3|0),z.x,z.y,{hp:26,dmg:7,spd:22,hx:z.x,hy:z.y});n.stun=.8;const zc=CIV[1];if(zc){n.raid={x:z.x,y:z.y,t:60}}if(onNear(z,500))pops.push({x:z.x,y:z.y,z:30,t:1.4,s:'Zombiga aylandi! 🧟'})}});
  if(ZCV.some(z=>z.gone))ZCV=ZCV.filter(z=>!z.gone);
  // odamlar jamiyati
  const H=CIV[0],Z=CIV[1],G=CIV[2];
  if(H){H.t1-=dt;if(H.t1<=0){H.t1=3;const hs2=H.bld.filter(b=>b.t=='house'&&b.p>=1).length,cap=Math.min(64,8+hs2*4),pop=civPop(0);
      const zn=CA.some(a=>a.c==1&&a.dead<=0&&Math.hypot(dwx(a.x,H.x),dwy(a.y,H.y))<330);if(zn&&!H.alarm){H.alarm=1;if(onNear(H,900)){rzShow('ZOMBILAR HUJUMI!','Qirollik xavf ostida — himoya qiling');if(AC){const t=AC.currentTime;[0,.5,1].forEach(o=>{tone(880,t+o,.9,'sine',sfxG,.25);tone(1320,t+o,.6,'sine',sfxG,.1)})}}}else if(!zn)H.alarm=0;
      const sg=CA.filter(a=>a.c==0&&a.k=='v'&&!a.mate&&!a.hid&&a.dead<=0);
      for(const a of sg){if(a.mate)continue;const b=sg.find(b=>b!==a&&!b.mate&&b.sex!=a.sex&&cdist(a,b)<70);if(b){a.mate=b;b.mate=a;const m=a.sex?b:a,f=a.sex?a:b;f.hx=m.hx+6;f.hy=m.hy;if(onNear(a,420))pops.push({x:a.x,y:a.y,z:34,t:1.6,s:'To‘y! 💍💕'});break}}
      if(pop<cap){const f=CA.find(a=>a.c==0&&a.sex==1&&a.mate&&a.mate.dead<=0&&a.bcd<=0&&a.dead<=0&&(a.k=='v'||a.k=='Q'));if(f){f.bcd=110+Math.random()*60;caNew(0,'c','h'+(Math.random()*6|0),f.hx,f.hy+4,{age:0,sc:.55,hp:10,hx:f.hx,hy:f.hy});if(onNear(f,420))pops.push({x:f.x,y:f.y,z:34,t:1.6,s:'Farzand tug‘ildi! 👶'})}}
      if(pop>=cap-3&&hs2<16&&!H.site){const s=civPlace(H,'house',30,24,100,270,1,{v:hs2%3,p:.02});if(s){H.site=s;CA.filter(a=>a.c==0&&a.k=='v'&&a.dead<=0&&!a.hid).sort((a,b)=>cdist(a,s)-cdist(b,s)).slice(0,3).forEach(a=>a.job=s)}}
      else if(H.site&&H.site.p<1&&!CA.some(a=>a.job===H.site&&a.dead<=0))CA.filter(a=>a.c==0&&a.k=='v'&&a.dead<=0&&!a.hid).slice(0,2).forEach(a=>a.job=H.site);
      if(REP>=5&&!giftK&&H.king&&cdist(H.king,P)<60){giftK=1;if(typeof invGive=='function')invGive('sword');H.king.say='Qahramon! Bu qilich senga!';H.king.sayT=4}}
    if(!H.king||!H.queen){H.heirT-=dt;if(H.heirT<=0){H.heirT=40;const k=!H.king?0:1,v=CA.find(a=>a.c==0&&a.k=='v'&&a.sex==k&&a.dead<=0);if(v){v.k=k?'Q':'K';v.set=k?'hQ':'hK';v.hp=v.mh=k?50:90;v.dmg=12;v.nm=k?'Yangi Malika':'Yangi Podshoh';v.hid=0;if(k)H.queen=v;else H.king=v;if(onNear(v,900))rzShow(v.nm+' taxtga o‘tirdi 👑',H.name)}}}}
  if(Z){Z.bld.forEach(b=>{if(b.t=='pod'){b.p+=dt/20;if(b.p>=1){b.gone=1;caNew(1,'c','z'+(Math.random()*3|0),b.x,b.y,{age:0,sc:.55,hp:12,dmg:4,spd:26,hx:b.x,hy:b.y});if(onNear(b,400))pops.push({x:b.x,y:b.y,z:20,t:1.2,s:'Zombi tug‘ildi 🧟'})}}});if(Z.bld.some(b=>b.gone))Z.bld=Z.bld.filter(b=>!b.gone);
    Z.raidT-=dt;if(Z.raidT<=0&&H){Z.raidT=200+Math.random()*120;if(dayN>.35||civPop(1)>22){const g=CA.filter(a=>a.c==1&&a.k=='v'&&a.dead<=0&&!a.raid).slice(0,5+Math.random()*5|0);g.forEach(a=>{a.raid={x:H.x+Math.random()*120-60,y:H.y+Math.random()*120-20,t:240};a.tg=null});if(g.length&&AC&&onNear(Z,700)){const t=AC.currentTime;tone(98,t,1.6,'sawtooth',sfxG,.12);tone(73,t+.4,1.8,'sawtooth',sfxG,.12)}}else Z.raidT=30}
    if(!Z.king||!Z.queen){Z.heirT-=dt;if(Z.heirT<=0){Z.heirT=60;const k=!Z.king?0:1,v=CA.find(a=>a.c==1&&a.k=='v'&&a.dead<=0&&!a.raid);if(v){v.k=k?'Q':'K';v.set=k?'zQ':'zK';v.hp=v.mh=k?70:120;v.dmg=k?9:14;v.nm=k?'Yangi zombi malika':'Yangi zombi qirol';v.hx=Z.x;v.hy=Z.y;if(k)Z.queen=v;else Z.king=v}}}}
  if(G){G.t2-=dt;if(G.t2<=0){G.t2=160+Math.random()*60;if(G.queen&&G.king&&civPop(2)<13){caNew(2,'c','g'+(Math.random()*2|0),G.queen.x+10,G.queen.y+10,{hp:60,dmg:8,spd:30,sc:1.2,age:0});if(onNear(G,500))pops.push({x:G.queen.x,y:G.queen.y,z:70,t:1.6,s:'Dev bolasi tug‘ildi 👣'})}}
    if(!G.king||!G.queen){G.heirT-=dt;if(G.heirT<=0){G.heirT=80;const k=!G.king?0:1,v=CA.find(a=>a.c==2&&a.k=='v'&&a.dead<=0);if(v){v.k=k?'Q':'K';v.set=k?'gQ':'gK';v.sc=k?2.4:2.8;v.hp=v.mh=k?260:420;v.dmg=k?20:30;v.nm=k?'Yangi dev malika':'Yangi dev shohi';if(k)G.queen=v;else G.king=v}}}}
  // hudud banneri
  let cc=null;CIV.forEach(c=>{if(c&&Math.hypot(dwx(P.x,c.x),dwy(P.y,c.y))<c.r)cc=c});if(cc!==curCiv){curCiv=cc;if(cc)rzShow(cc.name,cc.sub)}}
// ---------- o'yinchi zarbalari ----------
function civMelee(rng,ux,uy,n){let any=0;for(const a of CA){if(a.dead>0||a.hid||a.c==3)continue;const dx=dwx(a.x,P.x),dy=dwy(a.y,P.y),dist=Math.hypot(dx,dy);if(dist<rng+4+a.sc*5&&dx*ux+dy*uy>dist*.15&&P.z<24*a.sc){any=1;caHit(a,(n==2?16:9)*DMGM,ux,uy,P)}}return any}
function civBlast(b){for(const a of CA){if(a.dead>0||a.hid||a.c==3)continue;if(Math.hypot(dwx(a.x,b.x),dwy(a.y,b.y))<9+a.sc*4&&b.z<30*a.sc){caHit(a,14*LASM,b.vx/150,b.vy/150,P);return true}}return false}
function civFly(ux,uy){for(const a of CA){if(a.dead>0||a.hid||a.c==3||a.fid>time)continue;if(Math.abs(dwx(a.x,P.x))<12+a.sc*5&&Math.abs(dwy(a.y,P.y))<12+a.sc*5&&P.z<30*a.sc){a.fid=time+.6;caHit(a,(FS>300?32:16)*DMGM,ux,uy,P);FVx*=a.sc>1.6?.6:.94;FVy*=a.sc>1.6?.6:.94}}}
// ---------- chizish ----------
const faceL=(x,y,w,h,i0,i1,zb,zt,col)=>{const a=pj(x,y+h);ctx.fillStyle=col;for(let i=i0;i<i1;i++)ctx.fillRect(a[0]+i,a[1]+(i>>1)-zt,1,zt-zb)};
const faceR=(x,y,w,h,i0,i1,zb,zt,col)=>{const b=pj(x+w,y+h);ctx.fillStyle=col;for(let i=i0;i<i1;i++)ctx.fillRect(b[0]+i,b[1]-(i>>1)-zt,1,zt-zb)};
const RFC=[['#c8553a','#a23d28','#7e2e1e'],['#5a7ab8','#40598c','#2e4068'],['#b89a4a','#8e7434','#6a5626']];
function fireAt(X,Y,s,c1,c2,c3){const q=Math.sin(time*14)>0?1:0;E(X,Y-3*s-q,2*s,3*s+q,c1);E(X,Y-3*s,Math.round(1.4*s),2*s,c2);E(X,Y-2*s,Math.max(1,s>>1),s,c3)}
function civBld(b){const x=b.x,y=b.y,w=b.w,h=b.h,o=pj(x+w/2,y+h/2),X=o[0],Y=o[1],nt=dayN>.4,win=nt?'#ffd870':'#8ab8d8';
  switch(b.t){
  case'house':{const H=Math.max(2,12*b.p|0);E(X,Y+4,w*.9|0,h*.4|0,'rgba(0,0,0,.2)');cub(x,y,w,h,0,H,'#e8dcc0','#cdbf9e','#a99c7e');
    if(b.p<1){ctx.fillStyle='#8a6a4a';const a=pj(x,y+h);for(let i=0;i<w;i+=6)ctx.fillRect(a[0]+i,a[1]+(i>>1)-16,1,16);ctx.fillRect(a[0],a[1]-16,w,1);break}
    faceL(x,y,w,h,(w>>1)-3,(w>>1)+2,0,9,'#3a2616');faceR(x,y,w,h,4,9,5,9,win);faceR(x,y,w,h,h-10,h-5,5,9,win);faceL(x,y,w,h,3,7,5,9,win);
    const r=RFC[b.v||0];for(let i=0;i<5;i++)cub(x-2+i*3,y-2+i*3,w+4-i*6,h+4-i*6,H+i*3,3,r[0],r[1],r[2]);
    {const c=pj(x+8,y+6);ctx.fillStyle='#7a6a5a';ctx.fillRect(c[0]-2,c[1]-32,4,9);if(nt||dayN<.1){ctx.fillStyle='rgba(230,230,235,.5)';for(let k=0;k<4;k++){const t=(time*.6+k*.25)%1;ctx.fillRect(c[0]-1+Math.round(Math.sin(time+k)*2+t*5),c[1]-34-Math.round(t*16),2+k%2,2)}}}break}
  case'castle':{E(X,Y+8,w,h*.5|0,'rgba(0,0,0,.25)');const S=['#b8b8c2','#92929e','#74747f'],T=(tx,ty)=>{cub(tx,ty,14,14,0,36,S[0],S[1],S[2]);for(let i=0;i<3;i++)cub(tx-1+i*3,ty-1+i*3,16-i*6,16-i*6,36+i*4,4,'#c8553a','#a23d28','#7e2e1e');faceL(tx,ty,14,14,5,8,22,28,win)};
    T(x,y);cub(x+4,y+4,w-8,h-8,0,20,S[0],S[1],S[2]);for(let i=6;i<w-10;i+=8){const a=pj(x+4,y+h-4);ctx.fillStyle=S[1];ctx.fillRect(a[0]+i,a[1]+(i>>1)-24,4,4)}for(let i=6;i<h-10;i+=8){const a=pj(x+w-4,y+h-4);ctx.fillStyle=S[2];ctx.fillRect(a[0]+i,a[1]-(i>>1)-24,4,4)}
    T(x+w-14,y);T(x,y+h-14);cub(x+22,y+14,32,28,20,20,'#c8c8d0','#a2a2ae','#84848f');for(let i=0;i<5;i++)cub(x+20+i*3,y+12+i*3,36-i*6,32-i*6,40+i*4,4,'#5a7ab8','#40598c','#2e4068');
    faceL(x+4,y+4,w-8,h-8,28,40,0,15,'#2a1a10');faceL(x+4,y+4,w-8,h-8,30,38,15,17,'#2a1a10');faceL(x+22,y+14,32,28,6,10,26,34,win);faceL(x+22,y+14,32,28,20,24,26,34,win);faceR(x+22,y+14,32,28,8,12,26,34,win);
    T(x+w-14,y+h-14);{const c=pj(x+38,y+28),wv=Math.round(wind(x,y)*1.5);ctx.fillStyle='#4a3a2a';ctx.fillRect(c[0],c[1]-84,1,22);ctx.fillStyle='#ffd23a';for(let i=0;i<10;i++)ctx.fillRect(c[0]+1+i,c[1]-84+Math.round(Math.sin(time*5+i*.6)*1.2+wv*i/10),1,6);ctx.fillStyle='#c02a2a';ctx.fillRect(c[0]+3,c[1]-82,3,2)}break}
  case'well':{E(X,Y+2,8,3,'rgba(0,0,0,.25)');cub(x,y,w,h,0,6,'#3a6a9a','#8e8e98','#72727c');const c=pj(x+5,y+5);ctx.fillStyle='#6b4a2a';ctx.fillRect(c[0]-6,c[1]-20,1,16);ctx.fillRect(c[0]+5,c[1]-20,1,16);ctx.fillStyle='#a23d28';ctx.fillRect(c[0]-8,c[1]-23,16,3);ctx.fillRect(c[0]-6,c[1]-25,12,2);break}
  case'stall':{E(X,Y+2,12,4,'rgba(0,0,0,.25)');cub(x,y,w,h,0,7,'#c89a5b','#9a6f3a','#7a5429');const c=pj(x+w/2,y+h/2),cc=b.v?['#e04a4a','#fff']:['#3a8ad0','#fff'];for(let i=-10;i<10;i++){ctx.fillStyle=cc[((i+10)>>2)&1];ctx.fillRect(c[0]+i,c[1]-22+(Math.abs(i)>>2),1,4)}ctx.fillStyle='#6b4a2a';ctx.fillRect(c[0]-10,c[1]-19,1,12);ctx.fillRect(c[0]+9,c[1]-19,1,12);
    ['#e84a3a','#f2c230','#5ab04a'].forEach((k,i)=>{ctx.fillStyle=k;ctx.fillRect(c[0]-5+i*4,c[1]-11,3,2)});break}
  case'crypt':{E(X,Y+4,w*.9|0,h*.4|0,'rgba(0,0,0,.25)');cub(x,y,w,h,0,12,'#5e5e6a','#454552','#32323c');faceL(x,y,w,h,(w>>1)-3,(w>>1)+2,0,9,'#0c1a0c');faceL(x,y,w,h,(w>>1)-2,(w>>1)+1,2,7,'rgba(120,255,90,'+(.4+.3*Math.sin(time*3+x))+')');
    for(let i=0;i<4;i++)cub(x-1+i*3,y-1+i*3,w+2-i*6,h+2-i*6,12+i*3,3,'#4a3a5a','#362a44','#261e32');const c=pj(x+w/2,y+h/2);ctx.fillStyle='#c8c8b8';ctx.fillRect(c[0]-1,c[1]-30,2,6);ctx.fillRect(c[0]-3,c[1]-28,6,2);break}
  case'citadel':{E(X,Y+8,w,h*.5|0,'rgba(0,0,0,.3)');const S=['#4a4a58','#343440','#24242e'];cub(x,y,w,h,0,20,S[0],S[1],S[2]);cub(x+8,y+8,w-16,h-16,20,20,'#54546a','#3a3a4c','#282836');cub(x+16,y+14,w-32,h-28,40,22,'#5a4a72','#3e3250','#2a2238');cub(x+22,y+19,w-44,h-38,62,10,'#3a2a4a','#281c36','#1a1226');
    const g='rgba(120,255,90,'+(.5+.4*Math.sin(time*2.5))+')';faceL(x,y,w,h,22,34,0,14,'#0a140a');faceL(x,y,w,h,24,32,2,12,g);faceL(x+8,y+8,w-16,h-16,8,11,26,34,g);faceL(x+8,y+8,w-16,h-16,26,29,26,34,g);faceR(x+8,y+8,w-16,h-16,10,13,26,34,g);faceL(x+16,y+14,w-32,h-28,9,13,46,56,g);
    const c=pj(x+w/2,y+h/2);E(c[0],c[1]-80-Math.round(Math.sin(time*2)*2),4,4,'#8aff5a');E(c[0],c[1]-80-Math.round(Math.sin(time*2)*2),2,2,'#eaffd0');break}
  case'grave':{E(X,Y+1,5,2,'rgba(0,0,0,.25)');if(b.v==2){ctx.fillStyle='#8a8a92';ctx.fillRect(X-1,Y-10,2,10);ctx.fillRect(X-3,Y-8,6,2)}else{ctx.fillStyle='#7c7c86';ctx.fillRect(X-3,Y-7,6,7);ctx.fillRect(X-2,Y-8,4,1);ctx.fillStyle='#5a5a64';ctx.fillRect(X-1,Y-5,2,1);ctx.fillRect(X-2,Y-3,4,1)}ctx.fillStyle='#4a3a2a';ctx.fillRect(X-4,Y,9,2);break}
  case'pod':{const s=2+Math.round(b.p*4),q=Math.round(Math.sin(time*6)*b.p*1.5);E(X,Y+1,s+2,2,'rgba(0,0,0,.25)');E(X,Y-s,s+(q>0?1:0),s+1,'#5a9a3a');E(X-1,Y-s-1,Math.max(1,s-2),Math.max(1,s-1),'#9ae06a');break}
  case'zfire':{E(X,Y+2,9,3,'rgba(0,0,0,.25)');ctx.fillStyle='#c8c8b8';ctx.fillRect(X-6,Y-2,12,2);ctx.fillRect(X-4,Y-4,8,2);fireAt(X,Y-3,3,'#3aa82a','#8aff5a','#eaffd0');break}
  case'gfire':{E(X,Y+2,12,4,'rgba(0,0,0,.3)');ctx.fillStyle='#5a3b22';ctx.fillRect(X-10,Y-3,20,3);ctx.fillRect(X-7,Y-6,14,3);ctx.fillStyle='#7c7d88';for(let i=0;i<6;i++){const a=i/6*6.28;ctx.fillRect(X+Math.round(Math.cos(a)*12)-1,Y+Math.round(Math.sin(a)*5)-1,3,2)}fireAt(X,Y-5,5,'#e8641c','#ffb030','#fff0a0');break}
  case'ghut':{E(X,Y+8,w,h*.5|0,'rgba(0,0,0,.25)');cub(x,y,w,h,0,28,'#8e877a','#6e685d','#575248');faceL(x,y,w,h,(w>>1)-8,(w>>1)+6,0,22,'#1e1812');faceR(x,y,w,h,8,14,12,20,nt?'#ffb050':'#3a3026');
    cub(x-3,y-3,w+6,h+6,28,5,'#6a655a','#56524a','#44413a');cub(x+5,y+5,w-10,h-10,33,4,'#7a756a','#605c52','#4c4942');const a=pj(x,y+h);ctx.fillStyle='#e8e0d0';ctx.fillRect(a[0]+6,a[1]-18,2,8);ctx.fillRect(a[0]+4,a[1]-20,6,2);break}
  case'stone':{E(X,Y+2,8,3,'rgba(0,0,0,.28)');cub(x,y,w,h,0,32,'#a2a2aa','#7c7c86','#5e5e68');const a=pj(x,y+h);ctx.fillStyle='#6ae0ff';if(dayN>.5)ctx.fillRect(a[0]+4,a[1]-18,2,6);break}
  case'throne':{cub(x,y,w,h,0,10,'#8a8478','#6c675c','#565248');cub(x,y,w,4,10,22,'#9a9488','#77726a','#5e5a52');const c=pj(x+w/2,y+2);ctx.fillStyle='#ffd23a';ctx.fillRect(c[0]-2,c[1]-36,4,3);break}
  case'totem':{E(X,Y+1,5,2,'rgba(0,0,0,.28)');cub(x,y,w,h,0,38,'#8a6a44','#6e5234','#58422a');const a=pj(x,y+h);for(let k=0;k<3;k++){ctx.fillStyle=['#e04a3a','#ffd23a','#3a8ad0'][(k+b.v)%3];ctx.fillRect(a[0]+1,a[1]-34+k*11,4,2);ctx.fillStyle='#fff';ctx.fillRect(a[0]+1,a[1]-31+k*11,1,1);ctx.fillRect(a[0]+4,a[1]-30+k*11,1,1)}break}}}
function civGround(){CIV.forEach(c=>{if(!c||!onS(c.x,c.y)&&Math.abs(dwx(c.x,P.x))>700)return;c.bld.forEach(b=>{if(b.t!='farm'||!onS(b.x+b.w/2,b.y+b.h/2))return;
    const g=(b.g+SOL.ST/400)%1,col=g<.3?'#6aa84a':g<.7?'#9ac04a':'#e0c24a',hh=1+Math.round(g*4);
    for(let j=2;j<b.h;j+=5){for(let i=2;i<b.w;i+=4){const o=pj(b.x+i,b.y+j);ctx.fillStyle='#6b4a2a';ctx.fillRect(o[0]-1,o[1],3,1);ctx.fillStyle=col;ctx.fillRect(o[0],o[1]-hh+Math.round(wind(b.x+i,b.y+j)*.4),1,hh)}}})})}
function caDraw(a){const o=pj(a.x,a.y),sc=a.sc,S=CSET[a.set],mp=MP8[a.sec];let X=o[0],Y=o[1]-Math.round(a.z);
  E(o[0],o[1],Math.round(7*sc),Math.round(3*sc),'rgba(0,0,0,.28)');
  let f;const atk=a.st=='atk',u=atk?a.w/a.wd:0;
  if(atk&&!S.cv)f=8+a.an*3+(u>.66?0:u>.33?1:2);else if(a.mv)f=Math.floor(a.fr)%6;else f=6+((time*1.6+a.hx)|0)%2;
  if(atk&&S.cv){const l=Math.sin((1-u)*3.14)*4*sc,q=a.sec*Math.PI/4;X+=Math.round(Math.cos(q)*l);Y+=Math.round(Math.sin(q)*l*.5)}
  if(a.thr&&atk){E(X,Y-40*sc,4,4,'#8d8f99')}
  ctx.save();ctx.translate(X,Y);if(a.dead>0){ctx.rotate(1.57*Math.min(1,(1.3-a.dead)/.25));ctx.globalAlpha=Math.min(1,a.dead/.5)}else if(a.c==1&&a.mv)ctx.rotate(Math.sin(a.fr*1.05)*.09);
  ctx.scale(mp[1]?-sc:sc,sc);const im=cspr(a.set,mp[0],f);ctx.drawImage(im,-15,-37);if(a.fl>0){ctx.globalAlpha=.8;ctx.drawImage(sil(im,a.c==1?'#d8ffb0':'#fff'),-15,-37);ctx.globalAlpha=1}
  if(a.k=='K'||a.k=='Q'){const g=a.c==1?'#b06aff':'#ffd23a';ctx.fillStyle=g;ctx.fillRect(-4,-37,8,2);ctx.fillRect(-4,-39,1,2);ctx.fillRect(-1,-40,2,3);ctx.fillRect(3,-39,1,2);ctx.fillStyle=a.c==1?'#8aff5a':'#e03a3a';ctx.fillRect(-1,-37,2,1)}
  if(a.c==3){ctx.fillStyle='#6ae0ff';ctx.fillRect(-1,-40,2,3)}
  ctx.restore();
  if(a.dead>0)return;const top=Y-Math.round(40*sc);
  if(a.hp<a.mh){const wb=Math.round(8*Math.min(2,sc));ctx.fillStyle='#000';ctx.fillRect(X-wb,top-3,wb*2,3);ctx.fillStyle=a.c==1?'#7ae04a':a.c==2?'#b8a0ff':'#e04a4a';ctx.fillRect(X-wb+1,top-2,Math.round((wb*2-2)*Math.max(0,a.hp)/a.mh),1)}
  if(a.nm&&cdist(a,P)<150){ctx.font='bold 7px monospace';ctx.textAlign='center';ctx.fillStyle='#000';ctx.fillText(a.nm,X+1,top-5);ctx.fillStyle=a.c==1?'#b8ff8a':a.c==2?'#d8c8ff':'#ffe27a';ctx.fillText(a.nm,X,top-6)}
  if(a.sayT>0&&a.say){ctx.font='7px monospace';ctx.textAlign='center';const wt=ctx.measureText(a.say).width+6,yy=top-(a.nm?16:8);ctx.fillStyle='rgba(255,255,255,.92)';ctx.fillRect(X-wt/2|0,yy-8,wt|0,10);ctx.fillRect(X-1,yy+2,2,2);ctx.fillStyle='#1a1a22';ctx.fillText(a.say,X,yy)}
  if(a.tg===P&&a.st=='atk'&&a.w>a.wd*.5){ctx.fillStyle='#ff3030';ctx.fillRect(X-1,top-9,2,5);ctx.fillRect(X-1,top-3,2,2)}}
function civItems(items){CIV.forEach(c=>{if(!c)return;if(Math.abs(dwx(c.x,P.x))>900||Math.abs(dwy(c.y,P.y))>900)return;c.bld.forEach(b=>{if(b.t=='farm'||!onS(b.x+b.w/2,b.y+b.h/2))return;items.push({x0:b.x,x1:b.x+b.w,y0:b.y,y1:b.y+b.h,f(){civBld(b)}})})});
  CA.forEach(a=>{if(a.hid||!onS(a.x,a.y))return;items.push({...bb(a.x,a.y,3),f(){caDraw(a)}})});
  CPJ.forEach(p=>{if(!onS(p.x,p.y))return;items.push({...bb(p.x,p.y,3),f(){const o=pj(p.x,p.y);E(o[0],o[1],5,2,'rgba(0,0,0,.3)');E(o[0],o[1]-Math.round(p.z),5,5,'#8d8f99');E(o[0]-1,o[1]-Math.round(p.z)-1,3,3,'#b4b6c0')}})});
  ZCV.forEach(z=>{if(onS(z.x,z.y))items.push({...bb(z.x,z.y,2),f(){const o=pj(z.x,z.y);E(o[0],o[1]-2,6,3,'rgba(120,255,90,'+(.3+.3*Math.sin(time*12))+')')}})})}
civInit();
