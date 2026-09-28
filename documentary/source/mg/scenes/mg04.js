// MG04 — "עברו כמעט עשרים שנה עד שבית המשפט קבע מי אחראי לרצח של אותם שלושה אנשים."
// global 28.40 → 33.45   (timeline runs right→left, Hebrew reading direction)
const S0=28.40;
const XR=1640,XL=280,Y=640,Y0=2003,Y1=2021;
let year,lab20,endR,endL,gav;
const xOf=y=>lerp(XR,XL,(y-Y0)/(Y1-Y0));
const SCENE={dur:5.05,fadeIn:.25,
build(){
  year=el('div','abs os','2003');Object.assign(year.style,{left:0,right:0,top:'260px',textAlign:'center',fontWeight:700,fontSize:'230px',lineHeight:'1',color:'#efe8da'});
  lab20=el('div','abs he','כמעט 20 שנה');Object.assign(lab20.style,{left:0,right:0,top:'520px',textAlign:'center',fontWeight:800,fontSize:'40px',color:'#e2372c',letterSpacing:'4px'});
  endR=el('div','abs he','<b style="font-family:Oswald;font-size:40px;color:#efe8da">2003</b><br>הפיצוץ ביהודה הלוי');Object.assign(endR.style,{left:(XR-160)+'px',width:'320px',top:(Y+40)+'px',textAlign:'center',fontSize:'26px',color:'#9aa3ab',lineHeight:'1.3'});
  endL=el('div','abs he','<b style="font-family:Oswald;font-size:40px;color:#efe8da">2021</b><br>בית המשפט קובע');Object.assign(endL.style,{left:(XL-160)+'px',width:'320px',top:(Y+40)+'px',textAlign:'center',fontSize:'26px',color:'#9aa3ab',lineHeight:'1.3'});
  gav=el('div','abs',`<svg width="110" height="110" viewBox="0 0 64 64"><g fill="#efe8da"><rect x="22" y="8" width="26" height="12" rx="3" transform="rotate(-40 35 14)"/><rect x="30" y="20" width="6" height="30" rx="2" transform="rotate(-40 33 35)"/><rect x="8" y="52" width="34" height="7" rx="2"/></g></svg>`);place(gav,XL-55,Y-160);
},
update(t){
  const T=t+S0;
  const p=eIO(seg(T,28.55,31.2));
  const yv=Y0+p*(Y1-Y0);year.textContent=Math.floor(yv+.0001);
  year.style.opacity=clamp(seg(T,28.45,28.7));
  year.style.transform=`scale(${T>31.2?1+.06*eBack(seg(T,31.2,31.55))-.06*seg(T,31.55,31.9):1})`;
  year.style.color=T>31.2?'#e2372c':'#efe8da';
  reveal(lab20,eOut(seg(T,29.1,29.6)),{dy:14});
  const g=FX;
  // base line
  g.save();g.strokeStyle='rgba(239,232,218,.25)';g.lineWidth=2;g.beginPath();g.moveTo(XR,Y);g.lineTo(XL,Y);g.stroke();
  // ticks
  for(let y=Y0;y<=Y1;y++){const x=xOf(y),on=yv>=y;g.fillStyle=on?'#efe8da':'rgba(239,232,218,.25)';g.fillRect(x-1.5,Y-(y%5===0?18:10),3,(y%5===0?36:20))}
  // progress
  const px=xOf(yv);g.strokeStyle='#e2372c';g.lineWidth=5;g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=16;g.beginPath();g.moveTo(XR,Y);g.lineTo(px,Y);g.stroke();
  g.beginPath();g.arc(px,Y,9,0,7);g.fillStyle='#fff3ea';g.fill();g.restore();
  drawPin(g,XR,Y,seg(T,28.45,28.8),T,{rings:false});
  reveal(endR,eOut(seg(T,28.5,29)),{dy:12});
  reveal(endL,eOut(seg(T,30.9,31.4)),{dy:12});
  const gp=seg(T,30.6,31.25);gav.style.opacity=clamp(gp*3);
  gav.style.transform=`rotate(${lerp(-35,8,eIn(gp))+ (gp>=1?-8*eOut(seg(T,31.25,31.6)):0)}deg)`;gav.style.transformOrigin='80% 90%';
}};
