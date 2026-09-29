// MG03 — "הם לא היו המטרה. המטרה הייתה זאב רוזנשטיין, מהדמויות הבולטות בעולם התחתון בישראל. הוא אמנם נפצע, אך שרד."
// global 20.30 → 28.30
const S0=20.30;
let chips=[],crosses=[],cd,st1,st2,lbl;
const CH=[['נפתלי מגד',560],['רחמים צרויה',360],['משה מזרחי',160]].map(([n,y])=>[n,y*1.05+40]);
const CARD={x:1080,y:120};
function reticle(g,x,y,r,a,lock){g.save();g.globalAlpha=a;g.strokeStyle='#e2372c';g.lineWidth=3;g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=12;
  g.beginPath();g.arc(x,y,r,0,7);g.stroke();
  [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(x+dx*(r-14),y+dy*(r-14));g.lineTo(x+dx*(r+22),y+dy*(r+22));g.stroke()});
  g.beginPath();g.arc(x,y,4,0,7);g.fillStyle='#e2372c';g.fill();
  if(lock>0){g.lineWidth=4;const s=r+40+ (1-lock)*80,L=34;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{g.beginPath();g.moveTo(x+sx*s,y+sy*(s-L));g.lineTo(x+sx*s,y+sy*s);g.lineTo(x+sx*(s-L),y+sy*s);g.stroke()})}
  g.restore()}
const SCENE={dur:8.0,fadeIn:.25,
build(){
  lbl=el('div','abs kicker','<span>היעד</span><i></i>');place(lbl,0,0);Object.assign(lbl.style,{right:(1920-CARD.x-600)+'px',left:'auto',top:(CARD.y-50)+'px'});
  CH.forEach(([n,y])=>{const c=el('div','chip',`${n}<small>עובר/ת אורח</small>`);c.innerHTML=`${n}<small>אזרח · 11.12.2003</small>`;Object.assign(c.style,{right:'1180px',top:(y+130)+'px',fontSize:'58px',padding:'10px 28px 14px'});c.querySelector('small').style.fontSize='24px';chips.push(c);
    const x=el('div','abs he',`✕ &nbsp;לא המטרה`);Object.assign(x.style,{right:'1180px',top:(y+262)+'px',fontSize:'28px',fontWeight:800,color:'#9aa3ab',letterSpacing:'2px'});crosses.push(x)});
  cd=card({name:'זאב רוזנשטיין',role:'מהדמויות הבולטות<br>בעולם התחתון בישראל',id:'FILE 03-12',x:CARD.x,y:CARD.y,w:600,ph:560,sil:430,img:'photos/rosenstein_court.jpg',pos:'50% 25%'});cd.querySelector('.nm').style.fontSize='64px';cd.querySelector('.rl').style.fontSize='30px';
  st1=el('div','stamp','נפצע');place(st1,CARD.x-260,CARD.y+430);st1.style.fontSize='70px';
  st2=el('div','stamp','שרד');place(st2,CARD.x-200,CARD.y+590);st2.style.fontSize='84px';
},
update(t){
  const T=t+S0;
  // name chips (already known) + "not the target"
  chips.forEach((c,i)=>{reveal(c,eOut(seg(T,20.3+i*.08,20.8+i*.08)),{dx:-30,dy:0,wipe:'none'});
    const dim=seg(T,21.0+i*.15,21.4+i*.15);c.style.opacity=lerp(1,.45,dim)*clamp(seg(T,20.3,20.6))});
  crosses.forEach((x,i)=>reveal(x,eOut(seg(T,20.75+i*.15,21.05+i*.15)),{dy:8}));
  // reticle path: sweeps chips then travels to card
  const cx0=1920-1180-210, pts=CH.map(([n,y])=>[cx0,y+185]);
  let rx,ry;const sweep=seg(T,20.35,21.3);
  if(T<21.3){const k=sweep*(pts.length-1),i=Math.min(pts.length-2,Math.floor(k)),f=eIO(k-i);rx=lerp(pts[i][0],pts[i+1][0],f);ry=lerp(pts[i][1],pts[i+1][1],f)}
  else{const m=eIO(seg(T,21.55,22.35));const last=pts[pts.length-1],tgt=[CARD.x+300,CARD.y+300];rx=lerp(last[0],tgt[0],m);ry=lerp(last[1],tgt[1],m)}
  const lock=eOut(seg(T,22.3,22.8));
  reticle(FX,rx,ry,lerp(60,120,lock),clamp(seg(T,20.35,20.6)),lock);
  // card
  reveal(cd,eOut(seg(T,21.75,22.4)),{dy:30,wipe:'none'});
  const nm=cd.querySelector('.nm'),rl=cd.querySelector('.rl'),bar=cd.querySelector('.bar');
  reveal(nm,eOut(seg(T,21.9,22.5)),{dx:30,dy:0,wipe:'rtl'});
  bar.style.width=(eOut(seg(T,22.3,23))*100)+'%';
  reveal(rl,eOut(seg(T,23.4,24.0)),{dy:12});
  const lp=eOut(seg(T,21.7,22.3));lbl.style.opacity=lp;lbl.querySelector('i').style.width=(lp*90)+'px';
  slam(st1,seg(T,26.2,26.55),-9);
  slam(st2,seg(T,27.35,27.7),6);
  ROOT.style.transform=`scale(${lerp(1,1.035,seg(T,20.3,28.3))})`;
}};
