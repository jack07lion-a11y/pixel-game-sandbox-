# Yer xaritasi: PMD (T,R,M), okean chuqurligi va tekstura (JPEG) ni tayyorlaydi.
import numpy as np,sys,base64,io,math,random,json
from PIL import Image
S=sys.argv[1];OUT=sys.argv[2];LON0=8.0;LATR=1.3;GX=int(sys.argv[3]) if len(sys.argv)>3 else 360;GY=int(sys.argv[4]) if len(sys.argv)>4 else 225;SC=GX/360
T=np.load(S+'T.npy').astype(np.uint8);lum=np.load(S+'lum.npy')
def cell(lon,lat):
    x=int(((lon-LON0)%360)/360*GX);y=int((.5-math.radians(lat)/(2*LATR))*GY)
    return x%GX,min(GY-1,max(0,y))
# Avstraliya ichki qismi — sahro
for y in range(GY):
    for x in range(GX):
        lon=LON0+(x+.5)/GX*360;lon=((lon+180)%360)-180;lat=math.degrees((.5-(y+.5)/GY)*2*LATR)
        if 118<lon<141 and -31<lat<-19 and T[y,x]==0:T[y,x]=1
land=T!=4
# okean chuqurligi 0..3
oc=~land;q=np.percentile(lum[oc],[12,40,75])
D=np.zeros((GY,GX),np.uint8)
D[lum<=q[2]]=2;D[lum<=q[1]]=2;D[lum>q[2]]=1;D[lum>q[1]*1.0+0]=D[lum>q[1]]
D=np.where(lum>q[2],0,np.where(lum>q[1],1,np.where(lum>np.percentile(lum[oc],12),2,3))).astype(np.uint8)
D=np.where(oc,D,0).astype(np.uint8)
# 3x3 mediana
P=np.pad(D,1,mode='edge');st=np.stack([P[dy:dy+GY,dx:dx+GX] for dy in range(3) for dx in range(3)]);D=np.where(oc,np.median(st,axis=0).astype(np.uint8),0)
# qirg'oqqa yaqin — sayoz
ocn=np.pad(land,1,mode='constant');near=np.zeros((GY,GX),bool)
for dy in range(3):
    for dx in range(3):near|=ocn[dy:dy+GY,dx:dx+GX]
