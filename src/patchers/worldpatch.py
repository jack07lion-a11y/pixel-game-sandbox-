# Dunyo: 510 600 km2 (78x64 hujayra), uy = Душанбе (xarita aylantirilgan), tezlik keshi, lat/lon moslashuvi (qayta ishga tushirsa ham xavfsiz).
import re,os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));H=os.path.join(os.path.dirname(R),'index.html')
d=json.load(open(os.path.join(R,'earth','earth.json')))
src=open(H,encoding='utf-8').read()
def sub(old,new):
    global src
    if new in src:return
    assert src.count(old)==1,('COUNT',src.count(old),old[:90])
    src=src.replace(old,new)
def rsub(pat,new,flags=0):
    global src
    src,n=re.subn(pat,lambda m:new,src,count=1,flags=flags);assert n==1,('RSUB',pat[:70])
# o'lcham
rsub(r'const MCX=MSZ==5\?\d+:MSZ==4\?4:MSZ,MCY=MSZ==5\?\d+:MSZ==4\?3:MSZ,','const MCX=MSZ==5?78:MSZ==4?4:MSZ,MCY=MSZ==5?64:MSZ==4?3:MSZ,')
rsub(r'FZ=new Uint8Array\(\d+\),SNA=new Float32Array\(\d+\),HTA=new Float32Array\(\d+\),TRW=new Float32Array\(\d+\)','FZ=new Uint8Array(4096),SNA=new Float32Array(4096),HTA=new Float32Array(4096),TRW=new Float32Array(4096)')
rsub(r'SNA\[\(P\.y>>4\)&(?:511|2047|4095)\]','SNA[(P.y>>4)&4095]')
rsub(r'const MCL=Math\.max\(1,(?:Math\.min\(\d+,)?MCN\*LF\)?\);','const MCL=Math.max(1,Math.min(150,MCN*LF));')
# km: 510 600 km2 (shartli: haqiqiy 510 mln ning 1/1000 qismi)
if 'const AREA_KM2' not in src:
    rsub(r'const WKM=Math\.sqrt\(MCN\*100\*WW/WH\);const km=\(v,s\)=>\(v\*WKM/WW\)\.toFixed\(1\);','const AREA_KM2=510600,WKM=Math.sqrt(AREA_KM2*WW/WH);const km=(v,s)=>(v*WKM/WW).toFixed(1);')
sub("(MCN*100).toLocaleString('en').replace(/,/g,' ')","AREA_KM2.toLocaleString('en').replace(/,/g,' ')")
# mini-xarita ogir sikli
sub("for(let ty=0;ty<WH/16;ty++)for(let tx=0;tx<WW/16;tx++){const o=mpj(tx*16+8,ty*16+8);","for(let ty=0;ty<0;ty++)for(let tx=0;tx<WW/16;tx++){const o=mpj(tx*16+8,ty*16+8);")
# plitka xususiyatlari keshi
if 'const isW_=' not in src:
    for n,a in (('isP',"const isP=(a,b)=>{if(!PMD)return isP0(a,b);"),('isW',"const isW=(a,b)=>{if(!PMD)return isW0(a,b);"),('isBr',"const isBr=(a,b)=>{if(!PMD)return isBr0(b);"),('isOc',"const isOc=(a,b)=>{if(!PMD)return false;"),('biome',"const biome=(a,b)=>{if(!PMD)return biome0(a,b);")):
        assert src.count(a)==1,('KESH',n)
        src=src.replace(a,a.replace('const %s='%n,'const %s_='%n))
    src=src.replace("let LF=1;if(PMD)","/*KESH*//*KESHEND*/let LF=1;if(PMD)",1)
KESH="const cf=new Uint8Array(TXM*TYM),cI=new Uint8Array(TXM*TYM);\n"
for n,sh in (('isW',0),('isP',2),('isBr',4),('isOc',6)):
    KESH+="const %s=(a,b)=>{a=((a%%TXM)+TXM)%%TXM;b=((b%%TYM)+TYM)%%TYM;const k=b*TXM+a;let v=(cf[k]>>%d)&3;if(!v){v=%s_(a,b)?3:2;cf[k]|=v<<%d}return v==3};\n"%(n,sh,n,sh)
