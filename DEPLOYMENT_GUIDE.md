# Deployment Guide - Little Lemon Restaurant App

Complete instructions for deploying the Little Lemon Restaurant application to production environments.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Deployment](#local-deployment)
3. [Vercel Deployment](#vercel-deployment)
4. [Netlify Deployment](#netlify-deployment)
5. [Traditional Server Deployment](#traditional-server-deployment)
6. [Environment Configuration](#environment-configuration)
7. [Post-Deployment Verification](#post-deployment-verification)

---

## Prerequisites

Before deploying, ensure:

✅ Node.js v14+ installed  
✅ npm or yarn installed  
✅ Git configured  
✅ Access to hosting platform  
✅ Production build tested locally

### Verify Prerequisites

```bash
node --version     # Should be v14.0.0 or higher
npm --version      # Should be v6.0.0 or higher
git --version      # Ensure Git is installed
```

---

## Local Deployment

### 1. Build the Application

```bash
cd little-lemon
npm install           # Install dependencies
npm run build         # Create production build
```

Expected output:

```
The build folder is ready to be deployed.
File sizes after gzip:
  79.03 kB  build/static/js/main.xxx.js
  3.92 kB   build/static/css/main.xxx.css
```

### 2. Serve Locally

```bash
# Install serve globally (one-time)
npm install -g serve

# Serve the production build
serve -s build
```

Access at: `http://localhost:3000`

### 3. Test Locally

- Navigate to homepage
- Test navigation to /booking
- Fill booking form
- Verify form validation works
- Submit booking
- Verify confirmation page displays

---

## Vercel Deployment

### Method 1: Via GitHub Integration

1. **Push to GitHub**

```bash
git add .
git commit -m "Little Lemon app ready for deployment"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Deployment**
   - Framework: React
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Environment Variables**
   - No additional variables needed for this app

5. **Deploy**
   - Click "Deploy"
   - Wait for build completion

### Method 2: Via Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
cd little-lemon
vercel
```

3. **Follow prompts**
   - Project name: little-lemon
   - Framework: React
   - Root directory: ./
   - Build command: npm run build
   - Output directory: build

4. **Access**
   - Your app will be available at a Vercel URL
   - Example: https://little-lemon-xxx.vercel.app

---

## Netlify Deployment

### Method 1: Via Netlify UI (Git)

1. **Connect GitHub Repository**
   - Go to https://netlify.com
   - Click "Add new site"
   - Choose "Connect to Git"
   - Select GitHub and your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Set Environment Variables** (if needed)
   - No variables needed for this project

4. **Deploy**
   - Click "Deploy site"
   - Build will start automatically

### Method 2: Via Netlify CLI

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login to Netlify**

```bash
netlify login
```

3. **Deploy**

```bash
cd little-lemon
netlify deploy --prod --dir=build
```

### Method 3: Drag & Drop

1. **Create Production Build**

```bash
npm run build
```

2. **Deploy via UI**
   - Go to https://netlify.com
   - Drag and drop the `build` folder
   - Your site is live!

---

## Traditional Server Deployment

### On Ubuntu/Debian Server

1. **Install Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone Repository**

```bash
cd /var/www
git clone <your-repo-url> little-lemon
cd little-lemon
```

3. **Install Dependencies**

```bash
npm ci --production
npm run build
```

4. **Install PM2 (Process Manager)**

```bash
sudo npm install -g pm2
```

5. **Serve with PM2**

```bash
pm2 start "npx serve -s build -l 3000" --name "little-lemon"
pm2 startup
pm2 save
```

6. **Configure Nginx Reverse Proxy**

Create `/etc/nginx/sites-available/little-lemon`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/little-lemon /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Enable HTTPS with Let's Encrypt**

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Docker Deployment

### 1. Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### 2. Create .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
TESTING_GUIDE.md
COMPONENT_DOCUMENTATION.md
```

### 3. Build Docker Image

```bash
docker build -t little-lemon:latest .
```

### 4. Run Container

```bash
docker run -p 3000:3000 little-lemon:latest
```

### 5. Push to Docker Hub

```bash
docker tag little-lemon:latest yourUsername/little-lemon:latest
docker push yourUsername/little-lemon:latest
```

---

## Environment Configuration

### Required Environment Variables

This app requires NO environment variables for basic deployment.

### Optional Environment Variables

```bash
# For future API integration
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_API_KEY=your_api_key_here
```

### Setting Environment Variables

**Vercel:**

- Settings → Environment Variables → Add

**Netlify:**

- Site settings → Build & deploy → Environment → Add variables

**Server:**

```bash
export REACT_APP_API_URL=https://api.yourdomain.com
npm run build
```

---

## Performance Optimization

### Before Deployment

1. **Check Bundle Size**

```bash
npm run build
# Verify bundle sizes are reasonable
```

2. **Optimize Images**

- Replace emoji with actual images (optional)
- Use WebP format for images
- Optimize with ImageOptim or similar

3. **Enable Gzip Compression**

- Most hosting platforms enable by default
- Verify in nginx/Apache configuration

4. **Set Cache Headers**

- Static assets: Cache for 1 year
- HTML files: Cache for 1 day

### Performance Checklist

- [ ] Production build created
- [ ] Bundle size verified (<100KB gzipped)
- [ ] Images optimized
- [ ] Gzip compression enabled
- [ ] Cache headers set
- [ ] Minification confirmed
- [ ] Source maps removed from production

---

## DNS Configuration

### For Custom Domain

1. **Get Nameserver Details**
   - From your hosting provider
   - Example: ns1.vercel.com, ns2.vercel.com

2. **Update Domain Registrar**
   - Log into domain registrar
   - Update nameservers
   - Wait for propagation (24-48 hours)

3. **Verify DNS**

```bash
nslookup yourdomain.com
# Should show your hosting provider's nameservers
```

---

## SSL/TLS Certificate

### Automatic HTTPS

**Vercel**: Automatic ✅  
**Netlify**: Automatic ✅  
**Traditional Server**: Use Let's Encrypt

### Manual Certificate

For traditional servers:

```bash
sudo certbot certonly --webroot -w /var/www -d yourdomain.com
```

---

## Post-Deployment Verification

### 1. Functionality Testing

```
✓ Homepage loads
✓ Navigation works
✓ Hero section displays
✓ Specials section visible
✓ Testimonials render
✓ About section shows
✓ Booking page accessible
✓ Form fields render
✓ Form validation works
✓ Successful submission
✓ Confirmation page displays
✓ Navigation between pages works
```

### 2. Performance Testing

```bash
# Test with Lighthouse
# In Chrome DevTools: Ctrl+Shift+J → Lighthouse

# Test load time
curl -w "\n%{time_total}\n" -o /dev/null -s https://yourdomain.com

# Use tools:
# - Google PageSpeed Insights
# - WebPageTest.org
# - GTmetrix.com
```

### 3. Accessibility Testing

```
✓ Keyboard navigation works
✓ Screen reader compatible
✓ Color contrast sufficient
✓ ARIA labels present
✓ Focus indicators visible
```

### 4. Security Testing

```
✓ HTTPS enabled
✓ Security headers set
✓ Form inputs validated
✓ No sensitive data exposed
✓ CSP headers configured
```

### 5. Cross-Browser Testing

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### 6. Mobile Testing

Test on:

- [ ] iPhone
- [ ] Android phone
- [ ] Tablet
- [ ] Different screen sizes

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Error Tracking**
   - Sentry.io
   - Rollbar
   - LogRocket

2. **Performance Monitoring**
   - New Relic
   - Datadog
   - Google Analytics

3. **Uptime Monitoring**
   - Uptime Robot
   - Pingdom
   - StatusCake

### Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Monitor error logs
- [ ] Review performance metrics
- [ ] Update security patches
- [ ] Backup data regularly
- [ ] Test restoration procedures

---

## Troubleshooting

### Issue: Build Fails on Deploy

**Solution:**

```bash
# Clear cache and rebuild locally
rm -rf build node_modules
npm install
npm run build
```

### Issue: 404 Errors on Routing

**Solution:** Configure build server for SPA:

**Vercel**: Automatic ✅  
**Netlify**: Create `_redirects`:

```
/* /index.html 200
```

**Server**: Update nginx config:

```nginx
try_files $uri $uri/ /index.html;
```

### Issue: Slow Load Times

**Solution:**

1. Enable Gzip compression
2. Optimize images
3. Use CDN
4. Enable caching
5. Reduce bundle size

### Issue: Memory Issues on Server

**Solution:**

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

---

## Rollback Procedure

### If Deployment Fails

**Vercel:**

- Go to Deployments
- Click rollback arrow on previous successful deploy

**Netlify:**

- Go to Deploys
- Click on previous successful deploy
- Click "Restore"

**Server:**

```bash
cd /var/www/little-lemon
git revert HEAD
npm run build
pm2 restart little-lemon
```

---

## Deployment Checklist

Before going live:

- [ ] Code reviewed
- [ ] Tests passing locally
- [ ] Build successful
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Security headers set
- [ ] HTTPS enabled
- [ ] DNS configured
- [ ] Monitoring set up
- [ ] Backup plan ready
- [ ] Team notified
- [ ] Documentation updated

---

## Support Resources

### Documentation

- [Create React App Deployment](https://create-react-app.dev/deployment/)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Netlify Deployment Docs](https://docs.netlify.com/)

### Community Help

- Stack Overflow
- GitHub Issues
- React Documentation
- Hosting Provider Support

---

## Quick Reference

### Build Command

```bash
npm run build
```

### Start Development

```bash
npm start
```

### Run Tests

```bash
npm test -- --watchAll=false
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=build
```

---

**Last Updated**: April 2024  
**Version**: 1.0.0

**Ready to Deploy! 🚀**
