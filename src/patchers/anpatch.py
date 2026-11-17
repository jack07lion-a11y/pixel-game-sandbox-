p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# --- natural rivers/roads: periodic smooth warp of the R lookup ---
rep("pw=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;return a<60&&b<45?-1:pI(a,b)}",
"pw=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;if(a<60&&b<45)return -1;const A=a/TXM*6.2832,B=b/TYM*6.2832,u=a+Math.round(2.7*Math.sin(B*8+A*3)+1.3*Math.sin(B*21-A*11)),v=b+Math.round(2.7*Math.sin(A*9-B*4+1.3)+1.3*Math.sin(A*23+B*13));return pI(((u%TXM)+TXM)%TXM,((v%TYM)+TYM)%TYM)}")
# --- palettes ---
rep("grn:['#3a9a5a','#2a8a4a','#1a6a3a','#104a28']};","grn:['#3a9a5a','#2a8a4a','#1a6a3a','#104a28'],zeb:['#f4f4f4','#d8d8d8','#a0a0a0','#606060'],gir:['#e8b040','#c88a28','#9a6418','#6a420c'],shp:['#f2f0ea','#d6d2c6','#aaa498','#7a766c'],pnd:['#f4f4f4','#d8d8d8','#9a9a9a','#505050'],pol:['#ffffff','#eef4f8','#cfdce6','#a4b6c4'],wlf:['#8a8e98','#6e727e','#4e525e','#32353e'],lzd:['#c8b050','#a89038','#80702a','#584c1c'],flz:['#e8582a','#c8401c','#9a2e12','#6a1e0a'],cdr:['#b98aff','#9a6ae0','#7a4ab8','#523080'],bor:['#6a4a34','#52382a','#3c281c','#281a10'],dk:['#222','#222','#222','#222'],bk:['#3a3028','#3a3028','#3a3028','#3a3028']};")
cases='''  case 11:{const by=G-14,gz=f==5,hx=X+11,hy=gz?G-6:G-22,rf=AP.zeb.slice(1);
    leg(rf,X+6,by+2,-sw,12,2);leg(rf,X-6,by+2,sw,12,2);E2(AP.zeb,2,X,by,8,4);leg(AP.zeb,X+6,by+2,sw,12,2);leg(AP.zeb,X-6,by+2,-sw,12,2);
    fl('#222',()=>{for(const i of[-5,-2,1,4])sR(S,X+i,by-3,1,6);sR(S,X-9,by-2,1,6)});
    pt(AP.zeb,1,(g,a,b)=>sL(g,X+6,by-2,hx-1,hy+2,4,a,b));E2(AP.zeb,1,hx+1,hy,3,2);R2(AP.zeb,1,hx+3,hy,3,2);
    fl('#222',()=>{sR(S,hx+5,hy,1,1);sR(S,hx+1,hy-1,1,1);sR(S,hx-2,hy-4,2,3);sR(S,hx-3,hy-1,1,5);sR(S,hx+2,hy-2,2,1)});break}
  case 12:{const by=G-18,gz=f==5,hx=gz?X+13:X+10,hy=gz?G-7:G-39,rf=AP.gir.slice(1);
    leg(rf,X+5,by+2,-sw,16,2);leg(rf,X-5,by+2,sw,16,2);E2(AP.gir,2,X-1,by,7,4);leg(AP.gir,X+5,by+2,sw,16,2);leg(AP.gir,X-5,by+2,-sw,16,2);
    pt(AP.gir,1,(g,a,b)=>sL(g,X+5,by-2,hx-1,hy+2,3,a,b));E2(AP.gir,1,hx+1,hy,3,2);R2(AP.gir,1,hx+3,hy,2,2);
    fl('#7a4a18',()=>{sR(S,X-4,by-2,2,2);sR(S,X+1,by,2,2);sR(S,X-2,by+1,2,1);if(!gz){sR(S,X+7,hy+8,2,2);sR(S,X+8,hy+15,2,2)}sR(S,X-8,by-2,1,6)});
    fl('#4a2a0a',()=>{sR(S,hx+4,hy,1,1);sR(S,hx+1,hy-1,1,1);sR(S,hx,hy-4,1,2);sR(S,hx+2,hy-4,1,2)});break}
  case 13:{const gz=f==5;
    leg(AP.bk,X+4,G-6,-sw,5,2);leg(AP.bk,X-4,G-6,sw,5,2);E2(AP.shp,2,X,G-9,6,5);E2(AP.shp,1,X-3,G-11,4,3);E2(AP.shp,1,X+3,G-11,4,3);
    leg(AP.bk,X+4,G-6,sw,5,2);leg(AP.bk,X-4,G-6,-sw,5,2);const hy=gz?G-5:G-11;
    fl('#4a4038',()=>{sE(S,X+8,hy,3,3);sR(S,X+7,hy-3,3,1)});fl('#fff',()=>sR(S,X+9,hy-1,1,1));fl('#111',()=>sR(S,X+9,hy,1,1));break}
  case 14:{const gz=f==5;
    leg(AP.dk,X+4,G-6,-sw,6,3);leg(AP.dk,X-4,G-6,sw,6,3);E2(AP.pnd,2,X,G-9,6,5);fl('#222',()=>sR(S,X+2,G-14,3,9));
    leg(AP.dk,X+4,G-6,sw,6,3);leg(AP.dk,X-4,G-6,-sw,6,3);const hy=gz?G-6:G-12;E2(AP.pnd,1,X+8,hy,4,4);
    fl('#222',()=>{sR(S,X+5,hy-5,2,2);sR(S,X+10,hy-5,2,2);sR(S,X+6,hy-2,2,2);sR(S,X+10,hy-2,2,2);sR(S,X+11,hy+1,2,1)});fl('#fff',()=>{sR(S,X+7,hy-2,1,1);sR(S,X+10,hy-2,1,1)});break}
  case 15:{const gz=f==5;
    leg(AP.pol.slice(1),X+5,G-7,-sw,7,3);leg(AP.pol.slice(1),X-5,G-7,sw,7,3);E2(AP.pol,2,X,G-10,8,5);leg(AP.pol,X+5,G-7,sw,7,3);leg(AP.pol,X-5,G-7,-sw,7,3);
    const hy=gz?G-5:G-12;E2(AP.pol,1,X+9,hy,3,3);R2(AP.pol,1,X+11,hy,3,2);fl('#111',()=>{sR(S,X+14,hy,1,1);sR(S,X+10,hy-1,1,1)});fl(AP.pol[2],()=>sR(S,X+8,hy-4,2,2));break}
  case 16:{const by=G-10;E2(AP.wlf,2,X-10,by+1,4,2);
    leg(AP.wlf.slice(1),X+5,by+1,-sw,9,2);leg(AP.wlf.slice(1),X-5,by+1,sw,9,2);E2(AP.wlf,2,X,by,7,3);leg(AP.wlf,X+5,by+1,sw,9,2);leg(AP.wlf,X-5,by+1,-sw,9,2);
    E2(AP.wlf,1,X+8,by-2,3,3);R2(AP.wlf,1,X+10,by-1,4,2);fl('#ddd',()=>sR(S,X+4,by-1,2,4));fl('#eee',()=>{sR(S,X+11,by-1,1,1)});fl('#222',()=>{sR(S,X+13,by-1,1,1);sR(S,X+10,by-3,1,1)});R2(AP.wlf,1,X+6,by-7,2,4);R2(AP.wlf,1,X+9,by-7,2,3);break}
  case 17:case 18:{const pl=sp==17?AP.lzd:AP.flz,m=f%2?1:-1;
    pt(pl,1,(g,a,b)=>sL(g,X-5,G-3,X-12,G-2+m,2,a,b));leg(pl.slice(1),X+3,G-3,-sw,3,1);leg(pl.slice(1),X-3,G-3,sw,3,1);E2(pl,2,X,G-4,6,2);leg(pl,X+3,G-3,sw,3,1);leg(pl,X-3,G-3,-sw,3,1);
    E2(pl,1,X+7,G-5,2,2);fl('#111',()=>sR(S,X+8,G-6,1,1));fl(sp==17?'#8a6a20':'#ffd060',()=>{for(let i=-3;i<=3;i+=2)sR(S,X+i,G-6,1,1)});if(sp==18)fl('rgba(255,200,60,.5)',()=>sR(S,X-1,G-7,3,1));break}
  case 19:{const by=G-15,gz=f==5,hx=X+12,hy=gz?G-6:G-21,rf=AP.cdr.slice(1);
    leg(rf,X+6,by+2,-sw,13,2);leg(rf,X-6,by+2,sw,13,2);E2(AP.cdr,2,X,by,9,4);leg(AP.cdr,X+6,by+2,sw,13,2);leg(AP.cdr,X-6,by+2,-sw,13,2);
    pt(AP.cdr,1,(g,a,b)=>sL(g,X+7,by-2,hx-1,hy+2,4,a,b));E2(AP.cdr,1,hx+1,hy,3,2);R2(AP.cdr,1,hx+3,hy,3,2);
    fl('#e8d0ff',()=>{sL(S,hx,hy-3,hx-2,hy-9,1);sL(S,hx-2,hy-9,hx-5,hy-11,1);sL(S,hx-1,hy-6,hx+2,hy-10,1);sR(S,X-3,by-2,1,1);sR(S,X+1,by-3,1,1);sR(S,X+4,by-1,1,1)});fl('#fff',()=>{sR(S,hx+1,hy-1,1,1)});break}
  case 20:{const by=G-9;leg(AP.bor.slice(1),X+5,by+2,-sw,7,2);leg(AP.bor.slice(1),X-5,by+2,sw,7,2);E2(AP.bor,2,X,by,7,4);leg(AP.bor,X+5,by+2,sw,7,2);leg(AP.bor,X-5,by+2,-sw,7,2);
    fl('#281a10',()=>{for(let i=-5;i<=4;i+=2)sR(S,X+i,by-5,1,2)});E2(AP.bor,1,X+8,by,3,3);R2(AP.bor,1,X+10,by,3,3);fl('#fff',()=>{sR(S,X+10,by+3,1,2);sR(S,X+7,by+3,1,2)});fl('#111',()=>{sR(S,X+8,by-2,1,1);sR(S,X+13,by+1,1,1)});break}
  }
  return outline(o)}'''
