# Skint - Placement Management PWA

A comprehensive Progressive Web Application for internship, training & placement management with AI-powered features and role-based dashboards.

## 🌟 Features

### 🎯 Core Functionality
- **Multi-Role Dashboard System**: Tailored interfaces for Students, Faculty, Placement Cell, and Recruiters
- **AI-Powered Recommendations**: Smart matching between students and opportunities
- **Real-time Analytics**: Comprehensive placement statistics and insights
- **PWA Ready**: Works seamlessly on web and mobile with offline capabilities

### 👥 Role-Based Dashboards

#### Student Dashboard
- Profile management with resume and skills tracking
- AI-powered opportunity recommendations
- One-click application system
- Application status tracking
- Interview calendar integration
- Gamification with badges and achievements

#### Faculty Mentor Dashboard
- Student approval workflows
- Timetable-synced scheduling
- Performance feedback system
- Mentee progress tracking
- Placement statistics

#### Placement Cell Dashboard
- Opportunity posting and management
- Live placement analytics
- Automated reporting
- Communication hub
- Fraud prevention with verified company registry

#### Recruiter Dashboard
- Job posting creation and management
- Advanced candidate filtering
- Interview scheduling
- Feedback system
- Talent analytics

### 🤖 AI Features
- **Recommendation Engine**: Matches students to roles based on skills and preferences
- **Resume Optimizer**: AI suggestions for improving student resumes
- **Skill Gap Analyzer**: Identifies missing skills and recommends courses
- **Explainable AI**: Shows why a student was matched to a role

### 🎨 UI/UX Features
- **Glassmorphism Design**: Modern semi-transparent card components
- **Smooth Animations**: Framer Motion powered transitions
- **Dark/Light Mode**: Theme switching capability
- **Responsive Design**: Mobile-first approach
- **Role-Based Color Schemes**: Unique gradients for each stakeholder

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Authentication**: NextAuth.js, JWT
- **Database**: MongoDB with Mongoose
- **PWA**: next-pwa
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add the following variables to `.env.local`:
   ```env
   JWT_SECRET=your-jwt-secret-key
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
skint/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Role-based dashboards
│   │   │   ├── student/       # Student dashboard
│   │   │   ├── faculty/       # Faculty dashboard
│   │   │   ├── placement/     # Placement cell dashboard
│   │   │   └── recruiter/     # Recruiter dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # UI components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
│   ├── icons/                 # PWA icons
│   └── manifest.json          # PWA manifest
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies
```

## 🔐 Authentication

The application supports multiple authentication methods:

### Email/Password Authentication
- Secure password hashing with bcrypt
- JWT token-based sessions
- Role-based access control

### Google OAuth (Coming Soon)
- One-click Google sign-in
- Automatic profile creation
- Seamless integration

### Test Credentials
For development, you can use these test accounts:

- **Student**: `student@example.com` / `password`
- **Faculty**: `faculty@example.com` / `password`
- **Placement**: `placement@example.com` / `password`
- **Recruiter**: `recruiter@example.com` / `password`

## 🎨 Design System

### Color Schemes by Role
- **Students**: Blue gradient (indigo → sky blue)
- **Faculty**: Purple gradient (violet → lavender)
- **Placement Cell**: Green gradient (emerald → teal)
- **Recruiters**: Orange gradient (amber → red)

### Components
- **Glassmorphism Cards**: Semi-transparent with backdrop blur
- **Gradient Buttons**: Role-specific color schemes
- **Animated Transitions**: Smooth page and component transitions
- **Responsive Grid**: Mobile-first layout system

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Basic functionality works without internet
- **Push Notifications**: Real-time updates (coming soon)
- **App-like Experience**: Full-screen mode and native feel

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment with database
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@skint.app or join our Discord community.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic authentication system
- ✅ Role-based dashboards
- ✅ UI/UX components
- ✅ PWA configuration

### Phase 2 (Next)
- 🔄 Database integration
- 🔄 AI recommendation engine
- 🔄 Real-time notifications
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Mobile app development
- 📋 Advanced AI features
- 📋 Integration with external systems
- 📋 Enterprise features

---

Built with ❤️ for educational institutions worldwide.