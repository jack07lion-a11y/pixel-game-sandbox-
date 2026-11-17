# Geografik (lon=0 chapda) yuqori aniqlikdagi massivlar: sinf (T), balandlik, chuqurlik + ravshan relyefli tekstura.
import numpy as np,sys,math
from PIL import Image,ImageFilter
S=sys.argv[1];W,H=2340,1440;LATR=1.3
src=Image.open(S+'earth_eq0.png').convert('RGB')
c=np.asarray(src.resize((W,H),Image.BICUBIC)).astype(np.float32)
r,g,b=c[...,0],c[...,1],c[...,2];mx=c.max(-1);mn=c.min(-1);lum=.3*r+.59*g+.11*b
lat=np.degrees((.5-(np.arange(H)+.5)/H)*2*LATR)[:,None]*np.ones((1,W))
lon=((np.arange(W)+.5)/W*360)[None,:]*np.ones((H,1));lonc=((lon+180)%360)-180
ocean=(b>r+18)&(b>g-12);white=(mn>165)&(b-r<30)
ice=white&(((lonc>-74)&(lonc<-11)&(lat>59.5))|(lat<-66.5)|((lat>66)&(lonc>-125)&(lonc<-60)))
land=(~ocean)|ice
leg=(lon>150)&(lon<270)&(lat<-50);land&=~leg;ice&=~leg
def blur(a,s):
    r=max(1,int(s*3));k=np.exp(-(np.arange(-r,r+1)**2)/(2*s*s));k/=k.sum();a=a.astype(np.float32)
    for ax in (0,1):
        p=np.pad(a,[(r,r) if i==ax else (0,0) for i in range(a.ndim)],mode='edge');o=np.zeros_like(a)
        for i,w in enumerate(k):
            sl=[slice(None)]*a.ndim;sl[ax]=slice(i,i+a.shape[ax]);o+=w*p[tuple(sl)]
        a=o
    return a
# silliq qirg'oq: maskani biroz tekislaymiz
m=blur(land.astype(np.float32),1.6)>.5;m&=~leg;land=m
snow=land&(((mn>175)&(b-r<32))|ice)
green=land&~snow&(g>r+11);brown=land&~snow&~green&(lum<142);desert=land&~snow&~green&~brown
T=np.zeros((H,W),np.uint8);T[desert]=1;T[snow]=2;T[brown]=3;T[~land]=4
# Avstraliya ichki qismi — sahro
np.savez_compressed(S+'geo.npz',T=T,lum=lum.astype(np.float32),gr=(g-r).astype(np.float32))
print(np.bincount(T.ravel()))
