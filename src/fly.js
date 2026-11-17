// ================= PARVOZ: fizika, spraytlar, zarbalar, suvga sho‘ng‘ish =================
const FW=60,FH=44;
function shade2(S,ramp,k,draw){const A=mkc(FW,FH),a=A.getContext('2d');a.fillStyle=ramp[2];draw(a,0,0);a.globalCompositeOperation='source-atop';a.fillStyle=ramp[1];draw(a,-k,-k);
  const B=mkc(FW,FH),b=B.getContext('2d');b.fillStyle=ramp[0];draw(b,0,0);b.globalCompositeOperation='destination-out';draw(b,k,k);a.drawImage(B,0,0);S.drawImage(A,0,0)}
function outline2(src){const o=mkc(FW,FH),g=o.getContext('2d');[[1,0],[-1,0],[0,1],[0,-1]].forEach(([x,y])=>g.drawImage(src,x,y));g.globalCompositeOperation='source-in';g.fillStyle='#120a14';g.fillRect(0,0,FW,FH);g.globalCompositeOperation='source-over';g.drawImage(src,0,0);return o}
function mkFly(pose,f){const o=mkc(FW,FH),S=o.getContext('2d'),R=RP,pt=(r,k,fn)=>shade2(S,r,k,fn),fl=(c,fn)=>{S.fillStyle=c;fn()},sn=Math.sin,ph=f*Math.PI/2,wv=Math.round(sn(ph)*2),w2=Math.round(sn(ph+1.6)*2),cx=30,cy=22;
  if(pose<2){const b=pose==1,l1=b?cy+1:cy-1+wv,l2=b?cy+3:cy+3+w2;
    pt(R.cape,2,(g,x,y)=>sP(g,b?[[cx+3,cy-4],[cx+3,cy+1],[cx-26,cy+3+wv],[cx-31,cy-2+w2]]:[[cx+3,cy-4],[cx+3,cy+1],[cx-16,cy+7+wv],[cx-27,cy+2+w2],[cx-22,cy-9+wv]],x,y));
    pt(R.pant.slice(1),1,(g,x,y)=>sL(g,cx-6,cy-1,cx-18,l1,3,x,y));pt(R.pant,1,(g,x,y)=>sL(g,cx-6,cy+2,cx-18,l2,3,x,y));
    pt(R.boot,1,(g,x,y)=>{sR(g,cx-23,l1-1,5,4,x,y);sR(g,cx-23,l2-1,5,4,x,y)});
    pt(R.suit,2,(g,x,y)=>sP(g,[[cx-8,cy-5],[cx+5,cy-6],[cx+6,cy+3],[cx-8,cy+3]],x,y));
    fl('#d8a53c',()=>{sR(S,cx-1,cy-4,3,3);sR(S,cx-8,cy+1,4,1)});fl('#fff',()=>sR(S,cx,cy-3,1,1));
    pt(R.suit,1,(g,x,y)=>{sL(g,cx+4,cy-4,cx+17,b?cy-5:cy-6,3,x,y);if(b)sL(g,cx+3,cy-1,cx+17,cy-2,3,x,y);else sL(g,cx+1,cy+2,cx-5,cy+4+w2,3,x,y)});
    pt(R.skin,1,(g,x,y)=>{sR(g,cx+17,b?cy-6:cy-7,3,3,x,y);if(b)sR(g,cx+17,cy-3,3,3,x,y)});
    const hx=cx+9,hy=b?cy-2:cy-6;pt(R.skin,1,(g,x,y)=>sE(g,hx,hy,4,4,x,y));
    pt(R.hair,1,(g,x,y)=>sP(g,[[hx-5,hy+2],[hx-5,hy-2],[hx-2,hy-5],[hx+2,hy-5],[hx+5,hy-3],[hx+3,hy-1],[hx,hy-1],[hx-1,hy+2]],x,y));
    fl(R.mask[1],()=>sR(S,hx-1,hy-1,6,2));fl('#fff',()=>sR(S,hx+3,hy-1,2,1));if(b){fl('rgba(255,255,255,.7)',()=>{sR(S,cx+20,cy-4,5,1);sR(S,cx+22,cy-2,4,1)})}}
  else{const t=pose==3,ln=t?3:0,hx=cx+ln,hy=cy-13+(t?3:0);
    pt(R.cape,2,(g,x,y)=>sP(g,[[cx-4,cy-8],[cx-4,cy+2],[cx-11+wv,cy+14+(t?-2:0)],[cx-16,cy+9+w2],[cx-12,cy-6]],x,y));
    pt(R.pant,1,(g,x,y)=>{sL(g,cx-2,cy+3,cx-3-(t?2:0),cy+14+wv,3,x,y);sL(g,cx+2,cy+3,cx+3+(t?2:0),cy+13+w2,3,x,y)});
    pt(R.boot,1,(g,x,y)=>{sR(g,cx-5-(t?2:0),cy+14+wv,4,3,x,y);sR(g,cx+2+(t?2:0),cy+13+w2,4,3,x,y)});
    pt(R.suit,2,(g,x,y)=>sP(g,[[cx-5+ln,cy-8],[cx+5+ln,cy-8],[cx+4,cy+3],[cx-4,cy+3]],x,y));fl('#d8a53c',()=>{sR(S,cx-1+ln,cy-6,3,3);sR(S,cx-4,cy+1,8,1)});fl('#fff',()=>sR(S,cx+ln,cy-5,1,1));
    pt(R.suit,1,(g,x,y)=>{if(t){sL(g,cx-4+ln,cy-7,cx-5,cy+5,3,x,y);sL(g,cx+5+ln,cy-7,cx+6,cy+5,3,x,y)}else{sL(g,cx-5,cy-7,cx-10,cy+2+wv,3,x,y);sL(g,cx+5,cy-7,cx+10,cy+2+w2,3,x,y)}});
    pt(R.skin,1,(g,x,y)=>{if(t){sR(g,cx-6,cy+5,3,3,x,y);sR(g,cx+5,cy+5,3,3,x,y)}else{sR(g,cx-11,cy+2+wv,3,3,x,y);sR(g,cx+9,cy+2+w2,3,3,x,y)}});
    pt(R.skin,1,(g,x,y)=>sE(g,hx,hy,4,4,x,y));pt(R.hair,1,(g,x,y)=>sP(g,[[hx-5,hy+2],[hx-5,hy-2],[hx-2,hy-5],[hx+2,hy-5],[hx+5,hy-3],[hx+3,hy-1],[hx,hy-1],[hx-1,hy+2]],x,y));
    fl(R.mask[1],()=>sR(S,hx-1,hy-1,6,2));fl('#fff',()=>sR(S,hx+3,hy-1,2,1));if(t)fl('#9fe0ff',()=>sR(S,hx-6,hy-2+(f&1)*2,1,2))}
  return o}
