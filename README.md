# 🚀 AI Postsmith - AI-Powered LinkedIn Content Generator

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A sophisticated full-stack application that leverages Google's Gemini AI to generate professional, engaging LinkedIn posts tailored to your audience, tone, and goals. Transform your content creation workflow with intelligent AI assistance.

## ✨ Key Features

### 🤖 AI-Powered Generation
- **Multi-stage AI Pipeline**: Plan → Draft → Polish → Guardrail for quality assurance
- **Google Gemini Integration**: State-of-the-art AI content generation
- **Customizable Parameters**: Control tone, audience, length, and language
- **Smart Hashtag Generation**: Context-aware hashtags and call-to-actions
- **Viral Potential Scoring**: AI-driven engagement prediction

### 🎨 Modern User Experience
- **Futuristic Glassmorphism Design**: Beautiful gradient backgrounds and glass effects
- **Real-time LinkedIn Preview**: Toggle between formatted preview and raw text
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **Dark/Light Mode Ready**: Built with Tailwind CSS for easy theming

### 💾 Content Management
- **MongoDB Storage**: Save and organize your generated posts
- **Advanced Search**: Filter posts by topic, tone, audience, or keywords
- **Post Regeneration**: Create variations of existing content
- **One-click Copy**: Instant clipboard integration for easy sharing
- **Analytics Dashboard**: Track token usage and generation metrics

## 🏗️ Architecture Overview

```
AI Postsmith
├── 📱 Frontend (React 18 + Tailwind CSS)
│   ├── Hero Component - Main input interface
│   ├── Post Grid - Generated content display
│   ├── Sidebar - Analytics and navigation
│   └── Saved Posts - Content management
│
├── 🔧 Backend (Node.js + Express)
│   ├── Gemini Service - AI content generation
│   ├── Post Service - Database operations
│   ├── API Routes - RESTful endpoints
│   └── Middleware - Security & validation
│
└── 🗄️ Database (MongoDB Atlas)
    └── Posts Collection - Persistent storage
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up free](https://cloud.mongodb.com)
- **Google Gemini API Key** - [Get API key](https://makersuite.google.com/app/apikey)

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/ai-postsmith.git
cd ai-postsmith

# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Environment Configuration

#### Backend Setup
```bash
cd server
cp env.example .env
```

Edit `.env` with your credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGINS=http://localhost:3000
```

#### Frontend Setup
```bash
cd client
```

Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start individually:
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```

### 4. Access Application
Open your browser and navigate to `http://localhost:3000`

## 🎯 Demo Mode

The application includes a pre-filled demo topic: **"cold-start strategies for marketplaces"**

Simply click "Generate Posts" to immediately test the AI pipeline without any setup!

## 🔧 Configuration

### MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create database user with read/write permissions
3. Configure network access (add `0.0.0.0/0` for development)
4. Copy connection string to your `.env` file

### Gemini API Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your backend `.env` file
4. Ensure billing is enabled for your Google Cloud project

## 📡 API Documentation

### Health Check
```http
GET /api/health
```
Returns server status and version information.

### Generate Posts
```http
POST /api/generate
Content-Type: application/json

{
  "topic": "artificial intelligence in healthcare",
  "tone": "professional",
  "audience": "healthcare professionals",
  "length": "medium",
  "language": "English",
  "postCount": 3,
  "includeHashtags": true
}
```

### Save Post
```http
POST /api/save
Content-Type: application/json

{
  "content": "Your post content here...",
  "topic": "AI in healthcare",
  "tone": "professional",
  "audience": "healthcare",
  "hashtags": ["#AI", "#HealthcareTech"]
}
```

### Get Saved Posts
```http
GET /api/myposts
```
Returns all saved posts with filtering and pagination support.

## 🎨 Customization

### Styling Modifications
- **Colors**: Update `client/tailwind.config.js` for custom color schemes
- **Animations**: Modify `client/src/index.css` for custom transitions
- **Components**: Edit individual React components in `client/src/components/`

### AI Behavior Tuning
- **Prompts**: Adjust AI instructions in `server/services/geminiService.js`
- **Scoring**: Modify viral potential algorithm
- **Moderation**: Customize content filtering rules

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Comprehensive request sanitization
- **Helmet.js**: Security headers protection
- **Environment Variables**: Secure credential management

## 🚀 Deployment

For detailed deployment instructions, see our comprehensive [DEPLOYMENT.md](DEPLOYMENT.md) guide.

### Quick Deployment Options

**Frontend (Vercel):**
```bash
cd client
npm run build
vercel --prod
```

**Backend (Render/Railway):**
- Connect your GitHub repository
- Set environment variables
- Deploy automatically on push

## 📊 Performance Optimizations

- **Gzip Compression**: Reduced response sizes
- **Database Indexing**: Optimized MongoDB queries
- **Lazy Loading**: Efficient component rendering
- **Caching**: Strategic API response caching
- **Bundle Optimization**: Minimized frontend bundle size

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation accordingly
- Ensure backward compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language capabilities
- **Tailwind CSS** for beautiful, utility-first styling
- **Framer Motion** for smooth, performant animations
- **MongoDB Atlas** for reliable database hosting
- **React Community** for excellent tools and libraries

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/ai-postsmith/issues)
- **Documentation**: Check this README and [DEPLOYMENT.md](DEPLOYMENT.md)
- **Email**: support@aipostsmith.com (update with your actual support email)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Multi-language support expansion
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Content scheduling capabilities
- [ ] Social media integration
- [ ] API rate limit management
- [ ] Dark/light mode toggle
- [ ] Export functionality (PDF, CSV)

### Technical Improvements
- [ ] Unit test coverage
- [ ] End-to-end testing
- [ ] Performance monitoring
- [ ] Advanced caching strategies
- [ ] Database migration system

---

**Built with ❤️ by the AI Postsmith Team**

*Transform your LinkedIn presence with AI-powered content creation. Generate engaging posts that resonate with your audience and drive professional growth.*
