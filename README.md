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

### AWS S3 + CloudFront

```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync . s3://your-bucket-name --exclude ".git/*"

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Make bucket public (update bucket policy)
```

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

## Testing Checklist

After deployment, verify:

- [ ] Page loads correctly
- [ ] Styles are applied
- [ ] JavaScript runs (clock updates, counter works)
- [ ] Responsive design works on mobile
- [ ] All assets load without 404 errors

## License

MIT - Free to use for testing purposes