const FLS=[0,1,2,3].map(p=>Array.from({length:4},(_,f)=>outline2(mkFly(p,f))));
let FVx=0,FVy=0,FS=0,FAng=0,FD=1,FTire=0,ALT=30,FZV=0,LAx=0,LAy=0,sonic=0,flyHint=0,trailT=0,tirePop=0;
function drawFly(X,Y,zz){const sp=FS,pose=(P.dive>0||sp>260)?1:sp>24?0:(FTire>.7?3:2),f=Math.floor(time*(pose==1?18:pose==0?10:pose==3?3:5))%4,ang=pose<2?FAng:FAng*.3;
  const cy=Y-zz-14;
  if(pose==1){E(X,cy,20,11,'rgba(255,236,170,.14)');const sx=FVx-FVy,sy=(FVx+FVy)/2,l=Math.hypot(sx,sy)||1;for(let g=2;g>=1;g--){ctx.globalAlpha=.16*(3-g);ctx.save();ctx.translate(X-sx/l*g*9,cy-sy/l*g*9);ctx.scale(FD,1);ctx.rotate(ang);ctx.drawImage(FLS[1][f],-30,-22);ctx.restore()}ctx.globalAlpha=1}
  ctx.save();ctx.translate(X,cy);ctx.scale(FD,1);ctx.rotate(ang);ctx.drawImage(FLS[pose][f],-30,-22);ctx.restore()}
