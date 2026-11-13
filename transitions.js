(() => {
 // Persistent document navigation: remount the page, not the music or click audio.
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const routes=new Set(['index.html','galeria.html','decoracion.html','nosotros.html','contacto.html','alquiler.html']);
 const names={'index.html':'Vamos al inicio','galeria.html':'Descubre nuestras decoraciones','decoracion.html':'Encuentra tu estilo','nosotros.html':'Conoce Creaciones Romero','contacto.html':'¡Empecemos a planear tu fiesta!','alquiler.html':'Sillas, mesas y muchas ideas para tu fiesta'};
 const layer=document.createElement('div');layer.className='route-transition';layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<div class="route-panel route-panel-one"></div><div class="route-panel route-panel-two"></div><div class="route-panel route-panel-three"></div><div class="route-message"><span class="route-flower">✳</span><span class="route-small">CREACIONES ROMERO</span><strong>¡La magia continúa!</strong><span class="route-destination">Más ideas para tu celebración</span></div>';
 document.body.appendChild(layer);
 let navigating=false,generation=0,exitTimer,enterTimer;
 if('scrollRestoration' in history)history.scrollRestoration='manual';
 history.replaceState({...(history.state||{}),romero:true},'',location.href);
 function render(){
  window.renderRomeroPage();window.initRomeroExtras();window.initRomeroMotion();window.initRomeroCalendar();
  window.scrollTo({top:0,left:0,behavior:'instant'});
  const heading=document.querySelector('main h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
 }
 function navigate(url,push=true){
  if(navigating&&push)return;
  const run=++generation;navigating=true;clearTimeout(exitTimer);clearTimeout(enterTimer);
  const route=window.romeroRouteFromPath(url.pathname);
  layer.querySelector('.route-destination').textContent=names[route]||'Más ideas para tu celebración';
  layer.classList.remove('is-leaving','is-arriving');
  if(!reduced.matches){void layer.offsetWidth;layer.classList.add('is-leaving');document.documentElement.classList.add('page-is-leaving')}
  exitTimer=setTimeout(()=>{
   if(run!==generation)return;
   try{
    if(push)history.pushState({romero:true},'',url.href);
    render();
    // This does not reload the document; both AudioContexts keep running here.
    layer.classList.remove('is-leaving');document.documentElement.classList.remove('page-is-leaving');
    if(!reduced.matches){void layer.offsetWidth;layer.classList.add('is-arriving')}
    enterTimer=setTimeout(()=>{if(run!==generation)return;layer.classList.remove('is-arriving');navigating=false;document.dispatchEvent(new CustomEvent('romero:navigated',{detail:{route}}))},reduced.matches?0:720);
   }catch(error){
    console.error('No se pudo actualizar la página',error);
    layer.classList.remove('is-leaving','is-arriving');document.documentElement.classList.remove('page-is-leaving');navigating=false;
    location.assign(url.href);
   }
  },reduced.matches?0:440);
 }
 document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||!(event.target instanceof Element))return;
  const link=event.target.closest('a[href]');if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self')||link.hasAttribute('data-no-transition'))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||!['http:','https:','file:'].includes(url.protocol))return;
  const route=window.romeroRouteFromPath(url.pathname);if(!routes.has(route))return;
  event.preventDefault();
  if(route===window.romeroRouteFromPath(location.pathname)&&url.search===location.search){
   if(url.hash){document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({behavior:reduced.matches?'auto':'smooth'})}
   else window.scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'});
   document.querySelector('nav')?.classList.remove('open');document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');return;
  }
  navigate(url,true);
 });
 window.addEventListener('popstate',()=>{const url=new URL(location.href);if(routes.has(window.romeroRouteFromPath(url.pathname)))navigate(url,false)});
})();
