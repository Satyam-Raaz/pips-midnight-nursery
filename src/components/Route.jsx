import { useState, useEffect, useRef } from 'react';

export const HOUSES=[110,270,430,590,730];

export function Route({t}){
  const pr=useRef(null),[pt,setPt]=useState({x:20,y:170});
  useEffect(()=>{const p=pr.current,q=p.getPointAtLength(p.getTotalLength()*t);setPt({x:q.x,y:q.y})},[t]);
  const done=HOUSES.filter(h=>pt.x>h+30).length;
  return (<div>
    <svg className="map" viewBox="0 0 800 280" role="img" aria-label={'Dream delivery map. '+done+' of 5 houses have their dreams.'}>
      <path ref={pr} d="M20 170C120 40 200 40 270 130S420 40 520 110S700 30 780 120" fill="none" stroke="#f7a8ba" strokeWidth="3" strokeDasharray="8 8"/>
      {HOUSES.map((x,i)=>(<g key={i}><rect x={x} y="190" width="60" height="60" fill="#6b4a8a"/><path d={`M${x-6} 192L${x+30} 160L${x+66} 192Z`} fill="#a34063"/>
        <rect x={x+20} y="210" width="20" height="22" fill={pt.x>x+30?'#ffb347':'#33202a'} style={{filter:pt.x>x+30?'drop-shadow(0 0 8px #ffb347)':'none'}}/></g>))}
      <g transform={`translate(${pt.x} ${pt.y})`}><ellipse cx="0" cy="12" rx="26" ry="11" fill="#fff"/><circle cx="0" cy="0" r="13" fill="#fbf1e1" stroke="#5c4033" strokeWidth="2"/><circle cx="-5" cy="-1" r="3" fill="#ffb347"/><circle cx="5" cy="-1" r="3" fill="#ffb347"/><path d="M-10 -10Q0 -26 10 -10Z" fill="#a34063"/></g>
    </svg>
    <p style={{marginTop:12}}>Scroll slowly. Every window Pip passes lights up. <b>{done} of 5</b> dreams delivered tonight.</p></div>);
}
