// MG28 — סיום: "אחרי סיום הפרשה, ניתוחים שפורסמו בתקשורת העריכו שפרשה 512 שינתה את מפת הפשיעה בישראל: במקום ארגונים גדולים והיררכיים צמחו קבוצות קטנות, שמתחברות זו לזו לפי הצורך. אם זה נכון, אולי המדינה לא הביסה את הפשע המאורגן, אלא רק שינתה את הצורה שלו."
// global 318.88 → 337.27
const S0=318.88;
const CAM={lon:35.0,lat:31.6,ax:960,ay:560,span:9.5};
let src,t1,t2;
const R=rng(21);
const PYR=pyramidLayout([1,2,3,4,5,6],1380,300,70,70);
// clusters of 2-4 dots spread over the map
const CL=[...Array(9)].map((_,i)=>({x:1130+R()*560,y:200+R()*640,n:2+Math.floor(R()*3)}));
const TARGET=[];CL.forEach((c,ci)=>{for(let k=0;k<c.n;k++){const a=k/c.n*6.28+R();TARGET.push([c.x+Math.cos(a)*26,c.y+Math.sin(a)*26,ci])}});
while(TARGET.length<PYR.length)TARGET.push(TARGET[TARGET.length%9]);
const SCENE={dur:18.4,fadeIn:.3,fadeOut:1.2,
build(){
  src=el('div','src','לפי ניתוחים שפורסמו בתקשורת, 2022');
  t1=el('div','abs he','ארגונים גדולים והיררכיים');t2=el('div','abs he','קבוצות קטנות, לפי הצורך');
  [t1,t2].forEach(e=>Object.assign(e.style,{right:'auto',left:'110px',top:'120px',fontWeight:900,fontSize:'60px',color:'#efe8da'}));
},
update(t){const T=t+S0;
  const cam={...CAM,span:lerp(9.5,11.5,seg(T,318.9,337.3))};
  drawMap(BG,cam,LAND10,{glowAt:[[1380,560]],glowR:800,graticule:true});
  BG.fillStyle='rgba(5,7,9,.35)';BG.fillRect(0,0,W,H);
  src.style.opacity=clamp(seg(T,320.3,320.8))*.9;
  const m=eIO(seg(T,327.0,328.8));
  const P=PYR.map((p,i)=>{const q=TARGET[i];return[lerp(p[0],q[0],m),lerp(p[1],q[1],m),p[2],q[2]]});
  const g=FX;
  // hierarchy links fade out as it breaks
  const hl=clamp(seg(T,321,322))*(1-m);
  if(hl>0){g.save();g.strokeStyle=`rgba(239,232,218,${.25*hl})`;g.lineWidth=1.5;P.forEach(a=>{if(a[2]===0)return;let best=null,bd=1e9;P.forEach(b=>{if(b[2]===a[2]-1){const d=Math.abs(b[0]-a[0]);if(d<bd){bd=d;best=b}}});g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(best[0],best[1]);g.stroke()});g.restore()}
  // flexible links between clusters (328.85 →)
  if(T>328.8){g.save();g.lineWidth=2;for(let i=0;i<CL.length;i++)for(let j=i+1;j<CL.length;j++){const ph=Math.sin((T-328.8)*1.3+i*2.1+j*1.7);if(ph<.55)continue;const a=(ph-.55)/.45*clamp(seg(T,328.8,329.4));
      g.strokeStyle=`rgba(226,55,44,${.6*a})`;g.setLineDash([6,8]);g.beginPath();g.moveTo(CL[i].x,CL[i].y);g.lineTo(CL[j].x,CL[j].y);g.stroke()}g.restore()}
  P.forEach(([x,y,r],i)=>{const p=eBack(seg(T,321+i*.03,321.4+i*.03));if(p<=0)return;g.beginPath();g.arc(x,y,8*p,0,7);g.fillStyle=r===0&&m<.5?'#e2372c':'#efe8da';g.fill();
    g.beginPath();g.arc(x,y,15*p,0,7);g.strokeStyle='rgba(239,232,218,.25)';g.lineWidth=1.5;g.stroke()});
  const a1=eOut(seg(T,326.0,326.5))*(1-eIO(seg(T,327.2,327.6)));t1.style.opacity=a1;
  t1.style.textDecoration=T>327?'line-through':'none';t1.style.textDecorationColor='#e2372c';
  reveal(t2,eOut(seg(T,327.7,328.2)),{dy:14});t2.style.opacity*=1-eIO(seg(T,331,331.5));
  if(!SCENE._e){SCENE._e=el('div','abs he','לא הביסה את הפשע המאורגן');SCENE._f=el('div','abs he','אלא שינתה את הצורה שלו');
    Object.assign(SCENE._e.style,{left:0,right:0,top:'860px',textAlign:'center',fontWeight:800,fontSize:'48px',color:'#9aa3ab'});
    Object.assign(SCENE._f.style,{left:0,right:0,top:'930px',textAlign:'center',fontWeight:900,fontSize:'64px',color:'#efe8da'})}
  reveal(SCENE._e,eOut(seg(T,332.3,332.8)),{dy:12});reveal(SCENE._f,eOut(seg(T,335.3,335.8)),{dy:12});
}};
