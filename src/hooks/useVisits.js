import { useState, useEffect } from 'react';

export function useVisits(){
  const [v,setV]=useState({g:1204,me:1});
  useEffect(()=>{
    let g=1205,me=1;
    try{g=parseInt(localStorage.getItem('pip-g')||'1203',10)+1;me=parseInt(localStorage.getItem('pip-me')||'0',10)+1;
      localStorage.setItem('pip-g',String(g));localStorage.setItem('pip-me',String(me))}catch(e){}
    setV({g,me});
  },[]);
  return v;
}
