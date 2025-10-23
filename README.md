# TrackMyGrowth - Coding Progress Tracker

A comprehensive platform designed to help developers track their coding progress across multiple competitive programming platforms. Track problems solved, contest ratings, and maintain a professional profile all in one place.

<div align="center">
  <img src="src/assets/LOGO2.png" alt="TrackMyGrowth Logo" width="120" height="120">
</div>

## 🚀 Features

### 📊 **Multi-Platform Progress Tracking**
- **LeetCode**: Track problems solved and contest ratings
- **Codeforces**: Monitor submissions and rating progression
- **GeeksforGeeks**: Keep track of practice problems
- **CodeChef**: Contest participation and rating history
- **HackerRank**: Skill assessments and challenges
- **AtCoder**: Competitive programming contests
- **CodeStudio**: Additional practice platform support

### 📈 **Visual Progress Analytics**
- Interactive charts and graphs showing rating progression
- Problem-solving statistics across platforms
- Contest performance tracking
- Historical data visualization

### 👤 **Personal Profile Management**
- Create and customize your developer profile
- Add personal information (bio, college, country, graduation year)
- Social media links (LinkedIn, Instagram, Twitter, Portfolio)
- Platform-specific usernames and handles

### 🔐 **Secure Authentication**
- JWT-based authentication system
- Secure user registration and login
- Protected routes and data access

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.0.0 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React-ChartJS-2
- **HTTP Client**: Axios
- **Icons**: React Icons & FontAwesome

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/TrackMyGrowth.git
cd TrackMyGrowth
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment variables
cp .env.example .env
```

Create a `.env` file in the Backend directory with:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

```bash
# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Frontend

# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local
```

Create a `.env.local` file in the Frontend directory with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📜 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm start        # Start production server
```

## 🏗️ Project Structure

```
TrackMyGrowth/
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages/routes
│   │   ├── store/         # Redux store configuration
│   │   ├── assets/        # Static assets (images, icons)
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
├── Backend/
│   ├── Controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `PUT /api/update/platforms/userinfo/:email` - Update platform usernames
- `PUT /api/update/personalInfo/:email` - Update personal information
- `PUT /api/update/editSocialInfo/:email` - Update social links

### Data Fetching
- `GET /api/fetch/userInfo/:email` - Get user profile
- `GET /api/fetch/platformInfo/:email` - Get platform data
- `GET /api/fetch/personalInfo/:email` - Get personal information

### Statistics
- `GET /api/stats/leetcode/:email` - LeetCode statistics
- `GET /api/stats/codeforces/:email` - Codeforces statistics
- `GET /api/stats/gfg/:email` - GeeksforGeeks statistics
- `GET /api/stats/atcoder/:email` - AtCoder statistics

## 🎯 Key Features Explained

### Platform Integration
The app integrates with external APIs to fetch real-time data:
- **LeetCode API**: Fetches problems solved and contest ratings
- **Codeforces API**: Retrieves submission history and ratings
- **GeeksforGeeks API**: Gets practice problem statistics
- **AtCoder API**: Fetches contest participation data

### Data Visualization
- Interactive charts showing rating progression over time
- Problem-solving statistics with visual representations
- Contest performance tracking with historical data

### User Experience
- Responsive design that works on all devices
- Dark theme optimized for developers
- Intuitive navigation and user interface
- Real-time data updates

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel)
1. Deploy using Vercel CLI or dashboard
2. Set environment variables
3. Configure MongoDB Atlas for production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👥 Team Members

### **Project Maintainer**
- **Abhishek Gupta**
  - Email: [abhishek.gupta.150803@gmail.com]
  - GitHub: [@abhishek-gupta-24](https://github.com/abhishek-gupta-24)

### **Development Team**
- **Ajay Singh**
  - GitHub: [@ajay-singh](hhttps://github.com/12AjayPatel)

- **Nikhil Raj** 
  - Email: [your.email@example.com]
  - GitHub: [@yourusername](hhttps://github.com/anonymous-03)



## 🙏 Acknowledgments

- External API providers (LeetCode, Codeforces, GeeksforGeeks, etc.)
- Open source libraries and frameworks used
- Community contributors and testers

---

**Made with ❤️ for the coding community**