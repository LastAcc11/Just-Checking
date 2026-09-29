// MG09 — "משפחת אברג'יל היא משפחה גדולה, ולא כל בניה היו חלק מעולם הפשע. אבל לשניים מהאחים יש מקום מרכזי בסיפור: מאיר, הבכור, ויעקב."
// global 86.10 → 95.20
const S0=86.10;
let ttl,note,parents,kids=[],cM,cY,cI;
const KX=i=>1560-i*124;
const SCENE={dur:9.1,fadeIn:.25,
build(){
  ttl=el('div','abs he','משפחת אברג׳יל');Object.assign(ttl.style,{left:0,right:0,top:'90px',textAlign:'center',fontWeight:900,fontSize:'76px',color:'#efe8da'});
  parents=el('div','abs',`<span style="display:inline-flex;gap:16px">${person(84,'#8b949c')}${person(84,'#8b949c')}</span>`);place(parents,960-92,215);
  for(let i=0;i<10;i++){const k=el('div','abs',person(80,'#8b949c'));place(k,KX(i)-40,420);kids.push(k)}
  note=el('div','abs he','לא כל בניה היו חלק מעולם הפשע');Object.assign(note.style,{left:0,right:0,top:'560px',textAlign:'center',fontWeight:400,fontSize:'40px',color:'#9aa3ab'});
  cM=card({name:'מאיר',role:'האח הבכור',x:1180,y:560,w:330,ph:250,sil:200,img:'photos/meir_released.jpg',pos:'50% 20%'});
  cY=card({name:'יעקב',role:'אח',x:795,y:560,w:330,ph:250,sil:200,img:'photos/yaakov_old.jpg',pos:'50% 40%'});
  cI=card({name:'יצחק',role:'הצעיר',x:410,y:560,w:330,ph:250,sil:200,img:'photos/yitzhak_hoodie.jpg',pos:'50% 22%'});
},
update(t){const T=t+S0;
  reveal(ttl,eOut(seg(T,86.15,86.7)),{dy:24});
  reveal(parents,eOut(seg(T,86.3,86.8)),{dy:20,wipe:'none'});
  const g=FX,lp=eOut(seg(T,86.6,87.6));
  g.save();g.strokeStyle='rgba(239,232,218,.35)';g.lineWidth=2;
  g.beginPath();g.moveTo(960,330);g.lineTo(960,330+50*lp);g.stroke();
  const L=lerp(960,KX(0),lp),R=lerp(960,KX(9),lp);g.beginPath();g.moveTo(L,380);g.lineTo(R,380);g.stroke();
  kids.forEach((k,i)=>{const p=eOut(seg(T,86.9+i*.06,87.3+i*.06));if(p>0){g.beginPath();g.moveTo(KX(i),380);g.lineTo(KX(i),380+30*p);g.stroke()}
    reveal(k,p,{dy:16,wipe:'none'})});g.restore();
  reveal(note,eOut(seg(T,88.15,88.7)),{dy:12});
  // spotlight: dim everyone except eldest (0) and youngest (9); Yaakov card appears without implying birth order
  const dim=eIO(seg(T,90.8,91.4));
  kids.forEach((k,i)=>{const keep=(i===0&&T>93.3)||(i===9);k.style.filter=`brightness(${keep?1:lerp(1,.35,dim)})`;
    k.querySelector('path')&&k.querySelectorAll('circle,path').forEach(s=>s.setAttribute('fill',keep&&dim>0?'#e2372c':'#8b949c'))});
  note.style.opacity=clamp(seg(T,88.15,88.5))*(1-dim);
  reveal(cM,eOut(seg(T,93.4,93.9)),{dy:40,wipe:'none'});
  reveal(cY,eOut(seg(T,94.7,95.15)),{dy:40,wipe:'none'});
  reveal(cI,eOut(seg(T,90.9,91.4)),{dy:40,wipe:'none'});cI.style.opacity*=1;
}};
