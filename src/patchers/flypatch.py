p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
F=open('fly.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:90])
    s=s.replace(a,b)
rep('\nOCW=false;\nfunction loop(','\n'+F+'\nOCW=false;\nfunction loop(')
# movement
rep("  if(P.mov){\n    if(l>1){ax/=l;ay/=l}\n    const S=","  if(P.fly){flyTick(dt,ax,ay,l,run)}else if(P.mov){\n    if(l>1){ax/=l;ay/=l}\n    const S=")
rep("cam.x+=(P.x-P.y-W/2-cam.x)*k;cam.y+=((P.x+P.y)/2-P.z*.6-H/2-6-cam.y)*k;\n  dust.forEach","if(!P.fly){FVx=FVy=FS=FZV=0;LAx*=.92;LAy*=.92}cam.x+=(P.x-P.y-W/2+LAx-cam.x)*k;cam.y+=((P.x+P.y)/2-P.z*.6-H/2-6+LAy-cam.y)*k;\n  dust.forEach")
# pUpdate
rep("const tz=P.fly?28:0,dz=tz-P.z;if(Math.abs(dz)>.1){const v=Math.sign(dz)*(P.fly?70:90)*dt;P.z+=Math.abs(v)>Math.abs(dz)?dz:v}else P.z=tz;","if(!P.fly){const dz=-P.z;if(Math.abs(dz)>.1){const v=-(P.z>40?150:90)*dt;P.z+=Math.abs(v)>Math.abs(dz)?dz:v}else P.z=0}")
rep("P.pw-=(P.mov?10:5)*dt;","P.pw-=(FS>250?5.5:FS>100?2.2:1.1)*dt;")
rep("P.x+=ux*260*dt;P.y+=uy*260*dt;wrapP();","if(!P.fly){P.x+=ux*260*dt;P.y+=uy*260*dt;wrapP()}")
rep("function dive(){if(P.dive>0||P.pw<10)return;P.dive=.45;","function dive(){if(P.dive>0||P.pw<10)return;{const a=P.sec*Math.PI/4,fx=Math.cos(a),fy=Math.sin(a),wx=.5*(fy+fx),wy=.5*(fy-fx),l=Math.hypot(wx,wy)||1;FVx+=wx/l*230;FVy+=wy/l*230;FTire=Math.min(1,FTire+.05)}P.dive=.45;")
rep("else if(P.pw>10){P.fly=1;sndTake();","else if(P.pw>10){P.fly=1;ALT=34;FVx=FVy=0;FZV=45;rings.push({x:P.x,y:P.y,t:.25,n:2});shake=Math.max(shake,.15);if(!flyHint){flyHint=1;pop('Q/Z balandlik · Shift tezlik · V suvga sho‘ng‘ish',2)}sndTake();")
# draw
rep("    const idle=!P.mov,f=TF.act?6:","    if(hero&&(P.fly||P.z>3)&&!TF.act&&P.dead<=0){drawFly(X,Y0,zz);return}\n    const idle=!P.mov,f=TF.act?6:")
# wind sound
rep("windG.gain.setTargetAtTime(.012+.03*Math.abs(wind(P.x,P.y))+(P.mov?.01:0),t,.2);","windG.gain.setTargetAtTime(.012+.03*Math.abs(wind(P.x,P.y))+(P.mov?.01:0)+(P.fly?Math.min(.1,FS/3200):0),t,.2);")
# animals
rep("AN.forEach(a=>{const dx=a.x-P.x,dy=a.y-P.y,dp=Math.hypot(dx,dy);if(dp>500&&!a.pet&&!a.jzp)return;const T=SPT[a.sp];a.t-=dt;","AN.forEach(a=>{if(a.fling||a.down>0||a.dead>0){animFx(a,dt);return}const dx=a.x-P.x,dy=a.y-P.y,dp=Math.hypot(dx,dy);if(dp>500&&!a.pet&&!a.jzp)return;if(a.hurt>0)a.hurt-=dt;const T=a.hurt>0?{...SPT[a.sp],w:SPT[a.sp].w*.45,f:SPT[a.sp].f*.55}:SPT[a.sp];a.t-=dt;")
rep("function animUpdate(dt){\n","function animUpdate(dt){animCleanup();\n")
rep("ctx.save();ctx.translate(X,Y-Math.round(z));if(a.dir<0)ctx.scale(-1,1);ctx.drawImage(ANS[a.sp]","ctx.save();ctx.translate(X,Y-Math.round(z));if(a.rot)ctx.rotate(a.rot);if(a.dir<0)ctx.scale(-1,1);ctx.drawImage(ANS[a.sp]")
rep("ctx.drawImage(ANS[a.sp][st=='climb'?4:fr],-15,-36);ctx.restore();","ctx.drawImage(ANS[a.sp][st=='climb'?4:fr],-15,-36);ctx.restore();if(a.down>0&&!a.fling&&!a.dead){ctx.fillStyle='#ffe27a';for(let q=0;q<3;q++){const t=time*4+q*2.1;ctx.fillRect(X+Math.round(Math.cos(t)*6),Y-14+Math.round(Math.sin(t)*2),2,2)}}")
# ground punches
rep("if(bt){any=1;treeHit(bt,AT.n,ux,uy)}}","if(bt){any=1;treeHit(bt,AT.n,ux,uy);if(AT.n==2&&bt[4].st==0)treeHit(bt,2,ux,uy)}}\n      AN.forEach(a=>{if(a.pet||a.jzp||a.jz||a.dead||a.rm||a.fling)return;const dx=a.x-P.x,dy=a.y-P.y,dist=Math.hypot(dx,dy);if(dist<rng+4&&dx*ux+dy*uy>dist*.2&&(a.z||0)<10){any=1;hitAnimal(a,[100,150,320][AT.n],ux,uy)}});\n      if(AT.n==2){for(const r of rocks){const cx=r[0]+r[2]/2-P.x,cy=r[1]+r[3]/2-P.y,d=Math.hypot(cx,cy);if(d<rng+10&&cx*ux+cy*uy>d*.2){any=1;crushRock(r);break}}}")
# underwater
rep("UW.vz+=((up?42:dn?-42:0)-UW.vz)*Math.min(1,dt*6);","UW.vz+=((up?42:dn?-42:0)-UW.vz)*Math.min(1,dt*6);if(UW.pv>0){UW.vz=Math.min(UW.vz,-UW.pv);UW.pv=Math.max(0,UW.pv-dt*60);if(Math.random()<.6)UW.bub.push({x:P.x,y:P.y,z:UW.z+8,vz:12+Math.random()*10,l:1.5})}")
rep("if(UW.z>=59.5&&up&&UW.air>-1){uwExit(0);return}","if(UW.z>=59.5&&up&&UW.air>-1){if(hero&&UW.vz>22){breachOut();return}uwExit(0);return}")
rep("UW.air-=(hero?2.2:3.6)*dt;","UW.air-=(hero?3.05:3.6)*dt;")
rep("UW.atk-=dt;UW.slow-=dt;","UW.atk-=dt;UW.slow-=dt;UW.enter-=dt;")
rep("if(!oc(P.x,P.y)||P.fly||P.z>4){pop('Okeanda sho‘ng‘ing');return}","if(P.fly&&oc(P.x,P.y)){plungeIn(FS+40);return}\n  if(!oc(P.x,P.y)||P.fly||P.z>4){pop('Okeanda sho‘ng‘ing');return}")
rep("if(UW.on)renderUW();else render();mmDraw();","if(UW.on){renderUW();if(UW.enter>0)waveFx(UW.enter)}else render();mmDraw();")
rep("render();rgDraw(dt);mmDraw();","render();rgDraw(dt);flyFx(dt);mmDraw();")
# UI
rep("show=UW.on||P.sw||(P.sta<98&&!BT.on);","show=UW.on||P.sw||P.fly||(P.sta<98&&!BT.on);")
rep("const key=[UW.on,BT.on,nb,P.sw,show,","const key=[UW.on,BT.on,nb,P.sw,show,P.fly,Math.round(FS/12),Math.round(FTire*20),")
rep("bDv.style.display=(UW.on||P.sw||BT.on)?'block':'none'","bDv.style.display=(UW.on||P.sw||BT.on||(P.fly&&oc(P.x,P.y)))?'block':'none'")
rep("bUu.style.display=bUd.style.display=UW.on?'block':'none';","bUu.style.display=bUd.style.display=(UW.on||P.fly)?'block':'none';")
rep("  else{swl.textContent='🌊 Suzish kuchi '","  else if(P.fly){swl.textContent='🕊 '+Math.round(FS*3.6)+' km/s · charchoq '+Math.round(FTire*100)+'%';swf.style.width=Math.round((1-FTire)*100)+'%';swf.style.background=FTire>.75?'#e0a04a':'#8fd0ff'}\n  else{swl.textContent='🌊 Suzish kuchi '")
open(p,'w',encoding='utf-8').write(s);print('ok')
