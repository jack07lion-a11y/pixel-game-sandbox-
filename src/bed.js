// ===================== QURISH TAHRIRI: tepadan va 3D ko'rinish =====================
const bc=document.getElementById('bc'),bctx=bc.getContext('2d'),BEDe=document.getElementById('be');
let BW=1,BH=1;
const LMAX=5;
const BP={1:['#c8a064','#9a6f3a'],2:['#a8aab4','#7c7d88'],3:['rgba(190,230,250,.62)','rgba(150,205,235,.62)'],4:['#a06a36','#8a5a2c'],5:['#b8925a','#8a6a40'],14:['#a0a2ac','#7c7d88'],6:['#c89a5b','#9a6f3a'],9:['#d04a4a','#f4f0e6'],10:['#c9922c','#8a5a1c'],11:['#c89a5b','#9a6f3a'],12:['#8e8f99','#585962'],13:['#6a4a2a','#5aa84a'],16:['rgba(120,210,255,.5)','rgba(90,190,250,.5)'],17:['#2a3a5a','#6ae0ff'],20:['#c8d0d8','#8e9aa6'],22:['#8a6a46','#6b4f33'],23:['#e2d09a','#c4ae72'],24:['#b5523b','#8f3e2c'],25:['#f2f7fb','#cdd9e2'],26:['#c24a34','#8e3526'],27:['#b4854a','#8a6030'],7:['#6b4a2a','#5a3b22'],8:['#7c7d88','#5a3b22'],15:['#8e9aa6','#55606a'],18:['#2a4a9a','#55606a'],19:['#c8d0d8','#55606a'],21:['#8e9aa6','#55606a']};
const BHF={5:.14,14:.14,13:.12,17:.14,9:.4,10:.6,11:.7,6:.8,26:.5,7:.5,8:.3,18:.4,19:.6,15:.9};
const BEMO={7:'🔥',8:'🏕',15:'🗼',18:'🔆',19:'💡',21:'🤖'};
const brot=(dx,dy,r)=>r==0?[dx,dy]:r==1?[-dy,dx]:r==2?[-dx,-dy]:[dy,-dx];
const binv=(u,v,r)=>r==0?[u,v]:r==1?[v,-u]:r==2?[-u,-v]:[-v,u];
const woff=(d,M)=>d-Math.round(d/M)*M;
const shc=(c,f)=>c[0]=='#'?dk(c,f):c;
function bedSize(){const k=PX||2;bc.width=Math.ceil(VW/k);bc.height=Math.ceil(VH/k);bc.style.width=bc.width*k+'px';bc.style.height=bc.height*k+'px';bctx.imageSmoothingEnabled=false;BW=bc.width;BH=bc.height}
function bedToast(s){const t=document.getElementById('bto');if(!t)return;t.textContent=s;t.style.opacity=1;clearTimeout(BED.tt2);BED.tt2=setTimeout(()=>t.style.opacity=0,2000)}
function bedCol(){if(BED.cver===SB.ver)return;BED.cver=SB.ver;BED.col.clear();for(const b of BLK.values()){const k=b.ty*TXM+b.tx,c=BED.col.get(k);if(c===undefined||b.lv>c)BED.col.set(k,b.lv)}}
function bedPal(){const el=document.getElementById('bpal');let h='<button data-r="1" class="'+(SB.rem?'on':'')+'"><b>⛏</b>Buzish</button>';
  BORD.forEach(t=>{const d=BD[t];h+='<button data-b="'+t+'" class="'+(!SB.rem&&SB.sel==t?'on ':'')+(canPay(d[2])?'':'no ')+(t>=15&&t<=21?'fut':'')+'" title="'+d[0]+'"><b>'+d[1]+'</b>'+costS(d[2])+'</button>'});el.innerHTML=h;bedInfo()}
