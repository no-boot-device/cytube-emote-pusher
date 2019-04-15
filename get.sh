#!/bin/bash
if [[ $2 == *"deviantart"* ]]; then
	oembed=$(curl "https://backend.deviantart.com/oembed?url=$2" 2>/dev/null)
	ext=$(echo $oembed|jq -r .imagetype)
	url=$(echo $oembed|jq -r .url)
else
	url=$2
	# python2 -c "from urlparse import urlparse;print urlparse('$url').path.split('.')[-1]"
	ext=$(curl -I $url 2>/dev/null|grep Content-Type|rev|cut -d \/ -f 1|rev|sed 's/[^a-zA-Z]//ig')
fi
wget -LO push/emotes/$1.$ext $url
