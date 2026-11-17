const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:560}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(4500);
await pg.keyboard.press('m');await pg.waitForTimeout(800);
await pg.mouse.click(866,140);await pg.waitForTimeout(800);   // ☀ tugma
console.log('mode',await pg.evaluate(()=>[gMode,SP.foc,getComputedStyle(document.getElementById('sp')).display]));
// zoom out (wheel)
for(let i=0;i<14;i++){await pg.mouse.move(450,280);await pg.mouse.wheel(0,200);await pg.waitForTimeout(30)}
await pg.waitForTimeout(600);await pg.screenshot({path:'t1.png'});
console.log('Z',await pg.evaluate(()=>[SP.Z.toFixed(2),SP.foc]),'sun',await pg.evaluate(()=>SP.sun.map(Math.round)));
// quyosh tomon siljitish: drag
const s=await pg.evaluate(()=>SP.sun.slice());
await pg.mouse.move(450,300);await pg.mouse.down();await pg.mouse.move(450+(450-s[0])*.5,300+(280-s[1])*.5,{steps:6});await pg.mouse.move(450+(450-s[0]),300+(280-s[1]),{steps:6});await pg.mouse.up();await pg.waitForTimeout(1500);
console.log('after drag',await pg.evaluate(()=>[SP.foc,SP.sun.map(Math.round)]));
// quyoshni bosish
await pg.evaluate(()=>{SP.foc=0;SP.tz=2.2});await pg.waitForTimeout(1500);const s2=await pg.evaluate(()=>SP.sun.slice());await pg.mouse.click(s2[0],s2[1]);await pg.waitForTimeout(2500);
console.log('tap sun',await pg.evaluate(()=>[SP.foc,SP.Z.toFixed(1)]));await pg.screenshot({path:'t2.png'});
await pg.click('#spE');await pg.waitForTimeout(2800);console.log('earth',await pg.evaluate(()=>[SP.foc,SP.Z.toFixed(1)]));await pg.screenshot({path:'t3.png'});
await pg.click('[data-ts="400"]');await pg.waitForTimeout(1500);console.log('ts',await pg.evaluate(()=>[SP.ts,solDate(),solSeason()]));await pg.screenshot({path:'t4.png'});
await pg.keyboard.press('Escape');await pg.waitForTimeout(600);
console.log('closed',await pg.evaluate(()=>gmOpen),errs);await b.close()})();
