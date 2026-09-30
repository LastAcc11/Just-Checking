// RL03 — "ב־2021 השתחרר, וסיפר שניתק את הקשר עם בני המשפחה שמעורבים בפשע."  global 297.32 → 302.70
const S0=297.32;
let img,c1,c2,src;
const SCENE={dur:5.38,fadeIn:.2,
build(){
  img=el('div','abs','<img src="photos/meir_released.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:grayscale(.35) contrast(1.1) brightness(.85)">');Object.assign(img.style,{inset:0,overflow:'hidden'});
  const sh=el('div','abs','');Object.assign(sh.style,{inset:0,background:'linear-gradient(0deg,rgba(5,7,9,.9),rgba(5,7,9,0) 50%),linear-gradient(90deg,rgba(5,7,9,.7),rgba(5,7,9,0) 55%)'});
  c1=el('div','chip','יוני 2021 · השתחרר<small>מאיר אברג׳יל, אחרי כשנתיים וחצי בכלא</small>');Object.assign(c1.style,{right:'110px',bottom:'260px',fontSize:'60px'});
  c2=el('div','chip','ניתק את הקשר עם בני המשפחה המעורבים בפשע<small>לפי דבריו, כפי שדווח</small>');Object.assign(c2.style,{right:'110px',bottom:'110px',fontSize:'44px'});
  src=el('div','src','צילום ארכיון');
},
update(t){const T=t+S0;
  img.firstChild.style.transform=`scale(${lerp(1.02,1.12,seg(T,297.3,302.7))})`;
  reveal(c1,eOut(seg(T,297.5,298)),{dx:30,dy:0,wipe:'none'});
  reveal(c2,eOut(seg(T,299.3,299.8)),{dx:30,dy:0,wipe:'none'});
}};
