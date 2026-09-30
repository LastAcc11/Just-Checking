// MG02 — "ושלושה נהרגים: נפתלי מגד, רחמים צרויה ומשה מזרחי. שלושה אזרחים חפים מפשע..."
// global 11.90 → 20.30
const S0=11.90, g=x=>x-S0;
const NAMES=[['נפתלי','מגד',13.50],['רחמים','צרויה',14.25],['משה','מזרחי',15.25]];
let big,head,plaques=[],tag,tag2;
const SCENE={dur:8.4,fadeIn:.3,
build(){
  BGOPT.dots=false;BGOPT.tint='#14100f';
  big=el('div','abs os',`3`);Object.assign(big.style,{left:0,right:0,top:'250px',textAlign:'center',fontWeight:700,fontSize:'420px',lineHeight:'1',color:'transparent',WebkitTextStroke:'4px #efe8da'});
  head=el('div','abs kicker','<i></i><span>שלושה הרוגים</span><i></i>');Object.assign(head.style,{left:0,right:0,top:'150px',justifyContent:'center',fontSize:'30px'});
  NAMES.forEach(([f,l],i)=>{const p=el('div','abs',`
    <div style="width:420px;height:470px;border:1px solid rgba(239,232,218,.2);background:linear-gradient(180deg,rgba(28,24,23,.9),rgba(12,12,13,.9));position:relative;box-shadow:0 30px 80px rgba(0,0,0,.6)">
      <div style="position:absolute;inset:18px;border:1px solid rgba(239,232,218,.08)"></div>
      <div class="flame" style="position:absolute;left:50%;top:70px;width:10px;height:26px;margin-left:-5px;border-radius:50% 50% 45% 45%;background:radial-gradient(ellipse at 50% 70%,#fff4d6,#ffb347 45%,rgba(226,80,40,0) 75%);filter:blur(.5px)"></div>
      <div class="halo" style="position:absolute;left:50%;top:83px;width:260px;height:260px;margin:-130px 0 0 -130px;background:radial-gradient(circle,rgba(255,170,90,.22),rgba(255,170,90,0) 65%)"></div>
      <div style="position:absolute;left:50%;top:100px;width:16px;height:70px;margin-left:-8px;background:linear-gradient(90deg,#cfc6b4,#efe8da,#bdb4a3);border-radius:2px"></div>
      <div class="he" style="position:absolute;left:0;right:0;top:215px;text-align:center;font-weight:400;font-size:44px;color:#cfc8ba">${f}</div>
      <div class="he" style="position:absolute;left:0;right:0;top:262px;text-align:center;font-weight:900;font-size:78px;color:#efe8da;line-height:1.1">${l}</div>
      <div style="position:absolute;left:120px;right:120px;top:380px;height:2px;background:#e2372c;box-shadow:0 0 10px rgba(226,55,44,.6)"></div>
      <div class="os" style="position:absolute;left:0;right:0;top:398px;text-align:center;font-size:26px;color:#9aa3ab;letter-spacing:3px">11.12.2003</div>
    </div>`);place(p,1230-i*480,300);plaques.push(p)});
  tag=el('div','abs he',`<span style="color:#e2372c">●</span> אזרחים חפים מפשע`);Object.assign(tag.style,{left:0,right:0,top:'815px',textAlign:'center',fontWeight:800,fontSize:'46px',color:'#efe8da'});
  tag2=el('div','abs he',`באותו מקום &nbsp;·&nbsp; באותו רגע`);Object.assign(tag2.style,{left:0,right:0,top:'885px',textAlign:'center',fontWeight:400,fontSize:'32px',color:'#9aa3ab',letterSpacing:'3px'});
},
update(t){
  const T=t+S0;
  // big "3" pops then fades up as names arrive
  const bp=eBack(seg(T,11.95,12.4)), bo=eIO(seg(T,13.1,13.6));
  big.style.opacity=clamp(seg(T,11.95,12.15))*(1-bo);big.style.transform=`scale(${lerp(.7,1,bp)*lerp(1,.6,bo)}) translateY(${-bo*120}px)`;
  const hp=eOut(seg(T,13.2,13.8));head.style.opacity=hp;head.querySelectorAll('i').forEach(i=>i.style.width=(hp*140)+'px');
  plaques.forEach((p,i)=>{const st=NAMES[i][2]-.25,pp=eOut(seg(T,st,st+.6));reveal(p,pp,{dy:40,wipe:'none'});
    const fl=p.querySelector('.flame'),ha=p.querySelector('.halo');const n=Math.sin(T*23+i*3)*.5+Math.sin(T*37+i)*.5;
    fl.style.transform=`scale(${1+n*.08},${1+n*.12})`;ha.style.opacity=.75+n*.2;
    // slow drift
    p.style.transform+=` translateY(${Math.sin(T*.6+i)*3}px)`});
  reveal(tag,eOut(seg(T,16.2,16.8)),{dy:20});
  reveal(tag2,eOut(seg(T,18.3,18.9)),{dy:14});
  // subtle push-in
  ROOT.style.transform=`scale(${lerp(1,1.04,seg(T,11.9,20.3))})`;
}};
