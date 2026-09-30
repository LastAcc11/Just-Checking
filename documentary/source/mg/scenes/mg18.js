// MG18 — "כתב אישום נגד 18 נאשמים, שמתאר ארגון פשיעה בינלאומי והיררכי, עם תפקידים, חלוקת עבודה וקופה משותפת."
// global 195.08 → 205.30
const S0=195.08;
const GRID=[...Array(18)].map((_,i)=>[960+((i%9)-4)*150,430+Math.floor(i/9)*200]);
const PYR=pyramidLayout([1,2,4,5,6],960,250,150,135);
let head,sub,tags=[],box,note;
const TAGS=[['הנהגה',0,201.85],['ניהול',1,202.1],['ביצוע',3,202.35]];
const SCENE={dur:10.22,fadeIn:.25,
build(){
  head=el('div','abs os','18');Object.assign(head.style,{right:'130px',top:'110px',fontWeight:700,fontSize:'130px',lineHeight:'1',color:'#efe8da'});
  sub=el('div','abs he','נאשמים');Object.assign(sub.style,{right:'130px',top:'245px',fontWeight:800,fontSize:'40px',color:'#9aa3ab'});
  TAGS.forEach(([l,r])=>{const e=el('div','chip',l);Object.assign(e.style,{fontSize:'30px',padding:'4px 16px 6px'});tags.push(e)});
  box=el('div','abs',`<div style="display:flex;align-items:center;gap:18px">${icon('cash',70,'#e2372c')}<span class="he" style="font-weight:900;font-size:44px;color:#efe8da">קופה משותפת</span></div>`);place(box,790,930);
  note=el('div','src','איור להמחשה');
},
update(t){const T=t+S0;
  const cnt=Math.round(18*eOut(seg(T,195.1,196.2)));head.textContent=cnt;head.style.opacity=clamp(seg(T,195.1,195.3));
  reveal(sub,eOut(seg(T,195.3,195.7)),{dy:10});
  const m=eIO(seg(T,196.7,198.2));
  const P=GRID.map((g,i)=>{const p=PYR[i];return[lerp(g[0],p[0],m),lerp(g[1],p[1],m),p[2]]});
  // links (hierarchy): each node to nearest node in row above
  const lk=eOut(seg(T,198.0,199.3));
  if(lk>0){FX.save();FX.strokeStyle=`rgba(239,232,218,${.28*lk})`;FX.lineWidth=2;
    P.forEach((a,i)=>{if(a[2]===0)return;let best=null,bd=1e9;P.forEach(b=>{if(b[2]===a[2]-1){const d=Math.abs(b[0]-a[0]);if(d<bd){bd=d;best=b}}});if(best){FX.beginPath();FX.moveTo(a[0],a[1]-30);FX.lineTo(best[0],best[1]+34);FX.stroke()}});FX.restore()}
  // group tint for "חלוקת עבודה"
  const grp=seg(T,202.78,203.3);
  P.forEach(([x,y,r],i)=>{const st=195.15+i*.05;const p=eBack(seg(T,st,st+.3));if(p<=0)return;
    let c='#8b949c';if(r===0&&T>196.9)c='#e2372c';if(grp>0){c=r===0?'#e2372c':r<=1?'#efe8da':r<=2?'#c2b8a6':'#8b949c'}
    drawPerson(FX,x,y,56*p,c)});
  // globe badge for "בינלאומי"
  const gp=eBack(seg(T,197.6,198.0));if(gp>0){FX.save();FX.translate(1560,560);FX.scale(gp,gp);FX.restore()}
  if(!SCENE._g){SCENE._g=el('div','abs',`<div style="display:flex;align-items:center;gap:14px">${icon('globe',60,'#e2372c')}<span class="he" style="font-weight:800;font-size:38px;color:#efe8da">בינלאומי · היררכי</span></div>`);place(SCENE._g,120,120)}
  reveal(SCENE._g,eOut(seg(T,197.4,197.9)),{dy:12,wipe:'none'});
  TAGS.forEach(([l,r,st],i)=>{const row=PYR.filter(p=>p[2]===r);const x=Math.min(...row.map(p=>p[0]))-230,y=row[0][1]-40;place(tags[i],x,y);reveal(tags[i],eOut(seg(T,st,st+.35)),{dx:20,dy:0,wipe:'none'})});
  // money lines to box
  const bp=eOut(seg(T,203.7,204.4));
  if(bp>0){FX.save();FX.strokeStyle=`rgba(226,55,44,${.4*bp})`;FX.lineWidth=2;FX.setLineDash([4,8]);P.filter(p=>p[2]===4).forEach(p=>{FX.beginPath();FX.moveTo(p[0],p[1]+40);FX.lineTo(lerp(p[0],960,bp),lerp(p[1]+40,925,bp));FX.stroke()});FX.restore()}
  reveal(box,eBack(seg(T,203.9,204.4)),{dy:16,wipe:'none',scale:.7});
  note.style.opacity=clamp(seg(T,197,197.5))*.9;
}};
