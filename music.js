(() => {
 // Original, locally synthesized instrumental loop. No external recordings or autoplay.
 const POSITION='romero-music-position';
 const volume=1;
 let audio,master,compressor,timer,pauseTimer,playing=false,starting=false,token=0,step=0,nextTime=0,startTime=0,startStep=0;
 const sources=new Set();const bpm=108,beat=60/bpm,stepLength=beat/2;
 const progression=[[60,64,67],[60,64,67],[57,60,64],[57,60,64],[53,57,60],[53,57,60],[55,59,62],[55,59,62]];
 const melody=[
  [76,79,81,79,76,74,72,0], [74,76,79,76,74,72,0,0],
  [72,76,81,79,76,72,71,0], [72,74,76,79,76,74,72,0],
  [77,81,84,81,79,77,76,0], [74,77,81,79,77,76,74,0],
  [74,79,83,81,79,77,74,0], [71,74,79,77,76,74,72,0]
 ];
 try{step=Number(sessionStorage.getItem(POSITION)||0)%64}catch{}
 function rememberPosition(){if(playing&&audio){const elapsed=Math.max(0,audio.currentTime-startTime);step=(startStep+Math.floor(elapsed/stepLength))%64}try{sessionStorage.setItem(POSITION,String(step))}catch{}}
 function connectSource(source,gain){source.connect(gain);gain.connect(master);sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();gain.disconnect()}}
 const hz=midi=>440*Math.pow(2,(midi-69)/12);
 function note(midi,time,duration,level,type='sine',soft=false){
  const osc=audio.createOscillator(),gain=audio.createGain();osc.type=type;osc.frequency.value=hz(midi);
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(level,time+(soft?.08:.008));gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
  connectSource(osc,gain);osc.start(time);osc.stop(time+duration+.02);
 }
 let noise;
 function shaker(time,accent=false){
  const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=noise;filter.type='highpass';filter.frequency.value=6200;
  gain.gain.setValueAtTime(accent?.022:.012,time);gain.gain.exponentialRampToValueAtTime(.0001,time+.065);source.connect(filter);filter.connect(gain);gain.connect(master);
  sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();filter.disconnect();gain.disconnect()};source.start(time);source.stop(time+.075);
 }
 function kick(time){const osc=audio.createOscillator(),gain=audio.createGain();osc.frequency.setValueAtTime(105,time);osc.frequency.exponentialRampToValueAtTime(48,time+.13);gain.gain.setValueAtTime(.14,time);gain.gain.exponentialRampToValueAtTime(.0001,time+.17);connectSource(osc,gain);osc.start(time);osc.stop(time+.19)}
 function schedule(position,time){
  const bar=Math.floor(position/8)%8,slot=position%8,chord=progression[bar],melodic=melody[bar][slot];
  if(slot===0||slot===4){chord.forEach((m,i)=>note(m+12,time+i*.014,beat*1.7,.035,'triangle',true));note(chord[0]-12,time,beat*.7,.13,'triangle');kick(time)}
  if(slot===2||slot===6)note(chord[slot===2?2:0]-12,time,beat*.48,.075,'triangle');
  if(melodic){note(melodic,time,.43,.12,'sine');note(melodic+12,time,.15,.022,'sine')}
  shaker(time,slot%2===1);
 }
 function scheduler(){if(!playing||!audio||audio.state!=='running')return;let safety=0;while(nextTime<audio.currentTime+.18&&safety++<8){if(nextTime<audio.currentTime-.1)nextTime=audio.currentTime+.02;schedule(step,nextTime);step=(step+1)%64;nextTime+=stepLength}}
 function setup(){
  if(audio)return;const Context=window.AudioContext||window.webkitAudioContext;if(!Context)throw Error('no-audio');
  audio=new Context();master=audio.createGain();master.gain.value=0;compressor=audio.createDynamicsCompressor();compressor.threshold.value=-8;compressor.knee.value=12;compressor.ratio.value=4;master.connect(compressor);compressor.connect(audio.destination);
  noise=audio.createBuffer(1,Math.ceil(audio.sampleRate*.08),audio.sampleRate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
 }
 async function start(){
  if(playing||starting)return;const request=++token;starting=true;clearTimeout(pauseTimer);
  try{
   setup();if(audio.state!=='running')await audio.resume();if(request!==token)return;
   if(audio.state!=='running')throw Error('blocked');playing=true;starting=false;
   master.gain.cancelScheduledValues(audio.currentTime);master.gain.setValueAtTime(0,audio.currentTime);master.gain.linearRampToValueAtTime(volume,audio.currentTime+.15);
   startStep=step;startTime=audio.currentTime+.06;nextTime=startTime;scheduler();clearInterval(timer);timer=setInterval(scheduler,80);document.dispatchEvent(new CustomEvent('romero:music',{detail:{playing:true,volume}}));
  }catch{starting=false;playing=false}
 }
 function stop(){
  ++token;rememberPosition();starting=false;playing=false;clearInterval(timer);
  if(audio){master.gain.cancelScheduledValues(audio.currentTime);master.gain.setTargetAtTime(0,audio.currentTime,.015);sources.forEach(source=>{try{source.stop(audio.currentTime+.06)}catch{}});pauseTimer=setTimeout(()=>audio.suspend().catch(()=>{}),90)}
  document.dispatchEvent(new CustomEvent('romero:music',{detail:{playing:false,volume}}));
 }
 // Attempt autoplay where permitted; otherwise a real gesture unlocks the SAME context.
 const activate=()=>{if(document.hidden)return;if(audio&&audio.state!=='running')audio.resume().catch(()=>{});if(!playing&&!starting)start()};
 document.addEventListener('pointerdown',activate,{passive:true});
 document.addEventListener('click',activate,{passive:true});
 document.addEventListener('keydown',event=>{if(!event.metaKey&&!event.ctrlKey&&!event.altKey)activate()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stop()});
 window.addEventListener('pagehide',()=>{rememberPosition();if(playing)stop()});
 window.romeroMusicState=()=>({playing,starting,volume,state:audio?.state||'not-created',currentTime:audio?.currentTime||0});
 if(!document.hidden)start();
})();
