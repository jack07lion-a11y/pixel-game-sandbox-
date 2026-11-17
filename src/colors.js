// ---------- REALISTIK PIKSEL RANGLAR: tekstura bilan chizilgan yer plitkalari + vinyetka ----------
(function(){
  const hx=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
  const cl=v=>v<0?0:v>255?255:v|0;
  const mul=(c,k)=>'rgb('+cl(c[0]*k)+','+cl(c[1]*k)+','+cl(c[2]*k)+')';
  const mix=(a,b,t)=>'rgb('+cl(a[0]+(b[0]-a[0])*t)+','+cl(a[1]+(b[1]-a[1])*t)+','+cl(a[2]+(b[2]-a[2])*t)+')';
  function paint(cv,base,kind,seed){
    const g=cv.getContext('2d'),c=hx(base);g.clearRect(0,0,32,16);
    let s=(seed*2654435761+12345)>>>0;const rn=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
    const J={grass:.05,sand:.04,snow:.025,rock:.06,path:.04,water:.03,ice:.025}[kind]||.06;
    const px=[];
    for(let r=0;r<16;r++){const w=4*(r<8?r+1:16-r),x0=16-w/2;for(let x=x0;x<x0+w;x++){
      let k=1+(rn()-.5)*2*J;if(kind=='water')k+=(r-8)*.006;
      g.fillStyle=mul(c,k);g.fillRect(x,r,1,1);px.push([x,r])}}
    const pick=()=>px[(rn()*px.length)|0],dot=(p,col,w=1,h=1)=>{g.fillStyle=col;g.fillRect(p[0],p[1],w,h)};
    if(kind=='grass'){const lt=mul(c,1.32),dk=mul(c,.72),dd=mul(c,.6);
      for(let i=0;i<5;i++){const p=pick();dot(p,lt);dot([p[0],p[1]+1],dk)}
      for(let i=0;i<2;i++)dot(pick(),dd,2,1);
      if(rn()<.18){const p=pick();dot(p,rn()<.5?'#f2e9a0':'#f4f0ea')}}
    else if(kind=='sand'){const lt=mul(c,1.12),dk=mul(c,.88);
      for(let i=0;i<9;i++)dot(pick(),rn()<.5?lt:dk);
      for(let i=0;i<3;i++){const p=pick();dot(p,dk,3,1)}}
    else if(kind=='snow'){const bl=mix(c,[170,195,225],.5);
      for(let i=0;i<8;i++)dot(pick(),bl);
      for(let i=0;i<4;i++)dot(pick(),'#ffffff')}
    else if(kind=='rock'){const lt=mul(c,1.2),dk=mul(c,.62);
      for(let i=0;i<7;i++){const p=pick();dot(p,dk);dot([p[0]+1,p[1]+1],dk)}
      for(let i=0;i<8;i++)dot(pick(),lt)}
    else if(kind=='path'){const lt=mul(c,1.15),dk=mul(c,.78);
      for(let i=0;i<3;i++)dot(pick(),dk);for(let i=0;i<3;i++)dot(pick(),lt)}
    else if(kind=='water'){const lt=mul(c,1.35),dk=mul(c,.82);
      for(let i=0;i<5;i++){const p=pick();dot(p,lt,2,1);dot([p[0]+1,p[1]+1],dk,2,1)}}
    else if(kind=='ice'){const bl=mix(c,[130,180,220],.5);for(let i=0;i<5;i++)dot(pick(),bl,2,1);for(let i=0;i<4;i++)dot(pick(),'#ffffff')}}
  // yangi, tabiiy palitra (o't, qum, qor, tosh)
  const G=[['#4e9a36','#58a43f','#489030'],['#dcc48c','#d5bc83','#e2cd98'],['#eef3f8','#e5edf4','#f5f9fc'],['#7e7f86','#74767e','#8a8c94']];
  const K=['grass','sand','snow','rock'];
  const P=[['#cdb07c','#c5a875'],['#c2a06a','#b89862'],['#bcb3a2','#b0a794'],['#8a8076','#7f756b']];
  try{
    TL.forEach((a,b)=>a.forEach((cv,i)=>paint(cv,G[b][i],K[b],b*7+i+1)));
    PL.forEach((a,b)=>a.forEach((cv,i)=>paint(cv,P[b][i],'path',b*11+i+40)));
    WTL.forEach((cv,i)=>paint(cv,['#2f77a8','#3480b2'][i],'water',90+i));
    ICE.forEach((cv,i)=>paint(cv,['#c8e3f0','#bcdcec'][i],'ice',95+i));
  }catch(e){console.warn('ranglar',e)}
  // vinyetka: chetlarni salgina qorong'ilashtirib, markazga e'tiborni qaratadi
  const v=document.createElement('div');v.id='vig';const c=document.getElementById('c');c.parentNode.insertBefore(v,c.nextSibling);
})();
