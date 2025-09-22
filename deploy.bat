@echo off
echo Building and deploying to Vercel...
cd frontend
npm run build
cd ..
vercel --prod
echo Deployment complete!
pause
