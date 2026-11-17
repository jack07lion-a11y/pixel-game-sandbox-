// ===== PIKSELLI 3D KO'RINISH (voxel-space): o'yinchi ortidan, cheklangan burchaklar; tugma 3D yoki G =====
(function(){
  const VX={on:false,yaw:0,pitch:.30,alt:52,back:200,R:384,ox:0,oy:0,H:null,C:null,cx:-1e9,cy:-1e9,img:null,cw:0,ch:0};window.VX=VX;
  const ramp=(a,b,n)=>Array.from({length:n},(_,i)=>{const t=i/(n-1);return[0,1,2].map(k=>a[k]+(b[k]-a[k])*t)});
  const PAL=[ramp([170,224,92],[44,100,40],12),ramp([248,226,154],[168,140,88],12),ramp([255,255,255],[190,212,238],12),ramp([178,160,136],[110,96,90],12)];
  const WAT=[[104,222,228],[56,176,224],[30,132,212],[22,98,184]];
  const pk=(c,k)=>{k=k||1;return(255<<24)|(Math.min(255,c[2]*k)<<16)|(Math.min(255,c[1]*k)<<8)|Math.min(255,c[0]*k)};
  const hz=(a,b)=>{let h=(Math.imul(a,374761393)+Math.imul(b,668265263))|0;h=Math.imul(h^(h>>>13),1274126177);return(h^(h>>>16))>>>0};
  function build(cx,cy){const R=VX.R,half=R>>1;VX.ox=cx-half;VX.oy=cy-half;VX.cx=cx;VX.cy=cy;
    if(!VX.H){VX.H=new Uint8Array(R*R);VX.C=new Uint32Array(R*R);VX.HS=new Uint8Array(R*R)}
    const H=VX.H,C=VX.C;
    for(let ty=0;ty<R;ty++){const wy=(((VX.oy+ty)%TYM)+TYM)%TYM;for(let tx=0;tx<R;tx++){const wx=(((VX.ox+tx)%TXM)+TXM)%TXM,i=ty*R+tx;
      if(isW(wx,wy)){let l=0,fz=false;const br=isBr(wx,wy);
        if(FZ[wy]==1||biome(wx,wy)==2){C[i]=pk([206,232,246]);H[i]=0;continue}
        l=isOc(wx,wy)?odl(wx,wy):0;
        let nl=!isW(wx-1,wy)||!isW(wx+1,wy)||!isW(wx,wy-1)||!isW(wx,wy+1);
        C[i]=br?pk([168,121,74]):nl?pk([250,254,255]):(!isW(wx-2,wy)||!isW(wx+2,wy)||!isW(wx,wy-2)||!isW(wx,wy+2))?pk([188,242,246]):pk(WAT[l],1+((hz(wx,wy)&7)-3.5)*.012);H[i]=0}
      else{const bi=biome(wx,wy),b=elb(wx,wy);let c=PAL[bi][b],h0=4+b*9;
        const nw=isW(wx-1,wy)||isW(wx+1,wy)||isW(wx,wy-1)||isW(wx,wy+1);
        if(isP(wx,wy)){c=[196,170,116]}
        else if(bi==0&&b<=1&&nw){c=[246,224,152];h0=3}
        else if(bi==0&&b<7){const n=hz(wx>>1,wy>>1)&255,n2=hz(wx>>3,wy>>3)&255;if(n2>110&&n>96)c=[Math.round(c[0]*.55),Math.round(c[1]*.7),Math.round(c[2]*.55)]}
        // pog'ona chekkasi: past qo'shniga qorong'i
        const bl=elb(wx,wy+1),br2=elb(wx+1,wy);let k=1;if((bl<b&&!isW(wx,wy+1))||(br2<b&&!isW(wx+1,wy)))k=.78;
        C[i]=pk(c,k*(1+((hz(wx,wy)&7)-3.5)*.012));H[i]=h0}}}
    // balandlikni silliqlash (3x3)
    const HS=VX.HS;for(let ty=1;ty<R-1;ty++)for(let tx=1;tx<R-1;tx++){const i=ty*R+tx;HS[i]=((H[i-R-1]+H[i-R]+H[i-R+1]+H[i-1]+H[i]*2+H[i+1]+H[i+R-1]+H[i+R]+H[i+R+1])/10)|0}}
  const sky=[[118,184,238],[196,226,248]];
  function frameImg(w,h){if(!VX.img||VX.cw!==w||VX.ch!==h){VX.img=new ImageData(w,h);VX.u32=new Uint32Array(VX.img.data.buffer);VX.cw=w;VX.ch=h;VX.ymin=new Int32Array(w);VX.col=new Float32Array(w*2)}return VX.img}
  window.voxRender=function(){
    const w=W,h=H,img=frameImg(w,h),u=VX.u32,R=VX.R;
    const ptx=P.x>>4,pty=P.y>>4;if(Math.abs(ptx-VX.cx)>56||Math.abs(pty-VX.cy)>56||!VX.H)build(ptx,pty);
    const hor=Math.round(h*VX.pitch),scale=w*.90,K=1.0,zfar=2300;
    const fx0=-0.70711,fy0=-0.70711,yw=VX.yaw,fx=fx0*Math.cos(yw)-fy0*Math.sin(yw),fy=fx0*Math.sin(yw)+fy0*Math.cos(yw),rx=-fy,ry=fx;
    const cam=[P.x-fx*VX.back,P.y-fy*VX.back];
    // osmon
    for(let y=0;y<h;y++){const t=Math.max(0,Math.min(1,1-y/Math.max(1,hor)))**.8;const c=[sky[1][0]+(sky[0][0]-sky[1][0])*t,sky[1][1]+(sky[0][1]-sky[1][1])*t,sky[1][2]+(sky[0][2]-sky[1][2])*t],p=pk(c);for(let x=0;x<w;x++)u[y*w+x]=p}
    const ymin=VX.ymin;ymin.fill(h);
    const camH=(()=>{const i=((pty-VX.oy)*R+(ptx-VX.ox));return VX.HS[i]||0})()+VX.alt,
      ox=VX.ox,oy=VX.oy,H0=VX.HS,C0=VX.C,half=R;
    const dxr=new Float32Array(w),dyr=new Float32Array(w);for(let i=0;i<w;i++){const c=(i-w/2)/(w/2)*K;dxr[i]=fx+rx*c;dyr[i]=fy+ry*c}
    const fogR=188,fogG=222,fogB=246;let z=6,dz=1.1;const curv=.0000145;
    while(z<zfar){const fog=Math.min(1,Math.pow(z/zfar,1.3)),ff=1-fog,drop=z*z*curv;
      for(let i=0;i<w;i++){const px=cam[0]+dxr[i]*z,py=cam[1]+dyr[i]*z;let tx=(px/16|0)-ox,ty=(py/16|0)-oy;if(px<0)tx=((Math.floor(px/16))-ox);if(py<0)ty=((Math.floor(py/16))-oy);
        // torus: dunyo ichida modul
        let wx=Math.floor(px/16),wy=Math.floor(py/16);wx=((wx%TXM)+TXM)%TXM;wy=((wy%TYM)+TYM)%TYM;
        // ko'rinish keshidagi indeks (dunyo bo'yicha eng yaqin nusxa)
        let dxx=wx-(ox%TXM+TXM)%TXM;if(dxx>TXM/2)dxx-=TXM;else if(dxx<-TXM/2)dxx+=TXM;let dyy=wy-(oy%TYM+TYM)%TYM;if(dyy>TYM/2)dyy-=TYM;else if(dyy<-TYM/2)dyy+=TYM;
        if(dxx<0||dxx>=R||dyy<0||dyy>=R)continue;
        const idx=dyy*R+dxx,hh=H0[idx]-drop;const ys=((camH-hh)/z*scale+hor)|0;
        if(ys<ymin[i]){const c=C0[idx];let r=c&255,g=(c>>8)&255,b=(c>>16)&255;r=r*ff+fogR*fog;g=g*ff+fogG*fog;b=b*ff+fogB*fog;const pc=(255<<24)|(b<<16)|(g<<8)|r;
          let y0=ys<0?0:ys;for(let y=y0;y<ymin[i];y++)u[y*w+i]=pc;ymin[i]=y0}}
      z+=dz;dz+=.022}
    if(!VX.tmp||VX.tmp.width!==w||VX.tmp.height!==h){VX.tmp=document.createElement('canvas');VX.tmp.width=w;VX.tmp.height=h}VX.tmp.getContext('2d').putImageData(img,0,0);ctx.drawImage(VX.tmp,0,0);
    // o'yinchi (sprayt, perspektiva bo'yicha kattalashtirilgan)
    {const dx=P.x-cam[0],dy=P.y-cam[1],zf=dx*fx+dy*fy,xr=dx*rx+dy*ry,hP=(VX.HS[((pty-oy)*R+(ptx-ox))]||0)+(P.z||0),X=w/2+(xr/(zf*K))*(w/2),Y=(camH-hP)/zf*scale+hor,k=scale/zf*.5;
      const mp=[[2,0],[3,0],[0,0],[3,1],[2,1],[4,1],[1,0],[4,0]][P.sec|0]||[2,0],set=(typeof hero!=='undefined'&&hero)?spr:sprC,im=(set[mp[0]]||set[2])[4];
      ctx.imageSmoothingEnabled=false;ctx.save();ctx.translate(Math.round(X),Math.round(Y));if(mp[1])ctx.scale(-1,1);const sw=Math.round(30*k),sh=Math.round(39*k);ctx.globalAlpha=.28;ctx.fillStyle='#000';ctx.fillRect(-sw*.3,-2,sw*.6,3);ctx.globalAlpha=1;ctx.drawImage(im,-sw/2,-sh+2,sw,sh);ctx.restore()}
    if(typeof dayN!=='undefined'&&dayN>.02){ctx.fillStyle='rgba(8,16,48,'+(dayN*.55).toFixed(3)+')';ctx.fillRect(0,0,w,h)}
  };
  // tugma va boshqaruv
  function toggle(v){VX.on=v===undefined?!VX.on:v;document.getElementById('vx').classList.toggle('on',VX.on);const c=document.getElementById('vxc');if(c)c.style.display=VX.on?'flex':'none';if(VX.on)VX.cx=-1e9}
  const tb=document.getElementById('tbar'),b=document.createElement('button');b.id='vx';b.title='Pikselli 3D ko‘rinish (G)';b.onpointerdown=e=>{e.stopPropagation();e.preventDefault();toggle()};tb.insertBefore(b,tb.firstChild);
  const c=document.createElement('div');c.id='vxc';c.style.display='none';
  [['⟲','yaw',-.12],['⟳','yaw',.12],['▲','pitch',-.04],['▼','pitch',.04],['＋','alt',-14],['－','alt',14]].forEach(([t,k,d])=>{const bt=document.createElement('button');bt.textContent=t;let tm=0;const act=()=>{if(k=='yaw')VX.yaw=Math.max(-.7,Math.min(.7,VX.yaw+d));else if(k=='pitch')VX.pitch=Math.max(.12,Math.min(.55,VX.pitch+d));else VX.alt=Math.max(30,Math.min(420,VX.alt+d))};
    bt.onpointerdown=e=>{e.stopPropagation();e.preventDefault();act();clearInterval(tm);tm=setInterval(act,90)};const st=()=>clearInterval(tm);bt.onpointerup=bt.onpointerleave=bt.onpointercancel=st;c.appendChild(bt)});
  document.getElementById('root').appendChild(c);
  addEventListener('keydown',e=>{if(e.key=='g'||e.key=='G'){if(!BED.on&&!gmOpen&&!edOpen&&!e.repeat)toggle()}});
})();
