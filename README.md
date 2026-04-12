# Static Site Deployment Test

A simple, lightweight static website for testing deployments across various cloud providers.

## Features

- Fully responsive design
- Interactive elements (click counter with localStorage)
- Environment information display
- Fast loading times
- Zero dependencies
- Works in any modern browser

## Files

- `index.html` - Main HTML page
- `styles.css` - Styling
- `app.js` - JavaScript functionality

## Local Testing

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment Instructions

### Azure Static Web Apps

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy --app-location . --output-location .
```

### Google Cloud Storage

```bash
# Create bucket
gsutil mb gs://your-bucket-name

# Upload files
gsutil -m cp -r * gs://your-bucket-name

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://your-bucket-name

# Enable website configuration
gsutil web set -m index.html gs://your-bucket-name
```

### Netlify

**Option 1: Drag and Drop**
- Go to https://app.netlify.com/drop
- Drag the project folder onto the page

**Option 2: CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### GitHub Pages

```bash
# Initialize git repository (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
# Settings > Pages > Source: main branch
```

### Cloudflare Pages

1. Push code to GitHub/GitLab
2. Connect repository at https://pages.cloudflare.com
3. Configure build settings:
   - Build command: (leave empty)
   - Build output directory: `/`

### DigitalOcean App Platform

```bash
# Install doctl
# Create app spec file or use GUI

