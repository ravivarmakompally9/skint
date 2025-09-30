# Skint PWA - Deployment Guide

This guide covers deploying the Skint PWA to various platforms and environments.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/skint)

**Manual Deployment:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to configure your project
4. Set environment variables in Vercel dashboard

**Environment Variables for Vercel:**
```env
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=your-mongodb-atlas-connection-string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

### 2. Netlify

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18.x`

**Environment Variables:**
```env
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-uri
NEXTAUTH_URL=https://your-app.netlify.app
```

### 3. Railway

**Deployment Steps:**
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push to main branch

**Required Environment Variables:**
```env
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-uri
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-nextauth-secret
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Configure Database:**
   ```bash
   # Add to your .env.local
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skint?retryWrites=true&w=majority
   ```

3. **Set up Collections:**
   - Users
   - Opportunities
   - Applications
   - Companies
   - Notifications

### Local MongoDB

1. **Install MongoDB:**
   ```bash
   # macOS
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Update Environment:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/skint
   ```

## 🔐 Authentication Setup

### Google OAuth (Optional)

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Google+ API

2. **Create OAuth Credentials:**
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.com/api/auth/callback/google` (production)

3. **Add Environment Variables:**
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### Email Authentication

1. **SMTP Configuration:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

2. **Generate App Password (Gmail):**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

## 📱 PWA Configuration

### Service Worker

The PWA is automatically configured with `next-pwa`. No additional setup required.

### Manifest Customization

Edit `public/manifest.json` to customize:
- App name and description
- Icons (add your own to `public/icons/`)
- Theme colors
- Display mode

### Icons

Add your app icons to `public/icons/`:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

## 🌐 Domain and SSL

### Custom Domain

1. **Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records

2. **Netlify:**
   - Go to Site Settings → Domain Management
   - Add custom domain
   - Configure DNS

### SSL Certificate

- **Vercel/Netlify:** Automatic SSL
- **Railway:** Automatic SSL
- **Custom Server:** Use Let's Encrypt or Cloudflare

## 🔧 Production Optimizations

### Environment Variables

```env
# Production
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
JWT_SECRET=your-super-secure-jwt-secret
MONGODB_URI=your-production-mongodb-uri

# Optional
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
SENTRY_DSN=your-sentry-dsn
```

### Build Optimizations

1. **Enable Compression:**
   ```javascript
   // next.config.js
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
   }
   ```

2. **Image Optimization:**
   ```javascript
   // next.config.js
   const nextConfig = {
     images: {
       domains: ['your-cdn-domain.com'],
       formats: ['image/webp', 'image/avif'],
     }
   }
   ```

### Performance Monitoring

1. **Vercel Analytics:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Sentry Error Tracking:**
   ```bash
   npm install @sentry/nextjs
   ```

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Set up MongoDB database
- [ ] Configure environment variables
- [ ] Test authentication flows
- [ ] Verify PWA functionality
- [ ] Test on mobile devices
- [ ] Run production build locally

### Post-Deployment

- [ ] Verify all features work
- [ ] Test user registration/login
- [ ] Check PWA installation
- [ ] Monitor error logs
- [ ] Set up monitoring/analytics
- [ ] Configure backup strategy

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## 📊 Monitoring and Analytics

### Error Tracking

1. **Sentry Setup:**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure Sentry:**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs'
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
   })
   ```

### Analytics

1. **Google Analytics:**
   ```bash
   npm install gtag
   ```

2. **Vercel Analytics:**
   ```bash
   npm install @vercel/analytics
   ```

## 🔒 Security Considerations

### Environment Security

- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly
- Use environment-specific configurations

### Database Security

- Enable MongoDB Atlas network access controls
- Use strong database passwords
- Enable MongoDB Atlas encryption at rest
- Regular security audits

### Application Security

- Implement rate limiting
- Use HTTPS everywhere
- Validate all inputs
- Regular dependency updates
- Security headers

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version (18+)
   - Clear `.next` folder
   - Check for TypeScript errors

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network access
   - Test connection locally

3. **PWA Issues:**
   - Check manifest.json
   - Verify service worker
   - Test on HTTPS

4. **Authentication:**
   - Verify OAuth credentials
   - Check redirect URIs
   - Test JWT tokens

### Support

- Check the [README.md](README.md) for setup instructions
- Review [GitHub Issues](https://github.com/your-username/skint/issues)
- Contact support: support@skint.app

---

**Happy Deploying! 🚀**
