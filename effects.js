(() => {
// Persistent click effects; initialized once, never on page transitions.
let audio,master,lastSound=0;
const soundProfiles={
 tap:{notes:[510],wave:'sine',length:.09,level:.32,bend:.62},
 button:{notes:[587.33,783.99],wave:'sine',length:.17,level:.4,gap:.055},
 photo:{notes:[1046.5,698.46],wave:'triangle',length:.12,level:.3,gap:.055},
 filter:{notes:[659.25,880],wave:'sine',length:.12,level:.34,gap:.035},
 mood:{notes:[523.25,659.25,783.99],wave:'sine',length:.17,level:.35,gap:.05},
 field:{notes:[420],wave:'sine',length:.08,level:.25,bend:1.3},
 faq:{notes:[440,587.33],wave:'sine',length:.15,level:.32,gap:.035},
 close:{notes:[659.25,440],wave:'sine',length:.1,level:.3,gap:.045},
 message:{notes:[659.25,830.61,987.77],wave:'sine',length:.16,level:.4,gap:.05},
 social:{notes:[493.88,739.99,987.77],wave:'triangle',length:.12,level:.3,gap:.06},
 nav:{notes:[523.25,783.99],wave:'triangle',length:.1,level:.34,gap:.035},
 celebrate:{notes:[523.25,659.25,783.99,1046.5],wave:'sine',length:.24,level:.4,gap:.085}
};
function chime(kind='tap'){
 try{
  const tick=performance.now();if(tick-lastSound<45)return;lastSound=tick;
  const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
  if(!audio){audio=new Ctx();master=audio.createGain();master.gain.value=1;const limiter=audio.createDynamicsCompressor();limiter.threshold.value=-3;limiter.knee.value=3;limiter.ratio.value=12;limiter.attack.value=.003;limiter.release.value=.08;master.connect(limiter);limiter.connect(audio.destination)}
  if(audio.state==='suspended')audio.resume().catch(()=>{});if(audio.state==='closed')return;
  const profile=soundProfiles[kind]||soundProfiles.tap,now=audio.currentTime;
  profile.notes.forEach((frequency,i)=>{
   const oscillator=audio.createOscillator(),gain=audio.createGain(),start=now+i*(profile.gap||.04);
   oscillator.type=profile.wave;oscillator.frequency.setValueAtTime(frequency,start);
   if(profile.bend)oscillator.frequency.exponentialRampToValueAtTime(frequency*profile.bend,start+profile.length);
   gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(profile.level,start+.008);gain.gain.exponentialRampToValueAtTime(.0001,start+profile.length);
   oscillator.connect(gain);gain.connect(master);oscillator.start(start);oscillator.stop(start+profile.length+.025)
  });
  document.dispatchEvent(new CustomEvent('romero:sound',{detail:{kind,volume:master.gain.value}}));
 }catch{}
}
function soundFor(target){
 if(target.closest('#celebrate-button'))return 'celebrate';
 if(target.closest('.photo-close,.close-dialog'))return 'close';
 if(target.closest('.gallery-card,.photo-prev,.photo-next,.photo-shape,.card-image'))return 'photo';
 if(target.closest('[data-mood],[data-detail],[data-quantity]'))return 'mood';
 if(target.closest('[data-gallery-filter],.filter'))return 'filter';
 if(target.closest('.calendar-day,.calendar-trigger,.calendar-today,.calendar-clear,input,select,textarea,label'))return 'field';if(target.closest('[data-calendar-nav],.calendar-month-title'))return 'filter';
 if(target.closest('summary'))return 'faq';
 if(target.closest('a[href*="wa.me"],.submit-button,#dialog-wa'))return 'message';
 if(target.closest('a[href*="tiktok.com"]'))return 'social';
 if(target.closest('nav,.brand,.menu-toggle'))return 'nav';
 if(target.closest('button,.button,.service-card,.text-link,a'))return 'button';
 return 'tap';
}
// Includes the page background; capture also covers clicks inside dialogs.
document.addEventListener('click',event=>{if(event.target instanceof Element&&!event.target.closest('[disabled]'))chime(soundFor(event.target))},true);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
document.addEventListener('click',e=>{const target=e.target.closest('button,a,summary');if(!target||target.disabled)return;if(reduced.matches)return;if(target.matches('.button,.filter,.gallery-filter,.gallery-card,.mood-choice,.nav-contact')){const rect=target.getBoundingClientRect(),ripple=document.createElement('span');ripple.className='click-ripple';ripple.style.left=(e.detail?e.clientX-rect.left:rect.width/2)+'px';ripple.style.top=(e.detail?e.clientY-rect.top:rect.height/2)+'px';target.appendChild(ripple);setTimeout(()=>ripple.remove(),650)}});

window.romeroChime=chime;
document.addEventListener('click',event=>{
 if(reduced.matches||event.detail===0||!(event.target instanceof Element))return;
 const colors=['#e72e87','#7139d2','#e9ae13','#36a97e'];
 for(let i=0;i<6;i++){
  const dot=document.createElement('span');dot.className='tap-spark';dot.setAttribute('aria-hidden','true');
  const angle=i*Math.PI/3,distance=17+Math.random()*15;
  dot.style.cssText=`left:${event.clientX}px;top:${event.clientY}px;--tx:${Math.cos(angle)*distance}px;--ty:${Math.sin(angle)*distance}px;--spark-color:${colors[i%colors.length]}`;
  document.body.appendChild(dot);setTimeout(()=>dot.remove(),650)
 }
});

})();
