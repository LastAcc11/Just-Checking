const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const path=require('path'),fs=require('fs');
(async()=>{
  const [,,sid,data,out,mode]=process.argv;
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1920,height:1080}});
  p.on('pageerror',e=>console.error('PAGEERR',e.message));
  await p.goto('file://'+path.resolve('scene.html')+`?render=1&s=${sid}&data=${data||''}`);
  await p.waitForFunction(()=>window.ready);await p.evaluate(()=>window.ready);
  const dur=await p.evaluate(()=>window.DUR);
  fs.mkdirSync(out,{recursive:true});
  let times;
  if(mode==='test'){const n=9;times=[...Array(n)].map((_,i)=>0.15+i*(dur-0.3)/(n-1))}
  else{times=[...Array(Math.round(dur*30))].map((_,i)=>i/30)}
  for(let i=0;i<times.length;i++){
    await p.evaluate(t=>renderAt(t),times[i]);
    await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:93});
  }
  console.log(sid,'frames',times.length,'dur',dur);
  await b.close();
})();
