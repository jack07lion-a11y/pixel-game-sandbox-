import re,sys
D='/tmp/claude-0/-home-claude/43c95dc4-417b-5663-9d27-6b62dcc9eb62/scratchpad/'
src=open(D+'bak_v31.html',encoding='utf-8').read()
rd=lambda n:open(D+n,encoding='utf-8').read()
def sub(old,new,count=1):
    global src
    c=src.count(old)
    assert c==count,('COUNT',c,old[:90])
    src=src.replace(old,new)
def rsub(pat,new,flags=0,count=1):
    global src
    m=re.findall(pat,src,flags)
    assert len(m)==count,('RCOUNT',len(m),pat[:80])
    src=re.sub(pat,lambda _:new,src,flags=flags)
def repl_fn(name,txt):
    global src
    if ('\nfunction '+name+'(') not in src:
        k=src.index('\nfunction sbxDraw(b)')+1
        src=src[:k]+txt.rstrip('\n')+'\n'+src[k:]
        return
    i=src.index('\nfunction '+name+'(')+1
    m=re.compile(r'\n(?=(?:function |const |let |// |document\.|addEventListener|\n))').search(src,i+5)
    src=src[:i]+txt.rstrip('\n')+src[m.start():]
# ---------- HTML ----------
sub('<body>\n','<body><div id="root"><div id="sap"></div>\n') if '<body>\n' in src else sub('<body>','<body><div id="root"><div id="sap"></div>')
markup='''<div id="tbar"></div><div id="rbtn"></div><button id="bed0">🏗</button>
<div id="be"><canvas id="bc"></canvas><div id="bi"></div>
<div id="bt2"><button id="bX">✕</button><button id="bV">🧊 3D</button><button id="bR">⟳</button><button id="bU">↶</button><button id="bZp">＋</button><button id="bZm">－</button><button id="bL1">▲</button><button id="bL2">▼</button><button id="bA">Avto</button><button id="bM">🧱</button><button id="bC">👁</button></div>
<div id="bto"></div><div id="bpal"></div></div>
</div>
<script>'''
sub('<script>',markup)
# ---------- CSS ----------
sub(":root{--bg:#1d2a1f;--fg:#fff;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}",":root{--bg:#1d2a1f;--fg:#fff;--sat:0px;--sab:0px;--sal:0px;--sar:0px;--u:54px;--vw:100vw;--vh:100vh}")
src=src.replace('env(safe-area-inset-top,0px)','var(--sat)').replace('env(safe-area-inset-bottom,0px)','var(--sab)')
sub('</style></head>',rd('land.css')+'</style></head>')
# ---------- skript boshi: moslash ----------
hdr="const cv=document.getElementById('c'),ctx=cv.getContext('2d');\nlet PX,W,H;\nfunction rs(){PX=Math.max(2,Math.round(Math.min(innerWidth,innerHeight)/170));W=Math.ceil(innerWidth/PX);H=Math.ceil(innerHeight/PX);cv.width=W;cv.height=H;cv.style.width=W*PX+'px';cv.style.height=H*PX+'px';ctx.imageSmoothingEnabled=false}\naddEventListener('resize',rs);rs();\n"
sub(hdr,'var BEDON=0;\n'+rd('lay.js')+'/*LAYEND*/\n')
a,b=src.split('/*LAYEND*/')
assert 'innerWidth' in b
b=re.sub(r'\binnerWidth\b','VW',b);b=re.sub(r'\binnerHeight\b','VH',b)
src=a+'/*LAYEND*/'+b
sub('document.body.insertAdjacentHTML','ROOT.insertAdjacentHTML',2)
# ---------- sandbox ma'lumotlari ----------
sub("food:1,chip:0,cell:0};","food:1,chip:0,cell:0,dirt:0,sand:0,snowb:0};")
sub("cell:['🔋','Energiya']};","cell:['🔋','Energiya'],dirt:['🟤','Tuproq'],sand:['🟨','Qum'],snowb:['❄️','Qor']};")
sub("const TLS={sword:0,armor:0,laser:0,shield:0};","const TLS={sword:0,armor:0,laser:0,shield:0,shovel:0,pick:0};")
sub("21:['Robot yordamchi','🤖',{iron:8,chip:3,cell:2},0,'lab',0]};","21:['Robot yordamchi','🤖',{iron:8,chip:3,cell:2},0,'lab',0],\n  22:['Tuproq bloki','🟤',{dirt:1},1,'',40],23:['Qum bloki','🟨',{sand:1},1,'',20],24:['G‘isht','🧱',{stone:1,dirt:1},1,'fu',100],25:['Qor bloki','❄️',{snowb:1},1,'',15],26:['Tom','🔻',{wood:2},1,'',30],27:['Ustun','🪵',{wood:2},1,'',50]};")
sub("const BORD=[1,2,4,5,14,6,7,8,9,10,11,13,12,3,20,19,16,15,18,17,21];","const BORD=[1,2,22,23,25,24,26,27,4,5,14,6,7,8,9,10,11,13,12,3,20,19,16,15,18,17,21];")
sub("'50 zararni yutadi']];","'50 zararni yutadi'],\n  ['shovel','🪏 Belkurak',{wood:2,stone:1},'wb','Tuproq, qum, qor ×3 tez qaziladi'],['pick','⛏ Ketmon',{wood:2,stone:3},'wb','Tosh va ruda tez; oltin/kristall faqat shu bilan']];")
sub("const SB={on:0,sel:1,rem:0,cur:null,curT:-9,dirty:0,saveT:3,tpCd:0,beams:[],robots:0,tick:0};","const SB={on:0,sel:1,rem:0,cur:null,curT:-9,dirty:0,saveT:3,tpCd:0,beams:[],robots:0,tick:0,ver:0,list:null,lver:-1,hold:null,dg:null,mt:-9};")
sub("bkey=(tx,ty)=>ty*TXM+tx","bkey=(tx,ty,lv)=>(lv|0)*TXM*TYM+ty*TXM+tx")
# ---------- funksiyalarni almashtirish ----------
fns=re.split(r'\n(?=function )','\n'+rd('sbx2.js').strip()+'\n')
for f in fns:
    f=f.strip('\n')
    if not f:continue
    name=re.match(r'function (\w+)\(',f).group(1)
    repl_fn(name,f)