KESH+="const biome=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cI[k];if(!v){v=biome_(a,b)+1;cI[k]=v}return v-1};\n"
if '/*KESH*/' in src:
    src=re.sub(r'/\*KESH\*/.*?/\*KESHEND\*/',lambda m:'/*KESH*/'+KESH+'/*KESHEND*/',src,count=1,flags=re.S)
else:
    # eski (markersiz) blok
    src,n=re.subn(r'const cP=new Uint8Array.*?return v-1\};\n',lambda m:'/*KESH*/'+KESH+'/*KESHEND*/',src,count=1,flags=re.S);assert n==1,'eski kesh'
# yarim aniqlikdagi xaritani 2x silliq kattalashtirish
UP='''function upEarth(d){if(!d)return null;if(d.gx==GX&&d.gy==GY)return d;if(d.gx*2!=GX||d.gy*2!=GY)return null;
  const a=d.gx,b=d.gy,T=new Uint8Array(GX*GY),R=new Uint8Array(GX*GY),M=new Uint8Array(GX*GY),dT=d.T,dR=d.R,dM=d.M;
  for(let Y=0;Y<GY;Y++){const fy=(Y+.5)/2-.5,fl=Math.floor(fy),wy=fy-fl,y0=fl<0?0:fl,y1=Math.min(b-1,fl+1);
    for(let X=0;X<GX;X++){const fx=(X+.5)/2-.5,fx0=Math.floor(fx),wx=fx-fx0,x0=((fx0%a)+a)%a,x1=(x0+1)%a,
      i0=y0*a+x0,i1=y0*a+x1,i2=y1*a+x0,i3=y1*a+x1,w0=(1-wx)*(1-wy),w1=wx*(1-wy),w2=(1-wx)*wy,w3=wx*wy,
      l0=dT[i0]!=4,l1=dT[i1]!=4,l2=dT[i2]!=4,l3=dT[i3]!=4,lw=(l0?w0:0)+(l1?w1:0)+(l2?w2:0)+(l3?w3:0),o=Y*GX+X;
      if(lw>.5){let bw=-1,bt=0;if(l0&&w0>bw){bw=w0;bt=dT[i0]}if(l1&&w1>bw){bw=w1;bt=dT[i1]}if(l2&&w2>bw){bw=w2;bt=dT[i2]}if(l3&&w3>bw){bw=w3;bt=dT[i3]}T[o]=bt}else T[o]=4;
      const ni=(Y>>1)*a+(X>>1),r=dR[ni];R[o]=(T[o]==4&&r!=3&&r!=1)?0:r;if(!(X&1)&&!(Y&1))M[o]=dM[ni]}}
  return{gx:GX,gy:GY,T,R,M}}
'''
if 'function upEarth' not in src:
    sub("let PMD=null;try{","/*UPE*/"+UP+"/*UPEEND*/let PMD=null;try{")
else:
    src=re.sub(r'/\*UPE\*/.*?/\*UPEEND\*/',lambda m:'/*UPE*/'+UP+'/*UPEEND*/',src,count=1,flags=re.S)
