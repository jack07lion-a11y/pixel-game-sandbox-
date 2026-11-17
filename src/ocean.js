// ================= OKEAN: suzish, kema, sho‘ng‘in, dengiz hayoti =================
const BOATS=[],BT={on:0,b:null},SFN=[],DOL=[];let SWH=null,surfT=18,whT=70;
const UW={on:0,z:50,vz:0,air:100,u:0,d:0,atk:0,slow:0,cr:[],bub:[],sn:[],spT:0,open:new Set(),fish:0,song:0,hd:1.57,bt:0,ex:0,ml:0};
P.sta=100;P.sw=0;
const dwx=(a,b)=>{let d=a-b;return d-Math.round(d/WW)*WW},dwy=(a,b)=>{let d=a-b;return d-Math.round(d/WH)*WH};
const wxy=o=>{o.x=((o.x%WW)+WW)%WW;o.y=((o.y%WH)+WH)%WH};
const oc=(x,y)=>isOc(Math.floor(x/16),Math.floor(y/16));
const deepAt=(x,y)=>oc(x,y)&&oc(x+22,y)&&oc(x-22,y)&&oc(x,y+22)&&oc(x,y-22);
const DC=new Uint8Array(TXM*TYM);
function sdp(tx,ty){tx=((tx%TXM)+TXM)%TXM;ty=((ty%TYM)+TYM)%TYM;const i=ty*TXM+tx,c=DC[i];if(c)return c-1;let d=12;
  for(const q of [[1,0],[-1,0],[0,1],[0,-1]])for(let k=1;k<d;k++){if(!isOc(tx+q[0]*k,ty+q[1]*k)){d=k;break}}
  const L=Math.min(5,Math.floor(d/2));DC[i]=L+1;return L}
const pop=(s,t)=>pops.push({x:P.x,y:P.y,z:34,t:t||1,s});
// ---------- kemalar ----------
function genBoats(){if(!PMD)return;let best=null,bd=1e9;
  for(let cy=0;cy<GY;cy++)for(let cx=0;cx<GX;cx++){if(PMD.T[cy*GX+cx]!=4||(cx<30&&cy<23))continue;const d=Math.hypot(cx*32-HOME[0],cy*32-HOME[1]);if(d<bd){bd=d;best=[cx*32+16,cy*32+16]}}
  if(best){let x=best[0],y=best[1];const dx=HOME[0]-x,dy=HOME[1]-y,l=Math.hypot(dx,dy)||1;for(let k=0;k<400;k++){const nx=x+dx/l*8,ny=y+dy/l*8;if(!oc(nx,ny))break;x=nx;y=ny}
    BOATS.push({x,y,sec:0,v:0,st:1})}
  for(let n=0,tr=0;n<14*Math.max(1,Math.round(MCN/60))&&tr<4000;tr++){const x=Math.random()*WW,y=Math.random()*WH;if(!oc(x,y)||deepAt(x,y)||BOATS.some(b=>Math.hypot(b.x-x,b.y-y)>0&&Math.hypot(dwx(b.x,x),dwy(b.y,y))<500))continue;BOATS.push({x,y,sec:Math.floor(Math.random()*8),v:0});n++}}
genBoats();
const nearBoat=()=>{let r=null,bd=42;BOATS.forEach(b=>{const d=Math.hypot(dwx(b.x,P.x),dwy(b.y,P.y));if(d<bd){bd=d;r=b}});return r};
function boatToggle(){if(UW.on||P.dead>0||TF.act)return;
  if(BT.on){const b=BT.b;let ok=0;for(let k=0;k<8&&!ok;k++){const a=k*Math.PI/4,x=b.x+Math.cos(a)*28,y=b.y+Math.sin(a)*28;if(!isW(x>>4,y>>4)&&!hit(x,y)){P.x=x;P.y=y;ok=1}}
    if(!ok){P.x=b.x+8;P.y=b.y+6}BT.on=0;BT.b=null;pop('Kemadan tushdingiz')}
  else{const b=nearBoat();if(!b||P.z>6)return;BT.on=1;BT.b=b;P.x=b.x;P.y=b.y;P.fly=0;pop('Kemadasiz ‘ B tushish ‘')}}
// ---------- sirt usti: suzish, charchash, cho‘kish ----------
function swimTick(dt){
  if(BT.on){const b=BT.b;let ax=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0)+jx,ay=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0)+jy;if(P.dead>0||TF.act)ax=ay=0;const l=Math.hypot(ax,ay);
    if(l>.1){if(l>1){ax/=l;ay/=l}const S=((K.shift||runT)?140:96)*dt,dx=S*.5*(ay+ax),dy=S*.5*(ay-ax);if(oc(b.x+dx,b.y))b.x+=dx;if(oc(b.x,b.y+dy))b.y+=dy;b.sec=(Math.round(Math.atan2(ay,ax)/(Math.PI/4))+8)%8;b.v=1;wxy(b);
      if(Math.random()<.7)fxs.push({x:b.x-Math.cos(b.sec*.785)*10,y:b.y-Math.sin(b.sec*.785)*5,z:1,vx:0,vy:0,vz:3,l:.5,c:'#e8f6ff'})}else b.v=0;
    P.x=b.x;P.y=b.y;P.sec=b.sec;P.sw=0;P.z=0;P.sta=Math.min(100,P.sta+15*dt)}
  else{const ok=P.z<4&&!P.fly&&P.dead<=0,inO=ok&&oc(P.x,P.y);P.sw=inO&&deepAt(P.x,P.y)?1:0;if(inO&&!P.sw)wade=true;
    if(P.sw){P.sta=Math.max(0,P.sta-(hero?3:6)*dt);if(P.mov&&Math.random()<dt*3){rings.push({x:P.x,y:P.y,t:.25,n:1});if(Math.random()<.3)sndSplash(.5)}
      if(P.sta<=0&&P.dead<=0){P.hp=Math.max(0,P.hp-7*dt);redT=Math.max(redT,.12);if(Math.random()<dt*.6)pop('Cho‘kyapsiz! Qirg‘oqqa!');if(P.hp<=0){P.dead=2.6;P.fly=0;pop('Cho‘ndingiz!',1.5)}}}
    else P.sta=Math.min(100,P.sta+(wade?6:14)*dt)}
  surfTick(dt);uiTick()}
