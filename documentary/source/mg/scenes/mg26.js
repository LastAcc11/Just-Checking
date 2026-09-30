// MG26 — "מאיר, האח הבכור, הלך בדרך אחרת. ב־2018 הוא חתם על הסדר טיעון, הודה בקשירת קשר, בעבירות סמים ובהלבנת הון, ונידון לשמונה וחצי שנות מאסר."
// global 286.40 → 297.25
const S0=286.40;
let cd,fork1,fork2,kick,rows=[],yr,num,numl;
const R=[['קשירת קשר',291.1],['עבירות סמים',292.45],['הלבנת הון',293.4]];
const SCENE={dur:10.85,fadeIn:.25,
build(){
  cd=card({name:'מאיר אברג׳יל',role:'האח הבכור',x:1240,y:160,w:500,ph:480,sil:380,img:'photos/meir_court.jpg',pos:'50% 25%'});
  fork1=el('div','abs he','יצחק');fork2=el('div','abs he','מאיר');
  [fork1,fork2].forEach(e=>Object.assign(e.style,{fontWeight:900,fontSize:'40px',color:'#efe8da'}));
  kick=el('div','abs kicker','<span>2018 · הסדר טיעון</span><i></i>');Object.assign(kick.style,{right:'780px',top:'190px',fontSize:'34px'});
  R.forEach(([l],i)=>{const e=iconRow('check',l,{size:48,font:50,ic:'#e2372c'});Object.assign(e.style,{right:'780px',top:(270+i*84)+'px'});rows.push(e)});
  num=el('div','abs os','0');Object.assign(num.style,{right:'780px',top:'560px',fontWeight:700,fontSize:'170px',lineHeight:'1',color:'#e2372c',direction:'ltr'});
  numl=el('div','abs he','שנות מאסר');Object.assign(numl.style,{right:'780px',top:'740px',fontWeight:800,fontSize:'44px',color:'#efe8da'});
},
update(t){const T=t+S0;
  reveal(cd,eOut(seg(T,286.4,287.0)),{dy:30,wipe:'none'});
  // fork: one path splits into two (288.1 "הלך בדרך אחרת"), then fades for the plea list
  const fp=eIO(seg(T,288.1,289.0)),fo=1-eIO(seg(T,289.2,289.6));
  if(fo>0){const g=FX;g.save();g.globalAlpha=fo;g.strokeStyle='rgba(239,232,218,.5)';g.lineWidth=5;g.lineCap='round';
    const x0=1180,y0=560,xm=900;g.beginPath();g.moveTo(x0,y0);g.lineTo(lerp(x0,xm,clamp(fp*2)),y0);g.stroke();
    if(fp>.5){const q=(fp-.5)*2;g.strokeStyle='rgba(239,232,218,.35)';g.beginPath();g.moveTo(xm,y0);g.quadraticCurveTo(xm-120,y0,lerp(xm,520,q),lerp(y0,y0-200,q));g.stroke();
      g.strokeStyle='#e2372c';g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=14;g.beginPath();g.moveTo(xm,y0);g.quadraticCurveTo(xm-120,y0,lerp(xm,520,q),lerp(y0,y0+200,q));g.stroke()}
    g.restore();place(fork1,440,330);place(fork2,440,740);fork1.style.opacity=fork2.style.opacity=clamp(seg(T,288.7,289))*fo;fork2.style.color='#e2372c'}
  else{fork1.style.opacity=fork2.style.opacity=0}
  const kp=eOut(seg(T,289.3,289.8));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  rows.forEach((e,i)=>reveal(e,eOut(seg(T,R[i][1],R[i][1]+.4)),{dx:30,dy:0,wipe:'none'}));
  const np=eOut(seg(T,294.7,296.3));const v=8.5*np;num.textContent=np>=1?'8.5':v.toFixed(1);num.style.opacity=clamp(seg(T,294.6,294.9));
  reveal(numl,eOut(seg(T,295.0,295.4)),{dy:10});
}};