sub("else if(on===null){const d=pmDec(MYMAP);","else if(on===null){const d=upEarth(pmDec(MYMAP));")
# geografik koordinatalar: Душанбе uy vodiysining markazida
GEO="const LONF=%r,LATF=%r;const wLon=x=>(((x/WW+LONF)%%1)+1)%%1*6.2831853,wFy=y=>(((y/WH+LATF)%%1)+1)%%1,wLat=y=>(.5-wFy(y))*2*LATR;\n"%(d['LONF'],d['LATF'])
if '/*GEO*/' in src:src=re.sub(r'/\*GEO\*/.*?/\*GEOEND\*/',lambda m:'/*GEO*/'+GEO+'/*GEOEND*/',src,count=1,flags=re.S)
else:sub("const LATR=1.3,GS=300,","/*GEO*/"+GEO+"/*GEOEND*/const LATR=1.3,GS=300,")
sub("const lon=wx/WW*6.2832,lat=(.5-wy/WH)*2*LATR,dl=lon-gLon","const lon=wLon(wx),lat=wLat(wy),dl=lon-gLon")
sub("const pLon=P.x/WW*6.2832,pLat=Math.max(-1,Math.min(1,(.5-P.y/WH)*2*LATR))*.75;","const pLon=wLon(P.x),pLat=Math.max(-1,Math.min(1,wLat(P.y)))*.75;")
sub("gLon=P.x/WW*6.2832+1.6;","gLon=wLon(P.x)+1.6;")
sub("const phi=(.5-(y+.5)/TYR)*2*LATR,T=Tlat(phi,S.dec,k)","const phi=wLat((y+.5)*16),T=Tlat(phi,S.dec,k)")
sub("phi=Math.max(-LATR,Math.min(LATR,(.5-P.y/WH)*2*LATR)),lam=P.x/WW*6.2831853;","phi=wLat(P.y),lam=wLon(P.x);")
sub("S.th0=S.ls-(P.x/WW*6.2831853)-.4;","S.th0=S.ls-wLon(P.x)-.4;")
sub("const phi=Math.max(-LATR,Math.min(LATR,(.5-P.y/WH)*2*LATR)),lam=P.x/WW*6.2831853,cp=","const phi=wLat(P.y),lam=wLon(P.x),cp=")
sub("wr=Math.min(TYR-1,(q*TYR)|0)","wr=Math.min(TYR-1,((((q-LATF)%1)+1)%1*TYR)|0)")
sub("{const lat=Math.abs(.5-P.y/WH)*2*LATR;","{const lat=Math.abs(wLat(P.y));")
# xarita matni: haqiqiy kenglik/uzunlik
rsub(r"'Siz: '\+km\(P\.x\)\+' km E · '\+km\(P\.y\)\+' km S  \|  '","'Siz: '+Math.abs(wLat(P.y)*57.2958).toFixed(2)+(wLat(P.y)>=0?'° sh.k.':'° j.k.')+' · '+(((wLon(P.x)*57.2958+180)%360)-180).toFixed(2)+'° sh.u.  |  '") if "'Siz: '+km(P.x)" in src else None
# texture: 1440x900, toza relyef; globus uchun geografik, tekis xarita uchun dunyo yo'nalishida
sub("TW=800,TH=500,","TW=1440,TH=900,")
sub("TH=Math.max(2,Math.round(TW*WH/WW));","TH=Math.max(2,Math.round(TW/1.6));")
sub("for(let v=0;v<TH;v++)for(let u=0;u<TW;u++){\n    const wx=","for(let v=0;v<(EIMG.complete&&EIMG.naturalWidth>0?0:TH);v++)for(let u=0;u<TW;u++){\n    const wx=")
src=re.sub(r"if\(EOK\)\{const w=document\.createElement\('canvas'\).*?TEX=w\}else TEX=c\}","TEX=c}",src,flags=re.S)
sub("TEX=c;TD=g.getImageData(0,0,TW,TH).data}","TD=g.getImageData(0,0,TW,TH).data;TEX=c}")
_UNUSED=("TD=g.getImageData(0,0,TW,TH).data;if(EOK){const w=document.createElement('canvas');w.width=TW;w.height=TH;const q=w.getContext('2d'),sx=Math.round(LONF*TW),sy=Math.round(LATF*TH);\n    for(const [dx,s0,wd] of [[0,sx,TW-sx],[TW-sx,0,sx]])for(const [dy,t0,ht] of [[0,sy,TH-sy],[TH-sy,0,sy]])if(wd>0&&ht>0)q.drawImage(c,s0,t0,wd,ht,dx,dy,wd,ht);TEX=w}else TEX=c}")
sub("st=='graze'||st=='peck'||st=='slide'?5:(Math.floor(a.fr)%4);","st=='graze'||st=='peck'||st=='slide'?5:(((Math.floor(a.fr)%4)+4)%4);")

