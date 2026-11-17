// ===================== QUYOSH TIZIMI v2: haqiqiy nisbatlar, Oy va sayyoralar =====================
// Birlik: Yer radiusi = 1. Yer maydoni o'yinda 510 600 km² (haqiqiy 510,1 mln km² ning ~1/1000), ya'ni chiziqli masshtab ≈ 1 : 31,6.
// Barcha masofa va o'lchamlar Yer radiusiga nisbatan HAQIQIY nisbatda: Oy = 60,27 R⊕, Quyosh = 23 455 R⊕ (1 a.b.), Quyosh radiusi = 109,2 R⊕.
(function(){
const DEG=Math.PI/180,TAU=6.283185307,AU=23455,REK=6371.0,KS=Math.sqrt(510600/(4*Math.PI))/REK;   // KS: o'yin km / haqiqiy km
const S=SOL,fmt=(v,d)=>{const a=Math.abs(v);if(a>=1e6)return (v/1e6).toFixed(a>=1e7?1:2)+' mln';if(a>=1e4)return Math.round(v).toLocaleString('en').replace(/,/g,' ');return v.toFixed(d===undefined?(a<10?2:a<100?1:0):d)};
// --- sayyoralar: haqiqiy orbital elementlar (J2000) va fizik xossalari ---
// a(a.b.), e, i, Om (tugun), w (perigeliy uzunligi), L0 (o'rtacha uzunlik), per(yil), R(R⊕), m(M⊕), rot(soat, manfiy=teskari), tilt, g(m/s²), T(°C), ve(km/s qochish)
const PL=[
 {id:'mercury',n:'Merkuriy',a:.38710,e:.20563,i:7.005,Om:48.331,w:77.456,L0:252.251,per:.24085,R:.3829,m:.0553,rot:1407.6,tilt:.03,g:3.70,T:167,ve:4.25,col:'#b8a89a',oc:'rgba(190,170,150,.35)'},
 {id:'venus',n:'Venera',a:.72333,e:.00677,i:3.395,Om:76.680,w:131.564,L0:181.980,per:.61520,R:.9499,m:.815,rot:-5832.5,tilt:177.4,g:8.87,T:464,ve:10.36,col:'#ecd29a',oc:'rgba(236,210,150,.35)',atm:'rgba(255,230,170,'},
 {id:'mars',n:'Mars',a:1.52368,e:.09340,i:1.850,Om:49.558,w:336.060,L0:355.453,per:1.88082,R:.5320,m:.1074,rot:24.623,tilt:25.19,g:3.71,T:-63,ve:5.03,col:'#d4724a',oc:'rgba(220,120,80,.35)',atm:'rgba(255,170,120,'},
 {id:'jupiter',n:'Yupiter',a:5.20260,e:.04849,i:1.303,Om:100.464,w:14.331,L0:34.351,per:11.862,R:10.973,m:317.8,rot:9.925,tilt:3.13,g:24.79,T:-110,ve:59.5,col:'#d9b48a',oc:'rgba(220,180,140,.3)'},
 {id:'saturn',n:'Saturn',a:9.55490,e:.05551,i:2.489,Om:113.665,w:93.057,L0:50.077,per:29.457,R:9.140,m:95.16,rot:10.656,tilt:26.73,g:10.44,T:-140,ve:35.5,col:'#e6d29a',oc:'rgba(230,210,150,.3)',ring:[[1.24,1.53,.30,'#9a8a74'],[1.53,1.95,.88,'#d8c49a'],[1.95,2.03,.0,'#000'],[2.03,2.27,.62,'#c4b08a']]},
 {id:'uranus',n:'Uran',a:19.2184,e:.04630,i:.773,Om:74.006,w:173.005,L0:314.055,per:84.011,R:3.981,m:14.54,rot:-17.24,tilt:97.77,g:8.69,T:-195,ve:21.3,col:'#9fe0e8',oc:'rgba(150,220,230,.3)',ring:[[1.62,1.66,.35,'#889aa0'],[1.84,1.88,.3,'#889aa0'],[1.96,2.0,.4,'#99aab0']]},
 {id:'neptune',n:'Neptun',a:30.1104,e:.00899,i:1.770,Om:131.784,w:48.123,L0:304.349,per:164.79,R:3.865,m:17.15,rot:16.11,tilt:28.32,g:11.15,T:-200,ve:23.5,col:'#4a74d8',oc:'rgba(80,120,230,.3)'},
 {id:'pluto',n:'Pluton (mitti sayyora)',a:39.482,e:.2488,i:17.16,Om:110.299,w:224.07,L0:238.93,per:247.94,R:.1868,m:.0022,rot:-153.3,tilt:122.5,g:.62,T:-229,ve:1.21,col:'#c9ab8c',oc:'rgba(200,170,140,.3)'}];
// yo'ldoshlar (ota-sayyora radiusi birligida a): [id,nom,ota,a(R_ota),per(kun),R(R⊕),rang]
const MN=[['io','Io','jupiter',5.90,1.769,.2858,'#e8c860'],['europa','Yevropa','jupiter',9.38,3.551,.2449,'#e6dcc8'],['ganymede','Ganimed','jupiter',14.97,7.155,.4135,'#a89a8a'],['callisto','Kallisto','jupiter',26.33,16.689,.3787,'#6e6458'],['titan','Titan','saturn',20.27,15.945,.4037,'#e0a050']];
const MOON={id:'moon',n:'Oy',a:60.2665,e:.0549,i:5.145,R:.2727,m:.0123,rot:655.7,tilt:1.54,g:1.62,T:-23,ve:2.38,col:'#cfcfd2',per:27.3217};
const BYID={};PL.forEach(p=>BYID[p.id]=p);BYID.moon=MOON;
// --- Kepler tenglamasi ---
function solveE(M,e){M=((M%TAU)+TAU)%TAU;let E=M+e*Math.sin(M)*(1+e*Math.cos(M));for(let k=0;k<8;k++){const d=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));E-=d;if(Math.abs(d)<1e-10)break}return E}
function orb(a,e,i,Om,w,M,sc){ // geliotsentrik ekliptik koordinatalar (w = perigeliy uzunligi), o'yin ramkasi uchun -90° burilgan
  const E=solveE(M,e),xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E),om=(w-Om)*DEG,O=Om*DEG,I=i*DEG,co=Math.cos(om),so=Math.sin(om),cO=Math.cos(O),sO=Math.sin(O),cI=Math.cos(I),sI=Math.sin(I);
  const x=xp*(co*cO-so*sO*cI)-yp*(so*cO+co*sO*cI),y=xp*(co*sO+so*cO*cI)+yp*(co*cO*cI-so*sO),z=xp*so*sI+yp*co*sI;
  return[(y)*sc,-(x)*sc,z*sc]}   // (x,y)->(y,-x) = -90° burilish
