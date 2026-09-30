import subprocess,os,sys
sys.path.insert(0,'.');from shots import SHOTS
FF='./ffmpeg';os.makedirs('anim',exist_ok=True)
AUD='/root/.claude/uploads/ced92b28-d855-560e-add1-b08db6470c3b/c2d7f3a6-Untitled.mp3'
TOTAL=337.27
segs=sorted([(a,b,t,s) for a,b,t,s,n,p in SHOTS if not n.startswith('(')])
parts=[];cur=0.0;k=0
V='-vf scale=1280:720,fps=30,format=yuv420p -c:v libx264 -preset veryfast -crf 26 -an'.split()
def run(args):subprocess.run([FF,'-hide_banner','-loglevel','error','-y']+args,check=True)
def black(d):
    global k;k+=1;f=f'anim/p{k:03d}.mp4';run(['-f','lavfi','-i',f'color=c=black:s=1920x1080:r=30','-t',f'{d:.3f}']+V+[f]);parts.append(f)
for a,b,t,s in segs:
    if a>cur+0.02:black(a-cur)
    d=b-max(a,cur);k+=1;f=f'anim/p{k:03d}.mp4'
    if t=='MG':
        src=f'mg/../out/clean/{s}.mp4'
        src='/home/user/Just-Checking/fern-sample/scene01_tel-aviv_clean.mp4' if s=='mg01' else src
        run(['-i',src,'-t',f'{d:.3f}']+V+[f])
    else:
        run(['-loop','1','-i',f'mg/slates/{s}.png','-t',f'{d:.3f}']+V+[f])
    parts.append(f);cur=b
if TOTAL>cur+.02:black(TOTAL-cur)
open('anim/list.txt','w').write(''.join(f"file '{os.path.basename(p)}'\n" for p in parts))
run(['-f','concat','-safe','0','-i','anim/list.txt','-c','copy','anim/video.mp4'])
run(['-i','anim/video.mp4','-i',AUD,'-c:v','copy','-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart','anim/animatic.mp4'])
print('done',len(parts))
