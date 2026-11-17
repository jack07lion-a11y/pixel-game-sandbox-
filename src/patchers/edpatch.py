p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:70],s.count(a)); s=s.replace(a,b)
# rename template functions
rep("const isP=(a,b)=>{const m=","const isP0=(a,b)=>{const m=")
rep("const biome=(tx,ty)=>{tx=((tx%TXM)+TXM)%TXM;","const biome0=(tx,ty)=>{tx=((tx%TXM)+TXM)%TXM;")
rep("isW=(tx,ty)=>{const m=((tx%60)+60)%60,c=rc(ty);return m==c||m==c+1},isBr=ty=>{","isW0=(tx,ty)=>{const m=((tx%60)+60)%60,c=rc(ty);return m==c||m==c+1},isBr0=ty=>{")
# insert painted layer wrappers right after rc line
i=s.index("const rc=ty=>");j=s.index("\n",i)
ins='''
// ---------- Qo'lda chizilgan dunya (muharrir ma'lumoti) ----------
const GX=WW/32,GY=WH/32;
function pmEnc(d){const out=[];[d.T,d.R,d.M].forEach(a=>{let i=0;while(i<a.length){const v=a[i];let n=1;while(i+n<a.length&&a[i+n]===v&&n<255)n++;out.push(v,n);i+=n}});let t='';for(let i=0;i<out.length;i+=8000)t+=String.fromCharCode.apply(null,out.slice(i,i+8000));return 'JS1,'+d.gx+','+d.gy+','+btoa(t)}
function pmDec(str){try{if(!str)return null;const p=str.trim().split(',');if(p[0]!='JS1'||p.length<4)return null;const gx=+p[1],gy=+p[2],raw=atob(p.slice(3).join(',')),N=gx*gy,A=[new Uint8Array(N),new Uint8Array(N),new Uint8Array(N)];let ai=0,pos=0;
  for(let i=0;i+1<raw.length&&ai<3;i+=2){const v=raw.charCodeAt(i),n=raw.charCodeAt(i+1),a=A[ai];for(let k=0;k<n&&pos<N;k++)a[pos++]=v;if(pos>=N){ai++;pos=0}}
  return ai<3?null:{gx,gy,T:A[0],R:A[1],M:A[2]}}catch(e){return null}}
let PMD=null;try{if(localStorage.getItem('jsPaintOn')==='1'){const d=pmDec(localStorage.getItem('jsPaint'));if(d&&d.gx==GX&&d.gy==GY)PMD=d}}catch(e){}
const pI=(a,b)=>(b>>1)*GX+(a>>1),pw=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;return a<60&&b<45?-1:pI(a,b)};
const isP=(a,b)=>{if(!PMD)return isP0(a,b);const i=pw(a,b);if(i<0)return isP0(a,b);const r=PMD.R[i];return r==2||r==3};
const isW=(a,b)=>{if(!PMD)return isW0(a,b);const i=pw(a,b);if(i<0)return isW0(a,b);return PMD.T[i]==4||PMD.R[i]==1||PMD.R[i]==3};
const isBr=(a,b)=>{if(!PMD)return isBr0(b);const i=pw(a,b);if(i<0)return isBr0(b);return PMD.R[i]==3};
const isOc=(a,b)=>{if(!PMD)return false;const i=pw(a,b);return i>=0&&PMD.T[i]==4};
const biome=(a,b)=>{if(!PMD)return biome0(a,b);const i=pw(a,b);if(i<0)return biome0(a,b);const t=PMD.T[i];return t>3?0:t};
const hw=(x,y)=>{const i=pw(x>>4,y>>4);if(i<0)return false;const t=PMD.T[i],r=PMD.R[i];return t==4?r!=3:(r==1&&t!=2)};'''
s=s[:j]+ins+s[j:]
# call sites
rep("if(isW(x>>4,y>>4)&&!isBr(y>>4))wrip.push","if(isW(x>>4,y>>4)&&!isBr(x>>4,y>>4))wrip.push")
rep("br=isBr(ty);","br=isBr(tx,ty);")
rep("if(!isBr(ty-1))","if(!isBr(tx,ty-1))")
rep("if(!isBr(ty+1))","if(!isBr(tx,ty+1))")
rep("(isW(x>>4,y>>4)&&biome(x>>4,y>>4)!=2&&!isBr(y>>4))","(isW(x>>4,y>>4)&&biome(x>>4,y>>4)!=2&&!isBr(x>>4,y>>4))")
rep("if(isW(tx,ty)&&!isBr(ty)&&biome(tx,ty)!=2)","if(isW(tx,ty)&&!isBr(tx,ty)&&biome(tx,ty)!=2)")
rep("if(isW(tx,ty))c3=bi==2?[190,225,238]:isBr(ty)?[140,100,60]:[58,130,190];","if(isW(tx,ty))c3=isOc(tx,ty)?[24,78,140]:bi==2?[190,225,238]:isBr(tx,ty)?[140,100,60]:[58,130,190];")
rep("isW(tx,ty)?(biome(tx,ty)==2?'#bfe0ee':'#4694c6')","isW(tx,ty)?(isOc(tx,ty)?'#2a6aa8':biome(tx,ty)==2?'#bfe0ee':'#4694c6')")
# river solids only in template cell when painted
rep("for(let ty=0;ty<WH/16;ty++){if(isBr(ty))continue;for(let k=0;k<MCX;k++){","for(let ty=0;ty<(PMD?45:WH/16);ty++){if(isBr0(ty))continue;for(let k=0;k<(PMD?1:MCX);k++){")
# water collision
rep("y-=Math.floor(y/WH)*WH;const i=Math.floor(x/48)","y-=Math.floor(y/WH)*WH;if(PMD&&hw(x,y))return true;const i=Math.floor(x/48)")
# villages instead of random houses/lakes
rep("\ngenExtra();\n","""
function genVill(){for(let cy=0;cy<GY;cy++)for(let cx=0;cx<GX;cx++){if(PMD.M[cy*GX+cx]!=1||(cx<30&&cy<23))continue;const X=cx*32+16,Y=cy*32+16;for(let k=0;k<4;k++){const a=k*1.57+.5,x=Math.round(X+Math.cos(a)*70-28),y=Math.round(Y+Math.sin(a)*50-13);if(isW(x>>4,y>>4)||isW((x+56)>>4,(y+26)>>4)||nearRiver(x,y,1)||biome(x>>4,y>>4)==3||HS.some(h=>Math.abs(h.x-x)<64&&Math.abs(h.y-y)<34))continue;HS.push({x,y,r:Math.floor(rnd()*4),w:56,h:26,H:34})}}}
if(PMD)genVill();else genExtra();
""")
# loop + editor module
js=open('edmod.js',encoding='utf-8').read()
rep("function loop(t){",js+"function loop(t){")
rep("if(gmOpen){drawMap();requestAnimationFrame(loop);return}","if(gmOpen||edOpen){if(gmOpen)drawMap();else edDraw();requestAnimationFrame(loop);return}")
# html + css
rep("</style></head><body>","""#ed0{position:fixed;right:152px;top:calc(env(safe-area-inset-top,0px) + 8px);width:40px;height:40px;border-radius:50%;border:2px solid #fff;background:rgba(0,0,0,.35);font-size:18px;color:#fff;padding:0}
#ed{position:fixed;inset:0;display:none;background:#0b1220;z-index:60;touch-action:none;color:#fff;font:12px ui-monospace,monospace;user-select:none}#ec{display:block;width:100%;height:100%;touch-action:none}
#eb{position:absolute;left:10px;top:8px;font-size:13px;pointer-events:none}
#ea{position:absolute;left:0;right:0;top:34px;display:flex;gap:5px;padding:0 8px;overflow-x:auto;scrollbar-width:none}
#ea button,#es button{flex:none;height:30px;padding:0 9px;border-radius:15px;border:2px solid #fff;background:rgba(20,40,80,.9);color:#fff;font:700 12px ui-monospace,monospace}
#ea button.on,#es button.on,#ep button.on{border-color:#ffe27a;background:rgba(110,80,20,.95)}
#es{position:absolute;left:0;right:0;bottom:58px;display:flex;gap:8px;align-items:center;padding:6px 10px;background:rgba(10,20,40,.85)}
#es input{flex:1;max-width:220px}
#ep{position:absolute;left:0;right:0;bottom:0;height:56px;display:flex;gap:5px;padding:5px 8px;overflow-x:auto;background:rgba(10,20,40,.92);scrollbar-width:none}
#ep button{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:62px;border-radius:8px;border:2px solid #667;background:rgba(30,50,90,.9);color:#fff;font:700 10px ui-monospace,monospace}
#ep i{display:block;width:22px;height:10px;border:1px solid #fff;border-radius:2px}
#ecd{position:absolute;inset:60px 12px auto 12px;display:none;flex-direction:column;gap:6px;background:rgba(10,20,40,.97);border:2px solid #fff;border-radius:10px;padding:10px;z-index:3}
#ecd textarea{height:140px;background:#000;color:#9f9;font:10px ui-monospace,monospace;border:1px solid #567;word-break:break-all}
#ecd div{display:flex;gap:6px}#ecd button{flex:1;height:32px;border-radius:8px;border:2px solid #fff;background:rgba(30,60,110,.95);color:#fff;font:700 12px ui-monospace,monospace}
#etoast{position:absolute;left:50%;top:70px;transform:translateX(-50%);background:rgba(0,0,0,.8);border:1px solid #fff;border-radius:8px;padding:6px 12px;opacity:0;transition:opacity .3s;pointer-events:none}
</style></head><body>""")
rep('<button id="mute">🔊</button>','''<button id="mute">🔊</button>
<button id="ed0">✏️</button>
<div id="ed"><canvas id="ec"></canvas><div id="eb"><b>✏️ Dunyo muharriri</b> · bitta katak = 2×2 plitka (~32 m)</div>
<div id="ea"><button id="ebu">↶ Orqaga</button><button id="ebf">🪣 To‘ldirish</button><button id="ebp">✋ Siljitish</button><button id="ebr">🎲 Standart</button><button id="ebc">🧹 Okean</button><button id="ebk">📋 Kod</button><button id="ebs">💾</button><button id="ebg">▶ O‘ynash</button><button id="ebd">Avto-dunyo</button><button id="ebx">✕</button></div>
<div id="es"><span>Cho‘tka</span><input id="esz" type="range" min="1" max="24" value="4"><b id="esv">4</b><button id="esh">● yumaloq</button></div>
<div id="ep"></div>
<div id="ecd"><textarea id="ect"></textarea><div><button id="eci">Yuklash</button><button id="ecc">Nusxa</button><button id="ecx">Yopish</button></div></div><div id="etoast"></div></div>''')
open(p,'w',encoding='utf-8').write(s)
