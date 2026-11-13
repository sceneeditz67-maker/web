// Guarda cada solicitud en el panel privado /admin sin interrumpir el envío a WhatsApp.
(() => {
 const queueKey='romero-solicitudes-pendientes';
 const readQueue=()=>{try{return JSON.parse(localStorage.getItem(queueKey)||'[]')}catch{return []}};
 const writeQueue=(rows)=>localStorage.setItem(queueKey,JSON.stringify(rows.slice(-30)));
 async function post(payload){
  const response=await fetch('/api/inquiries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),keepalive:true});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(data.error||'No se pudo guardar la solicitud.');
  return data;
 }
 window.romeroInquiryPayload=(form,extra={})=>{
  const data=Object.fromEntries(new FormData(form));
  return {
   nombre:data.nombre||'',telefono:data.telefono||'',correo:data.correo||'',fecha:data.fecha||'',
   servicio:data.servicio||'',cantidad:data.cantidad||'',fundas:data.fundas||'',lugar:data.lugar||'',
   mensaje:data.mensaje||'',producto:data.producto||'',funda:data.funda||'',decoracion:Boolean(data.decoracion),
   acepta:Boolean(data.acepta),origen:extra.origen||'formulario',pagina:location.pathname,
   referrer:document.referrer||'',...extra
  };
 };
 window.romeroRecordInquiry=async(payload)=>{
  try{
   const saved=await post(payload);
   return {saved:true,...saved};
  }catch(error){
   writeQueue([...readQueue(),{payload,at:new Date().toISOString()}]);
   return {saved:false,pending:true,error:error.message};
  }
 };
 window.romeroFlushInquiries=async()=>{
  const rows=readQueue();if(!rows.length)return 0;let sent=0;const left=[];
  for(const row of rows){try{await post(row.payload);sent+=1}catch{left.push(row)}}
  writeQueue(left);return sent;
 };
 if(navigator.onLine)setTimeout(()=>window.romeroFlushInquiries?.(),1200);
 window.addEventListener('online',()=>window.romeroFlushInquiries?.());
})();
