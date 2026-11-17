// ===== HD QAHRAMON: 2x aniqlikdagi (kichik piksel) sprayt, qalin to'q-ko'k kontur, 4 tonli soya =====
(function(){
  if(typeof mk!=='function'||typeof SW==='undefined')return;
  const rd=Math.round;
  const hR=(g,x,y,w,h,dx=0,dy=0)=>g.fillRect(rd(x*2)+dx*2,rd(y*2)+dy*2,w*2,h*2);
  const hL=(g,x1,y1,x2,y2,t,dx=0,dy=0)=>{const n=Math.max(Math.abs(x2-x1),Math.abs(y2-y1),1)*4;for(let i=0;i<=n;i++)g.fillRect(rd((x1+(x2-x1)*i/n)*2)+dx*2,rd((y1+(y2-y1)*i/n)*2)+dy*2,t*2,t*2)};
  const hE=(g,cx,cy,rx,ry,dx=0,dy=0)=>{cx=rd(cx*2);cy=rd(cy*2);rx*=2;ry*=2;for(let y=-ry;y<=ry;y++){const w=rd(rx*Math.sqrt(1-y*y/(ry*ry+.01)));g.fillRect(cx-w+dx*2,cy+y+dy*2,w*2+1,1)}};
  const hP=(g,pp,dx=0,dy=0)=>{const q=pp.map(p=>[rd(p[0]*2),rd(p[1]*2)]);let a=1e9,b=-1e9;q.forEach(p=>{a=Math.min(a,p[1]);b=Math.max(b,p[1])});
    for(let y=a;y<=b;y++){const xs=[];for(let i=0;i<q.length;i++){const p=q[i],r=q[(i+1)%q.length];if((p[1]<=y&&r[1]>y)||(r[1]<=y&&p[1]>y))xs.push(p[0]+(y-p[1])/(r[1]-p[1])*(r[0]-p[0]))}
      xs.sort((m,n)=>m-n);for(let i=0;i+1<xs.length;i+=2)g.fillRect(rd(xs[i])+dx*2,y+dy*2,Math.max(1,rd(xs[i+1])-rd(xs[i])),1)}};
  // 4 tonli soya: asos (eng qorong'i) -> o'rta -> yorug' -> yaltirash
  const hshade=(S,ramp,k,draw)=>{const w=SW*2,h=SH*2;
    const A=mkc(w,h),a=A.getContext('2d');a.fillStyle=ramp[3]||ramp[2];draw(a,0,0);
    a.globalCompositeOperation='source-atop';a.fillStyle=ramp[2];draw(a,-k*.5,-k*.5);
    a.fillStyle=ramp[1];draw(a,-k,-k);
    const B=mkc(w,h),b=B.getContext('2d');b.fillStyle=ramp[0];draw(b,-k,-k);b.globalCompositeOperation='destination-out';draw(b,k*.5,k*.5);
    a.drawImage(B,0,0);S.drawImage(A,0,0)};
  // qalin kontur (2 px), kontur rangi to'q-ko'k
  const houtline=src=>{const w=SW*2,h=SH*2,o=mkc(w,h),g=o.getContext('2d');
    [[-2,0],[2,0],[0,-2],[0,2],[-1,-1],[1,-1],[-1,1],[1,1],[-2,-1],[-2,1],[2,-1],[2,1],[-1,-2],[1,-2],[-1,2],[1,2]].forEach(([x,y])=>g.drawImage(src,x,y));
    g.globalCompositeOperation='source-in';g.fillStyle='#10102a';g.fillRect(0,0,w,h);g.globalCompositeOperation='source-over';g.drawImage(src,0,0);return o};
  Object.assign(window,{hR,hL,hE,hP,hshade,houtline});
  let s=mk.toString().replace(/\bsR\(/g,'hR(').replace(/\bsL\(/g,'hL(').replace(/\bsE\(/g,'hE(').replace(/\bsP\(/g,'hP(').replace(/shade\(S,/g,'hshade(S,').replace(/return outline\(o\)/,'return houtline(o)').replace('mkc(SW,SH)','mkc(SW*2,SH*2)');
  s=s.replace(/^function mk\(/,'function mkH(');
  let mkH;try{mkH=(0,eval)('('+s+')')}catch(e){console.warn('HD qahramon',e);return}
  // yuz tafsilotlari: bosh yuqori qismidagi sochga yorug' chiziq (HD)
  try{window.sprH=[0,1,2,3,4].map(d=>Array.from({length:17},(_,f)=>mkH(d,f)));window.sprHC=[0,1,2,3,4].map(d=>Array.from({length:8},(_,f)=>mkH(d,f,1)))}catch(e){console.warn('HD sprayt',e);window.sprH=null}

  // ---- tafsilot o'tkazmasi: yuz (ko'z, qosh, burun, og'iz), soch yaltirashi, ko'ylak burmalari, shim chizig'i ----
  const isSkin=(r,g,b,a)=>a>200&&r>150&&r<250&&g>100&&g<200&&b>70&&b<170&&r>g+14&&g>b+8;
  const isHair=(r,g,b,a)=>a>200&&r<86&&g<70&&b<60&&r>=g&&g>=b-4&&r+g+b>20;
  const isShirt=(r,g,b,a)=>a>200&&r>90&&g<90&&b<110&&r>g+40&&r>b+20;
  const isPant=(r,g,b,a)=>a>200&&r<80&&g<80&&b<90&&Math.abs(r-g)<14&&b>=r&&r+g+b>70;
  function detail(cv,d,civ,f){const w=cv.width,h=cv.height,g=cv.getContext('2d'),im=g.getImageData(0,0,w,h),D=im.data;
    const px=(x,y)=>{const i=(y*w+x)*4;return[D[i],D[i+1],D[i+2],D[i+3]]},set=(x,y,c)=>{if(x<0||y<0||x>=w||y>=h)return;const i=(y*w+x)*4;D[i]=c[0];D[i+1]=c[1];D[i+2]=c[2];D[i+3]=255};
    const mat=(x,y,fn)=>{if(x<0||y<0||x>=w||y>=h)return false;const c=px(x,y);return fn(c[0],c[1],c[2],c[3])};
    // yuz chegarasi
    let x0=1e9,x1=-1,y0=1e9,y1=-1;for(let y=0;y<h*.5;y++)for(let x=0;x<w;x++)if(mat(x,y,isSkin)){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
    if(x1>=0&&y1-y0>=4){const cx=(x0+x1)>>1,fw=x1-x0,fh=y1-y0,ey=y0+Math.round(fh*.34),ink=[22,14,18],wh=[250,246,240],ps=[28,18,14],br=[40,26,20],sk2=[150,98,78];
      const eye=(ex,flip)=>{ // ko'z: oq + qorachiq + qovoq chizig'i
        for(let dy=0;dy<4;dy++)for(let dx=0;dx<5;dx++)if(mat(ex+dx,ey+dy,isSkin))set(ex+dx,ey+dy,wh);
        const pxp=ex+(flip?1:2);for(let dy=0;dy<4;dy++)for(let dx=0;dx<2;dx++)set(pxp+dx,ey+dy,ps);set(pxp,ey,[250,250,250]);
        for(let dx=-1;dx<6;dx++)set(ex+dx,ey-1,ink)};
      const brow=(bx,tilt)=>{for(let dx=0;dx<6;dx++)for(let t=0;t<2;t++)set(bx+dx,ey-4-t+(tilt>0?Math.floor((5-dx)/3):Math.floor(dx/3)),br)};
      if(d===0||d===3||d===1&&false){const shift=d===3?Math.round(fw*.12):0,sp=Math.max(5,Math.round(fw*.28));
        eye(cx-sp-2+shift,0);eye(cx+sp-3+shift,1);brow(cx-sp-3+shift,1);brow(cx+sp-3+shift,-1);
        for(let dy=0;dy<3;dy++)set(cx+shift,ey+7+dy,sk2),set(cx+shift+1,ey+9,[120,70,58]); // burun
        for(let dx=0;dx<5;dx++)set(cx-2+dx+shift,ey+13,[132,66,56]);
        set(cx-sp-3+shift,ey+9,[226,120,110]);set(cx+sp+shift,ey+9,[226,120,110])}
      else if(d===2){const ex=x1-8;eye(ex,1);brow(ex-1,-1);for(let dy=0;dy<3;dy++)set(x1-1,ey+7+dy,[236,184,156]);for(let dx=0;dx<4;dx++)set(x1-6+dx,ey+13,[132,66,56]);for(let dy=0;dy<4;dy++)set(x0+6,ey+4+dy,sk2)}
    }
    // soch yaltirashi (yorug' chiziqlar) va uchlari
    {let hx0=1e9,hx1=-1,hy0=1e9;for(let y=0;y<h*.45;y++)for(let x=0;x<w;x++)if(mat(x,y,isHair)){hx0=Math.min(hx0,x);hx1=Math.max(hx1,x);hy0=Math.min(hy0,y)}
      if(hx1>0){const hl=[96,70,52],hl2=[132,98,74];for(let k=0;k<3;k++){const sx=hx0+4+k*Math.round((hx1-hx0)*.22),sy=hy0+2+k%2;for(let t=0;t<7;t++){const x=sx+t,y=sy+Math.floor(t/3);if(mat(x,y,isHair))set(x,y,t<4?hl2:hl)}}
        for(let x=hx0+3;x<hx1-2;x+=5)if(mat(x,hy0+1,isHair))set(x,hy0,[40,26,20])}}
    // ko'ylak burmalari
    {let sy0=1e9,sy1=-1,sx0=1e9,sx1=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(mat(x,y,isShirt)){sy0=Math.min(sy0,y);sy1=Math.max(sy1,y);sx0=Math.min(sx0,x);sx1=Math.max(sx1,x)}
      if(sy1>0){const dk=[84,16,40],lt=[210,84,112];for(let t=0;t<6;t++){const x=sx0+3+t,y=sy0+6+Math.floor(t*.7);if(mat(x,y,isShirt))set(x,y,dk);const x2=sx1-4-t,y2=sy0+9+Math.floor(t*.6);if(mat(x2,y2,isShirt))set(x2,y2,dk)}
        for(let t=0;t<5;t++){const x=sx0+3+t,y=sy0+2;if(mat(x,y,isShirt))set(x,y,lt)}
        // yoqa (oq)
        for(let x=sx0+Math.round((sx1-sx0)*.35);x<sx0+Math.round((sx1-sx0)*.65);x++){if(mat(x,sy0,isShirt)||mat(x,sy0+1,isShirt))set(x,sy0+1,[238,232,222])}}}
    // shim chizig'i
    {let py0=1e9,py1=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(mat(x,y,isPant)){py0=Math.min(py0,y);py1=Math.max(py1,y)}
      if(py1>0)for(let x=0;x<w;x++){const ys=[];for(let y=py0;y<=py1;y++)if(mat(x,y,isPant))ys.push(y);if(ys.length>8&&x%2==0){const y=ys[Math.floor(ys.length*.4)];set(x,y,[36,36,52])}}}
    g.putImageData(im,0,0)}
  try{if(window.sprH){window.sprH.forEach((a,d)=>a.forEach(c=>detail(c,d,0)));window.sprHC.forEach((a,d)=>a.forEach(c=>detail(c,d,1)))}}catch(e){console.warn('HD tafsilot',e)}
})();