function bedInfo(){const el=document.getElementById('bi');if(!el)return;const keys=['wood','stone','dirt','sand','snowb','iron','coal','gold','crystal','fiber'];
  el.innerHTML='<b>🏗 Qurish</b> · Qavat <b>'+BED.lv+'</b>'+(BED.auto?' (avto)':' (qo‘lda)')+' · '+(SB.rem?'<b style="color:#ffb070">⛏ Buzish</b>':'<b style="color:#8fe48a">'+BD[SB.sel][1]+' '+BD[SB.sel][0]+'</b>')+'<br>'+keys.filter(k=>INV[k]>0).map(k=>INM[k][0]+INV[k]).join(' ')}
function bedOpen(){if(BED.on)return;BED.on=1;BEDON=1;BED.cx=P.x/16;BED.cy=P.y/16;BED.undo.length=0;SB.on=0;bbar.style.display='none';document.getElementById('bd').classList.remove('on');SB.hold=null;
  for(const k in K)K[k]=0;jx=jy=0;BEDe.style.display='block';bedSize();bedPal();bedBtns();
  if(BED.first){BED.first=0;bedToast('Bosing — blok qo‘yiladi · suring — kamera · ikki barmoq — kattalashtirish')}}
function bedClose(){BED.on=0;BEDON=0;BED.hold=null;BED.pts.clear();BEDe.style.display='none';SB.dirty=1}
function bedBtns(){document.getElementById('bV').textContent=BED.tt?'🧊 3D':'🗺 Tepadan';document.getElementById('bA').textContent=BED.auto?'Avto':'Qo‘lda';document.getElementById('bC').className=BED.cut?'on':'';document.getElementById('bM').textContent=SB.rem?'⛏':'🧱';document.getElementById('bM').className=SB.rem?'on':'';bedInfo()}
// ---------- blok chizish ----------
function bedBlock(g,t,L,sx,syTop,T,th,hh,al){
  const col=BP[t]||['#999','#777'],hf=BHF[t]!==undefined?BHF[t]:1,H=Math.round(hh*hf),zb=Math.round(L*hh);
  let x0=Math.round(sx-T/2),w=Math.ceil(T),yT=Math.round(syTop-zb-H),thh=Math.max(1,Math.round(th));
  if(t==27){x0+=Math.round(w*.22);w=Math.max(2,Math.round(w*.56))}else if(t==6||t==7||t==19){x0+=Math.round(w*.3);w=Math.max(2,Math.round(w*.4))}
  g.globalAlpha=al;const topc=shc(col[0],1+(hh?0:L*.06)),frc=col[1];
  if(H>0){g.fillStyle=frc;g.fillRect(x0,yT+thh,w,H);
    if(T>=11){g.fillStyle='rgba(0,0,0,.16)';
      if(t==1||t==5||t==27){for(let i=3;i<w-1;i+=Math.max(3,Math.round(T/4)))g.fillRect(x0+i,yT+thh,1,H)}
      else if(t==2||t==24||t==12||t==20){g.fillStyle=t==24?'rgba(255,255,255,.22)':'rgba(0,0,0,.2)';const rh=Math.max(2,Math.round(H/3));for(let y=rh;y<H;y+=rh){g.fillRect(x0,yT+thh+y,w,1);for(let x=((y/rh)&1)?3:0;x<w;x+=Math.max(4,Math.round(T/3)))g.fillRect(x0+x,yT+thh+y-rh,1,rh)}}
      else if(t==3||t==16){g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x0+2,yT+thh+1,2,Math.max(1,H-3))}
      else if(t==4){g.fillStyle='#6e4620';g.fillRect(x0+2,yT+thh+1,w-4,H-1);g.fillStyle='#ffd23a';g.fillRect(x0+w-4,yT+thh+Math.round(H/2),2,2)}
      else if(t==10){g.fillStyle='#ffe27a';g.fillRect(x0+Math.round(w/2)-1,yT+thh+1,2,3)}}
    g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x0,yT+thh+H-1,w,1)}
  g.fillStyle=topc;g.fillRect(x0,yT,w,thh);
  if(T>=11){
    if(t==1||t==5||t==11){g.fillStyle='rgba(0,0,0,.14)';g.fillRect(x0,yT+(thh>>1),w,1)}
    else if(t==2||t==14||t==24||t==22){g.fillStyle='rgba(0,0,0,.13)';g.fillRect(x0+(w>>1),yT,1,thh);g.fillRect(x0,yT+(thh>>1),w,1)}
    else if(t==3||t==16){g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x0+1,yT+1,Math.max(1,w-2),1)}
    else if(t==4){g.fillStyle='#6e4620';g.fillRect(x0+2,yT+(thh>>1),w-4,1);if(!hh){g.fillStyle='#ffd23a';g.fillRect(x0+w-4,yT+(thh>>1)-1,2,2)}}
    else if(t==26){g.fillStyle='rgba(0,0,0,.2)';for(let y=2;y<thh;y+=2)g.fillRect(x0,yT+y,w,1);g.fillStyle='rgba(255,200,170,.35)';g.fillRect(x0,yT,w,1)}
    else if(t==27){g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x0+(w>>1)-1,yT,2,thh)}
    else if(t==9){g.fillStyle='#f4f0e6';g.fillRect(x0+1,yT+1,Math.max(2,w>>1),Math.max(1,thh-2))}
    else if(t==13){g.fillStyle='#5aa84a';for(let i=1;i<w-1;i+=3)g.fillRect(x0+i,yT+1,1,Math.max(1,thh-2))}
    else if(t==17){g.fillStyle='rgba(120,230,255,'+(.5+.4*Math.sin(time*5))+')';g.fillRect(x0+2,yT+2,w-4,Math.max(1,thh-4))}
    else if(t==25){g.fillStyle='#fff';g.fillRect(x0+2,yT+1,2,1)}
    else if(t==23){g.fillStyle='rgba(120,90,30,.25)';g.fillRect(x0+3,yT+2,1,1);g.fillRect(x0+w-4,yT+thh-2,1,1)}}
  if(BEMO[t]&&T>=12){g.font=Math.round(T*.75)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(BEMO[t],Math.round(sx),yT-Math.round(T*.15)+(thh>>1))}
  g.fillStyle='rgba(0,0,0,.28)';g.fillRect(x0,yT+thh-1,w,1);g.globalAlpha=1}
