@echo off
chcp 65001 >nul
title Hayatımız Oyun Yeni Sistem v0.0.2 - Local Kurulum
cd /d "C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test"

echo.
echo ========================================
echo  Hayatimiz Oyun Yeni Sistem v0.0.2
echo  Local kurulum basliyor
echo ========================================
echo.

if not exist package.json (
  echo HATA: package.json bulunamadi. ZIP dosyasini dogru klasore cikardigindan emin ol.
  pause
  exit /b 1
)

if not exist .env.local (
  echo UYARI: .env.local yok. .env.example dosyasini kopyalayip .env.local yapmalisin.
  echo Simdilik kurulum devam edecek ama API/Supabase baglantisi calismayabilir.
)

echo Paketler kuruluyor...
call npm install
if errorlevel 1 (
  echo npm install sirasinda hata oldu.
  pause
  exit /b 1
)

echo.
echo Local site aciliyor: http://localhost:3000
call npm run dev
pause
