// ---------- Dunyo xaritasi: globus va yassi xarita ----------
let gmOpen=false;
const gm=document.getElementById('gm'),gc=document.getElementById('gc'),gg=gc.getContext('2d');
let TD=null,TEX=null,TW=800,TH=500,gMode=0,gLon=0,gLat=.3,gZoom=1,gAnim=0,gTL=0,gTT=0,gPan=[0,0];
const LATR=1.3,GS=300,gb=document.createElement('canvas');gb.width=gb.height=GS;
const gbx=gb.getContext('2d'),gbi=gbx.createImageData(GS,GS),gbd=gbi.data;
const STARS=Array.from({length:140},()=>[Math.random(),Math.random(),Math.random()]);
function buildTex(){if(TEX)return;
  TH=Math.max(2,Math.round(TW*WH/WW));
  const c=document.createElement('canvas');c.width=TW;c.height=TH;const g=c.getContext('2d'),id=g.createImageData(TW,TH),d=id.data;
  const BC=[[93,150,72],[222,196,130],[232,240,246],[132,134,142]],PC=[[203,184,136],[202,166,106],[185,176,156],[142,132,120]],sx=WW/TW,sy=WH/TH;
  for(let v=0;v<TH;v++)for(let u=0;u<TW;u++){
    const wx=(u+.5)*sx,wy=(v+.5)*sy,tx=wx>>4,ty=wy>>4,bi=biome(tx,ty);let c3;
    if(isW(tx,ty))c3=bi==2?[190,225,238]:isBr(ty)?[140,100,60]:[58,130,190];
    else c3=isP(tx,ty)?PC[bi]:BC[bi];
    const sh=1+(nz(wx/22,wy/22)-nz(wx/22+1.1,wy/22+1.1))*.07+((hs(u,v)&7)-3.5)*.012,k=(v*TW+u)*4;
    d[k]=Math.min(255,c3[0]*sh);d[k+1]=Math.min(255,c3[1]*sh);d[k+2]=Math.min(255,c3[2]*sh);d[k+3]=255}
  g.putImageData(id,0,0);
  [[336,200,22]].concat(LK).forEach(l=>{g.fillStyle=l[3]?'#bfe0ee':'#3f86c4';g.beginPath();g.ellipse(l[0]/sx,l[1]/sy,Math.max(1.4,l[2]/sx),Math.max(1.4,l[2]/sy),0,0,6.3);g.fill()});
  g.globalAlpha=.7;trees.forEach(t=>{g.fillStyle=SPCOL[t[6]];g.fillRect(t[0]/sx|0,t[1]/sy|0,1,1)});g.globalAlpha=1;
  HS.forEach(h=>{g.fillStyle='#fff3d6';g.fillRect((h.x/sx|0)-1,(h.y/sy|0)-1,3,2);g.fillStyle='#b5503a';g.fillRect((h.x/sx|0)-1,(h.y/sy|0)-1,3,1)});
  TEX=c;TD=g.getImageData(0,0,TW,TH).data}
function gProj(wx,wy){const lon=wx/WW*6.2832,lat=(.5-wy/WH)*2*LATR,dl=lon-gLon,cl=Math.cos(gLat),sl=Math.sin(gLat),x1=Math.cos(lat)*Math.sin(dl),y1=Math.sin(lat),z1=Math.cos(lat)*Math.cos(dl);
  return[x1,y1*cl-z1*sl,y1*sl+z1*cl]}
function renderGlobe(t){
  const cl=Math.cos(gLat),sl=Math.sin(gLat),LX=-.45,LY=.5,LZ=.74,LL=Math.hypot(LX,LY,LZ);
  for(let py=0;py<GS;py++){const ny=1-(py+.5)/GS*2;for(let px=0;px<GS;px++){
    const nx=(px+.5)/GS*2-1,r2=nx*nx+ny*ny,k=(py*GS+px)*4;
    if(r2>=1){gbd[k+3]=0;continue}
    const nzv=Math.sqrt(1-r2),y1=ny*cl+nzv*sl,z1=-ny*sl+nzv*cl,lat=Math.asin(y1),lon=Math.atan2(nx,z1)+gLon;
    let R,G,B;
    if(lat>LATR||lat<-LATR){R=236;G=243;B=250}
    else{const u=(((lon/6.2832)%1+1)%1*TW)|0,v=Math.min(TH-1,((.5-lat/(2*LATR))*TH)|0),i=(v*TW+u)*4;R=TD[i];G=TD[i+1];B=TD[i+2]}
    let sh=.34+.8*Math.max(0,(nx*LX+ny*LY+nzv*LZ)/LL);sh*=.7+.3*nzv;
    const cd=Math.sin(lon*4+Math.sin(lat*5+t*.03)*1.6+t*.02)*Math.sin(lat*7-lon*2.3)*Math.sin(lon*9+lat*4+t*.05),ca=Math.min(.5,Math.max(0,cd-.2)*1.5);
    R=(R*(1-ca)+255*ca)*sh;G=(G*(1-ca)+255*ca)*sh;B=(B*(1-ca)+255*ca)*sh+ (1-nzv)*30;
    gbd[k]=R>255?255:R;gbd[k+1]=G>255?255:G;gbd[k+2]=B>255?255:B;gbd[k+3]=255}}
  gbx.putImageData(gbi,0,0)}
