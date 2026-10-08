import { useState, useEffect, useRef } from 'react';
import { clamp } from '../utils';
import { tone, startDrone, KEYS, NF, BRAHMS, TWINKLE, setEcho } from '../audio';

export function Lullaby({mute}){
  const [on,setOn]=useState(null),[log,setLog]=useState('TOUCH ANY STARLIGHT KEY TO CHIME…'),[mode,setMode]=useState(null),[ec,setEc]=useState(30),st=useRef({t:[],d:null});
  const note=(n,f)=>{
    tone(f,1.1,'triangle',.09);
    const i=KEYS.findIndex(k=>k[0]===n);setOn(i);setTimeout(()=>setOn(null),200);
    setLog('♪ '+n+(i>=0?' · '+KEYS[i][1]:'')+' · '+f.toFixed(1)+' Hz');
  };
  const stop=()=>{const q=st.current;q.t.forEach(x=>{clearTimeout(x);clearInterval(x)});q.t=[];if(q.d){q.d();q.d=null}setMode(null)};
  const song=(m,seq)=>{stop();setMode(m);st.current.t=seq.map((n,i)=>setTimeout(()=>note(n,NF[n]),i*520));st.current.t.push(setTimeout(stop,seq.length*520+600))};
  const raag=()=>{
    stop();setMode('raag');let i=2,n=0;st.current.d=startDrone();
    st.current.t=[setInterval(()=>{i=clamp(i+[-1,-1,0,1,1][Math.floor(Math.random()*5)],0,4);note(KEYS[i][0],KEYS[i][3]);if(++n>=28)stop()},720)];
  };
  useEffect(()=>{if(mute)stop()},[mute]);
  useEffect(()=>stop,[]);
  return (<div>
    <p>Noisy clangs keep babies awake! So I built a chime synthesizer with the Web Audio API. Touch a star-key, or let me hum for you. The five lowest keys form Raag Bhoopali.</p>
    <div className="lk">{KEYS.map((k,i)=>(<button key={k[0]} data-silent="1" className={'lkey'+(on===i?' on':'')} aria-label={'Note '+k[0]+', '+k[1]} onClick={()=>note(k[0],k[3])}><div aria-hidden="true" style={{fontSize:26}}>{k[2]}</div><b>{k[0]}</b><span>{k[1]}</span></button>))}</div>
    <div className="term" role="status">{log}</div>
    <div className="ctl"><b>Autoplay lullabies:</b>
      <button className="btn" data-silent="1" aria-pressed={mode==='brahms'} onClick={()=>song('brahms',BRAHMS)}>Brahms’ Cradle Song</button>
      <button className="btn" data-silent="1" aria-pressed={mode==='tw'} onClick={()=>song('tw',TWINKLE)}>Twinkle Starlight</button>
      <button className="btn" data-silent="1" aria-pressed={mode==='raag'} onClick={raag}>Pip’s Bhoopali lori</button>
      <button className="btn" data-silent="1" disabled={!mode} onClick={stop}>Stop</button></div>
    <p className="ctl" style={{marginTop:12}}><label>Dream Echo <input type="range" min="0" max="100" value={ec} aria-label="Dream Echo amount" onChange={e=>{setEc(+e.target.value);setEcho(e.target.value/100*.8)}}/></label></p>
  </div>);
}
