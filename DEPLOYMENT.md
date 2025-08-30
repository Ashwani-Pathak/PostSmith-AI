# 🚀 Deployment Guide - AI Postsmith

This guide will walk you through deploying AI Postsmith to production using Vercel for the frontend and Render/Railway for the backend.

## 📋 Prerequisites

- GitHub repository with your AI Postsmith code
- Vercel account (free tier available)
- Render or Railway account (free tier available)
- MongoDB Atlas cluster
- Google Gemini API key

## 🎯 Frontend Deployment (Vercel)

### 1. Prepare Your Repository

Ensure your repository has the following structure:
```
ai-postsmith/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root package.json
└── README.md
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Visit [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: Other
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Deploy
vercel --prod
```

### 3. Environment Variables

In your Vercel project dashboard, add these environment variables:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### 4. Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔧 Backend Deployment (Render)

### 1. Prepare for Render

Create a `render.yaml` file in your root directory:

```yaml
services:
  - type: web
    name: ai-postsmith-backend
    env: node
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: GEMINI_API_KEY
        sync: false
      - key: ALLOWED_ORIGINS
        value: https://your-frontend-domain.vercel.app
```

### 2. Deploy to Render

1. **Visit [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `ai-postsmith-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

### 3. Environment Variables

In your Render service, add these environment variables:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 4. Auto-Deploy

Render will automatically deploy when you push to your main branch.

## 🚂 Alternative: Railway Deployment

### 1. Deploy to Railway

1. **Visit [Railway Dashboard](https://railway.app)**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**
5. **Configure the service:**
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Environment Variables

Add the same environment variables as Render.

## 🗄️ MongoDB Atlas Setup

### 1. Create Cluster

1. **Visit [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Create a free cluster**
3. **Choose your preferred cloud provider and region**

### 2. Database Access

1. **Go to "Database Access"**
2. **Click "Add New Database User"**
3. **Create a username and password**
4. **Set privileges to "Read and write to any database"**

### 3. Network Access

1. **Go to "Network Access"**
2. **Click "Add IP Address"**
3. **Add `0.0.0.0/0` for global access (or specific IPs for security)**

### 4. Connection String

1. **Click "Connect" on your cluster**
2. **Choose "Connect your application"**
3. **Copy the connection string**
4. **Replace `<password>` with your actual password**

## 🔑 Google Gemini API Setup

### 1. Get API Key

1. **Visit [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Click "Create API Key"**
3. **Copy the generated key**

### 2. Add to Environment Variables

Add the API key to your backend environment variables.

## 🌐 Domain Configuration

### 1. Update CORS Origins

In your backend environment variables, ensure `ALLOWED_ORIGINS` includes your frontend domain:

```env
ALLOWED_ORIGINS=https://your-domain.vercel.app,https://your-custom-domain.com
```

### 2. Update Frontend API URL

In your frontend environment variables, ensure the API URL points to your backend:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## 📱 Testing Your Deployment

### 1. Health Check

Test your backend health endpoint:
```bash
curl https://your-backend-url.onrender.com/api/health
```

### 2. Frontend Test

1. Visit your Vercel frontend URL
2. Try generating a post with the demo topic
3. Check if posts are being saved to MongoDB

### 3. API Testing

Test the generate endpoint:
```bash
curl -X POST https://your-backend-url.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"test post","tone":"professional","audience":"general","length":"short","postCount":1}'
```

## 🔒 Security Considerations

### 1. Rate Limiting

Your backend includes rate limiting (100 requests per 15 minutes). Adjust in `server/index.js` if needed.

### 2. CORS Configuration

Ensure only your frontend domain is allowed in production.

### 3. Environment Variables

Never commit sensitive information to your repository.

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

- View performance metrics in your Vercel dashboard
- Monitor Core Web Vitals
- Track deployment success rates

### 2. Render/Railway Monitoring

- Monitor service uptime
- View logs for debugging
- Track resource usage

### 3. MongoDB Atlas

- Monitor database performance
- Set up alerts for connection issues
- Track query performance

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `ALLOWED_ORIGINS` in backend environment variables
   - Ensure frontend URL is included

2. **MongoDB Connection Issues**
   - Verify connection string format
   - Check network access settings
   - Ensure database user has correct permissions

3. **Gemini API Errors**
   - Verify API key is correct
   - Check API quota limits
   - Ensure proper billing setup

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build commands in deployment settings

### Debug Commands

```bash
# Check backend logs
railway logs
# or
render logs

# Test MongoDB connection
mongo "your-connection-string" --eval "db.runCommand('ping')"

# Test Gemini API
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
```

## 📈 Scaling Considerations

### Free Tier Limits

- **Vercel**: 100GB bandwidth/month, 100 serverless function executions/day
- **Render**: 750 hours/month, 512MB RAM
- **Railway**: $5/month credit, 512MB RAM
- **MongoDB Atlas**: 512MB storage, shared RAM

### Upgrade Paths

1. **Vercel Pro**: $20/month for increased limits
2. **Render Standard**: $7/month for dedicated resources
3. **Railway**: Pay-as-you-use pricing
4. **MongoDB Atlas**: $9/month for dedicated resources

## 🎉 Success!

Once deployed, your AI Postsmith will be available at:
- **Frontend**: `https://your-domain.vercel.app`
- **Backend**: `https://your-backend-url.onrender.com`

Share your creation with the world! 🚀

---

**Need help?** Check the [README.md](README.md) or open an issue on GitHub.
