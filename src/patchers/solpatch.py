import re
p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:70],s.count(a))
    s=s.replace(a,b)
# html/css
rep('<button id="gs">🌍</button>','<button id="gs">🌍</button><button id="gsun">☀</button><div id="sp"><button id="spS">☀ Quyosh</button><button id="spE">🌍 Yer</button><button data-ts="1">×1</button><button data-ts="40">×40</button><button data-ts="400">×400</button></div>')
rep('#gp{right:12px;bottom:90px}','#gsun{right:12px;top:calc(env(safe-area-inset-top,0px) + 118px)}#sp{position:absolute;left:10px;bottom:14px;display:none;gap:6px;flex-wrap:wrap;max-width:calc(100% - 80px)}#gm #sp button{position:static;width:auto;height:38px;border-radius:19px;padding:0 12px;font-size:14px}#gm #sp button.on{background:#c98a10}#gp{right:12px;bottom:90px}')
# hw + arrays
rep('let OCW=true;const hw=(x,y)=>{','let OCW=true;const TYR=WH/16,FZ=new Uint8Array(512),SNA=new Float32Array(512),HTA=new Float32Array(512),TRW=new Float32Array(512);const hw=(x,y)=>{')
rep('return t==4?(OCW&&r!=3):(r==1&&t!=2)};','return t==4?(OCW&&r!=3):(r==1&&t!=2&&!FZ[(y>>4)&511])};')
rep('const oc=(x,y)=>isOc(Math.floor(x/16),Math.floor(y/16));','const oc=(x,y)=>isOc(Math.floor(x/16),Math.floor(y/16))&&!FZ[((Math.floor(y/16)%TYR)+TYR)%TYR];')
# render
rep('const fr=bi==2,br=isBr(tx,ty);','const fr=bi==2||FZ[ty]==1,br=isBr(tx,ty);')
rep('if(PMD&&!br&&isOc(tx,ty)){let n=0;','if(PMD&&!br&&!fr&&isOc(tx,ty)){let n=0;')
rep("TL[bi][h%3],X,Y);if(rt>0){","TL[bi][h%3],X,Y);if(SNA[ty]>.04)dmd(X,Y,'rgba(244,248,253,'+(SNA[ty]*(.8+(h&3)*.07)).toFixed(2)+')');else if(HTA[ty]>.05)dmd(X,Y,'rgba(255,196,80,'+(HTA[ty]*.16).toFixed(3)+')');if(rt>0){")
# env
rep('const ph=(time/150+.2)%1;sunV=Math.sin(ph*6.2832);','sunV=solV();')
rep('snowA+=((pb==2?1:0)-snowA)','snowA+=((pb==2||SNA[(P.y>>4)&511]>.45?1:0)-snowA)')
# loop
rep('last=t;time+=dt;if(gmOpen||edOpen)','last=t;time+=dt;solarStep(dt*((gmOpen&&gMode==2)?SP.ts:1));if(gmOpen||edOpen)')
# globe
a=s.index('function renderGlobe(t){');b=s.index('gbx.putImageData(gbi,0,0)}',a)+len('gbx.putImageData(gbi,0,0)}')
s=s[:a]+s[b:]
rep('const w=gc.width,h=gc.height;gg.fillStyle=\'#02050c\'','const w=gc.width,h=gc.height;if(gMode==2){drawSpace(w,h);return}gg.fillStyle=\'#02050c\'')
rep('gg.drawImage(gb,gcx-gR,gcy-gR,gR*2,gR*2)','gg.drawImage(gbV,gcx-gR,gcy-gR,gR*2,gR*2)')
rep("gMode^=1;gZoom=1;gPan=[0,0];if(gMode==0)gAnim=1}","setMode(gMode==0?1:0)}")
rep('gZoom=Math.min(4,gZoom*1.3)};','zb(1.3)};')
rep('gZoom=Math.max(.5,gZoom/1.3)};','zb(1/1.3)};')
rep('if(gPD>0)gZoom=Math.max(.5,Math.min(4,gZoom*d/gPD));','if(gPD>0)zb(d/gPD);')
rep('gc.onwheel=e=>{e.preventDefault();gZoom=Math.max(.5,Math.min(4,gZoom*(e.deltaY<0?1.12:1/1.12)))};','gc.onwheel=e=>{e.preventDefault();zb(e.deltaY<0?1.12:1/1.12)};')
rep("pop('Okeanda sho‘ng‘ing');return}","pop(isOc(Math.floor(P.x/16),Math.floor(P.y/16))&&!P.fly?'Okean muzlagan ❄ — sho‘ng‘ib bo‘lmaydi':'Okeanda sho‘ng‘ing');return}")
sol=open('sol.js',encoding='utf-8').read()
rep('\nOCW=false;','\n'+sol+'\nOCW=false;')
open(p,'w',encoding='utf-8').write(s)
print('ok',len(s))
