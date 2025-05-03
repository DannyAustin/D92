@echo off
cd /d %~dp0
powershell -Command "Start-Process 'C:\nginx\nginx.exe' -ArgumentList '-c C:\Users\Danny\Documents\Code\Perplexity\d92\nginx\nginx.conf' -Verb RunAs -WindowStyle Hidden" 