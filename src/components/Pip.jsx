import { useState, useEffect, useRef } from 'react';
import { clamp } from '../utils';

export function Pip({night,asleep,onStar}){
  const ref=useRef(null),last=useRef(0);
  const [look,setLook]=useState({x:0,y:0});
  useEffect(()=>{
    const mv=e=>{
      last.current=Date.now();
      const r=ref.current.getBoundingClientRect();
      setLook({x:clamp((e.clientX-(r.left+r.width/2))/Math.max(220,innerWidth/2)),y:clamp((e.clientY-(r.top+r.height/2))/Math.max(220,innerHeight/2))});
    };
    addEventListener('pointermove',mv);
    const t=setInterval(()=>{if(Date.now()-last.current>3000)setLook({x:Math.random()*2-1,y:Math.random()*1.2-.4})},2200);
    return()=>{removeEventListener('pointermove',mv);clearInterval(t)};
  },[]);
  const pr=night?7.5:5.5,lx=look.x*9,ly=look.y*10;
  return (<svg ref={ref} className="pip" viewBox="0 0 240 270" role="img" aria-label={asleep?'Pip is fast asleep':'Pip, a cute skull baby in a starry nightcap, sitting on a cloud'}>
    <defs><filter id="gl" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation={night?3.5:2}/></filter></defs>
    <g fill="var(--cloud)" stroke="var(--ink)" strokeWidth="2.5"><ellipse cx="120" cy="240" rx="104" ry="22"/><circle cx="52" cy="232" r="22"/><circle cx="100" cy="222" r="28"/><circle cx="162" cy="226" r="26"/><circle cx="202" cy="236" r="16"/></g>
    <ellipse cx="120" cy="206" rx="40" ry="28" fill="#fdf0f1" stroke="var(--ink)" strokeWidth="3"/>
    <circle cx="120" cy="125" r="76" fill="var(--skull)" stroke="var(--ink)" strokeWidth="3"/>
    <circle cx="80" cy="152" r="9" fill="#f7a8ba" opacity=".75"/><circle cx="160" cy="152" r="9" fill="#f7a8ba" opacity=".75"/>
    <ellipse cx="92" cy="122" rx="21" ry="25" fill="#33202a"/><ellipse cx="148" cy="122" rx="21" ry="25" fill="#33202a"/>
    {asleep?(<g fill="none" stroke="var(--glow)" strokeWidth="4" strokeLinecap="round"><path d="M80 122Q92 134 104 122"/><path d="M136 122Q148 134 160 122"/></g>)
    :(<g fill="var(--glow)">
      <circle className="pupil" cx={92+lx} cy={124+ly} r={pr+3} filter="url(#gl)" opacity=".8"/><circle className="pupil" cx={148+lx} cy={124+ly} r={pr+3} filter="url(#gl)" opacity=".8"/>
      <circle className="pupil" cx={92+lx} cy={124+ly} r={pr}/><circle className="pupil" cx={148+lx} cy={124+ly} r={pr}/></g>)}
    <path d="M114 150l6-8 6 8z" fill="#33202a"/>
    <path d={asleep?'M104 170Q120 176 136 168':'M100 168Q118 182 140 163'} fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M50 88Q62 22 140 16Q200 26 192 90Q120 68 50 88Z" fill="var(--berry)" stroke="var(--ink)" strokeWidth="3"/>
    <ellipse cx="121" cy="86" rx="73" ry="11" fill="#fff8f1" stroke="var(--ink)" strokeWidth="3"/>
    <circle cx="150" cy="14" r="10" fill="#fff8f1" stroke="var(--ink)" strokeWidth="2.5"/>
    <g fill="#f7a8ba" stroke="var(--ink)" strokeWidth="2.5"><path d="M56 92l-16-10v22z"/><path d="M56 92l16-10v22z"/><circle cx="56" cy="92" r="5"/></g>
    <g role="button" tabIndex="0" aria-label="Tickle the star on Pip’s cap" style={{cursor:'pointer'}} onClick={onStar} onKeyDown={e=>(e.key==='Enter'||e.key===' ')&&onStar()}>
      <circle cx="116" cy="52" r="16" fill="transparent"/><text x="116" y="62" textAnchor="middle" fontSize="28" fill="#fff8f1">★</text>
    </g>
    {(night||asleep)?(<g><text className="zz" x="190" y="60" fontSize="26">z</text><text className="zz" style={{animationDelay:'1s'}} x="206" y="40" fontSize="20">Z</text></g>):null}
  </svg>);
}
