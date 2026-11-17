// ---------- GTA uslubidagi mini-radar: faqat atrofni yaqin masshtabda ko'rsatadi; bosilsa — dunyo xaritasi (globus) ----------
(function(){
  const RD=168,K=4.2,R2=(RD/2)*(RD/2),CX=RD/2;
  mm.width=RD;mm.height=RD;mm.style.imageRendering='pixelated';
  const g=mm.getContext('2d'),img=g.createImageData(RD,RD),D32=new Uint32Array(img.data.buffer);
  const TXn=WW/16,TYn=WH/16,memo=new Map();
  const pack=(r,gg,b)=>(255<<24)|((b|0)<<16)|((gg|0)<<8)|(r|0);
  const parse=s=>{if(s[0]=='#')return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const m=s.match(/\d+/g);return[+m[0],+m[1],+m[2]]};
  const GR=['#4e9a36','#dcc48c','#eef3f8','#7e7f86'],PA=['#bda375','#c2a06a','#bcb3a2','#8a8076'];
  function tcol(tx,ty){
    const bi=biome(tx,ty);let c;
    if(isW(tx,ty)){
      if(isBr(tx,ty))c=[150,105,62];
      else if(bi==2||FZ[ty]==1)c=[200,226,238];
      else if(isOc(tx,ty)){c=typeof odl==='function'?[[92,191,200],[53,151,198],[36,103,166],[23,71,133]][odl(tx,ty)]:[26,82,140]}
      else c=[52,126,176]}
    else if(isP(tx,ty))c=parse(PA[bi]);
    else{c=parse(rzMM(GR[bi],tx,ty));if(SNA[ty]>.3&&bi!=2){const a=SNA[ty];c=[c[0]*(1-a)+240*a,c[1]*(1-a)+245*a,c[2]*(1-a)+250*a]}}
    const h=hs(tx,ty);const j=1+(((h&15)-7.5)/7.5)*.05;
    return[c[0]*j,c[1]*j,c[2]*j]}
  const px=(i,c)=>{D32[i]=pack(c[0],c[1],c[2])};
  function dot(ox,oy,w,h,c){for(let y=0;y<h;y++){const Y=Math.round(oy)+y;if(Y<0||Y>=RD)continue;for(let x=0;x<w;x++){const X=Math.round(ox)+x;if(X<0||X>=RD)continue;const dx=X-CX+.5,dy=Y-CX+.5;if(dx*dx+dy*dy>R2)continue;px(Y*RD+X,c)}}}
  const wr=(v,M)=>{v=v%M;if(v>M/2)v-=M;else if(v<-M/2)v+=M;return v};
  // dunyo (dx,dy) ofsetini radar pikseliga o'giradi (o'yin ekrani yo'nalishi bilan bir xil: yuqori = yuqori)
  const toR=(dx,dy)=>{const xs=dx-dy,ys=(dx+dy)/2;return[CX+xs/K,CX+ys*2/K]};
  const RAD=K*RD/2*1.0;
  window.mmDraw=mmDraw=function(){
    const px0=P.x,py0=P.y;
    for(let y=0;y<RD;y++){const oy=y-CX+.5;for(let x=0;x<RD;x++){const ox=x-CX+.5,i=y*RD+x;
      if(ox*ox+oy*oy>R2){D32[i]=0;continue}
      const dx=K*(ox+oy)/2,dy=K*(oy-ox)/2;
      let wx=px0+dx,wy=py0+dy;wx-=Math.floor(wx/WW)*WW;wy-=Math.floor(wy/WH)*WH;
      const tx=wx>>4,ty=wy>>4,key=ty*TXn+tx;let c=memo.get(key);
      if(!c){c=tcol(tx,ty);if(memo.size>60000)memo.clear();memo.set(key,c)}
      let r=c[0],gg=c[1],b=c[2];
      if(c[2]>c[0]+40&&c[2]>c[1]){const s=Math.sin(time*2+(x*.9)+(y*1.3))*Math.sin(time*1.3-x*.5+y*.7);if(s>.82){r+=40;gg+=46;b+=40}}
      const e=(ox*ox+oy*oy)/R2;if(e>.8){const f=1-(e-.8)*1.1;r*=f;gg*=f;b*=f}
      D32[i]=pack(r>255?255:r,gg>255?255:gg,b>255?255:b)}}
    // daraxtlar
    for(let n=0;n<trees.length;n++){const t=trees[n];const dx=wr(t[0]-px0,WW),dy=wr(t[1]-py0,WH);if(dx>RAD||dx<-RAD||dy>RAD||dy<-RAD)continue;
      const q=toR(dx,dy);if(t[4]&&t[4].st!==0&&t[4].st!==undefined)continue;dot(q[0]-1,q[1]-1,2,2,parse(SPCOL[t[6]]||'#2d6a34').map(v=>v*.8))}
    // uylar
    HS.forEach(h=>{const dx=wr(h.x+28-px0,WW),dy=wr(h.y+13-py0,WH);if(Math.abs(dx)>RAD||Math.abs(dy)>RAD)return;const q=toR(dx,dy);dot(q[0]-3,q[1]-2,7,5,[70,40,36]);dot(q[0]-3,q[1]-3,7,3,[176,78,58]);dot(q[0]-3,q[1]-3,7,1,[214,120,92])});
    // tangalar, hayvonlar, odamlar
    if(typeof coins!=='undefined')coins.forEach(c=>{if(!c.on)return;const dx=wr(c.x-px0,WW),dy=wr(c.y-py0,WH);if(Math.abs(dx)>RAD||Math.abs(dy)>RAD)return;const q=toR(dx,dy);dot(q[0]-1,q[1]-1,2,2,[255,214,60])});
    const mark=(o,col,s)=>{const dx=wr(o.x-px0,WW),dy=wr(o.y-py0,WH);if(Math.abs(dx)>RAD||Math.abs(dy)>RAD)return;const q=toR(dx,dy);dot(q[0]-s,q[1]-s,s*2+1,s*2+1,[0,0,0]);dot(q[0]-s+1,q[1]-s+1,s*2-1,s*2-1,col)};
    DM.forEach(d=>{if(d.dead<=0)mark(d,[230,70,56],1)});
    AN.forEach(a=>{if(a.pet)mark(a,[90,255,140],1)});
    SC.forEach(c=>{if(c.open)mark(c,[255,226,122],2)});
    if(CV[0].open)CV.forEach(c=>mark(c,[180,138,255],2));
    if(!JZ.hid)mark(JZ,[58,208,255],2);
    // ekran ko'rinish maydoni (kamera)
    const vw=W/2/K*1,vh=H/K;const rx0=Math.round(CX-vw),rx1=Math.round(CX+vw),ry0=Math.round(CX-vh),ry1=Math.round(CX+vh);
    const wl=(x,y)=>{if(x<0||y<0||x>=RD||y>=RD)return;const dx=x-CX+.5,dy=y-CX+.5;if(dx*dx+dy*dy>R2)return;const i=y*RD+x,v=D32[i];D32[i]=pack(((v&255)+255)>>1,(((v>>8)&255)+255)>>1,(((v>>16)&255)+255)>>1)};
    for(let x=rx0;x<=rx1;x++){wl(x,ry0);wl(x,ry1)}for(let y=ry0;y<=ry1;y++){wl(rx0,y);wl(rx1,y)}
    // o'yinchi
    const bl=Math.sin(time*8)>0;dot(CX-3,CX-3,6,6,[0,0,0]);dot(CX-2,CX-2,4,4,bl?[255,255,255]:[255,226,122]);dot(CX-1,CX-1,2,2,[230,50,50]);
    g.putImageData(img,0,0)};
  mm.style.cursor='pointer';
})();
