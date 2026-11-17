// ===================== EKRANGA MOSLASH: doim gorizontal =====================
const ROOT=document.getElementById('root'),SAP=document.getElementById('sap');
let VW=window.innerWidth,VH=window.innerHeight,ROT=0;
function vp(){
  const w=window.innerWidth,h=window.innerHeight;ROT=h>w?1:0;VW=ROT?h:w;VH=ROT?w:h;
  const s=ROOT.style;s.width=VW+'px';s.height=VH+'px';s.transform=ROT?'translateX('+w+'px) rotate(90deg)':'none';
  const cs=getComputedStyle(SAP),t=parseFloat(cs.paddingTop)||0,r=parseFloat(cs.paddingRight)||0,b=parseFloat(cs.paddingBottom)||0,l=parseFloat(cs.paddingLeft)||0;
  const q=ROT?[r,b,l,t]:[t,r,b,l];
  s.setProperty('--sat',q[0]+'px');s.setProperty('--sar',q[1]+'px');s.setProperty('--sab',q[2]+'px');s.setProperty('--sal',q[3]+'px');
  s.setProperty('--u',Math.max(34,Math.min(66,VH*.135))+'px');s.setProperty('--vw',VW+'px');s.setProperty('--vh',VH+'px')}
vp();
// portret holatda ekran burilgan bo'lsa ham koordinatalar to'g'ri tushishi uchun (soat yo'nalishida 90°)
(function(){const def=(e,k,v)=>{try{Object.defineProperty(e,k,{value:v,configurable:true})}catch(_){}};
  const fix=e=>{if(!ROT||e.__f)return;const x=e.clientX,y=e.clientY;if(typeof x!=='number')return;const nx=y,ny=window.innerWidth-x;
    def(e,'clientX',nx);def(e,'clientY',ny);def(e,'pageX',nx);def(e,'pageY',ny);def(e,'x',nx);def(e,'y',ny);def(e,'offsetX',nx);def(e,'offsetY',ny);e.__f=1};
  ['pointerdown','pointermove','pointerup','pointercancel','mousedown','mousemove','mouseup','click','wheel','contextmenu'].forEach(t=>addEventListener(t,fix,true))})();
try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(e){}
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
let PX,W,H;
function rs(){PX=Math.max(2,Math.min(6,Math.round(VH/190)));W=Math.ceil(VW/PX);H=Math.ceil(VH/PX);cv.width=W;cv.height=H;cv.style.width=W*PX+'px';cv.style.height=H*PX+'px';ctx.imageSmoothingEnabled=false}
function relayout(){vp();rs();if(typeof bedSize==='function')bedSize()}
addEventListener('resize',relayout);addEventListener('orientationchange',()=>{setTimeout(relayout,60);setTimeout(relayout,300)});
if(window.visualViewport)visualViewport.addEventListener('resize',relayout);
rs();
