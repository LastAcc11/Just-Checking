// MG12 — "התקשורת כינתה אותו 'הפיגוע הפלילי': לא טרור אידיאולוגי, אלא חיסול בעולם התחתון שעלה בחיי אזרחים."
// global 129.28 → 137.50
const S0=129.28;
let kick,q,r1,r2,r3,dots=[];
const SCENE={dur:8.22,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<i></i><span>הכינוי בתקשורת</span><i></i>');Object.assign(kick.style,{left:0,right:0,top:'170px',justifyContent:'center',fontSize:'30px'});
  q=el('div','abs serif','״הפיגוע הפלילי״');Object.assign(q.style,{left:0,right:0,top:'220px',textAlign:'center',fontWeight:900,fontSize:'170px',color:'#efe8da'});
  r1=iconRow('cross','טרור אידיאולוגי',{size:60,font:60,color:'#9aa3ab',ic:'#9aa3ab'});place(r1,0,560);Object.assign(r1.style,{left:0,right:0,textAlign:'center'});
  r2=iconRow('check','חיסול בעולם התחתון',{size:60,font:64});Object.assign(r2.style,{left:0,right:0,top:'660px',textAlign:'center'});
  r3=el('div','abs he','שעלה בחיי שלושה אזרחים');Object.assign(r3.style,{left:0,right:0,top:'770px',textAlign:'center',fontWeight:400,fontSize:'44px',color:'#efe8da'});
  for(let i=0;i<3;i++){const d=el('div','abs','');Object.assign(d.style,{width:'18px',height:'18px',borderRadius:'50%',background:'#e2372c',boxShadow:'0 0 16px #e2372c',left:(930+i*40-10)+'px',top:'850px'});dots.push(d)}
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,129.3,129.8));kick.style.opacity=kp;kick.querySelectorAll('i').forEach(i=>i.style.width=(kp*90)+'px');
  const qp=eOut(seg(T,129.7,130.5));q.style.opacity=qp;q.style.letterSpacing=lerp(30,0,qp)+'px';q.style.filter=`blur(${(1-qp)*8}px)`;
  const up=eIO(seg(T,131.6,132.2));q.style.transform=`translateY(${-up*40}px) scale(${lerp(1,.8,up)})`;
  reveal(r1,eOut(seg(T,131.95,132.4)),{dy:12,wipe:'none'});
  const s=eOut(seg(T,133.0,133.5));r1.style.textDecoration=s>.3?'line-through':'none';r1.style.textDecorationColor='#e2372c';r1.style.textDecorationThickness='6px';r1.style.opacity=clamp(seg(T,131.95,132.3))*lerp(1,.6,s);
  reveal(r2,eOut(seg(T,134.05,134.5)),{dy:12,wipe:'none'});
  reveal(r3,eOut(seg(T,135.8,136.3)),{dy:10});
  dots.forEach((d,i)=>{const p=eBack(seg(T,136.4+i*.15,136.7+i*.15));d.style.opacity=clamp(p);d.style.transform=`scale(${p})`});
}};