// ---------- tanlash: ekrandagi nuqta -> katak ----------
function bedGeo(){const phi=BED.tl*.87,ck=Math.cos(phi),sk=Math.sin(phi),T=BED.z,th=T*ck,hh=T*sk,r=BED.r,cxi=Math.floor(BED.cx),cyi=Math.floor(BED.cy),fv=brot(cxi+.5-BED.cx,cyi+.5-BED.cy,r);
  return{ck,sk,T,th,hh,r,cxi,cyi,fu:fv[0],fv:fv[1],na:Math.ceil(BW/2/T)+2,nb:Math.ceil(BH/2/th)+2+Math.ceil(5*hh/th)}}
function bedTile(G,a,b){const d=binv(a,b,G.r);return[wrp(G.cxi+d[0],TXM),wrp(G.cyi+d[1],TYM)]}
function bedPick(lx,ly){const G=bedGeo(),sh=BED.auto?0:BED.lv*G.hh;ly+=sh;bedCol();
  for(let b=G.nb;b>=-G.nb;b--){const cy=BH/2+(b+G.fv)*G.th;if(ly<cy-G.th/2-(BED.auto?(LMAX+1)*G.hh:0)||ly>cy+G.th/2+0.01)continue;
    for(let a=-G.na;a<=G.na;a++){const cx=BW/2+(a+G.fu)*G.T;if(lx<cx-G.T/2||lx>=cx+G.T/2)continue;const t=bedTile(G,a,b),top=BED.auto?BED.col.get(t[1]*TXM+t[0]):undefined,h=top===undefined?0:top+1;
      if(ly>=cy-G.th/2-h*G.hh&&ly<=cy+G.th/2)return{tx:t[0],ty:t[1],a,b,top}}}
  return null}
