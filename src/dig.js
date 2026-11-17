// ===================== YER QAZISH (Minecraft mexanikasi) =====================
// Har bir yer katagi qatlamlardan iborat: ustki qatlam (tuproq/qum/qor/tosh), ostida tuproq, undan pastda tosh va rudalar.
// Har qatlamning qattiqligi bor: yumshoq (belkurak tez), qattiq (ketmon tez), oltin/kristall — faqat ketmon bilan.
const DG=new Map(),DPX=4,DMAX=4;
const wrp=(a,M)=>((a%M)+M)%M;
const MAT={
  dirt:{n:'Tuproq',h:.5,it:'dirt',c:'#8a6a46',w:'#6b4f33',soft:1},
  sand:{n:'Qum',h:.4,it:'sand',c:'#dcc98f',w:'#b39d66',soft:1},
  snow:{n:'Qor',h:.3,it:'snowb',c:'#eef4f8',w:'#b4c2d0',soft:1},
  rock:{n:'Tosh zamin',h:1.5,it:'stone',c:'#8b8d96',w:'#62646e'},
  stone:{n:'Tosh',h:2,it:'stone',c:'#767882',w:'#50525c'},
  coal:{n:'Ko‘mir rudasi',h:2.3,it:'coal',c:'#3a3a44',w:'#2c2c34',ore:1},
  iron:{n:'Temir rudasi',h:2.8,it:'iron',c:'#c49a7c',w:'#8a6a52',ore:1},
  gold:{n:'Oltin rudasi',h:3.2,it:'gold',c:'#f2c93a',w:'#b08f20',ore:1,pick:1},
  crystal:{n:'Kristall rudasi',h:3.6,it:'crystal',c:'#6ae0ff',w:'#3a9ac0',ore:1,pick:1},
  bed:{n:'Tub tosh',h:9,it:'stone',c:'#4c4c5a',w:'#383844'}};
function matAt(tx,ty,k){
  if(k>=DMAX)return'bed';
  const bi=biome(tx,ty);
  if(k==0)return(SNA[ty]>.3&&bi!=3)?'snow':['dirt','sand','snow','rock'][bi];
  const r=hs(tx*3+k*977,ty*5+k*131)%1000;
  if(k==1){if(bi==3)return r<60?'coal':r<100?'iron':'rock';return bi==1?'sand':'dirt'}
  if(k==2)return r<110?'coal':r<170?'iron':'stone';
  return r<90?'coal':r<190?'iron':r<235?'gold':r<255?'crystal':'stone'}
const pitD=(tx,ty)=>{const q=DG.get(wrp(ty,TYM)*TXM+wrp(tx,TXM));return q?q.d:0};
const pitPx=(x,y)=>pitD(Math.floor(x/16),Math.floor(y/16))*DPX;
const digOk=(tx,ty)=>!isW(tx,ty)&&pitD(tx,ty)<DMAX;
function digMsg(s){if(time-SB.mt>1.3){SB.mt=time;pop(s)}}
const _dk={};function dk(c,f){const q=c+f;if(_dk[q])return _dk[q];const n=parseInt(c.slice(1),16),r=Math.min(255,((n>>16)&255)*f|0),g=Math.min(255,((n>>8)&255)*f|0),b=Math.min(255,(n&255)*f|0);return _dk[q]='#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
function digFxBurst(tx,ty,m,n){n=n||4;for(let i=0;i<n;i++){const a=Math.random()*6.28;fxs.push({x:tx*16+4+Math.random()*8,y:ty*16+4+Math.random()*8,z:3+Math.random()*3,vx:Math.cos(a)*28,vy:Math.sin(a)*28,vz:25+Math.random()*40,l:.5,c:i%3?m.c:m.w})}}
function sndDig(soft){if(!AC)return;const t=AC.currentTime;if(soft){tone(110+Math.random()*50,t,.07,'triangle',sfxG,.12)}else{tone(380+Math.random()*220,t,.05,'square',sfxG,.05);tone(85,t,.08,'sawtooth',sfxG,.07)}}
function pitWet(tx,ty){for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=wrp(tx+a,TXM),ny=wrp(ty+b,TYM);if(isW(nx,ny)&&FZ[ny]!=1)return 1;const q=DG.get(ny*TXM+nx);if(q&&q.w)return 1}return 0}
function digFlood(tx,ty){const st=[[tx,ty]];let n=0;while(st.length&&n<90){const[x,y]=st.pop(),q=DG.get(y*TXM+x);if(!q||q.d<1||q.w||!pitWet(x,y))continue;q.w=1;n++;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])st.push([wrp(x+a,TXM),wrp(y+b,TYM)])}
  if(n)pop('Suv to‘ldi 💧',1.4)}
