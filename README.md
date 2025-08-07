# Abriham Yohannes Portfolio Website

A modern, responsive portfolio website for Graphics Designer and Video Editor Abriham Yohannes, built with React, Tailwind CSS, Node.js, and MongoDB.

## Features

### Frontend
- **Modern React Application** with TypeScript
- **Responsive Design** using Tailwind CSS
- **Dark Mode Support** with theme persistence
- **Smooth Animations** using Framer Motion
- **Portfolio Showcase** with tabbed categories and video integration
  - YouTube video embedding with modal player
  - Google Drive video integration
  - Video statistics display (views, likes)
  - Interactive video modal with full-screen support
- **Contact Form** with validation
- **SEO Optimized** with proper meta tags

### Backend
- **RESTful API** built with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** for admin features
- **File Upload Support** for portfolio images
- **Email Notifications** for contact form submissions
- **Rate Limiting** and security middleware
- **Input Validation** and sanitization

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for form handling
- Lucide React for icons
- Vite for build tooling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Nodemailer for email sending
- Helmet for security headers
- Express Rate Limit for API protection

## Getting Started
### Video Integration
- **YouTube Integration** - Direct embedding of YouTube videos
- **Google Drive Integration** - Embed videos from Google Drive
- **Video Modal Player** - Full-screen video viewing experience
- **Video Statistics** - Display views and likes for each video
- **Responsive Video Player** - Works on all device sizes


### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cp server/.env.example server/.env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@your-domain.com
   ADMIN_EMAIL=abrihamyohannes@email.com
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system or use MongoDB Atlas.

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:5173`

## Adding Your Videos to Portfolio

### YouTube Method (Recommended)
1. Upload your video to YouTube (public or unlisted)
2. Copy the video URL (any format: watch?v=, youtu.be/, or embed/)
3. Update the portfolio items in `src/components/Portfolio.tsx`

### Google Drive Method
1. Upload video to Google Drive
2. Set sharing to "Anyone with the link can view"
3. Copy the shareable link
4. Update the portfolio items with `videoType: 'drive'`

### Example Portfolio Item
```javascript
{
  id: 1,
  title: 'Your Video Title',
  description: 'Your video description',
  category: 'video',
  thumbnail: 'path/to/thumbnail.jpg',
  link: 'https://youtu.be/YOUR_VIDEO_ID',
  videoType: 'youtube', // or 'drive'
  views: 1250,
  likes: 89
}
```

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio/:id/like` - Like a portfolio item
- `POST /api/contact` - Submit contact form

### Authentication Endpoints
- `POST /api/auth/register` - Register new user (admin only)
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/change-password` - Change password

### Admin Endpoints (Authentication Required)
- `GET /api/contact` - Get all contact submissions
- `PUT /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact
- `POST /api/portfolio` - Create portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

## Database Schema

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  status: String (enum: ['new', 'read', 'replied']),
  ipAddress: String,
  userAgent: String,
  timestamps: true
}
```

### Portfolio Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: ['video', 'design']),
  thumbnail: String (required),
  link: String (required),
  tags: [String],
  featured: Boolean,
  order: Number,
  isActive: Boolean,
  views: Number,
  likes: Number,
  timestamps: true
}
```

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'user']),
  isActive: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  timestamps: true
}
```

## Security Features

- **Rate Limiting**: Prevents abuse of API endpoints
- **Input Validation**: Validates and sanitizes all user inputs
- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Account Locking**: Prevents brute force attacks
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet middleware for security headers
- **File Upload Security**: Validates file types and sizes

## Email Configuration

The application supports multiple email providers:

### Gmail (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Use the app password in the `EMAIL_PASS` environment variable

### Custom SMTP
Configure your SMTP settings in the environment variables:
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
```

## File Uploads

Portfolio images are uploaded to the `uploads/portfolio` directory. The application:
- Validates file types (JPEG, PNG, GIF, WebP)
- Limits file size to 5MB
- Generates unique filenames
- Cleans up files on errors

## Deployment

### Frontend Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider

### Backend Deployment
1. Set environment variables on your server
2. Install dependencies:
   ```bash
   cd server && npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure proper email settings
- Set up MongoDB Atlas or secure MongoDB instance
- Configure `CLIENT_URL` to your frontend domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**Abriham Yohannes**
- Email: abrihamyohannes@email.com
- Telegram: t.me/yourhandle

---

Built with ❤️ by Abriham Yohannes