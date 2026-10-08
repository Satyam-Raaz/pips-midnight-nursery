export function Odometer({value}){
  const s=String(value).padStart(5,'0').split('');
  return (<span className="odo" aria-label={'Dreams delivered: '+value}>{s.map((d,i)=>(<span key={i} className="dg"><div style={{transform:`translateY(-${d*1.5}em)`}}>{[0,1,2,3,4,5,6,7,8,9].map(n=>(<i key={n}>{n}</i>))}</div></span>))}</span>);
}