function surfTick(dt){const nearO=BT.on||oc(P.x,P.y);
  if(nearO&&SFN.length<2&&Math.random()<dt*.15){const a=Math.random()*6.28,r=260+Math.random()*120,x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;if(deepAt(x,y)){const f={x,y,a:Math.random()*6.28,t:0,cd:0,re:0};wxy(f);SFN.push(f)}}
  SFN.forEach(f=>{f.t+=dt;f.cd-=dt;f.re-=dt;const dx=dwx(P.x,f.x),dy=dwy(P.y,f.y),d=Math.hypot(dx,dy);let sp=22;
    if(P.sw&&d<300&&f.re<=0){f.a=Math.atan2(dy,dx);sp=52;if(d<14&&f.cd<=0){hurtP(8,dx/d,dy/d);f.cd=2.5;f.re=4;pop('Akula tishladi!')}}
    else if(f.re>0){f.a=Math.atan2(-dy,-dx);sp=40}else f.a+=Math.sin(f.t*.7)*dt*.9;
    const nx=f.x+Math.cos(f.a)*sp*dt,ny=f.y+Math.sin(f.a)*sp*dt;if(oc(nx,ny)){f.x=nx;f.y=ny}else f.a+=2;wxy(f);f.d=d});
  for(let i=SFN.length-1;i>=0;i--)if(SFN[i].d>650)SFN.splice(i,1);
  surfT-=dt;if(nearO&&surfT<=0&&deepAt(P.x,P.y)){surfT=26+Math.random()*40;const a=Math.random()*6.28,r=150+Math.random()*100,bx=P.x+Math.cos(a)*r,by=P.y+Math.sin(a)*r,h=Math.random()*6.28;
    if(deepAt(bx,by))for(let k=0;k<3;k++)DOL.push({x:bx+k*12,y:by+k*9,vx:Math.cos(h)*55,vy:Math.sin(h)*55,t:-k*.3,sp:0})}
  DOL.forEach(d=>{d.t+=dt;if(d.t>=0&&d.t<=1.2){d.x+=d.vx*dt;d.y+=d.vy*dt;if(!d.sp){d.sp=1;rings.push({x:d.x,y:d.y,t:.25,n:1})}}if(d.t>1.2&&d.sp==1){d.sp=2;rings.push({x:d.x,y:d.y,t:.25,n:1});if(AC&&Math.hypot(dwx(d.x,P.x),dwy(d.y,P.y))<260)sndSplash(.6)}});
  for(let i=DOL.length-1;i>=0;i--)if(DOL[i].t>1.6)DOL.splice(i,1);
  whT-=dt;if(!SWH&&nearO&&whT<=0&&deepAt(P.x,P.y)){whT=100+Math.random()*60;const a=Math.random()*6.28,x=P.x+Math.cos(a)*330,y=P.y+Math.sin(a)*330;if(deepAt(x,y)){SWH={x,y,t:0,a:Math.random()*6.28};wxy(SWH);song(.5)}}
  if(SWH){SWH.t+=dt;const nx=SWH.x+Math.cos(SWH.a)*10*dt,ny=SWH.y+Math.sin(SWH.a)*10*dt;if(oc(nx,ny)){SWH.x=nx;SWH.y=ny}wxy(SWH);if(SWH.t>10)SWH=null}}
function song(v){if(!AC)return;const t=AC.currentTime;try{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(90,t);o.frequency.exponentialRampToValueAtTime(220,t+1.4);o.frequency.exponentialRampToValueAtTime(70,t+3);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.14*(v||1),t+.8);g.gain.linearRampToValueAtTime(0,t+3);o.connect(g);g.connect(sfxG);o.start(t);o.stop(t+3.1)}catch(e){}}
// ---------- chizish (sirt): kema, akula qanoti, delfin, kit ----------
function pBody(X,Y,sink){const idle=!P.mov,f=idle?6+(Math.floor(time*1.6)%2):Math.floor(P.t)%6,mp=[[2,0],[3,0],[0,0],[3,1],[2,1],[4,1],[1,0],[4,0]][P.sec],d=mp[0];
  ctx.save();ctx.beginPath();ctx.rect(X-26,Y-72,52,72-sink);ctx.clip();ctx.translate(X,Y);if(mp[1])ctx.scale(-1,1);ctx.drawImage((hero?spr:sprC)[d][f],-15,-37);ctx.restore()}
function drawSwim(X,Y){E(X,Y,11,4,'rgba(0,30,70,.25)');const b=Math.round(Math.sin(time*3)*1);
  if(P.dead>0){ctx.globalAlpha=.8;pBody(X,Y+b,24);ctx.globalAlpha=1}else{if(P.inv>0&&Math.floor(time*20)%2)return;pBody(X,Y+b,11)}
  E(X,Y-9+b,13,4,'rgba(60,140,200,.8)');E(X,Y-9+b,9,2,'rgba(150,215,240,.85)');ctx.fillStyle='rgba(255,255,255,.7)';
  for(let a=0;a<12;a++){const t=a*.52+time*2;ctx.fillRect(X+Math.round(Math.cos(t)*12),Y-9+b+Math.round(Math.sin(t)*3),1,1)}
  if(P.mov){const k=Math.sin(time*9)>0?1:-1;ctx.fillStyle='#fff';ctx.fillRect(X-14,Y-12+k,3,1);ctx.fillRect(X+11,Y-12-k,3,1)}}