function digBreak(tx,ty,d,mk,m){
  const key=ty*TXM+tx,q=DG.get(key);if(q)q.d++;else DG.set(key,{d:1,w:0});
  invAdd(m.it,(mk=='stone'||mk=='rock')&&Math.random()<.3?2:1);
  if(m.ore&&!m.pick&&Math.random()<.5)invAdd('stone',1);
  digFxBurst(tx,ty,m,14);digFlood(tx,ty);SB.dirty=1;SB.ver++;
  if(AC){const t=AC.currentTime;tone(70,t,.16,'sine',sfxG,.25);tone(m.soft?140:520,t,.06,m.soft?'triangle':'square',sfxG,.06)}}
// tap/hold bilan qazish: sec — shu urinishdagi "qazish soniyasi"
function digHit(tx,ty,sec,far){
  tx=wrp(tx,TXM);ty=wrp(ty,TYM);const cx=tx*16+8,cy=ty*16+8,dist=Math.hypot(dwx(cx,P.x),dwy(cy,P.y));
  if(dist>(far?224:72)){digMsg('Qazish uchun yaqinroq keling');return false}
  if(isW(tx,ty)){digMsg(FZ[ty]==1?'Muz juda qalin — qazib bo‘lmaydi':'Suvni qazib bo‘lmaydi');return false}
  const key=ty*TXM+tx,q=DG.get(key),d=q?q.d:0;
  if(d>=DMAX){digMsg('Bu — tub tosh, bundan chuqur qazib bo‘lmaydi');return false}
  const mk=matAt(tx,ty,d),m=MAT[mk];
  if(m.pick&&!TLS.pick){digMsg('⛏ Ketmon kerak ('+m.n+')');return false}
  const pw=m.soft?(TLS.shovel?3:1):(TLS.pick?2.5:.5);
  let D=SB.dg;if(!D||D.key!=key||D.d!=d)D=SB.dg={key,tx,ty,d,mk,p:0,t:time,sn:0};
  D.p+=sec*pw;D.t=time;
  if(time-D.sn>.16){D.sn=time;digFxBurst(tx,ty,m,3);sndDig(m.soft)}
  if(D.p>=m.h){SB.dg=null;digBreak(tx,ty,d,mk,m)}
  return true}
function digFill(tx,ty,t){
  if(t!=22&&t!=23&&t!=25){pop('Chuqurni Tuproq / Qum / Qor bloki bilan to‘ldiring');return null}
  const d=BD[t];if(!canPay(d[2])){pop('Yetmaydi: '+costS(d[2]));return null}
  const key=ty*TXM+tx,q=DG.get(key);if(!q)return null;pay(d[2]);q.d--;if(q.d<=0)DG.delete(key);
  digFxBurst(tx,ty,{c:'#8a6a46',w:'#6b4f33'},8);if(AC)sndDig(1);invUI();SB.dirty=1;SB.ver++;return{fill:1}}
function digUpdate(dt){
  const hd=SB.hold;
  if(hd&&SB.on&&SB.rem&&P.dead<=0&&bTp&&performance.now()-bTp.t>170&&!BLK.get(bkey(hd.tx,hd.ty)))digHit(hd.tx,hd.ty,dt,false);
  if(typeof bedHold==='function')bedHold(dt);
  if(SB.dg&&time-SB.dg.t>1.3)SB.dg=null;
  const tp=pitPx(P.x,P.y);P.pz+=(tp-P.pz)*Math.min(1,dt*12);if(Math.abs(P.pz-tp)<.2)P.pz=tp;
  if(tp>0){const q=DG.get(wrp(Math.floor(P.y/16),TYM)*TXM+wrp(Math.floor(P.x/16),TXM));if(q&&q.w)wade=true}}
