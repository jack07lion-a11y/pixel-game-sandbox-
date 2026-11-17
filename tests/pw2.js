const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:900,height:520}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///mnt/user-data/outputs/pixel-game.html#m5');await pg.waitForTimeout(3000);
console.log(await pg.evaluate(()=>{const c=[0,0,0,0];for(let y=0;y<TYM;y+=3)for(let x=0;x<TXM;x+=3)c[biome(x,y)]++;const t=c[0]+c[1]+c[2]+c[3];return c.map(v=>(v/t*100|0)+'%')}));
await pg.keyboard.press('m');await pg.waitForTimeout(2200);await pg.screenshot({path:'globe2.png'});await pg.click('#gs');await pg.waitForTimeout(500);await pg.screenshot({path:'flat2.png'});console.log(errs);await b.close()})();