rep("  }\n  return outline(o)}",cases)
rep("const ANS=Array.from({length:10},","const ANS=Array.from({length:21},")
rep("{n:'O\\u2018rdak',w:12,f:0,s:40,r:4}];","{n:'O\\u2018rdak',w:12,f:0,s:40,r:4},{n:'Qarg\\u2018a',w:0,f:0,s:0,r:3},{n:'Zebra',w:16,f:80,s:90,r:7},{n:'Jirafa',w:12,f:62,s:110,r:7},{n:'Qo\\u2018y',w:12,f:48,s:60,r:6},{n:'Panda',w:10,f:40,s:60,r:6},{n:'Oq ayiq',w:12,f:50,s:80,r:8},{n:'Bo\\u2018ri',w:20,f:70,s:80,r:6},{n:'Kaltakesak',w:12,f:56,s:50,r:3},{n:'Olovli kaltakesak',w:12,f:56,s:50,r:3},{n:'Kristall kiyik',w:18,f:75,s:90,r:7},{n:'Yovvoyi cho\\u2018chqa',w:14,f:60,s:70,r:6}];")
rep("function sndA(sp,x,y){if(!AC)return;","const SNDM={11:1,12:1,13:7,14:0,15:4,16:6,17:0,18:0,19:1,20:0};\nfunction sndA(sp,x,y){if(!AC)return;if(sp>10)sp=SNDM[sp];")
rep("return hit(x,y)||(sp<8&&(SIMS","return hit(x,y)||((sp<8||sp>10)&&(SIMS")
# region filters on generic spawns
rep("one(0,14*MCL,0);for(let i=0;i<3*MCL;i++)grp(1,3,0);for(let i=0;i<3*MCL;i++)grp(3,4,0);",
"const okR=l=>(x,y)=>l.includes(rgT(x>>4,y>>4));\none(0,14*MCL,0,okR([0,1,2,5]));for(let i=0;i<3*MCL;i++)grp(1,3,0,okR([0,1,2,5]));for(let i=0;i<3*MCL;i++)grp(3,4,0);")
rep("for(let i=0;i<2*MCL;i++)grp(4,3,1);","for(let i=0;i<2*MCL;i++)grp(4,3,1,okR([0,6,8,9]));")
rep("for(let i=0;i<2*(MCL-1);i++)grp(5,4,2);one(6,4*MCL,2);one(7,8*MCL,3);","for(let i=0;i<2*(MCL-1);i++)grp(5,4,2,okR([0,10]));one(6,4*MCL,2,okR([0,10,11]));one(7,8*MCL,3,okR([0,13,14]));")
# region-specific spawns after ducks line
anchor="[[0,1],[2,3],[1,2]].forEach(([li,n])=>{const L=SIMS[li];"
i=s.index(anchor);j=s.index('\n',i)
spawn='''
const RZAN=[null,[[20,3,.05],[1,3,.05]],[[13,5,.07],[0,1,.12]],[[3,3,.06],[0,1,.05]],[[11,5,.06],[12,2,.04]],[[14,2,.05],[0,1,.1],[3,3,.05]],[[17,1,.1],[4,3,.03]],[[17,1,.1],[7,3,.05]],[[4,3,.08],[1,2,.06],[17,1,.06]],[[17,1,.08],[4,2,.02]],[[15,1,.03],[5,4,.05],[6,1,.05]],[[16,3,.04],[1,3,.05],[6,1,.04]],[[18,1,.1]],[[19,3,.06],[7,2,.03]],[[7,3,.07],[16,2,.025]]];
for(let i=0,n=900*MCL;i<n;i++){const x=20+Math.random()*(WW-40),y=20+Math.random()*(WH-40),t=rgT(x>>4,y>>4);if(t<=0)continue;for(const q of RZAN[t]){if(Math.random()<q[2]){if(blk(0,x,y)||Math.hypot(x-P.x,y-P.y)<70)break;herdN++;for(let k=0;k<q[1];k++){const px=x+Math.random()*16-8,py=y+Math.random()*16-8;if(!blk(0,px,py))newA(q[0],px,py,q[1]>1?herdN:null)}break}}}'''
s=s[:j+1]+spawn+s[j+1:]
open(p,'w',encoding='utf-8').write(s)
print('ok')
