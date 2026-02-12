# Deployment Guide - Sustainable Campus Planning Tool

## Prerequisites
- MongoDB Atlas account
- Render account (for backend)
- Vercel account (for frontend)
- Git repository

---

## Phase 1: MongoDB Atlas Setup

1. **Create MongoDB Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up / Login
   - Create a new cluster (Free tier M0)
   - Choose cloud provider and region

2. **Configure Database Access**
   - Go to Database Access
   - Add new database user
   - Set username and password
   - Grant "Read and write to any database" privilege

3. **Configure Network Access**
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`

4. **Get Connection String**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sustainable-campus`

---

## Phase 2: Backend Deployment (Render)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Web Service**
   - Go to https://render.com
   - Sign up / Login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - Name: `sustainable-campus-api`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   ```
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-secret-key>
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://sustainable-campus-api.onrender.com`)

---

## Phase 3: Frontend Deployment (Vercel)

1. **Update API URL**
   - In `client/vite.config.js`, update proxy target to your Render URL
   - Or use environment variable in production

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign up / Login with GitHub
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://sustainable-campus-api.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

---

## Phase 4: Post-Deployment Configuration

1. **Update CORS in Backend**
   - Add your Vercel URL to CORS whitelist in `server/server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-project.vercel.app'],
     credentials: true
   }));
   ```

2. **Test the Application**
   - Visit your Vercel URL
   - Register a new user
   - Test all features
   - Check browser console for errors

3. **Update API Calls in Frontend**
   - Ensure all API calls use the environment variable:
   ```javascript
   const API = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api'
   });
   ```

---

## Continuous Deployment

### Automatic Deployments
- Both Render and Vercel support automatic deployments
- Push to `main` branch triggers automatic deployment
- Use `dev` branch for testing before merging to `main`

### Manual Deployments
- **Render**: Go to dashboard → Manual Deploy → Deploy latest commit
- **Vercel**: Go to project → Deployments → Redeploy

---

## Monitoring & Maintenance

### Render
- View logs in Render dashboard
- Monitor service health
- Check for errors in deployment logs

### Vercel
- View deployment logs
- Monitor function execution
- Check analytics

### MongoDB Atlas
- Monitor database performance
- Check connection metrics
- Set up alerts for high usage

---

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct
- Check if MongoDB IP whitelist includes `0.0.0.0/0`

### Frontend Issues
- Check browser console for errors
- Verify API URL is correct in environment variables
- Check network tab for failed API requests
- Ensure CORS is configured correctly

### Database Issues
- Verify MongoDB Atlas cluster is running
- Check database user permissions
- Ensure network access is configured
- Test connection string locally first

---

## Security Checklist

- ✅ Environment variables are not committed to Git
- ✅ JWT secret is strong and random
- ✅ MongoDB password is strong
- ✅ CORS is configured for specific origins
- ✅ Input validation is implemented
- ✅ Passwords are hashed with bcrypt
- ✅ API routes are protected with authentication

---

## Cost Estimation

### Free Tier Limits
- **MongoDB Atlas**: 512 MB storage (Free forever)
- **Render**: 750 hours/month (Free tier)
- **Vercel**: Unlimited deployments (Hobby plan)

### Scaling Considerations
- Upgrade MongoDB cluster for more storage
- Upgrade Render plan for better performance
- Upgrade Vercel for team features

---

## Live URLs (Example)

- **Frontend**: https://sustainable-campus.vercel.app
- **Backend API**: https://sustainable-campus-api.onrender.com
- **API Docs**: https://sustainable-campus-api.onrender.com/api

---

## Support

For issues or questions:
1. Check deployment logs
2. Review error messages
3. Consult platform documentation
4. Contact platform support if needed
