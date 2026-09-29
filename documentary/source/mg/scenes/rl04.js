// RL04 — חלופה לשוט AI-04: "…לאדם שבעבר ישב מול מצלמות הטלוויזיה והבטיח בפה מלא – שלא יחזור עוד לעולם הפשע."  global 34.60 → 42.18
const S0=34.60;
let a,b,ca,cb,kick;
function polaroid(src,x,y,w,h,rot){const d=el('div','abs',`<img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:grayscale(.3) contrast(1.08) brightness(.92)">`);
  Object.assign(d.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px',border:'10px solid #e6dfd0',borderBottomWidth:'10px',boxShadow:'0 30px 80px rgba(0,0,0,.7)',overflow:'hidden'});d._rot=rot;return d}
const SCENE={dur:7.58,fadeIn:.3,
build(){
  kick=el('div','abs kicker','<span>מתוך הריאיון ב״המעגל״</span><i></i>');Object.assign(kick.style,{right:'110px',top:'90px'});
  a=polaroid('photos/shilon_interview.jpg',1010,190,760,470,2.5);
  b=polaroid('photos/shilon_host.jpg',170,300,640,395,-3);
  ca=el('div','chip','יצחק אברג׳יל, בראיון אצל דן שילון<small>1994</small>');Object.assign(ca.style,{right:'150px',top:'740px',fontSize:'44px'});
  cb=el('div','chip','דן שילון, מגיש התוכנית');Object.assign(cb.style,{left:'170px',top:'740px',fontSize:'40px'});
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,34.7,35.2));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  const pa=eOut(seg(T,36.6,37.3));reveal(a,pa,{dy:40,wipe:'none'});a.style.transform+=` rotate(${a._rot}deg)`;
  const pb=eOut(seg(T,39.9,40.6));reveal(b,pb,{dy:40,wipe:'none'});b.style.transform+=` rotate(${b._rot}deg)`;
  reveal(ca,eOut(seg(T,37.4,37.9)),{dy:12,wipe:'none'});reveal(cb,eOut(seg(T,40.6,41.1)),{dy:12,wipe:'none'});
}};