function gMark(x,y,col,label,pulse){const q=gProj(x,y);if(q[2]<=.02)return;const R=gR,sx=gcx+q[0]*R,sy=gcy-q[1]*R;
  gg.fillStyle='#000';gg.fillRect(sx-3,sy-3,6,6);gg.fillStyle=col;gg.fillRect(sx-2,sy-2,4,4);
  if(pulse){const r=6+(Math.sin(time*5)+1)*4;gg.strokeStyle=col;gg.lineWidth=1.5;gg.strokeRect(sx-r,sy-r,r*2,r*2)}
  if(label){gg.font='bold 12px monospace';gg.textAlign='left';gg.fillStyle='#000';gg.fillText(label,sx+9,sy+5);gg.fillStyle='#fff';gg.fillText(label,sx+8,sy+4)}}
let gR=100,gcx=0,gcy=0;
const km=(v,s)=>(v/960*10).toFixed(1);
function drawMap(){
  const w=gc.width,h=gc.height;gg.fillStyle='#02050c';gg.fillRect(0,0,w,h);
  STARS.forEach(s=>{gg.fillStyle='rgba(255,255,255,'+(.3+.5*s[2])+')';gg.fillRect(s[0]*w|0,s[1]*h|0,s[2]>.8?2:1,s[2]>.8?2:1)});
  const pLon=P.x/WW*6.2832,pLat=Math.max(-1,Math.min(1,(.5-P.y/WH)*2*LATR))*.75;
  if(gMode==0){
    if(gAnim){gLon+=(((pLon-gLon+9.4248)%6.2832)-3.1416)*.07;gLat+=(pLat-gLat)*.07;if(Math.abs(((pLon-gLon+9.4248)%6.2832)-3.1416)<.01)gAnim=0}
    gLat=Math.max(-1.3,Math.min(1.3,gLat));
    gcx=w/2;gcy=h/2+14;gR=Math.min(w,h)*.4*gZoom;
    renderGlobe(time);
    const gl=gg.createRadialGradient(gcx,gcy,gR*.96,gcx,gcy,gR*1.13);gl.addColorStop(0,'rgba(120,180,255,.5)');gl.addColorStop(1,'rgba(120,180,255,0)');gg.fillStyle=gl;gg.beginPath();gg.arc(gcx,gcy,gR*1.13,0,6.3);gg.fill();
    gg.imageSmoothingEnabled=false;gg.drawImage(gb,gcx-gR,gcy-gR,gR*2,gR*2);
    gMark(HOME[0],HOME[1],'#ffd23a','Biyon');
    if(!JZ.hid)gMark(JZ.x,JZ.y,'#3ad0ff','Jumanazar');
    gMark(P.x,P.y,'#ff4a4a','Siz',1)}
  else{
    const s=Math.min(w/TW,(h-90)/TH)*gZoom,ox=(w-TW*s)/2+gPan[0],oy=(h-TH*s)/2+gPan[1]+20;
    gg.imageSmoothingEnabled=false;gg.drawImage(TEX,ox,oy,TW*s,TH*s);
    gg.strokeStyle='rgba(255,255,255,.14)';gg.lineWidth=1;
    for(let i=0;i<=WW;i+=960){const x=ox+i/WW*TW*s;gg.beginPath();gg.moveTo(x,oy);gg.lineTo(x,oy+TH*s);gg.stroke()}
    for(let j=0;j<=WH;j+=720){const y=oy+j/WH*TH*s;gg.beginPath();gg.moveTo(ox,y);gg.lineTo(ox+TW*s,y);gg.stroke()}
    gg.strokeStyle='#fff';gg.lineWidth=2;gg.strokeRect(ox,oy,TW*s,TH*s);
    const f=(x,y,c,l,p)=>{const X=ox+x/WW*TW*s,Y=oy+y/WH*TH*s;gg.fillStyle='#000';gg.fillRect(X-3,Y-3,6,6);gg.fillStyle=c;gg.fillRect(X-2,Y-2,4,4);
      if(p){const r=6+(Math.sin(time*5)+1)*4;gg.strokeStyle=c;gg.lineWidth=1.5;gg.strokeRect(X-r,Y-r,r*2,r*2)}
      if(l){gg.font='bold 12px monospace';gg.textAlign='left';gg.fillStyle='#000';gg.fillText(l,X+9,Y+5);gg.fillStyle='#fff';gg.fillText(l,X+8,Y+4)}};
    f(HOME[0],HOME[1],'#ffd23a','Biyon');if(!JZ.hid)f(JZ.x,JZ.y,'#3ad0ff','Jumanazar');f(P.x,P.y,'#ff4a4a','Siz',1);
    // ko'rinish maydoni
    const q=(sx,sy)=>{const a=cam.x+sx,b=2*(cam.y+sy);return[(a+b)/2,(b-a)/2]};
    const c=[q(0,0),q(W,0),q(W,H),q(0,H)],base=[P.x-c[0][0]/1,P.y-c[0][1]];
    gg.strokeStyle='#fff';gg.lineWidth=1;gg.beginPath();c.forEach((p,i)=>{let X=p[0],Y=p[1];X+= (Math.round((P.x-X)/WW)*WW);Y+=(Math.round((P.y-Y)/WH)*WH);X=ox+X/WW*TW*s;Y=oy+Y/WH*TH*s;i?gg.lineTo(X,Y):gg.moveTo(X,Y)});gg.closePath();gg.stroke()}
  gg.textAlign='left';gg.font='bold 13px monospace';gg.fillStyle='#fff';
  gg.fillText('DUNYO XARITASI · '+(MCN*100).toLocaleString('en').replace(/,/g,' ')+' km²',14,24);
  gg.font='12px monospace';gg.fillStyle='#bcd';gg.fillText('Siz: '+km(P.x)+' km E · '+km(P.y)+' km S  |  '+(WW/96).toFixed(0)+'×'+(WH/96).toFixed(0)+' km · Dunyo yumaloq: chetidan o‘tsangiz, qarama-qarshi tomondan chiqasiz',14,42);
  const lg=[['#5d9648','Dasht'],['#dec482','Cho‘l'],['#e8f0f6','Qor'],['#84868e','Tosh'],['#3a82c0','Suv'],['#cbb888','Yo‘l']];
  lg.forEach((l,i)=>{gg.fillStyle=l[0];gg.fillRect(14+i*66,h-26,10,10);gg.fillStyle='#cdd';gg.fillText(l[1],28+i*66,h-17)})}
