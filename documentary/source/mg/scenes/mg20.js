// MG20 — "ובאמצע המשפט הזה, אחד הנאשמים פשוט נעלם."   global 214.40 → 217.35
const S0=214.40;
const PYR=pyramidLayout([1,2,4,5,6],960,250,150,135);
const GONE=7;
let q;
const SCENE={dur:2.95,fadeIn:.2,
build(){q=el('div','abs os','?');Object.assign(q.style,{fontWeight:700,fontSize:'90px',color:'#e2372c',width:'100px',textAlign:'center'})},
update(t){const T=t+S0;
  const zoom=eIO(seg(T,215.6,217.3));const [gx,gy]=PYR[GONE];
  FX.save();FX.translate(gx,gy);FX.scale(1+zoom*.5,1+zoom*.5);FX.translate(-gx,-gy);
  FX.strokeStyle='rgba(239,232,218,.22)';FX.lineWidth=2;
  PYR.forEach(a=>{if(a[2]===0)return;let best=null,bd=1e9;PYR.forEach(b=>{if(b[2]===a[2]-1){const d=Math.abs(b[0]-a[0]);if(d<bd){bd=d;best=b}}});FX.beginPath();FX.moveTo(a[0],a[1]-30);FX.lineTo(best[0],best[1]+34);FX.stroke()});
  PYR.forEach(([x,y,r],i)=>{let c=r===0?'#e2372c':'#8b949c';
    if(i===GONE){const g=seg(T,216.0,216.6);if(g>=1){FX.save();FX.setLineDash([6,6]);FX.strokeStyle='rgba(226,55,44,.9)';FX.lineWidth=3;FX.beginPath();FX.arc(x,y-30,20,0,7);FX.stroke();FX.beginPath();FX.moveTo(x-28,y+31);FX.bezierCurveTo(x-28,y-8,x-14,y-14,x,y-14);FX.bezierCurveTo(x+14,y-14,x+28,y-8,x+28,y+31);FX.stroke();FX.restore();return}
      const fl=Math.sin(T*70)>0?1:.2;FX.globalAlpha=g>0?fl*(1-g):1;drawPerson(FX,x+(g>0?(Math.sin(T*50)*8):0),y,56,g>0?'#e2372c':c);FX.globalAlpha=1;return}
    drawPerson(FX,x,y,56,c)});
  FX.restore();
  place(q,gx-50+ (gx-960)*zoom*.5,gy-180);q.style.opacity=clamp(seg(T,216.5,216.8));
}};