function drawBoat(b){const o=pj(b.x,b.y),X=o[0],Y=o[1]+Math.round(Math.sin(time*2+b.x)*1),th=(b.sec||0)*Math.PI/4,c=Math.cos(th),sn=Math.sin(th);
  const pt=(u,v,h)=>[X+Math.round(u*c-v*sn),Y+Math.round((u*sn+v*c)*.55)-(h||0)];
  const poly=(pts,col,h)=>{ctx.fillStyle=col;ctx.beginPath();pts.forEach((p,i)=>{const q=pt(p[0],p[1],h);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fill()};
  const H=[[18,0],[10,6],[-13,6],[-16,0],[-13,-6],[10,-6]];
  E(X,Y+2,16,6,'rgba(235,248,255,.35)');poly(H,'#5a3a22',0);poly(H,'#7b5230',3);poly(H.map(p=>[p[0]*.78,p[1]*.7]),'#a9794a',3);
  if(b===BT.b){const t0=time;ctx.save();pBody(X,Y-4,8);ctx.restore()}
  ctx.fillStyle='#4a3020';ctx.fillRect(X-1,Y-28,2,26);
  const w=b.v?Math.sin(time*6)*1.5:0,tip=pt(-15,w,8);ctx.fillStyle='#f4f0e4';ctx.beginPath();ctx.moveTo(X,Y-27);ctx.lineTo(X,Y-9);ctx.lineTo(tip[0],tip[1]-6);ctx.closePath();ctx.fill();
  ctx.fillStyle='#cfc8b4';ctx.beginPath();ctx.moveTo(X,Y-27);ctx.lineTo(X,Y-20);ctx.lineTo(tip[0]*.4+X*.6,Y-18);ctx.closePath();ctx.fill();ctx.fillStyle='#d8323c';ctx.fillRect(X,Y-30,5,3)}
function surfDraw(){
  SFN.forEach(f=>{const o=pj(f.x,f.y);if(o[0]<-20||o[0]>W+20||o[1]<-20||o[1]>H+20)return;const X=o[0],Y=o[1],dir=Math.cos(f.a)-Math.sin(f.a)>=0?1:-1;
    ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(X-dir*8,Y,8,1);ctx.fillRect(X-dir*13,Y+1,6,1);ctx.fillStyle='#3d4d5c';for(let i=0;i<9;i++)ctx.fillRect(X-dir*2+Math.round(dir*i*.5)-Math.round(dir*i*.5)+0,Y-i,Math.max(1,6-Math.floor(i*.65)),1);
    ctx.fillStyle='#2b3844';ctx.fillRect(X+(dir>0?0:-1),Y-9,1,9)});
  DOL.forEach(d=>{if(d.t<0||d.t>1.2)return;const o=pj(d.x,d.y),u=d.t/1.2,z=Math.sin(u*Math.PI)*22,X=o[0],Y=o[1]-z,dir=d.vx-d.vy>=0?1:-1;E(o[0],o[1],5,2,'rgba(0,30,70,.25)');
    ctx.save();ctx.translate(X,Y);ctx.scale(dir,1);ctx.rotate(Math.cos(u*Math.PI)*-.9);E(0,0,8,3,'#5f7f98');E(1,1,6,2,'#c9dce8');ctx.fillStyle='#4d6a80';ctx.fillRect(-11,-3,4,2);ctx.fillRect(-12,2,3,2);ctx.fillRect(-1,-5,3,3);ctx.fillRect(8,0,4,2);ctx.fillStyle='#fff';ctx.fillRect(5,-1,1,1);ctx.restore()});
  if(SWH){const o=pj(SWH.x,SWH.y),X=o[0],Y=o[1],u=Math.min(1,SWH.t/1.5)*Math.min(1,(10-SWH.t)/1.5);if(u>0){E(X,Y+2,30*u,8*u,'rgba(235,248,255,.3)');E(X,Y-2,26*u,8*u,'#34506a');E(X-4,Y-4,16*u,4*u,'#456785');
      if(Math.sin(SWH.t*1.3)>.3&&Math.random()<.6)fxs.push({x:SWH.x+2,y:SWH.y,z:8,vx:(Math.random()-.5)*8,vy:(Math.random()-.5)*8,vz:55,l:.9,c:'#e8f6ff'})}}}
// ---------- sho‘ng‘in ----------
function diveToggle(){if(P.dead>0||TF.act)return;
  if(UW.on){if(UW.z>=47)uwExit(0);else pop('Tepaga suzing ⬆');return}
  if(BT.on){const b=BT.b;BT.on=0;BT.b=null;P.x=b.x+10;P.y=b.y+4}
  if(!oc(P.x,P.y)||P.fly||P.z>4){pop('Okeanda sho‘ng‘ing');return}
  UW.on=1;UW.z=54;UW.vz=0;UW.air=100;UW.cr.length=0;UW.bub.length=0;UW.slow=0;UW.ex=0;P.sw=0;rings.push({x:P.x,y:P.y,t:.25,n:1});sndSplash(1);
  for(let i=0;i<10;i++)UW.bub.push({x:P.x+Math.random()*8-4,y:P.y+Math.random()*8-4,z:50+Math.random()*8,vz:10+Math.random()*10,l:3});
  for(let i=0;i<34;i++)uwSpawn(true);
  if(AC&&mfil)mfil.frequency.setTargetAtTime(520,AC.currentTime,.4);pop('Sho‘ng‘idingiz',1.2)}
function uwExit(forced){UW.on=0;UW.cr.length=0;P.z=0;P.sw=1;P.fly=0;P.t=0;if(AC&&mfil)mfil.frequency.setTargetAtTime(3000,AC.currentTime,.3);
  rings.push({x:P.x,y:P.y,t:.25,n:1});for(let i=0;i<10;i++)fxs.push({x:P.x,y:P.y,z:6,vx:(Math.random()-.5)*30,vy:(Math.random()-.5)*30,vz:30+Math.random()*30,l:.5,c:'#e8f6ff'});if(!forced)sndSplash(1);
  if(!oc(P.x,P.y)){const n=nearFree(P.x>>4,P.y>>4,0);if(n){P.x=n[0]*16+8;P.y=n[1]*16+8}}}
function uwHurt(d){if(P.inv>0||P.dead>0)return;P.hp=Math.max(0,P.hp-d*(hero?.7:1));P.inv=.6;redT=.35;lastHurt=time;shake=Math.max(shake,.2);sndHurt();
  if(P.hp<=0){P.dead=2.6;pop('Cho‘ndingiz!',1.5)}}
const SPN=['','','','shark','jelly','turtle','ray','whale','squid','crab','angler'];
const UL=[[0,2],[1,2],[2,2]];
function uwCount(sp){let n=0;UW.cr.forEach(c=>{if(c.sp==sp)n++});return n}
function uwSpawn(init){const r0=init?60:340,r1=init?420:480;
  for(let tr=0;tr<6;tr++){const a=Math.random()*6.28,r=r0+Math.random()*(r1-r0),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;if(!oc(x,y))continue;const L=sdp(Math.floor(x/16),Math.floor(y/16)),q=Math.random();let sp=-1;
    if(q<.34){sp=Math.random()<.5?0:2;if(L<=2&&Math.random()<.55)sp=1;if(uwCount(0)+uwCount(1)+uwCount(2)>70)return}
    else if(q<.44&&L>=2&&uwCount(3)<(L>=4?3:2))sp=3;
    else if(q<.56&&uwCount(4)<8)sp=4;
    else if(q<.62&&L<=3&&uwCount(5)<2)sp=5;
    else if(q<.68&&L>=1&&uwCount(6)<2)sp=6;
    else if(q<.70&&L>=4&&uwCount(7)<1)sp=7;
    else if(q<.78&&L>=3&&uwCount(8)<3)sp=8;
    else if(q<.90&&L<=2&&uwCount(9)<9)sp=9;
    else if(q<.95&&L>=4&&uwCount(10)<2)sp=10;
    if(sp<0)continue;const n=sp<3?5+Math.floor(Math.random()*8):1,sch=++UW.ml,hd=Math.random()*6.28,z0=sp==9?2:sp==7?25+Math.random()*20:8+Math.random()*(sp==10||sp==8?30:42);
    for(let k=0;k<n;k++){const c={sp,x:x+Math.random()*14-7,y:y+Math.random()*14-7,z:z0+Math.random()*6,a:hd+Math.random()*.4,s:0,hp:sp==3?34:sp==7?200:3,sch,t:Math.random()*6,st:0,tm:0,tx:0,ty:0,id:++UW.ml};wxy(c);if(oc(c.x,c.y))UW.cr.push(c)}
    return}}
function uwAI(dt){const cr=UW.cr,gc={};
  cr.forEach(c=>{if(c.sp<3){const g=gc[c.sch]||(gc[c.sch]={x:0,y:0,vx:0,vy:0,n:0,rx:c.x,ry:c.y});g.x+=dwx(c.x,g.rx);g.y+=dwy(c.y,g.ry);g.vx+=Math.cos(c.a);g.vy+=Math.sin(c.a);g.n++}});
  const sharks=cr.filter(c=>c.sp==3);
  for(let i=cr.length-1;i>=0;i--){const c=cr[i];c.t+=dt;c.tm-=dt;const px=dwx(P.x,c.x),py=dwy(P.y,c.y),dp=Math.hypot(px,py);
    if(dp>720){cr.splice(i,1);continue}
    let sp=20,ta=c.a,turn=2.4;
    if(c.sp<3){const g=gc[c.sch],n=g.n;let fx=0,fy=0;
      if(n>1){const cx=g.x/n+0,cy=g.y/n;const mx=dwx(g.rx,c.x)+cx,my=dwy(g.ry,c.y)+cy;fx+=mx*.012;fy+=my*.012;fx+=g.vx/n*.7;fy+=g.vy/n*.7}
      cr.forEach(o=>{if(o!==c&&o.sp<3&&Math.abs(o.x-c.x)<12&&Math.abs(o.y-c.y)<12){fx+=dwx(c.x,o.x)*.05;fy+=dwy(c.y,o.y)*.05}});
      let flee=0;if(dp<46){fx-=px/dp*3;fy-=py/dp*3;flee=1}sharks.forEach(s=>{const sx=dwx(c.x,s.x),sy=dwy(c.y,s.y),sd=Math.hypot(sx,sy);if(sd<90){fx+=sx/sd*3;fy+=sy/sd*3;flee=1}});
      fx+=Math.cos(c.a)*.4;fy+=Math.sin(c.a)*.4;ta=Math.atan2(fy,fx);sp=(c.sp==1?22:26)+(flee?24:0);turn=flee?6:3;c.vz=Math.sin(c.t*.8+c.sch)*5;
      const zt=14+(c.sch%7)*5;c.z+=Math.max(-8,Math.min(8,(zt-c.z)))*dt*.6}
    else if(c.sp==3){const tgt=c.st==2?null:(()=>{let b=null,bd=170;cr.forEach(o=>{if(o.sp<3){const d=Math.hypot(dwx(o.x,c.x),dwy(o.y,c.y));if(d<bd){bd=d;b=o}}});return b})();
      if(c.st==2&&c.tm<=0)c.st=0;sp=28;
      if(c.st==2){ta=Math.atan2(-py,-px);sp=46}
      else if(dp<130&&UW.ex<=0&&P.dead<=0&&c.st!=2){ta=Math.atan2(py,px);sp=60;if(dp<18){uwHurt(12);UW.ex=1.2;c.st=2;c.tm=3.5;pop('Akula!',1)}}
      else if(tgt){ta=Math.atan2(dwy(tgt.y,c.y),dwx(tgt.x,c.x));sp=56;if(Math.hypot(dwx(tgt.x,c.x),dwy(tgt.y,c.y))<10){const k=cr.indexOf(tgt);if(k>=0){for(let q=0;q<5;q++)UW.bub.push({x:tgt.x,y:tgt.y,z:tgt.z,vz:12+Math.random()*10,l:1.5});cr.splice(k,1);if(k<i)i--}}}
      else{if(c.tm<=0){c.tm=2+Math.random()*3;c.a+=(Math.random()-.5)*1.6}ta=c.a;sp=26}
      c.z+=((26+Math.sin(c.t*.4)*14)-c.z)*dt*.5;turn=2.2}
    else if(c.sp==4){sp=5;if(c.tm<=0){c.tm=3+Math.random()*3;c.a+=(Math.random()-.5)*2}ta=c.a;c.z+=Math.sin(c.t*1.4)*9*dt;c.z=Math.max(8,Math.min(54,c.z));
      if(dp<14&&Math.abs(P.z-c.z)<14&&UW.ex<=0){uwHurt(4);UW.slow=1.6;UW.ex=1.4;pop('Meduza chaqdi!',.9)}}
    else if(c.sp==5){sp=11;if(c.tm<=0){c.tm=3+Math.random()*4;c.a+=(Math.random()-.5)*2}ta=c.a;c.z+=((6+Math.sin(c.t*.3)*4)-c.z)*dt*.4}
    else if(c.sp==6){sp=30;ta=c.a+Math.sin(c.t*.5)*.6;c.z+=((20+Math.sin(c.t*.35)*10)-c.z)*dt*.5;turn=1.2}
    else if(c.sp==7){sp=15;ta=c.a+Math.sin(c.t*.15)*.3;turn=.5;c.z+=((30+Math.sin(c.t*.2)*10)-c.z)*dt*.3;if(dp<280&&UW.song<=0){UW.song=14;song(Math.max(.2,1-dp/300))}}
    else if(c.sp==8){const burst=Math.sin(c.t*2.2)>.55;sp=burst?64:10;if(dp<90){ta=Math.atan2(-py,-px);sp=70}else if(c.tm<=0){c.tm=2+Math.random()*3;c.a+=(Math.random()-.5)*2;ta=c.a}c.z+=Math.sin(c.t*.7)*6*dt;c.z=Math.max(12,Math.min(56,c.z))}
    else if(c.sp==9){sp=c.st==1?36:9;if(dp<50&&c.st!=1){c.st=1;c.tm=1.5;ta=Math.atan2(-py,-px)}if(c.tm<=0){c.st=0;c.tm=2+Math.random()*3;c.a+=(Math.random()-.5)*3}ta=c.st==1?ta:c.a;c.z=2}
    else if(c.sp==10){sp=14;if(c.tm<=0){c.tm=3+Math.random()*3;c.a+=(Math.random()-.5)*2}ta=c.a;c.z+=((20+Math.sin(c.t*.5)*10)-c.z)*dt*.4;
      if(dp<22&&UW.ex<=0&&Math.abs(P.z-c.z)<18){uwHurt(10);UW.ex=1.4;pop('Baliq-chiroq!',.9)}}
    let da=ta-c.a;da=Math.atan2(Math.sin(da),Math.cos(da));c.a+=Math.max(-turn*dt,Math.min(turn*dt,da));
    const nx=c.x+Math.cos(c.a)*sp*dt,ny=c.y+Math.sin(c.a)*sp*dt;
    if(oc(nx,ny)&&oc(nx+Math.cos(c.a)*14,ny+Math.sin(c.a)*14)){c.x=nx;c.y=ny;wxy(c)}else{c.a+=1.7+Math.random();if(c.sp==9)c.st=0}
    c.s=sp}}
function uwAttack(){if(UW.atk>0||P.dead>0)return;UW.atk=.35;const a=UW.hd;let any=0;
  UW.cr.forEach(c=>{const dx=dwx(c.x,P.x),dy=dwy(c.y,P.y),sx=dx-dy,sy=(dx+dy)/2,d=Math.hypot(sx,sy);if(d<34&&Math.abs(c.z-UW.z)<24){const k=Math.cos(Math.atan2(sy,sx)-a);if(k>.1||d<14){any=1;
      if(c.sp<3||c.sp==9){c.hp=0;UW.fish++;pop('+🐟',.7);for(let q=0;q<4;q++)UW.bub.push({x:c.x,y:c.y,z:c.z,vz:10+Math.random()*12,l:1.2});c.dead=1}
      else{c.hp-=hero?9:6;c.st=2;c.tm=4;c.a=Math.atan2(dy,dx);if(c.sp==4)c.hp=1}}}});
  UW.cr=UW.cr.filter(c=>!c.dead&&(c.hp>0||c.sp==4||c.sp==7||c.sp==3));UW.cr.forEach(c=>{if(c.sp==3&&c.hp<=0){c.hp=1;c.st=2;c.tm=7}});
  for(let i=0;i<6;i++)UW.bub.push({x:P.x+Math.cos(a)*10,y:P.y+Math.sin(a)*10,z:UW.z,vz:8+Math.random()*10,l:.8});if(AC){noise(.1,700,.2);}}
function uwTick(dt){amb(dt);envUpdate(dt);P.inv=Math.max(0,P.inv-dt);redT=Math.max(0,redT-dt);UW.atk-=dt;UW.slow-=dt;UW.ex-=dt;UW.song-=dt;
  if(P.dead>0){P.dead-=dt;if(P.dead<=0)respawn();hudHp();return}
  let ax=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0)+jx,ay=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0)+jy;const l=Math.hypot(ax,ay);P.mov=l>.1;
  const run=K.shift||runT,sp=(run?88:56)*(hero?1.3:1)*(UW.slow>0?.4:1);
  if(P.mov){if(l>1){ax/=l;ay/=l}const S=sp*dt,dx=S*.5*(ay+ax),dy=S*.5*(ay-ax);if(oc(P.x+dx*3,P.y))P.x+=dx;if(oc(P.x,P.y+dy*3))P.y+=dy;wrapP();UW.hd=Math.atan2(ay*.5+ax*.0+(ay-ax)*0,ax);UW.hd=Math.atan2(ay,ax);P.sec=(Math.round(Math.atan2(ay,ax)/(Math.PI/4))+8)%8;P.t+=dt*7}
  const up=K.q||UW.u,dn=K.z||UW.d;UW.vz+=((up?42:dn?-42:0)-UW.vz)*Math.min(1,dt*6);UW.z=Math.max(3,Math.min(60,UW.z+UW.vz*dt));
  if(UW.z>=59.5&&up&&UW.air>-1){uwExit(0);return}
  if(!up&&!dn&&UW.z>45&&UW.z<59)UW.z+=3*dt;
  UW.air-=(hero?2.2:3.6)*dt;
  UW.cr.forEach(c=>{});
  if(UW.air<=0){UW.air=0;if(P.inv<=0)uwHurt(6);redT=Math.max(redT,.1)}
  if(UW.z>56)UW.air=Math.min(100,UW.air+30*dt);
  // havo teshiklari
  {const tx=Math.floor(P.x/16),ty=Math.floor(P.y/16);for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){const x=tx+a,y=ty+b;if(isOc(x,y)&&sdp(x,y)>=3&&hs(x*5+3,y*11+7)%251==6&&Math.hypot(x*16+8-P.x,y*16+8-P.y)<26){UW.air=Math.min(100,UW.air+34*dt);if(Math.random()<dt*10)UW.bub.push({x:P.x,y:P.y,z:UW.z,vz:15,l:1})}}}
  // sandiq
  {const tx=Math.floor(P.x/16),ty=Math.floor(P.y/16);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const x=tx+a,y=ty+b,k=(((y%TYM)+TYM)%TYM)*TXM+(((x%TXM)+TXM)%TXM);if(isOc(x,y)&&hs(x*5+3,y*11+7)%307==4&&!UW.open.has(k)&&Math.hypot(x*16+8-P.x,y*16+8-P.y)<18&&UW.z<20){UW.open.add(k);score+=5;sndCoin();document.getElementById('sc').textContent=score;pop('+5 🪙 Xazina!',1.2);for(let i=0;i<14;i++)UW.bub.push({x:x*16+8,y:y*16+8,z:6,vz:14+Math.random()*16,l:1.6})}}}
  if(P.inv<=0&&time-lastHurt>6&&UW.air>0)P.hp=Math.min(100,P.hp+1.5*dt);
  UW.spT-=dt;if(UW.spT<=0){UW.spT=.3;uwSpawn(false)}
  uwAI(dt);
  if(Math.random()<dt*(P.mov?1.6:.9))UW.bub.push({x:P.x,y:P.y,z:UW.z+10,vz:14+Math.random()*8,l:2.6});
  UW.bub.forEach(b=>{b.z+=b.vz*dt;b.l-=dt;b.x+=Math.sin(b.z*.3+b.l)*dt*3});UW.bub=UW.bub.filter(b=>b.l>0&&b.z<62);
  if(AC&&Math.random()<dt*.5)tone(500+Math.random()*500,AC.currentTime,.05,'sine',sfxG,.05);
  if(!cam.i){cam.i=1;cam.x=P.x-P.y-W/2;cam.y=(P.x+P.y)/2-H/2-6}
  const k=Math.min(1,dt*6);cam.x+=(P.x-P.y-W/2-cam.x)*k;cam.y+=((P.x+P.y)/2-UW.z*.35-H/2-6-cam.y)*k;
  hudHp();uiTick()}
