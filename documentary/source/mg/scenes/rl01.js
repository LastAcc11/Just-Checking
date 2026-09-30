// RL01 — צילומי ארכיון מהזירה: "מטען נפץ מתפוצץ בלב העיר. עשרות אנשים נפצעים,"
// global 9.22 → 11.90
const S0=9.22;
let p1,p2,kick,c1,c2,src;
function photo(srcf){const d=el('div','abs','');Object.assign(d.style,{inset:'0',overflow:'hidden'});
  d.innerHTML=`<img src="${srcf}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(.35) contrast(1.15) brightness(.85) sepia(.12)">`;return d}
const SCENE={dur:2.68,fadeIn:.08,
build(){
  p1=photo('photos/scene_14.jpg');p2=photo('photos/scene_20_top.jpg');
  const shade=el('div','abs','');Object.assign(shade.style,{inset:0,background:'linear-gradient(0deg,rgba(5,7,9,.85),rgba(5,7,9,0) 45%),linear-gradient(90deg,rgba(5,7,9,.0),rgba(5,7,9,.35))'});
  kick=el('div','abs kicker','<span>ארכיון · 11.12.2003</span><i></i>');Object.assign(kick.style,{right:'110px',top:'90px',fontSize:'28px'});
  c1=el('div','chip','יהודה הלוי, תל אביב');Object.assign(c1.style,{right:'110px',bottom:'130px',fontSize:'52px'});
  c2=el('div','chip','עשרות פצועים');Object.assign(c2.style,{right:'110px',bottom:'130px',fontSize:'52px'});
  src=el('div','src','צילום ארכיון');
},
update(t){const T=t+S0;
  const sw=T>=10.62;p1.style.opacity=sw?0:1;p2.style.opacity=sw?1:0;
  p1.style.transform=`scale(${lerp(1.12,1.2,seg(T,9.22,10.62))}) translate(${lerp(0,-30,seg(T,9.22,10.62))}px,0)`;
  p2.style.transform=`scale(${lerp(1.08,1.16,seg(T,10.62,11.9))}) translate(${lerp(20,-10,seg(T,10.62,11.9))}px,0)`;
  // white flash at the start, echoing the blast
  const fl=1-eOut(seg(T,9.22,9.5));if(fl>0){FX.fillStyle=`rgba(255,244,230,${fl*.9})`;FX.fillRect(0,0,W,H)}
  const kp=eOut(seg(T,9.3,9.7));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  reveal(c1,eOut(seg(T,9.4,9.8)),{dx:30,dy:0,wipe:'none'});c1.style.opacity*=sw?0:1;
  reveal(c2,eOut(seg(T,11.0,11.3)),{dx:30,dy:0,wipe:'none'});
  src.style.opacity=.8;
}};
