// MG23 — "אחרי שש שנות משפט ופסק דין של יותר מ־800 עמודים, יצחק אברג'יל מורשע בעמידה בראש ארגון פשיעה ובעבירות סמים."
// global 246.45 → 254.75
const S0=246.45;
let kick,cnt,cl,v1,v2,hd;
const SCENE={dur:8.3,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<span>נובמבר 2021 · בית המשפט המחוזי בתל אביב</span><i></i>');Object.assign(kick.style,{right:'130px',top:'120px'});
  cnt=el('div','abs os','0');Object.assign(cnt.style,{left:'230px',width:'560px',textAlign:'center',top:'650px',fontWeight:700,fontSize:'150px',lineHeight:'1',color:'#efe8da'});
  cl=el('div','abs he','עמודים בהכרעת הדין');Object.assign(cl.style,{left:'230px',width:'560px',textAlign:'center',top:'810px',fontWeight:800,fontSize:'38px',color:'#9aa3ab'});
  hd=el('div','abs he','מורשע');Object.assign(hd.style,{right:'130px',top:'250px',fontWeight:900,fontSize:'110px',color:'#e2372c'});
  v1=iconRow('check','עמידה בראש ארגון פשיעה',{size:58,font:54});Object.assign(v1.style,{right:'130px',top:'420px'});
  v2=iconRow('check','עבירות סמים',{size:58,font:54});Object.assign(v2.style,{right:'130px',top:'520px'});
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,246.5,247));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  // page stack
  const n=Math.round(820*eOut(seg(T,247.6,250.0)));cnt.textContent=n>=800?'800+':n;cnt.style.opacity=clamp(seg(T,247.5,247.8));
  reveal(cl,eOut(seg(T,248,248.5)),{dy:10});
  const pages=Math.floor(clamp(seg(T,247.6,250.0))*28);
  for(let i=0;i<pages;i++){const y=600-i*12,x=510+Math.sin(i*1.7)*10;FX.save();FX.translate(x,y);FX.rotate(Math.sin(i*2.3)*.03);
    FX.fillStyle=i%2?'#ddd4c1':'#e9e2d3';FX.shadowColor='rgba(0,0,0,.5)';FX.shadowBlur=8;FX.fillRect(-190,-18,380,26);FX.restore()}
  reveal(hd,eOut(seg(T,250.45,250.9)),{dy:20});
  reveal(v1,eOut(seg(T,251.5,252)),{dx:40,dy:0,wipe:'none'});
  reveal(v2,eOut(seg(T,253.4,253.9)),{dx:40,dy:0,wipe:'none'});
}};