const D0=(Date.UTC(2026,3,20,12)-Date.UTC(2000,0,1,12))/864e5;   // o'yin boshlanish sanasi (20-aprel 2026) J2000 dan kun
const days=()=>D0+365.2422*S.ST/S.YEAR;
function plPos(p,d){const n=360/(p.per*365.2422);return orb(p.a*AU,p.e,p.i,p.Om,p.w,(p.L0-p.w+n*d)*DEG,1)}
function moonVec(d){const L=218.316+13.176396*d,wp=83.353+.11140353*d,Om=125.045-.05295377*d;return orb(MOON.a,MOON.e,MOON.i,Om,wp,(L-wp)*DEG,1)}
// --- Oy fazasi ---
window.moonInfo=function(){const d=days(),mv=moonVec(d),r=Math.hypot(S.rx,S.ry),sx=-S.rx/r,sy=-S.ry/r,ml=Math.hypot(mv[0],mv[1],mv[2]),mx=mv[0]/ml,my=mv[1]/ml,c=sx*mx+sy*my,k=(1-c)/2,wax=(sx*my-sy*mx)>0;
  const ang=Math.atan2(sx*my-sy*mx,c),age=((ang/TAU)*29.530589+29.530589)%29.530589,ph=k<.03?'Yangi oy':k>.97?'To‘lin oy':Math.abs(k-.5)<.06?(wax?'Birinchi chorak':'Oxirgi chorak'):k<.5?(wax?'O‘sayotgan yarim oy':'Kamayayotgan yarim oy'):(wax?'O‘sayotgan oy':'Kamayayotgan oy');
  return{k,wax,age,ph,dist:ml}};
// --- shovqin (3D, uzluksiz) ---
function h3(x,y,z,s){let h=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(z,2147483629)+Math.imul(s,1274126177))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296}
function vn(x,y,z,s){const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=x-xi,yf=y-yi,zf=z-zi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),w=zf*zf*(3-2*zf),c=(a,b,d)=>h3(xi+a,yi+b,zi+d,s),L=(a,b,t)=>a+(b-a)*t;
  return L(L(L(c(0,0,0),c(1,0,0),u),L(c(0,1,0),c(1,1,0),u),v),L(L(c(0,0,1),c(1,0,1),u),L(c(0,1,1),c(1,1,1),u),v),w)}
function fb(x,y,z,o,s){let a=.5,f=1,t=0,n=0;for(let i=0;i<o;i++){t+=a*vn(x*f,y*f,z*f,s+i*7);n+=a;f*=2;a*=.5}return t/n}
function crat(x,y,z,sc,s,mn){const X=x*sc,Y=y*sc,Z=z*sc,xi=Math.floor(X),yi=Math.floor(Y),zi=Math.floor(Z);let best=0;
  for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let c=-1;c<=1;c++){const cx=xi+a,cy=yi+b,cz=zi+c,r=mn+h3(cx,cy,cz,s+9)*(.46-mn);if(h3(cx,cy,cz,s+13)>.62)continue;
    const px=cx+h3(cx,cy,cz,s),py=cy+h3(cx,cy,cz,s+3),pz=cz+h3(cx,cy,cz,s+5),d=Math.hypot(X-px,Y-py,Z-pz)/r;
    if(d<1){let v=d<.82?-.22*(1-d/.82)-.04:.26*Math.max(0,1-Math.abs(d-.93)/.11);if(Math.abs(v)>Math.abs(best))best=v}}return best}