# Deploy via GUI:
# 1. Go to App Platform
# 2. Create new app from GitHub/GitLab
# 3. Select Static Site
# 4. Deploy
```

## Cost Comparison

### Free Options (Best for small projects and testing)

**GitHub Pages**
- **Cost**: Free for public repositories
- **Bandwidth**: Soft limit of 100GB/month
- **Best for**: Open source projects, portfolios, documentation

**Cloudflare Pages**
- **Cost**: Free tier with unlimited bandwidth
- **Builds**: 500 builds/month on free tier
- **Best for**: Projects needing global CDN performance at no cost

**Netlify (Free Tier)**
- **Cost**: Free
- **Bandwidth**: 100GB/month
- **Builds**: 300 build minutes/month
- **Best for**: Small to medium traffic sites

**Vercel (Hobby Tier)**
- **Cost**: Free
- **Bandwidth**: 100GB/month
- **Best for**: Personal projects, portfolios

### Low-Cost Pay-As-You-Go

**Google Cloud Storage**
- **Cost**: ~$0.50-2/month for small static sites
- **Pricing**: Similar to AWS
- **Best for**: Existing GCP infrastructure

### Paid Platform Options

**Azure Static Web Apps**
- **Free tier**: Available with limitations
- **Standard**: $9/month
- **Best for**: Microsoft ecosystem integration

**DigitalOcean App Platform**
- **Static sites**: Free tier available
- **Starter**: $5/month for enhanced features
- **Best for**: Simple deployment with predictable pricing

### Cost Factors to Consider

- **Traffic volume**: Higher traffic increases bandwidth costs
- **Build frequency**: Some platforms charge per build
- **Geographic distribution**: CDN usage affects costs
- **SSL certificates**: Usually included free with modern providers
- **Custom domains**: Typically free to configure

### Recommendation by Use Case

- **Testing/Learning**: GitHub Pages or Cloudflare Pages (free, unlimited)
- **Personal Portfolio**: Netlify or Vercel (free tier sufficient)
- **Small Business**: Netlify/Vercel paid tiers or Azure Static Web Apps (scalable)
- **Enterprise**: AWS/GCP/Azure (integration with existing infrastructure)

## Active Deployments

This site is currently deployed on the following platforms:

### Surge.sh
- **URL**: https://test-static-site.surge.sh
- **Status**: Live ✓
- **Deployed**: Sun Apr 12 2026
- **Auto-deploy**: Enabled (GitHub Actions → Surge CLI)
- **Features**: Free tier, automatic SSL, custom domains

### Firebase Hosting
- **URL**: https://test-static-site-e6623.web.app
- **Status**: Live ✓
- **Project Name**: test-static-site-e6623
- **Deployed**: Sun Apr 12 2026
- **Auto-deploy**: Enabled (GitHub Actions → Firebase Hosting)
- **Features**: Free tier, global CDN, automatic SSL

### Azure Static Web Apps
- **URL**: https://blue-tree-00ba0ac03.2.azurestaticapps.net
- **Status**: Live ✓
- **Resource Name**: test-static-site
- **Deployed**: Sat Apr 11 2026
- **Auto-deploy**: Enabled (GitHub Actions → Azure Static Web Apps)
- **Features**: Free tier, global CDN, automatic SSL

### GitHub Pages
- **URL**: https://alexo.github.io/test-static-site/
- **Status**: Live ✓
- **Deployed**: Fri Apr 10 2026
- **Auto-deploy**: Enabled (on push to main branch)
- **Auto-deploy Speed**: ~15 seconds

### Netlify
- **URL**: https://gleaming-marigold-66e0c7.netlify.app
- **Status**: Live ✓
- **Site Name**: gleaming-marigold-66e0c7
- **Deployed**: Fri Apr 10 2026
- **Dashboard**: https://app.netlify.com/projects/gleaming-marigold-66e0c7
- **Auto-deploy**: Enabled (connected to GitHub)
- **Auto-deploy Speed**: < 10 seconds ⚡ (Fastest)

### Vercel
- **URL**: https://test-static-site-six.vercel.app
- **Status**: Live ✓
- **Project Name**: test-static-site
- **Deployed**: Fri Apr 10 2026
- **Dashboard**: https://vercel.com/alexandru-objelean-s-projects/test-static-site
- **Auto-deploy**: Enabled (connected to Git)
- **Auto-deploy Speed**: < 10 seconds ⚡ (Fastest)

### Cloudflare Pages
- **URL**: https://test-static-site.alex-objelean.workers.dev
- **Status**: Live ✓
- **Project Name**: test-static-site
- **Deployed**: Fri Apr 10 2026
- **Auto-deploy**: Enabled (connected to GitHub)
- **Auto-deploy Speed**: ~15 seconds
- **Features**: Unlimited bandwidth, global CDN

### Render
- **URL**: https://test-static-site-zfsi.onrender.com
- **Status**: Live ✓
- **Service Name**: test-static-site-zfsi
- **Deployed**: Fri Apr 10 2026
- **Auto-deploy**: Enabled (connected to GitHub)
- **Auto-deploy Speed**: ~15 seconds
- **Features**: Free tier, automatic SSL, global CDN

### Oracle Cloud Object Storage
- **URL**: https://objectstorage.eu-frankfurt-1.oraclecloud.com/n/frrmkmtvztrf/b/test-static-site/o/index.html
- **Status**: Live ✓
- **Bucket Name**: test-static-site
- **Region**: eu-frankfurt-1
- **Deployed**: Fri Apr 10 2026
- **Auto-deploy**: Enabled (GitHub Actions → OCI CLI)
- **Features**: Always Free Tier, 10 TB bandwidth/month, Object Storage

## Auto-Deployment Performance

All platforms support automatic deployment on git push to main branch. Tested deployment times:

| Platform | Deployment Speed | Notes |
|----------|-----------------|-------|
| **Netlify** | < 10 seconds | 🥇 Fastest, excellent for rapid iteration |
| **Vercel** | < 10 seconds | 🥇 Fastest, excellent for rapid iteration |
| **GitHub Pages** | ~15 seconds | 🥈 Very fast, reliable |
| **Cloudflare Pages** | ~15 seconds | 🥈 Very fast, unlimited bandwidth |
| **Render** | ~15 seconds | 🥈 Very fast, free tier with SSL |
| **Oracle Cloud** | ~30 seconds | GitHub Actions workflow, OCI CLI upload |
| **Surge.sh** | ~20 seconds | GitHub Actions workflow, Surge CLI |
| **Firebase Hosting** | ~35 seconds | GitHub Actions workflow, Firebase service account |
| **Azure Static Web Apps** | ~30 seconds | GitHub Actions workflow, Azure SWA action |

**Test Methodology**: Deployment times measured from git push to when changes are live on the production URL. All platforms completed deployment in under 20 seconds for this simple static site.

## Testing Checklist

After deployment, verify:

- [ ] Page loads correctly
- [ ] Styles are applied
- [ ] JavaScript runs (clock updates, counter works)
- [ ] Responsive design works on mobile
- [ ] All assets load without 404 errors

## License

MIT - Free to use for testing purposes
