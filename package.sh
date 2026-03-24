#!/usr/bin/env bash
# Creates tabnuker.zip ready for upload to the Chrome Web Store.
set -e

OUT="tabnuker.zip"
rm -f "$OUT"

zip "$OUT" \
  manifest.json \
  popup.html \
  popup.js \
  popup.css \
  background.js \
  icons/icon16.png \
  icons/icon48.png \
  icons/icon128.png

echo "Created $OUT"
echo ""
unzip -l "$OUT"
