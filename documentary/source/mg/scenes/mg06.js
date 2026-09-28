// MG06 — "אחת הסיבות לטענתו - הייתה לנסות לפייס בין אשתו, שהייתה אז בהיריון, לבין הוריה."
// global 57.70 → 62.80
const S0=57.70;
let kick,ttl,wife,wl,preg,par,pl,heal;
const A=[1330,560],B=[590,560];
const SCENE={dur:5.1,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<span>לטענתו, בעדותו</span><i></i>');Object.assign(kick.style,{right:'160px',top:'120px'});
  ttl=el('div','abs he','הסיבה להופעה בטלוויזיה');Object.assign(ttl.style,{right:'160px',top:'160px',fontWeight:900,fontSize:'72px',color:'#efe8da'});
  wife=el('div','abs',person(170,'#9aa3ab'));place(wife,A[0]-85,A[1]-110);
  wl=el('div','abs he','אשתו');Object.assign(wl.style,{left:(A[0]-150)+'px',width:'300px',textAlign:'center',top:(A[1]+120)+'px',fontWeight:900,fontSize:'52px',color:'#efe8da'});
  preg=el('div','chip','בהיריון');Object.assign(preg.style,{left:(A[0]+70)+'px',top:(A[1]-150)+'px',fontSize:'32px'});
  par=el('div','abs',`<span style="display:inline-flex;gap:10px">${person(150,'#9aa3ab')}${person(150,'#9aa3ab')}</span>`);place(par,B[0]-155,B[1]-90);
  pl=el('div','abs he','הוריה');Object.assign(pl.style,{left:(B[0]-150)+'px',width:'300px',textAlign:'center',top:(B[1]+120)+'px',fontWeight:900,fontSize:'52px',color:'#efe8da'});
  heal=el('div','abs he','לפייס ביניהם');Object.assign(heal.style,{left:'760px',width:'400px',textAlign:'center',top:'470px',fontWeight:800,fontSize:'38px',color:'#e2372c'});
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,57.7,58.2));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*90)+'px';
  reveal(ttl,eOut(seg(T,57.8,58.4)),{dy:24});
  reveal(wife,eOut(seg(T,58.75,59.25)),{dy:30,wipe:'none'});reveal(wl,eOut(seg(T,58.9,59.4)),{dy:14});
  reveal(preg,eBack(seg(T,60.45,60.85)),{dy:10,wipe:'none',scale:.6});
  reveal(par,eOut(seg(T,62.0,62.5)),{dy:30,wipe:'none'});reveal(pl,eOut(seg(T,62.1,62.6)),{dy:14});
  // bridge line: two halves reaching toward each other
  const g=FX,y=A[1]+10,p1=eOut(seg(T,59.3,60.3)),p2=eOut(seg(T,62.2,62.9));
  const x1=A[0]-150,x2=B[0]+170,mid=(x1+x2)/2;
  g.save();g.strokeStyle='rgba(239,232,218,.25)';g.setLineDash([8,10]);g.lineWidth=3;g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.stroke();g.restore();
  g.save();g.strokeStyle='#e2372c';g.lineWidth=5;g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=14;
  g.beginPath();g.moveTo(x1,y);g.lineTo(lerp(x1,mid-18,p1),y);g.stroke();
  if(p2>0){g.beginPath();g.moveTo(x2,y);g.lineTo(lerp(x2,mid+18,p2),y);g.stroke()}g.restore();
  reveal(heal,eOut(seg(T,59.6,60.1)),{dy:10});
}};