# ---------- yo'l qidirish va navigatsiya keshi: katta dunyo uchun (oynali A*, bo'lakli kesh) ----------
NAV='''const NW=WW/16,NH=WH/16,navC=[new Map(),new Map()];
function freeC(tx,ty,m){if(tx<0||ty<0||tx>=NW||ty>=NH)return false;const M=navC[m?1:0],key=(ty>>6)*128+(tx>>6);let c=M.get(key);if(!c){c={v:new Int8Array(4096),s:new Int16Array(4096).fill(-1)};M.set(key,c)}
  const i=((ty&63)<<6)|(tx&63),v=Math.floor(time/3)%30000;if(c.s[i]!==v){c.s[i]=v;const x=tx*16+8,y=ty*16+8;c.v[i]=(blk(m,x,y)||blk(m,x-4,y)||blk(m,x+4,y))?0:1}return c.v[i]===1}
'''
FP='''function findPath(sx,sy,gx,gy,m){const cl=(v,mx)=>Math.min(mx-1,Math.max(0,v));let s=[cl(sx>>4,NW),cl(sy>>4,NH)],g=[cl(gx>>4,NW),cl(gy>>4,NH)];
  if(!freeC(g[0],g[1],m)){const n=nearFree(g[0],g[1],m);if(!n)return null;g=n}
  const PAD=70,ox=Math.max(0,Math.min(s[0],g[0])-PAD),oy=Math.max(0,Math.min(s[1],g[1])-PAD),ex=Math.min(NW-1,Math.max(s[0],g[0])+PAD),ey=Math.min(NH-1,Math.max(s[1],g[1])+PAD),W2=ex-ox+1,H2=ey-oy+1;
  if(W2*H2>1800000)return null;
  const N=W2*H2,gs=new Float32Array(N).fill(1e9),par=new Int32Array(N).fill(-1),cs=new Uint8Array(N),open=[],si=(s[1]-oy)*W2+(s[0]-ox),gi=(g[1]-oy)*W2+(g[0]-ox);
  const hh=(x,y)=>{const dx=Math.abs(x-g[0]),dy=Math.abs(y-g[1]);return Math.max(dx,dy)+.414*Math.min(dx,dy)};
  gs[si]=0;hpush(open,[hh(s[0],s[1]),si]);let it=0;
  while(open.length&&it++<9000){const ci=hpop(open)[1];if(cs[ci])continue;cs[ci]=1;if(ci==gi)break;const cx=ci%W2+ox,cy=((ci/W2)|0)+oy;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=cx+dx,ny=cy+dy;if(nx<ox||nx>ex||ny<oy||ny>ey)continue;if(!freeC(nx,ny,m))continue;if(dx&&dy&&(!freeC(cx+dx,cy,m)||!freeC(cx,cy+dy,m)))continue;
      const ni=(ny-oy)*W2+(nx-ox),ng=gs[ci]+(dx&&dy?1.414:1);if(ng<gs[ni]){gs[ni]=ng;par[ni]=ci;hpush(open,[ng+hh(nx,ny),ni])}}}
  if(par[gi]<0&&gi!=si)return null;
  const cells=[];for(let c=gi;c>=0;c=par[c]){cells.push([((c%W2)+ox)*16+8,(((c/W2)|0)+oy)*16+8]);if(c==si)break}cells.reverse();
  const pts=[[sx,sy]].concat(cells),out=[];let a=0;while(a<pts.length-1){let b=pts.length-1;while(b>a+1&&!los(pts[a],pts[b],m))b--;out.push(pts[b]);a=b}
  if(!blk(m,gx,gy)&&Math.hypot(gx-out[out.length-1][0],gy-out[out.length-1][1])<20)out.push([gx,gy]);return out}
'''
if 'navC=[new Map()' not in src:
    rsub(r'const NW=WW/16,NH=WH/16,nav0=new Int8Array\(NW\*NH\).*?\n(?=function freeC)',NAV.split('function freeC')[0]+'\n') if False else None
    i=src.index('const NW=WW/16,NH=WH/16,nav0=');j=src.index('function nearFree(')
    src=src[:i]+NAV+src[j:]
    sub("function navVerBump(){navS0.fill(-1);navS4.fill(-1)}","function navVerBump(){navC[0].clear();navC[1].clear()}")
