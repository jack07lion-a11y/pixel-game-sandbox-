function sbxPut(tx,ty,t,quiet,g,lv){lv=lv|0;const d=BD[t],b={t,tx,ty,lv,x:tx*16,y:ty*16,hp:d[5],g:g||0,fl:0,cd:0};if(d[3]&&!lv){b.sol={x:b.x+1,y:b.y+1,w:14,h:14};solids.push(b.sol)}BLK.set(bkey(tx,ty,lv),b);SB.ver++;if(!quiet){SB.dirty=1;if(AC){t==2||t==12||t==14||t==24?sndThud():sndWood()}for(let i=0;i<5;i++)dust.push({x:b.x+Math.random()*16,y:b.y+Math.random()*16,z:lv*16,vz:8+Math.random()*6,l:.4})}return b}
function sbxRemove(b,refund){BLK.delete(bkey(b.tx,b.ty,b.lv));SB.ver++;if(b.sol){const i=solids.indexOf(b.sol);if(i>=0)solids.splice(i,1)}SB.dirty=1;
  for(let i=0;i<10;i++){const a=Math.random()*6.28;fxs.push({x:b.x+8,y:b.y+8,z:6+(b.lv|0)*16,vx:Math.cos(a)*40,vy:Math.sin(a)*40,vz:30+Math.random()*40,l:.6,c:b.t==2||b.t==12||b.t==14?'#8d8f99':b.t==22?'#8a6a46':b.t==23?'#dcc98f':b.t==24||b.t==26?'#b5523b':b.t==25?'#eef4f8':b.t>=15&&b.t<=21?'#6ae0ff':'#a8793f'})}
  if(refund){const c=BD[b.t][2];Object.keys(c).forEach(k=>{const n=refund===2?c[k]:Math.ceil(c[k]/2);if(n)INV[k]+=n});invUI()}if(AC&&onNear(b,500))sndWood()}
// natija: {put:blok} | {rm:{...}} | {dig:1} | {fill:1} | null
function sbxAct(tx,ty,lv,far){lv=lv|0;const cx=tx*16+8,cy=ty*16+8,k=bkey(tx,ty,lv),ex=BLK.get(k),dist=Math.hypot(dwx(cx,P.x),dwy(cy,P.y));
  if(dist>(far?448:120)){pop('Juda uzoq — yaqinroq boring');return null}
  if(SB.rem){if(ex){const r={rm:{t:ex.t,tx,ty,lv,g:ex.g}};sbxRemove(ex,1);return r}
    if(lv==0)return digHit(tx,ty,.45,far)?{dig:1}:null;
    pop('Bu qavatda blok yo‘q');return null}
  const t=SB.sel,d=BD[t];if(ex){pop('Bu joy band');return null}
  if(lv==0){const q=DG.get(ty*TXM+tx);if(q&&q.d>0)return digFill(tx,ty,t)}
  if(!canPay(d[2])){pop('Yetmaydi: '+costS(d[2]));return null}if(!nearStn(d[4],far)){pop('Avval '+STN[d[4]][1]+' quring va yonida turing');return null}
  if(lv==0&&isW(tx,ty)&&!(FZ[ty]==1)){pop('Suv ustiga qurib bo‘lmaydi');return null}
  if(t==21){if(lv){pop('Robot yer sathida ishga tushadi');return null}pay(d[2]);SB.robots++;robSpawn(cx,cy);SB.dirty=1;invUI();pop('Robot ishga tushdi 🤖',1.6);return{put:{t,tx,ty,lv}}}
  if(t==4&&lv){pop('Eshik faqat yer sathiga qo‘yiladi');return null}
  if(d[3]&&!lv){if(Math.hypot(dwx(cx,P.x),dwy(cy,P.y))<11){pop('O‘zingiz turgan joy');return null}if(hit(cx,cy)){pop('Bu yerda to‘siq bor');return null}if(CA.some(a=>a.dead<=0&&Math.hypot(dwx(a.x,cx),dwy(a.y,cy))<10)){pop('Bu yerda kimdir turibdi');return null}}
  pay(d[2]);const b=sbxPut(tx,ty,t,0,0,lv);invUI();return{put:b}}
