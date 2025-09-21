# La Coiffure Salon - Static Website

A beautiful, responsive salon website built with React and Vite, optimized for static hosting on Vercel or Netlify.

## 🌟 Features

- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Built with Tailwind CSS and Framer Motion
- **Static Hosting Ready** - No backend required
- **SEO Optimized** - Complete meta tags and structured data
- **Fast Loading** - Optimized for performance
- **Custom Domain Ready** - Easy to connect your domain

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd lcs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:4028`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

### Option 1: Deploy to Vercel

1. **Connect your GitHub repository to Vercel**
2. **Vercel will automatically detect the build settings**
3. **Deploy!**

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Option 2: Deploy to Netlify

1. **Connect your GitHub repository to Netlify**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy!**

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: Deploy to any static host

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents to your hosting provider**

## 🔧 Custom Domain Setup

### For Vercel:
1. Go to your project dashboard
2. Click on "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Netlify:
1. Go to your site dashboard
2. Click on "Domain management"
3. Add your custom domain
4. Update DNS records as instructed

## 📁 Project Structure

```
lcs/
├── public/                 # Static assets
│   ├── assets/images/     # Images
│   ├── lcss.mp4          # Video background
│   └── favicon.ico       # Favicon
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── data/             # Static data
│   ├── styles/           # CSS files
│   └── utils/            # Utility functions
├── vercel.json           # Vercel configuration
├── netlify.toml          # Netlify configuration
└── vite.config.mjs       # Vite configuration
```

## 🎨 Customization

### Update Salon Information
Edit `src/data/staticData.js` to update:
- Contact information
- Services
- Stylists
- Gallery images
- Testimonials

### Update Branding
- Replace logo in `public/` directory
- Update colors in `tailwind.config.js`
- Modify meta tags in `index.html`

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/Routes.jsx`
3. Update navigation if needed

## 🚀 Performance Optimizations

- **Code Splitting** - Automatic chunk splitting
- **Image Optimization** - Optimized images in public folder
- **Lazy Loading** - Components load on demand
- **Caching** - Proper cache headers for static assets
- **Minification** - Production builds are minified

## 📱 Mobile Responsive

The website is fully responsive and works great on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔍 SEO Features

- Complete meta tags
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URLs

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

## 📄 License

This project is private and proprietary to La Coiffure Salon.

## 🆘 Support

For any issues or questions, please contact the development team.

---

**Ready to go live!** 🎉