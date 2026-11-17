# Dunyo (olam) xaritasi: Душанбе uy vodiysining markazida. Yarim aniqlikdagi (1170x720) PMD + okean chuqurligi + toza tekstura.
import numpy as np,sys,base64,math,random,json
S=sys.argv[1];JPG=sys.argv[2];OUT=sys.argv[3]
LATR=1.3;GX0,GY0=1170,720;GXF=GX0*2
LAT_H,LON_H=38.56,68.79   # Душанбе
LONW0=LON_H-25.25/GXF*360.0
fy_h=.5-math.radians(LAT_H)/(2*LATR);LATF=(fy_h-11.44/(GY0*2))%1.0
g=np.load(S+'geo.npz');TG=g['T'];LUM=g['lum'];GH,GW=TG.shape
def fyrow(y):return (((y+.5)/GY0)+LATF)%1.0
xs=np.arange(GX0);ys=np.arange(GY0)
lonw=(LONW0+(xs+.5)/GX0*360.0)%360.0
gcol=np.minimum(GW-1,(lonw/360.0*GW).astype(int))
grow=np.minimum(GH-1,(np.array([fyrow(y) for y in ys])*GH).astype(int))
T=TG[np.ix_(grow,gcol)].astype(np.uint8);lum=LUM[np.ix_(grow,gcol)]
land=T!=4
def cell(lon,lat):
    x=int((((lon-LONW0)%360.0)/360.0)*GX0)%GX0
    fy=.5-math.radians(lat)/(2*LATR);y=int(((fy-LATF)%1.0)*GY0)
    return x,min(GY0-1,max(0,y))
# chuqurlik 0..3
oc=~land;qs=np.percentile(lum[oc],[12,40,75])
D=np.where(lum>qs[2],0,np.where(lum>qs[1],1,np.where(lum>qs[0],2,3))).astype(np.uint8);D=np.where(oc,D,0).astype(np.uint8)
P=np.pad(D,1,mode='edge');st=np.stack([P[dy:dy+GY0,dx:dx+GX0] for dy in range(3) for dx in range(3)]);D=np.where(oc,np.median(st,axis=0).astype(np.uint8),0)
ocn=np.pad(land,1,mode='constant');near=np.zeros((GY0,GX0),bool)
for dy in range(3):
    for dx in range(3):near|=ocn[dy:dy+GY0,dx:dx+GX0]
