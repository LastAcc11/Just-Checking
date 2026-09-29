// MG10 — "הרצח לא פוענח עד היום."   global 103.30 → 105.95
const S0=103.30;
let kick,cd,st;
const SCENE={dur:2.65,fadeIn:.2,
build(){
  kick=el('div','abs kicker','<span>רחובות · יוני 2002</span><i></i>');Object.assign(kick.style,{right:'640px',top:'110px'});
  cd=card({name:'יעקב אברג׳יל',role:'נרצח ליד ביתו',x:700,y:160,w:520,ph:480,sil:380,img:'photos/yaakov_old.jpg',pos:'50% 40%'});
  st=el('div','stamp','לא פוענח');place(st,520,560);st.style.fontSize='96px';
},
update(t){const T=t+S0;
  const kp=eOut(seg(T,103.3,103.7));kick.style.opacity=kp;kick.querySelector('i').style.width=(kp*80)+'px';
  reveal(cd,eOut(seg(T,103.3,103.8)),{dy:30,wipe:'none'});
  slam(st,seg(T,104.35,104.75),-7);
  ROOT.style.transform=`scale(${lerp(1,1.04,seg(T,103.3,105.95))})`;
}};
