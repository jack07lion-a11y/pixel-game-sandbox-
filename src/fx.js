// ===================== JANG SAN'ATI, ATMOSFERA, MUHIT OVOZLARI =====================
const SPX={k:0,t:0,d:0,s0:0,hitS:new Set(),ch:0,ph:0,did:0,bt:0,gh:[]};
const solSp=()=>((Math.atan2(SOL.ry,SOL.rx)*180/Math.PI-90)%360+360)%360/90;
function xAoe(x,y,r,dmg,kb,opt){let n=0;const st=opt&&opt.set,lau=opt&&opt.lau;
  for(const a of CA){if(a.dead>0||a.hid||a.c==3)continue;const dx=dwx(a.x,x),dy=dwy(a.y,y),d=Math.hypot(dx,dy);if(d<r+a.sc*5){if(st){if(st.has(a))continue;st.add(a)}const u=d||1;caHit(a,dmg*DMGM,dx/u*kb,dy/u*kb,P);if(lau&&a.sc<2&&a.dead<=0){a.vz=lau;a.z=1;a.lau=1;a.stun=1.1}n++}}
  EN.forEach(e=>{if(e.dead>0)return;const dx=e.x-x,dy=e.y-y,d=Math.hypot(dx,dy);if(d<r+4){if(st){if(st.has(e))return;st.add(e)}eHit(e,dmg*DMGM,dx/(d||1)*kb,dy/(d||1)*kb);if(lau)e.stun=1.1;n++}});
  AN.forEach(a=>{if(a.pet||a.jzp||a.jz||a.dead||a.rm||a.fling)return;const dx=a.x-x,dy=a.y-y;if(dx>r+6||dx<-r-6||dy>r+6||dy<-r-6)return;const d=Math.hypot(dx,dy);if(d<r+4&&(a.z||0)<14){if(st){if(st.has(a))return;st.add(a)}hitAnimal(a,dmg*12,dx/(d||1),dy/(d||1));n++}});
  return n}
function special(k){if(UW.on||BT.on||gmOpen)return false;if(!hero){pop('Avval ⚡ bosing — qahramonga aylaning');return false}if(P.dead>0||TF.act||SPX.t>0)return false;
  if(P.fly||P.z>8)k=3;const cost=[0,6,7,14,8][k];if(P.pw<cost){pop('Kuch yetmaydi ⚡');return false}
  P.pw-=cost;const S=SPX;S.k=k;S.hitS=new Set();S.s0=P.sec;S.ph=0;S.did=0;cmb=5;S.d=S.t=[0,.5,.42,1.1,.24][k];AT.win=0;
  if(k==1){sndWhoosh(2);pop('AYLANMA TEPKI!',.7)}else if(k==2){sndWhoosh(1)}else if(k==4){sndWhoosh(2);if(AC)noise(.2,3000,.2);pop('CHAQMOQ ZARBA!',.7)}
  else{if(P.fly||P.z>8){P.fly=0;S.ph=1;FVx=FVy=0}sndWhoosh(0);if(AC)sndTake()}
  return true}
