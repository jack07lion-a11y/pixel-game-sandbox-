p='/mnt/user-data/outputs/pixel-game.html'
s=open(p,encoding='utf-8').read()
js=open('mapmod.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:70],s.count(a)); s=s.replace(a,b)
rep("function loop(t){",js+"function loop(t){")
rep("</style></head><body>","""#gm{position:fixed;inset:0;display:none;background:#02050c;z-index:50;touch-action:none}#gc{display:block;width:100%;height:100%;touch-action:none}
#gm button{position:absolute;width:44px;height:44px;border-radius:50%;border:2px solid #fff;background:rgba(20,40,80,.85);color:#fff;font-size:18px;padding:0}
#gx{right:12px;top:calc(env(safe-area-inset-top,0px) + 10px)}#gs{right:12px;top:calc(env(safe-area-inset-top,0px) + 64px)}#gp{right:12px;bottom:90px}#gq{right:12px;bottom:36px}
</style></head><body>""")
rep('<button id="mute">🔊</button>','<button id="mute">🔊</button>\n<div id="gm"><canvas id="gc"></canvas><button id="gx">✕</button><button id="gs">🌍</button><button id="gp">＋</button><button id="gq">－</button></div>')
open(p,'w',encoding='utf-8').write(s)
