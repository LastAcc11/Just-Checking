// MG05b — חזרה לראיון: "ב־1994 ישב אסיר צעיר מול מצלמה ואמר: אני לא חוזר לפשע."
// global 302.85 → 308.35  (same CRT TV with green screen)
const S0=302.85;
const TV={x:470,y:130,w:980,h:760};
let tv,scr,yr,pr;
const SCENE={dur:5.5,fadeIn:.3,
build(){
  BGOPT.dots=false;BGOPT.light=[.5,.5];BGOPT.tint='#1a1612';
  tv=el('div','abs',`<div style="position:absolute;inset:0;border-radius:46px;background:linear-gradient(160deg,#3a342e,#1d1a17 60%,#141210);box-shadow:0 40px 120px rgba(0,0,0,.8)"></div><div style="position:absolute;left:44px;top:44px;width:760px;height:600px;border-radius:40px;background:#0b0b0b"></div><div style="position:absolute;right:40px;top:80px;width:120px;height:540px;border-radius:14px;background:linear-gradient(180deg,#2a2622,#1a1815)"></div>`);Object.assign(tv.style,{left:TV.x+'px',top:TV.y+'px',width:TV.w+'px',height:TV.h+'px'});
  scr=document.createElement('div');document.getElementById('stage').appendChild(scr);Object.assign(scr.style,{position:'absolute',left:(TV.x+70)+'px',top:(TV.y+70)+'px',width:'708px',height:'548px',borderRadius:'34px',background:'#00ff00'});
  yr=el('div','abs os','1994');Object.assign(yr.style,{left:(TV.x+40)+'px',top:(TV.y+TV.h+10)+'px',fontWeight:700,fontSize:'64px',color:'#efe8da'});
  pr=el('div','chip','ההבטחה: לא יחזור לפשע');Object.assign(pr.style,{right:(1920-TV.x-TV.w+30)+'px',top:(TV.y+TV.h-10)+'px',fontSize:'44px'});
},
update(t){const T=t+S0;
  const a=eOut(seg(T,302.9,303.5));tv.style.opacity=scr.style.opacity=a;
  const z=lerp(1,1.05,seg(T,302.85,308.35));tv.style.transform=scr.style.transform=`scale(${z})`;tv.style.transformOrigin=`${TV.w/2}px ${TV.h/2}px`;scr.style.transformOrigin=`${TV.w/2-70}px ${TV.h/2-70}px`;
  reveal(yr,eOut(seg(T,303.1,303.6)),{dy:12});
  reveal(pr,eOut(seg(T,306.85,307.3)),{dy:12,wipe:'none'});
}};
