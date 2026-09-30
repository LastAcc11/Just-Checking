// MG13 — "בזמן שבישראל התיק עמד במקום, ברשויות בארצות הברית התחילו להתעניין באותו שם. ב־2008 הוגש שם כתב אישום פדרלי."
// global 137.62 → 146.50
const S0=137.62;
const IL={lon:34.85,lat:31.8},LA={lon:-118.24,lat:34.05};
const V1={lon:IL.lon,lat:IL.lat,ax:1180,ay:560,span:26},V2={lon:-42,lat:38,ax:960,ay:560,span:215},V3={lon:LA.lon,lat:LA.lat,ax:760,ay:560,span:60};
let c1,c2,c3;
const SCENE={dur:8.88,fadeIn:.3,
build(){
  c1=el('div','chip','ישראל<small>התיק עומד במקום</small>');c1.style.fontSize='50px';
  c2=el('div','chip','ארצות הברית<small>הרשויות מתחילות להתעניין</small>');c2.style.fontSize='50px';
  c3=el('div','chip','2008<small>כתב אישום פדרלי</small>');Object.assign(c3.style,{fontSize:'64px',fontFamily:"Oswald, Heebo"});
},
update(t){const T=t+S0;
  const z1=eIO(seg(T,139.8,141.6)),z2=eIO(seg(T,143.3,144.6));
  const cam=T<143.3?camLerp(V1,V2,z1):camLerp(V2,V3,z2);
  const il=proj(cam,IL.lon,IL.lat),la=proj(cam,LA.lon,LA.lat);
  drawMap(BG,cam,WORLD,{glowAt:[[il[0],il[1],1-z2*.5],[la[0],la[1],z1]]});
  drawPin(FX,il[0],il[1],seg(T,137.7,138.1),T);
  place(c1,il[0]+40,il[1]-160);reveal(c1,eOut(seg(T,138.0,138.5)),{dx:-20,dy:0,wipe:'none'});c1.style.opacity*=1-z1;
  // pause icon on Israel
  if(z1<1){const a=clamp(seg(T,138.4,138.8))*(1-z1);FX.fillStyle=`rgba(239,232,218,${a})`;FX.fillRect(il[0]-150,il[1]+40,14,44);FX.fillRect(il[0]-128,il[1]+40,14,44)}
  const ap=eIO(seg(T,140.4,142.3));
  if(ap>0){drawArc(FX,il,la,ap,{lift:.22,dash:[14,10]});}
  drawPin(FX,la[0],la[1],seg(T,142.1,142.5),T);
  place(c2,la[0]+40,la[1]-160);reveal(c2,eOut(seg(T,142.3,142.8)),{dx:-20,dy:0,wipe:'none'});c2.style.opacity*=1-eIO(seg(T,143.4,143.8));
  place(c3,la[0]+50,la[1]-190);reveal(c3,eBack(seg(T,143.9,144.4)),{dy:14,wipe:'none',scale:.7});
}};
