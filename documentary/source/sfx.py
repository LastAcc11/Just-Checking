# -*- coding: utf-8 -*-
"""Sound-effects stem for the 512 documentary. Every cue is synthesized (no samples, no music)
and placed on the global timeline (seconds from the start of the narration)."""
import numpy as np, sys, csv
from scipy import signal
SR = 44100
TOTAL = 337.3
R = np.random.default_rng(512)

def t_(d): return np.arange(int(d * SR)) / SR
def ex(x, k): return np.exp(-k * x)
def nz(d): return R.standard_normal(int(d * SR))
def lp(x, f, o=2):
    b, a = signal.butter(o, f / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2):
    b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, f0, f1, o=2):
    b, a = signal.butter(o, [f0 / (SR / 2), min(f1, SR / 2 * .95) / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def fade(x, a=.004, r=.01):
    n = len(x); na = max(1, int(a * SR)); nr = max(1, int(r * SR))
    e = np.ones(n); e[:na] = np.linspace(0, 1, na); e[-nr:] = np.linspace(1, 0, nr); return x * e

def sweepnoise(d, f0, f1, width=1.1, peak=.5):
    """band of noise whose centre frequency glides f0 -> f1 (log), amplitude peaks at `peak` of the length."""
    n = nz(d)
    f, tt, Z = signal.stft(n, SR, nperseg=1024)
    c = f0 * (f1 / f0) ** (tt / tt[-1])
    m = np.exp(-0.5 * (np.log2(np.maximum(f[:, None], 1) / c[None, :]) / width) ** 2)
    _, y = signal.istft(Z * m, SR, nperseg=1024)
    y = y[:int(d * SR)]
    x = np.linspace(0, 1, len(y))
    env = np.where(x < peak, (x / peak) ** 1.6, ((1 - x) / (1 - peak)) ** 1.3)
    return y / (np.abs(y).max() + 1e-9) * env

# ---------------- sound library ----------------
def whoosh(d=.6, f0=250, f1=3500, peak=.55, width=1.1): return sweepnoise(d, f0, f1, width, peak)
def swell(d=1.5, f0=200, f1=2500): return sweepnoise(d, f0, f1, 1.6, .92)
def down(d=1.5, f0=2500, f1=120): return sweepnoise(d, f0, f1, 1.4, .1)
def thump(f=95, d=.4, click=.4):
    t = t_(d); y = np.sin(2 * np.pi * (f * .45 * t + f * .55 * (1 - ex(t, 30)) / 30 * 0 + 0)) * 0
    ph = 2 * np.pi * np.cumsum(f * (.45 + .55 * ex(t, 24))) / SR
    y = np.sin(ph) * ex(t, 9)
    c = hp(nz(.02), 1500) * ex(t_(.02), 200) * click
    y[:len(c)] += c; return np.tanh(y * 1.4) * .9
def boom(d=3.2):
    t = t_(d)
    sub = np.sin(2 * np.pi * np.cumsum(70 * ex(t, .9) + 26) / SR) * ex(t, 1.6)
    body = lp(nz(d), 500) * ex(t, 3.0) * 2.2
    crack = hp(nz(d), 1800) * ex(t, 45) * 1.6
    debris = hp(nz(d), 3000) * (R.random(len(t)) > .9994) * ex(np.maximum(t - .25, 0), 1.2) * 3 * (t > .25)
    debris = lp(debris, 6000)
    y = np.tanh((sub * 1.6 + body + crack) * 1.3) + debris * .4
    return y * np.clip(t * 400, 0, 1)
def ring(d=3.0):
    t = t_(d); return (np.sin(2 * np.pi * 3900 * t) * .5 + np.sin(2 * np.pi * 5200 * t) * .2) * ex(t, 1.1) * np.clip(t * 20, 0, 1)
def tick(f=2400, d=.03, g=1.0):
    t = t_(d); y = np.sin(2 * np.pi * f * t) * ex(t, 220) + hp(nz(d), 2500) * ex(t, 300) * .6; return y * g
def click(d=.012):
    t = t_(d); return hp(nz(d), 1500) * ex(t, 400)
def ping(f=880, d=.6, k=7, g=1.0):
    t = t_(d); y = (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * f * 2.01 * t) + .15 * np.sin(2 * np.pi * f * 3.03 * t)) * ex(t, k)
    return fade(y * g, .002, .05)
def ding(f=1320, d=.9): return ping(f, d, 5)
def pop(f=520, d=.09):
    t = t_(d); return np.sin(2 * np.pi * np.cumsum(f * (1 + .8 * ex(t, 40))) / SR) * ex(t, 45)
def stamp(d=.55):
    y = thump(105, d, .9)
    r = bp(nz(d), 300, 2500) * ex(t_(d), 26) * .5
    return np.tanh((y + r) * 1.2)
def paper(d=.45, up=True):
    n = bp(nz(d), 1800, 7500); t = t_(d)
    crack = (R.random(len(t)) > .995) * R.standard_normal(len(t)) * 2
    e = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.3
    return (n * .55 + hp(crack, 2000) * .4) * e
def scratch(d=.9, f0=1200, f1=3200):
    t = t_(d); w = .5 + .5 * np.sin(2 * np.pi * (17 + 9 * t) * t)
    n = sweepnoise(d, f0, f1, .5, .5) * (.4 + .6 * w); return n
def shutter():
    y = np.zeros(int(.16 * SR)); a = click(.02) * 1.2; b = lp(click(.02), 2500) * 1.0
    y[:len(a)] += a; y[int(.05 * SR):int(.05 * SR) + len(b)] += b; return y + bp(nz(.16), 200, 900) * ex(t_(.16), 40) * .4
def gavel(d=.5):
    t = t_(d); y = (np.sin(2 * np.pi * 190 * t) * ex(t, 22) + .6 * np.sin(2 * np.pi * 410 * t) * ex(t, 38)) * .9
    y += lp(nz(d), 3500) * ex(t, 120) * 1.3 + thump(70, d, .2) * .8
    return np.tanh(y * 1.2)
def beep(f=1000, d=.09, g=.7):
    t = t_(d); return fade(np.sin(2 * np.pi * f * t) * g, .003, .02)
def heartbeat():
    y = np.zeros(int(.6 * SR)); a = thump(70, .3, .0) * .9; b = thump(60, .3, .0) * .6
    y[:len(a)] += a; y[int(.24 * SR):int(.24 * SR) + len(b)] += b; return y
def glitch(d=.5):
    t = t_(d); gate = (R.random(int(d * 40) + 1) > .45).repeat(SR // 40)[:len(t)]
    return (hp(nz(d), 1200) * gate * .8 + np.sin(2 * np.pi * 90 * t) * gate * .3) * np.linspace(1, .2, len(t))
def crackle(d=1.0):
    t = t_(d); imp = (R.random(len(t)) > .9985) * R.standard_normal(len(t)); return hp(lp(imp, 9000), 800) * 2.5 * np.linspace(.4, 1, len(t)) * (1 - .3 * np.sin(20 * t) ** 2)
def siren(d=3.0):
    t = t_(d); f = 720 + 160 * np.sin(2 * np.pi * .42 * t)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(2 * np.pi * np.cumsum(f * 2) / SR)
    return lp(y, 1800) * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2 * .5
def servo(d=.9):
    t = t_(d); f = 220 + 260 * (t / d); y = np.sin(2 * np.pi * np.cumsum(f) / SR) * .5 + lp(nz(d), 900) * .3
    return fade(y * np.sin(np.pi * np.clip(t / d, 0, 1)) ** .6, .02, .1)
def lockon():
    a = beep(1800, .06, .7); b = beep(1800, .06, .7); y = np.zeros(int(.5 * SR)); y[:len(a)] += a; y[int(.11 * SR):int(.11 * SR) + len(b)] += b
    th = thump(120, .3, .5); y[int(.2 * SR):int(.2 * SR) + len(th)] += th; return y
def crt_on():
    t = t_(1.0); y = thump(55, 1.0, .2) * ex(t, 6) * 1.2
    st = bp(nz(1.0), 800, 9000) * ex(t, 9) * .7
    hiss = np.sin(2 * np.pi * 9500 * t) * ex(t, 3) * .07
    return np.tanh(y + st + hiss)
def chips(n=4):
    y = np.zeros(int(.6 * SR))
    for i in range(n):
        f = R.uniform(3200, 5600); p = ping(f, .18, 32, .5); o = int(R.uniform(0, .3) * SR); y[o:o + len(p)] += p[:len(y) - o]
    return y
def cash():
    a = ding(2200, .5) * .5; b = ping(3300, .35, 12) * .4; y = np.zeros(int(.7 * SR)); y[:len(a)] += a; y[int(.07 * SR):int(.07 * SR) + len(b)] += b; c=chips(3); k=min(len(y),len(c)); y[:k]+=c[:k]*.4; return y
def bell(f=196, d=2.6):
    t = t_(d); y = sum(a * np.sin(2 * np.pi * f * m * t) * ex(t, k) for m, a, k in [(1, 1, 1.2), (2.0, .5, 1.6), (2.76, .35, 2.4), (5.4, .2, 3.5)])
    return fade(y * .5, .01, .3)
def noteless_low_hit(d=1.4):
    t = t_(d); return np.tanh((np.sin(2 * np.pi * 48 * t) + .6 * np.sin(2 * np.pi * 96 * t)) * ex(t, 2.2) * 1.5) * .9
def typing(n, gap=.045):
    y = np.zeros(int((n * gap + .1) * SR))
    for i in range(n):
        c = tick(R.uniform(1400, 2200), .02, .5); o = int((i * gap + R.uniform(-.008, .008)) * SR); o = max(o, 0); y[o:o + len(c)] += c[:len(y) - o]
    return y

# ---------------- timeline ----------------
CUES = []   # (time, name, func, gain, pan)
def C(t, name, y, g=.6, pan=0.0): CUES.append((t, name, y, g, pan))
def series(t0, t1, n, name, mk, g=.3, pan=0.0):
    for i in range(n): C(t0 + (t1 - t0) * i / max(n - 1, 1), name, mk(i), g, pan)

# ---- 0:00 Tel Aviv intro (scene01)
C(.15, 'pin drop', thump(150, .3, .8), .55)
series(.75, 2.5, 22, 'date roll', lambda i: tick(1700 + 90 * (i % 5), .018), .16)
for j in range(8): C(1.0 + j * .2 + (.2 if j >= 4 else 0), 'digit lock', pop(700, .06), .3)
C(2.95, 'row in', whoosh(.35, 800, 3200, .5), .22, .3)
C(3.6, 'row in', whoosh(.35, 800, 3200, .5), .22, .3)
series(3.65, 4.3, 12, 'clock spin', lambda i: tick(1300, .02), .18)
C(4.3, 'zoom', swell(1.7, 180, 2200), .38)
C(4.55, 'street label', pop(430, .12), .4, -.25)
C(4.5, 'reticle', beep(1500, .05, .4), .3)
C(4.9, 'coords', typing(19, .04), .35)
# ---- 6.0-9.2 street + blast (AI clips are yours)
C(8.28, 'BLAST', boom(3.4), .95)
C(8.32, 'tinnitus', ring(3.2), .1)
C(9.3, 'distant sirens', siren(2.7), .16)
C(9.22, 'debris', crackle(1.6), .25)
# ---- rl01 photos
C(10.62, 'photo cut', shutter(), .35)
# ---- mg02 three names
C(11.95, 'big 3', thump(60, .8, .5), .85)
for i, tt in enumerate([13.25, 14.0, 15.0]): C(tt, 'plaque', noteless_low_hit(1.2), .35 + .04 * i, [.4, 0, -.4][i])
C(16.2, 'tag', whoosh(.5, 400, 2000, .6), .22)
C(18.3, 'tag', whoosh(.5, 400, 2000, .6), .18)
# ---- mg03 target
series(20.3, 20.7, 3, 'chip in', lambda i: whoosh(.25, 900, 3000, .5), .2)
C(20.4, 'reticle sweep', servo(.9), .22, .3)
C(21.75, 'card in', whoosh(.5, 300, 1800, .55), .3, -.2)
C(22.3, 'lock on', lockon(), .55)
C(26.2, 'stamp injured', stamp(), .8, -.1)
C(27.35, 'stamp survived', stamp(), .9, .1)
# ---- mg04 twenty years (28.55 -> 31.2), gavel
series(28.6, 31.2, 19, 'year tick', lambda i: tick(1500 + i * 25, .025), .22)
C(31.2, 'gavel', gavel(), .85)
C(31.25, 'year red', noteless_low_hit(1.0), .3)
# ---- mg05 TV
C(42.2, 'tv on', crt_on(), .6, -.3)
C(42.4, 'title', whoosh(.45, 500, 2600, .5), .22, .3)
C(43.3, 'sub', whoosh(.4, 500, 2400, .5), .16, .3)
for tt in (46.75, 47.95, 48.75): C(tt, 'topic', pop(620, .09), .32, .35)
C(51.4, 'promise', stamp(.5), .5, .3)
# ---- mg06 wife / parents
C(57.7, 'kicker', whoosh(.35, 600, 2200, .5), .14)
C(58.8, 'figure', pop(380, .1), .35)
C(59.3, 'line draw', sweepnoise(1.0, 500, 1500, .8, .5) * .6, .25)
C(60.45, 'pregnant tag', pop(700, .09), .35, .3)
C(62.0, 'figure', pop(340, .1), .35, -.3)
C(62.2, 'line draw', sweepnoise(.7, 500, 1500, .8, .5) * .6, .25, -.3)
C(62.9, 'bridge', ding(660, 1.0), .25)
# ---- mg07 judgment page
C(62.85, 'paper', paper(.5), .3)
C(63.6, 'marker', scratch(1.6), .22)
C(65.9, 'marker', scratch(.9), .22)
C(67.7, 'page shift', whoosh(.6, 250, 900, .5), .2)
C(70.3, 'strike', scratch(.55, 1500, 3800), .3)
for i, tt in enumerate([71.5, 72.48, 73.1, 73.7]): C(tt, 'aspiration', stamp(.35), .3 + .05 * i, [-.3, -.1, .1, .3][i])
# ---- mg08 Lod family + Morocco
C(74.6, 'pin', thump(150, .3, .8), .45)
C(75.4, 'label', pop(430, .12), .35)
series(77.95, 78.9, 10, 'child', lambda i: pop(420 + 22 * i, .06), .26, 0.0)
C(79.6, 'zoom out', whoosh(1.2, 200, 3000, .6), .32)
C(80.0, 'route', sweepnoise(.9, 600, 2000, .7, .5) * .6, .2)
C(80.1, 'pin', pop(500, .1), .35)
# ---- mg09 family tree
C(86.15, 'title', whoosh(.4, 400, 2200, .5), .15)
C(86.6, 'branches', sweepnoise(.95, 700, 1800, .6, .5) * .5, .2)
series(86.95, 87.5, 10, 'child', lambda i: pop(400 + 15 * i, .05), .2)
C(90.8, 'focus', swell(.6, 150, 1200), .25)
C(90.95, 'card', thump(100, .35, .5), .45, .3)
C(93.4, 'card', thump(100, .35, .5), .5, -.3)
C(94.7, 'card', thump(100, .35, .5), .5, 0)
# ---- mg10
C(103.3, 'card', thump(90, .4, .5), .5)
C(104.35, 'stamp unsolved', stamp(.6), .95)
# ---- mg11
C(117.3, 'card', thump(100, .35, .4), .45, .3)
C(119.3, 'card', thump(100, .35, .4), .45, -.3)
C(119.4, 'arrow', whoosh(.8, 300, 2500, .5), .35, .0)
C(119.9, 'hit', stamp(.4), .5)
C(121.2, 'hit', stamp(.4), .35)
series(121.3, 122.4, 5, 'casino chips', lambda i: chips(4), .3)
# ---- mg12 "criminal attack"
C(129.7, 'title', thump(60, .8, .3), .55)
C(131.95, 'row', pop(500, .1), .3)
C(133.0, 'strike', scratch(.5, 1500, 3800), .3)
C(134.05, 'check', ding(1174, 1.0), .35)
C(135.8, 'row', whoosh(.4, 500, 2000, .5), .14)
for i, tt in enumerate([136.4, 136.55, 136.7]): C(tt, 'dot', noteless_low_hit(.8), .28)
# ---- mg13 Israel -> USA
C(137.7, 'pin', thump(150, .3, .8), .4)
C(138.4, 'pause', beep(700, .08, .5), .3)
C(139.8, 'zoom out', swell(1.7, 200, 2600), .38)
C(140.4, 'route', sweepnoise(1.9, 500, 2000, .7, .5) * .6, .2)
C(142.1, 'pin', thump(150, .3, .8), .4)
C(143.3, 'zoom in', whoosh(1.3, 300, 3200, .55), .32)
C(143.95, '2008', stamp(.45), .55)
# ---- mg14 indictment
C(146.6, 'paper', paper(.5), .32)
for tt in (148.4, 150.75, 151.35, 151.9): C(tt, 'charge', stamp(.3), .35)
C(152.5, 'paper shift', whoosh(.6, 250, 900, .5), .2)
C(153.0, 'card', thump(95, .4, .5), .5)
C(155.4, 'name', stamp(.5), .55)
# ---- mg15 eleven countries
C(161.2, 'clock', sweepnoise(2.6, 600, 1400, .6, .5) * .25, .2)
series(161.25, 163.8, 20, 'clock tick', lambda i: tick(1800, .02), .16)
for i in range(11): C(164.2 + i * .26, 'country', ping(660 * 2 ** (i / 12 * 1.0) , .35, 10, .8), .22, R.uniform(-.6, .6))
# ---- rl02 extradition
C(168.1, 'photo', shutter(), .35)
# ---- mg16 court vs TV
C(182.25, 'tv on', crt_on(), .45, .3)
C(184.4, 'divider', whoosh(.7, 200, 2000, .5), .25)
C(185.2, 'photo', thump(100, .35, .5), .4, -.3)
C(185.95, 'gavel', gavel(), .8, -.2)
# ---- mg17 return + 512
C(188.8, 'route', sweepnoise(1.8, 500, 2000, .7, .5) * .6, .2)
C(190.5, 'pin', thump(150, .3, .8), .4)
C(192.9, 'BOX 512', thump(55, 1.0, .5), .9)
C(193.0, 'label', stamp(.5), .45)
# ---- mg18 pyramid
series(195.1, 196.2, 18, 'count', lambda i: tick(1500 + 40 * i, .02), .2)
C(196.7, 'morph', swell(1.5, 250, 2200), .32)
C(198.0, 'links', sweepnoise(1.3, 700, 2000, .7, .5) * .45, .2)
for tt in (201.85, 202.1, 202.35): C(tt, 'tag', pop(560, .08), .28)
C(202.8, 'roles', whoosh(.5, 400, 2200, .5), .2)
C(203.9, 'cash', cash(), .5)
# ---- mg19 scope
C(205.45, 'title', whoosh(.4, 500, 2200, .5), .15)
for tt in (207.05, 208.25, 209.75, 210.9): C(tt, 'stat', thump(95, .35, .5), .5, R.uniform(-.4, .4))
C(212.5, 'bar', sweepnoise(1.5, 300, 1800, .7, .5) * .6, .22)
# ---- mg20 disappears
C(216.0, 'glitch', glitch(.6), .4)
C(216.6, 'vanish', whoosh(.5, 3000, 300, .3), .3)
C(216.55, 'sting', bell(220, 2.0), .22)
# ---- mg21 Avitan
C(217.55, 'card', thump(95, .4, .5), .45)
C(221.6, 'house', thump(85, .4, .5), .5, .4)
for k in range(5): C(222.6 + k * .8, 'ankle monitor', beep(1450, .07, .6), .28, -.3)
# ---- mg22 escape
C(229.8, 'label', pop(430, .12), .35)
C(231.8, 'route', sweepnoise(1.5, 500, 1800, .6, .5) * .55, .2)
C(232.6, 'question', ping(330, 1.3, 3.5), .32)
C(233.3, 'pin', thump(150, .3, .8), .4)
C(238.65, 'route back', sweepnoise(1.7, 500, 1800, .6, .5) * .6, .22)
C(240.6, 'stamp arrested', stamp(.6), .9)
# ---- mg23 verdict
series(247.6, 250.0, 26, 'pages', lambda i: paper(.09) * .9, .2)
C(250.45, 'CONVICTED', stamp(.65), .95)
C(251.5, 'check', ding(1174, 1.0), .35)
C(253.4, 'check', ding(1174, 1.0), .35)
# ---- mg24 responsibility
C(255.6, 'name', pop(300, .1), .3, .3)
C(257.2, 'name', pop(300, .1), .3, 0)
C(258.1, 'name', pop(300, .1), .3, -.3)
C(258.9, 'node', thump(100, .35, .4), .38, .4)
C(259.1, 'node', thump(100, .35, .4), .38, -.4)
C(259.5, 'link cut', crackle(.4), .3)
C(261.0, 'link', sweepnoise(1.0, 500, 1800, .6, .5) * .6, .22)
C(263.2, 'link', sweepnoise(1.2, 500, 1800, .6, .5) * .6, .22)
C(265.6, 'chain', sweepnoise(.8, 500, 1800, .6, .5) * .6, .22)
C(265.7, 'stamp responsible', stamp(.7), .95)
# ---- mg25 sentence + appeal
for i in range(3): C(268.9 + i * .35, 'life sentence', noteless_low_hit(1.4), .5, [.3, 0, -.3][i])
C(268.9, 'locks', thump(120, .3, .6), .3)
C(271.1, 'extra', whoosh(.5, 300, 1800, .5), .2)
C(272.85, 'appeal', swell(.8, 200, 2200), .3)
C(277.4, 'strike', scratch(.5, 1500, 3800), .3)
C(279.2, 'shrink', whoosh(1.2, 900, 300, .4), .2)
C(282.7, 'stamp stands', stamp(.7), .95)
for k in range(4): C(284.1 + k * .95, 'pulse', heartbeat(), .32)
# ---- mg26 Meir
C(286.4, 'card', thump(95, .4, .5), .45)
C(288.1, 'split', whoosh(.9, 300, 2200, .5), .3)
for tt in (291.1, 292.45, 293.4): C(tt, 'plea item', ding(1046, .9), .28)
series(294.7, 296.3, 16, 'sentence count', lambda i: tick(1500 + 30 * i, .02), .2)
# ---- rl03 release + mg05b
C(297.5, 'photo', shutter(), .35)
C(299.3, 'photo', shutter(), .28)
C(302.9, 'tv on', crt_on(), .45)
C(306.85, 'promise', stamp(.5), .5)
# ---- mg27 what remains
series(308.5, 309.7, 12, 'count', lambda i: tick(1400 + 45 * i, .02), .2)
C(311.3, 'icon', thump(95, .35, .4), .35, .3)
C(312.3, 'icon', thump(95, .35, .4), .35, -.3)
for tt in (315.33, 316.5, 317.75): C(tt, 'NAME', bell(174, 3.0), .5)
# ---- mg28 ending
series(321.2, 325, 18, 'node', lambda i: ping(520 + 25 * (i % 6), .3, 12, .7), .13, 0.0)
C(327.0, 'break', whoosh(1.4, 400, 3200, .5), .32)
C(328.8, 'new network', crackle(1.6), .28)
C(332.3, 'line', pop(400, .1), .25)
C(335.3, 'line', stamp(.5), .35)
C(335.6, 'outro', down(1.7, 2400, 90), .38)

# ---------------- mix ----------------
def render():
    n = int(TOTAL * SR); L = np.zeros(n + SR * 5); Rr = np.zeros(n + SR * 5)
    for t, name, y, g, pan in CUES:
        y = np.asarray(y, float)
        pk = np.abs(y).max()
        if pk > 0: y = y / pk
        o = int(t * SR); m = min(len(y), len(L) - o)
        pl = np.cos((pan + 1) * np.pi / 4); pr = np.sin((pan + 1) * np.pi / 4)
        L[o:o + m] += y[:m] * g * pl * 1.414 * .7; Rr[o:o + m] += y[:m] * g * pr * 1.414 * .7
    # light room
    ir = ex(t_(.9), 5.5); irL = nz(.9) * ir; irR = nz(.9) * ir; irL[:2] = irR[:2] = 0
    wl = signal.fftconvolve(L, irL * .05)[:len(L)]; wr = signal.fftconvolve(Rr, irR * .05)[:len(Rr)]
    L = L + wl * .5; Rr = Rr + wr * .5
    st = np.stack([L[:n], Rr[:n]], 1)
    pk = np.abs(st).max(); st = st / pk * .8
    return st

if __name__ == '__main__':
    out = sys.argv[1]
    st = render()
    import wave
    w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(st, -1, 1) * 32767).astype('<i2').tobytes()); w.close()
    with open(sys.argv[2], 'w', newline='', encoding='utf-8') as f:
        cw = csv.writer(f); cw.writerow(['time_s', 'timecode', 'effect'])
        for t, name, y, g, pan in sorted(CUES, key=lambda c: c[0]):
            cw.writerow([f'{t:.2f}', f'{int(t//60)}:{t%60:05.2f}', name])
    print('cues', len(CUES), 'peak', float(np.abs(st).max()))
