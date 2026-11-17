// ===================== QUYOSH TIZIMI: gravitatsiya, o'q qiyaligi, fasllar, iqlim =====================
const SOL={ST:0,DAY:150,YEAR:1800,eps:23.5*Math.PI/180,SR:10,A:160,rx:0,ry:0,vx:0,vy:0,GM:0,dec:0,ls:0,th0:0,e:0,r:160,lastC:-99,s:[0,0,0],a:[0,0,1],m:[1,0,0],ev:[0,1,0]};
const SP={cx:0,cy:0,Z:2,el:.62,foc:1,ts:1,tz:null,glide:0,pt:0,init:0,sun:[0,0,0],ear:[0,0,0]};
const GB={};
function gbuf(N){let b=GB[N];if(!b){const c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');b=GB[N]={c,x,id:x.createImageData(N,N)}}return b}
// --- fizika: Nyuton gravitatsiyasi (leapfrog) ---
function solOri(){const S=SOL,se=Math.sin(S.eps),ce=Math.cos(S.eps),th=S.ST/S.DAY*6.2831853+S.th0,ct=Math.cos(th),st=Math.sin(th),r=Math.hypot(S.rx,S.ry);
  S.r=r;S.s=[-S.rx/r,-S.ry/r,0];S.a=[se,0,ce];S.m=[ce*ct,st,-se*ct];S.ev=[-ce*st,ct,se*st];
  const sa=S.s[0]*S.a[0]+S.s[2]*S.a[2];S.dec=Math.asin(Math.max(-1,Math.min(1,sa)));
  S.ls=Math.atan2(S.s[0]*S.ev[0]+S.s[1]*S.ev[1]+S.s[2]*S.ev[2],S.s[0]*S.m[0]+S.s[1]*S.m[1]+S.s[2]*S.m[2])}
function solInteg(dt){const S=SOL,n=Math.max(1,Math.ceil(dt/(S.YEAR/3000))),h=dt/n;
  for(let i=0;i<n;i++){let r2=S.rx*S.rx+S.ry*S.ry,r3=r2*Math.sqrt(r2);S.vx-=S.GM*S.rx/r3*h/2;S.vy-=S.GM*S.ry/r3*h/2;S.rx+=S.vx*h;S.ry+=S.vy*h;
    r2=S.rx*S.rx+S.ry*S.ry;r3=r2*Math.sqrt(r2);S.vx-=S.GM*S.rx/r3*h/2;S.vy-=S.GM*S.ry/r3*h/2}}
function solarStep(dt){const S=SOL;S.ST+=dt;solInteg(dt);
  solOri();if(S.ST-S.lastC>1.2||S.ST<S.lastC){S.lastC=S.ST;climUpdate()}}
// --- iqlim: kunlik o'rtacha insolyatsiya -> harorat ---
function Tlat(phi,del,k){const tp=Math.tan(phi)*Math.tan(del),h0=tp>=1?Math.PI:tp<=-1?0:Math.acos(-tp);
  let Q=(h0*Math.sin(phi)*Math.sin(del)+Math.cos(phi)*Math.cos(del)*Math.sin(h0))*k;Q=Math.max(0,Math.min(1.1,Q));
  const s=Math.sin(phi),Qa=.5+.43*(1-s*s),Qe=.42*Q+.58*Qa;return -40+72*Math.pow(Qe,.85)-10*s*s}
const MON=['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'];
function solDate(){const S=SOL,ang=Math.atan2(S.ry,S.rx)*180/Math.PI,dd=((ang-90)%360+360)%360/360*365,D=new Date(2026,2,20+Math.floor(dd));return D.getDate()+'-'+MON[D.getMonth()]}
function solSeason(){const S=SOL;return S.dec>0?(S.ry>0?'Bahor':'Yoz'):(S.ry>0?'Qish':'Kuz')}
function climUpdate(){const S=SOL,k=Math.pow(S.A/S.r,2);
  for(let y=0;y<TYR;y++){const phi=(.5-(y+.5)/TYR)*2*LATR,T=Tlat(phi,S.dec,k);TRW[y]=T;
    if(T<-4)FZ[y]=1;else if(T>-1.5)FZ[y]=0;
    SNA[y]=T<2?Math.min(.88,(2-T)/11):0;HTA[y]=T>26?Math.min(.5,(T-26)/7):0}
  const el=document.getElementById('tp');if(el){const ty=Math.max(0,Math.min(TYR-1,(P.y/16)|0)),T=TRW[ty]-dayN*5;
    el.textContent=(T<-4?'🥶':T>30?'🥵':'🌡')+Math.round(T)+'° · '+solDate()}}
function solV(){const S=SOL,phi=Math.max(-LATR,Math.min(LATR,(.5-P.y/WH)*2*LATR)),lam=P.x/WW*6.2831853;
  return S.e=Math.sin(phi)*Math.sin(S.dec)+Math.cos(phi)*Math.cos(S.dec)*Math.cos(lam-S.ls)}
(function(){const S=SOL,e0=.0167,rp=S.A*(1-e0),a0=12.8*Math.PI/180;S.GM=4*Math.PI*Math.PI*S.A*S.A*S.A/(S.YEAR*S.YEAR);
  S.rx=rp*Math.cos(a0);S.ry=rp*Math.sin(a0);const vp=Math.sqrt(S.GM*(2/rp-1/S.A));S.vx=-Math.sin(a0)*vp;S.vy=Math.cos(a0)*vp;
  for(let g=0;g<40000;g++){if((Math.atan2(S.ry,S.rx)+6.2832)%6.2832>2.111)break;solInteg(.25)}
  S.th0=0;solOri();
  S.th0=S.ls-(P.x/WW*6.2831853)-.4;solOri();
  const d=document.getElementById('dn');if(d)d.insertAdjacentHTML('afterend',' · <span id="tp"></span>');climUpdate()})();
// --- umumiy globus renderi: ixtiyoriy yo'nalish va yorug'lik (haqiqiy Quyosh) ---
function renderGlobe2(N,t,A,M,E,L,lon0){const b=gbuf(N),d=b.id.data,hx=L[0],hy=L[1],hz=L[2]+1,hl=Math.hypot(hx,hy,hz)||1;
  for(let py=0;py<N;py++){const ny=1-(py+.5)/N*2;for(let px=0;px<N;px++){
    const nx=(px+.5)/N*2-1,r2=nx*nx+ny*ny,k=(py*N+px)*4;
    if(r2>=1){d[k+3]=0;continue}
    const nv=Math.sqrt(1-r2),za=nx*A[0]+ny*A[1]+nv*A[2],xm=nx*M[0]+ny*M[1]+nv*M[2],xe=nx*E[0]+ny*E[1]+nv*E[2],
      lat=Math.asin(za>1?1:za<-1?-1:za),lon=Math.atan2(xe,xm)+lon0;
    let R,G,B,wat=0,fz=0;
    if(lat>LATR||lat<-LATR){R=236;G=243;B=250}
    else{const q=(.5-lat/(2*LATR)),u=(((lon/6.2832)%1+1)%1*TW)|0,v=Math.min(TH-1,(q*TH)|0),i=(v*TW+u)*4,wr=Math.min(TYR-1,(q*TYR)|0);
      R=TD[i];G=TD[i+1];B=TD[i+2];wat=B>R+40&&B>G-8?1:0;
      if(wat){if(FZ[wr]){R=R*.15+214*.85;G=G*.15+232*.85;B=B*.15+244*.85;fz=1;wat=0}}
      else{const a=SNA[wr];if(a>0){R=R*(1-a)+240*a;G=G*(1-a)+246*a;B=B*(1-a)+252*a}}}
    const dl=nx*L[0]+ny*L[1]+nv*L[2],k2=Math.max(0,Math.min(1,(dl+.1)/.45)),sh=(.13+.95*k2)*(.75+.25*nv);
    let sp=0;if(wat){const nd=(nx*hx+ny*hy+nv*hz)/hl;if(nd>0)sp=Math.pow(nd,60)*70*k2}
    const cd=Math.sin(lon*4+Math.sin(lat*5+t*.03)*1.6+t*.02)*Math.sin(lat*7-lon*2.3)*Math.sin(lon*9+lat*4+t*.05),ca=Math.min(.5,Math.max(0,cd-.2)*1.5);
    R=(R*(1-ca)+255*ca)*sh+sp;G=(G*(1-ca)+255*ca)*sh+sp;B=(B*(1-ca)+255*ca)*sh+(1-nv)*30*(.3+k2*.7)+sp+(1-k2)*16;
    d[k]=R>255?255:R;d[k+1]=G>255?255:G;d[k+2]=B>255?255:B;d[k+3]=255}}
  b.x.putImageData(b.id,0,0);return b}
let gbV=gb;
function renderGlobe(t){const cl=Math.cos(gLat),sl=Math.sin(gLat),A=[0,cl,sl],M=[0,-sl,cl],E=[1,0,0],S=SOL,cd=Math.cos(S.dec),sd=Math.sin(S.dec),dl=S.ls-gLon,c1=cd*Math.cos(dl),c2=cd*Math.sin(dl);
  gbV=renderGlobe2(GS,t,A,M,E,[c1*M[0]+c2*E[0]+sd*A[0],c1*M[1]+c2*E[1]+sd*A[1],c1*M[2]+c2*E[2]+sd*A[2]],gLon).c}
// --- Quyosh sirti (plazma) ---
function sunBuf(N,t){const b=gbuf(N),d=b.id.data;
  for(let py=0;py<N;py++){const ny=1-(py+.5)/N*2;for(let px=0;px<N;px++){
    const nx=(px+.5)/N*2-1,r2=nx*nx+ny*ny,k=(py*N+px)*4;if(r2>=1){d[k+3]=0;continue}
    const mu=Math.sqrt(1-r2),f=.55+.45*mu,u0=nx/f,v0=ny/f,
      u=u0+.32*Math.sin(v0*3.3+t*.2)+.18*Math.sin(v0*8.1-t*.31),v=v0+.32*Math.sin(u0*3.7-t*.17)+.18*Math.sin(u0*7.3+t*.27),
      n1=Math.sin(u*6.5+Math.sin(v*4.1+t*.4)*2)*Math.sin(v*6.9-u*2.3+t*.3),n2=Math.sin(u*17+Math.sin(v*9+t*.8)*1.5)*Math.sin(v*15-u*11-t*.7),n3=Math.sin((u+v)*33+t*1.4)*Math.sin((u-v)*29-t),
      n=.5+.26*n1+.15*n2+.07*n3,sp=Math.sin(u*3.1+1)*Math.sin(v*2.7-t*.02+2)*Math.sin((u+v)*4.4),dk=sp>.78?1-Math.min(1,(sp-.78)*4)*.65:1,limb=.5+.5*mu;
    d[k]=255*limb*dk;d[k+1]=(140+n*110)*limb*dk;d[k+2]=(25+n*120)*limb*limb*dk;d[k+3]=255}}
  b.x.putImageData(b.id,0,0);return b.c}
// --- Quyosh tizimi ko'rinishi ---
function setMode(m){gMode=m;gZoom=1;gPan=[0,0];if(m==0)gAnim=1;if(m==2){buildTex();SP.foc=SP.init?SP.foc:1}
  document.getElementById('sp').style.display=m==2?'flex':'none'}
function focusTo(k,zoom){const mn=Math.min(gc.width,gc.height);SP.foc=k;SP.glide=.9;if(zoom!==false)SP.tz=k==1?mn*.22:mn*.03}
function drawSpace(w,h){
  const S=SOL,dt=Math.min(.05,Math.max(0,time-SP.pt)),sE=Math.sin(SP.el),cE=Math.cos(SP.el),mn=Math.min(w,h);SP.pt=time;
  if(!SP.init){SP.init=1;SP.Z=mn*.22;SP.foc=1}
  const tg=SP.foc==1?[S.rx,S.ry]:SP.foc==2?[0,0]:null;
  if(tg){if(SP.glide>0){SP.glide-=dt;const k=1-Math.exp(-7*dt);SP.cx+=(tg[0]-SP.cx)*k;SP.cy+=(tg[1]-SP.cy)*k}else{SP.cx=tg[0];SP.cy=tg[1]}}
  if(SP.tz){SP.Z*=Math.pow(SP.tz/SP.Z,1-Math.exp(-5*dt));if(Math.abs(Math.log(SP.tz/SP.Z))<.012){SP.Z=SP.tz;SP.tz=null}}
  const Z=SP.Z,P3=(x,y,z)=>[w/2+(x-SP.cx)*Z,h/2-((y-SP.cy)*sE+z*cE)*Z];
  gg.fillStyle='#01030a';gg.fillRect(0,0,w,h);
  STARS.forEach(s=>{gg.fillStyle='rgba(255,255,255,'+(.25+.55*s[2]*(.7+.3*Math.sin(time*2+s[0]*50)))+')';gg.fillRect(s[0]*w|0,s[1]*h|0,s[2]>.8?2:1,s[2]>.8?2:1)});
  const c0=P3(0,0,0),SRp=S.SR*Z;SP.sun=[c0[0],c0[1],SRp];
  // tekislik halqalari va orbita
  gg.lineWidth=1;gg.strokeStyle='rgba(120,160,255,.09)';
  for(let R=40;R<=240;R+=40){const rr=R*Z;if(rr>40000)break;gg.beginPath();gg.ellipse(c0[0],c0[1],rr,rr*sE,0,0,6.3);gg.stroke()}
  {const v2=S.vx*S.vx+S.vy*S.vy,r=S.r,en=v2/2-S.GM/r,aa=-S.GM/(2*en),rv=S.rx*S.vx+S.ry*S.vy,ex=((v2-S.GM/r)*S.rx-rv*S.vx)/S.GM,ey=((v2-S.GM/r)*S.ry-rv*S.vy)/S.GM,ee=Math.hypot(ex,ey),om=Math.atan2(ey,ex),pp=aa*(1-ee*ee);
    gg.strokeStyle='rgba(255,215,120,.6)';gg.lineWidth=1.5;gg.beginPath();
    for(let i=0;i<=160;i++){const nu=i/160*6.2832,rr=pp/(1+ee*Math.cos(nu-om)),q=P3(rr*Math.cos(nu),rr*Math.sin(nu),0);i?gg.lineTo(q[0],q[1]):gg.moveTo(q[0],q[1])}gg.stroke()}
  // Quyosh
  if(c0[0]>-SRp*4.6&&c0[0]<w+SRp*4.6&&c0[1]>-SRp*4.6&&c0[1]<h+SRp*4.6){
    gg.globalCompositeOperation='lighter';
    const R=Math.max(SRp,6),g=gg.createRadialGradient(c0[0],c0[1],R*.6,c0[0],c0[1],R*4.6);g.addColorStop(0,'rgba(255,190,70,.55)');g.addColorStop(.25,'rgba(255,130,30,.18)');g.addColorStop(1,'rgba(255,100,20,0)');gg.fillStyle=g;gg.beginPath();gg.arc(c0[0],c0[1],R*4.6,0,6.3);gg.fill();
    if(SRp>8){gg.fillStyle='rgba(255,170,50,.11)';for(let i=0;i<30;i++){const a=i/30*6.2832+time*.03+Math.sin(i*3.7)*.2,L=SRp*(1.25+.7*(.5+.5*Math.sin(time*1.7+i*2.3))*(.4+.6*((i*7919)%10)/10));
      gg.beginPath();gg.moveTo(c0[0]+Math.cos(a-.05)*SRp*.95,c0[1]+Math.sin(a-.05)*SRp*.95);gg.lineTo(c0[0]+Math.cos(a)*L,c0[1]+Math.sin(a)*L);gg.lineTo(c0[0]+Math.cos(a+.05)*SRp*.95,c0[1]+Math.sin(a+.05)*SRp*.95);gg.fill()}}
    gg.globalCompositeOperation='source-over';
    if(SRp>5){const N=Math.max(32,Math.min(150,Math.round(SRp*1.4)));if(SP.sb===undefined||SP.sbN!=N||((time*30)|0)%2==0){SP.sbC=sunBuf(N,time);SP.sbN=N;SP.sb=1}
      gg.imageSmoothingEnabled=true;gg.drawImage(SP.sbC,c0[0]-SRp,c0[1]-SRp,SRp*2,SRp*2)}
    else{gg.fillStyle='#fff1b0';gg.beginPath();gg.arc(c0[0],c0[1],Math.max(2.5,SRp),0,6.3);gg.fill()}
    if(SRp>26){gg.globalCompositeOperation='lighter';gg.lineCap='round';for(let k=0;k<7;k++){const a0=k*.93+time*.02*(k%2?1:-1)+Math.sin(time*.3+k)*.15,a1=a0+.16+.06*Math.sin(time*.9+k*2),hh=SRp*(.1+.1*Math.sin(time*.8+k*2.4)),m=SRp+hh*2.2;
      gg.strokeStyle='rgba(255,110,35,.55)';gg.lineWidth=Math.max(1.5,SRp*.018);gg.beginPath();gg.moveTo(c0[0]+Math.cos(a0)*SRp,c0[1]+Math.sin(a0)*SRp);
      gg.bezierCurveTo(c0[0]+Math.cos(a0)*m,c0[1]+Math.sin(a0)*m,c0[0]+Math.cos(a1)*m,c0[1]+Math.sin(a1)*m,c0[0]+Math.cos(a1)*SRp,c0[1]+Math.sin(a1)*SRp);gg.stroke()}gg.globalCompositeOperation='source-over'}
    if(SRp<90){gg.font='bold 12px monospace';gg.fillStyle='#ffe9a0';gg.textAlign='left';gg.fillText('☀ Quyosh',c0[0]+SRp+8,c0[1]-SRp*.2)}}
  // Yer
  const ec=P3(S.rx,S.ry,0),Re=Z;SP.ear=[ec[0],ec[1],Re];
  if(ec[0]>-Re*2&&ec[0]<w+Re*2&&ec[1]>-Re*2&&ec[1]<h+Re*2){
    if(Re<3){gg.fillStyle='rgba(120,190,255,.25)';gg.beginPath();gg.arc(ec[0],ec[1],7,0,6.3);gg.fill();gg.fillStyle='#7fc4ff';gg.beginPath();gg.arc(ec[0],ec[1],2.6,0,6.3);gg.fill()}
    else{const tv=v=>[v[0],v[1]*sE+v[2]*cE,-v[1]*cE+v[2]*sE],A=tv(S.a),M=tv(S.m),E2=tv(S.ev),L=tv(S.s),N=Math.max(24,Math.min(300,Math.round(Re*2))),b=renderGlobe2(N,time,A,M,E2,L,0);
      const gl=gg.createRadialGradient(ec[0],ec[1],Re*.96,ec[0],ec[1],Re*1.18);gl.addColorStop(0,'rgba(120,180,255,.5)');gl.addColorStop(1,'rgba(120,180,255,0)');gg.fillStyle=gl;gg.beginPath();gg.arc(ec[0],ec[1],Re*1.18,0,6.3);gg.fill();
      gg.imageSmoothingEnabled=false;gg.drawImage(b.c,ec[0]-Re,ec[1]-Re,Re*2,Re*2);
      // o'q
      const ax=A[0],ay=-A[1],ln=Re*1.7;gg.strokeStyle='rgba(255,255,255,.55)';gg.lineWidth=1.2;gg.setLineDash([5,4]);gg.beginPath();gg.moveTo(ec[0]-ax*ln,ec[1]-ay*ln);gg.lineTo(ec[0]+ax*ln,ec[1]+ay*ln);gg.stroke();gg.setLineDash([]);
      gg.font='bold 11px monospace';gg.fillStyle='#fff';gg.textAlign='center';gg.fillText('Sh',ec[0]+ax*(ln+9),ec[1]+ay*(ln+9)+4);gg.fillText('J',ec[0]-ax*(ln+9),ec[1]-ay*(ln+9)+4);
      // siz turgan joy
      const phi=Math.max(-LATR,Math.min(LATR,(.5-P.y/WH)*2*LATR)),lam=P.x/WW*6.2831853,cp=Math.cos(phi),vx=cp*Math.cos(lam)*M[0]+cp*Math.sin(lam)*E2[0]+Math.sin(phi)*A[0],vy=cp*Math.cos(lam)*M[1]+cp*Math.sin(lam)*E2[1]+Math.sin(phi)*A[1],vz=cp*Math.cos(lam)*M[2]+cp*Math.sin(lam)*E2[2]+Math.sin(phi)*A[2];
      if(vz>.05){const X=ec[0]+vx*Re,Y=ec[1]-vy*Re;gg.fillStyle='#000';gg.fillRect(X-3,Y-3,6,6);gg.fillStyle='#ff4a4a';gg.fillRect(X-2,Y-2,4,4);const r=6+(Math.sin(time*5)+1)*4;gg.strokeStyle='#ff4a4a';gg.lineWidth=1.5;gg.strokeRect(X-r,Y-r,r*2,r*2)}}
    if(Re<70){gg.font='bold 12px monospace';gg.fillStyle='#bfe3ff';gg.textAlign='left';gg.fillText('🌍 Yer',ec[0]+Math.max(Re,4)+9,ec[1]-Math.max(Re,4)*.3)}}
  // ma'lumot
  const v=Math.hypot(S.vx,S.vy),vc=Math.sqrt(S.GM/S.A),dKm=S.r/S.A*149.6,vKm=29.78*v/vc;
  gg.textAlign='left';gg.font='bold 13px monospace';gg.fillStyle='#fff';gg.fillText('QUYOSH TIZIMI · simulyatsiya',14,24);
  gg.font='12px monospace';gg.fillStyle='#ffd98a';gg.fillText('Sana: '+solDate()+' · fasl (shimol): '+solSeason()+' · deklinatsiya: '+(S.dec*57.2958>=0?'+':'')+(S.dec*57.2958).toFixed(1)+'°',14,43);
  gg.fillStyle='#bcd';gg.fillText('Yer–Quyosh: '+dKm.toFixed(1)+' mln km · tezlik: '+vKm.toFixed(1)+' km/s (gravitatsiya) · o‘q qiyaligi 23.5° (orbita tekisligi bilan 66.5°)',14,60);
  gg.fillText('Quyosh diametri Yernikidan 10× katta (shartli) · 1 kun = '+S.DAY+' s, 1 yil = '+(S.YEAR/60)+' daqiqa · tezlik ×'+SP.ts,14,77);
  gg.fillStyle='#8fa';gg.fillText('Ekranni siljiting · iki barmoq bilan kattalashtiring · Quyosh/Yerni bosing',14,h-70)}
// pointer: siljitish, bosish, magnit
const gSt=new Map();
function zb(f){if(gMode==2){SP.tz=null;SP.Z=Math.max(.5,Math.min(400,SP.Z*f))}else gZoom=Math.max(.5,Math.min(4,gZoom*f))}
gc.addEventListener('pointerdown',e=>{gSt.set(e.pointerId,{x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,m:0})});
gc.addEventListener('pointermove',e=>{const s=gSt.get(e.pointerId);if(!s)return;const dx=e.clientX-s.lx,dy=e.clientY-s.ly;s.lx=e.clientX;s.ly=e.clientY;s.m=Math.max(s.m,Math.hypot(e.clientX-s.x,e.clientY-s.y));
  if(gMode==2&&gPt.size==1&&s.m>5){SP.foc=0;SP.tz=null;SP.cx-=dx/SP.Z;SP.cy+=dy/(Math.sin(SP.el)*SP.Z)}});
gc.addEventListener('pointerup',e=>{const s=gSt.get(e.pointerId);gSt.delete(e.pointerId);if(!s||gMode!=2)return;
  const mn=Math.min(gc.width,gc.height),hit=o=>Math.hypot(e.clientX-o[0],e.clientY-o[1])<Math.max(o[2],18)+6;
  if(s.m<6){if(hit(SP.sun))focusTo(2);else if(hit(SP.ear))focusTo(1)}
  else{const cx=gc.width/2,cy=gc.height/2;if(Math.hypot(SP.sun[0]-cx,SP.sun[1]-cy)<mn*.1)focusTo(2,false);else if(Math.hypot(SP.ear[0]-cx,SP.ear[1]-cy)<mn*.1)focusTo(1,false)}});
document.getElementById('gsun').onpointerdown=e=>{e.stopPropagation();e.preventDefault();setMode(gMode==2?0:2)};
document.getElementById('spS').onpointerdown=e=>{e.stopPropagation();e.preventDefault();focusTo(2)};
document.getElementById('spE').onpointerdown=e=>{e.stopPropagation();e.preventDefault();focusTo(1)};
document.querySelectorAll('#sp [data-ts]').forEach(b=>{b.onpointerdown=e=>{e.stopPropagation();e.preventDefault();SP.ts=+b.dataset.ts;document.querySelectorAll('#sp [data-ts]').forEach(x=>x.classList.toggle('on',x===b))}});
document.querySelector('#sp [data-ts="1"]').classList.add('on');
