# Toza, ravshan relyefli Yer teksturasi (fotodan emas): sinf + balandlik + soya + okean chuqurligi.
import numpy as np,sys,io
from PIL import Image
S=sys.argv[1];OUT=sys.argv[2]
d=np.load(S+'geo.npz');T=d['T'];lum=d['lum'];gr=d['gr'];H,W=T.shape
def blur(a,s):
    r=max(1,int(s*3));k=np.exp(-(np.arange(-r,r+1)**2)/(2*s*s));k/=k.sum();a=a.astype(np.float32)
    for ax in (0,1):
        p=np.pad(a,[(r,r) if i==ax else (0,0) for i in range(a.ndim)],mode='wrap' if ax==1 else 'edge');o=np.zeros_like(a)
        for i,w in enumerate(k):
            sl=[slice(None)]*a.ndim;sl[ax]=slice(i,i+a.shape[ax]);o+=w*p[tuple(sl)]
        a=o
    return a
land=T!=4
oh=[(T==k).astype(np.float32) for k in range(4)]
wt=[blur(o,2.4) for o in oh];tot=sum(wt)+1e-6;wt=[w/tot for w in wt]
base=np.array([.10,.30,.97,.70],np.float32)
e=sum(w*b for w,b in zip(wt,base))
hp=(lum-blur(lum,3.0))/255.0
e=e+np.where(land,blur(hp,1.2)*1.1,0)
e=blur(e,1.1)
# soya (yorug'lik shimoli-g'arbdan)
gy,gx=np.gradient(e*1.0)
sh=np.clip(1.0+(-gx*.9-gy*.9)*16,.70,1.32)
sh=np.where(T==2,1+(sh-1)*.5,sh)
forest=np.clip(blur(gr,3.0)/55.0,0,1)
cg0=np.array([112,150,76],np.float32);cg1=np.array([44,108,52],np.float32)
col_g=cg0*(1-forest[...,None])+cg1*forest[...,None]
col_d=np.array([224,198,132],np.float32)+np.array([-22,-30,-28],np.float32)*np.clip(e[...,None]-.2,0,1)*2
col_r=np.array([138,112,90],np.float32)+np.array([-34,-28,-22],np.float32)*np.clip(e[...,None]-.6,0,1)*2
col_s=np.array([243,248,252],np.float32)
land_col=wt[0][...,None]*col_g+wt[1][...,None]*col_d+wt[3][...,None]*col_r+wt[2][...,None]*col_s
land_col=land_col*sh[...,None]
# okean
oc=~land
dp=np.clip((190-lum)/125.0,0,1)
lonx=((np.arange(W)+.5)/W*360)[None,:]*np.ones((H,1));latx=np.degrees((.5-(np.arange(H)+.5)/H)*2*1.3)[:,None]*np.ones((1,W))
leg=(lonx>150)&(lonx<270)&(latx<-50)
ref=blur(dp[int(H*(.5+50/149.0))-12:int(H*(.5+50/149.0))-2,:],40.0).mean(axis=0)[None,:]
fill=np.clip(ref*0.7+0.25+(latx+50)*0.004,0,1);wl=blur(leg.astype(np.float32),14.0);dp=dp*(1-wl)+fill*wl;dp=blur(dp,3.0)
ramp=[(0,(110,203,214)),(.22,(64,158,204)),(.5,(36,108,176)),(.8,(22,70,138)),(1,(14,46,104))]
oc_col=np.zeros((H,W,3),np.float32)
xs=[p for p,_ in ramp]
for ch in range(3):oc_col[...,ch]=np.interp(dp,xs,[c[ch] for _,c in ramp])
# qirg'oq: sayoz yorqin sayoz zona
dist=blur(land.astype(np.float32),5.0)
oc_col=oc_col+ (np.array([30,40,26],np.float32))*np.clip(dist[...,None]*2.4,0,1)
out=np.where(land[...,None],land_col,oc_col)
# aniq qirg'oq chizig'i
edge=land&(blur(land.astype(np.float32),1.0)<.78)
out=np.where(edge[...,None],out*.72,out)
out=np.clip(out,0,255).astype(np.uint8)
im=Image.fromarray(out).resize((1440,900),Image.LANCZOS)
im.save(OUT.replace('.jpg','.png'))
b=io.BytesIO();im.save(b,'JPEG',quality=90,optimize=True,subsampling=0);open(OUT,'wb').write(b.getvalue());print(len(b.getvalue()))
