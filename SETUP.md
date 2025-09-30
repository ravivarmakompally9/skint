# Skint PWA - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Google OAuth credentials

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/skint

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# VAPID Keys for Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# App Configuration
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env.local`

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI`

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### 5. VAPID Keys for Push Notifications

Generate VAPID keys:

```bash
npx web-push generate-vapid-keys
```

Copy the keys to your `.env.local` file.

### 6. Run the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### 7. Seed Database (Optional)

Visit `http://localhost:3000/api/seed` to populate the database with sample data.

## 🔧 Configuration

### Authentication Providers

The app supports:
- **Email/Password**: Built-in credential authentication
- **Google OAuth**: Social login with Google

### Database Models

- **User**: Core user information and preferences
- **Student**: Academic and professional details
- **Company**: Organization information
- **Opportunity**: Job/internship postings
- **Application**: Student applications

### PWA Features

- **Offline Support**: Service worker with caching
- **Push Notifications**: Real-time updates
- **Installable**: Add to home screen
- **Responsive**: Mobile-first design

## 📱 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Test Credentials (After Seeding)

**Student:**
- Email: `sarah.johnson@university.edu`
- Password: `password123`

**Faculty:**
- Email: `michael.chen@university.edu`
- Password: `password123`

**Placement Cell:**
- Email: `lisa.rodriguez@university.edu`
- Password: `password123`

**Recruiter:**
- Email: `john.smith@techcorp.com`
- Password: `password123`

## 🔒 Security

### Environment Variables
- Never commit `.env.local` to version control
- Use strong, unique secrets
- Rotate keys regularly

### Database Security
- Use MongoDB Atlas for production
- Enable authentication
- Configure IP whitelisting
- Enable SSL/TLS

### Authentication Security
- Implement rate limiting
- Use HTTPS in production
- Validate all inputs
- Implement CSRF protection

## 📊 Monitoring

### Performance
- Built-in performance monitoring
- Real-time metrics dashboard
- Error tracking and logging

### Analytics
- User engagement tracking
- Application success rates
- Placement statistics

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error:**
- Check MongoDB URI
- Verify database is running
- Check network connectivity

**Google OAuth Error:**
- Verify client ID and secret
- Check redirect URIs
- Ensure Google+ API is enabled

**PWA Not Working:**
- Check service worker registration
- Verify manifest.json
- Test on HTTPS (required for PWA)

**Build Errors:**
- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check TypeScript errors

### Support

For issues and questions:
1. Check the documentation
2. Review error logs
3. Test with sample data
4. Contact support team

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection established
- [ ] Google OAuth working
- [ ] Push notifications enabled
- [ ] HTTPS enabled
- [ ] Domain configured
- [ ] Analytics setup
- [ ] Error monitoring active
- [ ] Backup strategy implemented
- [ ] Performance optimized

## 📈 Scaling

### Database
- Use MongoDB Atlas for automatic scaling
- Implement database sharding
- Add read replicas

### Application
- Use CDN for static assets
- Implement caching strategies
- Add load balancing
- Monitor resource usage

### Features
- Add more OAuth providers
- Implement advanced AI features
- Add video interview support
- Integrate with external APIs

---

**Ready to deploy? Follow the production checklist and you're all set! 🚀**
