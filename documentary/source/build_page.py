# -*- coding: utf-8 -*-
import base64, html, os, json, sys
sys.path.insert(0, os.path.dirname(__file__))
from shots import SHOTS, STYLE, NEG, VIDRULES
HERE = os.path.dirname(__file__)
TH = os.path.join(HERE, 'thumbs')
TOTAL = 337.27

def tc(s):
    m = int(s // 60); r = s - m * 60
    return f"{m}:{r:04.1f}"

def thumb(sid):
    p = os.path.join(TH, sid + '.jpg')
    if not os.path.exists(p): return ''
    return 'data:image/jpeg;base64,' + base64.b64encode(open(p, 'rb').read()).decode()

TYPE = {'MG': ('מושן גרפיקס', 'mg'), 'AI': ('שוט AI', 'ai'), 'REAL': ('צילום אמיתי', 'real')}
e = html.escape

rows = []
strip = []
counts = {'MG': 0, 'AI': 0, 'REAL': 0}
for i, (a, b, typ, sid, nar, p) in enumerate(SHOTS):
    counts[typ] += 1
    label, cls = TYPE[typ]
    anchor = sid.lower().replace('-', '')
    alt = nar.startswith('(')
    if not alt:
        strip.append(f'<a class="seg {cls}" href="#{anchor}" style="right:{a/TOTAL*100:.3f}%;width:{max((b-a)/TOTAL*100,.35):.3f}%" title="{e(sid)} · {tc(a)}"></a>')
    body = []
    if typ == 'MG':
        fn = f"{sid}.mp4"
        t = thumb(sid)
        body.append('<div class="mg">' + (f'<img src="{t}" alt="פריים מתוך {e(sid)}" loading="lazy" width="480" height="270">' if t else '') +
                     f'<div class="files"><span class="k">קבצים</span><code>mg/{fn}</code><span class="k">אורך</span><span class="num">{b-a:.2f} שנ׳</span></div></div>')
    if typ == 'AI':
        full_img = p['img'] + ' ' + STYLE
        full_vid = p['vid'] + ' ' + VIDRULES
        body.append(f'''<div class="prompt"><div class="ph"><span>פרומפט לתמונה</span><button type="button" class="copy" data-t="{e(full_img)}">העתקה</button></div><p dir="ltr">{e(p['img'])} <span class="sty">+ בלוק הסגנון</span></p></div>''')
        body.append(f'''<div class="prompt"><div class="ph"><span>פרומפט להנפשה · עד 6 שנ׳</span><button type="button" class="copy" data-t="{e(full_vid)}">העתקה</button></div><p dir="ltr">{e(p['vid'])} <span class="sty">+ כללי תנועה</span></p></div>''')
    if p.get('links'):
        lis = ''.join(f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(t)}</a></li>' for t, u in p['links'])
        body.append(f'<div class="links"><span class="k">{"מקורות לצילום" if typ=="REAL" else "חומר אמיתי לשילוב"}</span><ul>{lis}</ul></div>')
    if p.get('note'):
        body.append(f'<p class="note">{e(p["note"])}</p>')
    rows.append(f'''<article class="row {cls}{' alt' if alt else ''}" id="{anchor}">
  <div class="meta"><span class="time num" dir="ltr">{tc(a)}<i>–</i>{tc(b)}</span><span class="chip {cls}">{label}</span><span class="sid num">{e(sid.upper())}</span></div>
  <div class="main"><blockquote>{e(nar)}</blockquote>{''.join(body)}</div>
</article>''')

ticks = ''.join(f'<span class="tick num" style="right:{m*60/TOTAL*100:.2f}%">{m}:00</span>' for m in range(0, 6))

page = f'''<title>מפת השוטים: פרשה 512</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800&family=Frank+Ruhl+Libre:wght@700;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* Layout: edit-room log. A timeline strip of the whole cut, then one row per shot: timecode rail on the right, content on the left. */
:root{{
  --bg:#f3f1ec; --panel:#ffffff; --ink:#1b1d20; --dim:#5f646b; --rule:#dcd8cf;
  --red:#b8281f; --ai:#2f5d86; --real:#9a6a12;
  --red-bg:#f7e3e1; --ai-bg:#e2ebf4; --real-bg:#f4ead6;
  --code:#ece9e2;
  --f-display:'Frank Ruhl Libre','David',Georgia,serif;
  --f-body:'Heebo','Arial Hebrew',Arial,sans-serif;
  --f-mono:'IBM Plex Mono',ui-monospace,Menlo,monospace;
}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{
  --bg:#0c0e11; --panel:#14181d; --ink:#ece6d9; --dim:#98a0a8; --rule:#262c33;
  --red:#e2463b; --ai:#7fb0dc; --real:#d9a441;
  --red-bg:#2a1413; --ai-bg:#132232; --real-bg:#2a2112; --code:#1b2026; color-scheme:dark}}}}
:root[data-theme="dark"]{{
  --bg:#0c0e11; --panel:#14181d; --ink:#ece6d9; --dim:#98a0a8; --rule:#262c33;
  --red:#e2463b; --ai:#7fb0dc; --real:#d9a441;
  --red-bg:#2a1413; --ai-bg:#132232; --real-bg:#2a2112; --code:#1b2026; color-scheme:dark}}
*{{box-sizing:border-box}}
body{{background:var(--bg);color:var(--ink);font-family:var(--f-body);font-size:16px;line-height:1.6;margin:0}}
.wrap{{max-width:1080px;margin:0 auto;padding-inline:20px;padding-block:32px 80px}}
.num{{font-family:var(--f-mono);font-variant-numeric:tabular-nums}}
header h1{{font-family:var(--f-display);font-weight:900;font-size:clamp(34px,5vw,54px);line-height:1.05;margin:0;text-wrap:balance}}
header .sub{{color:var(--dim);margin:10px 0 0;max-width:62ch}}
.counts{{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:18px;font-weight:600}}
.counts span b{{font-family:var(--f-mono);font-weight:500;margin-inline-end:6px}}
.chip{{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.06em;padding:2px 9px;border-radius:3px;white-space:nowrap}}
.chip.mg{{background:var(--red-bg);color:var(--red)}} .chip.ai{{background:var(--ai-bg);color:var(--ai)}} .chip.real{{background:var(--real-bg);color:var(--real)}}
.strip{{position:relative;height:44px;margin:28px 0 30px;border-block:1px solid var(--rule)}}
.strip .bar{{position:absolute;inset:8px 0 14px;background:var(--code)}}
.seg{{position:absolute;top:8px;bottom:14px;display:block}}
.seg.mg{{background:var(--red)}} .seg.ai{{background:var(--ai)}} .seg.real{{background:var(--real)}}
.seg:hover,.seg:focus-visible{{outline:2px solid var(--ink);outline-offset:1px;z-index:2}}
.tick{{position:absolute;bottom:-4px;font-size:11px;color:var(--dim);transform:translateX(50%)}} .tick:first-of-type{{transform:none}}
section.style{{background:var(--panel);border:1px solid var(--rule);padding:18px 20px;margin-bottom:34px;display:grid;gap:14px}}
section.style h2{{font-size:18px;margin:0;font-weight:800}}
section.style p.lead{{margin:0;color:var(--dim);max-width:70ch}}
.prompt{{margin-top:12px}}
.ph{{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px;font-weight:800;color:var(--dim);letter-spacing:.03em}}
.prompt p{{margin:6px 0 0;background:var(--code);padding:12px 14px;font-family:var(--f-mono);font-size:13.5px;line-height:1.55;text-align:left;overflow-wrap:anywhere}}
.sty{{color:var(--ai);font-weight:500}}
button.copy{{font:inherit;font-size:12px;font-weight:800;border:1px solid var(--rule);background:var(--panel);color:var(--ink);padding:3px 12px;cursor:pointer;border-radius:3px}}
button.copy:hover{{border-color:var(--ink)}} button.copy:focus-visible{{outline:2px solid var(--ai);outline-offset:2px}}
button.copy.ok{{color:var(--ai);border-color:var(--ai)}}
.row{{display:grid;grid-template-columns:170px minmax(0,1fr);gap:22px;padding:22px 0;border-top:1px solid var(--rule);scroll-margin-top:20px}}
.row.alt{{padding-top:4px;border-top:none}}
.meta{{display:flex;flex-direction:column;gap:8px;align-items:flex-start}}
.time{{font-size:15px;font-weight:500}} .time i{{font-style:normal;color:var(--dim);margin:0 3px}}
.sid{{font-size:12px;color:var(--dim)}}
.main{{min-width:0}}
blockquote{{margin:0;font-family:var(--f-display);font-weight:700;font-size:20px;line-height:1.45;text-wrap:pretty;max-width:62ch}}
.row.alt blockquote{{font-family:var(--f-body);font-size:14px;font-weight:600;color:var(--dim)}}
.mg{{display:flex;flex-wrap:wrap;gap:16px;margin-top:14px;align-items:flex-start}}
.mg img{{width:min(480px,100%);height:auto;aspect-ratio:16/9;display:block;background:#000}}
.files{{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-content:start;font-size:13px}}
.files code{{grid-column:2;font-family:var(--f-mono);font-size:12.5px;background:var(--code);padding:1px 6px;justify-self:start;direction:ltr}}
.files .k{{grid-column:1}} .k{{font-size:12px;font-weight:800;color:var(--dim);letter-spacing:.04em}}
.links{{margin-top:14px}}
.links ul{{margin:6px 0 0;padding:0 18px 0 0;display:grid;gap:4px}}
.links a{{color:var(--ink);text-decoration-color:var(--real);text-underline-offset:3px}}
.links a:hover{{color:var(--real)}}
.note{{margin:12px 0 0;font-size:14px;color:var(--dim);max-width:70ch}}
.foot{{margin-top:40px;padding-top:18px;border-top:1px solid var(--rule);color:var(--dim);font-size:14px;max-width:75ch}}
@media (max-width:640px){{.row{{grid-template-columns:1fr;gap:10px}} .meta{{flex-direction:row;flex-wrap:wrap;align-items:center}} blockquote{{font-size:18px}}}}
@media (prefers-reduced-motion:no-preference){{html{{scroll-behavior:smooth}}}}
</style>
<div class="wrap" dir="rtl">
<header>
  <h1>מפת השוטים: פרשה 512</h1>
  <p class="sub">מפת עבודה לעריכה, מסונכרנת להקלטת הקריין (5:37). כל שורה היא קטע בציר הזמן: מושן גרפיקס מוכן, שוט AI עם פרומפטים, או צילום אמיתי עם קישורים. זמני הקטעים נמדדו מההקלטה, בדיוק של כחצי שנייה.</p>
  <div class="counts"><span class="chip mg">מושן גרפיקס</span><span><b>{counts['MG']}</b>סצנות מרונדרות</span><span class="chip ai">שוט AI</span><span><b>{counts['AI']}</b>שוטים</span><span class="chip real">צילום אמיתי</span><span><b>{counts['REAL']}</b>קטעים</span></div>
</header>
<nav class="strip" aria-label="ציר הזמן של הסרטון"><div class="bar"></div>{''.join(strip)}{ticks}</nav>
<section class="style">
  <h2>בלוק הסגנון לשוטי ה־AI</h2>
  <p class="lead">כפתור ההעתקה בכל שוט כבר מצרף את הבלוק הזה לפרומפט. הדמויות בלי פנים, כדי שלא תצטרך לדייק תווי פנים של אנשים אמיתיים.</p>
  <div class="prompt"><div class="ph"><span>סגנון (מצורף לכל פרומפט תמונה)</span><button type="button" class="copy" data-t="{e(STYLE)}">העתקה</button></div><p dir="ltr">{e(STYLE)}</p></div>
  <div class="prompt"><div class="ph"><span>נגטיב</span><button type="button" class="copy" data-t="{e(NEG)}">העתקה</button></div><p dir="ltr">{e(NEG)}</p></div>
  <div class="prompt"><div class="ph"><span>כללי תנועה (מצורפים לכל פרומפט וידאו)</span><button type="button" class="copy" data-t="{e(VIDRULES)}">העתקה</button></div><p dir="ltr">{e(VIDRULES)}</p></div>
</section>
{''.join(rows)}
<p class="foot">קבצי המושן גרפיקס נמצאים בריפו, בתיקייה <code>documentary/mg</code>, בלי סאונד ומוכנים לעריכה. הקובץ <code>documentary/animatic.mp4</code> מציג את כל הסרטון עם הקריינות: הגרפיקה במקומה וכרטיסי ממלא מקום לשוטי AI ולצילומים האמיתיים. בסצנות עם טלוויזיה יש מסך ירוק נקי לקי. הקישורים לכתבות ולסרטונים נועדו לאיתור החומר. זכויות השימוש בצילומי חדשות שייכות לגופי השידור, וצריך לבדוק אותן לפני פרסום.</p>
</div>
<script>
document.querySelectorAll('button.copy').forEach(b=>b.addEventListener('click',()=>{{
  const t=b.dataset.t;const done=()=>{{b.textContent='הועתק';b.classList.add('ok');setTimeout(()=>{{b.textContent='העתקה';b.classList.remove('ok')}},1600)}};
  try{{navigator.clipboard.writeText(t).then(done,()=>sel(b))}}catch(_){{sel(b)}}
}}));
function sel(b){{const p=b.closest('.prompt').querySelector('p');const r=document.createRange();r.selectNodeContents(p);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='סומן, העתק ידנית'}}
</script>
'''
out = sys.argv[1]
open(out, 'w').write(page)
print('written', out, len(page))
