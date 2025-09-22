# Vercel Deployment Guide

## 🚀 Quick Deploy

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration
1. Connect your GitHub repo to Vercel
2. Vercel will auto-deploy on every push
3. Configure build settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## ⚙️ Configuration

### vercel.json (already configured)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/frontend/dist/assets/$1"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|webp|ico|svg|woff|woff2|ttf|eot|mp4|json|txt|xml))",
      "dest": "/frontend/dist/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/index.html"
    }
  ]
}
```

## 🔧 Troubleshooting 404 Errors

### 1. Check Build Output
```bash
cd frontend
npm run build
ls dist/
```
Should see: `index.html`, `assets/`, and all your files

### 2. Verify Routes
- All React routes should redirect to `index.html`
- Static files (images, CSS, JS) should be served directly
- Check Vercel function logs for errors

### 3. Common Issues
- **Wrong root directory**: Should be `frontend`
- **Missing build command**: Should be `npm run build`
- **Wrong output directory**: Should be `dist`
- **Cache issues**: Clear browser cache or test in incognito

### 4. Test Routes
Try accessing these URLs directly:
- `yoursite.vercel.app/services-catalog`
- `yoursite.vercel.app/gallery-portfolio`
- `yoursite.vercel.app/contact-location`

All should load the React app, not show 404.

## 📊 Performance Optimizations

### Image Optimization
```bash
# Optimize images before deploy
cd frontend
npm run optimize-images
npm run build
```

### Build Optimization
- Images are automatically optimized by Vercel
- Static assets are cached for 1 year
- CDN distribution worldwide

## 🚀 Deploy Commands

```bash
# Build locally
cd frontend
npm run build

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

## 📝 Environment Variables

If you need environment variables:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add your variables

## 🔍 Debugging

### Check Vercel Logs
```bash
# View function logs
vercel logs

# View specific deployment logs
vercel logs [deployment-url]
```

### Local Testing
```bash
# Test build locally
cd frontend
npm run build
npx serve dist

# Test on localhost:3000
```

---

**Note**: Vercel automatically handles SPA routing with the configuration above. All routes will redirect to `index.html` and React Router will handle the client-side routing.