function flyTick(dt,ax,ay,l,run){
  const up=K.q||UW.u,dn=K.z||UW.d,ov=oc(P.x,P.y),boost=(run&&l>.1&&P.pw>2&&FTire<.98)||P.dive>0;
  let vmax=boost?420:165;if(FZV<-40&&!boost)vmax*=1.2;vmax*=1-(boost?.45:.4)*FTire;if(P.pw<=0)vmax=55;
  let tx=0,ty=0;if(l>.1){const u=Math.min(1,l),wx=.5*(ay+ax),wy=.5*(ay-ax),n=Math.hypot(wx,wy)||1;tx=wx/n*vmax*u;ty=wy/n*vmax*u;P.sec=(Math.round(Math.atan2(ay,ax)/(Math.PI/4))+8)%8}
  const dvx=tx-FVx,dvy=ty-FVy,dd=Math.hypot(dvx,dvy);let acc=l>.1?(boost?560:250)*(1-.35*FTire):95;if(l>.1&&FVx*tx+FVy*ty<0)acc*=1.8;
  const st=acc*dt;if(dd<=st){FVx=tx;FVy=ty}else{FVx+=dvx/dd*st;FVy+=dvy/dd*st}
  P.x+=FVx*dt;P.y+=FVy*dt;wrapP();FS=Math.hypot(FVx,FVy);P.mov=FS>12||l>.1;
  ALT+=((up?60:0)-(dn?95:0))*dt;ALT=Math.max(3,Math.min(115,ALT));if(ov&&!dn&&ALT<8)ALT=8;
  const dz=ALT-P.z;FZV+=(Math.max(-140,Math.min(95,dz*3.2))-FZV)*Math.min(1,dt*5);P.z+=FZV*dt;if(P.z<1.5&&!ov){P.z=1.5;FZV=Math.max(0,FZV)}
  if(!ov&&P.z<6&&FS>90&&Math.random()<dt*40)dust.push({x:P.x-FVx*.04,y:P.y-FVy*.04,z:0,vz:5+Math.random()*6,l:.4});
  if(ov&&P.z<10&&FS>70&&(trailT-=dt)<=0){trailT=.07;rings.push({x:P.x,y:P.y,t:.2,n:1});for(let i=0;i<3;i++)fxs.push({x:P.x-FVx*.03,y:P.y-FVy*.03,z:2,vx:(Math.random()-.5)*30,vy:(Math.random()-.5)*30,vz:25+Math.random()*30,l:.6,c:'#e8f6ff'})}
  if(ov&&P.z<=5&&(dn||FZV<-55)){plungeIn(FS+Math.max(0,-FZV)*1.5+30);return}
  if(!ov&&dn&&P.z<=3&&FS<140){P.fly=0;FVx=FVy=0;return}
  FTire=Math.max(0,Math.min(1,FTire+((boost?.06:FS>130?.012:0)-(FS<50?.07:.014))*dt));
  if(FTire>.8&&!tirePop){tirePop=1;pop('Charchayapman...',1)}if(FTire<.5)tirePop=0;
  if(FS>305&&!sonic){sonic=1;rings.push({x:P.x,y:P.y,t:.25,n:2});rings.push({x:P.x,y:P.y,t:.45,n:2});shake=Math.max(shake,.5);flashT=Math.max(flashT,.08);sndSonic();
    AN.forEach(a=>{if(a.pet||a.jzp||a.jz||a.dead||a.sp==8||a.sp==9)return;if(Math.hypot(a.x-P.x,a.y-P.y)<140){a.down=1.6+Math.random()*1.6;a.lie=Math.random()<.5?1.5708:-1.5708;a.rot=a.lie;a.st='idle'}})}
  if(FS<250)sonic=0;
  const sx=FVx-FVy,sy=(FVx+FVy)/2-FZV*.6,sp=Math.hypot(sx,sy);if(Math.abs(sx)>6)FD=sx>0?1:-1;
  const tg=sp>18?Math.max(-1.35,Math.min(1.35,Math.atan2(sy,Math.max(Math.abs(sx),4)))):0;FAng+=(tg-FAng)*Math.min(1,dt*8);
  LAx=Math.max(-70,Math.min(70,sx*.2));LAy=Math.max(-45,Math.min(45,sy*.2));
  if(FS>150&&Math.random()<dt*60)fxs.push({x:P.x-FVx*.03,y:P.y-FVy*.03,z:P.z+10+Math.random()*8,vx:0,vy:0,vz:0,l:.35,c:'#fff'});
  if(boost)shake=Math.max(shake,.05);
  flyImpact(dt)}
function sndSonic(){if(!AC)return;const t=AC.currentTime;noise(.7,200,.9);tone(45,t,.8,'sine',sfxG,.9);noise(.25,3000,.4);duck(.12)}
function flyFx(dt){if(!P.fly||UW.on)return;const sx=FVx-FVy,sy=(FVx+FVy)/2,sp=Math.hypot(sx,sy);if(sp<190)return;const n=Math.min(18,(sp-190)/16|0),dx=sx/sp,dy=sy/sp,L=Math.min(50,10+sp/9);
  ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<n;i++){const x=Math.random()*W,y=Math.random()*H;ctx.moveTo(x,y);ctx.lineTo(x+dx*L,y+dy*L)}ctx.stroke();
  if(sp>420){const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.22)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}}
