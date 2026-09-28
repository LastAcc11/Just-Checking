#!/bin/bash
# render + encode one scene: one.sh sid data
cd "$(dirname "$0")"
sid=$1; data=$2; [ "$data" = "-" ] && data=""
out=frames/$sid; rm -rf $out
node rmg.js $sid "$data" $out full > logs/$sid.log 2>&1 || { echo "FAIL $sid"; exit 1; }
S0=$(grep -oE "const S0=[0-9.]+" scenes/$sid.js | head -1 | cut -d= -f2)
DUR=$(grep -oE "dur [0-9.]+" logs/$sid.log | awk '{print $2}')
mkdir -p ../out/clean ../out/voice
../ffmpeg -hide_banner -loglevel error -y -framerate 30 -i $out/f%04d.jpg -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -movflags +faststart ../out/clean/$sid.mp4
../ffmpeg -hide_banner -loglevel error -y -framerate 30 -i $out/f%04d.jpg -ss $S0 -t $DUR -i "/root/.claude/uploads/ced92b28-d855-560e-add1-b08db6470c3b/c2d7f3a6-Untitled.mp3" -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart ../out/voice/$sid.mp4
echo "$sid $S0 $DUR" >> logs/done.txt
echo "OK $sid start=$S0 dur=$DUR"