function hudHp(){const h=Math.round(P.hp);if(h+'x'!==hpS){hpS=h+'x';document.getElementById('hpf').style.width=h+'%'}}
// ---------- sho‘ng‘in: chizish ----------
const UWC=['#cdbb82','#b3a678','#8d9a8a','#6c7f86','#4e6272','#3a4d5f'];
function sortDraw(items){items.forEach(it=>{let dx=(it.x0+it.x1)/2-RX,dy=(it.y0+it.y1)/2-RY;dx=-Math.round(dx/WW)*WW;dy=-Math.round(dy/WH)*WH;if(dx||dy){it.x0+=dx;it.x1+=dx;it.y0+=dy;it.y1+=dy}});
  for(let i=items.length-1;i>=0;i--){const it=items[i],o=pj((it.x0+it.x1)/2,(it.y0+it.y1)/2);if(o[0]<-90||o[0]>W+90||o[1]<-80||o[1]>H+110)items.splice(i,1)}
  items.sort((a,b)=>(a.x1+a.y1)-(b.x1+b.y1));const bef=items.map(()=>[]),out=[],vis=[];
  items.forEach((a,i)=>items.forEach((b,j)=>{if(i!=j){const ab=a.x1<=b.x0||a.y1<=b.y0,ba=b.x1<=a.x0||b.y1<=a.y0;if(ab&&!ba)bef[j].push(i)}}));
  const visit=i=>{if(vis[i])return;vis[i]=1;bef[i].forEach(visit);out.push(items[i])};items.forEach((_,i)=>visit(i));out.forEach(i=>i.f())}
