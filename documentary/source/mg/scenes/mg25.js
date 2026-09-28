// MG25 — גזר הדין 2022 + הערעור 2024
// global 267.15 → 286.25
const S0=267.15;
let k1,k2,lifes=[],extra,charges=[],murder,keep,cut;
const SCENE={dur:19.1,fadeIn:.25,
build(){
  k1=el('div','abs kicker','<i></i><span>גזר הדין · יוני 2022</span><i></i>');Object.assign(k1.style,{left:0,right:0,top:'110px',justifyContent:'center',fontSize:'30px'});
  k2=el('div','abs kicker','<i></i><span>הערעור · נובמבר 2024 · בית המשפט העליון</span><i></i>');Object.assign(k2.style,{left:0,right:0,top:'110px',justifyContent:'center',fontSize:'30px'});
  for(let i=0;i<3;i++){const e=el('div','abs',`<div style="width:330px;height:300px;border:3px solid #efe8da;background:rgba(12,15,19,.8);text-align:center;padding-top:40px">
    ${icon('lock',90,'#e2372c')}<div class="he" style="font-weight:900;font-size:52px;color:#efe8da;margin-top:14px">מאסר עולם</div></div>`);place(e,1310-i*380,180);lifes.push(e)}
  extra=el('div','abs',`<div style="width:1090px;height:90px;border:2px dashed rgba(239,232,218,.5);display:flex;align-items:center;justify-content:center;gap:16px" class="he"><span style="font-weight:900;font-size:44px;color:#efe8da">+ תקופת מאסר נוספת</span><span class="cutlbl" style="font-weight:800;font-size:34px;color:#e2372c"></span></div>`);place(extra,410,510);
  ['אישום','אישום','אישום','אישום'].forEach((c,i)=>{const e=el('div','abs he',`${icon('doc',44,'#9aa3ab')} <span style="vertical-align:12px">אישום</span>`);Object.assign(e.style,{left:(1340-i*300)+'px',top:'680px',fontWeight:800,fontSize:'36px',color:'#9aa3ab'});charges.push(e)});
  cut=el('div','abs he','זוכה מאחד האישומים');Object.assign(cut.style,{left:(1340-300*1-40)+'px',width:'320px',textAlign:'center',top:'750px',fontWeight:800,fontSize:'30px',color:'#e2372c'});
  murder=el('div','abs he','ההרשעה ברצח');Object.assign(murder.style,{left:0,right:0,top:'840px',textAlign:'center',fontWeight:900,fontSize:'64px',color:'#efe8da'});
  keep=el('div','stamp','נשארה בתוקף');place(keep,1180,830);keep.style.fontSize='56px';
},
update(t){const T=t+S0;
  const k1p=eOut(seg(T,267.2,267.7))*(1-eIO(seg(T,272.5,272.9)));k1.style.opacity=k1p;k1.querySelectorAll('i').forEach(i=>i.style.width=(k1p*80)+'px');
  const k2p=eOut(seg(T,272.85,273.3));k2.style.opacity=k2p;k2.querySelectorAll('i').forEach(i=>i.style.width=(k2p*80)+'px');
  lifes.forEach((e,i)=>{reveal(e,eBack(seg(T,268.9+i*.35,269.3+i*.35)),{dy:30,wipe:'none',scale:.8});
    const pulse=T>284.1?.5+.5*Math.sin((T-284.1)*8-i):0;e.firstElementChild.style.borderColor=T>284.1?`rgba(226,55,44,${.6+.4*pulse})`:'#efe8da';e.firstElementChild.style.boxShadow=T>284.1?`0 0 ${30*pulse}px rgba(226,55,44,.6)`:'none'});
  reveal(extra,eOut(seg(T,271.1,271.6)),{dy:20,wipe:'none'});
  // appeal: extra period shrinks
  const sh=eIO(seg(T,279.2,280.6));extra.firstElementChild.style.width=lerp(1090,760,sh)+'px';extra.style.left=lerp(410,575,sh)+'px';
  extra.querySelector('.cutlbl').textContent=sh>.5?'· קוצרה':'';
  charges.forEach((e,i)=>{reveal(e,eOut(seg(T,276.4+i*.12,276.8+i*.12)),{dy:14,wipe:'none'});
    if(i===1){const s=seg(T,277.4,277.9);e.style.textDecoration=s>.3?'line-through':'none';e.style.textDecorationColor='#e2372c';e.style.textDecorationThickness='5px';e.style.opacity=clamp(seg(T,276.5,276.9))*lerp(1,.5,s)}});
  reveal(cut,eOut(seg(T,277.6,278)),{dy:8});
  reveal(murder,eOut(seg(T,281.6,282.1)),{dy:14});
  slam(keep,seg(T,282.7,283.05),-5);
  const fade=eIO(seg(T,272.6,273.0))*.0;
}};
