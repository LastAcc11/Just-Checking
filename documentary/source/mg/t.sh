#!/bin/bash
# usage: t.sh sid [data]
cd "$(dirname "$0")"
rm -rf test/$1 && node rmg.js $1 "$2" test/$1 test && ../ffmpeg -hide_banner -loglevel error -y -i test/$1/f%04d.jpg -vf "scale=640:-1,tile=3x3" -frames:v 1 test/$1_sheet.jpg && echo sheet test/$1_sheet.jpg