function drawCr(c){const o=pj(c.x,c.y),X=o[0],Y=o[1]-Math.round(c.z),vx=Math.cos(c.a),vy=Math.sin(c.a),dir=(vx-vy)>=0?1:-1,wg=Math.sin(c.t*(c.sp==3?5:c.sp==7?2:16));
  E(o[0],o[1],c.sp==7?24:c.sp==3?10:3,c.sp==7?7:c.sp==3?3:1,'rgba(0,10,25,.28)');
  const sp=c.sp;ctx.save();ctx.translate(X,Y);ctx.scale(dir,1);
  if(sp<3){const B=['#b5c6d6','#f08a2a','#3a7bd5'][sp],T=['#8da4b8','#fff','#f2d03a'][sp];E(0,0,4,2,B);if(sp==0)E(0,1,3,1,'#e8f0f6');if(sp==1){ctx.fillStyle='#fff';ctx.fillRect(-1,-2,1,4);ctx.fillRect(2,-2,1,4)}
    ctx.fillStyle=T;ctx.fillRect(-6,-2+Math.round(wg*1.4),2,4);ctx.fillStyle='#fff';ctx.fillRect(2,-1,1,1);ctx.fillStyle='#111';ctx.fillRect(3,-1,1,1)}
  else if(sp==3){E(0,0,26,7,'#5d7488');E(-2,2,22,4,'#dde6ee');ctx.fillStyle='#4a6074';for(let i=0;i<9;i++)ctx.fillRect(-4+Math.round(i*.8),-7-(9-i)*.6|0,Math.max(2,8-i),2);
    ctx.fillStyle='#4a6074';ctx.fillRect(-32,-4+Math.round(wg*3),8,9);ctx.fillRect(-36,-8+Math.round(wg*4),5,5);ctx.fillRect(-36,3+Math.round(wg*4),5,5);ctx.fillRect(2,3,9,3);
    ctx.fillStyle='#fff';ctx.fillRect(18,-2,1,1);ctx.fillStyle='#000';ctx.fillRect(19,-2,2,2);ctx.fillStyle='#111';ctx.fillRect(22,2,4,1);ctx.fillStyle='#fff';ctx.fillRect(23,2,1,1);ctx.fillRect(25,2,1,1)}
  else if(sp==4){const p=Math.sin(c.t*3),r=6+p*1.5;E(0,0,16,14,'rgba(255,120,220,.12)');E(0,-4,Math.round(r),Math.round(5-p),'rgba(255,150,225,.8)');E(0,-5,Math.round(r*.6),2,'rgba(255,220,245,.8)');
    ctx.fillStyle='rgba(255,170,230,.7)';for(let i=-4;i<=4;i+=2)ctx.fillRect(i,0,1,8+Math.round(Math.sin(c.t*4+i)*2));ctx.fillStyle='rgba(255,230,245,.6)';ctx.fillRect(-2,0,1,12);ctx.fillRect(2,0,1,10)}
  else if(sp==5){E(0,0,9,6,'#4d7a3e');E(0,-1,7,4,'#6a9a4a');ctx.fillStyle='#3a5f2e';ctx.fillRect(-3,-2,2,2);ctx.fillRect(1,-2,2,2);ctx.fillRect(-2,0,2,2);ctx.fillStyle='#b9c97a';ctx.fillRect(8,-1,5,3);ctx.fillStyle='#111';ctx.fillRect(11,-1,1,1);
    const f=Math.round(Math.sin(c.t*2)*3);ctx.fillStyle='#8fb25e';ctx.fillRect(2,4,6,2+f);ctx.fillRect(-8,4,6,2-f);ctx.fillRect(2,-8-f,6,3);ctx.fillRect(-9,-8+f,6,3)}
  else if(sp==6){const f=Math.round(Math.sin(c.t*2)*4);E(0,0,18,6,'#5b7692');E(0,1,12,3,'#d8e4ee');ctx.fillStyle='#4a6580';ctx.fillRect(-22,-4+f,8,4);ctx.fillRect(-22,3-f,8,4);ctx.fillRect(14,-1,2,2);ctx.fillRect(-28,0,10,1);ctx.fillStyle='#fff';ctx.fillRect(12,-2,1,1)}
  else if(sp==7){const wag=Math.round(wg*6);E(0,0,64,17,'#36516b');E(4,5,56,9,'#c9d9e6');E(-2,-6,44,7,'#46698a');ctx.fillStyle='#2c445a';ctx.fillRect(-82,-6+wag,18,12);ctx.fillRect(-92,-16+wag,12,10);ctx.fillRect(-92,6+wag,12,10);ctx.fillRect(8,10,22,5);
    ctx.fillStyle='#e8f0f6';ctx.fillRect(56,-4,2,2);ctx.fillStyle='#111';ctx.fillRect(58,-4,3,3);ctx.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<6;i++)ctx.fillRect(-50+i*14,-10,8,1)}
  else if(sp==8){const b=Math.sin(c.t*2.2)>.55;E(0,0,b?12:9,b?3:4,'#c85a66');E(6,0,5,2,'#e08a92');ctx.fillStyle='#b04858';ctx.fillRect(-14,-2,5,4);for(let i=0;i<5;i++)ctx.fillRect(10,-3+i*2,b?4:7+(i&1)*2,1);ctx.fillStyle='#fff';ctx.fillRect(7,-2,2,2);ctx.fillStyle='#111';ctx.fillRect(8,-2,1,2)}
  else if(sp==9){E(0,0,5,3,'#d2482a');ctx.fillStyle='#b83a20';for(let i=0;i<3;i++){ctx.fillRect(-7,-1+i*2,3,1);ctx.fillRect(5,-1+i*2,3,1)}ctx.fillRect(-9,-5,3,3);ctx.fillRect(7,-5,3,3);ctx.fillStyle='#fff';ctx.fillRect(-2,-4,1,2);ctx.fillRect(1,-4,1,2)}
  else if(sp==10){E(0,0,11,8,'#2a2f3d');E(0,2,9,5,'#3a4152');ctx.fillStyle='#e8e8c8';for(let i=0;i<5;i++)ctx.fillRect(4+i,3,1,3);ctx.fillStyle='#ffe27a';ctx.fillRect(10,-1,2,2);ctx.fillStyle='#111';ctx.fillRect(6,-3,2,2);
    ctx.fillStyle='#4a4f60';ctx.fillRect(-14,-2+Math.round(wg*2),5,5);ctx.fillRect(2,-12,2,6);const g=.55+.3*Math.sin(c.t*4);ctx.fillStyle='rgba(180,255,120,'+g+')';ctx.fillRect(2,-14,2,2);E(3,-13,9,9,'rgba(160,255,120,.12)')}
  ctx.restore()}