// ---------- hayvonlar, daraxt, toshlarga zarba ----------
const ACK=['rab','deer','sq','bird','cam','pen','fox','goat','frog','duck','crow','zeb','gir','shp','pnd','pol','wlf','lzd','flz','cdr','bor'];
function hitAnimal(a,p,ux,uy){if(a.dead||a.rm)return;const T=SPT[a.sp];if(a.hpv===undefined)a.hpv=T.r>=7?7:T.r>=5?4:2;a.hpv-=p/60;const col=AP[ACK[a.sp]]||AP.rab;
  alarm(a);
  if(p>=300||a.hpv<=-3){for(let i=0;i<14;i++)fxs.push({x:a.x,y:a.y,z:6+Math.random()*8,vx:ux*p*.35+(Math.random()-.5)*70,vy:uy*p*.35+(Math.random()-.5)*70,vz:30+Math.random()*90,l:2.5+Math.random()*2,c:i<3?'#a82020':col[i%3]});
    pops.push({x:a.x,y:a.y,z:22,t:.8,s:'PAF!'});shake=Math.max(shake,.25);sndHit(2,(a.x-a.y-cam.x-W/2)/(W/2));a.rm=1;return}
  a.fling={vx:ux*p*(a.hpv<=0?.9:.55),vy:uy*p*(a.hpv<=0?.9:.55),vz:45+p*.25,vr:(Math.random()<.5?-1:1)*(6+p/30)};a.lie=Math.random()<.5?1.5708:-1.5708;a.rot=0;a.z=1;a.st='idle';a.tree=null;
  sndHit(a.hpv<=0?2:1,(a.x-a.y-cam.x-W/2)/(W/2));
  if(a.hpv<=0){a.dead=22;a.down=0;pops.push({x:a.x,y:a.y,z:22,t:.8,s:'✖'})}else{a.down=2.5+Math.random()*2+p/80;if(p>=130)a.hurt=100}}
function animFx(a,dt){
  if(a.fling){const f=a.fling;a.x+=f.vx*dt;a.y+=f.vy*dt;a.z+=f.vz*dt;f.vz-=340*dt;a.rot+=f.vr*dt;const k=Math.max(0,1-1.2*dt);f.vx*=k;f.vy*=k;
    if(a.z<=0){a.z=0;if(f.vz<-60){f.vz*=-.32;f.vr*=.5;f.vx*=.5;f.vy*=.5;for(let i=0;i<3;i++)dust.push({x:a.x,y:a.y,z:0,vz:6,l:.4})}else{a.fling=null;a.rot=a.lie;if(isW(a.x>>4,a.y>>4)){for(let i=0;i<8;i++)fxs.push({x:a.x,y:a.y,z:2,vx:(Math.random()-.5)*30,vy:(Math.random()-.5)*30,vz:30+Math.random()*30,l:.6,c:'#e8f6ff'});a.rm=1}}}return}
  if(a.dead>0){a.dead-=dt;a.rot=a.lie;if(a.dead<=0)a.rm=1;return}
  if(a.down>0){a.down-=dt;a.rot=a.lie;if(a.down<=0){a.rot=0;a.st='idle';a.t=1;a.z=0}}}
function animCleanup(){for(let i=AN.length-1;i>=0;i--)if(AN[i].rm)AN.splice(i,1)}
function crushRock(r){const i=rocks.indexOf(r);if(i<0)return;rocks.splice(i,1);for(let k=solids.length-1;k>=0;k--){const s=solids[k];if(s.x===r[0]&&s.y===r[1]&&s.w===r[2]&&s.h===r[3]){solids.splice(k,1);break}}
  const cx=r[0]+r[2]/2,cy=r[1]+r[3]/2;for(let q=0;q<18;q++){const a=Math.random()*6.28,s=20+Math.random()*60;fxs.push({x:cx,y:cy,z:6+Math.random()*10,vx:Math.cos(a)*s,vy:Math.sin(a)*s,vz:30+Math.random()*80,l:1.5+Math.random(),c:q%3?'#9b9ca6':'#62636e'})}
  for(let q=0;q<10;q++)dust.push({x:cx+Math.random()*10-5,y:cy+Math.random()*10-5,z:0,vz:8+Math.random()*8,l:.6});sndThud();shake=Math.max(shake,.3)}