const bedStack=p=>p.top===undefined?0:p.top+1;
function bedTap(){const p=BED.hov;if(!p)return;bedCol();
  const top=BED.col.get(p.ty*TXM+p.tx);let lv;
  if(SB.rem){lv=BED.auto?(top===undefined?0:top):BED.lv;if(!BED.auto&&!BLK.get(bkey(p.tx,p.ty,lv))&&top!==undefined)lv=top}
  else{lv=BED.auto?(top===undefined?0:top+1):BED.lv;if(lv>LMAX){bedToast('Eng baland qavat — '+LMAX);return}}
  const res=sbxAct(p.tx,p.ty,lv,true);
  if(res&&res.put){BED.undo.push({k:'p',tx:p.tx,ty:p.ty,lv});if(BED.undo.length>60)BED.undo.shift()}
  else if(res&&res.rm){BED.undo.push({k:'r',...res.rm});if(BED.undo.length>60)BED.undo.shift()}
  bedInfo()}
function bedUndo(){const u=BED.undo.pop();if(!u){bedToast('Bekor qiladigan amal yo‘q');return}
  if(u.k=='p'){const b=BLK.get(bkey(u.tx,u.ty,u.lv));if(b){sbxRemove(b,2);bedToast('Bekor qilindi')}}
  else{const d=BD[u.t];if(BLK.get(bkey(u.tx,u.ty,u.lv)))return;if(!canPay(d[2])){bedToast('Qaytarish uchun yetmaydi: '+costS(d[2]));return}pay(d[2]);sbxPut(u.tx,u.ty,u.t,0,u.g,u.lv);bedToast('Qaytarildi')}
  invUI()}
function bedHold(dt){const h=BED.hold;if(!BED.on||!h||P.dead>0)return;if(performance.now()-h.t0<220)return;
  bedCol();if(BED.col.get(h.ty*TXM+h.tx)!==undefined){BED.hold=null;return}digHit(h.tx,h.ty,dt,true)}
