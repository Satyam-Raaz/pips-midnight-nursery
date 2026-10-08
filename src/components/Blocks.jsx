import { useState } from 'react';
import { tone } from '../audio';

export function Blocks(){
  const [t,setT]=useState([]),[sh,setSh]=useState(false),col=['#f7a8ba','#ffd98a','#a8d8c8','#b9b3ee'],lt=['A','B','C','1','2','3'];
  const add=()=>{
    if(t.length>=7){setSh(true);tone(120,.5,'square',.05);setTimeout(()=>{setSh(false);setT([])},500);return}
    setT([...t,t.length]);tone(300+t.length*70,.2,'square',.04);
  };
  return (<div className="card"><h3>Rattle & Block Toys</h3><p>Stack my blocks. Seven is the limit, then whoops.</p>
    <div className={'tower'+(sh?' shake':'')}>{t.map(i=>(<div key={i} className="blk" style={{background:col[i%4]}}>{lt[i%6]}</div>))}</div>
    <button className="btn" data-silent="1" onClick={add}>Add a block</button></div>);
}