sub("function sbxUpdate(dt){SB.tpCd-=dt;","function sbxUpdate(dt){digUpdate(dt);SB.tpCd-=dt;")
sub("for(const b of BLK.values()){if(b.t!=5&&b.t!=14&&b.t!=13&&b.t!=17)continue;if(!onS(b.x+8,b.y+8))continue;","for(const b of BLK.values()){if(b.lv||(b.t!=5&&b.t!=14&&b.t!=13&&b.t!=17))continue;if(!onS(b.x+8,b.y+8))continue;")
sub("  if(c){const o=pj(c[0]*16,c[1]*16),ex=BLK.get(bkey(c[0],c[1])),ok=SB.rem?!!ex:(!ex&&canPay(BD[SB.sel][2]));","  digCrack();\n  if(c){const o=pj(c[0]*16,c[1]*16),ex=BLK.get(bkey(c[0],c[1])),ok=SB.rem?(!!ex||digOk(c[0],c[1])):(!ex&&canPay(BD[SB.sel][2]));")
cases=open(D+'cases.js',encoding='utf-8').read()
sub("  case 19:E(X,Y,3,1,'rgba(0,0,0,.25)');",cases+"  case 19:E(X,Y,3,1,'rgba(0,0,0,.25)');")
# ---------- render ----------
sub("    if(ty==TY-1)ctx.drawImage(CLS[bi],X,Y);","    if(DG.size&&!isW(tx,ty)){const q=DG.get(ty*TXM+tx);if(q)pitDraw(q,X,Y,tx,ty)}\n    if(ty==TY-1)ctx.drawImage(CLS[bi],X,Y);")
sub("zz=Math.round(P.z),Y0=o[1],Y=Y0-zz;","zz=Math.round(P.z),Y0=o[1]+Math.round(P.pz||0),Y=Y0-zz;")
sub("ctx.restore();if(TF.act)tfFx(X,Y);","ctx.restore();if(TF.act)tfFx(X,Y);digFx(X,Y);")
sub("const pop=(s,t)=>pops.push({x:P.x,y:P.y,z:34,t:t||1,s});","const pop=(s,t)=>{if(BEDON)bedToast(s);pops.push({x:P.x,y:P.y,z:34,t:t||1,s})};")
sub("function invUI(){if(SB.on)bbarUI();","function invUI(){if(SB.on)bbarUI();if(BEDON)bedPal();")
rsub(r"\(\{sword:[^}]*\}\)\[k\]","({sword:'⚔️',armor:'🛡',laser:'🔫',shield:'✨',shovel:'🪏',pick:'⛏'})[k]")
rsub(r"^bbar\.onclick=.*$","bbar.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.bed){bedOpen();return}if(b.dataset.r){SB.rem=!SB.rem}else{SB.rem=0;SB.sel=+b.dataset.b;pop(BD[SB.sel][0],.9)}bbarUI()};",re.M)
sub("addEventListener('pointerdown',e=>{if(SB.on&&e.target===cv)bTp={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId}},true);","addEventListener('pointerdown',e=>{if(SB.on&&e.target===cv){bTp={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId};if(SB.rem){const c=scrTile(e.clientX,e.clientY);SB.hold={id:e.pointerId,tx:c[0],ty:c[1],x:e.clientX,y:e.clientY};SB.cur=c;SB.curT=time}}},true);")
sub("addEventListener('pointerup',e=>{if(bTp&&e.pointerId===bTp.id){","addEventListener('pointerup',e=>{if(SB.hold&&e.pointerId===SB.hold.id)SB.hold=null;if(bTp&&e.pointerId===bTp.id){")
sub("addEventListener('pointermove',e=>{if(SB.on&&e.pointerType=='mouse'&&e.target===cv)","addEventListener('pointercancel',e=>{if(SB.hold&&e.pointerId===SB.hold.id)SB.hold=null});\naddEventListener('pointermove',e=>{if(SB.hold&&e.pointerId===SB.hold.id&&Math.hypot(e.clientX-SB.hold.x,e.clientY-SB.hold.y)>14)SB.hold=null;if(SB.on&&e.pointerType=='mouse'&&e.target===cv)")
sub("addEventListener('keydown',e=>{if(e.repeat||gmOpen||edOpen)return;const k=e.key.toLowerCase();if(k=='n')","addEventListener('keydown',e=>{if(e.repeat||gmOpen||edOpen||BED.on)return;const k=e.key.toLowerCase();if(k=='n')")
sub("Kelajak buyumlari uchun Dastgoh","Yerni qazish: ⛏ Buzish rejimida yerni bosib turing (belkurak/ketmon tezlashtiradi; qatlamlar: tuproq → tosh → ruda; chuqurni Tuproq/Qum bloki bilan to‘ldirasiz). 🏗 — katta qurish tahriri (tepadan/3D, ko‘p qavat). Kelajak buyumlari uchun Dastgoh")
# ---------- modullar ----------
dig=rd('dig.js')+"\nconst BED={on:0,cx:0,cy:0,z:18,r:0,tl:1,tt:1,lv:0,auto:1,cut:0,hov:null,pts:new Map(),hold:null,undo:[],col:new Map(),cver:-1,first:1,mp:null,hovT:-9,mouse:0,pd:0,multi:0,infoT:0};\n"
M1='// ===================== SANDBOX: resurslar, qurilish, buzish, yasash ====================='
sub(M1,dig+M1)
M2='sbxLoad();\n\n// ===================== EKOLOGIYA'
sub(M2,'sbxLoad();\n\n'+rd('bed.js')+'\n// ===================== EKOLOGIYA')
# ---------- loop ----------
sub("if(gmOpen||edOpen){if(gmOpen)drawMap();else edDraw();requestAnimationFrame(loop);return}","if(gmOpen||edOpen){if(gmOpen)drawMap();else edDraw();requestAnimationFrame(loop);return}if(BED.on){wrapAll();setRef();update(dt);bedDraw(dt);requestAnimationFrame(loop);return}")
sub("requestAnimationFrame(loop);\n</script>",rd('lay2.js')+"\nrequestAnimationFrame(loop);\n</script>")
open('/mnt/user-data/outputs/pixel-game.html','w',encoding='utf-8').write(src)
print('OK',len(src))
