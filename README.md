# Crowdsourced Civic Issue Reporting & Resolution System

A comprehensive platform for citizens to report civic issues and for government administrators to manage and resolve them efficiently. Built for the Government of Jharkhand (SIH – Clean & Green Technology).

## 🚀 Features

### Citizen Portal
- **User Authentication**: Signup/Login with email or OTP
- **Issue Reporting**: Report issues with categories, descriptions, photos, and geolocation
- **Issue Tracking**: Track issue status from Pending → In Progress → Resolved
- **Community Engagement**: Upvote issues to crowd-source priority
- **Feedback System**: Rate and provide feedback on resolved issues

### Admin Dashboard
- **Issue Management**: View and manage all reported issues
- **Assignment System**: Assign issues to municipal workers or teams
- **Status Updates**: Update issue status (Accepted, In Progress, Resolved)
- **Analytics**: Comprehensive analytics including issue counts, resolution rates, location heatmaps, and top categories

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form management
- **Leaflet** for maps integration

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **JWT** for authentication
- **MongoDB** with **Mongoose** ODM
- **Multer** for file uploads
- **Cloudinary** for image storage
- **Bcrypt** for password hashing

### Database
- **MongoDB Atlas** for cloud database
- Collections: `users`, `issues`, `assignments`

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway/Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
civic-issue-system/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── app.ts
│   ├── package.json
│   └── .env.example
├── database/               # Database schemas and migrations
│   └── models/
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civic-issue-system
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your MongoDB Atlas connection string and JWT secret
   
   # Frontend environment
   cp frontend/.env.example frontend/.env.local
   # Edit frontend/.env.local with your backend API URL
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

3. **Access the Application**
   - Citizen Portal: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Issues
- `GET /api/issues` - Get all issues (with pagination and filters)
- `POST /api/issues` - Create new issue
- `GET /api/issues/:id` - Get specific issue
- `PUT /api/issues/:id` - Update issue
- `POST /api/issues/:id/upvote` - Upvote an issue
- `POST /api/issues/:id/feedback` - Submit feedback

### Admin
- `GET /api/admin/issues` - Get all issues for admin
- `PUT /api/admin/issues/:id/assign` - Assign issue to worker
- `PUT /api/admin/issues/:id/status` - Update issue status
- `GET /api/admin/analytics` - Get analytics data

## 🔧 Development Phases

### Phase 1: Authentication System ✅
- User registration and login
- JWT-based authentication
- Role-based access control

### Phase 2: Issue Reporting ✅
- Issue reporting form
- Photo upload functionality
- Geolocation integration

### Phase 3: Issue Tracking ✅
- Citizen issue tracking dashboard
- Status updates and notifications

### Phase 4: Admin Dashboard ✅
- Admin issue management
- Assignment system
- Status management

### Phase 5: Community Features ✅
- Upvoting system
- Feedback and rating system

### Phase 6: Analytics & Visualization ✅
- Analytics dashboard
- Location heatmaps
- Performance metrics

### Phase 7: Deployment ✅
- Production deployment
- Environment configuration
- Monitoring setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@civic-issues.gov.in or create an issue in the repository.

## 🙏 Acknowledgments

- Government of Jharkhand for the initiative
- Clean & Green Technology team
- Open source community for the amazing tools and libraries