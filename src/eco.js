// ===================== EKOLOGIYA: yirtqichlar, o'ljalar, o'ziga xos odatlar =====================
const ECO={t:0,howl:15,gl:[]};
const PRED={16:[0,1,13,11,7,19,5],15:[5,6,0,1],18:[17,0],6:[0,5]},AGG={16:1,15:1,20:1};
function ecoEnd(a){a.eco=0;a.ep=null;a.st='idle';a.t=1+Math.random()*2}
function ecoUpdate(dt){const E=ECO;E.t-=dt;const scan=E.t<=0;if(scan)E.t=.8;E.howl-=dt;E.gl.length=0;const night=dayN>.6,pOk=P.dead<=0&&!UW.on&&!BT.on&&P.z<10;
  for(let i=0;i<AN.length;i++){const a=AN[i],dx=a.x-P.x;if(dx>430||dx<-430)continue;const dy=a.y-P.y;if(dy>430||dy<-430)continue;
    if(a.pet||a.jzp||a.jz||a.dead||a.rm||a.fling||a.down>0||a.st=='hid'||a.st=='climb'){if(a.eco)a.eco=0;continue}
    const dp=Math.hypot(dx,dy),T=SPT[a.sp];
    if((a.sp==18||a.sp==19)&&night&&dp<300)E.gl.push(a);
    if(a.eco=='hunt'){const p=a.ep;a.et-=dt;if(!p||p.dead||p.rm||p.fling||a.et<=0||p.st=='hid'||p.st=='climb'){ecoEnd(a);continue}
      const ex=p.x-a.x,ey=p.y-a.y,d=Math.hypot(ex,ey)||1;if(!p.eco){p.eco='run';p.ep=a;p.et=5}a.st='walk';a.t=5;a.tx=p.x;a.ty=p.y;stepA(a,p.x,p.y,T.f-T.w+12,dt);
      if(d<10){p.mt=1;p.eco=0;p.hpv=0;hitAnimal(p,150,ex/d,ey/d);a.eco='eat';a.et=5+Math.random()*3;a.hung=70+Math.random()*70;a.st='graze';a.t=a.et;if(dp<260)pops.push({x:a.x,y:a.y,z:22,t:1,s:T.n+' ov qildi'})}}
    else if(a.eco=='run'){const p=a.ep;a.et-=dt;if(!p||p.dead||p.rm||a.et<=0||!p.eco){ecoEnd(a);continue}const ex=a.x-p.x,ey=a.y-p.y,d=Math.hypot(ex,ey)||1;if(d>230){ecoEnd(a);continue}
      const w=Math.sin(time*3+a.hx)*.5;a.st='walk';a.t=5;a.tx=a.x+(ex/d-ey/d*w)*40;a.ty=a.y+(ey/d+ex/d*w)*40;stepA(a,a.tx,a.ty,T.f-T.w,dt)}
    else if(a.eco=='eat'){a.et-=dt;if(a.et<=0)ecoEnd(a)}
    else if(a.eco=='atk'){a.et-=dt;if(!pOk||dp>230||a.et<=0||(hero&&a.sp!=15)){ecoEnd(a);a.acd=time+7;continue}
      a.st='walk';a.t=5;a.tx=P.x;a.ty=P.y;if(dp>11)stepA(a,P.x,P.y,(T.f-T.w)*(a.sp==20?1.25:1),dt);
      else if((a.bcd||0)<=time){a.bcd=time+1.2;hurtP(a.sp==15?12:a.sp==20?7:6,-dx/(dp||1),-dy/(dp||1));pop(a.sp==15?'Oq ayiq panja urdi!':a.sp==20?'Cho‘chqa suzdi!':'Bo‘ri tishladi!');sndA(a.sp,a.x,a.y)}}
    else if(scan&&a.st!='flee'&&a.st!='slide'&&a.st!='sleep'){
      if(PRED[a.sp]){a.hung=(a.hung===undefined?10+Math.random()*60:a.hung)-.8;if(a.hung<=0){let best=null,bd=160;const pr=PRED[a.sp];for(let j=0;j<AN.length;j++){const b=AN[j],ex=b.x-a.x;if(ex>bd||ex<-bd)continue;if(!pr.includes(b.sp)||b.dead||b.rm||b.fling||b.pet||b.jz||b.jzp||b.eco||b.st=='hid')continue;const d=Math.hypot(ex,b.y-a.y);if(d<bd){bd=d;best=b}}
          if(best){a.eco='hunt';a.ep=best;a.et=9;best.eco='run';best.ep=a;best.et=6}else a.hung=8}}
      if(!a.eco&&AGG[a.sp]&&pOk&&(a.acd||0)<=time){const r=a.sp==15?95:a.sp==20?50:(night&&!hero?130:0);if(dp<r){a.eco='atk';a.et=7;if(dp<200)sndA(a.sp,a.x,a.y)}}}
    // o'ziga xos odatlar
    if(dp<300){if(a.sp==18&&a.st=='walk'&&Math.random()<dt*8)fxs.push({x:a.x,y:a.y,z:2,vx:0,vy:0,vz:18,l:.4,c:Math.random()<.5?'#ff8a2a':'#ffd23a'});
      else if(a.sp==19&&Math.random()<dt*2)fxs.push({x:a.x+Math.random()*8-4,y:a.y,z:10+Math.random()*10,vx:0,vy:0,vz:12,l:.5,c:'#bfefff'});
      else if(a.sp==12&&a.st=='graze'&&Math.random()<dt*1.5)leaves.push({x:a.x+Math.random()*8-4,y:a.y,z:26,p:Math.random()*6,c:'#5aa84a',l:0});
      else if(a.sp==14&&a.st=='graze'&&Math.random()<dt*.15)pops.push({x:a.x,y:a.y,z:18,t:1,s:'🎋'});
      else if(a.sp==16&&night&&E.howl<=0&&AC&&!muted){E.howl=22+Math.random()*30;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(560,t+.5);o.frequency.exponentialRampToValueAtTime(420,t+1.6);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.06,t+.3);g.gain.linearRampToValueAtTime(0,t+1.7);o.connect(g);g.connect(pn(dx/300));o.start(t);o.stop(t+1.8)}}}}