// ---------- chizish ----------
const PIC=new Map();
function pitImg(d,nl,nr,cols,fc,wt){
  const key=d+'|'+nl+'|'+nr+'|'+cols.join('')+fc+(wt?1:0);let c=PIC.get(key);if(c)return c;
  c=document.createElement('canvas');c.width=32;c.height=16;const g=c.getContext('2d');
  for(let x=0;x<32;x++){
    const rt=x<16?Math.max(0,Math.ceil((14-x)/2)):Math.max(0,Math.floor((x-18)/2)+1),rb=x<16?Math.min(15,Math.floor((x+16)/2)):Math.ceil((48-x)/2)-1,
      hw=(x<16?(d-nl):(d-nr))*DPX,f=x<16?1:.74;
    let y=rt;for(;y<=rb&&y<rt+hw;y++){const k=nl*(x<16?1:0)+nr*(x<16?0:1)+((y-rt)>>2);g.fillStyle=dk(cols[Math.min(d-1,k)],f);g.fillRect(x,y,1,1);if(((y-rt)&3)==3){g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x,y,1,1)}}
    if(y<=rb){g.fillStyle=fc;g.fillRect(x,y,1,rb-y+1);if((x+y)%7==0){g.fillStyle='rgba(0,0,0,.14)';g.fillRect(x,y,1,1)}}}
  if(PIC.size>400)PIC.clear();PIC.set(key,c);return c}
function pitDraw(q,X,Y,tx,ty){
  const d=q.d,nl=Math.min(d,pitD(tx-1,ty)),nr=Math.min(d,pitD(tx,ty-1)),cols=[];for(let k=0;k<d;k++)cols.push(MAT[matAt(tx,ty,k)].w);
  const fm=MAT[matAt(tx,ty,d)],fc=q.w?'#3a7fb0':dk(fm.c,.82);
  ctx.drawImage(pitImg(d,nl,nr,cols,fc,q.w),X,Y);
  if(q.w){ctx.fillStyle='rgba(255,255,255,.4)';for(let k=0;k<2;k++){const s=hs(tx*5+k,ty*3);ctx.fillRect(X+10+s%12,Y+5+((s>>5)+(time*3|0))%6,3,1)}}
  else if(fm.ore){ctx.fillStyle=fm.c;for(let k=0;k<4;k++){const s=hs(tx*7+k,ty*5+k*3);ctx.fillRect(X+9+s%14,Y+5+(s>>6)%6,2,1);ctx.fillRect(X+10+s%14,Y+6+(s>>6)%6,1,1)}}}
function digCrack(){const D=SB.dg;if(!D||time-D.t>1.2)return;const m=MAT[D.mk],u=Math.min(1,D.p/m.h),o=pj(D.tx*16,D.ty*16),X=o[0]-16,Y=o[1];
  dmd(X,Y,'rgba(0,0,0,'+(u*.28).toFixed(2)+')');ctx.fillStyle='rgba(20,12,6,.8)';
  const n=2+Math.floor(u*7);for(let i=0;i<n;i++){const a=hs(D.tx+i*13,D.ty+i*7)%628/100,L=3+(i%3)*3;for(let s=0;s<L;s++)ctx.fillRect(X+16+Math.round(Math.cos(a)*s*1.8),Y+8+Math.round(Math.sin(a)*s*.9),1,1)}
  ctx.fillStyle='#000';ctx.fillRect(X+8,Y-8,16,3);ctx.fillStyle=u>.7?'#ffd23a':'#8fe48a';ctx.fillRect(X+9,Y-7,Math.round(14*u),1);
  ctx.font='bold 7px monospace';ctx.textAlign='center';ctx.fillStyle='#000';ctx.fillText(m.n,X+17,Y-11);ctx.fillStyle='#fff';ctx.fillText(m.n,X+16,Y-12)}
function digFx(X,Y){const D=SB.dg;if(!D||time-D.t>.3)return;const sw=Math.sin(time*20)>0;
  ctx.fillStyle='#6e5238';ctx.fillRect(X+5,Y-15-(sw?5:0),1,7);ctx.fillStyle=TLS.pick?'#c0c4cc':TLS.shovel?'#9aa0a8':'#e6b998';ctx.fillRect(X+4,Y-16-(sw?5:0),TLS.pick?5:3,2)}
P.pz=0;
