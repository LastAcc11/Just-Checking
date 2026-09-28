// MG14 — "לפי כתב האישום, רשת בינלאומית עסקה בייבוא אקסטזי, בהלבנת הון, בסחיטה ובאלימות. אחד האישומים המרכזיים עסק ברצח של אדם בשם סמי אטיאס."
// global 146.60 → 157.10
const S0=146.60;
const ITEMS=[['pill','ייבוא אקסטזי',148.4],['money','הלבנת הון',150.75],['threat','סחיטה',151.35],['fist','אלימות',151.9]];
let doc,rows=[],cd,tag,kick;
const SCENE={dur:10.5,fadeIn:.25,
build(){
  doc=el('div','abs',`<div style="width:760px;height:880px;background:linear-gradient(180deg,#e9e2d3,#d8cfbc);box-shadow:0 40px 100px rgba(0,0,0,.7);padding:60px 64px;direction:rtl;position:relative">
    <div class="os" style="text-align:center;font-size:22px;letter-spacing:4px;color:#5a5249">FEDERAL INDICTMENT · 2008</div>
    <div class="he" style="text-align:center;font-weight:900;font-size:54px;color:#211e1a;margin:8px 0 6px">כתב אישום פדרלי</div>
    <div class="he" style="text-align:center;font-size:24px;color:#5a5249;margin-bottom:40px">ארצות הברית · לפי כתב האישום</div>
    <div class="rows"></div>
    <div class="he" style="position:absolute;left:64px;right:64px;bottom:48px;font-size:20px;color:#6b6358;border-top:1px solid rgba(0,0,0,.2);padding-top:12px">טענות כתב האישום, לא הכרעת דין</div></div>`);place(doc,1060,100);
  const R=doc.querySelector('.rows');
  ITEMS.forEach(([ic,l])=>{const r=document.createElement('div');r.innerHTML=`<span style="display:inline-flex;align-items:center;gap:26px">${icon(ic,64,'#b8281f')}<span class="he" style="font-weight:900;font-size:56px;color:#211e1a">${l}</span></span>`;r.style.cssText='height:112px;border-bottom:1px dashed rgba(0,0,0,.18);display:flex;align-items:center';R.appendChild(r);rows.push(r)});
  kick=el('div','abs kicker','<span>אחד האישומים המרכזיים</span><i></i>');Object.assign(kick.style,{right:'1000px',top:'170px'});
  cd=card({name:'סמי אטיאס',role:'רצח',x:390,y:220,w:500,ph:470,sil:370});
},
update(t){const T=t+S0;
  const dp=eOut(seg(T,146.6,147.3));doc.style.opacity=dp;
  const sh=eIO(seg(T,152.5,153.3));
  doc.style.transform=`translate(${(1-dp)*80}px,0) rotate(${lerp(-1.5,-3,sh)}deg) scale(${lerp(1,.9,sh)})`;
  rows.forEach((r,i)=>{const p=eOut(seg(T,ITEMS[i][2]-.15,ITEMS[i][2]+.25));r.style.opacity=p;r.style.transform=`translateX(${(1-p)*-30}px)`});
  const kp=eOut(seg(T,152.7,153.2));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  reveal(cd,eOut(seg(T,153.0,153.6)),{dx:-40,dy:0,wipe:'none'});
  const nm=cd.querySelector('.nm');nm.style.opacity=clamp(seg(T,155.4,155.8));
  const rl=cd.querySelector('.rl');rl.style.color='#e2372c';rl.style.fontWeight=900;rl.style.fontSize='40px';rl.style.opacity=clamp(seg(T,154.3,154.7));
}};
