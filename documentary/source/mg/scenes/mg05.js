// MG05 — CRT TV (green screen for the real 1994 "המעגל" footage) + topic list
// global 42.18 → 53.80 : "באולפן המעגל של דן שילון יושב אסיר צעיר בשם יצחק אברג'יל. הוא מדבר על לימודים, על פילוסופיה ועל התפכחות, ואומר לצופים שהעבר מאחוריו ושהוא לעולם לא יחזור לפשע."
const S0=42.18;
const TV={x:150,y:170,w:980,h:760};
let tv,scr,kick,title,sub,items=[],promise;
const TOP=[['לימודים',46.75],['פילוסופיה',47.95],['התפכחות',48.75]];
function tvHTML(){return `
<div style="position:absolute;inset:0;border-radius:46px;background:linear-gradient(160deg,#3a342e,#1d1a17 60%,#141210);box-shadow:0 40px 120px rgba(0,0,0,.8),inset 0 2px 0 rgba(255,255,255,.08)"></div>
<div style="position:absolute;left:44px;top:44px;width:760px;height:600px;border-radius:40px;background:#0b0b0b;box-shadow:inset 0 0 40px #000"></div>
<div class="screen" style="position:absolute;left:70px;top:70px;width:708px;height:548px;border-radius:34px;background:#00ff00"></div>
<div style="position:absolute;right:40px;top:80px;width:120px;height:540px;border-radius:14px;background:linear-gradient(180deg,#2a2622,#1a1815)">
  ${[0,1].map(i=>`<div style="margin:${i?40:40}px auto 0;width:74px;height:74px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#6b645c,#26221e);box-shadow:0 6px 14px rgba(0,0,0,.6)"><div style="width:8px;height:30px;background:#cfc6b4;margin:6px auto 0;border-radius:3px"></div></div>`).join('')}
  <div style="margin:60px auto 0;width:80px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${Array(24).fill('<i style="display:block;height:6px;background:#0d0c0b;border-radius:2px"></i>').join('')}</div>
  <div class="led" style="margin:40px auto 0;width:12px;height:12px;border-radius:50%;background:#e2372c;box-shadow:0 0 12px #e2372c"></div>
</div>
<div style="position:absolute;left:44px;bottom:40px;font-family:'Oswald';font-size:22px;letter-spacing:6px;color:#8d8479">TELEVISION · 1994</div>`}
const SCENE={dur:11.62,fadeIn:.3,
build(){
  BGOPT.dots=false;BGOPT.light=[.33,.5];BGOPT.tint='#1a1612';
  tv=el('div','abs',tvHTML());Object.assign(tv.style,{left:TV.x+'px',top:TV.y+'px',width:TV.w+'px',height:TV.h+'px'});
  // clean green screen ABOVE grain/vignette so it keys cleanly
  scr=document.createElement('div');document.getElementById('stage').appendChild(scr);
  Object.assign(scr.style,{position:'absolute',left:(TV.x+70)+'px',top:(TV.y+70)+'px',width:'708px',height:'548px',borderRadius:'34px',background:'#00ff00',transformOrigin:`${TV.w/2-70}px ${TV.h/2-70}px`});
  kick=el('div','abs kicker','<span>ארכיון · 1994</span><i></i>');Object.assign(kick.style,{right:'110px',top:'230px'});
  title=el('div','abs he','המעגל');Object.assign(title.style,{right:'110px',top:'270px',fontWeight:900,fontSize:'110px',color:'#efe8da',lineHeight:'1.05'});
  sub=el('div','abs he','עם דן שילון<br><span style="color:#9aa3ab;font-weight:400;font-size:32px">המרואיין: יצחק אברג׳יל, אסיר</span>');Object.assign(sub.style,{right:'110px',top:'400px',fontWeight:800,fontSize:'44px',color:'#efe8da',lineHeight:'1.35',textAlign:'right'});
  TOP.forEach(([w],i)=>{const e=el('div','abs he',`<span style="display:inline-block;width:14px;height:14px;background:#e2372c;margin-left:18px;transform:translateY(-4px) rotate(45deg)"></span>${w}`);Object.assign(e.style,{right:'110px',top:(560+i*66)+'px',fontWeight:800,fontSize:'44px',color:'#efe8da'});items.push(e)});
  promise=el('div','chip','ההבטחה: לא יחזור לפשע<small>כך אמר לצופים</small>');Object.assign(promise.style,{right:'110px',top:'790px',fontSize:'42px'});
},
update(t){
  const T=t+S0;
  const tp=eOut(seg(T,42.2,42.9));tv.style.opacity=tp;tv.style.transform=`translateY(${(1-tp)*40}px)`;scr.style.opacity=tp;scr.style.transform=tv.style.transform;
  const kp=eOut(seg(T,42.3,42.8));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*100)+'px';
  reveal(title,eOut(seg(T,42.4,43.0)),{dy:30});
  reveal(sub,eOut(seg(T,43.3,43.9)),{dy:20});
  items.forEach((e,i)=>{reveal(e,eOut(seg(T,TOP[i][1],TOP[i][1]+.4)),{dx:-30,dy:0,wipe:'none'});
    e.style.color=T>49.7?'#9aa3ab':'#efe8da'});
  reveal(promise,eOut(seg(T,51.4,51.9)),{dy:16,wipe:'none'});
  tv.querySelector('.led').style.opacity=.6+.4*Math.sin(T*6);
}};
