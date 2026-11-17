# Uslub namunasi: bizning dunyo (Markaziy Osiyo) — video uslubida piksel 3D (voxel-space) va tepadan ko'rinish. Faqat rasm (maket).
import numpy as np,sys,math
from PIL import Image
S=sys.argv[1];OUT=sys.argv[2];IW=int(sys.argv[3]) if len(sys.argv)>3 else 360   # ichki piksel o'lchami
rng=np.random.RandomState(5)
import os
OVX,OVY,CAX,CAY,CAZ=[float(v) for v in os.environ.get('MOCKP','0.5,0.72,0.45,0.97,150').split(',')]
d=np.load(S+'relief.npz');E,FO,DP,TT=d['e'],d['forest'],d['dp'],d['T']
W0=[d['w0'],d['w1'],d['w2'],d['w3']]
LATR=1.3;GW,GH=2340,1440
def row(lat):return int((.5-math.radians(lat)/(2*LATR))*GH)
def col(lon):return int(lon/360*GW)
LON0,LON1,LAT0,LAT1=50,78,18,42
x0,x1,y0,y1=col(LON0),col(LON1),row(LAT1),row(LAT0)
MW,MH=1500,int(1500*(y1-y0)*0.1035/((x1-x0)*0.154*0.766))
def crop(a):return a[y0:y1,x0:x1]
def up(a,w=MW,h=MH):return np.asarray(Image.fromarray(a.astype(np.float32),mode='F').resize((w,h),Image.BICUBIC))
def blur(a,s):
    r=max(1,int(s*3));k=np.exp(-(np.arange(-r,r+1)**2)/(2*s*s));k/=k.sum();a=a.astype(np.float32)
    for ax in (0,1):
        p=np.pad(a,[(r,r) if i==ax else (0,0) for i in range(a.ndim)],mode='edge');o=np.zeros_like(a)
        for i,w in enumerate(k):
            sl=[slice(None)]*a.ndim;sl[ax]=slice(i,i+a.shape[ax]);o+=w*p[tuple(sl)]
        a=o
    return a
def noise(sz,seed,w=MW,h=MH):
    r=np.random.RandomState(seed);g=r.rand(max(2,int(sz*h/MW*MW/ MW)+2),max(2,sz)+2).astype(np.float32)
    return np.asarray(Image.fromarray(g,mode='F').resize((w,h),Image.BICUBIC))
def fbm(o,base,seed,w=MW,h=MH):
    t=0;a=.5;n=0
    for i in range(o):t+=a*noise(base*2**i,seed+i*11,w,h);n+=a;a*=.5
    return t/n
