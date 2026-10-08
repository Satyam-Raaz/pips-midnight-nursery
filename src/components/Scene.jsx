import { useState, useEffect, useRef } from 'react';

export const SCENES=[
  ['7 PM','🌃','A very quiet night','In a sleepy town every window was dark and the night was far too quiet. Nobody giggled. I hate silence.'],
  ['10 PM','🎵','The first music box','I found a tiny music box in the attic. One twist of the golden key and the whole street hummed along.'],
  ['1 AM','🏠','Midnight Nursery','The Midnight Nursery was hiring. I turned up in a starry nightcap and became their Junior Dream Engineer.'],
  ['4 AM','☁️','Rooftop deliveries','Now I ride a cloud over the rooftops, tucking lullabies, nightlights and dreams into the neighbourhood.']
];

export function Scene({s}){
  const r=useRef(null),[v,setV]=useState(false);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)){setV(true);return}
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.35});
    o.observe(r.current);return()=>o.disconnect();
  },[]);
  return (<div ref={r} className={'scene'+(v?' in':'')}><div className="ico" aria-hidden="true">{s[1]}</div><div><span className="time">{s[0]}</span><h3>{s[2]}</h3><p>{s[3]}</p></div></div>);
}
