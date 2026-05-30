# Termux ile v1.0.9 ZIP gönderme

ZIP dosyası Download klasöründeyse:

```bash
termux-setup-storage
pkg update -y
pkg install git unzip rsync -y
```

```bash
cd ~
git clone https://github.com/hayatimizoyunyoutube/test.git hayatimiz-test
```

Klasör zaten varsa:

```bash
cd ~/hayatimiz-test
git remote set-url origin https://github.com/hayatimizoyunyoutube/test.git
```

ZIP'i temiz aktar:

```bash
ZIP="/sdcard/Download/hayatimiz-oyun-v1.0.9-stabilite.zip"
REPO="$HOME/hayatimiz-test"
TMP="$HOME/zip-temp-v109"

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

GitHub'a gönder:

```bash
cd ~/hayatimiz-test
git add .
git commit -m "v1.0.9 stabilite" || true
git branch -M main
git push origin main --force
```

## Supabase Run

Gerekli değil.
