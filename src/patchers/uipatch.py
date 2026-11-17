# UI qayta dizayn: src/ui.css + src/ui.js + SVG ikonkalarni index.html ga qo'shadi (qayta ishga tushirsa ham xavfsiz).
import re,os,urllib.parse
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H=os.path.join(os.path.dirname(R),'index.html')
S=lambda b:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+b+'</svg>'
IC={
'snd':'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/>',
'mute':'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
'rain':'<path d="M7 15a4 4 0 01-.4-8 5.5 5.5 0 0110.5 1.3A3.4 3.4 0 0117 15H7z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
'map':'<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5V6.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
'pen':'<path d="M4 20l1-4.5L16 4.5l3.5 3.5L8.5 19 4 20z"/><path d="M13.5 7l3.5 3.5"/>',
'cube':'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
'bag':'<path d="M8 7.5V7a4 4 0 018 0v.5"/><path d="M6.5 7.5h11a1.5 1.5 0 011.5 1.5v9.5a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 015 18.5V9a1.5 1.5 0 011.5-1.5z"/><path d="M9 14h6"/>',
'chat':'<path d="M5 4.5h14a2 2 0 012 2v9a2 2 0 01-2 2h-7l-5 3.5v-3.5H5a2 2 0 01-2-2v-9a2 2 0 012-2z"/><path d="M8 11h.01M12 11h.01M16 11h.01" stroke-width="3"/>',
'fire':'<path d="M12 3c.8 4 5.5 5.5 5.5 10.5a5.5 5.5 0 01-11 0c0-2 1-3.5 2.2-4.6.2 1.6.9 2.6 1.9 2.6-.3-3.2 .2-5 1.4-8.5z"/>',
'bolt':'<path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11.5h-6l1-7.5z"/>',
'wing':'<path d="M20.5 3.5c-9 0-14 4.5-14.5 12.5L3.5 20.5"/><path d="M20.5 3.5c.5 8-4 12.5-12 12.5"/><path d="M9 15l6-6"/>',
'apple':'<path d="M12 7.5c-3-2-8-.5-7 5.5.6 4 3 8 5.2 8 .9 0 1.2-.5 1.8-.5s.9.5 1.8.5c2.2 0 4.6-4 5.2-8 1-6-4-7.5-7-5.5z"/><path d="M12 7.5c0-2 1-3.5 3-4.5"/>',
'hammer':'<path d="M13.5 4.5l6 6-3 3-6-6 3-3z"/><path d="M11.5 9.5L4 17l3 3 7.5-7.5"/>',
'star':'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/>',
'sword':'<path d="M20.5 3.5l-.5 5L12 16.5 7.5 12l8-8 5-.5z"/><path d="M6 13l5 5M8.5 15.5L4 20"/>',
'run':'<path d="M5.5 6l6 6-6 6M12.5 6l6 6-6 6"/>',
'boat':'<path d="M12 3v12.5M12 4.5c4 2 6 6 6 10.5h-6M12 6.5c-3 2-5 5-5 8.5h5"/><path d="M4 18h16l-2.5 3h-11L4 18z"/>',
'dive':'<path d="M3 11c3-3 6 3 9 0s6 3 9 0M3 17c3-3 6 3 9 0s6 3 9 0"/><path d="M8 6h.01M12 3.5h.01M15.5 6.5h.01" stroke-width="3"/>',
'up':'<path d="M12 20V5M6 11l6-6 6 6"/>',
'down':'<path d="M12 4v15M6 13l6 6 6-6"/>',
'heart':'<path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5C20 15.2 12 20 12 20z"/>',
'coin':'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10c0-1.5 5 -1.5 5 0s-5 2-5 4 5 1.5 5 0"/>',
'fist':'<path d="M7 11V7.5a1.5 1.5 0 013 0V10m0-3a1.5 1.5 0 013 0v3m0-2a1.5 1.5 0 013 0v4.5c0 4-2 6-5 6s-5-2-5-5.5V11a1.5 1.5 0 013 0z"/>',
'key':'<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l3 3M14 9l2 2"/>',
'paw':'<path d="M12 12.5c-3 0-5 2.5-5 4.5 0 1.5 1.5 2.5 3 2 1.2-.4 1.8-.4 4 0 1.5.5 3-.5 3-2 0-2-2-4.5-5-4.5z"/><path d="M6 9.5h.01M10 6.5h.01M14 6.5h.01M18 9.5h.01" stroke-width="3.5"/>',
}
def uri(b):return 'url("data:image/svg+xml,'+urllib.parse.quote(S(b),safe="/:=' ()-,.")+'")'
css='/*UI-BEGIN*/\n:root{'+''.join('--i-%s:%s;'%(k,uri(v)) for k,v in IC.items())+'}\n'+open(os.path.join(R,'ui.css'),encoding='utf-8').read()+'\n/*UI-END*/'
js='/*UIJS-BEGIN*/\n'+''.join(open(os.path.join(R,n),encoding='utf-8').read()+'\n' for n in ('ui.js','colors.js','radar.js'))+'/*UIJS-END*/'
src=open(H,encoding='utf-8').read()
src=re.sub(r'/\*UI-BEGIN\*/.*?/\*UI-END\*/\n?','',src,flags=re.S)
src=re.sub(r'/\*UIJS-BEGIN\*/.*?/\*UIJS-END\*/\n?','',src,flags=re.S)
assert src.count('</style></head>')==1
src=src.replace('</style></head>',css+'\n</style></head>')
# GLOBEFIX
for a,b in (('const BC=[[93,150,72],[222,196,130],[232,240,246],[132,134,142]]','const BC=[[82,148,58],[220,196,140],[238,243,248],[126,127,134]]'),('gR=Math.min(w,h)*.4*gZoom','gR=Math.min(w,h)*.46*gZoom')):
    if a in src: src=src.replace(a,b)
tail='requestAnimationFrame(loop);\n</script></body></html>'
assert src.rstrip().endswith(tail),'tail'
k=src.rindex(tail)
src=src[:k]+js+'\n'+src[k:]
open(H,'w',encoding='utf-8').write(src)
print('OK',len(src))
