import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { clamp } from './utils';
import { tone, SWAR, setMuted } from './audio';
import { skyAt, fmt, statusAt } from './sky';
import { useVisits } from './hooks/useVisits';
import { Pip } from './components/Pip';
import { Win } from './components/Win';
import { Odometer } from './components/Odometer';
import { Lullaby } from './components/Lullaby';
import { Book } from './components/Book';
import { Growth } from './components/Growth';
import { Lamps } from './components/Lamps';
import { Blocks } from './components/Blocks';
import { Route } from './components/Route';
import { SCENES, Scene } from './components/Scene';

export const KONAMI=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];

export default function App(){
  const [h,setH]=useState(19),[rt,setRt]=useState(0),[ov,setOv]=useState(null);
  const [mute,setMute]=useState(false),[asleep,setAsleep]=useState(false);
  const [fx,setFx]=useState([]),[cf,setCf]=useState([]),[toast,setToast]=useState(''),[ld,setLd]=useState(0);
  const routeBox=useRef(null),lastSp=useRef(0),id=useRef(0),stars=useRef(0),act=useRef(Date.now()),sl=useRef(false),keys=useRef([]);
  const visits=useVisits();
  const night=ov!==null?ov:(h>=21&&h<29.5);

  const say=m=>{setToast(m);setTimeout(()=>setToast(''),2600)};
  const burst=(em)=>{
    const k=++id.current;
    setCf(Array.from({length:36},(_,i)=>({i,k,e:em[i%em.length],x:(Math.random()*2-1)*45+'vw',y:(Math.random()*60-10)+'vh'})));
    setTimeout(()=>setCf([]),1800);
  };
  const sleep=v=>{sl.current=v;setAsleep(v)};

  useEffect(()=>{document.documentElement.dataset.theme=night?'dark':'light'},[night]);
  useEffect(()=>{setMuted(mute)},[mute]);
  useEffect(()=>{const t=setInterval(()=>setLd(v=>Math.min(100,v+Math.ceil(Math.random()*14))),140);return()=>clearInterval(t)},[]);

  /* scroll = the night passing */
  useEffect(()=>{
    let raf=0;
    const upd=()=>{
      raf=0;
      const p=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),0,1);
      const a=skyAt(p),b=skyAt(clamp(p+.2,0,1));
      document.body.style.background=`linear-gradient(rgb(${a}),rgb(${b})) fixed`;
      document.documentElement.style.setProperty('--stars',clamp(Math.sin(Math.PI*p)*1.7,0,1).toFixed(2));
      setH(Math.round((19+p*11)*6)/6);
      if(routeBox.current){const r=routeBox.current.getBoundingClientRect();setRt(Math.round(clamp((innerHeight*.85-r.top)/(innerHeight*.7+r.height*.3),0,1)*100)/100)}
    };
    const on=()=>{if(!raf)raf=requestAnimationFrame(upd)};
    upd();addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
    return()=>{removeEventListener('scroll',on);removeEventListener('resize',on)};
  },[]);

  /* sparkles, waking, sleeping, easter eggs */
  useEffect(()=>{
    const wake=()=>{act.current=Date.now();if(sl.current){sleep(false);say('Oh! You’re back! I was just resting my eyes.')}};
    const mv=e=>{
      wake();
      const n=Date.now();if(n-lastSp.current<45)return;lastSp.current=n;
      const k=++id.current;
      setFx(f=>[...f.slice(-12),{k,x:e.clientX,y:e.clientY,c:['✦','✧','★','♡'][k%4]}]);
      setTimeout(()=>setFx(f=>f.filter(s=>s.k!==k)),800);
    };
    const kd=e=>{
      wake();
      const k=e.key.toLowerCase();
      keys.current=[...keys.current.slice(-9),k];
      if(keys.current.join()===KONAMI.join()){burst(['⭐','🌙','☁️','🎵']);say('Konami code! Pip does a loop-the-loop.');['Sa','Ga','Pa','Dha'].forEach((n,i)=>setTimeout(()=>tone(SWAR.find(s=>s[0]===n)[1]*2,.7,'triangle',.07),i*150))}
      if(keys.current.slice(-3).join('')==='zzz'){sleep(true);say('Zzz… okay, goodnight!')}
    };
    const click=e=>{const b=e.target.closest&&e.target.closest('button');if(b&&!b.dataset.silent)tone(720,.12,'triangle',.04)};
    const idle=setInterval(()=>{if(!sl.current&&Date.now()-act.current>20000){sleep(true);say('Pip fell asleep… move to wake them')}},1000);
    addEventListener('pointermove',mv);addEventListener('scroll',wake,{passive:true});addEventListener('keydown',kd);document.addEventListener('click',click);
    return()=>{removeEventListener('pointermove',mv);removeEventListener('scroll',wake);removeEventListener('keydown',kd);document.removeEventListener('click',click);clearInterval(idle)};
  },[]);

  const star=()=>{
    stars.current++;tone(900+stars.current*60,.2,'triangle',.06);
    if(stars.current<5){say('Hehe, that tickles! ('+stars.current+'/5)');return}
    stars.current=0;burst(['⭐','✨','💖','🌙']);
    ['Sa','Ga','Pa','Dha'].forEach((n,i)=>setTimeout(()=>tone(SWAR.find(s=>s[0]===n)[1],.8,'triangle',.08),i*140));
    say('You found my secret! I’m giggling now.');
  };

  const gift=()=>{burst(['🎁','⭐','💖','🧸']);['Sa','Pa','Dha','Pa'].forEach((n,i)=>setTimeout(()=>tone(SWAR.find(x=>x[0]===n)[1]*2,.6,'triangle',.07),i*130));say('A tiny gift: one extra cuddle from Pip 🧸')};
  const welcome=visits.me>1?`Welcome back! This is visit number ${visits.me}. I missed you.`:'First time here? Make yourself at home.';

  return (<React.Fragment>
    {ld<100?(<div className="load" role="status"><div style={{width:'min(420px,100%)'}}><b>Loading dreams… {ld}%</b><div className="bar"><i style={{width:ld+'%'}}></i></div><p style={{fontSize:'.85rem'}}>please wait while Pip finds the nightcap</p></div></div>):null}
    <div className="tools">
      <span className="chip" aria-label={'Time in Pip’s night: '+fmt(h)}>🕰️ {fmt(h)}</span>
      <button className="chip" aria-pressed={night} onClick={()=>setOv(!night)}>{night?'🌙 Night':'☀️ Day'}</button>
      <button className="chip" aria-pressed={mute} aria-label={mute?'Unmute sound':'Mute sound'} onClick={()=>setMute(!mute)}>{mute?'🔇 Muted':'🔊 Sound'}</button>
    </div>
    <div className="marq" aria-hidden="true"><span>✦ welcome to pip’s room ✦ best viewed with sleepy eyes ✦ scroll to watch the night go by ✦ good things start small ✦</span></div>

    <nav className="nav" aria-label="Sections">{[['home','Home'],['lullaby-lab','Lullaby Lab'],['work','Nightlight'],['routes','Routes'],['story','Story'],['storybook','Storybook'],['growth','Growth Chart']].map(l=>(<a key={l[0]} href={'#'+l[0]}>{l[1]}</a>))}</nav>
    <Win t="pip.exe — hello" id="home">
      <div className="hero">
        <div><p className="tag">Junior Dream Engineer · Midnight Nursery</p>
          <h1>Hi, I’m Pip. I build the dreams you fall asleep inside.</h1>
          <ul className="facts"><li>Curious</li><li>Sleepy</li><li>A little clumsy</li><li>Giggles at everything</li></ul>
          <p>{welcome} Scroll down and the night passes: it starts at 7 PM and ends at sunrise.</p></div>
        <Pip night={night} asleep={asleep} onStar={star}/>
      </div>
    </Win>

    <Win t="lullaby_observatory.exe" id="lullaby-lab"><Lullaby mute={mute}/></Win>
    <Win t="nightlight_and_toys/" id="work"><div className="grid"><Lamps/><Blocks/></div></Win>

    <div ref={routeBox}><Win t="dream_delivery.map" id="routes"><Route t={rt}/></Win></div>

    <Win t="my_story.txt" id="story"><div className="story">{SCENES.map(s=>(<Scene key={s[2]} s={s}/>))}</div></Win>
    <Win t="bedtime_storybook.pdf" id="storybook"><Book/></Win>
    <Win t="growth_chart.png" id="growth"><Growth/></Win>

    <footer>
      <p>Dreams delivered: <Odometer value={visits.g}/></p>
      <div className="badges" aria-hidden="true"><span>made with ♡</span><span>React 18</span><span>sleep-friendly</span><span>no ghosts were harmed</span></div>
      <p>Made for the haX.baby Baby’s First Website hackathon. Psst: my cap star is ticklish, and I do fall asleep if you stop moving.</p>
      <p>Credits: Pip drawn in SVG, sounds made live with the Web Audio API, Raag Bhoopali notes, fonts Fraunces and Fredoka, built with React 18.</p>
    </footer>
    <div className="dock"><button aria-label="Back to top" onClick={()=>scrollTo({top:0})}>⬆️</button><button aria-label="Open a surprise gift" onClick={gift}>🎁</button></div>
    <div className="status" role="status">Pip is currently: {asleep?'snoring softly (move to wake)':statusAt(h)}</div>

    {fx.map(s=>(<span key={s.k} className="fx" aria-hidden="true" style={{left:s.x,top:s.y}}>{s.c}</span>))}
    {cf.map(c=>(<span key={c.k+'-'+c.i} className="cf" aria-hidden="true" style={{'--x':c.x,'--y':c.y}}>{c.e}</span>))}
    {toast?(<div className="toast" role="status">{toast}</div>):null}
  </React.Fragment>);
}