if 'const PAD=70' not in src:
    i=src.index('function findPath(');j=src.index('function unstuck(')
    src=src[:i]+FP+src[j:]

# ---------- to'qnashuv to'ri: siyrak (Map) va qo'shimchali ----------
SG='''let sgN=-1,sgW=0,sgH=0,sg=new Map();const SGE=[];
function sgAddO(o){if(o.ox===undefined){o.ox=o.x;o.oy=o.y}const x0=Math.floor((o.ox-10)/48),x1=Math.floor((o.ox+o.w+10)/48),y0=Math.floor((o.oy-10)/48),y1=Math.floor((o.oy+o.h+10)/48);
  for(let j=y0;j<=y1;j++)for(let i=x0;i<=x1;i++)if(i>=0&&j>=0&&i<sgW&&j<sgH){const k=j*sgW+i;let a=sg.get(k);if(!a)sg.set(k,a=[]);a.push(o)}}
function sgBuild(){sgW=Math.ceil(WW/48)+2;sgH=Math.ceil(WH/48)+2;if(sgN<0||solids.length<sgN){sg=new Map();sgN=0}
  for(let n=sgN;n<solids.length;n++)sgAddO(solids[n]);sgN=solids.length}
'''
if 'function sgAddO' not in src:
    i=src.index('let sgN=-1,sgW=0,sgH=0,sg=null;');j=src.index('const hit=(x,y)=>')
    src=src[:i]+SG+src[j:]
    sub("const c=sg[j*sgW+i],bx=x-4,by=y-3;","const c=sg.get(j*sgW+i)||SGE,bx=x-4,by=y-3;")

# ---------- pw/pt: sinus jadvallari bilan tezlashtirish ----------
FASTW='''/*FASTW*/const TSA=[3,11,9,23].map(k=>{const s=new Float64Array(TXM),c=new Float64Array(TXM);for(let a=0;a<TXM;a++){const x=a/TXM*6.2832*k;s[a]=Math.sin(x);c[a]=Math.cos(x)}return[s,c]}),
  TSB=[8,21].map(k=>{const s=new Float64Array(TYM),c=new Float64Array(TYM);for(let b=0;b<TYM;b++){const x=b/TYM*6.2832*k;s[b]=Math.sin(x);c[b]=Math.cos(x)}return[s,c]}),
  TSB2=[[4,-1.3],[13,0]].map(([k,o])=>{const s=new Float64Array(TYM),c=new Float64Array(TYM);for(let b=0;b<TYM;b++){const x=b/TYM*6.2832*k+o;s[b]=Math.sin(x);c[b]=Math.cos(x)}return[s,c]}),
  TPA=[.5,.2,.35,.75].map(k=>{const s=new Float64Array(TXM),c=new Float64Array(TXM);for(let a=0;a<TXM;a++){s[a]=Math.sin(a*k);c[a]=Math.cos(a*k)}return[s,c]}),
  TPB=[.3,.8,.45,.25].map(k=>{const s=new Float64Array(TYM),c=new Float64Array(TYM);for(let b=0;b<TYM;b++){s[b]=Math.sin(b*k);c[b]=Math.cos(b*k)}return[s,c]});
const pI=(a,b)=>(b>>1)*GX+(a>>1),pw=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;if(a<60&&b<45)return -1;
  const s1=TSB[0][0][b]*TSA[0][1][a]+TSB[0][1][b]*TSA[0][0][a],s2=TSB[1][0][b]*TSA[1][1][a]-TSB[1][1][b]*TSA[1][0][a],
    s3=TSA[2][0][a]*TSB2[0][1][b]-TSA[2][1][a]*TSB2[0][0][b],s4=TSA[3][0][a]*TSB2[1][1][b]+TSA[3][1][a]*TSB2[1][0][b],
    u=a+Math.round(2.7*s1+1.3*s2),v=b+Math.round(2.7*s3+1.3*s4);return pI(((u%TXM)+TXM)%TXM,((v%TYM)+TYM)%TYM)};
const pt=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;if(a<60&&b<45)return -1;
  const p1=TPA[0][0][a]*TPB[0][1][b]+TPA[0][1][a]*TPB[0][0][b],p2=TPB[1][0][b]*TPA[1][1][a]-TPB[1][1][b]*TPA[1][0][a],
    p3=TPB[2][0][b]*TPA[2][1][a]-TPB[2][1][b]*TPA[2][0][a],p4=TPA[3][0][a]*TPB[3][1][b]+TPA[3][1][a]*TPB[3][0][b],
    u=a+Math.round(p1*1.1+p2*.9),v=b+Math.round(p3*1.1+p4*.9);return pI(((u%TXM)+TXM)%TXM,((v%TYM)+TYM)%TYM)};/*FASTWEND*/
'''
if '/*FASTW*/' not in src:
    i=src.index('const pI=(a,b)=>(b>>1)*GX+(a>>1),pw=');k=src.index('\n',src.index('const pt=(a,b)=>',i))
    src=src[:i]+FASTW.strip('\n')+src[k:]

