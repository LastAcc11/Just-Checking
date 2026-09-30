// MG19 — "ההיקף היה חסר תקדים: כעשר שנות חקירה, שישה עדי מדינה, עשרות אלפי שיחות מוקלטות וכ־300 ישיבות הוכחות. המשפט נמשך שש שנים."
// global 205.43 → 214.30
const S0=205.43;
const ST=[['~10','שנות חקירה','clock',207.23],['6','עדי מדינה','people',208.45],['עשרות אלפי','שיחות מוקלטות','phone',209.95],['~300','ישיבות הוכחות','scales',211.1]];
let ttl,tiles=[],bar,barL;
const SCENE={dur:8.87,fadeIn:.25,
build(){
  ttl=el('div','abs he','היקף חסר תקדים');Object.assign(ttl.style,{left:0,right:0,top:'110px',textAlign:'center',fontWeight:900,fontSize:'78px',color:'#efe8da'});
  ST.forEach(([n,l,ic],i)=>{const e=el('div','abs',`<div style="width:390px;height:430px;background:linear-gradient(180deg,rgba(24,29,35,.92),rgba(12,15,19,.92));border:1px solid rgba(239,232,218,.14);border-top:4px solid #e2372c;padding:34px 20px;text-align:center;box-shadow:0 30px 70px rgba(0,0,0,.6)">
     <div>${icon(ic,80,'#e2372c')}</div>
     <div class="num ${n.length>4?'he':'os'}" style="font-weight:${n.length>4?900:700};font-size:${n.length>4?72:130}px;white-space:nowrap;line-height:${n.length>4?'150px':'150px'};color:#efe8da;direction:ltr">${n}</div>
     <div class="he" style="font-weight:800;font-size:40px;color:#9aa3ab">${l}</div>
     <canvas class="wave" width="300" height="50" style="margin-top:12px;display:${ic==='phone'?'inline-block':'none'}"></canvas></div>`);place(e,1470-i*420-0,300);tiles.push(e)});
  barL=el('div','abs he','<span style="font-family:Oswald;color:#e2372c;font-size:56px">6</span> שנות משפט &nbsp;<span style="font-family:Oswald;color:#9aa3ab;font-size:34px">2015–2021</span>');Object.assign(barL.style,{left:0,right:0,top:'790px',textAlign:'center',fontWeight:800,fontSize:'44px',color:'#efe8da'});
  bar=el('div','abs','');Object.assign(bar.style,{left:'330px',width:'1260px',top:'890px',height:'10px',background:'rgba(239,232,218,.12)'});bar.innerHTML='<div class="f" style="height:100%;background:#e2372c;box-shadow:0 0 14px #e2372c;margin-right:0;margin-left:auto;width:0"></div>';
},
update(t){const T=t+S0;
  reveal(ttl,eOut(seg(T,205.45,206.0)),{dy:24});
  tiles.forEach((e,i)=>{const st=ST[i][3]-.2;reveal(e,eOut(seg(T,st,st+.45)),{dy:40,wipe:'none'});
    const w=e.querySelector('.wave');if(w.style.display!=='none'){const g=w.getContext('2d');g.clearRect(0,0,300,50);g.fillStyle='#e2372c';for(let k=0;k<50;k++){const h=6+Math.abs(Math.sin(k*.7+T*9)*Math.sin(k*.23+T*3))*40;g.fillRect(k*6,25-h/2,3,h)}}});
  reveal(barL,eOut(seg(T,212.35,212.8)),{dy:12});
  bar.style.opacity=clamp(seg(T,212.35,212.6));bar.querySelector('.f').style.width=(eIO(seg(T,212.5,214.0))*100)+'%';
}};
