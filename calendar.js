window.initRomeroCalendar=function(){
 window.cleanupRomeroCalendar?.();
 const events=new AbortController();
 const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
 const iso=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
 const parse=value=>{const [y,m,d]=value.split('-').map(Number);return new Date(y,m-1,d)};
 const calendars=[];let current=null;
 document.querySelectorAll('input[type="date"]').forEach((input,index)=>{
  const wrap=document.createElement('div');wrap.className='calendar-widget';
  input.before(wrap);wrap.appendChild(input);input.classList.add('calendar-native-value');input.tabIndex=-1;
  const id=`event-calendar-${index}`;const trigger=document.createElement('button');
  trigger.type='button';trigger.className='calendar-trigger';trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',id);trigger.setAttribute('aria-label','Elegir fecha del evento');
  trigger.innerHTML='<span class="calendar-value-label">Selecciona una fecha</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3M7 18h3"/></svg>';
  const popup=document.createElement('div');popup.className='calendar-popup';popup.id=id;popup.hidden=true;popup.setAttribute('role','dialog');popup.setAttribute('aria-label','Elegir fecha del evento');
  popup.innerHTML='<div class="calendar-header"><button type="button" class="calendar-month-title" aria-label="Elegir mes y año"></button><div class="calendar-navigation"><button type="button" data-calendar-nav="-1" aria-label="Mes anterior">‹</button><button type="button" data-calendar-nav="1" aria-label="Mes siguiente">›</button></div></div><div class="calendar-selectors" hidden><label>Mes<select class="calendar-month-select" aria-label="Mes"></select></label><label>Año<select class="calendar-year-select" aria-label="Año"></select></label></div><div class="calendar-weekdays" aria-hidden="true"><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sá</span><span>Do</span></div><div class="calendar-days" role="group" aria-label="Días del mes"></div><div class="calendar-bottom"><button type="button" class="calendar-today">Hoy</button><span class="calendar-hint">Elige el día de tu evento</span><button type="button" class="calendar-clear">Borrar</button></div>';
  const error=document.createElement('span');error.className='calendar-error';error.id=id+'-error';error.setAttribute('role','status');
  trigger.setAttribute('aria-describedby',error.id);wrap.append(trigger,popup,error);
  const min=input.min?parse(input.min):new Date();min.setHours(0,0,0,0);
  const initial=input.value?parse(input.value):min;let view=new Date(initial.getFullYear(),initial.getMonth(),1);
  const title=popup.querySelector('.calendar-month-title'),grid=popup.querySelector('.calendar-days');
  const monthSelect=popup.querySelector('.calendar-month-select'),yearSelect=popup.querySelector('.calendar-year-select');
  monthSelect.innerHTML=months.map((m,i)=>`<option value="${i}">${m}</option>`).join('');
  for(let y=min.getFullYear();y<=min.getFullYear()+15;y++){const option=document.createElement('option');option.value=String(y);option.textContent=String(y);yearSelect.appendChild(option)}
  function render(){
   title.textContent=`${months[view.getMonth()]} ${view.getFullYear()} ▾`;
   monthSelect.value=String(view.getMonth());yearSelect.value=String(view.getFullYear());
   const first=new Date(view.getFullYear(),view.getMonth(),1),offset=(first.getDay()+6)%7;
   const start=new Date(view.getFullYear(),view.getMonth(),1-offset);const today=iso(new Date());
   grid.replaceChildren();
   for(let i=0;i<42;i++){
    const date=new Date(start.getFullYear(),start.getMonth(),start.getDate()+i),value=iso(date),day=document.createElement('button');
    day.type='button';day.className='calendar-day';day.textContent=String(date.getDate());day.dataset.date=value;
    day.setAttribute('aria-label',date.toLocaleDateString('es-BO',{weekday:'long',day:'numeric',month:'long',year:'numeric'}));
    const outside=date.getMonth()!==view.getMonth();day.classList.toggle('outside-month',outside);day.classList.toggle('is-today',value===today);day.classList.toggle('is-selected',value===input.value);day.setAttribute('aria-pressed',String(value===input.value));day.disabled=date<min;
    day.tabIndex=-1;day.addEventListener('click',event=>{event.preventDefault();select(value)});grid.appendChild(day);
   }
   const focusable=grid.querySelector('.is-selected:not([disabled])')||grid.querySelector('.is-today:not([disabled])')||grid.querySelector('.calendar-day:not(.outside-month):not([disabled])');if(focusable)focusable.tabIndex=0;
   const prev=popup.querySelector('[data-calendar-nav="-1"]');prev.disabled=view.getFullYear()===min.getFullYear()&&view.getMonth()===min.getMonth();
  }
  function close(focus=false){popup.hidden=true;trigger.setAttribute('aria-expanded','false');wrap.classList.remove('calendar-open');if(current===api){current=null;document.body.classList.remove('date-picker-open')}if(focus)trigger.focus()}
  function open(){
   if(current&&current!==api)current.close();current=api;document.body.classList.add('date-picker-open');
   if(input.value){const d=parse(input.value);view=new Date(d.getFullYear(),d.getMonth(),1)}
   render();popup.hidden=false;wrap.classList.add('calendar-open');trigger.setAttribute('aria-expanded','true');
   const bottomRoom=innerHeight-trigger.getBoundingClientRect().bottom;popup.classList.toggle('opens-above',bottomRoom<355&&trigger.getBoundingClientRect().top>355);
   requestAnimationFrame(()=>grid.querySelector('[tabindex="0"]')?.focus({preventScroll:true}));
  }
  function sync(){const value=input.value;trigger.querySelector('.calendar-value-label').textContent=value?parse(value).toLocaleDateString('es-BO',{day:'2-digit',month:'short',year:'numeric'}):'Selecciona una fecha';trigger.classList.toggle('has-date',Boolean(value));if(value){error.textContent='';trigger.removeAttribute('aria-invalid')}}
  function select(value){input.value=value;input.setCustomValidity('');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));sync();close(true)}
  const api={close};calendars.push(api);
  trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();popup.hidden?open():close()});
  popup.addEventListener('click',event=>{if(!event.target.closest('select'))event.preventDefault();event.stopPropagation()});
  popup.querySelectorAll('[data-calendar-nav]').forEach(button=>button.addEventListener('click',()=>{view=new Date(view.getFullYear(),view.getMonth()+Number(button.dataset.calendarNav),1);render()}));
  title.addEventListener('click',()=>{const selectors=popup.querySelector('.calendar-selectors');selectors.hidden=!selectors.hidden;if(!selectors.hidden)monthSelect.focus()});
  const chooseMonth=()=>{const candidate=new Date(Number(yearSelect.value),Number(monthSelect.value),1);view=candidate<new Date(min.getFullYear(),min.getMonth(),1)?new Date(min.getFullYear(),min.getMonth(),1):candidate;render()};monthSelect.addEventListener('change',chooseMonth);yearSelect.addEventListener('change',chooseMonth);
  popup.querySelector('.calendar-today').addEventListener('click',()=>select(iso(min)));
  popup.querySelector('.calendar-clear').addEventListener('click',()=>{input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));sync();close(true)});
  input.addEventListener('change',sync);
  input.addEventListener('invalid',event=>{event.preventDefault();trigger.setAttribute('aria-invalid','true');error.textContent='Selecciona la fecha del evento.';trigger.focus();open()});
  popup.addEventListener('keydown',event=>{
   if(event.key==='Escape'){event.preventDefault();close(true);return}
   if(!(event.target instanceof HTMLElement)||!event.target.matches('.calendar-day'))return;
   const steps={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};let target;
   if(event.key in steps){target=parse(event.target.dataset.date);target.setDate(target.getDate()+steps[event.key])}
   if(event.key==='PageUp'||event.key==='PageDown'){target=parse(event.target.dataset.date);target.setMonth(target.getMonth()+(event.key==='PageUp'?-1:1))}
   if(!target)return;event.preventDefault();if(target<min)target=new Date(min);view=new Date(target.getFullYear(),target.getMonth(),1);render();grid.querySelector(`[data-date="${iso(target)}"]`)?.focus();
  });
  wrap.addEventListener('focusout',()=>setTimeout(()=>{if(!wrap.contains(document.activeElement))close()},0));sync();
 });
 document.addEventListener('click',event=>{if(current&&event.target instanceof Element&&!event.target.closest('.calendar-widget'))current.close()},{signal:events.signal});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&current)current.close(true)},{signal:events.signal});
 window.cleanupRomeroCalendar=()=>{events.abort();if(current)current.close();document.body.classList.remove('date-picker-open')};
};
window.initRomeroCalendar();
