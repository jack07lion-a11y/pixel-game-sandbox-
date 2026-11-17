// ---------- tugmalarni gorizontal maketga joylash ----------
function layoutInit(){const $=id=>document.getElementById(id);const tb=$('tbar'),rbx=$('rbtn');
  ['mute','rn','mp','ed0','bed0','iv','tk'].forEach(id=>{const el=$(id);if(el)tb.appendChild(el)});
  ['bl','tf','fy','fd','bd','sx','run','atk'].forEach(id=>{const el=$(id);if(el)rbx.appendChild(el)});
  $('bed0').onpointerdown=e=>{e.stopPropagation();e.preventDefault();bedOpen();sndClick()};
  $('bed0').title='Qurish tahriri (B)'}
addEventListener('keydown',e=>{if(!BED.on&&!gmOpen&&!edOpen&&!e.repeat&&e.key=='b')bedOpen()});
layoutInit();relayout();
