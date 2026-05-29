@echo off
chcp 65001 >nul
title Hayatımız Oyun Yeni Sistem v0.0.2 - GitHub Gonder
cd /d "C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test"

echo.
echo ========================================
echo  GitHub temiz gonderim: hayatimizoyunyoutube/test
echo ========================================
echo.

if not exist package.json (
  echo HATA: package.json bulunamadi. Dogru klasorde degilsin.
  pause
  exit /b 1
)

if not exist .git (
  git init
)

git branch -M main

git remote remove origin 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/test.git

git add .
git commit -m "v0.0.2 admin oyun yonetimi"

echo.
echo GitHub'a force push yapiliyor...
git push -f origin main

echo.
echo Bitti. Vercel uzerinden Redeploy yapabilirsin.
pause
