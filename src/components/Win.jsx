export function Win({t,id,children}){
  return (<div className="wrap" id={id}><div className="win"><div className="tb"><span>{t}</span><span aria-hidden="true">_ □ ✕</span></div><div className="wb">{children}</div></div></div>);
}
