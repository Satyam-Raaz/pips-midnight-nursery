import { useState } from 'react';
import { clamp } from '../utils';
import { tone } from '../audio';

export const PAGES=[
  ['🌙','The sleepy moon','The moon was so tired that it yawned, and the whole sky went wobbly. “I can’t shine tonight,” it whispered.'],
  ['🧸','Pip has an idea','Pip tied on the starry nightcap and hopped onto a cloud. “Let’s make you a lullaby,” said Pip.'],
  ['🎵','Five little notes','Pip hummed five slow notes. Each one floated up and tucked itself into a star.'],
  ['⭐','The sky hums','The stars hummed back, softly, and the moon felt its eyelids get heavy and warm.'],
  ['💤','Goodnight, everyone','The moon closed its eyes and glowed a little dimmer. Pip yawned, and yawned, and slept too. The end.']
];

export function Book(){
  const [i,setI]=useState(0),[k,setK]=useState(0),p=PAGES[i];
  const go=d=>{const n=clamp(i+d,0,PAGES.length-1);if(n!==i){setI(n);setK(k+1);tone(500+n*40,.25,'sine',.05)}};
  return (<div style={{textAlign:'center'}}>
    <div key={k} className="page" aria-live="polite"><div aria-hidden="true" style={{fontSize:70}}>{p[0]}</div><h3>{p[1]}</h3><p style={{margin:'8px auto'}}>{p[2]}</p></div>
    <button className="btn" disabled={i===0} onClick={()=>go(-1)}>← Back</button> <b> {i+1} / {PAGES.length} </b> <button className="btn" disabled={i===PAGES.length-1} onClick={()=>go(1)}>Turn page →</button>
  </div>);
}