function bedClamp(){const dx=woff(BED.cx-P.x/16,TXM),dy=woff(BED.cy-P.y/16,TYM),d=Math.hypot(dx,dy);if(d>44){BED.cx=P.x/16+dx*44/d;BED.cy=P.y/16+dy*44/d}BED.cx=wrp(BED.cx,TXM);BED.cy=wrp(BED.cy,TYM)}
// ---------- asosiy chizish ----------
function bedDraw(dt){
  const g=bctx;if(bc.width!==Math.ceil(VW/PX))bedSize();
  BED.tl+=(BED.tt-BED.tl)*Math.min(1,dt*8);bedCol();
  const G=bedGeo(),{ck,sk,T,th,hh,r,cxi,cyi,fu,fv,na,nb}=G;
  g.globalAlpha=1;g.fillStyle='#0e141a';g.fillRect(0,0,BW,BH);
  const RW=Math.ceil(T),RH=Math.max(1,Math.ceil(th));
  const rowE=new Map(),addE=(row,f)=>{let l=rowE.get(row);if(!l)rowE.set(row,l=[]);l.push(f)};
  // 1) yer
  for(let b=-nb;b<=nb;b++){const cy=BH/2+(b+fv)*th,y0=Math.floor(cy-th/2),y1=Math.floor(cy+th/2),hgt=Math.max(1,y1-y0);if(y1<0||y0>BH)continue;
    for(let a=-na;a<=na;a++){const cx=BW/2+(a+fu)*T,x0=Math.floor(cx-T/2),x1=Math.floor(cx+T/2);if(x1<0||x0>BW)continue;
      const tt=bedTile(G,a,b),tx=tt[0],ty=tt[1],h=hs(tx,ty);let c;
      if(isW(tx,ty)){const fr=FZ[ty]==1||biome(tx,ty)==2;c=fr?'#c5e4f1':(h&1?'#3a7fb0':'#3f86b8')}
      else{const bi=biome(tx,ty);c=isP(tx,ty)?['#cbb888','#caa66a','#b9b09c','#8e8478'][bi]:[['#5b9446','#61994b','#67a251'],['#e4cb8c','#dcc283','#e9d398'],['#eef4f8','#e4edf4','#f4f9fc'],['#8b8d96','#80828c','#95979f']][bi][h%3];if(SNA[ty]>.3&&bi!=2)c=dk('#eef4f8',.96)}
      g.fillStyle=c;g.fillRect(x0,y0,x1-x0,hgt);
      const q=DG.get(ty*TXM+tx);
      if(q){const fm=MAT[matAt(tx,ty,q.d)],dep=q.d;g.fillStyle=q.w?'#2f6a98':dk(fm.c,.8);const ins=Math.max(1,Math.round(T*.07));g.fillRect(x0,y0,x1-x0,hgt);
        g.fillStyle='rgba(0,0,0,'+(.18+dep*.1)+')';g.fillRect(x0,y0,x1-x0,hgt);
        if(hh>1){g.fillStyle=dk(MAT[matAt(tx,ty,0)].w,.9);g.fillRect(x0,y0,x1-x0,Math.min(hgt,Math.round(hh*.22*dep)+1))}
        g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x0,y0,ins,hgt);g.fillRect(x0,y0,x1-x0,ins);
        if(!q.w&&fm.ore&&T>=10){g.fillStyle=fm.c;g.fillRect(x0+(h%5)+2,y0+((h>>3)%3)+1,2,1);g.fillRect(x0+((h>>5)%5)+3,y0+((h>>7)%3)+1,1,1)}
        if(q.w&&T>=10){g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x0+2+(time*4+h)%5|0,y0+(hgt>>1),3,1)}
        if(T>=14){g.fillStyle='rgba(255,255,255,.55)';g.font='bold '+Math.round(T*.34)+'px monospace';g.textAlign='center';g.textBaseline='middle';g.fillText(dep,(x0+x1)>>1,(y0+y1)>>1)}}
      else if(T>=10&&!isW(tx,ty)){const bi=biome(tx,ty);g.fillStyle=bi==0?'rgba(40,90,40,.35)':bi==1?'rgba(150,120,60,.3)':'rgba(120,130,150,.25)';if(h%3==0)g.fillRect(x0+(h>>4)%(RW-1),y0+(h>>9)%Math.max(1,hgt-1),1,1)}
      if(T>=16){g.fillStyle='rgba(0,0,0,.06)';g.fillRect(x0,y0,x1-x0,1);g.fillRect(x0,y0,1,hgt)}}}
  // 2) obyektlar (daraxt, tosh, binolar, odamlar) — qator bo'yicha
  const ent=(xf,yf,fn)=>{const dx=woff(xf-BED.cx,TXM),dy=woff(yf-BED.cy,TYM);if(Math.abs(dx)>na+nb+2||Math.abs(dy)>na+nb+2)return;const q=brot(dx,dy,r),sx=BW/2+q[0]*T,sy=BH/2+q[1]*th;if(sx<-T*3||sx>BW+T*3||sy<-T*6||sy>BH+T*3)return;addE(Math.round(q[1]-fv),()=>fn(sx,sy))};
  trees.forEach(t=>{const S=t[4];if(S.st!==0)return;ent(t[0]/16,t[1]/16,(sx,sy)=>{const R=T*.62;g.fillStyle='rgba(0,0,0,.22)';g.fillRect(Math.round(sx-R*.7),Math.round(sy-1),Math.round(R*1.4),Math.max(1,Math.round(th*.25)));
    g.fillStyle='#6b4a2a';g.fillRect(Math.round(sx-T*.07),Math.round(sy-hh*.7),Math.max(1,Math.round(T*.14)),Math.max(1,Math.round(hh*.7)));
    const cy=sy-hh*1.05-th*.2;g.fillStyle='#2f6a3a';g.fillRect(Math.round(sx-R),Math.round(cy-R*(.4+ck*.5)),Math.round(R*2),Math.round(R*(.8+ck)));g.fillStyle='#4a8a4a';g.fillRect(Math.round(sx-R*.7),Math.round(cy-R*(.55+ck*.5)),Math.round(R*1.3),Math.round(R*.6))})});
  rocks.forEach(o=>ent((o[0]+o[2]/2)/16,(o[1]+o[3]/2)/16,(sx,sy)=>{const w=Math.max(3,o[2]/16*T),hgt=Math.max(2,o[4]/16*hh);g.fillStyle='#585a64';g.fillRect(Math.round(sx-w/2),Math.round(sy-hgt),Math.round(w),Math.round(hgt+th*.3));g.fillStyle='#9b9ca6';g.fillRect(Math.round(sx-w/2),Math.round(sy-hgt),Math.round(w),Math.max(1,Math.round(th*.5)))}));
  const box=(x,y,w,h2,H,c1,c2)=>{const xs=[x/16,(x+w)/16],ys=[y/16,(y+h2)/16];const dxa=woff(xs[0]-BED.cx,TXM),dya=woff(ys[0]-BED.cy,TYM),dxb=dxa+w/16,dyb=dya+h2/16;
    if(Math.abs(dxa)>na+nb+4||Math.abs(dya)>na+nb+4)return;const p1=brot(dxa,dya,r),p2=brot(dxb,dyb,r),u0=Math.min(p1[0],p2[0]),u1=Math.max(p1[0],p2[0]),v0=Math.min(p1[1],p2[1]),v1=Math.max(p1[1],p2[1]);
    addE(Math.round(v1-.5-fv),()=>{const X0=Math.round(BW/2+u0*T),X1=Math.round(BW/2+u1*T),Y1=Math.round(BH/2+v1*th),Y0=Math.round(BH/2+v0*th),hp=Math.round(H*hh);
      g.fillStyle=c2;g.fillRect(X0,Y1-hp,X1-X0,hp);g.fillStyle=c1;g.fillRect(X0,Y0-hp,X1-X0,Math.max(1,Y1-Y0));g.fillStyle='rgba(0,0,0,.25)';g.fillRect(X0,Y1-1,X1-X0,1)})};
  HS.forEach(h=>box(h.x,h.y,h.w,h.h,Math.max(1,h.H/16),'#a63d3d','#e6d9b8'));
  CIV.forEach(c=>{if(c)c.bld.forEach(b=>{if(b.t=='farm')return;const hl=b.t=='castle'||b.t=='citadel'?3:b.t=='house'||b.t=='ghut'?1.5:1;box(b.x,b.y,b.w,b.h,hl,'#7a6a58','#9a8a74')})});
  CA.forEach(a=>{if(a.dead>0||a.hid)return;ent(a.x/16,a.y/16,(sx,sy)=>{const im=cspr(a.set,2,6),s=T/24*(a.sc||1);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(Math.round(sx-T*.3*(a.sc||1)),Math.round(sy),Math.round(T*.6*(a.sc||1)),Math.max(1,Math.round(th*.2)));g.drawImage(im,Math.round(sx-15*s),Math.round(sy-37*s),Math.round(30*s),Math.round(39*s))})});
  if(!JZ.hid)ent(JZ.x/16,JZ.y/16,(sx,sy)=>{const s=T/24,im=sprJ[2][6];g.drawImage(im,Math.round(sx-15*s),Math.round(sy-37*s),Math.round(30*s),Math.round(39*s));g.fillStyle='#8fe4ff';g.fillRect(Math.round(sx-1),Math.round(sy-40*s),2,2)});
  ent(P.x/16,P.y/16,(sx,sy)=>{const s=T/24,im=(hero?spr:sprC)[2][6];g.fillStyle='rgba(0,0,0,.3)';g.fillRect(Math.round(sx-T*.3),Math.round(sy),Math.round(T*.6),Math.max(1,Math.round(th*.2)));g.drawImage(im,Math.round(sx-15*s),Math.round(sy-37*s-(P.pz||0)*s*0),Math.round(30*s),Math.round(39*s));g.fillStyle='#ffe27a';g.fillRect(Math.round(sx-1),Math.round(sy-41*s),2,2)});
  // 3) bloklar (qator bo'yicha, pastdan yuqoriga) + obyektlar
  const cutL=BED.cut?BED.lv:99;
  for(let b=-nb;b<=nb+0;b++){const cy=BH/2+(b+fv)*th,syTop=cy-th/2;if(cy-th/2-6*hh>BH||cy+th/2+hh<-4)continue;
    for(let a=-na;a<=na;a++){const cx=BW/2+(a+fu)*T;if(cx<-T*2||cx>BW+T*2)continue;const tt=bedTile(G,a,b),top=BED.col.get(tt[1]*TXM+tt[0]);if(top===undefined)continue;
      for(let L=0;L<=top;L++){const bl=BLK.get(bkey(tt[0],tt[1],L));if(bl)bedBlock(g,bl.t,L,cx,syTop,T,th,hh,L>cutL?.22:1)}}
    const le=rowE.get(b);if(le)le.forEach(f=>f())}
  // 4) kursor / ko'rinmas blok
  if(BED.mp&&(BED.pts.size||BED.hovT>time-1.6)||BED.mouse){const p=bedPick(BED.mp?BED.mp.x:0,BED.mp?BED.mp.y:0);BED.hov=p;
    if(p){const cx=BW/2+(p.a+fu)*T,syTop=BH/2+(p.b+fv)*th-th/2,top=p.top===undefined?BED.col.get(p.ty*TXM+p.tx):p.top;let lv;
      if(SB.rem)lv=BED.auto?(top===undefined?0:top):BED.lv;else lv=BED.auto?(top===undefined?0:top+1):BED.lv;
      const okp=Math.hypot(dwx(p.tx*16+8,P.x),dwy(p.ty*16+8,P.y))<448;let good=okp;
      if(SB.rem){const ex=BLK.get(bkey(p.tx,p.ty,lv));good=good&&(!!ex||(lv==0&&digOk(p.tx,p.ty)))}
      else{const ex=BLK.get(bkey(p.tx,p.ty,lv));good=good&&!ex&&canPay(BD[SB.sel][2])&&lv<=LMAX;if(!ex&&!SB.rem)bedBlock(g,SB.sel,lv,cx,syTop,T,th,hh,.5)}
      const x0=Math.round(cx-T/2),w=Math.ceil(T),yT=Math.round(syTop-lv*hh-(SB.rem?(BHF[(BLK.get(bkey(p.tx,p.ty,lv))||{t:1}).t]??1)*hh:(BHF[SB.sel]??1)*hh)),hh2=Math.max(1,Math.round(th));
      g.strokeStyle=good?(SB.rem?'#ffb070':'#8fffa0'):'#ff6a5a';g.lineWidth=1;g.strokeRect(x0+.5,yT+.5,w-1,hh2-1)}}
  // 5) kecha / yorug'lik
  if(dayN>.3){g.fillStyle='rgba(8,14,44,'+(Math.min(.55,(dayN-.3)*.7)).toFixed(2)+')';g.fillRect(0,0,BW,BH)}
  BED.infoT=(BED.infoT||0)-dt;if(BED.infoT<=0){BED.infoT=.4;bedInfo()}}
