// MG24 — "והוא מורשע ברצח של נפתלי מגד, רחמים צרויה ומשה מזרחי. הוא לא הפעיל את המטען, אבל בית המשפט קבע שהוא עמד בראש הארגון שעמד מאחורי הפיצוץ, ולכן הוא אחראי למותם."
// global 254.83 → 267.05
const S0=254.83;
const N=[['נפתלי מגד',255.6],['רחמים צרויה',257.2],['משה מזרחי',258.1]];
const NODES={A:[1560,300],O:[960,300],B:[360,300]};
let kick,names=[],a,o,b,la,lo,lb,no,resp;
const SCENE={dur:12.22,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<i></i><span>מורשע ברצח</span><i></i>');Object.assign(kick.style,{left:0,right:0,top:'640px',justifyContent:'center',fontSize:'30px'});
  N.forEach(([n],i)=>{const e=el('div','abs he',n);Object.assign(e.style,{left:(1300-i*470)+'px',width:'440px',textAlign:'center',top:'700px',fontWeight:900,fontSize:'62px',color:'#efe8da'});names.push(e)});
  const mk=(ic,l)=>{const e=el('div','abs',`<div style="width:260px;text-align:center">${icon(ic,120,'#efe8da')}<div class="he" style="font-weight:900;font-size:40px;color:#efe8da;margin-top:14px">${l}</div></div>`);return e};
  a=el('div','abs',`<div style="width:260px;text-align:center">${person(120,'#efe8da')}<div class="he" style="font-weight:900;font-size:40px;color:#efe8da;margin-top:10px">יצחק אברג׳יל</div></div>`);place(a,NODES.A[0]-130,NODES.A[1]-100);
  o=el('div','abs',`<div style="width:300px;text-align:center"><div style="display:inline-flex;gap:4px;align-items:flex-end">${person(50,'#9aa3ab')}${person(70,'#9aa3ab')}${person(50,'#9aa3ab')}</div><div class="he" style="font-weight:900;font-size:40px;color:#efe8da;margin-top:24px">הארגון</div></div>`);place(o,NODES.O[0]-150,NODES.O[1]-80);
  b=mk('bomb','המטען');place(b,NODES.B[0]-130,NODES.B[1]-100);
  no=el('div','abs he','✕ לא הפעיל את המטען');Object.assign(no.style,{left:'560px',width:'800px',textAlign:'center',top:'110px',fontWeight:800,fontSize:'40px',color:'#9aa3ab'});
  resp=el('div','stamp','אחראי למותם');place(resp,700,860);resp.style.fontSize='70px';
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,254.85,255.3));kick.style.opacity=kp;kick.querySelectorAll('i').forEach(i=>i.style.width=(kp*80)+'px');
  names.forEach((e,i)=>reveal(e,eOut(seg(T,N[i][1],N[i][1]+.45)),{dy:20}));
  reveal(a,eOut(seg(T,258.9,259.3)),{dy:16,wipe:'none'});reveal(b,eOut(seg(T,259.1,259.5)),{dy:16,wipe:'none'});
  // direct link A->B crossed out
  const g=FX,y=NODES.A[1]-150,dp=eOut(seg(T,259.2,259.8));
  if(dp>0){g.save();g.strokeStyle='rgba(239,232,218,.35)';g.setLineDash([10,10]);g.lineWidth=3;g.beginPath();g.moveTo(NODES.A[0],y);g.quadraticCurveTo(960,y-60,lerp(NODES.A[0],NODES.B[0],dp),y);g.stroke();g.restore()}
  reveal(no,eOut(seg(T,259.5,259.9)),{dy:10});no.style.opacity*=1-.5*eIO(seg(T,261,261.5));
  // chain through organisation
  reveal(o,eOut(seg(T,261.6,262.1)),{dy:16,wipe:'none'});
  const c1=eIO(seg(T,261.0,262.0)),c2=eIO(seg(T,263.2,264.4));
  g.save();g.strokeStyle='#e2372c';g.lineWidth=6;g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=16;
  if(c1>0){g.beginPath();g.moveTo(NODES.A[0]-140,NODES.A[1]);g.lineTo(lerp(NODES.A[0]-140,NODES.O[0]+160,c1),NODES.O[1]);g.stroke()}
  if(c2>0){g.beginPath();g.moveTo(NODES.O[0]-160,NODES.O[1]);g.lineTo(lerp(NODES.O[0]-160,NODES.B[0]+140,c2),NODES.B[1]);g.stroke()}
  // chain down to names
  const c3=eIO(seg(T,265.6,266.4));
  if(c3>0){[1300,830,360].forEach(x=>{g.beginPath();g.moveTo(NODES.B[0]+20,NODES.B[1]+110);g.lineTo(lerp(NODES.B[0]+20,x+220,c3),lerp(NODES.B[1]+110,690,c3));g.stroke()})}
  g.restore();
  if(!SCENE._l){SCENE._l=[el('div','abs he','עמד בראש'),el('div','abs he','עמד מאחורי הפיצוץ')];SCENE._l.forEach((e,i)=>Object.assign(e.style,{left:(i?520:1140)+'px',width:'320px',textAlign:'center',top:'340px',fontWeight:800,fontSize:'30px',color:'#e2372c'}))}
  reveal(SCENE._l[0],eOut(seg(T,261.4,261.8)),{dy:8});reveal(SCENE._l[1],eOut(seg(T,263.6,264)),{dy:8});
  slam(resp,seg(T,265.7,266.05),-4);
  names.forEach(e=>e.style.color=T>266?'#e2372c':'#efe8da');
}};
