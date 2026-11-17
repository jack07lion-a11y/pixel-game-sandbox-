# Yer xaritasi: haqiqiy qit'alar, okean chuqurligi va globus teksturasini index.html ga joylaydi (qayta ishga tushirsa ham xavfsiz).
import re,os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));H=os.path.join(os.path.dirname(R),'index.html')
d=json.load(open(os.path.join(R,'earth','earth.json')))
src=open(H,encoding='utf-8').read()
src,n=re.subn(r'const MYMAP="[^"]*";(?:\nconst EARTH_OD="[^"]*";\nconst EIMG=new Image\(\);EIMG\.src="[^"]*";)?',lambda m:'const MYMAP="%s";\nconst EARTH_OD="%s";\nconst EIMG=new Image();EIMG.src="data:image/jpeg;base64,%s";'%(d['pm'],d['od'],d['ej']),src,count=1)
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
# ---------- Dunyo o'lchami: ~10x katta (38x32 hujayra) ----------
sub("const MCX=MSZ==5?12:MSZ==4?4:MSZ,MCY=MSZ==5?10:MSZ==4?3:MSZ,","const MCX=MSZ==5?38:MSZ==4?4:MSZ,MCY=MSZ==5?32:MSZ==4?3:MSZ,")
sub("FZ=new Uint8Array(512),SNA=new Float32Array(512),HTA=new Float32Array(512),TRW=new Float32Array(512)","FZ=new Uint8Array(2048),SNA=new Float32Array(2048),HTA=new Float32Array(2048),TRW=new Float32Array(2048)")
sub("SNA[(P.y>>4)&511]","SNA[(P.y>>4)&2047]")
sub("const km=(v,s)=>(v/960*10).toFixed(1);","const WKM=Math.sqrt(MCN*100*WW/WH);const km=(v,s)=>(v*WKM/WW).toFixed(1);")
sub("(WW/96).toFixed(0)+'×'+(WH/96).toFixed(0)+' km","WKM.toFixed(0)+'×'+(WKM*WH/WW).toFixed(0)+' km")
sub("for(let ty=0;ty<WH/16;ty++)for(let tx=0;tx<WW/16;tx++){const o=mpj(tx*16+8,ty*16+8);","for(let ty=0;ty<0;ty++)for(let tx=0;tx<WW/16;tx++){const o=mpj(tx*16+8,ty*16+8);")
# ---------- tezlik: plitka xususiyatlarini keshlash (dunyo katta) ----------
if 'const isW_=' not in src:
    for n,a in (('isP',"const isP=(a,b)=>{if(!PMD)return isP0(a,b);"),('isW',"const isW=(a,b)=>{if(!PMD)return isW0(a,b);"),('isBr',"const isBr=(a,b)=>{if(!PMD)return isBr0(b);"),('isOc',"const isOc=(a,b)=>{if(!PMD)return false;"),('biome',"const biome=(a,b)=>{if(!PMD)return biome0(a,b);")):
        assert src.count(a)==1,('KESH',n)
        src=src.replace(a,a.replace('const %s='%n,'const %s_='%n))
    blk="const cP=new Uint8Array(TXM*TYM),cW=new Uint8Array(TXM*TYM),cB=new Uint8Array(TXM*TYM),cO=new Uint8Array(TXM*TYM),cI=new Uint8Array(TXM*TYM);\nconst isP=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cP[k];if(!v){v=isP_(a,b)?2:1;cP[k]=v}return v==2};\nconst isW=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cW[k];if(!v){v=isW_(a,b)?2:1;cW[k]=v}return v==2};\nconst isBr=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cB[k];if(!v){v=isBr_(a,b)?2:1;cB[k]=v}return v==2};\nconst isOc=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cO[k];if(!v){v=isOc_(a,b)?2:1;cO[k]=v}return v==2};\nconst biome=(a,b)=>{a=((a%TXM)+TXM)%TXM;b=((b%TYM)+TYM)%TYM;const k=b*TXM+a;let v=cI[k];if(!v){v=biome_(a,b)+1;cI[k]=v}return v-1};\n"
    assert src.count("let LF=1;if(PMD)")==1
    src=src.replace("let LF=1;if(PMD)",blk+"let LF=1;if(PMD)")
sub("const MCL=Math.max(1,MCN*LF);","const MCL=Math.max(1,Math.min(150,MCN*LF));")
open(H,'w',encoding='utf-8').write(src);print('OK')
