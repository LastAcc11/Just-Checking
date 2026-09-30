// MG15 — "החקירה שקדמה למעצר נמשכה שנים, ולפי הדיווחים השתתפו בה רשויות מיותר מעשר מדינות."
// global 160.80 → 168.00
const S0=160.80;
const IL={lon:34.85,lat:31.8};
const CAM={lon:20,lat:30,ax:960,ay:600,span:210};
let num,lab,kick,yrs;
const N=11;const R=rng(5);const NODES=[...Array(N)].map((_,i)=>{const a=-Math.PI*.95+i*(Math.PI*1.9/(N-1));return[Math.cos(a)*(520+R()*140),Math.sin(a)*(250+R()*90)-40]});
const SCENE={dur:7.2,fadeIn:.3,
build(){
  kick=el('div','abs kicker','<i></i><span>החקירה</span><i></i>');Object.assign(kick.style,{left:0,right:0,top:'110px',justifyContent:'center',fontSize:'30px'});
  yrs=el('div','abs he','נמשכה שנים');Object.assign(yrs.style,{left:0,right:0,top:'150px',textAlign:'center',fontWeight:900,fontSize:'70px',color:'#efe8da'});
  num=el('div','abs os','0');Object.assign(num.style,{left:0,right:0,top:'780px',textAlign:'center',fontWeight:700,fontSize:'150px',lineHeight:'1',color:'#efe8da'});
  lab=el('div','abs he','מדינות השתתפו, לפי הדיווחים');Object.assign(lab.style,{left:0,right:0,top:'945px',textAlign:'center',fontWeight:800,fontSize:'38px',color:'#9aa3ab'});
},
update(t){const T=t+S0;
  const cam={...CAM,span:lerp(210,190,seg(T,160.8,168))};
  const il=proj(cam,IL.lon,IL.lat);
  drawMap(BG,cam,WORLD,{glowAt:[[il[0],il[1]]],glowR:700});
  BG.fillStyle='rgba(5,7,9,.45)';BG.fillRect(0,0,W,H);
  const kp=eOut(seg(T,160.85,161.3));kick.style.opacity=kp;kick.querySelectorAll('i').forEach(i=>i.style.width=(kp*80)+'px');
  reveal(yrs,eOut(seg(T,161.0,161.6)),{dy:18});yrs.style.opacity*=1-eIO(seg(T,163.6,164.0));
  // clock sweep around Israel during "נמשכה שנים"
  const cp=seg(T,161.2,163.8);if(cp>0&&cp<1||T<164.2){const a=clamp(seg(T,161.2,161.5))*(1-eIO(seg(T,163.7,164.1)));FX.save();FX.globalAlpha=a;FX.strokeStyle='rgba(239,232,218,.6)';FX.lineWidth=3;FX.beginPath();FX.arc(il[0],il[1],70,-Math.PI/2,-Math.PI/2+cp*Math.PI*6);FX.stroke();FX.restore()}
  drawPin(FX,il[0],il[1],seg(T,160.9,161.3),T);
  let n=0;NODES.forEach(([dx,dy],i)=>{const st=164.1+i*.26,p=seg(T,st,st+.35);if(p<=0)return;n=i+1;
    const x=il[0]+dx,y=il[1]+dy;const lp=eOut(p);
    FX.save();FX.strokeStyle='rgba(226,55,44,.55)';FX.lineWidth=2;FX.setLineDash([6,8]);FX.beginPath();FX.moveTo(il[0],il[1]);FX.lineTo(lerp(il[0],x,lp),lerp(il[1],y,lp));FX.stroke();FX.restore();
    if(p>=.6){FX.beginPath();FX.arc(x,y,9*eBack(seg(T,st+.2,st+.45)),0,7);FX.fillStyle='#efe8da';FX.fill();FX.beginPath();FX.arc(x,y,16,0,7);FX.strokeStyle='rgba(239,232,218,.3)';FX.lineWidth=2;FX.stroke()}});
  num.textContent=n>10?'10+':String(n);num.style.opacity=clamp(seg(T,164.0,164.3));num.style.color=n>10?'#e2372c':'#efe8da';
  reveal(lab,eOut(seg(T,164.4,164.9)),{dy:10});
  // abstract network note
  if(!SCENE._n){SCENE._n=el('div','src','איור להמחשה: המדינות אינן מסומנות במיקומן');}
  SCENE._n.style.opacity=clamp(seg(T,164.4,164.9))*.9;
}};
