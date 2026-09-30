// MG07 — "השופטים כתבו שלא ברור עד כמה באמת רצה להשתנות, אבל קבעו שזה לא קרה. לדבריהם, חיים של עבודה פשוטה לא התאימו לשאיפות שלו להערצה, לכסף, לכבוד ולפרסום."
// global 62.83 → 74.40
const S0=62.83;
let page,hl1,hl2,stp,simple,words=[],wk;
const WORDS=[['הערצה',71.5],['כסף',72.48],['כבוד',73.1],['פרסום',73.7]];
function lines(n,seed){const r=rng(seed);let s='';for(let i=0;i<n;i++){const w=60+r()*38;s+=`<div style="height:12px;width:${w}%;background:rgba(40,36,30,.28);margin:0 0 20px auto;border-radius:3px"></div>`}return s}
const SCENE={dur:11.57,fadeIn:.25,
build(){
  page=el('div','abs',`
   <div style="width:760px;height:900px;background:linear-gradient(180deg,#e9e2d3,#d9d0bd);box-shadow:0 40px 100px rgba(0,0,0,.7);padding:70px 70px;direction:rtl;position:relative">
     <div class="he" style="font-weight:900;font-size:30px;color:#2b2722;text-align:center">בית המשפט המחוזי בתל אביב</div>
     <div class="he" style="font-weight:800;font-size:44px;color:#2b2722;text-align:center;margin:6px 0 34px">הכרעת דין</div>
     ${lines(5,3)}
     <div class="hl h1 he" style="position:relative;font-weight:800;font-size:36px;color:#1c1916;margin:6px 0 22px;padding:4px 8px"><span class="mk" style="position:absolute;inset:0;background:rgba(226,55,44,.35);transform-origin:100% 50%"></span><span style="position:relative">לא ברור עד כמה באמת רצה להשתנות</span></div>
     ${lines(3,7)}
     <div class="hl h2 he" style="position:relative;font-weight:900;font-size:40px;color:#1c1916;margin:6px 0 22px;padding:4px 8px"><span class="mk" style="position:absolute;inset:0;background:rgba(226,55,44,.35);transform-origin:100% 50%"></span><span style="position:relative">אבל: זה לא קרה</span></div>
     ${lines(6,11)}
     <div class="he" style="position:absolute;left:70px;bottom:40px;font-size:20px;color:#6b6358">בתמצית, לפי דברי השופטים</div>
   </div>`);place(page,1060,90);
  hl1=page.querySelector('.h1 .mk');hl2=page.querySelector('.h2 .mk');
  simple=el('div','abs he','חיים של עבודה פשוטה');Object.assign(simple.style,{left:'230px',top:'250px',fontWeight:800,fontSize:'46px',color:'#9aa3ab'});
  wk=el('div','abs kicker','<span>לא התאימו לשאיפות שלו</span><i></i>');Object.assign(wk.style,{left:'230px',top:'340px',direction:'rtl'});
  WORDS.forEach(([w],i)=>{const e=el('div','abs he',w);Object.assign(e.style,{left:(230+(i%2)*330)+'px',top:(420+Math.floor(i/2)*170)+'px',width:'300px',height:'140px',lineHeight:'140px',textAlign:'center',fontWeight:900,fontSize:'64px',color:'#efe8da',border:'2px solid rgba(239,232,218,.25)',background:'rgba(12,15,19,.7)'});words.push(e)});
},
update(t){const T=t+S0;
  const pp=eOut(seg(T,62.85,63.5));page.style.opacity=pp;
  const shift=eIO(seg(T,67.7,68.5));
  page.style.transform=`translate(${(1-pp)*60+ shift*120}px,${(1-pp)*20}px) rotate(${lerp(-2.5,-1.5,shift)}deg) scale(${lerp(1,.86,shift)})`;
  hl1.style.transform=`scaleX(${eOut(seg(T,63.6,65.4))})`;
  hl2.style.transform=`scaleX(${eOut(seg(T,65.9,66.8))})`;
  reveal(simple,eOut(seg(T,68.6,69.2)),{dy:16});
  // strike simple life
  const sp=eOut(seg(T,70.3,70.9));simple.style.textDecoration=sp>.5?'line-through':'none';simple.style.textDecorationColor='#e2372c';simple.style.textDecorationThickness='5px';
  const kp=eOut(seg(T,70.4,70.9));wk.style.opacity=kp;wk.querySelector('i').style.width=(kp*80)+'px';
  words.forEach((e,i)=>{const p=eBack(seg(T,WORDS[i][1]-.1,WORDS[i][1]+.3));reveal(e,p,{dy:20,wipe:'none',scale:.7});
    const on=seg(T,WORDS[i][1],WORDS[i][1]+.15);e.style.borderColor=`rgba(226,55,44,${lerp(.25,.9,on)})`;});
}};
