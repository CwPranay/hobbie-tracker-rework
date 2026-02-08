# HobbyTrack Deployment Guide

## Quick Start

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Configure environment variables in `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Start the backend:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Production Deployment

### Backend (Node.js)

**Option 1: Heroku**
```bash
cd server
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Option 2: Railway**
1. Connect your GitHub repo
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

**Option 3: DigitalOcean/AWS**
1. Set up a Node.js droplet/EC2 instance
2. Install Node.js and MongoDB
3. Clone repo and run with PM2:
```bash
npm install -g pm2
cd server
npm install
pm2 start server.js --name hobbytrack-api
pm2 save
pm2 startup
```

### Frontend (React)

**Option 1: Vercel (Recommended)**
```bash
cd client
npm run build
vercel --prod
```

**Option 2: Netlify**
```bash
cd client
npm run build
netlify deploy --prod --dir=dist
```

**Option 3: Static Hosting (AWS S3, Cloudflare Pages)**
```bash
cd client
npm run build
# Upload the 'dist' folder to your hosting provider
```

### Environment Configuration

Update the API URL in production:

**client/src/api/axios.js**
```javascript
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Create **client/.env.production**:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### CORS Configuration

Update **server/server.js** for production:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com'],
  credentials: true
}));
```

## Database Setup

### MongoDB Atlas (Recommended)
1. Create account at mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update MONGO_URI in .env

### Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community  # macOS
sudo apt install mongodb         # Ubuntu

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongodb           # Ubuntu
```

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS in production
- [ ] Set proper CORS origins
- [ ] Enable rate limiting
- [ ] Add helmet.js for security headers
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up proper error logging

## Performance Optimization

### Backend
- Enable compression middleware
- Add Redis for caching
- Use MongoDB indexes
- Implement pagination for large datasets

### Frontend
- Enable code splitting
- Optimize images
- Use lazy loading
- Enable service workers for PWA
- Minify and compress assets

## Monitoring

### Backend
- Use PM2 for process management
- Set up error tracking (Sentry)
- Monitor API performance (New Relic)
- Set up uptime monitoring (UptimeRobot)

### Frontend
- Google Analytics for user tracking
- Sentry for error tracking
- Lighthouse for performance audits

## Backup Strategy

1. **Database**: Enable MongoDB Atlas automated backups
2. **Code**: Use Git with remote repository
3. **Environment**: Document all environment variables
4. **Media**: If storing files, use S3 with versioning

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check port 5000 is not in use
- Review server logs for errors

### Frontend can't connect to backend
- Verify API URL is correct
- Check CORS configuration
- Ensure backend is running
- Check browser console for errors

### Authentication issues
- Verify JWT_SECRET matches between deployments
- Check token expiration settings
- Clear localStorage and try again
- Verify Authorization header is being sent

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Deploy multiple backend instances
- Use Redis for session management
- Implement database read replicas

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Add database indexes
- Enable caching layers

## Cost Estimation

**Free Tier (Development)**
- MongoDB Atlas: Free (512MB)
- Vercel: Free (Hobby plan)
- Railway: Free ($5 credit/month)
- Total: $0/month

**Production (Small Scale)**
- MongoDB Atlas: $9/month (Shared cluster)
- Railway/Heroku: $7-25/month
- Vercel Pro: $20/month
- Total: ~$36-54/month

**Production (Medium Scale)**
- MongoDB Atlas: $57/month (Dedicated)
- AWS EC2: $30-100/month
- CloudFront CDN: $10-50/month
- Total: ~$97-207/month

## Support

For issues or questions:
- Check the README.md files
- Review error logs
- Search GitHub issues
- Contact support team

## License

MIT License - See LICENSE file for details