D=np.where(oc&near,0,D).astype(np.uint8)
ELg=np.load(S+'relief.npz')['e'];Ew=ELg[np.ix_(grow,gcol)]
EL=np.where(land,np.clip(np.floor(np.clip(Ew,0,1.0)*12),0,11),0).astype(np.uint8)
P2=np.pad(EL,1,mode='edge');st2=np.stack([P2[dy:dy+GY0,dx:dx+GX0] for dy in range(3) for dx in range(3)]);EL=np.where(land,np.median(st2,axis=0).astype(np.uint8),0)
R=np.zeros((GY0,GX0),np.uint8);M=np.zeros((GY0,GX0),np.uint8)
rivers={'Nil':[(31.2,30.1),(32.5,25),(32.6,19),(33.5,15.5),(32.5,9),(31.5,4),(32,1)],'Amazonka':[(-50,-1.5),(-60,-3.3),(-70,-4),(-75,-4.5)],
'Missisipi':[(-90,29.2),(-90.5,33),(-90,37),(-91,41),(-93.5,45)],'Volga':[(48,46),(46,50),(44,54),(50,56),(44,57)],'Dunay':[(29.5,45.2),(25,44),(19,45.5),(17,48),(12,48.5)],
'Amudaryo':[(59.5,43.8),(62,41),(64,38),(67,37.5),(71,38)],'Sirdaryo':[(61,46),(65,44.5),(68,41),(71,40.3)],'Vaxsh':[(68.0,37.0),(68.9,38.4),(69.5,38.6),(70.6,38.1)],'Yantszi':[(121.5,31.5),(114,30.5),(108,30),(104,29),(101.5,26.5)],
'Xuanxe':[(118.5,37.5),(113,35),(110,35),(110,40),(104,38)],'Gang':[(89,22),(86,25.5),(81,26),(78,30)],'Hind':[(67.5,24),(68,27),(71,30),(72,34)],
'Kongo':[(12.5,-6),(17,-3),(21,-1),(25,1),(27,-4)],'Mekong':[(106.5,10),(105,13),(103,17.5),(100.5,20)],'Parana':[(-58,-34.5),(-58,-27),(-55,-24.5)],
'Marrey':[(139,-35.5),(143,-34.5),(147,-35.5)],'Dajla':[(47.5,30),(44,33),(40,35),(38,37)],'Niger':[(6,4.3),(6,7),(4,9),(-1,14),(-6,13)],'Ob':[(73,66.5),(70,62),(73,58),(78,55)],
'Lena':[(126,72),(127,67),(129,62),(125,56)],'Yenisey':[(83,71),(86,66),(90,60),(93,55)]}
def line(a,b,v,arr):
    (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
    for i in range(n+1):
        x=round(x0+(x1-x0)*i/n)%GX0;y=round(y0+(y1-y0)*i/n)
        if 0<=y<GY0 and T[y,x]!=4 and T[y,x]!=2:arr[y,x]=v
for pts in rivers.values():
    cs=[cell(*p) for p in pts]
    for a,b in zip(cs,cs[1:]):
        if abs(a[0]-b[0])<GX0//2 and abs(a[1]-b[1])<GY0//2:line(a,b,1,R)
cities=[('Dushanbe',68.79,38.56),('Toshkent',69.2,41.3),('Samarqand',66.9,39.7),('Buxoro',64.4,39.8),('Moskva',37.6,55.8),('Peterburg',30.3,59.9),('London',-0.1,51.5),('Parij',2.3,48.9),('Berlin',13.4,52.5),('Rim',12.5,41.9),('Madrid',-3.7,40.4),('Istanbul',29,41),('Qohira',31.2,30),('Lagos',3.4,6.5),('Nayrobi',36.8,-1.3),('Kapstaun',18.4,-33.9),('Dakar',-17.4,14.7),('Addis-Abeba',38.7,9),('Kinshasa',15.3,-4.3),('Tehron',51.4,35.7),('Bog‘dod',44.4,33.3),('Riyod',46.7,24.7),('Dehli',77.2,28.6),('Mumbay',72.9,19.1),('Kalkutta',88.4,22.6),('Dakka',90.4,23.8),('Bangkok',100.5,13.8),('Pekin',116.4,39.9),('Shanxay',121.5,31.2),('Guanchjou',113.3,23.1),('Seul',127,37.6),('Tokio',139.7,35.7),('Jakarta',106.8,-6.2),('Manila',121,14.6),('Sidney',151.2,-33.9),('Melburn',145,-37.8),('Perth',115.9,-32),('Nyu-York',-74,40.7),('Chikago',-87.6,41.9),('Los-Anjeles',-118.2,34.1),('Meksiko',-99.1,19.4),('Toronto',-79.4,43.7),('Vankuver',-123.1,49.3),('Bogota',-74.1,4.7),('Lima',-77,-12),('San-Paulu',-46.6,-23.5),('Buenos-Ayres',-58.4,-34.6),('Santyago',-70.7,-33.4),('Manaus',-60,-3.1),('Novosibirsk',82.9,55),('Yakutsk',129.7,62),('Almati',76.9,43.2),('Ostona',71.4,51.2),('Kobul',69.2,34.5),('Karachi',67,24.9),('Xanoy',105.8,21),('Oslo',10.7,59.9),('Stokgolm',18.1,59.3),('Xelsinki',24.9,60.2),('Kiyev',30.5,50.5),('Varshava',21,52.2),('Vena',16.4,48.2),('Atina',23.7,38),('Tunis',10.2,36.8),('Aljir',3,36.7),('Xartum',32.5,15.6),('Luanda',13.2,-8.8),('Mapuru',32.6,-25.9),('Antananarivu',47.5,-18.9),('Anchorage',-149.9,61.2),('Denver',-105,39.7),('Gavana',-82.4,23.1),('Karakas',-66.9,10.5),('Rio',-43.2,-22.9),('Reykyavik',-21.9,64.1),('Nuuk',-51.7,64.2),('Xorug‘',71.5,37.5),('Bishkek',74.6,42.9),('Ashxobod',58.4,37.9),('Urumchi',87.6,43.8)]
HOMEB=lambda x,y:x<15 and y<12
vill=[]
for nm,lo,la in cities:
    x,y=cell(lo,la)
    if HOMEB(x,y):continue
    if T[y,x] in(4,2):
        found=None
        for r in range(1,4):
            for dy in range(-r,r+1):
                for dx in range(-r,r+1):
                    xx,yy=(x+dx)%GX0,y+dy
                    if 0<=yy<GY0 and T[yy,xx] not in(4,2) and R[yy,xx]!=1 and not found and not HOMEB(xx,yy):found=(xx,yy)
            if found:break
        if not found:continue
        x,y=found
    vill.append((x,y,nm))
rnd=random.Random(7);pts=[(v[0],v[1]) for v in vill]
cand=[(x,y) for y in range(GY0) for x in range(GX0) if T[y,x] in(0,1) and R[y,x]==0 and not HOMEB(x,y) and 4<y<GY0-4]
rnd.shuffle(cand)
for x,y in cand:
    if len(pts)>=2000:break
    if all(min(abs(x-a),GX0-abs(x-a))**2+(y-b)**2>=100 for a,b in pts):pts.append((x,y))
for x,y in pts:M[y,x]=1
def clear(a,b):
    (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
    for i in range(n+1):
        x=round(x0+(x1-x0)*i/n)%GX0;y=round(y0+(y1-y0)*i/n)
        if T[y,x] in(4,2):return False
    return True
def dist(a,b):return math.hypot(min(abs(a[0]-b[0]),GX0-abs(a[0]-b[0])),a[1]-b[1])
pa=np.array(pts)
for i,a in enumerate(pts):
    dd=np.hypot(np.minimum(abs(pa[:,0]-a[0]),GX0-abs(pa[:,0]-a[0])),pa[:,1]-a[1]);dd[i]=1e9
    for j in np.argsort(dd)[:2]:
        d=dd[j];b=pts[j]
        if d<59 and abs(a[0]-b[0])<=GX0//2 and clear(a,b):
            (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
            for k in range(n+1):
                x=round(x0+(x1-x0)*k/n)%GX0;y=round(y0+(y1-y0)*k/n)
                if R[y,x]==0:R[y,x]=2
def rle(a):
    a=a.ravel();o=bytearray();i=0;n=len(a)
    # tezroq RLE: numpy
    idx=np.flatnonzero(np.diff(a))+1;st=np.concatenate(([0],idx));ln=np.diff(np.concatenate((st,[n])));vals=a[st]
    for v,l in zip(vals,ln):
        while l>255:o+=bytes([v,255]);l-=255
        o+=bytes([v,l])
    return bytes(o)
pm='JS1,%d,%d,'%(GX0,GY0)+base64.b64encode(rle(T)+rle(R)+rle(M)).decode()
od=base64.b64encode(rle(D)).decode();el=base64.b64encode(rle(EL)).decode();ej=base64.b64encode(open(JPG,'rb').read()).decode()
json.dump({'pm':pm,'od':od,'el':el,'ej':ej,'LONF':LONW0/360.0,'LATF':LATF,'cities':[(v[2],v[0],v[1]) for v in vill]},open(OUT,'w'))
print('el',len(el),len(pm),len(od),len(ej),len(vill),len(pts),np.bincount(R.ravel()),'LONF',LONW0/360.0,'LATF',LATF)
