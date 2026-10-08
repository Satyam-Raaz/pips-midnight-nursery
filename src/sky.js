export const SKY=[[0,[255,217,201]],[.2,[158,106,150]],[.45,[38,24,56]],[.7,[24,16,40]],[.88,[96,76,130]],[1,[255,222,200]]];

export function skyAt(p){
  for(let i=1;i<SKY.length;i++){if(p<=SKY[i][0]){const[a,A]=SKY[i-1],[b,B]=SKY[i],k=(p-a)/(b-a);return A.map((v,j)=>Math.round(v+(B[j]-v)*k))}}
  return SKY[5][1];
}

export function fmt(h){
  const H=Math.floor(h)%24,m=Math.floor((h%1)*6)*10;
  return ((H%12)||12)+':'+String(m).padStart(2,'0')+(H<12?' AM':' PM');
}

export function statusAt(h){
  return h<21?'yawning and hunting for the nightcap':h<23?'tucking in the little ghosts':h<26?'flying dreams over the rooftops':h<29?'dreaming up its own dreams':'waving good morning';
}
