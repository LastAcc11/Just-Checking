// MG11 — "אחד מעדי המדינה העיד שאברג'יל דיבר איתו על רצון להרוג את רוזנשטיין ולהשתלט על בתי הקזינו שלו."
// global 116.48 → 122.80
const S0=116.48;
let kick,cA,cR,l1,l2,chips=[];
const SCENE={dur:6.32,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<i></i><span>לפי עדות של עד מדינה</span><i></i>');Object.assign(kick.style,{left:0,right:0,top:'80px',justifyContent:'center',fontSize:'30px'});
  cA=card({name:'יצחק אברג׳יל',role:'',x:1260,y:190,w:440,ph:470,sil:360,img:'photos/abergil_card.jpg'});
  cR=card({name:'זאב רוזנשטיין',role:'',x:220,y:190,w:440,ph:470,sil:360});
  l1=el('div','abs he','רצון להרוג');Object.assign(l1.style,{left:'700px',width:'520px',textAlign:'center',top:'330px',fontWeight:900,fontSize:'56px',color:'#e2372c'});
  l2=el('div','abs he','ולהשתלט על בתי הקזינו');Object.assign(l2.style,{left:'700px',width:'520px',textAlign:'center',top:'610px',fontWeight:800,fontSize:'44px',color:'#efe8da'});
  for(let i=0;i<5;i++){const c=el('div','abs',icon('chip',54,i%2?'#e2372c':'#efe8da'));chips.push(c)}
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,116.5,117.0));kick.style.opacity=kp;kick.querySelectorAll('i').forEach(i=>i.style.width=(kp*90)+'px');
  reveal(cA,eOut(seg(T,117.3,117.8)),{dx:40,dy:0,wipe:'none'});
  reveal(cR,eOut(seg(T,119.3,119.8)),{dx:-40,dy:0,wipe:'none'});
  // arrow A -> R
  const g=FX,p=eIO(seg(T,119.4,120.2)),y=450,x0=1240,x1=690;
  if(p>0){g.save();g.strokeStyle='#e2372c';g.lineWidth=6;g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=16;const xe=lerp(x0,x1,p);
    g.beginPath();g.moveTo(x0,y);g.lineTo(xe,y);g.stroke();g.beginPath();g.moveTo(xe+26,y-18);g.lineTo(xe,y);g.lineTo(xe+26,y+18);g.stroke();g.restore()}
  reveal(l1,eOut(seg(T,119.8,120.3)),{dy:14});
  reveal(l2,eOut(seg(T,121.2,121.7)),{dy:14});
  chips.forEach((c,i)=>{const q=eIO(seg(T,121.3+i*.15,122.3+i*.15));const x=lerp(560,1380,q),yy=720+Math.sin(q*Math.PI)*-60+i*6;place(c,x-27,yy);c.style.opacity=q>0&&q<1?1:q>=1?.9:0})
}};