function drawUWP(X,Y){const zz=Math.round(UW.z);E(X,Y,8,3,'rgba(0,10,25,.35)');if(P.inv>0&&Math.floor(time*20)%2)return;
  ctx.save();ctx.translate(X,Y-zz);ctx.rotate(UW.hd+Math.PI/2);ctx.scale(.9,.9);const f=P.mov?6+(Math.floor(time*3)%2):6;ctx.drawImage((hero?spr:sprC)[0][f],-15,-37);ctx.restore();
  if(hero){E(X,Y-zz,12,10,'rgba(255,230,120,.08)')}
  if(UW.atk>.15){const a=UW.hd;ctx.fillStyle='rgba(255,255,255,.7)';for(let q=-5;q<=5;q++){const b=a+q*.22;ctx.fillRect(X+Math.round(Math.cos(b)*20),Y-zz+Math.round(Math.sin(b)*14),2,2)}}}
function renderUW(){
  setRef();ctx.save();if(shake>0)ctx.translate(Math.round((Math.random()-.5)*4),Math.round((Math.random()-.5)*4));
  ctx.fillStyle='#061625';ctx.fillRect(0,0,W,H);
  const TX=WW/16,TY=WH/16,da0=Math.floor((cam.x-16)/16)-2,da1=Math.ceil((W+cam.x+16)/16)+2,ds0=Math.floor((cam.y-26)/8)-2,ds1=Math.ceil((H+cam.y)/8)+2,items=[];let lsum=0,ln=0;
  for(let gty=Math.floor((ds0-da1)/2);gty<Math.ceil((ds1-da0)/2)+1;gty++)for(let gtx=Math.max(gty+da0,ds0-gty),tx1=Math.min(gty+da1,ds1-gty);gtx<=tx1;gtx++){
    const X=Math.round((gtx-gty)*16-cam.x)-16,Y=Math.round((gtx+gty)*8+8-cam.y)-8;if(X>W||X<-32||Y>H||Y<-26)continue;
    const tx=((gtx%TX)+TX)%TX,ty=((gty%TY)+TY)%TY;
    if(isOc(tx,ty)){const L=sdp(tx,ty),h=hs(tx,ty);lsum+=L;ln++;dmd(X,Y,UWC[L]);ctx.fillStyle='rgba(0,0,0,.14)';if(h&1)ctx.fillRect(X+6+(h>>3)%18,Y+3+(h>>7)%9,3,1);ctx.fillStyle='rgba(255,255,255,.1)';if(h&2)ctx.fillRect(X+8+(h>>5)%14,Y+4+(h>>9)%7,2,1);
      if(L<=2){const cs=Math.sin(time*1.6+tx*.9+ty*1.3)+Math.sin(time*1.1-tx*.5+ty*.8);if(cs>1.2){ctx.fillStyle='rgba(235,255,255,.18)';ctx.fillRect(X+10,Y+5,10,2)}}
      const hh=hs(tx*5+3,ty*11+7),bx=tx*16,by=ty*16;
      if(hh%9==0&&L<=2)items.push({x0:bx+3,x1:bx+13,y0:by+3,y1:by+13,f(){const o=pj(bx+8,by+8),c=['#e0508a','#f08a2a','#a85ae0','#e8d03a'][(hh>>4)&3],n=3+(hh>>6)%3;E(o[0],o[1],7,3,'rgba(0,0,0,.2)');for(let i=0;i<n;i++){const a=-1.2+i*(2.4/(n-1)),sw=Math.round(Math.sin(time*1.2+hh+i)*1);ctx.fillStyle=c;for(let k=0;k<9+(i&1)*3;k++)ctx.fillRect(o[0]+Math.round(Math.sin(a)*k*.9)+(k>5?sw:0),o[1]-k,2,1);E(o[0]+Math.round(Math.sin(a)*9)+sw,o[1]-11-(i&1)*2,2,2,c)}}});
      else if(hh%11==1)items.push({x0:bx+5,x1:bx+11,y0:by+5,y1:by+11,f(){const o=pj(bx+8,by+8),n=2+(hh>>5)%3;for(let s=0;s<n;s++){const ox=(s-1)*3;ctx.fillStyle=s&1?'#2f8a4a':'#3fa85a';for(let k=0;k<14+(hh>>8)%10;k++)ctx.fillRect(o[0]+ox+Math.round(Math.sin(time*1.4+k*.35+s+hh)*(1+k*.15)),o[1]-k,2,1)}}});
      else if(hh%17==2&&L<=3)items.push({x0:bx+5,x1:bx+11,y0:by+5,y1:by+11,f(){const o=pj(bx+8,by+8);if(hh&32){E(o[0],o[1]-2,4,3,'#e8d8c4');ctx.fillStyle='#c9a98a';ctx.fillRect(o[0]-2,o[1]-3,4,1)}else{ctx.fillStyle='#d83a8a';for(let i=-3;i<=3;i+=2)ctx.fillRect(o[0]+i,o[1]-4-Math.round(Math.sin(time*2+i)*1),1,4);E(o[0],o[1]-1,4,2,'#a82a68')}}});
      else if(hh%23==3)items.push({x0:bx+2,x1:bx+14,y0:by+2,y1:by+14,f(){const o=pj(bx+8,by+8);E(o[0],o[1],8,3,'rgba(0,0,0,.25)');E(o[0],o[1]-3,7,5,'#5e6e7a');E(o[0]-2,o[1]-5,4,2,'#7e8e9a')}});
      else if(hh%431==5&&L>=1)items.push({x0:bx-14,x1:bx+30,y0:by-6,y1:by+22,f(){const o=pj(bx+8,by+8);E(o[0],o[1],34,10,'rgba(0,0,0,.25)');cub(bx-10,by,40,14,0,10,'#6b4a2c','#5a3c22','#47301a');cub(bx-4,by+2,20,10,10,6,'#7e5a38','#5a3c22','#47301a');ctx.fillStyle='#3a2616';ctx.fillRect(o[0]+6,o[1]-34,3,28);ctx.fillRect(o[0]-2,o[1]-28,14,1);ctx.fillStyle='rgba(180,170,140,.5)';ctx.fillRect(o[0]+9,o[1]-33,8,12)}});
      else if(hh%307==4){const k=ty*TX+tx;items.push({x0:bx+3,x1:bx+13,y0:by+3,y1:by+13,f(){const o=pj(bx+8,by+8),op=UW.open.has(k);E(o[0],o[1],7,3,'rgba(0,0,0,.25)');cub(bx+3,by+4,10,8,0,6,'#b8832a','#8a5a1c','#6e4616');cub(bx+3,by+4,10,8,6,op?1:3,op?'#e8b84a':'#c9922c','#a8761f','#8a5e18');if(!op&&Math.sin(time*4+tx)>.7){ctx.fillStyle='#fff';ctx.fillRect(o[0]+3,o[1]-13,1,3);ctx.fillRect(o[0]+2,o[1]-12,3,1)}}})}
      else if(hh%251==6&&L>=3)items.push({x0:bx+4,x1:bx+12,y0:by+4,y1:by+12,f(){const o=pj(bx+8,by+8);E(o[0],o[1],6,2,'#2a3a46');for(let i=0;i<7;i++){const t=(time*1.3+i*.37)%2.6;ctx.fillStyle='rgba(200,245,255,'+(.8-t*.28)+')';ctx.fillRect(o[0]+Math.round(Math.sin(t*3+i)*2),o[1]-Math.round(t*30),2,2)}}})}
    else{let co=0;if(isOc(tx+1,ty)||isOc(tx-1,ty)||isOc(tx,ty+1)||isOc(tx,ty-1))co=1;if(!co){dmd(X,Y,'#0a141b')}else{dmd(X,Y,'#16232c');const bx=tx*16,by=ty*16;items.push({x0:bx,x1:bx+16,y0:by,y1:by+16,f(){cub(bx,by,16,16,0,30,'#2b3d48','#223039','#18242c')}})}}}
  // jonzotlar
  UW.cr.forEach(c=>{if(!onS(c.x,c.y))return;const r=c.sp==7?50:c.sp==3?16:6;items.push({x0:c.x-r,x1:c.x+r,y0:c.y-r,y1:c.y+r,f(){drawCr(c)}})});
  items.push({...bb(P.x,P.y,5),f(){const o=pj(P.x,P.y);drawUWP(o[0],o[1])}});
  sortDraw(items);
  // pufakchalar, plankton
  UW.bub.forEach(b=>{const o=pj(b.x,b.y),y=o[1]-Math.round(b.z);ctx.fillStyle='rgba(210,245,255,.75)';ctx.fillRect(o[0],y,2,2);ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillRect(o[0],y,1,1)});
  ctx.fillStyle='rgba(200,230,240,.35)';for(let i=0;i<50;i++){const x=((i*173+time*(6+i%5))%(W+40))-20,y=((i*97+time*(3+i%4)*1.5+Math.sin(time+i)*8)%(H+20));ctx.fillRect(x|0,y|0,1,1)}
  // yorug‘lik nurlari
  const dark=Math.min(.82,.16+.075*(ln?lsum/ln:2)+(1-UW.z/60)*.18+dayN*.14);
  for(let i=0;i<6;i++){const x=((i*131+time*5)%(W+240))-120,a=(.05+.03*Math.sin(time*.8+i))*(1-dark*.8);ctx.fillStyle='rgba(210,245,255,'+a+')';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+22,0);ctx.lineTo(x-60,H);ctx.lineTo(x-96,H);ctx.closePath();ctx.fill()}
  ctx.fillStyle='rgba(4,26,58,'+dark+')';ctx.fillRect(0,0,W,H);
  const gr=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);gr.addColorStop(0,'rgba(0,10,30,0)');gr.addColorStop(1,'rgba(0,8,26,.55)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
  if(UW.z>52){ctx.fillStyle='rgba(180,235,255,'+(.08+.12*(UW.z-52)/8)+')';ctx.fillRect(0,0,W,H)}
  if(redT>0){ctx.fillStyle='rgba(220,30,30,'+(redT*.8)+')';ctx.fillRect(0,0,W,H)}
  if(UW.air<25){ctx.fillStyle='rgba(120,0,0,'+(.15+.12*Math.sin(time*8))+')';ctx.fillRect(0,0,W,H)}
  if(P.dead>0){ctx.fillStyle='rgba(0,0,0,'+Math.min(.65,(2.6-P.dead)*.8)+')';ctx.fillRect(0,0,W,H);ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle='#ff6a6a';ctx.fillText('CHO‘NDINGIZ',W/2,H/2)}
  ctx.restore()}
