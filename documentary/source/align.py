import re,subprocess,numpy as np,librosa,json
text=open('transcript.txt').read()
text=re.sub(r'-{3,}','',text).replace('־',' ').replace('"','')
parts=[p.strip() for p in re.split(r'(?<=[.,:!?\-–])\s+|\n+',text) if p.strip()]
SR=16000
aud=[];bounds=[];t=0
for i,p in enumerate(parts):
    fn=f'align/p{i:03d}.wav'
    subprocess.run(['espeak-ng','-v','he','-s','175','-w',fn,p],check=True)
    y,_=librosa.load(fn,sr=SR)
    y,_=librosa.effects.trim(y,top_db=35)
    bounds.append((t,t+len(y)/SR)); t+=len(y)/SR
    aud.append(y); gap=np.zeros(int(.25*SR)); aud.append(gap); t+=.25
syn=np.concatenate(aud)
real,_=librosa.load('/root/.claude/uploads/ced92b28-d855-560e-add1-b08db6470c3b/c2d7f3a6-Untitled.mp3',sr=SR)
hop=int(SR/40)
def feat(y):
    m=librosa.feature.mfcc(y=y,sr=SR,n_mfcc=20,hop_length=hop,n_fft=1024)[1:]
    m=(m-m.mean(1,keepdims=True))/(m.std(1,keepdims=True)+1e-6)
    e=librosa.feature.rms(y=y,hop_length=hop,frame_length=1024)
    e=np.log(e+1e-4); e=(e-e.mean())/e.std()
    return np.vstack([m,3*e])
A=feat(syn);B=feat(real)
print(A.shape,B.shape)
D,wp=librosa.sequence.dtw(X=A,Y=B,metric='cosine',global_constraints=True,band_rad=0.12)
wp=wp[::-1]
fr=hop/SR
# map synthetic time -> real time
sx=wp[:,0]*fr; ry=wp[:,1]*fr
def m(ts): i=np.searchsorted(sx,ts); i=min(i,len(ry)-1); return float(ry[i])
res=[(m(a),m(b),p) for (a,b),p in zip(bounds,parts)]
json.dump(res,open('align/phrases.json','w'),ensure_ascii=False,indent=0)
for a,b,p in res: print(f"{a:6.2f}-{b:6.2f}  {p}")
