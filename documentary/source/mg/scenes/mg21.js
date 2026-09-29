// MG21 — "גולן אביטן, מהנאשמים המרכזיים בפרשה, שהה במעצר בית עם איזוק אלקטרוני."
// global 217.50 → 224.25
const S0=217.50;
let cd,kick,house,ank,l1,l2;
const SCENE={dur:6.75,fadeIn:.25,
build(){
  kick=el('div','abs kicker','<span>פרשה 512 · נאשם</span><i></i>');Object.assign(kick.style,{right:'240px',top:'110px'});
  cd=card({name:'גולן אביטן',role:'מהנאשמים המרכזיים בפרשה',x:1100,y:160,w:560,ph:520,sil:410,img:'photos/avitan.jpg',pos:'50% 30%'});
  house=el('div','abs',icon('house',230,'#efe8da'));place(house,360,250);
  ank=el('div','abs',icon('anklet',150,'#efe8da'));place(ank,400,560);
  l1=el('div','abs he','מעצר בית');Object.assign(l1.style,{left:'240px',width:'480px',textAlign:'center',top:'490px',fontWeight:900,fontSize:'54px',color:'#efe8da'});
  l2=el('div','abs he','איזוק אלקטרוני');Object.assign(l2.style,{left:'240px',width:'480px',textAlign:'center',top:'740px',fontWeight:900,fontSize:'54px',color:'#efe8da'});
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,217.5,218));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  reveal(cd,eOut(seg(T,217.55,218.2)),{dy:30,wipe:'none'});
  const rl=cd.querySelector('.rl');reveal(rl,eOut(seg(T,219.6,220.1)),{dy:10});
  reveal(house,eBack(seg(T,221.6,222.0)),{dy:20,wipe:'none',scale:.7});reveal(l1,eOut(seg(T,221.8,222.2)),{dy:10});
  reveal(ank,eBack(seg(T,222.6,223.0)),{dy:20,wipe:'none',scale:.7});reveal(l2,eOut(seg(T,222.8,223.2)),{dy:10});
  const led=ank.querySelector('circle[fill="#e2372c"]');if(led)led.style.opacity=Math.sin(T*8)>0?1:.2;
}};