Land=up((crop(TT)!=4).astype(np.float32))
Ev=np.clip(up(crop(E)),0,1.05);Fo=np.clip(up(crop(FO)),0,1);Dp=np.clip(up(crop(DP)),0,1)
Wc=[np.clip(up(crop(w)),0,1) for w in W0]
cn=fbm(5,6,31);ml=Land+(cn-.5)*.5
L=ml>.5
# yuqori chastotali qirg'oq
det=fbm(4,40,77);
Hh=np.where(L,.012+Ev*(1+.5*(fbm(6,10,19)-.5)),0.0)
rid=1-np.abs(fbm(5,14,23)*2-1);Hh=np.where(L,Hh+(rid-.5)*.22*np.clip(Ev,0,1)**1.5,0)
# orollar (dengizda): fraktal shovqin
isl=fbm(6,26,211);farc=blur(L.astype(np.float32),10.0)<.06
ISL=(isl>.66)&farc&~L
L=L|ISL
Hh=np.where(ISL,.04+(isl-.66)*.55,Hh)
ramp=np.clip((blur(L.astype(np.float32),15.0)-.5)*1.8,0,1)
Hh=np.clip(np.where(ISL,Hh,Hh*(0.10+0.90*ramp)),0,1.1)
# daryolar: past balandlikdagi vodiy chiziqlari
rv=np.abs(fbm(5,12,333)-.5);RIV=(rv<.011)&L&(Hh<.30)&(Hh>.03)
# masofa (qirg'oqgacha), piksel
Lf=L.astype(np.float32);dl=blur(Lf,2.2);dw=blur(Lf,14.0)
# palitra
def C(r,g,b):return np.array([r,g,b],np.float32)
GRASS=[C(120,196,64),C(88,170,52),C(66,146,48)];FORE=C(30,96,42);DES=[C(236,210,136),C(216,186,112)];ROCK=[C(160,140,118),C(124,108,94)];SNOW=C(248,251,255);SAND=C(242,220,156)
WAT=[C(104,222,228),C(56,176,224),C(30,132,212),C(22,98,184),C(18,68,146)]
BAYER=np.array([[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]],np.float32)/16.0
yy,xx=np.mgrid[0:MH,0:MW]
bay=BAYER[yy%4,xx%4]-.5
# kuk
def terrain_color():
    NB=12;band=np.clip((Hh*NB).astype(int),0,NB-1)
    wg,wd,ws,wr=Wc
    # sinf: ustun sinf + dither
    sc=np.stack([wg,wd,wr,ws],0)+ (fbm(5,60,7)-.5)[None]*.35+(bay[None]*.12)
    cls=np.argmax(sc,0)   # 0 o't, 1 sahro, 2 tosh, 3 qor
    cls=np.where(Hh>.78,3,cls)
    cls=np.where((Hh>.5)&(cls==0),2,cls)
    # palitralar: pog'ona bo'yicha
    pal_g=np.array([[168,222,90],[150,212,78],[130,200,70],[112,186,62],[96,172,56],[84,160,52],[72,148,48],[64,136,46],[58,126,44],[52,116,42],[46,106,40],[42,98,38]],np.float32)
    pal_d=np.array([[246,224,152],[240,216,142],[234,208,134],[228,200,126],[222,192,120],[216,184,114],[208,176,108],[200,170,104],[192,162,100],[184,154,96],[176,148,92],[168,140,88]],np.float32)
    pal_r=np.array([[176,158,134],[170,152,130],[164,146,126],[158,140,122],[152,134,118],[146,128,114],[140,122,110],[134,116,106],[128,110,102],[122,106,98],[116,100,94],[110,96,90]],np.float32)
    pal_s=np.array([[255,255,255],[250,252,255],[244,248,255],[238,244,254],[232,240,252],[226,236,250],[220,232,248],[214,228,246],[208,224,244],[202,220,242],[196,216,240],[190,212,238]],np.float32)
    col=np.where((cls==0)[...,None],pal_g[band],0.0)
    col=np.where((cls==1)[...,None],pal_d[band],col)
    col=np.where((cls==2)[...,None],pal_r[band],col)
    col=np.where((cls==3)[...,None],pal_s[band],col)
    # o'rmon: qalin qoramtir-yashil tojlar (yashil, past/o'rta joylarda)
    fm=(Fo*(1-np.clip(Hh*1.4,0,1))>.42)&(cls==0)
    blob=fbm(3,130,3)
    dense=(blob>.50)&fm
    dark=np.array([30,92,44],np.float32);mid=np.array([46,118,52],np.float32)
    col=np.where(dense[...,None],dark,col)
    col=np.where((fm&(blob>.44)&~dense)[...,None],mid,col)
    hi=(fbm(2,170,5)>.62)&fm&dense
    col=np.where(hi[...,None],np.array([62,140,60],np.float32),col)
    # zina chiziqlari
    gx=np.roll(band,-1,1)!=band;gy=np.roll(band,-1,0)!=band
    edge=(gx|gy)&L&(band>0)
    col=np.where(edge[...,None],col*.70,col)
    # yorug'lik/soya (yengil)
    gdy,gdx=np.gradient(blur(Hh,.6));sh=np.clip(1+(-gdx-gdy)*34,.78,1.22)
    col=col*sh[...,None]
    sand=L&(dl<.6)&(Hh<.10)
    col=np.where(sand[...,None],SAND,col)
    col=np.where(RIV[...,None],np.array([70,172,226],np.float32),col)
    # qishloqlar: kichik qizil tomli uylar
    r=np.random.RandomState(4);hs=(r.rand(MH,MW)>.99965)&L&(Hh<.12)&~RIV&(dl>.7)
    for dy in range(0,3):
        for dx in range(0,4):
            m=np.roll(np.roll(hs,dy,0),dx,1)
            col=np.where(m[...,None],np.array([206,76,56],np.float32) if dy<2 else np.array([244,226,196],np.float32),col)
    return np.clip(col,0,255)