function xCombo(){if(SPX.t>0)return true;SPX.ch=SPX.ch%3+1;return special([0,2,1,3][SPX.ch])}
function spxUpdate(dt){const S=SPX;S.gh.forEach(g=>g.l-=dt);if(S.gh.length)S.gh=S.gh.filter(g=>g.l>0);
  if(S.t<=0){if(AT.win<=0&&AT.t<=0)S.ch=0;return}
  S.t-=dt;const u=Math.min(1,1-S.t/S.d),a=P.sec*Math.PI/4,fx=Math.cos(a),fy=Math.sin(a),wx=.5*(fy+fx),wy=.5*(fy-fx),l=Math.hypot(wx,wy)||1,ux=wx/l,uy=wy/l;
  AT.hit=1;AT.q=0;
  if(S.k==1){P.sec=(S.s0+Math.floor(u*16))%8;AT.n=2;AT.d=.42;AT.t=.2;if(xAoe(P.x,P.y,32,8,1.4,{set:S.hitS})){hstop=.04;shake=Math.max(shake,.15)}
    for(let i=0;i<2;i++){const q=u*12.6+i*3.14;fxs.push({x:P.x+Math.cos(q)*20,y:P.y+Math.sin(q)*20,z:8,vx:0,vy:0,vz:14,l:.18,c:i?'#ffe27a':'#fff'})}}
  else if(S.k==2){AT.n=1;AT.d=.36;AT.t=Math.max(.03,.36*(1-u));P.z=Math.sin(u*3.14)*18;const mx=ux*46*dt,my=uy*46*dt;if(!hit(P.x+mx,P.y+my)){P.x+=mx;P.y+=my}
    if(u>.28&&!S.did){S.did=1;if(xAoe(P.x+ux*14,P.y+uy*14,22,15,.5,{lau:230})){hstop=.09;shake=Math.max(shake,.28);pop('APPERKOT!',.7);rings.push({x:P.x+ux*14,y:P.y+uy*14,t:.25,n:2})}}
    fxs.push({x:P.x+ux*10,y:P.y+uy*10,z:P.z+16,vx:0,vy:0,vz:40,l:.2,c:'#ffb030'})}
  else if(S.k==3){AT.t=0;if(S.ph==0){P.z+=(44-P.z)*Math.min(1,dt*13);if(u>.3)S.ph=1}
    else if(S.ph==1){P.z-=(340+P.z*3)*dt;fxs.push({x:P.x,y:P.y,z:P.z+20,vx:0,vy:0,vz:0,l:.15,c:'#fff'});if(P.z<=0){P.z=0;S.ph=2;S.t=Math.min(S.t,.28);shake=Math.max(shake,.6);hstop=.08;sndLand();sndThud();flashT=Math.max(flashT,.08);pop('YER ZARBASI!',.9);
        for(let i=0;i<3;i++)rings.push({x:P.x+Math.random()*16-8,y:P.y+Math.random()*16-8,t:.25+i*.08,n:2});
        for(let i=0;i<26;i++){const q=i/26*6.28,r=10+Math.random()*40;dust.push({x:P.x+Math.cos(q)*r,y:P.y+Math.sin(q)*r,z:0,vz:10+Math.random()*14,l:.5+Math.random()*.4});fxs.push({x:P.x,y:P.y,z:2,vx:Math.cos(q)*90,vy:Math.sin(q)*90,vz:40+Math.random()*60,l:.6,c:i%2?'#c9b98a':'#8d8f99'})}
        xAoe(P.x,P.y,66,15,2,{lau:170});
        for(let i=rocks.length-1;i>=0;i--){const r=rocks[i];if(Math.hypot(r[0]+r[2]/2-P.x,r[1]+r[3]/2-P.y)<46)crushRock(r)}
        trees.forEach(t=>{if(t[4].st==0&&t[2]!=3&&Math.abs(t[0]-P.x)<46&&Math.abs(t[1]-P.y)<46){const dx=t[0]-P.x,dy=t[1]-P.y,d=Math.hypot(dx,dy)||1;treeHit(t,2,dx/d,dy/d);if(t[4].st==0)treeHit(t,2,dx/d,dy/d)}})}}}
  else if(S.k==4){AT.n=0;AT.d=.36;AT.t=.2;const sp=430*dt/3;for(let i=0;i<3;i++){if(!hit(P.x+ux*sp,P.y+uy*sp)){P.x+=ux*sp;P.y+=uy*sp}}wrapP();if(xAoe(P.x,P.y,17,13,1.6,{set:S.hitS})){hstop=.03;shake=Math.max(shake,.15)}
    S.gh.push({x:P.x,y:P.y,l:.22,sec:P.sec});fxs.push({x:P.x,y:P.y,z:12,vx:0,vy:0,vz:0,l:.25,c:'#9fe0ff'})}
  if(S.t<=0){if(S.k==1)P.sec=S.s0;S.k=0;AT.t=0;AT.n=2;AT.win=.8}}