// ---------- boshqaruv ----------
function bedPan(dx,dy,G){const d=binv(dx/G.T,dy/G.th,G.r);BED.cx-=d[0];BED.cy-=d[1];bedClamp()}
bc.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();try{bc.setPointerCapture(e.pointerId)}catch(_){}const lx=e.clientX/PX,ly=e.clientY/PX;
  BED.pts.set(e.pointerId,{x:lx,y:ly,t0:performance.now(),mv:0});BED.mp={x:lx,y:ly};BED.hovT=time;
  if(BED.pts.size==2){const a=[...BED.pts.values()];BED.pd=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);BED.hold=null;BED.multi=1}
  else{BED.multi=0;const p=bedPick(lx,ly);BED.hov=p;if(p&&SB.rem){bedCol();if(BED.col.get(p.ty*TXM+p.tx)===undefined)BED.hold={tx:p.tx,ty:p.ty,t0:performance.now()}}}});
bc.addEventListener('pointermove',e=>{const lx=e.clientX/PX,ly=e.clientY/PX;BED.mp={x:lx,y:ly};if(e.pointerType=='mouse'){BED.mouse=1}
  const p=BED.pts.get(e.pointerId);if(!p)return;const G=bedGeo();
  if(BED.pts.size==2){const o=[...BED.pts.entries()].find(q=>q[0]!==e.pointerId),dxm=lx-p.x,dym=ly-p.y;p.x=lx;p.y=ly;if(o){const a=p,c=o[1],d=Math.hypot(a.x-c.x,a.y-c.y);if(BED.pd>0)BED.z=Math.max(8,Math.min(48,BED.z*d/BED.pd));BED.pd=d;bedPan(dxm/2,dym/2,G)}return}
  const dx=lx-p.x,dy=ly-p.y;p.mv+=Math.hypot(dx,dy);p.x=lx;p.y=ly;
  if(p.mv>4){BED.hold=null;BED.hov=null;bedPan(dx,dy,G)}});