function sbxTap(cx,cy){const c=scrTile(cx,cy);SB.cur=c;SB.curT=time;return sbxAct(c[0],c[1],0)}
function sbxItems(items){
  if(SB.lver!==SB.ver){SB.list=[...BLK.values()].sort((a,b)=>a.lv-b.lv);SB.lver=SB.ver}
  let fade=false;for(const b of SB.list){if(b.lv>=2&&Math.abs(dwx(b.x+8,P.x))<30&&Math.abs(dwy(b.y+8,P.y))<30){fade=true;break}}
  for(const b of SB.list){const fl=b.t==5||b.t==14||b.t==13||b.t==17;if(!b.lv&&fl)continue;if(!onS(b.x+8,b.y+8))continue;
    const s=b.t==4&&!b.op&&!b.lv?{x0:b.x,x1:b.x+16,y0:b.y+6,y1:b.y+10}:{x0:b.x+1,x1:b.x+15,y0:b.y+1,y1:b.y+15};
    const a=(fade&&b.lv>=2&&Math.abs(dwx(b.x+8,P.x))<130&&Math.abs(dwy(b.y+8,P.y))<130)?.28:1;
    items.push({...s,f(){if(!b.lv){sbxDraw(b);return}ctx.save();ctx.translate(0,-b.lv*16);ctx.globalAlpha=a;if(fl)sbxFloorUp(b);else sbxDraw(b);ctx.restore()}})}}
function sbxFloorUp(b){const c={5:['#c2a068','#9a7a46','#7a5e32'],14:['#aab0ba','#7c7d88','#62636e'],13:['#6a4a2a','#4a321c','#3a2616'],17:['#2a3a5a','#1a2a48','#141e38']}[b.t];cub(b.x,b.y,16,16,0,2,c[0],c[1],c[2])}
function sbxSave(){try{localStorage.setItem('jsSbx'+MSZ,JSON.stringify({i:INV,t:TLS,r:SB.robots,b:[...BLK.values()].map(b=>[b.tx,b.ty,b.t,+(b.g||0).toFixed(2),b.lv||0]),g:[...DG].map(([k,v])=>[k%TXM,(k/TXM)|0,v.d,v.w?1:0])}))}catch(e){}}
function sbxLoad(){try{const d=JSON.parse(localStorage.getItem('jsSbx'+MSZ));if(!d)return;Object.assign(INV,d.i||{});Object.assign(TLS,d.t||{});(d.g||[]).forEach(q=>{if(q[0]<TXM&&q[1]<TYM&&q[2]>0)DG.set(q[1]*TXM+q[0],{d:Math.min(DMAX,q[2]),w:q[3]|0})});(d.b||[]).forEach(q=>{if(BD[q[2]]&&q[0]<TXM&&q[1]<TYM)sbxPut(q[0],q[1],q[2],1,q[3],q[4]||0)});SB.robots=Math.min(4,d.r||0);for(let i=0;i<SB.robots;i++)robSpawn(P.x+20+i*10,P.y+20);if(TLS.shield)P.shd=50}catch(e){}sbxApply()}
function bbarUI(){let h='<button data-r="1" class="'+(SB.rem?'on':'')+'"><b>⛏</b>Buzish</button><button data-bed="1" class="bedb"><b>🏗</b>Tahrir</button>';BORD.forEach(t=>{const d=BD[t];h+='<button data-b="'+t+'" class="'+(!SB.rem&&SB.sel==t?'on ':'')+(canPay(d[2])?'':'no ')+(t>=15&&t<=21?'fut':'')+'" title="'+d[0]+'"><b>'+d[1]+'</b>'+costS(d[2])+'</button>'});bbar.innerHTML=h}
function nearStn(s,far){if(!s)return true;const id=STN[s][0],R=far?420:90;for(const b of BLK.values())if(b.t==id&&Math.hypot(dwx(b.x+8,P.x),dwy(b.y+8,P.y))<R)return true;return false}
