// MG27 — "יותר משלושים שנה אחר כך, מה שנשאר מהסיפור הזה הוא לא הראיון ולא גודל הארגון. מה שנשאר הם שלושה שמות: נפתלי מגד, רחמים צרויה ומשה מזרחי."
// global 308.45 → 318.85
const S0=308.45;
let yrs,yl,i1,i2,names=[];
const N=[['נפתלי מגד',315.33],['רחמים צרויה',316.5],['משה מזרחי',317.75]];
const SCENE={dur:10.4,fadeIn:.3,
build(){
  BGOPT.dots=false;
  yrs=el('div','abs os','30+');Object.assign(yrs.style,{left:0,right:0,top:'300px',textAlign:'center',fontWeight:700,fontSize:'240px',lineHeight:'1',color:'#efe8da'});
  yl=el('div','abs he','שנה אחר כך');Object.assign(yl.style,{left:0,right:0,top:'560px',textAlign:'center',fontWeight:800,fontSize:'50px',color:'#9aa3ab'});
  i1=el('div','abs',`<div style="text-align:center">${icon('tv',170,'#9aa3ab')}<div class="he" style="font-weight:800;font-size:40px;color:#9aa3ab;margin-top:10px">לא הראיון</div></div>`);place(i1,1060,360);
  i2=el('div','abs',`<div style="text-align:center"><div style="display:inline-flex;gap:4px;align-items:flex-end">${person(60,'#9aa3ab')}${person(90,'#9aa3ab')}${person(60,'#9aa3ab')}</div><div class="he" style="font-weight:800;font-size:40px;color:#9aa3ab;margin-top:22px">ולא גודל הארגון</div></div>`);place(i2,600,370);
  N.forEach(([n],i)=>{const e=el('div','abs serif',n);Object.assign(e.style,{left:0,right:0,top:(260+i*190)+'px',textAlign:'center',fontWeight:900,fontSize:'120px',color:'#efe8da'});names.push(e)});
},
update(t){const T=t+S0;
  const y=Math.round(lerp(0,30,eOut(seg(T,308.5,309.7))));yrs.textContent=y>=30?'30+':y;
  const out1=eIO(seg(T,309.9,310.3));yrs.style.opacity=clamp(seg(T,308.5,308.7))*(1-out1);yl.style.opacity=clamp(seg(T,308.9,309.2))*(1-out1);
  reveal(i1,eOut(seg(T,311.3,311.7)),{dy:20,wipe:'none'});reveal(i2,eOut(seg(T,312.3,312.7)),{dy:20,wipe:'none'});
  const out2=eIO(seg(T,313.3,313.9));i1.style.opacity*=1-out2;i2.style.opacity*=1-out2;
  // cross out
  [[i1,311.9],[i2,312.9]].forEach(([e,s])=>{e.style.filter=T>s?'grayscale(1) brightness(.7)':'none'});
  names.forEach((e,i)=>{const p=eOut(seg(T,N[i][1],N[i][1]+1.0));e.style.opacity=p;e.style.filter=`blur(${(1-p)*10}px)`;e.style.transform=`translateY(${(1-p)*10}px)`});
}};