function gSize(){gc.width=innerWidth;gc.height=innerHeight}
function toggleMap(){gmOpen=!gmOpen;gm.style.display=gmOpen?'block':'none';if(gmOpen){buildTex();gSize();gAnim=1;gLon=P.x/WW*6.2832+1.6;gZoom=1;gPan=[0,0]}}
addEventListener('resize',()=>{if(gmOpen)gSize()});
addEventListener('keydown',e=>{if(e.key=='m'||e.key=='M')toggleMap();else if(e.key=='Escape'&&gmOpen)toggleMap()});
document.getElementById('mm').style.pointerEvents='auto';document.getElementById('mm').onpointerdown=e=>{e.stopPropagation();e.preventDefault();toggleMap()};
gm.onpointerdown=e=>e.stopPropagation();
document.getElementById('gx').onpointerdown=e=>{e.stopPropagation();e.preventDefault();toggleMap()};
document.getElementById('gs').onpointerdown=e=>{e.stopPropagation();e.preventDefault();gMode^=1;gZoom=1;gPan=[0,0];if(gMode==0)gAnim=1};
document.getElementById('gp').onpointerdown=e=>{e.stopPropagation();e.preventDefault();gZoom=Math.min(4,gZoom*1.3)};
document.getElementById('gq').onpointerdown=e=>{e.stopPropagation();e.preventDefault();gZoom=Math.max(.5,gZoom/1.3)};
const gPt=new Map();let gPD=0;
gc.onpointerdown=e=>{gc.setPointerCapture(e.pointerId);gPt.set(e.pointerId,[e.clientX,e.clientY]);gAnim=0;if(gPt.size==2){const a=[...gPt.values()];gPD=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])}};
gc.onpointermove=e=>{const o=gPt.get(e.pointerId);if(!o)return;const nx=e.clientX,ny=e.clientY;
  if(gPt.size==2){gPt.set(e.pointerId,[nx,ny]);const a=[...gPt.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(gPD>0)gZoom=Math.max(.5,Math.min(4,gZoom*d/gPD));gPD=d;return}
  const dx=nx-o[0],dy=ny-o[1];gPt.set(e.pointerId,[nx,ny]);
  if(gMode==0){gLon-=dx/gR*1.4/Math.max(.3,Math.cos(gLat));gLat=Math.max(-1.3,Math.min(1.3,gLat+dy/gR*1.2))}else{gPan[0]+=dx;gPan[1]+=dy}};
gc.onpointerup=gc.onpointercancel=e=>{gPt.delete(e.pointerId);gPD=0};
gc.onwheel=e=>{e.preventDefault();gZoom=Math.max(.5,Math.min(4,gZoom*(e.deltaY<0?1.12:1/1.12)))};
