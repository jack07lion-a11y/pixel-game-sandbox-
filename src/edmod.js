// ---------- Xarita muharriri (o‘zim chizaman) ----------
let edOpen=false;
const ed=document.getElementById('ed'),ec=document.getElementById('ec'),eg=ec.getContext('2d');
const ET={T:null,R:null,M:null,tool:0,size:4,round:1,pan:0,fill:0,z:3,ox:0,oy:0,dirty:1,hist:[],stroke:0,mode:'',last:null,hx:-1,hy:-1};
const ECOL=[[93,150,72],[222,196,130],[232,240,246],[132,134,142],[26,80,150]];
const eCv=document.createElement('canvas');eCv.width=GX;eCv.height=GY;const eCx=eCv.getContext('2d'),eId=eCx.createImageData(GX,GY),eD=eId.data;
const TOOLS=[['Dasht','#5d9648'],['Cho‘l','#dec482'],['Qor','#e8f0f6'],['Tosh','#84868e'],['Okean','#1a5096'],['Daryo','#3a82c0'],['Yo‘l','#cbb888'],['Qishloq','#c0503a'],['O‘chirg‘ich','#999']];
const eLock=(cx,cy)=>cx<30&&cy<23;
function eCol(i){let c=ECOL[ET.T[i]],r=ET.R[i];if(r==1)c=ET.T[i]==2?[150,200,228]:[58,130,190];else if(r==2)c=[196,170,112];else if(r==3)c=[140,100,60];if(ET.M[i]==1)c=[215,60,45];
  const k=i*4;eD[k]=c[0];eD[k+1]=c[1];eD[k+2]=c[2];eD[k+3]=255}
function eAll(){for(let i=0;i<GX*GY;i++)eCol(i);ET.dirty=1}
function eInit(proc){ET.T=new Uint8Array(GX*GY);ET.R=new Uint8Array(GX*GY);ET.M=new Uint8Array(GX*GY);
  let d=null;if(!proc){try{d=pmDec(localStorage.getItem('jsPaint'));if(d&&(d.gx!=GX||d.gy!=GY))d=null}catch(e){}}
  if(d){ET.T.set(d.T);ET.R.set(d.R);ET.M.set(d.M)}
  else{for(let cy=0;cy<GY;cy++)for(let cx=0;cx<GX;cx++){const a=cx*2+1,b=cy*2+1,i=cy*GX+cx,w=isW0(a,b),bi=biome0(a,b);ET.T[i]=bi;ET.R[i]=w?(isBr0(b)?3:1):isP0(a,b)?2:0}
    HS.forEach(h=>{const cx=h.x/32|0,cy=h.y/32|0;if(cx<GX&&cy<GY&&!eLock(cx,cy))ET.M[cy*GX+cx]=1})}
  eAll()}
function eSave(){try{localStorage.setItem('jsPaint',pmEnc({gx:GX,gy:GY,T:ET.T,R:ET.R,M:ET.M}));return true}catch(e){return false}}
function eToast(t){const e=document.getElementById('etoast');e.textContent=t;e.style.opacity=1;clearTimeout(eToast.h);eToast.h=setTimeout(()=>e.style.opacity=0,1800)}
function eHist(){ET.hist.push([ET.T.slice(),ET.R.slice(),ET.M.slice()]);if(ET.hist.length>25)ET.hist.shift()}
function eUndo(){const h=ET.hist.pop();if(!h){eToast('Qaytarish uchun hech narsa yo‘q');return}ET.T.set(h[0]);ET.R.set(h[1]);ET.M.set(h[2]);eAll();eSave()}
function eCell(x,y){const t=ET.tool,i=y*GX+x;
  if(t<=4){ET.T[i]=t;if(t==4){ET.R[i]=0;ET.M[i]=0}}
  else if(ET.T[i]==4)return;
  else if(t==5)ET.R[i]=(ET.R[i]==2||ET.R[i]==3)?3:1;
  else if(t==6)ET.R[i]=(ET.R[i]==1||ET.R[i]==3)?3:2;
  else if(t==7)ET.M[i]=1;
  else if(t==8){ET.R[i]=0;ET.M[i]=0}
  eCol(i)}
