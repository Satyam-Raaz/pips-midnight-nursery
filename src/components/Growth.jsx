import { useState, useEffect, useRef } from 'react';

export const SK=[['Lullabies',95],['Nightlights',88],['Dream routing',80],['Block stacking',70],['Staying awake',5]];

export function Growth(){
  const r=useRef(null),[v,setV]=useState(false);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)){setV(true);return}
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.3});
    o.observe(r.current);return()=>o.disconnect();
  },[]);
  return (<div ref={r}><p>My nursery wall. Pip is growing fast, except at staying awake.</p>{SK.map(s=>(<div key={s[0]} className="sk"><span>{s[0]}</span><div className="tr"><i style={{width:v?s[1]+'%':'0%'}}></i></div><b>{s[1]}%</b></div>))}</div>);
}