D=np.where(oc&near,0,D)
R=np.zeros((GY,GX),np.uint8);M=np.zeros((GY,GX),np.uint8)
# daryolar
rivers={'Nil':[(31.2,30.1),(32.5,25),(32.6,19),(33.5,15.5),(32.5,9),(31.5,4),(32,1)],'Amazonka':[(-50,-1.5),(-60,-3.3),(-70,-4),(-75,-4.5)],
'Missisipi':[(-90,29.2),(-90.5,33),(-90,37),(-91,41),(-93.5,45)],'Volga':[(48,46),(46,50),(44,54),(50,56),(44,57)],'Dunay':[(29.5,45.2),(25,44),(19,45.5),(17,48),(12,48.5)],
'Amudaryo':[(59.5,43.8),(62,41),(64,38),(67,37.5),(71,38)],'Sirdaryo':[(61,46),(65,44.5),(68,41),(71,40.3)],'Yantszi':[(121.5,31.5),(114,30.5),(108,30),(104,29),(101.5,26.5)],
'Xuanxe':[(118.5,37.5),(113,35),(110,35),(110,40),(104,38)],'Gang':[(89,22),(86,25.5),(81,26),(78,30)],'Hind':[(67.5,24),(68,27),(71,30),(72,34)],
'Kongo':[(12.5,-6),(17,-3),(21,-1),(25,1),(27,-4)],'Mekong':[(106.5,10),(105,13),(103,17.5),(100.5,20)],'Parana':[(-58,-34.5),(-58,-27),(-55,-24.5)],
'Marrey':[(139,-35.5),(143,-34.5),(147,-35.5)],'Dajla':[(47.5,30),(44,33),(40,35),(38,37)],'Niger':[(6,4.3),(6,7),(4,9),(-1,14),(-6,13)],'Ob':[(73,66.5),(70,62),(73,58),(78,55)],
'Lena':[(126,72),(127,67),(129,62),(125,56)],'Yenisey':[(83,71),(86,66),(90,60),(93,55)]}
def line(a,b,v,arr,only_land=True):
    (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
    for i in range(n+1):
        x=round(x0+(x1-x0)*i/n)%GX;y=round(y0+(y1-y0)*i/n)
        if 0<=y<GY and (not only_land or T[y,x]!=4) and T[y,x]!=2:arr[y,x]=v
for pts in rivers.values():
    cs=[cell(*p) for p in pts]
    for a,b in zip(cs,cs[1:]):
        if abs(a[0]-b[0])<GX//2:line(a,b,1,R)
# shaharlar (qishloq belgilari)
cities=[('Toshkent',69.2,41.3),('Samarqand',66.9,39.7),('Dushanbe',68.8,38.6),('Buxoro',64.4,39.8),('Moskva',37.6,55.8),('Peterburg',30.3,59.9),('London',-0.1,51.5),('Parij',2.3,48.9),('Berlin',13.4,52.5),('Rim',12.5,41.9),('Madrid',-3.7,40.4),('Istanbul',29,41),('Qohira',31.2,30),('Lagos',3.4,6.5),('Nayrobi',36.8,-1.3),('Kapstaun',18.4,-33.9),('Dakar',-17.4,14.7),('Addis-Abeba',38.7,9),('Kinshasa',15.3,-4.3),('Tehron',51.4,35.7),('Bog‘dod',44.4,33.3),('Riyod',46.7,24.7),('Dehli',77.2,28.6),('Mumbay',72.9,19.1),('Kalkutta',88.4,22.6),('Dakka',90.4,23.8),('Bangkok',100.5,13.8),('Pekin',116.4,39.9),('Shanxay',121.5,31.2),('Guanchjou',113.3,23.1),('Seul',127,37.6),('Tokio',139.7,35.7),('Jakarta',106.8,-6.2),('Manila',121,14.6),('Sidney',151.2,-33.9),('Melburn',145,-37.8),('Perth',115.9,-32),('Nyu-York',-74,40.7),('Chikago',-87.6,41.9),('Los-Anjeles',-118.2,34.1),('Meksiko',-99.1,19.4),('Toronto',-79.4,43.7),('Vankuver',-123.1,49.3),('Bogota',-74.1,4.7),('Lima',-77,-12),('San-Paulu',-46.6,-23.5),('Buenos-Ayres',-58.4,-34.6),('Santyago',-70.7,-33.4),('Manaus',-60,-3.1),('Novosibirsk',82.9,55),('Yakutsk',129.7,62),('Almati',76.9,43.2),('Ostona',71.4,51.2),('Kobul',69.2,34.5),('Karachi',67,24.9),('Xanoy',105.8,21),('Oslo',10.7,59.9),('Stokgolm',18.1,59.3),('Xelsinki',24.9,60.2),('Kiyev',30.5,50.5),('Varshava',21,52.2),('Vena',16.4,48.2),('Atina',23.7,38),('Tunis',10.2,36.8),('Aljir',3,36.7),('Xartum',32.5,15.6),('Luanda',13.2,-8.8),('Mapuru',32.6,-25.9),('Antananarivu',47.5,-18.9),('Anchorage',-149.9,61.2),('Denver',-105,39.7),('Gavana',-82.4,23.1),('Karakas',-66.9,10.5),('Rio',-43.2,-22.9),('Reykyavik',-21.9,64.1),('Nuuk',-51.7,64.2)]
vill=[]
for nm,lo,la in cities:
    x,y=cell(lo,la)
    if (x<30 and y<23):continue
    if T[y,x]==4 or T[y,x]==2:
        found=None
        for r in range(1,4):
            for dy in range(-r,r+1):
                for dx in range(-r,r+1):
                    xx,yy=(x+dx)%GX,y+dy
                    if 0<=yy<GY and T[yy,xx] not in(4,2) and R[yy,xx]!=1 and not found:found=(xx,yy)
            if found:break
        if not found:continue
        x,y=found
    vill.append((x,y,nm))
# qo'shimcha qishloqlar (quruqlikda, bir-biridan uzoq)
NV=330 if GX<=360 else 2000;DMIN=36 if GX<=360 else 100;rnd=random.Random(7);pts=[(v[0],v[1]) for v in vill]
cand=[(x,y) for y in range(GY) for x in range(GX) if T[y,x] in(0,1) and R[y,x]==0 and not(x<30 and y<23) and 8<y<GY-6]
rnd.shuffle(cand)
for x,y in cand:
    if len(pts)>=NV:break
    if all(min(abs(x-a),GX-abs(x-a))**2+(y-b)**2>=DMIN for a,b in pts):pts.append((x,y))
for x,y in pts:M[y,x]=1
# yo'llar: eng yaqin qishloqlar orasida, faqat quruqlik orqali
def clear(a,b):
    (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
    for i in range(n+1):
        x=round(x0+(x1-x0)*i/n)%GX;y=round(y0+(y1-y0)*i/n)
        if T[y,x] in(4,2):return False
    return True
def dist(a,b):return math.hypot(min(abs(a[0]-b[0]),GX-abs(a[0]-b[0])),a[1]-b[1])
for i,a in enumerate(pts):
    ds=sorted(((dist(a,b),b) for j,b in enumerate(pts) if j!=i))[:2]
    for d,b in ds:
        if d<26*SC**.7:
            if abs(a[0]-b[0])>GX//2:continue
            if clear(a,b):
                (x0,y0),(x1,y1)=a,b;n=max(abs(x1-x0),abs(y1-y0),1)
                for k in range(n+1):
                    x=round(x0+(x1-x0)*k/n)%GX;y=round(y0+(y1-y0)*k/n)
                    if R[y,x]==0:R[y,x]=2
# PMD kodlash
def rle(a):
    a=a.ravel();o=bytearray();i=0
    while i<len(a):
        v=a[i];n=1
        while i+n<len(a) and a[i+n]==v and n<255:n+=1
        o+=bytes([v,n]);i+=n
    return bytes(o)
pm='JS1,%d,%d,'%(GX,GY)+base64.b64encode(rle(T)+rle(R)+rle(M)).decode()
od=base64.b64encode(rle(D)).decode()
im=Image.open(S+'earth_eq.png').convert('RGB');b=io.BytesIO();im.save(b,'JPEG',quality=80,optimize=True);ej=base64.b64encode(b.getvalue()).decode()
json.dump({'pm':pm,'od':od,'ej':ej,'cities':[(v[2],v[0],v[1]) for v in vill]},open(OUT,'w'))
print(len(pm),len(od),len(ej),len(vill),len(pts),np.bincount(R.ravel()))
Image.fromarray(np.array([[0,0,0],[30,90,170]],np.uint8)[(T==4).astype(int)]).save(S+'mask.png')