def water_color(dith=True):
    # chuqurlik: qirg'oqdan masofa + xarita chuqurligi
    v=np.clip(.80*np.clip(1-dw*2.5,0,1)+.20*Dp,0,1)*4.0+(bay*.5 if dith else 0)
    lv=np.clip(np.floor(v+.5),0,4).astype(int)
    col=np.zeros((MH,MW,3),np.float32)
    for k in range(5):col[lv==k]=WAT[k]
    # ko'pik
    foam=(~L)&(dl>.36)
    col=np.where(foam[...,None],np.array([250,254,255],np.float32),col)
    f2=(~L)&(dl>.2)&(dl<=.36)&(bay>-.1)
    col=np.where(f2[...,None],np.array([188,242,246],np.float32),col)
    # to'lqin yaltirashlari
    r=np.random.RandomState(9).rand(MH,MW)
    gl=(r>.987)&(~L)
    gl=gl|np.roll(gl,1,1)
    col=np.where(gl[...,None]&(~L)[...,None]&(dl<.2)[...,None],np.array([226,246,255],np.float32),col)
    return col
TC=terrain_color()
base=np.where(L[...,None],TC,water_color(True))
base_nd=np.where(L[...,None],TC,water_color(False))
# bulut maydoni (voxel: blok-blok)
CELL=4
cf=fbm(4,15,101)
cf=np.asarray(Image.fromarray(cf.astype(np.float32),mode='F').resize((MW//CELL,MH//CELL),Image.BILINEAR))
q=np.quantile(cf,.80);cm=np.clip((cf-q)*9,0,1);cm=np.round(cm*4)/4   # 4 daraja qalinlik
CLM=np.repeat(np.repeat(cm,CELL,0),CELL,1)[:MH,:MW]
if CLM.shape!=(MH,MW):CLM=np.pad(CLM,((0,MH-CLM.shape[0]),(0,MW-CLM.shape[1])))
def shadow(col,dx=14,dy=18):
    sh=np.roll(np.roll(CLM,dy,0),dx,1)
    k=np.clip(sh*1.2,0,1)[...,None]
    return col*(1-k*.42)*(1-k*.0)+np.array([10,30,80],np.float32)*k*.22
col_s=shadow(base)
col_v=shadow(base_nd)
np.savez_compressed(S+'mock_maps.npz',H=Hh.astype(np.float16),COL=np.clip(col_s,0,255).astype(np.uint8),CL=CLM.astype(np.float16),L=L)
print('map',MW,MH)
# ---------- 1) tepadan ko'rinish (bulutlar: bir necha balandlik qatlami, soya bilan) ----------
def overhead(cx,cy,out):
    win=IW
    x0=int(np.clip(cx-win//2,0,MW-win));y0=int(np.clip(cy-win//2,0,MH-win))
    img=col_s[y0:y0+win,x0:x0+win].copy();cl=CLM[y0:y0+win,x0:x0+win]
    # bulut qatlamlari
    for lev,(off,tint) in enumerate([(0,(206,224,246)),(3,(224,236,252)),(6,(240,247,255)),(9,(255,255,255))]):
        thr=(lev+1)/4.0-.01
        m=np.roll(np.roll((CLM>=thr),-off,0),-off,1)[y0:y0+win,x0:x0+win]
        edge=m&~np.roll(m,1,0)
        c=np.array(tint,np.float32)
        img=np.where(m[...,None],c,img)
        img=np.where((m&np.roll(~m,-1,1))[...,None],c*.9,img)
    Image.fromarray(np.clip(img,0,255).astype(np.uint8)).resize((win*720//IW,win*720//IW),Image.NEAREST).save(out)
overhead(int(OVX*MW),int(OVY*MH),OUT+'_over.png')
# ---------- 2) orqadan 3D ko'rinish (voxel-space, pikselli) ----------
def voxel(cam,yaw,alt,horizon,scale,out,zfar=1100,curv=.00011):
    HV=blur(Hh,1.4)
    Wd=IW;Hd=IW
    sky=np.zeros((Hd,Wd,3),np.float32)
    top=np.array([120,184,238],np.float32);bot=np.array([196,226,248],np.float32)
    for y in range(Hd):
        t=np.clip(1-(y/max(1,horizon)),0,1)**.8
        sky[y,:]=bot*(1-t)+top*t
    img=sky.copy();ymin=np.full(Wd,Hd,np.int32);zbuf=np.full((Hd,Wd),1e9,np.float32)
    sx,sy=math.sin(yaw),math.cos(yaw)
    fogc=np.array([188,222,246],np.float32)
    # chiziqli maydon: har ustun uchun nur
    cols=(np.arange(Wd)-Wd/2)/(Wd/2)
    z=2.0;dz=.45
    while z<zfar:
        # nur yo'nalishi (kenglik 1.0 ≈ 55° ko'rish maydoni)
        dxr=sx+cols*sy*1.05;dyr=sy-cols*sx*1.05
        px=cam[0]+dxr*z;py=cam[1]+dyr*z
        ix=np.clip(px.astype(int),0,MW-1);iy=np.clip(py.astype(int),0,MH-1)
        inside=(px>=0)&(px<MW)&(py>=0)&(py<MH)
        h=HV[iy,ix]*210.0-(z*z)*curv*scale/ (scale)  # egrilik
        hh=np.where(inside,h,-40.0)
        ys=((alt-hh)/z*scale+horizon).astype(np.int32)
        fog=np.clip((z/zfar)**1.4,0,1)[...] if False else min(1.0,(z/zfar)**1.3)
        colz=col_v[iy,ix]*(1-fog)+fogc*fog
        colz=np.where(inside[...,None],colz,fogc)
        for i in range(Wd):
            y=ys[i]
            if y<ymin[i]:
                y0=max(y,0)
                if y0<ymin[i]:
                    img[y0:ymin[i],i]=colz[i];zbuf[y0:ymin[i],i]=z
                ymin[i]=y0
        z+=dz;dz+=.006
    # bulutlar: uzoqdan yaqinga, faqat yerdan yaqinroq bo'lganda
    z=zfar;dz=2.0;zs=[]
    while z>170:
        zs.append(z);z-=dz;dz=max(1.0,dz*.992)
    CB=118.0
    for z in zs:
        dxr=sx+cols*sy*1.05;dyr=sy-cols*sx*1.05
        px=cam[0]+dxr*z;py=cam[1]+dyr*z
        ix=np.clip(px.astype(int),0,MW-1);iy=np.clip(py.astype(int),0,MH-1)
        m=CLM[iy,ix]*(px>=0)*(px<MW)*(py>=0)*(py<MH)
        fog=min(1.0,(z/zfar)**1.3)
        for i in np.nonzero(m>0)[0]:
            th=m[i]*22.0
            yt=int((alt-(CB+th)+0)/z*scale+horizon);yb=int((alt-(CB-th*.4))/z*scale+horizon)
            yt=max(yt,0);yb=min(yb,Hd)
            if yb<=yt:continue
            sh=np.array([240,247,255],np.float32)*(0.78+0.22*m[i]);side=np.array([170,196,232],np.float32)
            c=np.where(np.arange(yt,yb)[:,None]<yt+max(1,(yb-yt)//3),1,0)
            cc=np.where(c[...,None]==1,sh,side)*(1-fog)+fogc*fog
            seg=zbuf[yt:yb,i]>z*.98
            for k,yk in enumerate(range(yt,yb)):
                if seg[k]:img[yk,i]=cc[k]
    Image.fromarray(np.clip(img,0,255).astype(np.uint8)).resize((Wd*720//IW,Hd*720//IW),Image.NEAREST).save(out)
voxel((int(CAX*MW),int(CAY*MH)),math.pi,CAZ,int(IW*.33),IW*.85,OUT+'_chase.png')