function eBrush(cx,cy){const n=(ET.tool==7?1:ET.size),o=Math.floor(n/2),h=(n-1)/2;
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){if(ET.round&&n>2&&(i-h)*(i-h)+(j-h)*(j-h)>n*n/4)continue;const x=cx-o+i,y=cy-o+j;if(x<0||y<0||x>=GX||y>=GY||eLock(x,y))continue;eCell(x,y)}ET.dirty=1}
function eLine(a,b){const n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]),1);for(let k=0;k<=n;k++)eBrush(Math.round(a[0]+(b[0]-a[0])*k/n),Math.round(a[1]+(b[1]-a[1])*k/n))}
function eFill(cx,cy){if(cx<0||cy<0||cx>=GX||cy>=GY||ET.tool>4||eLock(cx,cy))return;const src=ET.T[cy*GX+cx],dst=ET.tool;if(src==dst)return;const st=[cx+cy*GX];
  while(st.length){const i=st.pop(),x=i%GX,y=(i/GX)|0;if(ET.T[i]!=src||eLock(x,y))continue;ET.T[i]=dst;if(dst==4){ET.R[i]=0;ET.M[i]=0}eCol(i);if(x>0)st.push(i-1);if(x<GX-1)st.push(i+1);if(y>0)st.push(i-GX);if(y<GY-1)st.push(i+GX)}ET.dirty=1}
function edDraw(){const w=ec.width,h=ec.height,z=ET.z,ox=ET.ox,oy=ET.oy;eg.fillStyle='#0b1220';eg.fillRect(0,0,w,h);
  if(ET.dirty){eCx.putImageData(eId,0,0);ET.dirty=0}
  eg.imageSmoothingEnabled=false;eg.drawImage(eCv,ox,oy,GX*z,GY*z);
  eg.strokeStyle='rgba(255,255,255,.22)';eg.lineWidth=1;eg.beginPath();for(let i=0;i<=GX;i+=30){eg.moveTo(ox+i*z+.5,oy);eg.lineTo(ox+i*z+.5,oy+GY*z)}for(let j=0;j<=GY;j+=22.5){eg.moveTo(ox,oy+j*z+.5);eg.lineTo(ox+GX*z,oy+j*z+.5)}eg.stroke();
  eg.fillStyle='rgba(0,0,0,.45)';eg.fillRect(ox,oy,30*z,23*z);eg.strokeStyle='#ffd23a';eg.lineWidth=2;eg.strokeRect(ox,oy,30*z,23*z);
  eg.font='bold 12px monospace';eg.fillStyle='#ffd23a';eg.textAlign='left';eg.fillText('BIYON (o‘zgarmaydi)',ox+6,oy+16);
  eg.strokeStyle='#fff';eg.lineWidth=2;eg.strokeRect(ox,oy,GX*z,GY*z);
  if(z>=4){for(let i=0;i<GX*GY;i++)if(ET.M[i]==1){const x=ox+(i%GX)*z,y=oy+((i/GX)|0)*z;eg.fillStyle='#fff';eg.fillRect(x+1,y+z*.35,z-2,z*.6);eg.fillStyle='#b5503a';eg.fillRect(x,y+z*.15,z,z*.3)}}
  if(ET.hx>=0&&ET.mode!='pan'){const n=ET.tool==7?1:ET.size,o=Math.floor(n/2),x=ox+(ET.hx-o)*z,y=oy+(ET.hy-o)*z;eg.strokeStyle='#fff';eg.lineWidth=1.5;if(ET.round&&n>2){eg.beginPath();eg.ellipse(x+n*z/2,y+n*z/2,n*z/2,n*z/2,0,0,6.3);eg.stroke()}else eg.strokeRect(x,y,n*z,n*z)}}
function eSize(){ec.width=innerWidth;ec.height=innerHeight}
function eFit(){const z=Math.max(1,Math.min(innerWidth/GX,(innerHeight-190)/GY));ET.z=z;ET.ox=(innerWidth-GX*z)/2;ET.oy=64}
function openEd(){edOpen=true;ed.style.display='block';eSize();if(!ET.T)eInit(false);eFit();ET.hist=[]}
function closeEd(){eSave();edOpen=false;ed.style.display='none'}
const eC=e=>{const r=ec.getBoundingClientRect();return[Math.floor((e.clientX-r.left-ET.ox)/ET.z),Math.floor((e.clientY-r.top-ET.oy)/ET.z)]};
const ePt=new Map();let ePD=0,eMid=null;
const eZoom=(f,mx,my)=>{const z=Math.max(1,Math.min(20,ET.z*f)),k=z/ET.z;ET.ox=mx-(mx-ET.ox)*k;ET.oy=my-(my-ET.oy)*k;ET.z=z};
ec.onpointerdown=e=>{ec.setPointerCapture(e.pointerId);ePt.set(e.pointerId,[e.clientX,e.clientY]);
  if(ePt.size==2){ET.mode='pinch';const a=[...ePt.values()];ePD=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);eMid=[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2];return}
  if(e.button==1||e.button==2||ET.pan){ET.mode='pan';return}
  ET.mode='paint';eHist();const c=eC(e);ET.last=c;if(ET.fill)eFill(c[0],c[1]);else eBrush(c[0],c[1])};