function spBtn(){if(P.fly||P.z>8)special(3);else if((K.shift||runT)&&P.mov)special(4);else{SPX.bt=SPX.bt%3+1;special(SPX.bt)}}
addEventListener('keydown',e=>{if(e.repeat||edOpen)return;const k=e.key.toLowerCase();if(k=='l')special(1);else if(k=='i')special(2);else if(k=='o')special(3);else if(k=='h')special(4)});
document.body.insertAdjacentHTML('beforeend','<button id="sx">🥋</button>');
document.getElementById('sx').onpointerdown=e=>{e.stopPropagation();e.preventDefault();spBtn()};
// ---------- muhit ovozlari ----------
const AMBX={b:2,c:0,w:3,z:3,o:9};
function xAudio(dt){if(!AC||muted)return;const t=AC.currentTime,A=AMBX,tx=P.x>>4,ty=Math.max(0,Math.min(TYR-1,P.y>>4)),T=TRW[ty],bi=biome(tx,ty);if(UW.on)return;
  A.b-=dt;if(A.b<=0){A.b=1.4+Math.random()*4;if(dayN<.35&&T>3&&bi==0&&rain<.3){const f=2300+Math.random()*2400,n=2+(Math.random()*4|0),p=pn(Math.random()*1.6-.8);
      for(let i=0;i<n;i++){const o=AC.createOscillator(),g=AC.createGain(),s=t+i*(.07+Math.random()*.05);o.type='sine';o.frequency.setValueAtTime(f*(1+Math.random()*.15),s);o.frequency.exponentialRampToValueAtTime(f*(.8+Math.random()*.5),s+.06);g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.03,s+.01);g.gain.exponentialRampToValueAtTime(.001,s+.07);o.connect(g);g.connect(p);o.start(s);o.stop(s+.09)}}}
  A.c-=dt;if(A.c<=0){A.c=.45;if(dayN>.6&&T>6&&bi!=2)for(let i=0;i<3;i++)tone(4200+Math.sin(time*.7)*250,t+i*.045,.03,'sine',sfxG,.01)}
  A.w-=dt;if(A.w<=0){A.w=3.5+Math.random()*3;let oc2=0;for(const q of[[7,0],[-7,0],[0,7],[0,-7]])if(isOc(tx+q[0],ty+q[1])&&!FZ[Math.max(0,Math.min(TYR-1,ty+q[1]))])oc2=1;if(oc2)noise(1.7,520,.045)}
  A.z-=dt;if(A.z<=0){A.z=2.2+Math.random()*4;const z=CA.find(a=>a.c==1&&a.dead<=0&&onNear(a,240));if(z){const o=AC.createOscillator(),g=AC.createGain(),fl=AC.createBiquadFilter(),f=70+Math.random()*55;o.type='sawtooth';o.frequency.setValueAtTime(f,t);o.frequency.linearRampToValueAtTime(f*.68,t+.75);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.055,t+.15);g.gain.linearRampToValueAtTime(0,t+.85);fl.type='lowpass';fl.frequency.value=520;o.connect(fl);fl.connect(g);g.connect(pn((z.x-z.y-cam.x-W/2)/(W/2)));o.start(t);o.stop(t+.9)}}
  A.o-=dt;if(A.o<=0){A.o=13+Math.random()*20;if(dayN>.7&&bi==0&&T>0){tone(410,t,.28,'sine',sfxG,.035);tone(370,t+.38,.45,'sine',sfxG,.035)}
    else if(curCiv&&curCiv.id==0&&dayN<.4){[660,880,660].forEach((f,i)=>tone(f,t+i*.5,.7,'sine',sfxG,.03))}
    else if(curCiv&&curCiv.id==2){tone(62,t,1.2,'sawtooth',sfxG,.05);tone(93,t+.1,1,'sine',sfxG,.05)}}}
