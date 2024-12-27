#!/bin/bash

input_url=$1

if [ -z "$input_url" ]; then
  echo "Must enter a url to scrape"
  exit 1
fi

curl -s "$input_url" | sed -E 's/<iframe[^>]*src="([^"]*)".*/\1/g; s/<[^>]*>//g' | grep http | awk '{print $1}' | grep -E "^http"
