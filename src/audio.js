let ctx=null,muted=false;

export const AC=()=>{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();return ctx};

export function tone(f,d=.5,type='sine',v=.07){
  if(muted)return;
  try{const c=AC(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime;
    o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g);g.connect(c.destination);g.connect(getBus(c).send);o.start(t);o.stop(t+d)}catch(e){}
}

export function startDrone(){
  if(muted)return()=>{};
  try{const c=AC(),g=c.createGain();g.gain.value=.0001;g.gain.linearRampToValueAtTime(.05,c.currentTime+1.5);g.connect(c.destination);
    const os=[130.81,196].map(f=>{const o=c.createOscillator();o.frequency.value=f;o.connect(g);o.start();return o});
    return()=>{try{g.gain.linearRampToValueAtTime(.0001,c.currentTime+.8);os.forEach(o=>o.stop(c.currentTime+.9))}catch(e){}}
  }catch(e){return()=>{}}
}

export const SWAR=[['Sa',261.63],['Re',293.66],['Ga',329.63],['Pa',392],['Dha',440]];

export const KEYS=[['C4','Starlight','⭐',261.63],['D4','Cloud','✨',293.66],['E4','Warm Milk','🌟',329.63],['G4','Moonbeam','🌙',392],['A4','Teddy Hug','🧸',440],['C5','Dream Dust','💫',523.25],['D5','Soft Yawn','💤',587.33],['E5','Slumber','🌌',659.25]];

export const NF={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25};

export const BRAHMS='E4 E4 G4 E4 E4 G4 E4 G4 C5 B4 A4 A4 G4'.split(' ');

export const TWINKLE='C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4'.split(' ');

let bus=null,echoAmt=.25;

export function getBus(c){if(!bus){const d=c.createDelay(1),fb=c.createGain(),send=c.createGain();d.delayTime.value=.34;fb.gain.value=.45;send.gain.value=echoAmt;send.connect(d);d.connect(fb);fb.connect(d);d.connect(c.destination);bus={send}}return bus}

export function setEcho(v){echoAmt=v;if(bus)bus.send.gain.value=v}

export function setMuted(v){muted=v}
