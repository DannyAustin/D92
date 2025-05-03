require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middleware/auth');
const { summaryChartData, reportsChartData } = require('./chartData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
const cors = require('cors');

app.use(cors({
  origin: 'https://d92.onrender.com',
  credentials: true
}));

// Hardcoded user credentials (in a real app, these would be in the database and encrypted)
const USER = {
  username: "danny",
  password: "danny"
};

// Connect to MongoDB (optional for this implementation since we're using hardcoded data)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected to Atlas"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Root route handler - Add this to fix the "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('D92 API Server is running. Use /api endpoints to interact with the API.');
});

// Routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign(
      { id: 1, username },
      process.env.JWT_SECRET || 'a658d1dcef1aedc5e138cde64b9394aa745f0544c61fa73c859315618382f257',
      { expiresIn: '1h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      sameSite: 'strict'
    });
    
    return res.status(200).json({ success: true, message: 'Login successful' });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: 'Logout successful' });
});

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  const dashboardContent = {
    title: "UNC Charlotte Latest News",
    summary: "UNC Charlotte recently celebrated a significant milestone with the 10th anniversary of Niner Nation Gives, setting a new record by raising more than $4.9 million during the 49-hour giving campaign in April 2025. Alumni, students, faculty, staff, families, and friends contributed over 6,600 gifts, making it the most successful Niner Nation Gives in University history. The campaign included a notable $2 million gift from Bo '99 and Angie Cauble to support the University's \"For the Love of Charlotte\" campaign, a $500 million initiative focused on student success, academic innovation, and campus development. Half of the Caubles' gift-$1 million-directly benefited Niner Nation Gives. The event demonstrated the power of collective giving, with more than 2,000 gifts under $25 contributing to the overall success. The 49-hour event featured various connection opportunities, including a Faculty and Staff Kickoff Luncheon, the BIG Student Event, and a celebration, all aimed at helping Niners engage with and support their favorite University causes.",
    source: "https://inside.charlotte.edu/2025/04/30/niner-nation-gives-2025-a-record-breaking-celebration-of-generosity/",
    techDetails: "This project is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with JWT authentication for secure user sessions. The frontend is a Single Page Application (SPA) built with React and served by NGINX on port 80, while the backend API runs independently on port 3000. The two systems communicate via HTTP requests with JSON responses. For data visualization, we're using D3.js to create interactive charts that display information about UNC Charlotte's fundraising and community engagement. The application follows WCAG accessibility guidelines to ensure it's usable by people with various disabilities, implementing proper semantic HTML, ARIA attributes, and sufficient color contrast."
  };
  
  return res.status(200).json(dashboardContent);
});

app.get('/api/summary/chart', authMiddleware, (req, res) => {
  return res.status(200).json(summaryChartData);
});

app.get('/api/reports/chart', authMiddleware, (req, res) => {
  return res.status(200).json(reportsChartData);
});

// API documentation route
app.get('/api', (req, res) => {
  res.send(`
    <h1>D92 API Endpoints</h1>
    <ul>
      <li><code>POST /api/auth/login</code> - Login with username and password</li>
      <li><code>GET /api/auth/logout</code> - Logout current user</li>
      <li><code>GET /api/auth/verify</code> - Verify authentication token</li>
      <li><code>GET /api/dashboard</code> - Get dashboard content</li>
      <li><code>GET /api/summary/chart</code> - Get summary chart data</li>
      <li><code>GET /api/reports/chart</code> - Get reports chart data</li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
