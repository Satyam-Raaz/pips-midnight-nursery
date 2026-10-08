import { useState } from 'react';
import { tone } from '../audio';

export function Lamps(){
  const [l,setL]=useState([true,false,false]),ic=['🌙','⭐','☁️'],nm=['Moon lamp','Star lamp','Cloud lamp'];
  return (<div className="card"><h3>Nightlight Collection</h3><p>Three bedside lights I made. Switch one on and the room gets cozier.</p>
    <div className="lamps">{ic.map((c,i)=>(<button key={i} className={'lamp'+(l[i]?' on':'')} aria-pressed={l[i]} aria-label={nm[i]} onClick={()=>{setL(l.map((v,j)=>j===i?!v:v));tone(l[i]?330:660,.3,'sine',.05)}}>{c}</button>))}</div>
    <p>{l.filter(Boolean).length} of 3 lamps glowing.</p></div>);
}
