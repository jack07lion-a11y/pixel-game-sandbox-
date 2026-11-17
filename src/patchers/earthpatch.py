# Yer xaritasi: haqiqiy qit'alar, okean chuqurligi va globus teksturasini index.html ga joylaydi (qayta ishga tushirsa ham xavfsiz).
import re,os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));H=os.path.join(os.path.dirname(R),'index.html')
d=json.load(open(os.path.join(R,'earth','earth.json')))
src=open(H,encoding='utf-8').read()
src,n=re.subn(r'const MYMAP="[^"]*";(?:\nconst EARTH_OD="[^"]*";)?(?:\nconst EARTH_EL="[^"]*";)?(?:\nconst EIMG=new Image\(\);EIMG\.src="[^"]*";)?',lambda m:'const MYMAP="%s";\nconst EARTH_OD="%s";\nconst EARTH_EL="%s";\nconst EIMG=new Image();EIMG.src="data:image/jpeg;base64,%s";'%(d['pm'],d['od'],d.get('el',''),d['ej']),src,count=1)
assert n==1,'MYMAP'
def sub(old,new):
    global src
    if new in src:return
    assert src.count(old)==1,('COUNT',src.count(old),old[:80])
    src=src.replace(old,new)
sub("ctx.drawImage(br&&!fr?BRD:(fr?ICE[h&1]:WTL[h&1]),X,Y);","ctx.drawImage(br&&!fr?BRD:(fr?ICE[h&1]:(typeof WTLD!=='undefined'&&isOc(tx,ty)?WTLD[odl(tx,ty)][h&1]:WTL[h&1])),X,Y);")
sub("g.putImageData(id,0,0);\n  [[336,200,22]].concat(LK).forEach(","g.putImageData(id,0,0);const EOK=EIMG.complete&&EIMG.naturalWidth>0;if(EOK)g.drawImage(EIMG,0,0,TW,TH);\n  (EOK?[]:[[336,200,22]].concat(LK)).forEach(")
sub("g.globalAlpha=.7;trees.forEach(","g.globalAlpha=.7;(EOK?[]:trees).forEach(")
sub("HS.forEach(h=>{g.fillStyle='#fff3d6'","(EOK?[]:HS).forEach(h=>{g.fillStyle='#fff3d6'")
open(H,'w',encoding='utf-8').write(src);print('OK')
