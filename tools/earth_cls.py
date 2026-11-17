import numpy as np,sys
from PIL import Image
S=sys.argv[1];LON0=8.0;LATR=1.3
im=np.asarray(Image.open(S+'earth_eq.png').convert('RGB')).astype(np.float32)
# 2x2 o'rtacha -> 360x225
c=im.reshape(225,2,360,2,3).mean(axis=(1,3))
r,g,b=c[...,0],c[...,1],c[...,2];mx=c.max(-1);mn=c.min(-1);lum=.3*r+.59*g+.11*b
lat=np.degrees((.5-(np.arange(225)+.5)/225)*2*LATR)[:,None]*np.ones((1,360))
lon=(LON0+(np.arange(360)+.5)/360*360)[None,:]*np.ones((225,1));lon=((lon+180)%360)-180
ocean=(b>r+18)&(b>g-12)
white=(mn>165)&(b-r<30)
greenl=(lon>-74)&(lon<-11)&(lat>59.5)
arct=(lat>66)&(lon>-125)&(lon<-60)
antar=lat<-66.5
land=~ocean
land|=white&(greenl|antar|arct)
ocean&=~(white&(greenl|antar|arct))
T=np.zeros((225,360),np.uint8)
snow=land&(white|((mn>175)&(b-r<32)))
green=land&~snow&(g>r+11)
brown=land&~snow&~green&(lum<142)
desert=land&~snow&~green&~brown
T[land]=0
T[desert]=1;T[brown]=3;T[snow]=2
# yakka hujayralarni tekislash (3x3 ko'pchilik, faqat quruqlik)
def smooth(T,it=2):
    for _ in range(it):
        P=np.pad(T,1,mode='edge');cnt=np.zeros((5,)+T.shape,np.int32)
        for dy in range(3):
            for dx in range(3):
                q=P[dy:dy+T.shape[0],dx:dx+T.shape[1]]
                for k in range(5): cnt[k]+=(q==k)
        mj=cnt[:4].argmax(0);ok=(T!=4)&(cnt[mj,*np.indices(T.shape)]>=5)&(cnt[4]<=3)
        T=np.where(ok&(T!=2),mj,T)
    return T
T[~land]=4
T=smooth(T)

np.save(S+'T.npy',T);np.save(S+'lum.npy',lum)
pal=np.array([[80,150,60],[225,200,130],[240,245,250],[120,100,85],[30,90,170]],np.uint8)
Image.fromarray(pal[T]).resize((1080,675),Image.NEAREST).save(S+'cls.png')
print(np.bincount(T.ravel()))