// ---------- interfeys ----------
const swb=document.getElementById('swb'),swf=document.getElementById('swf'),swl=document.getElementById('swl'),bBt=document.getElementById('bt'),bDv=document.getElementById('dv'),bUu=document.getElementById('uu'),bUd=document.getElementById('ud');let uiS='';
function uiTick(){const nb=!UW.on&&!BT.on&&!P.fly&&P.z<6&&!!nearBoat(),sw=P.sw||UW.on||(P.sta<99&&P.sw),show=UW.on||P.sw||(P.sta<98&&!BT.on);
  const key=[UW.on,BT.on,nb,P.sw,show,Math.round(UW.on?UW.air:P.sta),UW.fish,Math.round(UW.z/3)].join();if(key===uiS)return;uiS=key;
  bBt.style.display=(BT.on||nb)&&!UW.on?'block':'none';bBt.textContent=BT.on?'⚓':'⛵';
  bDv.style.display=(UW.on||P.sw||BT.on)?'block':'none';bDv.textContent=UW.on?'🌊':'🤿';
  bUu.style.display=bUd.style.display=UW.on?'block':'none';
  swb.style.display=show?'block':'none';
  if(UW.on){swl.textContent='🫧 Havo '+Math.round(UW.air)+'% · chuqurlik '+Math.round((60-UW.z)/5+4)+' m · 🐟 '+UW.fish;swf.style.width=Math.round(UW.air)+'%';swf.style.background=UW.air<25?'#e04a4a':'#7fd8ff'}
  else{swl.textContent='🌊 Suzish kuchi '+Math.round(P.sta)+'%';swf.style.width=Math.round(P.sta)+'%';swf.style.background=P.sta<25?'#e04a4a':'#5ad0a0'}}
bBt.onpointerdown=e=>{e.stopPropagation();e.preventDefault();boatToggle()};
bDv.onpointerdown=e=>{e.stopPropagation();e.preventDefault();diveToggle()};
bUu.onpointerdown=e=>{e.stopPropagation();e.preventDefault();UW.u=1};bUd.onpointerdown=e=>{e.stopPropagation();e.preventDefault();UW.d=1};
['pointerup','pointerleave','pointercancel'].forEach(t=>{bUu.addEventListener(t,()=>UW.u=0);bUd.addEventListener(t,()=>UW.d=0)});
[bBt,bDv,bUu,bUd].forEach(b=>b.ontouchstart=e=>e.stopPropagation());
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(edOpen||gmOpen)return;if(k=='b')boatToggle();if(k=='v')diveToggle()});
