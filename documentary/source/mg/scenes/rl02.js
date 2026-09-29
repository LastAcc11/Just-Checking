// RL02 — "ב־2011 הוא הוסגר."   global 168.05 → 169.60  (תמונת ארכיון: הסגרה לארצות הברית)
const S0=168.05;
let img,chip,src;
const SCENE={dur:1.55,fadeIn:.12,
build(){
  img=el('div','abs','<img src="photos/meir_extradition.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 40%;filter:grayscale(.3) contrast(1.1) brightness(.88)">');Object.assign(img.style,{inset:0,overflow:'hidden'});
  const sh=el('div','abs','');Object.assign(sh.style,{inset:0,background:'linear-gradient(0deg,rgba(5,7,9,.9),rgba(5,7,9,0) 45%)'});
  chip=el('div','chip','2011 · הוסגרו לארצות הברית<small>בתמונה: מאיר אברג׳יל</small>');Object.assign(chip.style,{right:'110px',bottom:'120px',fontSize:'56px'});
  src=el('div','src','צילום ארכיון');
},
update(t){const T=t+S0;
  img.firstChild.style.transform=`scale(${lerp(1.02,1.1,seg(T,168.05,169.6))})`;
  reveal(chip,eOut(seg(T,168.2,168.6)),{dx:30,dy:0,wipe:'none'});
}};
