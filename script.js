document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-check]').forEach(box=>{box.addEventListener('change',()=>{if(box.checked){document.querySelectorAll(`[data-check="${box.dataset.check}"]`).forEach(x=>{if(x!==box)x.checked=false})}})});document.querySelectorAll('input[type=file]').forEach(i=>i.addEventListener('change',()=>{if(i.files.length)i.nextElementSibling?.classList.add('ok')}));document.querySelectorAll('.firma').forEach(c=>{let ctx=c.getContext('2d'),d=false;c.width=c.clientWidth*2;c.height=c.clientHeight*2;ctx.scale(2,2);const p=e=>{let r=c.getBoundingClientRect();return{x:(e.touches?e.touches[0].clientX:e.clientX)-r.left,y:(e.touches?e.touches[0].clientY:e.clientY)-r.top}};const start=e=>{d=true;let q=p(e);ctx.beginPath();ctx.moveTo(q.x,q.y);e.preventDefault()};const move=e=>{if(!d)return;let q=p(e);ctx.lineTo(q.x,q.y);ctx.stroke();e.preventDefault()};c.addEventListener('mousedown',start);c.addEventListener('mousemove',move);window.addEventListener('mouseup',()=>d=false);c.addEventListener('touchstart',start,{passive:false});c.addEventListener('touchmove',move,{passive:false});c.addEventListener('touchend',()=>d=false)});});function imprimir(){window.print()}

document.addEventListener("DOMContentLoaded",()=>{
 const c=document.getElementById("firma"), b=document.getElementById("limpiarFirma");
 if(!c)return; const ctx=c.getContext("2d"); ctx.lineWidth=2.5; ctx.lineCap="round"; ctx.strokeStyle="#17324d"; let d=false;
 const pos=e=>{const r=c.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return{x:(p.clientX-r.left)*c.width/r.width,y:(p.clientY-r.top)*c.height/r.height}};
 const start=e=>{e.preventDefault();d=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};
 const move=e=>{if(!d)return;e.preventDefault();const p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke()};
 const end=e=>{if(d){e.preventDefault();d=false;ctx.closePath()}};
 c.addEventListener("mousedown",start);c.addEventListener("mousemove",move);window.addEventListener("mouseup",end);c.addEventListener("touchstart",start,{passive:false});c.addEventListener("touchmove",move,{passive:false});c.addEventListener("touchend",end,{passive:false});c.addEventListener("touchcancel",end,{passive:false});
 b.addEventListener("click",()=>ctx.clearRect(0,0,c.width,c.height));
});


// Compatibilidad adicional para pantallas táctiles y lápiz digital.
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("firma");
  if (!canvas || canvas.dataset.pointerReady) return;
  canvas.dataset.pointerReady = "1";
  const ctx = canvas.getContext("2d");
  let drawing = false;
  const point = e => { const r=canvas.getBoundingClientRect(); return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}; };
  canvas.addEventListener("pointerdown", e => { drawing=true; canvas.setPointerCapture?.(e.pointerId); const p=point(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); });
  canvas.addEventListener("pointermove", e => { if(!drawing)return; const p=point(e); ctx.lineTo(p.x,p.y); ctx.stroke(); });
  canvas.addEventListener("pointerup", () => drawing=false);
  canvas.addEventListener("pointercancel", () => drawing=false);
});