// ---------- atmosfera qatlami ----------
let vgC=null,vgW=0,vgH=0;
function xGlow(x,y,z,r,a,col){const o=pj(x,y);if(o[0]<-r||o[0]>W+r||o[1]<-r||o[1]>H+r+z)return;const g=ctx.createRadialGradient(o[0],o[1]-z,0,o[0],o[1]-z,r);g.addColorStop(0,'rgba('+col+','+a+')');g.addColorStop(1,'rgba('+col+',0)');ctx.fillStyle=g;ctx.fillRect(o[0]-r,o[1]-z-r,r*2,r*2)}
function xDraw(dt){if(UW.on)return;const day=1-dayN,tx=((P.x>>4)%TXM+TXM)%TXM,ty=((P.y>>4)%TYM+TYM)%TYM,rt=rgT(tx,ty);
  // bulut soyalari
  if(day>.3&&rain<.5){ctx.fillStyle='rgba(8,16,40,'+(.075*day)+')';for(let i=0;i<5;i++){const x=(((i*397+time*(6+i)-cam.x)%(W+420))+W+420)%(W+420)-210,y=(((i*251+time*2-cam.y)%(H+260))+H+260)%(H+260)-130;ctx.beginPath();ctx.ellipse(x,y,95+i*22,36+i*7,0,0,6.3);ctx.fill()}}
  // o'rmon nurlari
  if(day>.75&&sunV>.12&&(rt==1||rt==11||rt==5)&&rain<.2){ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,240,170,.045)';for(let i=0;i<5;i++){const x=(((i*173-cam.x*.6+Math.sin(time*.2+i)*14)%(W+120))+W+120)%(W+120)-60,w=14+i*5;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+w,0);ctx.lineTo(x+w-H*.45,H);ctx.lineTo(x-H*.45,H);ctx.fill()}ctx.globalCompositeOperation='source-over'}
  // tuman: botqoq yoki tong
  {const fg=rt==3?.07:(warm>.25?.05*warm:0)+(curCiv&&curCiv.id==1?.05:0);if(fg>.01){ctx.fillStyle='rgba(215,225,235,'+fg+')';for(let i=0;i<5;i++){const x=(((i*311+time*9-cam.x*.8)%(W+500))+W+500)%(W+500)-250,y=H*(.2+i*.17)+Math.sin(time*.3+i)*8;ctx.beginPath();ctx.ellipse(x,y,150,16+i*3,0,0,6.3);ctx.fill()}}}
  // zombilar yeri: zaharli tus va sporalar
  if(curCiv&&curCiv.id==1){ctx.fillStyle='rgba(30,70,20,.13)';ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(150,255,110,.5)';for(let i=0;i<22;i++){const x=((i*71+Math.sin(time*.5+i)*20)%W+W)%W,y=H-((time*(8+i%5)+i*37)%H);ctx.fillRect(x|0,y|0,1,1)}}
  // tungi chiroqlar
  if(dayN>.22){ctx.globalCompositeOperation='lighter';const al=Math.min(.55,dayN*.6),fl=.85+.15*Math.sin(time*11);
    for(const b of BLK.values()){if(b.t==7)xGlow(b.x+8,b.y+8,12,26,al*fl,'255,180,80');else if(b.t==8)xGlow(b.x+8,b.y+8,6,40,al*fl,'255,170,60');else if(b.t==19)xGlow(b.x+8,b.y+8,20,46,al,'255,246,200');else if(b.t==16)xGlow(b.x+8,b.y+8,8,16,al*.5,'90,208,255')}
    CIV.forEach(c=>{if(!c||Math.abs(dwx(c.x,P.x))>700||Math.abs(dwy(c.y,P.y))>700)return;c.bld.forEach(b=>{const cx=b.x+b.w/2,cy=b.y+b.h/2;if(b.t=='house'&&b.p>=1)xGlow(cx,cy+6,6,22,al*.6,'255,210,120');else if(b.t=='castle')xGlow(cx,cy,20,70,al*.5,'255,210,120');else if(b.t=='zfire')xGlow(cx,cy,6,34,al*fl,'120,255,90');else if(b.t=='citadel')xGlow(cx,cy,50,80,al*.6,'120,255,90');else if(b.t=='crypt')xGlow(cx,cy+8,4,18,al*.5,'120,255,90');else if(b.t=='gfire')xGlow(cx,cy,8,60,al*fl,'255,160,50');else if(b.t=='ghut')xGlow(cx,cy+12,10,26,al*.4,'255,170,80')})});
    ECO.gl.forEach(a=>xGlow(a.x,a.y,8,20,al*.8,a.sp==18?'255,140,50':'150,230,255'));
    ctx.globalCompositeOperation='source-over'}
  // qutb yog'dusi
  {const lat=Math.abs(.5-P.y/WH)*2*LATR;if(lat>.92&&dayN>.55){const a=Math.min(1,(lat-.92)*5)*(dayN-.55)*2;ctx.globalCompositeOperation='lighter';for(let x=0;x<W;x+=3){const h=18+Math.sin(x*.045+time*.5)*10+Math.sin(x*.11-time*.8)*6,y0=6+Math.sin(x*.03+time*.3)*8;ctx.fillStyle='rgba(70,255,170,'+(.05*a)+')';ctx.fillRect(x,y0,3,h);ctx.fillStyle='rgba(170,90,255,'+(.04*a)+')';ctx.fillRect(x,y0+h*.6,3,h*.7)}ctx.globalCompositeOperation='source-over'}}
  // lazer nurlari
  SB.beams.forEach(b=>{const a=pj(b.x0,b.y0),c=pj(b.x1,b.y1),n=Math.max(Math.abs(c[0]-a[0]),Math.abs(c[1]-b.z1-a[1]+15),1);ctx.fillStyle='#ff5a5a';for(let i=0;i<=n;i+=1){const u=i/n;ctx.fillRect(a[0]+(c[0]-a[0])*u|0,(a[1]-15)+(c[1]-b.z1-a[1]+15)*u|0,1,1)}ctx.fillStyle='#fff';ctx.fillRect(c[0]-1,c[1]-b.z1-1,3,3)});
  // chaqmoq zarba izi
  SPX.gh.forEach(g=>{const o=pj(g.x,g.y),mp=MP8[g.sec];ctx.save();ctx.translate(o[0],o[1]);if(mp[1])ctx.scale(-1,1);ctx.globalAlpha=g.l*2.2;ctx.drawImage(spr[mp[0]][8],-15,-37);ctx.restore()});ctx.globalAlpha=1;
  // blok qalqoni
  if(K.p&&hero&&P.dead<=0){const o=pj(P.x,P.y);ctx.fillStyle='rgba(140,220,255,.8)';for(let q=0;q<20;q++){const t=q*.314+time*3;ctx.fillRect(o[0]+Math.round(Math.cos(t)*13),o[1]-18+Math.round(Math.sin(t)*17),1,2)}}
  if(P.shd>0){const o=pj(P.x,P.y);ctx.fillStyle='rgba(120,255,220,.55)';for(let q=0;q<14;q++){const t=q*.449-time*2;ctx.fillRect(o[0]+Math.round(Math.cos(t)*12),o[1]-18-Math.round(P.z)+Math.round(Math.sin(t)*16),1,1)}}
  // zahar
  if(P.pois>0){ctx.fillStyle='rgba(90,200,60,'+(.08+.05*Math.sin(time*6))+')';ctx.fillRect(0,0,W,H)}
  // vinyetka
  if(vgW!=W||vgH!=H){vgW=W;vgH=H;vgC=mkc(W,H);const g=vgC.getContext('2d'),gr=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.42,W/2,H/2,Math.hypot(W,H)*.56);gr.addColorStop(0,'rgba(0,0,10,0)');gr.addColorStop(1,'rgba(0,0,10,.42)');g.fillStyle=gr;g.fillRect(0,0,W,H)}
  ctx.drawImage(vgC,0,0);
  // mini-xarita belgilar
  CIV.forEach(c=>{if(!c)return;const q=mpj(c.x,c.y);mx.fillStyle='#000';mx.fillRect(Math.round(q[0])-2,Math.round(q[1])-2,5,5);mx.fillStyle=c.col;mx.fillRect(Math.round(q[0])-1,Math.round(q[1])-1,3,3)})}
function xUpdate(dt){civUpdate(dt);sbxUpdate(dt);spxUpdate(dt);ecoUpdate(dt);xAudio(dt)}
function xItems(items){civItems(items);sbxItems(items)}
function xGround(){civGround();sbxGround()}
