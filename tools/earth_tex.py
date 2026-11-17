# Fizik xarita rasmidan (Miller proyeksiyasi) ekvirectangular Yer teksturasini tayyorlaydi.
import numpy as np, math, sys
from PIL import Image
SRC=sys.argv[1]; OUT=sys.argv[2]
W,H=720,450; LATR=1.3; LON0=float(sys.argv[3]) if len(sys.argv)>3 else 8.0
im=np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
sh,sw,_=im.shape
# matn/afsona qutilarini bo'yoq bilan to'ldirish (okean rangi bilan)
def fill_from(y0,y1,x0,x1,sy0):  # yuqoridagi/yaqin okean qismini nusxalash
    h=y1-y0; im[y0:y1,x0:x1]=im[sy0:sy0+h,x0:x1]
fill_from(0,100,0,160,110)            # "МИР" sarlavhasi
def fill_grad(y0,y1,x0,x1):
    ref=im[y0-70:y0-45,x0:x1].mean(axis=0)  # (w,3)
    ref=np.stack([np.convolve(np.pad(ref[:,c],(40,40),mode='edge'),np.ones(81)/81,mode='valid') for c in range(3)],axis=1)
    for y in range(y0,y1):
        t=(y-y0)/(y1-y0); im[y,x0:x1]=ref*(1-.12*t)
fill_grad(560,677,0,185); fill_grad(560,677,845,1000)
# medianali filtr 5x5 — yozuv va chegara chiziqlarini yo'qotadi
def median(a,k=5):
    p=k//2; pad=np.pad(a,((p,p),(p,p),(0,0)),mode='edge'); st=[]
    for dy in range(k):
        for dx in range(k): st.append(pad[dy:dy+a.shape[0],dx:dx+a.shape[1]])
    return np.median(np.stack(st),axis=0)
im=median(im,5)
def u(phi): return 1.25*math.log(math.tan(math.pi/4+.4*phi))
A=433.4;B=2.68;EQ=372.0;PY=188.7
out=np.zeros((H,W,3),np.float32)
ys=[];
for j in range(H):
    lat=(.5-(j+.5)/H)*2*LATR; ys.append(EQ-PY*u(lat))
for i in range(W):
    lon=LON0+(i+.5)/W*360.0
    lw=((lon+161.7)%360.0)-161.7
    x=A+B*lw
    def samp(xx,j):
        xx=min(max(xx,0),sw-1.001);x0=int(xx);fx=xx-x0
        y=min(max(ys[j],0),sh-1.001);y0=int(y);fy=y-y0
        return (im[y0,x0]*(1-fx)+im[y0,x0+1]*fx)*(1-fy)+(im[y0+1,x0]*(1-fx)+im[y0+1,x0+1]*fx)*fy
    wgt=min(1.0,max(0.0,(lw-192.3)/6.0))
    for j in range(H):
        p=samp(x,j)
        if wgt>0: p=p*(1-wgt)+samp(x-965,j)*wgt
        out[j,i]=p
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(OUT)
print('ok')