function flyImpact(dt){if(FS<110||P.z>30)return;const ux=FVx/FS,uy=FVy/FS;
  for(let i=0;i<AN.length;i++){const a=AN[i];if(a.pet||a.jzp||a.jz||a.dead||a.rm||a.fling||a.down>0||a.sp==9||a.sp==8)continue;const dx=a.x-P.x,dy=a.y-P.y;if(dx>18||dx<-18||dy>18||dy<-18)continue;if((a.z||0)>P.z+16)continue;hitAnimal(a,FS,ux,uy);FVx*=.96;FVy*=.96}
  for(let i=0;i<trees.length;i++){const t=trees[i],S=t[4];if(S.st!=0||t[2]==3)continue;const dx=t[0]-P.x,dy=t[1]-P.y;if(dx>10||dx<-10||dy>10||dy<-10)continue;
    if(FS>200){treeHit(t,2,ux,uy);if(S.st==0)treeHit(t,2,ux,uy);if(S.st==0)treeHit(t,2,ux,uy);FVx*=.93;FVy*=.93;shake=Math.max(shake,.25)}else{leafBurst(t,6);S.v+=((ux-uy)>0?1:-1)*6}}
  EN.forEach(e=>{if(e.dead>0||(e.fid||0)>time)return;if(Math.abs(e.x-P.x)<16&&Math.abs(e.y-P.y)<16&&Math.abs((e.z||0)-P.z)<30){e.fid=time+.6;eHit(e,FS>300?32:16,ux,uy)}});
  if(FS>170)for(let i=0;i<rocks.length;i++){const r=rocks[i];if(P.x>r[0]-6&&P.x<r[0]+r[2]+6&&P.y>r[1]-6&&P.y<r[1]+r[3]+6&&P.z<r[4]+6){crushRock(r);FVx*=.85;FVy*=.85;break}}}
// ---------- suvga sho‘ng‘ish va chiqish ----------
function splashFx(x,y,v){const n=Math.min(44,10+(v/10|0));for(let i=0;i<n;i++){const a=Math.random()*6.283,s=15+Math.random()*45+v*.12;fxs.push({x,y,z:2,vx:Math.cos(a)*s*.5,vy:Math.sin(a)*s*.5,vz:50+Math.random()*(60+v*.3),l:.9+Math.random()*.6,c:i%3?'#e8f6ff':'#9fd8f2'})}
  rings.push({x,y,t:.25,n:2});rings.push({x,y,t:.4,n:2});rings.push({x,y,t:.55,n:1})}
function enterUW(v){UW.on=1;UW.z=v>0?57:54;UW.vz=0;UW.pv=v>0?Math.min(95,30+v*.28):0;UW.enter=v>0?1.2:0;UW.air=100;UW.cr.length=0;UW.bub.length=0;UW.slow=0;UW.ex=0;P.sw=0;
  for(let i=0;i<(v>0?30:10);i++)UW.bub.push({x:P.x+Math.random()*10-5,y:P.y+Math.random()*10-5,z:46+Math.random()*12,vz:12+Math.random()*16,l:3});
  for(let i=0;i<34;i++)uwSpawn(true);if(AC&&mfil)mfil.frequency.setTargetAtTime(520,AC.currentTime,.4);pop('Sho‘ng‘idingiz',1.2)}
function plungeIn(v){P.fly=0;P.z=0;FVx=FVy=FS=0;splashFx(P.x,P.y,v);sndSplash(2);if(AC)noise(.5,500,.5);shake=Math.max(shake,Math.min(.6,v/500));flashT=Math.max(flashT,.12);enterUW(v)}
function breachOut(){const a=P.sec*Math.PI/4,fx=Math.cos(a),fy=Math.sin(a),wx=.5*(fy+fx),wy=.5*(fy-fx),l=Math.hypot(wx,wy)||1;uwExit(1);P.sw=0;P.fly=1;P.z=2;ALT=70;FZV=150;FVx=wx/l*90;FVy=wy/l*90;P.pw=Math.max(P.pw,30);
  splashFx(P.x,P.y,320);sndSplash(2);shake=Math.max(shake,.35);pop('Suvdan otildingiz!',1.2)}
const WVC=document.createElement('canvas');
function waveFx(u){const w=cv.width,h=cv.height;if(WVC.width!==w||WVC.height!==h){WVC.width=w;WVC.height=h}const g=WVC.getContext('2d');g.clearRect(0,0,w,h);g.drawImage(cv,0,0);const amp=Math.min(1,u)*4;ctx.fillStyle='#061625';ctx.fillRect(0,0,w,h);
  for(let y=0;y<h;y+=2){const o=Math.round(Math.sin(y*.22+time*16)*amp);ctx.drawImage(WVC,0,y,w,2,o,y,w,2)}}
