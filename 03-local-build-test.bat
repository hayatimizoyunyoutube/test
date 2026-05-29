@echo off
chcp 65001 >nul
title Hayatımız Oyun Yeni Sistem v0.0.2 - Build Test
cd /d "C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test"

echo Build kontrolu basliyor...
call npm install
call npm run build
pause