ec.onpointermove=e=>{const c=eC(e);ET.hx=c[0];ET.hy=c[1];const o=ePt.get(e.pointerId);if(!o)return;
  if(ePt.size==2){ePt.set(e.pointerId,[e.clientX,e.clientY]);const a=[...ePt.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]),m=[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2];if(ePD>0)eZoom(d/ePD,m[0],m[1]);if(eMid){ET.ox+=m[0]-eMid[0];ET.oy+=m[1]-eMid[1]}ePD=d;eMid=m;return}
  ePt.set(e.pointerId,[e.clientX,e.clientY]);
  if(ET.mode=='pan'){ET.ox+=e.clientX-o[0];ET.oy+=e.clientY-o[1]}
  else if(ET.mode=='paint'&&!ET.fill){eLine(ET.last,c);ET.last=c}};
ec.onpointerup=ec.onpointercancel=e=>{ePt.delete(e.pointerId);if(ET.mode=='paint')eSave();if(ePt.size==0){ET.mode='';ePD=0;eMid=null}else if(ePt.size==1)ET.mode='pinch1'};
ec.onwheel=e=>{e.preventDefault();eZoom(e.deltaY<0?1.15:1/1.15,e.clientX,e.clientY)};
ec.oncontextmenu=e=>e.preventDefault();
ed.onpointerdown=e=>e.stopPropagation();ed.ontouchstart=e=>e.stopPropagation();gm.ontouchstart=e=>e.stopPropagation();
const edp=document.getElementById('ep');
TOOLS.forEach((t,i)=>{const b=document.createElement('button');b.innerHTML='<i style="background:'+t[1]+'"></i>'+t[0];b.onclick=()=>{ET.tool=i;[...edp.children].forEach((c,k)=>c.className=k==i?'on':'');document.getElementById('ebf').className=ET.fill&&i<=4?'on':''};if(!i)b.className='on';edp.appendChild(b)});
const $=id=>document.getElementById(id);
$('esz').oninput=e=>{ET.size=+e.target.value;$('esv').textContent=ET.size};
$('esh').onclick=()=>{ET.round^=1;$('esh').textContent=ET.round?'● yumaloq':'■ kvadrat'};
$('ebf').onclick=()=>{ET.fill^=1;$('ebf').className=ET.fill?'on':'';if(ET.fill&&ET.tool>4){ET.tool=0;[...edp.children].forEach((c,k)=>c.className=k==0?'on':'')}};
$('ebp').onclick=()=>{ET.pan^=1;$('ebp').className=ET.pan?'on':''};
$('ebu').onclick=eUndo;
$('ebr').onclick=()=>{eHist();eInit(true);eSave();eToast('Standart dunyo yuklandi')};
$('ebc').onclick=()=>{eHist();for(let cy=0;cy<GY;cy++)for(let cx=0;cx<GX;cx++){if(eLock(cx,cy))continue;const i=cy*GX+cx;ET.T[i]=4;ET.R[i]=0;ET.M[i]=0}eAll();eSave();eToast('Hammasi okean bo‘ldi')};
$('ebs').onclick=()=>{eToast(eSave()?'Saqlandi ✔':'Saqlab bo‘lmadi')};
$('ebg').onclick=()=>{eSave();try{localStorage.setItem('jsPaintOn','1')}catch(e){}location.reload()};
$('ebx').onclick=closeEd;
$('ebd').onclick=()=>{eSave();try{localStorage.setItem('jsPaintOn','0')}catch(e){}location.reload()};
$('ebk').onclick=()=>{$('ecd').style.display='flex';$('ect').value=pmEnc({gx:GX,gy:GY,T:ET.T,R:ET.R,M:ET.M})};
$('ecx').onclick=()=>$('ecd').style.display='none';
$('ecc').onclick=()=>{$('ect').select();try{navigator.clipboard.writeText($('ect').value);eToast('Nusxa olindi')}catch(e){document.execCommand('copy')}};
$('eci').onclick=()=>{const d=pmDec($('ect').value);if(!d||d.gx!=GX||d.gy!=GY){eToast('Kod mos kelmadi (xarita o‘lchami boshqa)');return}eHist();ET.T.set(d.T);ET.R.set(d.R);ET.M.set(d.M);eAll();eSave();$('ecd').style.display='none';eToast('Yuklandi')};
$('ect').onkeydown=e=>e.stopPropagation();$('ect').onkeyup=e=>e.stopPropagation();
$('ed0').onpointerdown=e=>{e.stopPropagation();e.preventDefault();openEd()};
addEventListener('resize',()=>{if(edOpen){eSize()}});
