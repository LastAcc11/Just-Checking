// MG08 — "שתבינו, יצחק אברג'יל גדל בשכונת רסקו בלוד, הצעיר מבין עשרה ילדים במשפחה שעלתה ממרוקו."
// global 74.50 → 81.15
const S0=74.50;
const LOD={lon:34.895,lat:31.952},MOR={lon:-7.6,lat:33.57};
let lab,kids,kl,mor;
const V1={lon:LOD.lon,lat:LOD.lat,ax:900,ay:430,span:4.2},V2={lon:13.5,lat:33.0,ax:960,ay:470,span:62};
const SCENE={dur:6.65,fadeIn:.3,
build(){
  lab=el('div','chip','לוד<small>שכונת רסקו</small>');lab.style.fontSize='54px';
  kids=el('div','abs','');Object.assign(kids.style,{left:'0',right:'0',top:'760px',display:'flex',justifyContent:'center',gap:'26px',direction:'rtl'});
  for(let i=0;i<10;i++){const k=document.createElement('div');k.innerHTML=person(i===9?96:76,i===9?'#e2372c':'#8b949c');k.style.alignSelf='flex-end';kids.appendChild(k)}
  kl=el('div','abs he','10 ילדים &nbsp;·&nbsp; <span style="color:#e2372c">יצחק, הצעיר</span>');Object.assign(kl.style,{left:0,right:0,top:'905px',textAlign:'center',fontWeight:800,fontSize:'40px',color:'#efe8da'});
  mor=el('div','chip','מרוקו<small>המשפחה עלתה לישראל</small>');mor.style.fontSize='48px';
},
update(t){const T=t+S0;
  const z=eIO(seg(T,79.6,80.8));const cam=camLerp(V1,V2,z);
  const lod=proj(cam,LOD.lon,LOD.lat),mo=proj(cam,MOR.lon,MOR.lat);
  drawMap(BG,cam,WORLD,{glowAt:[[lod[0],lod[1]]]});
  // kids panel backdrop
  drawPin(FX,lod[0],lod[1],seg(T,74.6,75.0),T);
  const lp=eOut(seg(T,75.4,75.9));place(lab,lod[0]+40,lod[1]-150);reveal(lab,lp,{dx:-20,dy:0,wipe:'none'});lab.style.opacity=lp*(1-z);
  const kp=seg(T,77.95,78.9);[...kids.children].forEach((k,i)=>{const p=eBack(seg(T,77.95+i*.07,78.3+i*.07));k.style.opacity=clamp(p*2);k.style.transform=`translateY(${(1-p)*30}px)`});
  reveal(kl,eOut(seg(T,78.8,79.3)),{dy:12});
  const kh=eIO(seg(T,79.5,79.9));kids.style.opacity=1-kh*.9;kl.style.opacity=clamp(seg(T,78.8,79.1))*(1-kh*.9);
  if(z>0){drawArc(FX,mo,lod,eIO(seg(T,80.0,80.9)),{lift:.28});drawPin(FX,mo[0],mo[1],seg(T,79.9,80.2),T,{rings:false})}
  place(mor,mo[0]-150,mo[1]+40);reveal(mor,eOut(seg(T,80.1,80.6)),{dy:12,wipe:'none'});
}};
