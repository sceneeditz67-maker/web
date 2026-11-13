window.initRomeroExtras=function(){
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const chime=(kind)=>window.romeroChime?.(kind);
const photos=[
 {
  "src": "foto-romero-1.png",
  "title": "Halloween con encanto",
  "category": "especial",
  "tag": "Halloween",
  "desc": "Morado, naranja y negro: una decoración temática llena de detalles de Halloween."
 },
 {
  "src": "foto-romero-2.png",
  "title": "Una fiesta de abejitas",
  "category": "infantil",
  "tag": "Cumpleaños infantil",
  "desc": "Amarillo, rosa y flores para un cumpleaños lleno de alegría."
 },
 {
  "src": "foto-romero-3.png",
  "title": "Una patrulla de sonrisas",
  "category": "infantil",
  "tag": "Aventura infantil",
  "desc": "Globos multicolor y personajes para una celebración de pequeños aventureros."
 },
 {
  "src": "foto-romero-4.png",
  "title": "15 años en rojo y dorado",
  "category": "quince",
  "tag": "15 años",
  "desc": "Una combinación de rojo, dorado, mariposas y detalles para brillar."
 },
 {
  "src": "foto-romero-5.png",
  "title": "Una aventura tropical",
  "category": "infantil",
  "tag": "Temática tropical",
  "desc": "Colores vivos, flores y palmeras en una decoración infantil tropical."
 },
 {
  "src": "foto-romero-6.png",
  "title": "Pequeños detalles de abejita",
  "category": "infantil",
  "tag": "Primer cumpleaños",
  "desc": "Un rincón con flores, globos y detalles delicados para celebrar su primer añito."
 },
 {
  "src": "foto-romero-7.png",
  "title": "Mis 15, un día para soñar",
  "category": "quince",
  "tag": "15 años en rosa",
  "desc": "Rosa, dorado y un fondo brillante para una celebración muy especial."
 },
 {
  "src": "foto-romero-8.png",
  "title": "Mis 15 bajo las luces",
  "category": "quince",
  "tag": "Ambientación de noche",
  "desc": "La decoración rosa y dorada luce diferente al encender las luces."
 },
 {
  "src": "foto-romero-9.png",
  "title": "¿Niño o niña?",
  "category": "familia",
  "tag": "Revelación de género",
  "desc": "Rosa y celeste con detalles dorados para compartir una gran sorpresa."
 },
 {
  "src": "foto-romero-10.png",
  "title": "Tres añitos a todo color",
  "category": "infantil",
  "tag": "Cumpleaños infantil",
  "desc": "Azul, verde, amarillo y naranja en una fiesta llena de personajes y color."
 }
];
const photoCard=(p,i)=>`<button class="gallery-card" data-photo="${i}" data-gallery-category="${p.category}" aria-label="Ampliar imagen: ${p.title}"><span class="gallery-photo"><img src="assets/${p.src}" alt="${p.title}, decoración de Creaciones Romero" loading="lazy"><span class="zoom-badge">${icon('spark')} Ver de cerca</span></span><span class="gallery-caption"><span class="eyebrow">${p.tag}</span><strong>${p.title}</strong><span class="gallery-plus" aria-hidden="true">↗</span></span></button>`;
const gallerySection=(all=false)=>`<section class="container section inspiration-section"><div class="section-heading"><div><span class="eyebrow">DECORACIONES CREACIONES ROMERO</span><h2>${all?'Detalles de nuestras celebraciones.':'Así decoramos<br>momentos especiales.'}</h2></div><p>Toca una foto y descubre los detalles.<br>¿Cuál va más contigo?</p></div>${all?`<div class="gallery-filters" role="group" aria-label="Filtrar fotos"><button class="gallery-filter active" data-gallery-filter="all" aria-pressed="true">Todas las fotos</button><button class="gallery-filter" data-gallery-filter="infantil" aria-pressed="false">Fiestas infantiles</button><button class="gallery-filter" data-gallery-filter="familia" aria-pressed="false">Revelación de género</button><button class="gallery-filter" data-gallery-filter="quince" aria-pressed="false">15 años</button><button class="gallery-filter" data-gallery-filter="especial" aria-pressed="false">Halloween</button></div>`:''}<div class="gallery-grid">${(all?photos:photos.slice(1,4)).map(p=>photoCard(p,photos.indexOf(p))).join('')}</div><div class="gallery-foot"><p class="subtle-note">Fotos compartidas por Creaciones Romero. Consulta los elementos disponibles y una propuesta para tu celebración.</p>${!all?'<a class="text-link" href="galeria.html">Ver todas las decoraciones '+icon('arrow')+'</a>':''}</div></section>`;
const questions=[['¿Cómo puedo reservar una decoración?','Envíanos la fecha, el lugar y la temática que tienes en mente por WhatsApp o desde el formulario. Primero confirmaremos disponibilidad, precio y condiciones de reserva contigo.'],['¿Puedo elegir la temática y los colores?','¡Sí! Cuéntanos tu idea o comparte una imagen de referencia. La propuesta y los elementos disponibles se acuerdan de forma personalizada al cotizar.'],['¿Cómo se coordina el montaje de la decoración?','Consulta las opciones para tu zona. La disponibilidad, el montaje, los horarios y cualquier costo de traslado se confirman antes de reservar.'],['¿Cuánto cuesta la decoración?','Depende del tipo de celebración, el tamaño del espacio y los elementos elegidos. Solicita una cotización con tu idea y presupuesto para conversar sobre las opciones.'],['¿Con cuánta anticipación debo consultar?','Te recomendamos consultar en cuanto tengas una fecha. Así podemos revisar la disponibilidad; completar el formulario no confirma automáticamente una reserva.']];
const faq=()=>`<section class="faq-section container section"><div><span class="eyebrow">ANTES DE TU GRAN DÍA</span><h2>Pequeñas dudas.<br>Respuestas con cariño.</h2><p>Y si tienes otra pregunta,<br>nos encantará conversar contigo.</p><a class="text-link" href="${wa('¡Hola! Tengo una pregunta sobre mi celebración.')}" target="_blank" rel="noopener">Preguntar por WhatsApp ${icon('arrow')}</a></div><div class="faq-list">${questions.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><div class="faq-answer"><p>${a}</p></div></details>`).join('')}</div></section>`;
const moods=[{"name": "Tropical", "tone": "#7ca45f", "photo": 4, "copy": "Flores, palmeras y colores vivos para una aventura tropical.", "palette": ["#f74b85", "#66bd46", "#ffd529"], "label": "Cumpleaños tropical", "tags": ["Colores vivos", "Flores tropicales", "Fondo temático"]}, {"name": "15 años", "tone": "#c9959e", "photo": 6, "copy": "Rosa, dorado y un toque de brillo para una fecha inolvidable.", "palette": ["#ef9aba", "#d7ac42", "#fff3d4"], "label": "Un día para brillar", "tags": ["Rosa y dorado", "Detalles con luz", "Tu gran momento"]}, {"name": "Halloween", "tone": "#8b58a5", "photo": 0, "copy": "Naranja, morado y personajes para una fiesta de Halloween.", "palette": ["#8d43ad", "#f88121", "#282131"], "label": "Una fiesta de otro mundo", "tags": ["Morado y naranja", "Personajes temáticos", "Detalles divertidos"]}, {"name": "Revelación", "tone": "#9fbbca", "photo": 8, "copy": "Rosa y celeste para compartir una de las sorpresas más bonitas.", "palette": ["#edacc7", "#9bd0eb", "#d5b35d"], "label": "Una gran sorpresa", "tags": ["Rosa y celeste", "Globos en flor", "Un recuerdo especial"]}, {"name": "Abejitas", "tone": "#ecc933", "photo": 1, "copy": "Amarillo, rosa y flores: pura ternura para su cumpleaños.", "palette": ["#f8d730", "#ee65a5", "#fff2c0"], "label": "Dulce como su sonrisa", "tags": ["Abejitas y flores", "Colores alegres", "Primeros cumpleaños"]}, {"name": "Patrulla", "tone": "#369fda", "photo": 2, "copy": "Sus personajes favoritos y una misión: celebrar con mucha alegría.", "palette": ["#279ce6", "#f2d429", "#ef564d"], "label": "Una aventura en equipo", "tags": ["Personajes favoritos", "Mucho color", "Cumpleaños infantil"]}, {"name": "A todo color", "tone": "#f38835", "photo": 9, "copy": "Azul, verde, amarillo y naranja para una fiesta llena de energía.", "palette": ["#13b7d4", "#85d641", "#ffbd28"], "label": "Que empiece la diversión", "tags": ["Colores intensos", "Temática infantil", "Grandes sonrisas"]}];
const moodSection=()=>`<section class="mood-section"><div class="container mood-layout"><div class="mood-visual-column"><div class="mood-image"><img id="mood-photo" src="assets/${photos[4].src}" alt="Decoración tropical de Creaciones Romero"><span class="mood-image-note">Tu fiesta, tu esencia ♡</span></div><button class="mood-full-photo text-link" data-photo="4" id="mood-open-photo">${icon('spark')} Ver esta foto completa ${icon('arrow')}</button><div class="mood-mini-gallery"><span class="eyebrow">MÁS DECORACIONES, MÁS IDEAS</span><div>${[5,7,3].map(i=>`<button class="mood-mini-photo" data-photo="${i}" aria-label="Ver ${photos[i].title}"><img src="assets/${photos[i].src}" alt="${photos[i].title}" loading="lazy"><span>↗</span></button>`).join('')}</div></div></div><div class="mood-copy"><span class="eyebrow">JUGUEMOS CON LAS IDEAS</span><h2>¿Qué estilo va<br>con tu celebración?</h2><p>Explora las temáticas y añade tu propio toque.</p><div class="mood-options" role="group" aria-label="Estilo de decoración">${moods.map((m,i)=>`<button class="mood-choice ${i===0?'selected':''}" data-mood="${i}" aria-pressed="${i===0}"><span style="--swatch:${m.tone}"><img src="assets/${photos[m.photo].src}" alt="" loading="lazy"></span>${m.name}</button>`).join('')}</div><div class="mood-detail-panel" id="mood-detail-panel"><span class="eyebrow" id="mood-label">${moods[0].label}</span><p id="mood-description" aria-live="polite">${moods[0].copy}</p><div class="mood-palette"><span>Su paleta</span><div id="mood-colors">${moods[0].palette.map(c=>`<span style="background:${c}"></span>`).join('')}</div></div><div class="mood-tags" id="mood-tags">${moods[0].tags.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="mood-personalize"><h3>¡Ahora dale tu toque!</h3><p>Marca lo que te gustaría consultar:</p><div class="mood-extras" role="group" aria-label="Detalles para consultar">${['Más globos','Detalles con luces','Flores','Un nombre especial'].map(t=>`<button class="mood-extra" data-detail="${t}" aria-pressed="false"><span aria-hidden="true">＋</span>${t}</button>`).join('')}</div><span class="mood-selection-note" id="mood-selection-note" aria-live="polite">Tu idea empieza aquí. Nosotros te ayudamos a darle forma.</span></div><a class="button primary" id="mood-quote" href="contacto.html?servicio=Decoraci%C3%B3n">¡Cotizar mi idea! ${icon('arrow')}</a><a class="mood-see-gallery text-link" href="galeria.html">Explorar todas las fotos ${icon('arrow')}</a><p class="mood-terms">Las opciones son ideas para consultar. Disponibilidad, elementos incluidos y precio se confirman al cotizar.</p></div></div></section>`;
const surprise=()=>`<section class="celebrate-strip container"><span class="celebrate-spark">✳</span><div><span class="eyebrow">SIEMPRE HAY UN MOTIVO</span><h3>Un clic, una pequeña alegría.</h3><p>Porque planear una fiesta también puede ser divertido.</p></div><button class="button celebration-button" id="celebrate-button">¡Un poquito de magia! ${icon('spark')}</button><span class="celebrate-status" role="status" aria-live="polite"></span></section>`;
const navEl=document.getElementById('navigation');const galleryLink=document.createElement('a');galleryLink.href='galeria.html';galleryLink.textContent='Galería';if(path==='galeria.html'){galleryLink.className='active';galleryLink.setAttribute('aria-current','page');navEl.querySelector('[aria-current]')?.removeAttribute('aria-current');navEl.querySelectorAll('.active').forEach(n=>n.classList.remove('active'))}navEl.insertBefore(galleryLink,navEl.querySelector('.nav-contact'));
if(path==='galeria.html'){document.querySelector('main').innerHTML=pageTop('NUESTRAS DECORACIONES','Mucho color.<br>Recuerdos de <em>verdad.</em>','Cumpleaños infantiles, 15 años, revelaciones y fiestas temáticas. Explora las fotos de Creaciones Romero y cuéntanos cuál te gusta.')+gallerySection(true)+surprise()+cta();document.title='Nuestras decoraciones · Creaciones Romero';document.querySelector('.inspiration-section').classList.add('full-gallery');}
else{const main=document.querySelector('main');const anchor=main.querySelector('.cta');if(path==='index.html'||path===''){anchor.insertAdjacentHTML('beforebegin',gallerySection()+moodSection()+faq()+surprise())}else if(path==='decoracion.html'){anchor.insertAdjacentHTML('beforebegin',gallerySection()+moodSection())}else if(path==='contacto.html'){main.insertAdjacentHTML('beforeend',faq())}}
document.querySelectorAll('main .reveal').forEach(el=>observer.observe(el));
document.querySelector('.footer-main>div')?.insertAdjacentHTML('beforeend','<a href="galeria.html">Nuestras decoraciones</a>');
const social=`<section class="social-section container"><div class="social-visual"><img src="assets/foto-romero-8.png" alt="Decoración de 15 años con luces de Creaciones Romero" loading="lazy"><span class="social-photo-label">Nuestros detalles, en movimiento.</span></div><div class="social-copy"><span class="eyebrow">MÁS COLOR, MÁS IDEAS, MÁS ROMERO</span><span class="tiktok-symbol" aria-hidden="true">♪</span><h2>La fiesta también<br>se vive en TikTok.</h2><p>Conoce más de nuestras decoraciones y encuentra ideas para tu próximo gran día.</p><a class="button" href="https://www.tiktok.com/@ly.de.romero" target="_blank" rel="noopener noreferrer">Ver @ly.de.romero ↗</a><span class="social-note">Se abre nuestro perfil en una pestaña nueva.</span></div></section>`;
if(['index.html','galeria.html','nosotros.html'].includes(path)){document.querySelector('main .cta').insertAdjacentHTML('beforebegin',social)}
// Lightbox: native dialog, keyboard navigation, and a personalized quote link.
document.body.insertAdjacentHTML('beforeend',`<dialog class="photo-dialog" id="photo-dialog" aria-label="Imagen ampliada"><button class="photo-close" aria-label="Cerrar imagen">×</button><div class="lightbox-stage"><button class="photo-prev" aria-label="Foto anterior">‹</button><img id="lightbox-image" alt=""><button class="photo-next" aria-label="Foto siguiente">›</button></div><div class="lightbox-info"><div><span id="lightbox-count" class="eyebrow"></span><h3 id="lightbox-title"></h3><p id="lightbox-description"></p><span class="lightbox-note">Decoración Creaciones Romero · Consulta disponibilidad</span></div><a class="button primary" id="lightbox-quote" href="contacto.html?servicio=Decoraci%C3%B3n">Quiero algo así ${icon('arrow')}</a></div></dialog>`);
const lightbox=document.getElementById('photo-dialog');let current=0;
function setPhoto(i){current=(i+photos.length)%photos.length;const p=photos[current];const img=document.getElementById('lightbox-image');img.src='assets/'+p.src;img.alt=p.title+' — Creaciones Romero';img.classList.remove('photo-enter');void img.offsetWidth;img.classList.add('photo-enter');document.getElementById('lightbox-title').textContent=p.title;document.getElementById('lightbox-description').textContent=p.desc;document.getElementById('lightbox-count').textContent=`FOTO ${current+1} / ${photos.length} · ${p.tag}`;document.getElementById('lightbox-quote').href=wa(`¡Hola, Creaciones Romero! Me gusta la idea «${p.title}» de la galería. Quisiera consultar opciones y cotizar algo similar para mi evento.`)}
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{setPhoto(Number(b.dataset.photo));lightbox.showModal()}));
lightbox.querySelector('.photo-close').onclick=()=>lightbox.close();lightbox.querySelector('.photo-prev').onclick=()=>setPhoto(current-1);lightbox.querySelector('.photo-next').onclick=()=>setPhoto(current+1);lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();setPhoto(current-1);chime('photo')}if(e.key==='ArrowRight'){e.preventDefault();setPhoto(current+1);chime('photo')}});
document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-gallery-filter]').forEach(other=>{other.classList.toggle('active',b===other);other.setAttribute('aria-pressed',String(b===other))});document.querySelectorAll('[data-gallery-category]').forEach(card=>{card.hidden=b.dataset.galleryFilter!=='all'&&card.dataset.galleryCategory!==b.dataset.galleryFilter})});
let chosenMood=0;const chosenDetails=new Set();
function refreshMoodQuote(){const m=moods[chosenMood];const details=[...chosenDetails];const quote=document.getElementById('mood-quote');if(quote)quote.href=wa(`¡Hola, Creaciones Romero! Me gusta el estilo ${m.name} de su página. ${details.length?'Me gustaría consultar: '+details.join(', ')+'. ':''}Quisiera una cotización para mi celebración.`);const note=document.getElementById('mood-selection-note');if(note)note.textContent=details.length?`${details.length} detalle${details.length===1?'':'s'} para consultar: ${details.join(' · ')}`:'Tu idea empieza aquí. Nosotros te ayudamos a darle forma.'}
document.querySelectorAll('[data-mood]').forEach(b=>b.onclick=()=>{chosenMood=Number(b.dataset.mood);const m=moods[chosenMood];document.querySelectorAll('[data-mood]').forEach(other=>{other.classList.toggle('selected',b===other);other.setAttribute('aria-pressed',String(b===other))});const img=document.getElementById('mood-photo');img.src='assets/'+photos[m.photo].src;img.alt='Decoración Creaciones Romero: '+m.name;img.classList.remove('photo-enter');void img.offsetWidth;img.classList.add('photo-enter');document.getElementById('mood-open-photo').dataset.photo=String(m.photo);document.getElementById('mood-description').textContent=m.copy;document.getElementById('mood-label').textContent=m.label;document.getElementById('mood-colors').innerHTML=m.palette.map(c=>`<span style="background:${c}"></span>`).join('');document.getElementById('mood-tags').innerHTML=m.tags.map(t=>`<span>${t}</span>`).join('');const panel=document.getElementById('mood-detail-panel');panel.classList.remove('detail-enter');void panel.offsetWidth;panel.classList.add('detail-enter');refreshMoodQuote()});
document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>{const value=b.dataset.detail;if(chosenDetails.has(value)){chosenDetails.delete(value)}else{chosenDetails.add(value)}const active=chosenDetails.has(value);b.setAttribute('aria-pressed',String(active));b.classList.toggle('selected',active);b.querySelector('span').textContent=active?'✓':'＋';refreshMoodQuote()});refreshMoodQuote();
const rentalForm=document.getElementById('rental-request-form');if(rentalForm){const rentalPhone=rentalForm.elements.telefono;const cleanRentalPhone=()=>{rentalPhone.value=rentalPhone.value.replace(/[^0-9]/g,'').slice(0,8);rentalPhone.setCustomValidity(rentalPhone.value&&rentalPhone.value.length!==8?'Ingresa exactamente 8 dígitos numéricos.':'')};rentalPhone.addEventListener('input',cleanRentalPhone);rentalPhone.addEventListener('change',cleanRentalPhone);rentalPhone.addEventListener('paste',e=>{e.preventDefault();const digits=(e.clipboardData.getData('text')||'').replace(/[^0-9]/g,'');const start=rentalPhone.selectionStart??rentalPhone.value.length;const end=rentalPhone.selectionEnd??start;rentalPhone.value=(rentalPhone.value.slice(0,start)+digits+rentalPhone.value.slice(end)).slice(0,8);cleanRentalPhone()});const quantity=rentalForm.elements.cantidad;const product=rentalForm.elements.producto;const cover=rentalForm.elements.funda;const day=rentalForm.elements.fecha;const now=new Date();day.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;function updateRental(){document.getElementById('rental-quantity-label').textContent=product.value==='sillas infantiles'?'Cantidad de sillas *':product.value==='sillas y mesas'?'Cantidad total de unidades *':'Cantidad de mesas *';document.getElementById('rental-summary').textContent=`Tu consulta: ${quantity.value||'—'} ${product.value} · ${cover.value.toLowerCase()}${rentalForm.elements.decoracion.checked?' + decoración':''}.`}document.querySelectorAll('[data-quantity]').forEach(b=>b.onclick=()=>{quantity.value=String(Math.max(1,Math.min(1000,(Number(quantity.value)||1)+Number(b.dataset.quantity))));updateRental()});quantity.addEventListener('input',updateRental);product.addEventListener('change',updateRental);cover.addEventListener('change',updateRental);rentalForm.elements.decoracion.addEventListener('change',updateRental);rentalForm.addEventListener('submit',async e=>{
  e.preventDefault();if(!rentalForm.reportValidity())return;
  const d=Object.fromEntries(new FormData(rentalForm));
  const resumen=`Producto: ${d.producto}\nCantidad: ${d.cantidad}\nPresentación: ${d.funda}\nFecha: ${d.fecha}\nLugar: ${d.lugar||'Por definir'}\n${d.decoracion?'También me interesa cotizar la decoración.':''}`;
  const text=`¡Hola, Creaciones Romero! Quisiera consultar alquiler para mi evento.\n\nNombre: ${d.nombre}\nTeléfono: ${d.telefono}\n${resumen}\n\n¿Podrían confirmarme modelos, medidas, fundas, precio, disponibilidad y opciones de entrega y recojo?`;
  const button=rentalForm.querySelector('[type=submit]');const label=button.textContent;
  button.disabled=true;button.textContent='Guardando y preparando WhatsApp…';
  const [result]=await Promise.all([
    window.romeroRecordInquiry?.({...d,kind:'alquiler',acepta:true,origen:'alquiler',resumen})||Promise.resolve({saved:false}),
    new Promise(resolve=>setTimeout(resolve,450))
  ]);
  button.disabled=false;button.textContent=label;
  window.open(wa(text),'_blank','noopener,noreferrer');
  if(!result.saved){
    const summary=document.getElementById('rental-summary');
    if(summary)summary.textContent='WhatsApp está listo. La solicitud quedó en cola para registrarse al recuperar la conexión.';
  }
 });
updateRental()}
document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false})}));
let confettiBusy=false;document.getElementById('celebrate-button')?.addEventListener('click',()=>{if(confettiBusy)return;const status=document.querySelector('.celebrate-status');status.textContent='¡Que nunca falten motivos para celebrar! ♡';if(reduced.matches)return;confettiBusy=true;const colors=['#f24d9f','#7139d2','#ffe66a','#40bc8e','#58b7ff'];for(let i=0;i<48;i++){const piece=document.createElement('span');piece.className='confetti-piece';piece.style.cssText=`left:${10+Math.random()*80}vw;--drift:${(Math.random()-.5)*250}px;--spin:${Math.random()*900}deg;background:${colors[i%colors.length]};animation-delay:${Math.random()*.25}s;border-radius:${i%3===0?'50%':'2px'}`;document.body.appendChild(piece);setTimeout(()=>piece.remove(),2600)}setTimeout(()=>confettiBusy=false,2600)});
};
window.initRomeroExtras();
