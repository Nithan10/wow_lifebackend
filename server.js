// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const heroRoutes = require('./routes/heroRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const studioRoutes = require('./routes/studioRoutes');
const ralleyzRoutes = require('./routes/ralleyzRoutes');
const characterRoutes = require('./routes/characterRoutes');
const bestSellerRoutes = require('./routes/bestSellerRoutes');
const shopByAgeRoutes = require('./routes/shopByAgeRoutes');
const shopByCategoryRoutes = require('./routes/shopByCategoryRoutes');
const bentoGridRoutes = require('./routes/bentoGridRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogLifestyleRoutes = require('./routes/blogLifestyleRoutes');
const enhancedTestimonialsRoutes = require('./routes/enhancedTestimonialsRoutes');

// Initialize app
const app = express();

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000", "https://wow-frontedn-y73e.vercel.app/"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true, exposedHeaders: ["Content-Length", "Authorization"],
   }));
    
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/studio', studioRoutes);
app.use('/api/ralleyz', ralleyzRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/bestsellers', bestSellerRoutes);
app.use('/api/shopbyage', shopByAgeRoutes);
app.use('/api/shopbycategory', shopByCategoryRoutes);
app.use('/api/bentogrid', bentoGridRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog-lifestyle', blogLifestyleRoutes);
app.use('/api/enhanced-testimonials', enhancedTestimonialsRoutes);

// Directories logic
const uploadsDir = path.join(__dirname, 'uploads');
const uploadSubdirs = [
  path.join(__dirname, 'uploads/hero'),
  path.join(__dirname, 'uploads/ralleyz'),
  path.join(__dirname, 'uploads/trending'),
  path.join(__dirname, 'uploads/studio'),
  path.join(__dirname, 'uploads/characters'),
  path.join(__dirname, 'uploads/bestsellers'),
  path.join(__dirname, 'uploads/shopbyage'),
  path.join(__dirname, 'uploads/shopbycategory'),
  path.join(__dirname, 'uploads/bentogrid'),
  path.join(__dirname, 'uploads/reviews')
];

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
uploadSubdirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI123 || process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB', process.env.MONGODB_URI123 || process.env.MONGODB_URI);

    // Initializers
    try { await require('./models/TrendingConfig').getConfig(); console.log('✓ Trending config initialized'); } catch (e) { }
    try { await require('./models/Hero').getConfig(); console.log('✓ Hero config initialized'); } catch (e) { }
    try { await require('./models/RalleyzConfig').getConfig(); console.log('✓ Ralleyz config initialized'); } catch (e) { }
    try { await require('./models/CharacterConfig').getConfig(); console.log('✓ Characters config initialized'); } catch (e) { }
    try { await require('./models/BestSellerConfig').getConfig(); console.log('✓ Best Sellers config initialized'); } catch (e) { }
    try { await require('./models/ShopByAgeConfig').getConfig(); console.log('✓ Shop By Age config initialized'); } catch (e) { }
    try { await require('./models/ShopByCategoryConfig').getConfig(); console.log('✓ Shop By Category config initialized'); } catch (e) { }
    try { await require('./models/BentoGridConfig').getConfig(); console.log('✓ Bento Grid config initialized'); } catch (e) { }

    try {
      const ServicesConfig = require('./models/ServicesConfig');
      await ServicesConfig.getConfig();
      console.log('✓ Services config initialized');
    } catch (err) { console.error('Error initializing services config:', err); }

    try {
      await require('./models/ReviewConfig').getConfig();
      console.log('✓ Reviews config initialized');
    } catch (e) { console.error('Error initializing reviews config:', e); }

    try {
      const StudioConfig = require('./util'); // Kept exactly as you had it
      if (StudioConfig.getConfig) {
        await StudioConfig.getConfig();
        console.log('✓ Studio config initialized');
      }
    } catch (err) { }

    try {
      const ContactConfig = require('./models/ContactConfig');
      await ContactConfig.getConfig();
      console.log('✓ Contact config initialized');
    } catch (err) { console.error('Error initializing contact config:', err); }

    try {
      const BlogLifestyleConfig = require('./models/BlogLifestyleConfig');
      await BlogLifestyleConfig.getConfig();
      console.log('✓ Blog/Lifestyle config initialized');
    } catch (err) { console.error('Error initializing Blog/Lifestyle config:', err); }

    try {
      const EnhancedTestimonialsConfig = require('./models/EnhancedTestimonialsConfig');
      await EnhancedTestimonialsConfig.getConfig();
      console.log('✓ Enhanced Testimonials config initialized');
    } catch (err) { console.error('Error initializing Enhanced Testimonials config:', err); }

    console.log('\nAll configurations initialized successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📡 API URL: http://localhost:${PORT}`);
      console.log(`\nAvailable routes:`);
      console.log(`  - /api/auth`);
      console.log(`  - /api/hero`);
      console.log(`  - /api/trending`);
      console.log(`  - /api/studio`);
      console.log(`  - /api/ralleyz`);
      console.log(`  - /api/characters`);
      console.log(`  - /api/bestsellers`);
      console.log(`  - /api/shopbyage`);
      console.log(`  - /api/shopbycategory`);
      console.log(`  - /api/bentogrid`);
      console.log(`  - /api/reviews`);
      console.log(`  - /api/blog-lifestyle`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });