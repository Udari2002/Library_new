@echo off
echo 🔍 CHECKING DEPLOYMENT STATUS...
echo.

echo Testing Frontend at http://98.84.69.78:3000
powershell -c "try { $r = Invoke-WebRequest -Uri 'http://98.84.69.78:3000' -TimeoutSec 3 -UseBasicParsing; Write-Host '✅ FRONTEND WORKING!' -ForegroundColor Green } catch { Write-Host '❌ Frontend not working' -ForegroundColor Red }"

echo.
echo Testing Backend at http://98.84.69.78:5001
powershell -c "try { $r = Invoke-WebRequest -Uri 'http://98.84.69.78:5001' -TimeoutSec 3 -UseBasicParsing; Write-Host '✅ BACKEND WORKING!' -ForegroundColor Green } catch { Write-Host '❌ Backend not working' -ForegroundColor Red }"

echo.
echo 📊 DEPLOYMENT STATUS:
powershell -c "$f = try { (Invoke-WebRequest -Uri 'http://98.84.69.78:3000' -TimeoutSec 2 -UseBasicParsing).StatusCode -eq 200 } catch { $false }; $b = try { (Invoke-WebRequest -Uri 'http://98.84.69.78:5001' -TimeoutSec 2 -UseBasicParsing).StatusCode -eq 200 } catch { $false }; if($f -and $b) { Write-Host '🎉 APP FULLY DEPLOYED AND WORKING!' -ForegroundColor Green } elseif($f -or $b) { Write-Host '⚠️  PARTIALLY DEPLOYED' -ForegroundColor Yellow } else { Write-Host '❌ APP NOT DEPLOYED' -ForegroundColor Red }"

pause