# ---------- tekis xarita: haqiqiy geografik ko'rinish (kenglik/uzunlik to'ri) ----------
sub("for(let i=0;i<=WW;i+=960){const x=ox+i/WW*TW*s;gg.beginPath();gg.moveTo(x,oy);gg.lineTo(x,oy+TH*s);gg.stroke()}","for(let i=0;i<=360;i+=30){const x=ox+i/360*TW*s;gg.beginPath();gg.moveTo(x,oy);gg.lineTo(x,oy+TH*s);gg.stroke()}")
sub("for(let j=0;j<=WH;j+=720){const y=oy+j/WH*TH*s;gg.beginPath();gg.moveTo(ox,y);gg.lineTo(ox+TW*s,y);gg.stroke()}","for(let la=-60;la<=60;la+=30){const y=oy+(.5-la*.0174533/(2*LATR))*TH*s;gg.beginPath();gg.moveTo(ox,y);gg.lineTo(ox+TW*s,y);gg.stroke()}")
sub("const f=(x,y,c,l,p)=>{const X=ox+x/WW*TW*s,Y=oy+y/WH*TH*s;","const f=(x,y,c,l,p)=>{const X=ox+wLon(x)/6.2831853*TW*s,Y=oy+wFy(y)*TH*s;")
sub("X=ox+X/WW*TW*s;Y=oy+Y/WH*TH*s;i?gg.lineTo(X,Y):gg.moveTo(X,Y)","X=ox+wLon(X)/6.2831853*TW*s;Y=oy+wFy(Y)*TH*s;i?gg.lineTo(X,Y):gg.moveTo(X,Y)")
sub('SR:10,A:160,','SR:109.2,A:23455,')
sub('dayN=Math.max(0,Math.min(1,.5-sunV*1.2));','dayN=Math.max(0,Math.min(1,.5-sunV*1.2));if(dayN>0&&typeof moonLight==="function")dayN*=1-.3*moonLight();if(typeof moonHud==="function")moonHud(dt);')
# nomlar
src=src.replace("gMark(HOME[0],HOME[1],'#ffd23a','Biyon')","gMark(HOME[0],HOME[1],'#ffd23a','Dushanbe')").replace("f(HOME[0],HOME[1],'#ffd23a','Biyon')","f(HOME[0],HOME[1],'#ffd23a','Dushanbe')")
src=src.replace("rzShow('Biyon','Tinch vodiy · uy')","rzShow('Dushanbe','Tojikiston · uy')")
open(H,'w',encoding='utf-8').write(src);print('OK')
