// ===== shared motion-graphics engine =====
const W=1920,H=1080,D2R=Math.PI/180;
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const eOut=t=>1-Math.pow(1-clamp(t),3);
const eIn=t=>Math.pow(clamp(t),3);
const eIO=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const eBack=t=>{t=clamp(t);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const $=s=>document.querySelector(s);
function el(tag,cls,html,parent){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;(parent||ROOT).appendChild(e);return e}
function place(e,x,y){e.style.left=x+'px';e.style.top=y+'px';return e}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function noiseCanvas(w,h,seed,amp){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  const im=g.createImageData(w,h),r=rng(seed);for(let i=0;i<w*h;i++){const v=128+(r()-.5)*amp;im.data[i*4]=im.data[i*4+1]=im.data[i*4+2]=v;im.data[i*4+3]=255}
  g.putImageData(im,0,0);return c}

// generic reveal: fade + slide + wipe
function reveal(e,p,{dx=0,dy=24,wipe='up',scale=0}={}){
  p=clamp(p);e.style.opacity=clamp(p*1.5);
  e.style.transform=`translate(${(1-p)*dx}px,${(1-p)*dy}px)`+(scale?` scale(${lerp(scale,1,p)})`:'');
  if(wipe==='up')e.style.clipPath=`inset(${0}% 0 ${(1-p)*100}% 0)`;
  else if(wipe==='rtl')e.style.clipPath=`inset(0 0 0 ${(1-p)*100}%)`;
  else if(wipe==='ltr')e.style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`;
  else e.style.clipPath='none';
}
function hide(e,p){e.style.opacity=1-clamp(p)}
// stamp slam: p 0..1
function slam(e,p,rot=-8){if(p<=0){e.style.opacity=0;return}const q=eOut(p);
  e.style.opacity=clamp(p*4);const s=lerp(1.9,1,q);const sh=p<.35?0:Math.sin(p*60)*(1-p)*3;
  e.style.transform=`rotate(${rot}deg) scale(${s}) translate(${sh}px,${-sh}px)`}
// typewriter
function typeText(e,full,p,cursor=true){const n=Math.floor(clamp(p)*full.length);e.textContent=full.slice(0,n)+(cursor&&n<full.length&&n>0?'▌':'')}
// counter
const fmt=n=>Math.round(n).toLocaleString('en-US');

// faceless silhouette (bust)
function silhouette(w=260,{fill='url(#sg)',stroke='none',glow=false,id='sg'}={}){
  const h=w*1.2;
  return `<svg width="${w}" height="${h}" viewBox="0 0 100 120" style="overflow:visible">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6570"/><stop offset="1" stop-color="#262d35"/></linearGradient></defs>
  ${glow?'<ellipse cx="50" cy="60" rx="46" ry="56" fill="rgba(226,55,44,.18)" filter="blur(6px)"/>':''}
  <path d="M8 120 C8 92 24 78 50 78 C76 78 92 92 92 120 Z" fill="${fill==='url(#sg)'?`url(#${id})`:fill}" stroke="${stroke}" stroke-width="1.5"/>
  <rect x="42" y="60" width="16" height="20" rx="6" fill="${fill==='url(#sg)'?`url(#${id})`:fill}"/>
  <ellipse cx="50" cy="38" rx="19.5" ry="24" fill="${fill==='url(#sg)'?`url(#${id})`:fill}" stroke="${stroke}" stroke-width="1.5"/>
  </svg>`}
// small person icon (for rows / org charts)
function person(size=60,color='#9aa3ab'){return `<svg width="${size}" height="${size*1.25}" viewBox="0 0 40 50"><circle cx="20" cy="13" r="10" fill="${color}"/><path d="M2 50 C2 34 10 27 20 27 C30 27 38 34 38 50 Z" fill="${color}"/></svg>`}

// dossier card
let cardN=0;
function card({name,role='',id='',x=0,y=0,w=420,ph=430,sil=330}){
  cardN++;const c=el('div','card',`<div class="ph" style="height:${ph}px">${silhouette(sil,{id:'sg'+cardN})}<i class="corner c1"></i><i class="corner c2"></i><i class="corner c3"></i><i class="corner c4"></i><span class="phid">${id}</span></div>
  <div class="nm">${name}</div><div class="bar"></div><div class="rl">${role}</div>`);
  c.style.width=w+'px';place(c,x,y);return c}

// ===== background (paper) =====
let BG,FX,GR,ROOT,SCENE_T=0;
const paper=(()=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#808080';g.fillRect(0,0,W,H);
  [[240,135,11,.9],[480,270,12,.6],[960,540,13,.45]].forEach(([w,h,s,a])=>{g.globalAlpha=a;g.drawImage(noiseCanvas(w,h,s,120),0,0,W,H)});
  g.globalAlpha=1;return c})();
const grains=[...Array(8)].map((_,i)=>noiseCanvas(960,540,100+i,255));
const BGOPT={dots:true,light:[.5,.45],tint:'#11161b'};
function drawBG(t){
  const g=BG;
  const lx=W*BGOPT.light[0]+Math.sin(t*.3)*40, ly=H*BGOPT.light[1];
  const gr=g.createRadialGradient(lx,ly,60,lx,ly,1300);gr.addColorStop(0,BGOPT.tint);gr.addColorStop(1,'#050709');
  g.fillStyle=gr;g.fillRect(0,0,W,H);
  g.globalCompositeOperation='overlay';g.globalAlpha=.35;g.drawImage(paper,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;
  if(BGOPT.dots){g.fillStyle='rgba(160,180,195,.07)';for(let x=40;x<W;x+=48)for(let y=36;y<H;y+=48){g.fillRect(x,y,2,2)}}
}
function drawGrain(t){GR.drawImage(grains[Math.floor(t*24)%grains.length],0,0)}
function flicker(t){const f=.035*Math.sin(t*37)+.02*Math.sin(t*91);FX.fillStyle=`rgba(0,0,0,${.04+f})`;FX.fillRect(0,0,W,H)}

// ===== maps =====
const mY=lat=>Math.log(Math.tan(Math.PI/4+clamp(lat,-85,85)*D2R/2))/D2R;
// cam: {lon,lat (anchor), ax,ay (screen pos of anchor), span (deg lon across width)}
function proj(cam,lon,lat){const k=W/cam.span;return[cam.ax+(lon-cam.lon)*k, cam.ay-(mY(lat)-mY(cam.lat))*k]}
function landPath(cam,rings){const p=new Path2D();
  for(const ring of rings){let minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9;const pts=[];let lastx=null,lasty=null;
    for(const [lo,la] of ring){const [x,y]=proj(cam,lo,la);
      if(lastx!==null&&Math.abs(x-lastx)<.6&&Math.abs(y-lasty)<.6)continue;lastx=x;lasty=y;
      pts.push(x,y);if(x<minx)minx=x;if(x>maxx)maxx=x;if(y<miny)miny=y;if(y>maxy)maxy=y}
    if(pts.length<6||maxx<-50||minx>W+50||maxy<-50||miny>H+50)continue;
    p.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)p.lineTo(pts[i],pts[i+1]);p.closePath()}
  return p}
function drawMap(g,cam,rings,{glowAt=null,glowR=520,graticule=true}={}){
  const sea=g.createRadialGradient(W/2,H/2,50,W/2,H/2,1400);sea.addColorStop(0,'#101820');sea.addColorStop(1,'#06090c');
  g.fillStyle=sea;g.fillRect(0,0,W,H);
  if(graticule){const step=cam.span>60?15:cam.span>20?5:cam.span>8?2:cam.span>2.5?1:.25;const k=W/cam.span;
    g.save();g.strokeStyle='rgba(120,150,170,.075)';g.lineWidth=1;g.setLineDash([2,6]);
    const lon0=cam.lon-cam.ax/k,lon1=cam.lon+(W-cam.ax)/k;
    for(let lo=Math.floor(lon0/step)*step;lo<=lon1;lo+=step){const x=cam.ax+(lo-cam.lon)*k;g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}
    for(let la=-80;la<=80;la+=step){const y=cam.ay-(mY(la)-mY(cam.lat))*k;if(y<0||y>H)continue;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
    g.restore()}
  const lp=landPath(cam,rings);
  g.save();g.shadowColor='rgba(0,0,0,.85)';g.shadowBlur=40;g.shadowOffsetY=10;g.fillStyle='#1a2027';g.fill(lp);g.restore();
  g.save();g.clip(lp);const lg=g.createLinearGradient(0,0,W,H);lg.addColorStop(0,'#252c34');lg.addColorStop(1,'#171c22');
  g.fillStyle=lg;g.fillRect(0,0,W,H);g.globalCompositeOperation='overlay';g.globalAlpha=.55;g.drawImage(paper,0,0);
  g.globalCompositeOperation='source-over';g.globalAlpha=1;
  (Array.isArray(glowAt)?glowAt:glowAt?[glowAt]:[]).forEach(([x,y,a=1])=>{const gl=g.createRadialGradient(x,y,0,x,y,glowR);gl.addColorStop(0,`rgba(226,55,44,${.16*a})`);gl.addColorStop(1,'rgba(226,55,44,0)');g.fillStyle=gl;g.fillRect(0,0,W,H)});
  g.restore();
  g.save();g.strokeStyle='rgba(190,205,215,.5)';g.lineWidth=1.4;g.lineJoin='round';g.stroke(lp);
  g.strokeStyle='rgba(120,170,200,.09)';g.lineWidth=8;g.stroke(lp);g.restore();
}
// red pin with pulse
function drawPin(g,x,y,p,t,{rings=true,color='226,55,44'}={}){if(p<=0)return;
  if(rings)for(let i=0;i<3;i++){const ph=((t*.8)+i/3)%1;g.beginPath();g.arc(x,y,12+ph*90,0,7);g.strokeStyle=`rgba(${color},${.5*(1-ph)*clamp(p)})`;g.lineWidth=2;g.stroke()}
  const s=eBack(p);g.save();g.shadowColor=`rgba(${color},.9)`;g.shadowBlur=24;g.beginPath();g.arc(x,y,10*s,0,7);g.fillStyle=`rgb(${color})`;g.fill();g.restore();
  g.beginPath();g.arc(x,y,3.6*s,0,7);g.fillStyle='#fff3ea';g.fill()}
// animated great-arc-ish curve between two screen points; p = draw progress
function drawArc(g,a,b,p,{lift=.25,dash=null,width=3,color='#e2372c',head=true}={}){if(p<=0)return;
  const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);
  const cx=mx+dy*lift*(dx>0?-1:1)*0, cy=my-L*lift;
  const N=80,pts=[];for(let i=0;i<=N*clamp(p);i++){const u=i/N;pts.push([(1-u)*(1-u)*a[0]+2*(1-u)*u*cx+u*u*b[0],(1-u)*(1-u)*a[1]+2*(1-u)*u*cy+u*u*b[1]])}
  g.save();g.strokeStyle=color;g.lineWidth=width;g.lineCap='round';g.shadowColor='rgba(226,55,44,.8)';g.shadowBlur=14;if(dash)g.setLineDash(dash);
  g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore();
  if(head&&pts.length>1){const [x,y]=pts[pts.length-1];g.beginPath();g.arc(x,y,6,0,7);g.fillStyle='#fff3ea';g.fill()}
  return pts[pts.length-1]}

// ===== boot =====
function boot(){
  ROOT=$('#root');BG=$('#bg').getContext('2d');FX=$('#fx').getContext('2d');GR=$('#grain').getContext('2d');
  SCENE.build();
  window.renderAt=t=>{SCENE_T=t;drawBG(t);FX.clearRect(0,0,W,H);SCENE.update(t);flicker(t);
    const fi=1-eOut(seg(t,0,SCENE.fadeIn??.35)),fo=SCENE.fadeOut?eIn(seg(t,SCENE.dur-SCENE.fadeOut,SCENE.dur)):0;
    const k=Math.max(fi,fo);if(k>0){FX.fillStyle=`rgba(0,0,0,${k})`;FX.fillRect(0,0,W,H)}drawGrain(t)};
  window.DUR=SCENE.dur;
  window.ready=document.fonts.ready.then(()=>{renderAt(0);return true});
  if(!/render=1/.test(location.search)){let t0=null;const loop=ts=>{if(t0===null)t0=ts;renderAt(((ts-t0)/1000)%(SCENE.dur+.5));requestAnimationFrame(loop)};requestAnimationFrame(loop)}
}

// ===== icon set (stroke icons, currentColor) =====
const IC={
 gavel:`<g fill="currentColor"><rect x="22" y="8" width="26" height="12" rx="3" transform="rotate(-40 35 14)"/><rect x="30" y="20" width="6" height="30" rx="2" transform="rotate(-40 33 35)"/><rect x="8" y="52" width="34" height="7" rx="2"/></g>`,
 pill:`<g fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="22" width="44" height="20" rx="10" transform="rotate(-35 32 32)"/><path d="M26 22 L38 42" transform="rotate(-35 32 32) translate(0 0)"/></g>`,
 money:`<g fill="none" stroke="currentColor" stroke-width="4"><rect x="6" y="18" width="52" height="28" rx="4"/><circle cx="32" cy="32" r="7"/><path d="M50 8 a24 24 0 0 1 8 14 M14 56 a24 24 0 0 1 -8 -14" stroke-linecap="round"/></g>`,
 threat:`<g fill="none" stroke="currentColor" stroke-width="4"><rect x="8" y="14" width="48" height="36" rx="4"/><path d="M8 18 L32 36 L56 18"/><path d="M32 54 v0" /></g>`,
 fist:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M18 28 h28 a6 6 0 0 1 6 6 v6 a14 14 0 0 1 -14 14 h-8 a12 12 0 0 1 -12 -12 z"/><path d="M18 28 v-8 a4 4 0 0 1 8 0 v8 M26 28 v-10 a4 4 0 0 1 8 0 v10 M34 28 v-10 a4 4 0 0 1 8 0 v10 M42 28 v-8 a4 4 0 0 1 8 0 v10"/></g>`,
 house:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M8 30 L32 10 L56 30"/><path d="M14 26 V54 H50 V26"/><rect x="27" y="38" width="10" height="16"/></g>`,
 anklet:`<g fill="none" stroke="currentColor" stroke-width="4"><ellipse cx="32" cy="36" rx="22" ry="10"/><rect x="22" y="30" width="20" height="16" rx="3" fill="#0e1216"/><circle cx="32" cy="38" r="3" fill="#e2372c" stroke="none"/></g>`,
 bomb:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="28" cy="38" r="16"/><path d="M38 24 l6 -6 M44 18 q4 -8 10 -6"/><path d="M56 6 l2 -3 M58 12 l4 0 M52 4 l0 -3"/></g>`,
 doc:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M14 6 H40 L52 18 V58 H14 Z"/><path d="M40 6 V18 H52 M22 30 H44 M22 38 H44 M22 46 H36"/></g>`,
 tv:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><rect x="6" y="16" width="52" height="38" rx="6"/><path d="M22 6 L32 16 L42 6"/></g>`,
 plane:`<g fill="currentColor"><path d="M30 4 c3 0 4 3 4 6 v14 l22 12 v6 l-22 -6 v12 l7 5 v5 l-11 -3 l-11 3 v-5 l7 -5 v-12 l-22 6 v-6 l22 -12 v-14 c0 -3 1 -6 4 -6 z"/></g>`,
 phone:`<g fill="none" stroke="currentColor" stroke-width="4"><path d="M16 6 h12 l4 12 l-7 5 a30 30 0 0 0 16 16 l5 -7 l12 4 v12 a4 4 0 0 1 -4 4 C28 52 12 36 12 10 a4 4 0 0 1 4 -4z"/></g>`,
 people:`<g fill="currentColor"><circle cx="22" cy="20" r="8"/><path d="M8 50 c0 -12 6 -18 14 -18 s14 6 14 18z"/><circle cx="44" cy="22" r="7" opacity=".7"/><path d="M34 50 c0 -10 5 -16 10 -16 s12 6 12 16z" opacity=".7"/></g>`,
 globe:`<g fill="none" stroke="currentColor" stroke-width="4"><circle cx="32" cy="32" r="24"/><ellipse cx="32" cy="32" rx="10" ry="24"/><path d="M8 32 H56 M12 20 H52 M12 44 H52"/></g>`,
 cash:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M12 24 h40 v30 h-40 z"/><path d="M20 24 v-8 h24 v8"/><circle cx="32" cy="39" r="6"/></g>`,
 chip:`<g fill="none" stroke="currentColor" stroke-width="4"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="12"/><path d="M32 10 v8 M32 46 v8 M10 32 h8 M46 32 h8"/></g>`,
 clock:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="32" cy="32" r="24"/><path d="M32 18 V32 L42 38"/></g>`,
 check:`<g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 34 L26 48 L52 16"/></g>`,
 cross:`<g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M16 16 L48 48 M48 16 L16 48"/></g>`,
 lock:`<g fill="none" stroke="currentColor" stroke-width="4"><rect x="14" y="28" width="36" height="28" rx="4"/><path d="M22 28 v-8 a10 10 0 0 1 20 0 v8"/></g>`,
 scales:`<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M32 8 V54 M18 54 H46 M12 16 H52"/><path d="M12 16 L4 34 H20 Z M52 16 L44 34 H60 Z"/></g>`,
};
function icon(name,size=64,color='#efe8da'){return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" style="color:${color};overflow:visible">${IC[name]}</svg>`}
// icon + label row element
function iconRow(name,label,{size=56,font=44,color='#efe8da',ic='#e2372c',gap=22}={}){
  const e=el('div','abs he',`<span style="display:inline-flex;align-items:center;gap:${gap}px">${icon(name,size,ic)}<span>${label}</span></span>`);
  Object.assign(e.style,{fontWeight:800,fontSize:font+'px',color,whiteSpace:'nowrap'});return e}
// pyramid positions for n nodes: rows sizes
function pyramidLayout(rows,cx,top,dx,dy){const P=[];rows.forEach((n,r)=>{for(let i=0;i<n;i++)P.push([cx+(i-(n-1)/2)*dx,top+r*dy,r])});return P}
// canvas person icon (for many small figures)
function drawPerson(g,x,y,s,color){g.fillStyle=color;g.beginPath();g.arc(x,y-s*.55,s*.32,0,7);g.fill();g.beginPath();g.moveTo(x-s*.5,y+s*.55);g.bezierCurveTo(x-s*.5,y-s*.05,x-s*.25,y-s*.15,x,y-s*.15);g.bezierCurveTo(x+s*.25,y-s*.15,x+s*.5,y-s*.05,x+s*.5,y+s*.55);g.closePath();g.fill()}
// map camera helper: interpolate between two views (log span)
function camLerp(a,b,p){return{lon:lerp(a.lon,b.lon,p),lat:lerp(a.lat,b.lat,p),ax:lerp(a.ax??960,b.ax??960,p),ay:lerp(a.ay??540,b.ay??540,p),span:Math.exp(lerp(Math.log(a.span),Math.log(b.span),p))}}
