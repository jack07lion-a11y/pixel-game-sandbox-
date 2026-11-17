// ===== DUNYO USLUBI (video uslubi): balandlik pog'onalari, qirg'oq ko'pigi, qumli sohil, voksel bulutlar va ularning soyasi =====
(function(){
  // balandlik massivi (yarim aniqlik -> 2x silliq)
  let EL=null;
  try{const raw=atob(EARTH_EL),a=GX>>1,b=GY>>1,H=new Uint8Array(a*b);let p=0;for(let i=0;i+1<raw.length&&p<H.length;i+=2){const v=raw.charCodeAt(i),n=raw.charCodeAt(i+1);for(let k=0;k<n&&p<H.length;k++)H[p++]=v}
    EL=new Uint8Array(GX*GY);
    for(let Y=0;Y<GY;Y++){const fy=(Y+.5)/2-.5,fl=Math.floor(fy),wy=fy-fl,y0=fl<0?0:fl,y1=Math.min(b-1,fl+1);
      for(let X=0;X<GX;X++){const fx=(X+.5)/2-.5,f0=Math.floor(fx),wx=fx-f0,x0=((f0%a)+a)%a,x1=(x0+1)%a;
        EL[Y*GX+X]=Math.round((H[y0*a+x0]*(1-wx)+H[y0*a+x1]*wx)*(1-wy)+(H[y1*a+x0]*(1-wx)+H[y1*a+x1]*wx)*wy)}}
  }catch(e){console.warn('balandlik',e);EL=null}
  window.elb=(tx,ty)=>{if(!EL)return 2;const i=pt(tx,ty);return i<0?2:EL[i]};
  const hx=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
  const ramp=(a,b,n)=>Array.from({length:n},(_,i)=>{const t=i/(n-1);return '#'+[0,1,2].map(k=>Math.round(a[k]+(b[k]-a[k])*t).toString(16).padStart(2,'0')).join('')});
  const PAL=[ramp([170,224,92],[44,100,40],12),ramp([248,226,154],[168,140,88],12),ramp([255,255,255],[190,212,238],12),ramp([178,160,136],[110,96,90],12)];
  const KIND=['grass','sand','snow','rock'];
  const TLB=PAL.map((a,b)=>a.map((col,k)=>[0,1,2].map(v=>{const cv=document.createElement('canvas');cv.width=32;cv.height=16;__paintTile(cv,col,KIND[b],b*100+k*7+v+300);return cv})));
  window.TLB=TLB;
  const nearW=(tx,ty)=>isW(tx-1,ty)||isW(tx+1,ty)||isW(tx,ty-1)||isW(tx,ty+1);
  window.styTile=(bi,tx,ty,h)=>{const b=elb(tx,ty);if(bi==0&&b<=1&&nearW(tx,ty))return TLB[1][1][h%3];return TLB[bi][b][h%3]};
  // pog'ona chekkalari: past qo'shni tomonga qorong'i chiziq
  window.cliffEdge=(tx,ty,X,Y)=>{const b=elb(tx,ty);const l=elb(tx,ty+1),r=elb(tx+1,ty),lw=l<b&&!isW(tx,ty+1),rw=r<b&&!isW(tx+1,ty);if(!lw&&!rw)return;
    ctx.fillStyle='rgba(18,40,24,.42)';
    for(let q=0;q<8;q++){const w=4*(q+1),L=X+16-w/2,RR=X+16+w/2-4;if(lw)ctx.fillRect(L,Y+15-q,4,1);if(rw)ctx.fillRect(RR,Y+15-q,4,1)}};
  // qirg'oq ko'pigi: jonli oq-fayruza
  window.foamCol=()=>{const k=(Math.sin(time*2.4)+1)*.5;return 'rgba('+(236+k*16|0)+','+(250+k*5|0)+',255,'+(.72+k*.22).toFixed(2)+')'};
  // ---- bulutlar (voksel) ----
  const CS=16,ALT=96,LV=['#bccfec','#d6e4f8','#ecf3ff','#ffffff'];
  const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));return c};
  const dia=(g,col,x0,y0)=>{g.fillStyle=col;for(let r=0;r<16;r++){const w=Math.round((r<8?r+1:16-r)*4);g.fillRect(x0+16-w/2,y0+r,w,1)}};
  const DIA=LV.map((c,k)=>mk(32,16,g=>{dia(g,c,0,0);g.fillStyle='rgba(255,255,255,.55)';for(let r=0;r<8;r++){const w=(r+1)*4;g.fillRect(16-w/2,r,2,1);g.fillRect(16+w/2-2,r,2,1)}
    g.fillStyle='rgba(90,120,170,.35)';for(let r=8;r<16;r++){const w=(16-r)*4;g.fillRect(16-w/2,r,2,1);g.fillRect(16+w/2-2,r,2,1)}}));
  const SH=mk(32,16,g=>dia(g,'#0a2050',0,0));
  const hv=(i,j)=>{let h=(Math.imul(i,374761393)+Math.imul(j,668265263))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296};
  const vn=(x,y)=>{const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy),a=hv(i,j),b=hv(i+1,j),c=hv(i,j+1),d=hv(i+1,j+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
  const cval=(i,j)=>{const x=i*.062+time*.03,y=j*.062+time*.008;return .62*vn(x,y)+.38*vn(x*2.6+11,y*2.6+5)+(hv(i,j)-.5)*.035};
  const lev=v=>v<.665?0:Math.min(4,Math.ceil((v-.665)/.032));
  function cells(){const out=[],R=Math.ceil((W/2+H+ALT*2+80)/CS),ci=Math.floor(RX/CS),cj=Math.floor(RY/CS);
    for(let j=cj-R;j<=cj+R;j++)for(let i=ci-R;i<=ci+R;i++){const L=lev(cval(i,j));if(!L)continue;const o=pj(i*CS+CS/2,j*CS+CS/2);
      if(o[0]<-70||o[0]>W+70||o[1]-ALT<-60||o[1]>H+60)continue;out.push([o[0],o[1],L,i,j])}
    return out}
  window.cloudShadows=()=>{if(window.NOCLOUD)return;const cs=cells();ctx.globalAlpha=.2;for(const c of cs)ctx.drawImage(SH,c[0]-16+26,c[1]-8+10);ctx.globalAlpha=1};
  window.cloudDraw=()=>{if(window.NOCLOUD)return;const cs=cells(),po=pj(P.x,P.y),night=Math.min(1,dayN*.7);cs.sort((a,b)=>a[1]-b[1]||a[0]-b[0]);
    for(const c of cs){const dx=c[0]-po[0],dy=(c[1]-ALT)-(po[1]-14),near=Math.hypot(dx,dy)<96?.22:1;ctx.globalAlpha=(.94-night*.45)*near;
      for(let k=0;k<c[2];k++)ctx.drawImage(DIA[Math.min(k,3)],c[0]-16,c[1]-ALT-k*4-8)}
    ctx.globalAlpha=1};
  const xg=window.xGround;window.xGround=function(){xg();cloudShadows()};
})();
