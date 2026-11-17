// ---------- YANGI UI: HUD ikonkalari + ovoz tugmasi holati ----------
(function(){const $=id=>document.getElementById(id);
  const mb=$('mute');if(mb){const up=()=>{if(/🔇/.test(mb.textContent))mb.setAttribute('data-off','');else mb.removeAttribute('data-off')};up();new MutationObserver(up).observe(mb,{childList:true,characterData:true,subtree:true})}
  const h=$('hud');if(!h)return;
  const M={'🪙':['coin','#ffd23a'],'👊':['fist','#ff9a7a'],'🗝':['key','#ffe27a'],'🍎':['apple','#ff7070'],'🐾':['paw','#e8b888']};
  [...h.childNodes].forEach(n=>{if(n.nodeType!==3||!/[🪙👊🗝🍎🐾·]/.test(n.nodeValue))return;
    const f=document.createDocumentFragment();
    n.nodeValue.split(/(🪙|👊|🗝|🍎|🐾|·)/).forEach(t=>{if(!t)return;
      if(M[t]){const i=document.createElement('i');i.className='ico';i.style.setProperty('--m','var(--i-'+M[t][0]+')');i.style.setProperty('--ac',M[t][1]);f.appendChild(i)}
      else if(t==='·'){const s=document.createElement('i');s.className='sep';f.appendChild(s)}
      else f.appendChild(document.createTextNode(t.replace(/^\s+|\s+$/g,m=>m.length?' ':'')))});
    n.replaceWith(f)});
})();
