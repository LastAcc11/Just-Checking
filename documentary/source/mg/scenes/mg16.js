// MG16 — "האסיר שהבטיח בטלוויזיה שלא יחזור לפשע, הודה עכשיו מול שופט אמריקאי בחלקו ברצח."
// global 182.23 → 188.30  (right: 1994 TV with green screen, left: 2012 court)
const S0=182.23;
let tv,scr,l1,l2,gav,div,l1s,l2s,ph2;
const SCENE={dur:6.07,fadeIn:.25,
build(){
  BGOPT.dots=false;
  tv=el('div','abs',`<div style="position:absolute;inset:0;border-radius:36px;background:linear-gradient(160deg,#3a342e,#1d1a17 60%,#141210);box-shadow:0 30px 90px rgba(0,0,0,.8)"></div><div style="position:absolute;left:34px;top:34px;width:560px;height:440px;border-radius:30px;background:#0b0b0b"></div>`);Object.assign(tv.style,{left:'1120px',top:'200px',width:'640px',height:'520px'});
  scr=document.createElement('div');document.getElementById('stage').appendChild(scr);Object.assign(scr.style,{position:'absolute',left:'1174px',top:'254px',width:'532px',height:'412px',borderRadius:'26px',background:'#00ff00'});
  l1=el('div','abs os','1994');Object.assign(l1.style,{left:'1120px',width:'640px',textAlign:'center',top:'760px',fontWeight:700,fontSize:'84px',color:'#efe8da'});
  l1s=el('div','abs he','הבטיח בטלוויזיה: לא יחזור לפשע');Object.assign(l1s.style,{left:'1070px',width:'740px',textAlign:'center',top:'870px',fontWeight:800,fontSize:'38px',color:'#9aa3ab'});
  div=el('div','abs','');Object.assign(div.style,{left:'958px',top:'160px',width:'4px',height:'780px',background:'linear-gradient(180deg,transparent,#e2372c,transparent)'});
  ph2=el('div','abs','<img src="photos/yitzhak_after_plea.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 25%;filter:grayscale(.5) contrast(1.1) brightness(.92)">');Object.assign(ph2.style,{left:'250px',top:'190px',width:'460px',height:'530px',overflow:'hidden',border:'1px solid rgba(239,232,218,.3)',boxShadow:'0 30px 80px rgba(0,0,0,.7)'});
  gav=el('div','abs',icon('gavel',150,'#efe8da'));place(gav,650,150);
  l2=el('div','abs os','2012');Object.assign(l2.style,{left:'160px',width:'640px',textAlign:'center',top:'760px',fontWeight:700,fontSize:'84px',color:'#e2372c'});
  l2s=el('div','abs he','הודה מול שופט אמריקאי בחלקו ברצח');Object.assign(l2s.style,{left:'110px',width:'740px',textAlign:'center',top:'870px',fontWeight:800,fontSize:'38px',color:'#efe8da'});
},
update(t){const T=t+S0;
  const a=eOut(seg(T,182.25,182.9));tv.style.opacity=a;scr.style.opacity=a;tv.style.transform=scr.style.transform=`translateY(${(1-a)*30}px)`;
  reveal(l1,eOut(seg(T,182.5,183)),{dy:14});reveal(l1s,eOut(seg(T,183.1,183.6)),{dy:12});
  div.style.transform=`scaleY(${eOut(seg(T,184.4,185.1))})`;
  reveal(ph2,eOut(seg(T,185.2,185.8)),{dy:24,wipe:'none'});
  const gp=seg(T,185.7,186.2);gav.style.opacity=clamp(gp*3);gav.style.transform=`rotate(${lerp(-30,6,eIn(gp))-(gp>=1?6*eOut(seg(T,185.9,186.3)):0)}deg)`;gav.style.transformOrigin='80% 90%';
  reveal(l2,eOut(seg(T,185.5,186)),{dy:14});reveal(l2s,eOut(seg(T,186.2,186.7)),{dy:12});
}};
