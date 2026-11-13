window.initRomeroMotion=function(){
 window.cleanupRomeroMotion?.();
 const events=new AbortController();
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 const cardSelector='.social-section,.service-card,.gallery-card,.rental-product-card,.contact-card,.quote-form,.theme-card,.cta,.mood-detail-panel,.rental-teaser,.rental-request-form,.info-grid article,.steps article,.faq-list details,.mood-mini-photo,.celebrate-strip';
 const cards=[...document.querySelectorAll(cardSelector)];
 const scenes=[...document.querySelectorAll('main > section,main > .ribbon')];
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 cards.forEach(card=>{
  card.classList.add('alive-card');
  card.addEventListener('pointermove',event=>{
   if(preference.matches||!finePointer.matches)return;
   const rect=card.getBoundingClientRect();
   const x=(event.clientX-rect.left)/rect.width-.5;
   const y=(event.clientY-rect.top)/rect.height-.5;
   card.style.setProperty('--tilt-x',`${(-y*3).toFixed(2)}deg`);
   card.style.setProperty('--tilt-y',`${(x*3).toFixed(2)}deg`);
  });
  card.addEventListener('pointerleave',()=>{
   card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');
  });
 });
 const sceneObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   const el=entry.target;
   el.classList.toggle('ambient-active',entry.isIntersecting);
   if(preference.matches)return;
   if(entry.isIntersecting){
    el.classList.remove('scene-in');void el.offsetWidth;el.classList.add('scene-in');
   }else el.classList.remove('scene-in');
  });
 },{threshold:.08});
 scenes.forEach(scene=>{scene.classList.add('motion-scene');sceneObserver.observe(scene)});
 document.addEventListener('pointerup',event=>{
  if(preference.matches||!(event.target instanceof Element))return;
  if(event.target.closest('input,textarea,select,label'))return;
  const card=event.target.closest('.alive-card');
  if(!card)return;
  card.classList.remove('alive-tap');void card.offsetWidth;card.classList.add('alive-tap');
  setTimeout(()=>card.classList.remove('alive-tap'),650);
 },{signal:events.signal});
 preference.addEventListener('change',()=>{
  if(preference.matches)document.querySelectorAll('.scene-in,.alive-tap').forEach(el=>el.classList.remove('scene-in','alive-tap'));
 },{signal:events.signal});
 window.cleanupRomeroMotion=()=>{events.abort();sceneObserver.disconnect()};
};
window.initRomeroMotion();