const bedUp=e=>{const p=BED.pts.get(e.pointerId);BED.pts.delete(e.pointerId);BED.hold=null;
  if(p&&BED.pts.size==0&&!BED.multi&&p.mv<=4&&performance.now()-p.t0<650){if(e.pointerType=='mouse'&&e.button===2){return}bedTap()}
  if(BED.pts.size==0)BED.multi=0};
bc.addEventListener('pointerup',bedUp);bc.addEventListener('pointercancel',e=>{BED.pts.delete(e.pointerId);BED.hold=null});
bc.addEventListener('pointerleave',e=>{if(e.pointerType=='mouse')BED.mouse=0});
bc.addEventListener('wheel',e=>{e.preventDefault();BED.z=Math.max(8,Math.min(48,BED.z*(e.deltaY<0?1.12:1/1.12)))},{passive:false});
bc.addEventListener('contextmenu',e=>e.preventDefault());
BEDe.addEventListener('pointerdown',e=>e.stopPropagation());BEDe.addEventListener('touchstart',e=>e.stopPropagation());
const bI=id=>document.getElementById(id);
bI('bX').onclick=bedClose;bI('bV').onclick=()=>{BED.tt=BED.tt?0:1;bedBtns()};bI('bR').onclick=()=>{BED.r=(BED.r+1)%4};
bI('bZp').onclick=()=>{BED.z=Math.min(48,BED.z*1.25)};bI('bZm').onclick=()=>{BED.z=Math.max(8,BED.z/1.25)};
bI('bL1').onclick=()=>{BED.auto=0;BED.lv=Math.min(LMAX,BED.lv+1);bedBtns()};bI('bL2').onclick=()=>{BED.auto=0;BED.lv=Math.max(0,BED.lv-1);bedBtns()};
bI('bA').onclick=()=>{BED.auto=BED.auto?0:1;bedBtns()};bI('bC').onclick=()=>{BED.cut=BED.cut?0:1;bedBtns()};bI('bM').onclick=()=>{SB.rem=SB.rem?0:1;bedPal();bedBtns()};bI('bU').onclick=bedUndo;
bI('bpal').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.r)SB.rem=SB.rem?0:1;else{SB.rem=0;SB.sel=+b.dataset.b}bedPal();bedBtns()});
addEventListener('keydown',e=>{if(!BED.on)return;const k=e.key.toLowerCase();let h=1;
  if(k=='escape'||k=='b')bedClose();else if(k=='q')BED.r=(BED.r+3)%4;else if(k=='e')BED.r=(BED.r+1)%4;else if(k=='tab'){BED.tt=BED.tt?0:1;bedBtns()}
  else if(k=='+'||k=='=')BED.z=Math.min(48,BED.z*1.2);else if(k=='-')BED.z=Math.max(8,BED.z/1.2);else if(k=='pageup'||k=='r'){BED.auto=0;BED.lv=Math.min(LMAX,BED.lv+1);bedBtns()}
  else if(k=='pagedown'||k=='f'){BED.auto=0;BED.lv=Math.max(0,BED.lv-1);bedBtns()}else if(k=='x'){SB.rem=SB.rem?0:1;bedPal();bedBtns()}else if(k=='z')bedUndo();
  else if('wasd'.includes(k)||k.startsWith('arrow')){const s=e.shiftKey?3:1,v=k=='w'||k=='arrowup'?[0,1]:k=='s'||k=='arrowdown'?[0,-1]:k=='a'||k=='arrowleft'?[1,0]:[-1,0];bedPan(v[0]*s*6,v[1]*s*6,bedGeo())}
  else h=0;if(h||k.length==1){e.preventDefault();e.stopImmediatePropagation()}},true);
addEventListener('keyup',e=>{if(BED.on)e.stopImmediatePropagation()},true);
bedSize();
