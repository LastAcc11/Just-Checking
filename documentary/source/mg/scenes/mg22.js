// MG22 — "לפי הדיווחים לטיפול שיניים, ויצא מהארץ. ב־2019 הוא נעצר במרוקו וריצה שם שלוש שנות מאסר על עבירות זיוף ומרמה. באוגוסט 2022 גורש לישראל ונעצר ברגע שנחת."
// global 229.70 → 242.10
const S0=229.70;
const IL={lon:34.87,lat:32.0},MOR={lon:-6.8,lat:34.0};
const V1={lon:IL.lon,lat:IL.lat,ax:1250,ay:560,span:22},V2={lon:14,lat:33.5,ax:960,ay:600,span:58};
let c1,c2,c3,c4,c5,unk,av;
const SCENE={dur:12.4,fadeIn:.25,
build(){
  c1=el('div','chip','אוקטובר 2018<small>לפי הדיווחים: יציאה לטיפול שיניים</small>');c1.style.fontSize='46px';
  unk=el('div','abs he','?');Object.assign(unk.style,{fontWeight:900,fontSize:'90px',color:'#e2372c',width:'80px',textAlign:'center'});
  c2=el('div','abs he','המסלול המדויק לא הוכרע');Object.assign(c2.style,{fontWeight:400,fontSize:'28px',color:'#9aa3ab',width:'420px',textAlign:'center'});
  c3=el('div','chip','2019 · נעצר במרוקו<small>3 שנות מאסר: זיוף ומרמה</small>');c3.style.fontSize='46px';
  c4=el('div','chip','אוגוסט 2022<small>גורש לישראל</small>');c4.style.fontSize='46px';
  av=el('div','abs','<img src="photos/avitan.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:grayscale(.3)">');Object.assign(av.style,{width:'104px',height:'104px',borderRadius:'50%',overflow:'hidden',border:'4px solid #efe8da',boxShadow:'0 10px 30px rgba(0,0,0,.7),0 0 0 6px rgba(226,55,44,.35)'});
  c5=el('div','stamp','נעצר בנחיתה');c5.style.fontSize='64px';
},
update(t){const T=t+S0;
  const z=eIO(seg(T,231.5,233.0));const cam=camLerp(V1,V2,z);
  const il=proj(cam,IL.lon,IL.lat),mo=proj(cam,MOR.lon,MOR.lat);
  drawMap(BG,cam,WORLD,{glowAt:[[il[0],il[1]],[mo[0],mo[1],clamp(seg(T,233,234))]]});
  drawPin(FX,il[0],il[1],seg(T,229.75,230.1),T);
  place(c1,il[0]+40,il[1]-170);reveal(c1,eOut(seg(T,229.8,230.3)),{dx:-20,dy:0,wipe:'none'});c1.style.opacity*=1-eIO(seg(T,233,233.5));
  // unknown route (dashed)
  const pm=drawArc(FX,il,mo,eIO(seg(T,231.8,233.2)),{lift:.3,dash:[10,12],width:3,head:false});
  const mid=[(il[0]+mo[0])/2,(il[1]+mo[1])/2-Math.hypot(il[0]-mo[0],il[1]-mo[1])*.15];
  place(unk,mid[0]-40,mid[1]-120);reveal(unk,eBack(seg(T,232.6,233.0)),{dy:10,wipe:'none',scale:.5});unk.style.opacity*=1-eIO(seg(T,238.4,238.8));
  place(c2,mid[0]-210,mid[1]-20);reveal(c2,eOut(seg(T,232.9,233.3)),{dy:8});c2.style.opacity*=1-eIO(seg(T,238.4,238.8));
  drawPin(FX,mo[0],mo[1],seg(T,233.25,233.6),T);
  place(c3,mo[0]-120,mo[1]+60);reveal(c3,eOut(seg(T,233.3,233.8)),{dy:12,wipe:'none'});
  const sub=c3.querySelector('small');sub.style.opacity=clamp(seg(T,235.2,235.6));
  // deportation back (solid, lower arc)
  let pm2=null;if(T>238.6){pm2=drawArc(FX,mo,il,eIO(seg(T,238.65,240.3)),{lift:-.12,width:4})}
  let ap=il;if(T>231.8)ap=pm||il;if(T>233.3)ap=mo;if(T>238.65)ap=pm2||mo;
  place(av,ap[0]-52,ap[1]-150);av.style.opacity=clamp(seg(T,229.9,230.3))*(1-eIO(seg(T,241.0,241.6)));
  place(c4,il[0]-470,il[1]+60);reveal(c4,eOut(seg(T,238.8,239.3)),{dy:12,wipe:'none'});
  place(c5,il[0]-520,il[1]+200);slam(c5,seg(T,240.6,240.95),-6);
}};
