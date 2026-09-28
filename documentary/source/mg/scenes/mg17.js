// MG17 — "ב־2014 הוחזר אברג'יל לישראל כדי לרצות את יתרת עונשו. שנה אחר כך יצאה לדרך פרשה 512:"
// global 188.53 → 195.08
const S0=188.53;
const IL={lon:34.85,lat:31.8},LA={lon:-118.24,lat:34.05};
const CAM={lon:-42,lat:38,ax:960,ay:560,span:215};
let c1,ttl,sub,yr;
const SCENE={dur:6.55,fadeIn:.25,
build(){
  c1=el('div','chip','2014<small>הוחזר לישראל לרצות את יתרת העונש</small>');Object.assign(c1.style,{fontSize:'58px',fontFamily:'Oswald, Heebo'});
  sub=el('div','abs he','פרשה');Object.assign(sub.style,{left:0,right:0,top:'250px',textAlign:'center',fontWeight:800,fontSize:'70px',color:'#efe8da',letterSpacing:'10px'});
  ttl=el('div','abs os','512');Object.assign(ttl.style,{left:0,right:0,top:'330px',textAlign:'center',fontWeight:700,fontSize:'380px',lineHeight:'1',color:'#efe8da'});
  yr=el('div','abs os','2015');Object.assign(yr.style,{left:0,right:0,top:'760px',textAlign:'center',fontWeight:500,fontSize:'54px',color:'#e2372c',letterSpacing:'14px'});
},
update(t){const T=t+S0;
  const out=eIO(seg(T,192.3,192.8));
  const il=proj(CAM,IL.lon,IL.lat),la=proj(CAM,LA.lon,LA.lat);
  drawMap(BG,{...CAM,span:lerp(215,190,seg(T,188.5,192.8))},WORLD,{glowAt:[[il[0],il[1]]]});
  if(out>0){BG.fillStyle=`rgba(5,7,9,${out*.85})`;BG.fillRect(0,0,W,H)}
  FX.globalAlpha=1-out;drawPin(FX,la[0],la[1],seg(T,188.6,188.9),T,{rings:false});
  drawArc(FX,la,il,eIO(seg(T,188.8,190.6)),{lift:.22});drawPin(FX,il[0],il[1],seg(T,190.5,190.8),T);FX.globalAlpha=1;
  place(c1,il[0]-620,il[1]+60);reveal(c1,eOut(seg(T,189.2,189.7)),{dy:12,wipe:'none'});c1.style.opacity*=1-out;
  reveal(sub,eOut(seg(T,192.65,193.1)),{dy:20});
  const tp=seg(T,192.9,193.3);ttl.style.opacity=clamp(tp*3);ttl.style.transform=`scale(${lerp(1.6,1,eOut(tp))})`;ttl.style.filter=`blur(${(1-eOut(tp))*10}px)`;
  const sh=T>193.3&&T<193.6?Math.sin(T*90)*4*(1-seg(T,193.3,193.6)):0;ROOT.style.transform=`translate(${sh}px,${-sh}px)`;
  reveal(yr,eOut(seg(T,193.5,194)),{dy:12});
}};