const lerp=(a,b,t)=>a+(b-a)*t,mixc=(c1,c2,t)=>[lerp(c1[0],c2[0],t),lerp(c1[1],c2[1],t),lerp(c1[2],c2[2],t)],cl=(v,a,b)=>v<a?a:v>b?b:v;
const angd=(l1,l2)=>{let d=((l1-l2+540)%360)-180;return d};
const ell=(lon,lat,l0,p0,rx,ry)=>{const dx=angd(lon,l0)*Math.cos(p0*DEG)/rx,dy=(lat-p0)/ry;return Math.sqrt(dx*dx+dy*dy)};
// --- protsedurali tekstura generatorlari ---
const GEN={
 moon(lon,lat,x,y,z){const lg=angd(lon*57.2958,0),lt=lat*57.2958,hl=fb(x*3,y*3,z*3,5,11);let c=170+(hl-.5)*34;
  const mare=[[-17,33,13,9],[18,28,8,6],[31,8,10,7],[59,17,6,5],[51,-4,8,7],[34,-15,5,4],[-15,-21,9,7],[-39,-24,5,4.5],[-57,18,22,15],[3,13,5,4],[-9,45,9,4],[-20,56,22,4],[-68,-6,6,6],[-31,-12,12,6]];
  let mk=0;for(const m of mare){const e=ell(lg,lt,m[0],m[1],m[2],m[3]);if(e<1.15)mk=Math.max(mk,cl(1.15-e,0,.35)/.35)}
  mk*=cl(.75+fb(x*6,y*6,z*6,3,5)*.5,0,1);let col=mixc([c,c-1,c-4],[78,82,92],mk*.95);
  let cr=crat(x,y,z,5,21,.14)+.7*crat(x,y,z,11,33,.2)+.5*crat(x,y,z,24,47,.22);col=[col[0]*(1+cr),col[1]*(1+cr),col[2]*(1+cr)];
  for(const [l0,p0,r,b] of [[-11,-43,2.6,1],[-20,10,2.2,.85],[-38,8,1.6,.7],[-47,23,1.4,.95],[-14,-58,3.6,.35],[-9,51,3.2,-.4]]){const e=ell(lg,lt,l0,p0,r,r);if(e<1)col=mixc(col,b>0?[236,234,228]:[92,92,98],Math.abs(b)*(1-e)*.9);
    if(b>0.8&&e<9){const rr=cl(1-e/9,0,1)*.35*(.5+fb(x*20,y*20,z*20,2,3)),ang=Math.atan2(angd(lg,l0),lt-p0);if(Math.sin(ang*9+l0)>.2)col=mixc(col,[230,230,225],rr)}}
  return col},
 mercury(lon,lat,x,y,z){const lg=angd(lon*57.2958,0),lt=lat*57.2958;let c=138+(fb(x*3,y*3,z*3,5,17)-.5)*50;
  let cr=crat(x,y,z,4,31,.12)*1.2+.8*crat(x,y,z,9,43,.18)+.6*crat(x,y,z,20,53,.22);let col=[c*(1+cr),c*.96*(1+cr),c*.9*(1+cr)];
  const e=ell(lg,lt,160,30,16,12);if(e<1)col=mixc(col,[188,176,160],.55*(1-e));return col},
 venus(lon,lat,x,y,z){const sw=fb(x*2.2+fb(x*5,y*5,z*5,3,3)*.7,y*5.5+fb(x*3,y*3,z*3,3,8)*1.2,z*2.2,5,9),b=.5+.5*Math.sin(lat*7+sw*5);return mixc([214,184,120],[246,226,172],cl(sw*.9+b*.35,0,1))},
 mars(lon,lat,x,y,z){const lg=angd(lon*57.2958,0),lt=lat*57.2958,n=fb(x*4,y*4,z*4,5,13);let col=mixc([172,92,54],[206,128,80],n);
  const dark=[[70,8,16,24],[-20,40,28,16],[-40,-20,20,12],[10,0,22,8],[130,-10,24,12],[-100,15,18,12]];let dk=0;for(const d of dark){const e=ell(lg,lt,d[0],d[1],d[2],d[3]);if(e<1)dk=Math.max(dk,(1-e)*(.55+fb(x*9,y*9,z*9,3,7)*.5))}
  col=mixc(col,[96,56,44],cl(dk,0,.85));
  let e=ell(lg,lt,70,-42,12,10);if(e<1)col=mixc(col,[220,176,138],(1-e)*.8);
  e=ell(lg,lt,-134,18,4,4);if(e<1)col=mixc(col,[222,184,150],(1-e)*.9);e=ell(lg,lt,-108,5,14,10);if(e<1)col=mixc(col,[216,150,104],(1-e)*.5);
  if(lt<-8&&lt>-14&&lg>-100&&lg<-45)col=mixc(col,[92,52,40],.65*(1-Math.abs(lt+11)/3));
  const cap=Math.abs(lt)-(82-6*fb(x*12,y*12,z*12,3,4));if(cap>0)col=mixc(col,[246,248,252],cl(cap*.6,0,1));
  return col},
 jupiter(lon,lat,x,y,z){const tb=fb(x*5,y*14,z*5,4,3),bn=Math.sin(lat*9.5+tb*2.2+Math.sin(lat*3)*1.1),w=cl(.5+.5*bn,0,1);let col=mixc([160,108,76],[238,218,186],w);
  col=mixc(col,[188,138,100],cl(fb(x*10,y*26,z*10,3,5)-.5,0,.5)*1.2);
  const lg=angd(lon*57.2958,25),lt=lat*57.2958;let e=ell(lg,lt,0,-22,13,7);if(e<1)col=mixc(col,[196,94,64],(1-e)*.95);else if(e<1.4)col=mixc(col,[150,100,80],(1.4-e)*.4);
  e=ell(lg,lt,-60,-33,4,3);if(e<1)col=mixc(col,[246,238,224],(1-e)*.9);return col},
 saturn(lon,lat,x,y,z){const bn=Math.sin(lat*11+fb(x*3,y*10,z*3,3,2)*1.4),w=cl(.5+.5*bn,0,1);let col=mixc([206,176,118],[238,222,176],w);col=mixc(col,[196,164,108],cl(fb(x*8,y*22,z*8,3,6)-.5,0,.4));
  if(Math.abs(lat)>1.2)col=mixc(col,[150,160,170],cl((Math.abs(lat)-1.2)*2,0,.5));return col},
 uranus(lon,lat,x,y,z){const w=cl(.5+.5*Math.sin(lat*8+fb(x*3,y*6,z*3,3,2)*.8),0,1);let col=mixc([146,212,222],[176,230,236],w*.7+.3*Math.abs(lat)/1.57);return col},
 neptune(lon,lat,x,y,z){const w=cl(.5+.5*Math.sin(lat*9+fb(x*3,y*8,z*3,4,2)*1.4),0,1);let col=mixc([44,78,186],[84,124,226],w);
  const lg=angd(lon*57.2958,-60),lt=lat*57.2958;let e=ell(lg,lt,0,-20,16,9);if(e<1)col=mixc(col,[24,40,120],(1-e)*.9);
  const sc=fb(x*6,y*20,z*6,3,8);if(Math.abs(lt+42)<4&&sc>.5)col=mixc(col,[220,232,255],.7);return col},
 pluto(lon,lat,x,y,z){const lg=angd(lon*57.2958,180),lt=lat*57.2958,n=fb(x*5,y*5,z*5,5,19);let col=mixc([168,126,100],[212,184,156],n);
  const dk=ell(lg+90,lt,0,0,60,14);if(dk<1)col=mixc(col,[92,54,52],(1-dk)*.85);
  let e=ell(lg,lt,0,12,16,16);if(e<1)col=mixc(col,[244,230,212],(1-e)*.95);e=ell(lg-12,lt,0,-4,12,10);if(e<1)col=mixc(col,[240,226,206],(1-e)*.9);
  let cr=crat(x,y,z,12,41,.2)*.5;return[col[0]*(1+cr),col[1]*(1+cr),col[2]*(1+cr)]}};
const TEXS={};
function bodyTex(key){let t=TEXS[key];if(t)return t;const w=key=='moon'?512:256,h=w/2,d=new Uint8ClampedArray(w*h*4),f=GEN[key];
  for(let v=0;v<h;v++){const lat=(.5-(v+.5)/h)*Math.PI,cl2=Math.cos(lat),sl=Math.sin(lat);for(let u=0;u<w;u++){const lon=(u+.5)/w*TAU,x=cl2*Math.cos(lon),y=cl2*Math.sin(lon),c=f(lon,lat,x,y,sl),k=(v*w+u)*4;d[k]=c[0];d[k+1]=c[1];d[k+2]=c[2];d[k+3]=255}}
  return TEXS[key]={w,h,d}}
