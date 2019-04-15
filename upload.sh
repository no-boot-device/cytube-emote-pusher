#!/bin/bash
neocities push push/
echo -n ""> emotelist.csv
for e in push/emotes/*; do
	if [[ "$e" == ".gitkeep" ]]; then; continue; fi
	image="https://zoewhy.neocities.org/emotes/$(basename $e)"
	name=":$(basename $(rev <<<"$e"|cut -d"." -f2-|rev)):"
	echo "$name,$image"|tee -a emotelist.csv
done
python2 ./fuck.py > emotelist.json
cat emotelist.json
node ./cytube.js
