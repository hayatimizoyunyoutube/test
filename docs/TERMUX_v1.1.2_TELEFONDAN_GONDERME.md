# v1.1.2 Termux ile GitHub'a Gönderme

```bash
cd ~/hayatimiz-test
git remote set-url origin https://github.com/hayatimizoyunyoutube/test.git
```

```bash
ZIP="/sdcard/Download/hayatimiz-oyun-v1.1.2-supabase-icerik-ekleme.zip"
REPO="$HOME/hayatimiz-test"
TMP="$HOME/zip-temp-v112"

rm -rf "$TMP"
mkdir -p "$TMP"

unzip -o "$ZIP" -d "$TMP"

if [ -f "$TMP/package.json" ]; then
  SRC="$TMP"
else
  SRC="$(find "$TMP" -mindepth 1 -maxdepth 1 -type d | head -n 1)"
fi

cd "$REPO"

find . -mindepth 1 \
  ! -path "./.git" \
  ! -path "./.git/*" \
  -exec rm -rf {} +

rsync -a "$SRC"/ "$REPO"/

git status
```

```bash
git add .
git commit -m "v1.1.2 supabase icerik ekleme" || true
git branch -M main
git push origin main --force
```