// --- umumiy shar chizgich: tekstura + Quyosh yorug'ligi (pikselli) ---
const SB={};function sbuf(N){let b=SB[N];if(!b){const c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');b=SB[N]={c,x,id:x.createImageData(N,N)}}return b}
function sphere(N,tex,A,M,E,L,soft,lon0){const b=sbuf(N),d=b.id.data,w=tex.w,h=tex.h,td=tex.d;
  for(let py=0;py<N;py++){const ny=1-(py+.5)/N*2;for(let px=0;px<N;px++){const nx=(px+.5)/N*2-1,r2=nx*nx+ny*ny,k=(py*N+px)*4;if(r2>=1){d[k+3]=0;continue}
    const nv=Math.sqrt(1-r2),za=nx*A[0]+ny*A[1]+nv*A[2],xm=nx*M[0]+ny*M[1]+nv*M[2],xe=nx*E[0]+ny*E[1]+nv*E[2],lat=Math.asin(za>1?1:za<-1?-1:za),lon=Math.atan2(xe,xm)+(lon0||0);
    const u=((((lon/TAU)%1)+1)%1*w)|0,v=Math.min(h-1,((.5-lat/Math.PI)*h)|0),i=(v*w+u)*4,dl=nx*L[0]+ny*L[1]+nv*L[2],k2=cl((dl+soft)/(soft+.35),0,1),sh=(.05+1.0*k2)*(.8+.2*nv);
    d[k]=td[i]*sh;d[k+1]=td[i+1]*sh;d[k+2]=td[i+2]*sh;d[k+3]=255}}
  b.x.putImageData(b.id,0,0);return b.c}
// --- tanlangan jism / holat ---
SP.sel='earth';SP.hits=[];SP.fid=1;
const idOf=f=>f===1?'earth':f===2?'sun':f;
window.focusTo=function(k,zoom){const id=idOf(k),mn=Math.min(gc.width,gc.height);SP.foc=id;SP.sel=id;SP.glide=.9;
  {const bs=bodies(),b=bs.find(q=>q.id==id),E=bs.find(q=>q.id=='earth');let az=0;
   if(b&&id=='moon'){az=-Math.PI/2-Math.atan2(E.p[1]-b.p[1],E.p[0]-b.p[0])}
   else if(b&&id!='sun'&&id!='earth'){const ref=b.par?bs.find(q=>q.id==b.par):b;az=-Math.PI/2-Math.atan2(-ref.p[1],-ref.p[0])+.7}
   SP.taz=az}if(zoom!==false){const R=id=='sun'?S.SR:id=='earth'?1:id=='sys'?0:bodyR(id);SP.tz=id=='sys'?mn*.42/(33*AU):mn*(id=='earth'?.22:.2)/R}};
window.zb=function(f){if(gMode==2){SP.tz=null;SP.Z=Math.max(2e-5,Math.min(3000,SP.Z*f))}else gZoom=Math.max(.5,Math.min(4,gZoom*f))};
function bodyR(id){if(id=='sun')return S.SR;if(id=='earth')return 1;const b=BYID[id];if(b)return b.R;const m=MN.find(q=>q[0]==id);return m?m[5]:1}
// jismlar ro'yxati (hozirgi vaqt)
function bodies(){const d=days(),out=[],ep=[S.rx,S.ry,0];out.push({id:'sun',n:'Quyosh',p:[0,0,0],R:S.SR,k:'sun'});
  out.push({id:'earth',n:'Yer',p:ep,R:1,k:'earth'});const mv=moonVec(d),mo=[mv[0],mv[1],mv[2]];
  out.push({id:'moon',n:'Oy',p:[ep[0]+mo[0],ep[1]+mo[1],ep[2]+mo[2]],R:MOON.R,k:'moon',par:'earth'});
  PL.forEach(p=>{const q=plPos(p,d);out.push({id:p.id,n:p.n.split(' (')[0],p:q,R:p.R,k:p.id,pl:p})});
  const pm={};out.forEach(b=>pm[b.id]=b);
  MN.forEach(m=>{const par=pm[m[2]],pr=BYID[m[2]],ph=(d/m[4])*TAU,a=m[3]*pr.R,t=pr.tilt*DEG;// ekvator tekisligida (taxminan): o'q [sin t,0,cos t]
    const ax=[Math.sin(t),0,Math.cos(t)],e1=[Math.cos(t),0,-Math.sin(t)],e2=[0,1,0],c=Math.cos(ph),s=Math.sin(ph);
    out.push({id:m[0],n:m[1],p:[par.p[0]+a*(c*e1[0]+s*e2[0]),par.p[1]+a*(c*e1[1]+s*e2[1]),par.p[2]+a*(c*e1[2]+s*e2[2])],R:m[5],k:'moonlet',col:m[6],par:m[2]})});
  return out}
// planeta o'qi (ekliptika koordinatalarida)
function axisOf(p){const t=p.tilt*DEG;return[Math.sin(t)*Math.cos(0),Math.sin(t)*Math.sin(0),Math.cos(t)]}
function frame(A,th){let e1=[A[1]*0-A[2]*0,A[2]*1-A[0]*0,0];// A x z? degenerat holatlar uchun
  let u=[1,0,0];if(Math.abs(A[0])>.9)u=[0,1,0];let e=[A[1]*u[2]-A[2]*u[1],A[2]*u[0]-A[0]*u[2],A[0]*u[1]-A[1]*u[0]],ln=Math.hypot(e[0],e[1],e[2]);e=[e[0]/ln,e[1]/ln,e[2]/ln];
  const f=[A[1]*e[2]-A[2]*e[1],A[2]*e[0]-A[0]*e[2],A[0]*e[1]-A[1]*e[0]],c=Math.cos(th),s=Math.sin(th);
  const M=[e[0]*c+f[0]*s,e[1]*c+f[1]*s,e[2]*c+f[2]*s];return[M,[A[1]*M[2]-A[2]*M[1],A[2]*M[0]-A[0]*M[2],A[0]*M[1]-A[1]*M[0]]]}
// ma'lumot kartochkasi
function info(id){const b=BYID[id],bs=bodies().find(q=>q.id==id);if(!bs)return[];const R=bodyR(id);
  if(id=='sun')return['Quyosh · yulduz (G2V)','Radiusi: 696 340 km (o‘yinda '+fmt(696340*KS,0)+' km) = 109,2 R⊕','Massa: 333 000 M⊕ · g = 274 m/s² · yuza harorati 5 500 °C','Aylanishi: ~25 kun (ekvatorda) · Yerdan 1 a.b. = 149,6 mln km (o‘yinda '+fmt(149.6e6*KS)+' km)'];
  if(id=='earth')return['Yer','Radiusi: 6 371 km (o‘yinda '+fmt(REK*KS,1)+' km) · maydon 510 600 km² (haqiqiy 510,1 mln)','Massa: 1 M⊕ · g = 9,81 m/s² · o‘rtacha harorat 15 °C','Aylanishi: 23,93 soat (o‘yinda '+S.DAY+' s) · yil: '+(S.YEAR/60)+' daq · qiyalik 23,5°'];
  if(id=='moon'){const mi=moonInfo();return['Oy · Yerning tabiiy yo‘ldoshi','Radiusi: 1 737 km (o‘yinda '+fmt(1737.4*KS,1)+' km) = 0,273 R⊕ · massa 0,0123 M⊕','g = 1,62 m/s² (0,17 g) · harorat −23 °C (−173…+127) · qochish tezligi 2,38 km/s','Yerdan: o‘rtacha 384 400 km (o‘yinda '+fmt(384400*KS)+' km) = 60,3 R⊕ · hozir '+fmt(mi.dist*REK)+' km','Davri: 27,32 kun (o‘yinda '+fmt(27.3217/365.2422*S.YEAR,0)+' s) · faza: '+mi.ph+' ('+Math.round(mi.k*100)+'% yoritilgan, yoshi '+mi.age.toFixed(1)+' kun)']}
  const dm=MN.find(q=>q[0]==id);if(dm)return[bs.n+' · '+BYID[dm[2]].n+' yo‘ldoshi','Radiusi: '+fmt(dm[5]*REK)+' km (o‘yinda '+fmt(dm[5]*REK*KS,1)+' km)','Orbita: '+fmt(dm[3]*BYID[dm[2]].R*REK)+' km · davri '+dm[4]+' kun (o‘yinda '+fmt(dm[4]/365.2422*S.YEAR,1)+' s)'];
  const r=Math.hypot(bs.p[0],bs.p[1],bs.p[2])/AU;
  return[b.n+' · sayyora','Radiusi: '+fmt(b.R*REK)+' km (o‘yinda '+fmt(b.R*REK*KS,1)+' km) = '+b.R+' R⊕ · massa '+b.m+' M⊕','g = '+b.g+' m/s² ('+(b.g/9.81).toFixed(2)+' g) · qochish tezligi '+b.ve+' km/s · harorat ~'+b.T+' °C',
   'Aylanishi: '+fmt(Math.abs(b.rot),1)+' soat'+(b.rot<0?' (teskari)':'')+' (o‘yinda '+fmt(Math.abs(b.rot)/23.9345*S.DAY,0)+' s) · qiyalik '+b.tilt+'°',
   'Yili: '+b.per+' Yer yili (o‘yinda '+fmt(b.per*S.YEAR/60,1)+' daq) · e = '+b.e+' · orbita qiyaligi '+b.i+'°','Quyoshdan: hozir '+r.toFixed(2)+' a.b. = '+fmt(r*149.6e6)+' km (o‘yinda '+fmt(r*149.6e6*KS)+' km)']}
// --- asosiy chizish ---
window.drawSpace=function(w,h){
  const dt=Math.min(.05,Math.max(0,time-SP.pt)),sE=Math.sin(SP.el),cE=Math.cos(SP.el),mn=Math.min(w,h);SP.pt=time;
  const bl=bodies(),bm={};bl.forEach(b=>bm[b.id]=b);
  if(!SP.init){SP.init=1;SP.Z=mn*.22;SP.foc=1}
  const fid=idOf(SP.foc);
  if(fid&&fid!=='sys'){const t=bm[fid];if(t){if(SP.glide>0){SP.glide-=dt;const k=1-Math.exp(-7*dt);SP.cx+=(t.p[0]-SP.cx)*k;SP.cy+=(t.p[1]-SP.cy)*k;SP.cz=(SP.cz||0)+(t.p[2]-(SP.cz||0))*k}else{SP.cx=t.p[0];SP.cy=t.p[1];SP.cz=t.p[2]}}}
  else if(fid==='sys'){if(SP.glide>0){SP.glide-=dt;const k=1-Math.exp(-7*dt);SP.cx+=(0-SP.cx)*k;SP.cy+=(0-SP.cy)*k;SP.cz=(SP.cz||0)*(1-k)}else{SP.cx=0;SP.cy=0;SP.cz=0}}
  if(SP.tz){SP.Z*=Math.pow(SP.tz/SP.Z,1-Math.exp(-5*dt));if(Math.abs(Math.log(SP.tz/SP.Z))<.012){SP.Z=SP.tz;SP.tz=null}}
  {const da=((SP.taz||0)-(SP.az||0)+9.4248)%6.2832-3.1416;SP.az=(SP.az||0)+da*(1-Math.exp(-4*dt))}
  const ca=Math.cos(SP.az||0),sa=Math.sin(SP.az||0),Z=SP.Z,P3=(x,y,z)=>{const dx=x-SP.cx,dy=y-SP.cy,rx=dx*ca-dy*sa,ry=dx*sa+dy*ca;return[w/2+rx*Z,h*.56-(ry*sE+(z-(SP.cz||0))*cE)*Z]},
    tv=v=>{const vx=v[0]*ca-v[1]*sa,vy=v[0]*sa+v[1]*ca;return[vx,vy*sE+v[2]*cE,-vy*cE+v[2]*sE]};
  gg.fillStyle='#01030a';gg.fillRect(0,0,w,h);
  STARS.forEach(s=>{gg.fillStyle='rgba(255,255,255,'+(.25+.55*s[2]*(.7+.3*Math.sin(time*2+s[0]*50)))+')';gg.fillRect(s[0]*w|0,s[1]*h|0,s[2]>.8?2:1,s[2]>.8?2:1)});
  // orbita doiralari (a.b.) va sayyora orbitalari
  const c0=P3(0,0,0),SRp=S.SR*Z;SP.sun=[c0[0],c0[1],SRp];gg.lineWidth=1;
  for(const au of [1,2,5,10,20,30]){const rr=au*AU*Z;if(rr>60000||rr<14)continue;gg.strokeStyle='rgba(120,160,255,.07)';gg.beginPath();gg.ellipse(c0[0],c0[1],rr,rr*sE,0,0,6.3);gg.stroke();
    if(rr<w*1.3&&rr>40){gg.font='10px monospace';gg.fillStyle='rgba(150,180,255,.35)';gg.textAlign='left';gg.fillText(au+' a.b.',c0[0]+rr*.7+4,c0[1]+rr*sE*.7+10)}}
  PL.forEach(p=>{const n=360/(p.per*365.2422);gg.strokeStyle=p.oc;gg.lineWidth=SP.sel==p.id?1.8:1;gg.beginPath();let first=1;
    for(let i=0;i<=180;i++){const q=orb(p.a*AU,p.e,p.i,p.Om,p.w,i/180*TAU+(p.L0-p.w)*DEG*0,1),pp=P3(q[0],q[1],q[2]);if(Math.abs(pp[0])>60000&&Math.abs(pp[1])>60000){first=1;continue}first?gg.moveTo(pp[0],pp[1]):gg.lineTo(pp[0],pp[1]);first=0}gg.stroke()});
  {const v2=S.vx*S.vx+S.vy*S.vy,r=S.r,en=v2/2-S.GM/r,aa=-S.GM/(2*en),rv=S.rx*S.vx+S.ry*S.vy,ex=((v2-S.GM/r)*S.rx-rv*S.vx)/S.GM,ey=((v2-S.GM/r)*S.ry-rv*S.vy)/S.GM,ee=Math.hypot(ex,ey),om=Math.atan2(ey,ex),pp=aa*(1-ee*ee);
    gg.strokeStyle='rgba(255,215,120,.6)';gg.lineWidth=1.5;gg.beginPath();let f2=1;for(let i=0;i<=200;i++){const nu=i/200*TAU,rr=pp/(1+ee*Math.cos(nu-om)),q=P3(rr*Math.cos(nu),rr*Math.sin(nu),0);if(Math.abs(q[0])>60000){f2=1;continue}f2?gg.moveTo(q[0],q[1]):gg.lineTo(q[0],q[1]);f2=0}gg.stroke()}
  // Oy orbitasi (Yer atrofida)
  {const ec=bm.earth,d=days(),L0=218.316,wp=83.353+.11140353*d,Om=125.045-.05295377*d;gg.strokeStyle='rgba(200,200,215,.35)';gg.lineWidth=1;gg.beginPath();let f3=1;
    for(let i=0;i<=120;i++){const q=orb(MOON.a,MOON.e,MOON.i,Om,wp,i/120*TAU,1),pp=P3(ec.p[0]+q[0],ec.p[1]+q[1],q[2]);if(Math.abs(pp[0])>60000||Math.abs(pp[1])>60000){f3=1;continue}f3?gg.moveTo(pp[0],pp[1]):gg.lineTo(pp[0],pp[1]);f3=0}gg.stroke()}
  // tartib: uzoqdan yaqinga
  const view=bl.map(b=>{const sc=P3(b.p[0],b.p[1],b.p[2]),dx=b.p[0]-SP.cx,dy=b.p[1]-SP.cy;return{b,sc,dp:-(dx*sa+dy*ca)*cE+b.p[2]*sE,Rp:b.R*Z}});view.sort((p,q)=>p.dp-q.dp);SP.hits=[];
  const lab=(b,x,y,Rp)=>{gg.font=(SP.sel==b.id?'bold 12px':'11px')+' monospace';gg.textAlign='left';const t=(b.id=='sun'?'☀ ':b.id=='earth'?'🌍 ':b.id=='moon'?'🌙 ':'')+b.n;gg.fillStyle='#000';gg.fillText(t,x+Math.max(Rp,3)+9,y-Math.max(Rp,3)*.3+1);gg.fillStyle=SP.sel==b.id?'#ffe27a':'#cfe4ff';gg.fillText(t,x+Math.max(Rp,3)+8,y-Math.max(Rp,3)*.3)};
  view.forEach(({b,sc,Rp})=>{const x=sc[0],y=sc[1],R=Math.max(Rp,0);SP.hits.push({id:b.id,x,y,r:Math.max(R,10)});
    if(x<-R*4-80||x>w+R*4+80||y<-R*4-80||y>h+R*4+80)return;
    if(b.id=='sun'){gg.globalCompositeOperation='lighter';const RR=Math.max(SRp,6),g=gg.createRadialGradient(x,y,RR*.6,x,y,RR*4.6);g.addColorStop(0,'rgba(255,190,70,.55)');g.addColorStop(.25,'rgba(255,130,30,.18)');g.addColorStop(1,'rgba(255,100,20,0)');gg.fillStyle=g;gg.beginPath();gg.arc(x,y,RR*4.6,0,6.3);gg.fill();
      if(SRp>8){gg.fillStyle='rgba(255,170,50,.11)';for(let i=0;i<30;i++){const a=i/30*TAU+time*.03+Math.sin(i*3.7)*.2,L=SRp*(1.25+.7*(.5+.5*Math.sin(time*1.7+i*2.3))*(.4+.6*((i*7919)%10)/10));gg.beginPath();gg.moveTo(x+Math.cos(a-.05)*SRp*.95,y+Math.sin(a-.05)*SRp*.95);gg.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);gg.lineTo(x+Math.cos(a+.05)*SRp*.95,y+Math.sin(a+.05)*SRp*.95);gg.fill()}}
      gg.globalCompositeOperation='source-over';
      if(SRp>5){const N=Math.max(32,Math.min(150,Math.round(SRp*1.4)));if(SP.sb===undefined||SP.sbN!=N||((time*30)|0)%2==0){SP.sbC=sunBuf(N,time);SP.sbN=N;SP.sb=1}gg.imageSmoothingEnabled=true;gg.drawImage(SP.sbC,x-SRp,y-SRp,SRp*2,SRp*2)}
      else{gg.fillStyle='#fff1b0';gg.beginPath();gg.arc(x,y,Math.max(2.5,SRp),0,6.3);gg.fill()}
      if(SRp>26){gg.globalCompositeOperation='lighter';gg.lineCap='round';for(let k=0;k<7;k++){const a0=k*.93+time*.02*(k%2?1:-1)+Math.sin(time*.3+k)*.15,a1=a0+.16+.06*Math.sin(time*.9+k*2),hh=SRp*(.1+.1*Math.sin(time*.8+k*2.4)),m=SRp+hh*2.2;
        gg.strokeStyle='rgba(255,110,35,.55)';gg.lineWidth=Math.max(1.5,SRp*.018);gg.beginPath();gg.moveTo(x+Math.cos(a0)*SRp,y+Math.sin(a0)*SRp);gg.bezierCurveTo(x+Math.cos(a0)*m,y+Math.sin(a0)*m,x+Math.cos(a1)*m,y+Math.sin(a1)*m,x+Math.cos(a1)*SRp,y+Math.sin(a1)*SRp);gg.stroke()}gg.globalCompositeOperation='source-over'}
      if(SRp<90)lab(b,x,y,SRp);return}
    // Quyosh yo'nalishi (ko'rinish fazosida)
    const sd=Math.hypot(b.p[0],b.p[1],b.p[2])||1,Lv=tv([-b.p[0]/sd,-b.p[1]/sd,-b.p[2]/sd]);
    if(R<2.2){const col=b.id=='earth'?'#7fc4ff':b.id=='moon'?'#d8d8dc':b.col||(BYID[b.id]&&BYID[b.id].col)||'#fff';gg.fillStyle=col;gg.beginPath();gg.arc(x,y,Math.max(1.6,R),0,6.3);gg.fill();const nearSun=Math.hypot(x-c0[0],y-c0[1])<30&&b.id!='sun'&&SP.sel!=b.id&&b.id!='earth';
      if(b.k!='moonlet'&&(R<2.2)){gg.fillStyle=col.length==7?col+'33':'rgba(255,255,255,.12)';gg.beginPath();gg.arc(x,y,5,0,6.3);gg.fill()}if(!nearSun)lab(b,x,y,R);return}
    if(b.k=='moonlet'){gg.fillStyle=b.col;gg.beginPath();gg.arc(x,y,Math.max(R,1.6),0,6.3);gg.fill();const par=bm[b.par],pr=par?par.R*Z:0;if(pr>40||SP.sel==b.id)lab(b,x,y,R);return}
    const N=Math.max(14,Math.min(150,Math.round(R*1.0)));gg.imageSmoothingEnabled=false;
    let A,M,E2,tex,soft=.12,lon0=0;
    if(b.id=='earth'){A=tv(S.a);M=tv(S.m);E2=tv(S.ev);
      const gl=gg.createRadialGradient(x,y,R*.96,x,y,R*1.18);gl.addColorStop(0,'rgba(120,180,255,.5)');gl.addColorStop(1,'rgba(120,180,255,0)');gg.fillStyle=gl;gg.beginPath();gg.arc(x,y,R*1.18,0,6.3);gg.fill();
      const Ne=Math.max(24,Math.min(300,Math.round(R*2))),bb=renderGlobe2(Ne,time,A,M,E2,Lv,0);gg.drawImage(bb.c,x-R,y-R,R*2,R*2);
      const ax=A[0],ay=-A[1],ln=R*1.7;gg.strokeStyle='rgba(255,255,255,.55)';gg.lineWidth=1.2;gg.setLineDash([5,4]);gg.beginPath();gg.moveTo(x-ax*ln,y-ay*ln);gg.lineTo(x+ax*ln,y+ay*ln);gg.stroke();gg.setLineDash([]);
      gg.font='bold 11px monospace';gg.fillStyle='#fff';gg.textAlign='center';gg.fillText('Sh',x+ax*(ln+9),y+ay*(ln+9)+4);gg.fillText('J',x-ax*(ln+9),y-ay*(ln+9)+4);
      const phi=wLat(P.y),lam=wLon(P.x),cp=Math.cos(phi),vx=cp*Math.cos(lam)*M[0]+cp*Math.sin(lam)*E2[0]+Math.sin(phi)*A[0],vy=cp*Math.cos(lam)*M[1]+cp*Math.sin(lam)*E2[1]+Math.sin(phi)*A[1],vz=cp*Math.cos(lam)*M[2]+cp*Math.sin(lam)*E2[2]+Math.sin(phi)*A[2];
      if(vz>.05){const X=x+vx*R,Y=y-vy*R;gg.fillStyle='#000';gg.fillRect(X-3,Y-3,6,6);gg.fillStyle='#ff4a4a';gg.fillRect(X-2,Y-2,4,4);const r=6+(Math.sin(time*5)+1)*4;gg.strokeStyle='#ff4a4a';gg.lineWidth=1.5;gg.strokeRect(X-r,Y-r,r*2,r*2)}
      lab(b,x,y,R);return}
    if(b.id=='moon'){const ep=bm.earth.p,ev=[ep[0]-b.p[0],ep[1]-b.p[1],ep[2]-b.p[2]],el=Math.hypot(ev[0],ev[1],ev[2]),Ax=[0,0,1];// yaqin tomon Yerga qaragan
      let Me=[ev[0]/el,ev[1]/el,ev[2]/el];const dz=Me[2];Me=[Me[0]-dz*0,Me[1]-dz*0,Me[2]-dz];const ml=Math.hypot(Me[0],Me[1],Me[2]);Me=[Me[0]/ml,Me[1]/ml,Me[2]/ml];
      A=tv(Ax);M=tv(Me);E2=tv([Ax[1]*Me[2]-Ax[2]*Me[1],Ax[2]*Me[0]-Ax[0]*Me[2],Ax[0]*Me[1]-Ax[1]*Me[0]]);tex=bodyTex('moon');soft=.04}
    else{const p=b.pl,At=axisOf(p);
      const fr=frame(At,S.ST/(p.rot/23.9345*S.DAY)*TAU);A=tv(At);M=tv(fr[0]);E2=tv(fr[1]);tex=bodyTex(p.id);soft=p.atm?.3:.12;
      // halqalar (orqa yarmi)
      if(p.ring)ring(gg,x,y,R,p.ring,A,Lv,0)}
    const cv=sphere(N,tex,A,M,E2,Lv,soft,0);
    if(b.pl&&b.pl.atm){const gl=gg.createRadialGradient(x,y,R*.97,x,y,R*1.1);gl.addColorStop(0,b.pl.atm+'.35)');gl.addColorStop(1,b.pl.atm+'0)');gg.fillStyle=gl;gg.beginPath();gg.arc(x,y,R*1.1,0,6.3);gg.fill()}
    gg.drawImage(cv,x-R,y-R,R*2,R*2);
    if(b.pl&&b.pl.ring)ring(gg,x,y,R,b.pl.ring,A,Lv,1);
    if(b.id=='moon'||R<90)lab(b,x,y,R)});
  // ma'lumot
  const v=Math.hypot(S.vx,S.vy),vc=Math.sqrt(S.GM/S.A),dKm=S.r/S.A*149.6,vKm=29.78*v/vc,mi=moonInfo();
  gg.textAlign='left';gg.font='bold 13px monospace';gg.fillStyle='#fff';gg.fillText('QUYOSH TIZIMI · haqiqiy nisbatlar',14,24);
  gg.font='12px monospace';gg.fillStyle='#ffd98a';gg.fillText('Sana: '+solDate()+' · fasl (shimol): '+solSeason()+' · Oy: '+mi.ph+' '+Math.round(mi.k*100)+'%',14,43);
  gg.fillStyle='#bcd';gg.fillText('Yer–Quyosh: '+dKm.toFixed(1)+' mln km (o‘yinda '+fmt(dKm*1e6*KS)+' km) · '+vKm.toFixed(1)+' km/s · masshtab 1:'+(1/KS).toFixed(1),14,60);
  gg.fillText('1 kun = '+S.DAY+' s · 1 yil = '+(S.YEAR/60)+' daq (Oy 1 oyligi = '+Math.round(29.53/365.2422*S.YEAR)+' s) · tezlik ×'+SP.ts,14,77);
  const inf=info(SP.sel||'earth');if(inf.length){const x0=14,y0=92,lh=15,wd=Math.min(w-110,560);gg.fillStyle='rgba(6,12,24,.62)';gg.fillRect(x0-6,y0-12,wd,lh*inf.length+10);gg.strokeStyle='rgba(255,255,255,.2)';gg.strokeRect(x0-6,y0-12,wd,lh*inf.length+10);
    inf.forEach((t,i)=>{gg.font=(i?'11px':'bold 12px')+' monospace';gg.fillStyle=i?'#cfe0f4':'#ffe27a';gg.fillText(t,x0,y0+i*lh)})}
  gg.fillStyle='#8fa';gg.font='12px monospace';gg.fillText('Ekranni siljiting · iki barmoq bilan kattalashtiring · jismni bosing',14,h-70)};
// Saturn / Uran halqalari (orqa yoki old yarmi)
function ring(g,x,y,R,bands,A,Lv,front){let u=[1,0,0];if(Math.abs(A[0])>.9)u=[0,1,0];let e=[A[1]*u[2]-A[2]*u[1],A[2]*u[0]-A[0]*u[2],A[0]*u[1]-A[1]*u[0]];const ln=Math.hypot(e[0],e[1],e[2]);e=[e[0]/ln,e[1]/ln,e[2]/ln];
  const f=[A[1]*e[2]-A[2]*e[1],A[2]*e[0]-A[0]*e[2],A[0]*e[1]-A[1]*e[0]];const lit=Math.max(.35,Math.min(1,.5+.5*(A[0]*Lv[0]+A[1]*Lv[1]+A[2]*Lv[2])*Math.sign(A[2]||1)));
  bands.forEach(bd=>{if(bd[2]<=0)return;const r0=bd[0]*R,r1=bd[1]*R,n=Math.max(48,Math.min(160,Math.round(R*2)));g.fillStyle=bd[3];g.globalAlpha=bd[2]*lit;
    for(let i=0;i<n;i++){const a0=i/n*TAU,a1=(i+1)/n*TAU,am=(a0+a1)/2,zc=Math.cos(am)*e[2]+Math.sin(am)*f[2];const isFront=zc>0;if(isFront!==!!front)continue;
      const p=(a,r)=>[x+r*(Math.cos(a)*e[0]+Math.sin(a)*f[0]),y-r*(Math.cos(a)*e[1]+Math.sin(a)*f[1])];
      // sayyora ortida qolgan qismni yashirish: old yarmi yopmaydi, orqa yarmi sayyora ustidan chizilgandan keyin sayyora tomonidan yopiladi
      const q0=p(a0,r0),q1=p(a1,r0),q2=p(a1,r1),q3=p(a0,r1);g.beginPath();g.moveTo(q0[0],q0[1]);g.lineTo(q1[0],q1[1]);g.lineTo(q2[0],q2[1]);g.lineTo(q3[0],q3[1]);g.closePath();g.fill()}});g.globalAlpha=1}
// pointer: boshqa jismlarni tanlash
gc.addEventListener('pointerdown',e=>{SP.pd=[e.clientX,e.clientY]});
gc.addEventListener('click',e=>{if(gMode!=2)return;const X=e.clientX,Y=e.clientY;if(SP.pd&&Math.hypot(X-SP.pd[0],Y-SP.pd[1])>8)return;
  let best=null,bd=1e9;SP.hits.forEach(h=>{const d=Math.hypot(X-h.x,Y-h.y);if(d<h.r+8&&d<bd){bd=d;best=h}});if(best)focusTo(best.id)});
// tugmalar: Oy, sayyoralar, tizim, vaqt
(function(){const sp=document.getElementById('sp');if(!sp||document.getElementById('spM'))return;
  const mk=(id,txt,fn,cls)=>{const b=document.createElement('button');b.id=id;b.textContent=txt;b.onpointerdown=e=>{e.stopPropagation();e.preventDefault();fn()};sp.insertBefore(b,sp.firstChild?document.querySelector('#sp [data-ts]'):null);return b};
  const row=[['spM','🌙 Oy','moon'],['spMe','☿ Merkuriy','mercury'],['spV','♀ Venera','venus'],['spMa','♂ Mars','mars'],['spJ','♃ Yupiter','jupiter'],['spSa','♄ Saturn','saturn'],['spU','⛢ Uran','uranus'],['spN','♆ Neptun','neptune'],['spP','♇ Pluton','pluto'],['spSys','🌌 Tizim','sys']];
  const first=document.querySelector('#sp [data-ts]');row.forEach(([id,t,k])=>{const b=document.createElement('button');b.id=id;b.textContent=t;b.onpointerdown=e=>{e.stopPropagation();e.preventDefault();focusTo(k)};sp.insertBefore(b,first)});
  [[4000,'×4000'],[40000,'×40000']].forEach(([v,t])=>{const b=document.createElement('button');b.dataset.ts=v;b.textContent=t;b.onpointerdown=e=>{e.stopPropagation();e.preventDefault();SP.ts=v;sp.querySelectorAll('[data-ts]').forEach(x=>x.classList.toggle('on',x===b))};sp.appendChild(b)});
  const sel=document.getElementById('spS');if(sel)sel.onpointerdown=e=>{e.stopPropagation();e.preventDefault();focusTo(2)}})();

// --- o'yin ichida: Oy fazasi (HUD) va oy yorug'ligi ---
window.moonLight=function(){const mi=moonInfo(),d=days(),mv=moonVec(d),ml=Math.hypot(mv[0],mv[1],mv[2]),phi=wLat(P.y),lam=wLon(P.x),cp=Math.cos(phi),sl=Math.sin(phi),cl2=Math.cos(lam),sl2=Math.sin(lam);
  const nx=cp*cl2*S.m[0]+cp*sl2*S.ev[0]+sl*S.a[0],ny=cp*cl2*S.m[1]+cp*sl2*S.ev[1]+sl*S.a[1],nz=cp*cl2*S.m[2]+cp*sl2*S.ev[2]+sl*S.a[2];
  const el=(nx*mv[0]+ny*mv[1]+nz*mv[2])/ml;return Math.max(0,Math.min(1,el*3))*mi.k};
(function(){const h=document.getElementById('hud2');if(!h||document.getElementById('moonw'))return;
  const sep=document.createElement('br');const w=document.createElement('span');w.id='moonw';w.style.cssText='display:inline-flex;align-items:center;gap:.35em';
  const cv=document.createElement('canvas');cv.width=cv.height=16;cv.style.cssText='width:1.2em;height:1.2em;image-rendering:pixelated';const tx=document.createElement('span');w.appendChild(cv);w.appendChild(tx);h.appendChild(sep);h.appendChild(w);
  const g=cv.getContext('2d'),im=g.createImageData(16,16);let acc=9;
  window.moonHud=function(dt){acc+=dt;if(acc<1.5)return;acc=0;const mi=moonInfo(),d=im.data,tc=(1-2*mi.k);
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){const nx=(x+.5)/8-1,ny=(y+.5)/8-1,r2=nx*nx+ny*ny,k=(y*16+x)*4;if(r2>1){d[k+3]=0;continue}
      const xt=tc*Math.sqrt(1-ny*ny),lit=mi.wax?nx>xt:nx<-xt,mare=(Math.sin(x*1.7+y*.9)+Math.sin(y*2.3-x*.4))>1.2;
      if(lit){const c=mare?190:232;d[k]=c;d[k+1]=c;d[k+2]=c-12}else{d[k]=44;d[k+1]=50;d[k+2]=68}d[k+3]=255}
    g.putImageData(im,0,0);tx.textContent=mi.ph+' · '+Math.round(mi.k*100)+'%';w.title='Oy: '+mi.ph+' · yoshi '+mi.age.toFixed(1)+' kun'};
  window.moonHud(9)})();
})();
