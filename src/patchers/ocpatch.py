import re
p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
oc=open('ocean.js',encoding='utf-8').read()
def rep(a,b,cnt=1):
    global s
    n=s.count(a)
    assert n>=1,('missing',a[:60])
    if cnt==1: assert n==1,('multi',n,a[:60])
    s=s.replace(a,b,1) if cnt==1 else s.replace(a,b)
# CSS
css='''#bt,#dv,#uu,#ud{position:fixed;display:none;width:52px;height:52px;border-radius:50%;border:3px solid #9fe8ff;background:rgba(20,90,150,.8);font-size:22px;color:#fff;padding:0;z-index:5}
#bt{left:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 200px)}#dv{left:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 262px)}
#uu{left:76px;bottom:calc(env(safe-area-inset-bottom,0px) + 262px)}#ud{left:76px;bottom:calc(env(safe-area-inset-bottom,0px) + 200px)}
#swb{position:fixed;display:none;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 52px);width:200px;font:bold 11px monospace;color:#e6f8ff;text-align:center;text-shadow:0 1px 2px #000;pointer-events:none;z-index:5}
#swb i{display:block;height:7px;margin-top:3px;border-radius:4px;background:rgba(0,0,0,.45);border:1px solid #fff;overflow:hidden}#swb i b{display:block;height:100%;width:100%;background:#5ad0a0}
'''
rep('#mp{position:fixed;',css+'#mp{position:fixed;')
rep('<button id="mp">🗺</button>','<button id="mp">🗺</button>\n<button id="bt">⛵</button><button id="dv">🤿</button><button id="uu">⬆</button><button id="ud">⬇</button>\n<div id="swb"><span id="swl"></span><i><b id="swf"></b></i></div>')
# hw: ocean blocks only during generation
m=re.search(r'const hw=\(x,y\)=>\{[^\n]*\};',s); old=m.group(0)
assert 'return t==4?r!=3:(r==1&&t!=2)' in old
rep(old,'let OCW=true;'+old.replace('return t==4?r!=3:(r==1&&t!=2)','return t==4?(OCW&&r!=3):(r==1&&t!=2)'))
# coins
rep('if(!hit(x,y)&&!hit(x+6,y)&&!hit(x-6,y)){coins.push','if(!hit(x,y)&&!hit(x+6,y)&&!hit(x-6,y)&&!isW(x>>4,y>>4)){coins.push')
# update chain & movement
rep('pUpdate(dt);eUpdate(dt);','swimTick(dt);pUpdate(dt);eUpdate(dt);')
rep('if(TF.act||P.dead>0){ax=ay=0}','if(TF.act||P.dead>0||BT.on){ax=ay=0}')
rep('*(wade?.65:1)*(hero?1:.85)','*(wade?.65:1)*(P.sw?(hero?.8:.55):1)*(hero?1:.85)')
rep('if(!P.fly)stepSnd(run);','if(!P.fly&&!P.sw)stepSnd(run);')
rep('if(run&&!P.fly&&Math.random()<.5)dust.push','if(run&&!P.fly&&!P.sw&&Math.random()<.5)dust.push')
# render
rep('  const items=[];','  surfDraw();const items=[];')
rep('  items.push({...bb(P.x,P.y,3),f(){','  BOATS.forEach(b=>{if(onS(b.x,b.y))items.push({...bb(b.x,b.y,14),f(){drawBoat(b)}})});\n  items.push({...bb(P.x,P.y,3),f(){')
rep("    if(P.dead>0){ctx.save();ctx.translate(X,Y);ctx.rotate(1.57)","    if(BT.on)return;if(P.sw||(P.dead>0&&P.z<2&&oc(P.x,P.y))){drawSwim(X,Y0);return}\n    if(P.dead>0){ctx.save();ctx.translate(X,Y);ctx.rotate(1.57)")
# hooks
rep('function attack(){if(!hero){transform();return}','function attack(){if(UW.on){uwAttack();return}if(BT.on)return;if(!hero){transform();return}')
rep('function transform(){if(TF.act||AT.t>0)return;','function transform(){if(UW.on||BT.on||TF.act||AT.t>0)return;')
rep('function toggleFly(){if(P.dead>0||TF.act)return;','function toggleFly(){if(UW.on||BT.on||P.dead>0||TF.act)return;')
rep('function blast(){if(!hero||','function blast(){if(UW.on||BT.on)return;if(!hero||')
rep('function respawn(){P.hp=60;','function respawn(){if(UW.on){UW.on=0;UW.cr.length=0;if(AC&&mfil)mfil.frequency.setTargetAtTime(3000,AC.currentTime,.3)}BT.on=0;BT.b=null;P.sta=100;P.sw=0;P.hp=60;')
rep('function landFix(){if(blk(0,P.x,P.y)){','function landFix(){if(!oc(P.x,P.y)&&blk(0,P.x,P.y)){')
rep('wrapAll();setRef();update(hstop>0','if(UW.on){wrapAll();setRef();uwTick(dt);if(UW.on)renderUW();else render();mmDraw();requestAnimationFrame(loop);return}wrapAll();setRef();update(hstop>0')
rep('function loop(',oc+'\nOCW=false;\nfunction loop(')
open(p,'w',encoding='utf-8').write(s)
print('ok',len(s))
