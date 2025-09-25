const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const Blog =require('./models/Blog')
const Tyreall =require('./models/Tyreall')
const ServiceArea =require('./models/ServiceArea')





// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

// Import Routes
const drdRoutes = require('./routes/drdRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceAreaRoutes = require('./routes/serviceAreaRoutes');
const adminRoutes = require('./routes/admin');
const contactRoute = require('./routes/contact');
const blogRoutes = require('./routes/blogRoutes');
const stripeRoutes = require('./routes/stripe');
const tyreallRoutes = require('./routes/tyreallRoutes');
const couponRoutes = require('./routes/couponRoutes');
const bookingRoutes = require('./routes/booking');
const bookingSlotRoutes = require('./routes/bookingSlotRoutes');
const bookingBackendDbRoutes = require('./routes/bookDetailsDb');

// Root Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// API Routes
app.use('/api/drd', drdRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceAreaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/tyreall', tyreallRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/slots', bookingSlotRoutes);
app.use('/api/booking-backend', bookingBackendDbRoutes);




app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = "http:localhost:5173";

    // 1️ Static URLs
    const staticUrls = [
      '/',
      '/shipping',
      '/checkout',
      '/order',
      '/login/admin',
      '/blogs',
      '/terms',
      '/privacy',
      '/about-us',
      '/services',
      '/area-we-serve',
      '/services/fleet',
      '/services/tyre-sales',
      '/services/onsite-fitting',
      '/services/puncture-repair',
      '/services/rotations',
      '/services/wheel-balancing',
      '/services/inspections',
      '/services/recycling'



 ];

    // 2️ Blog URLs
    const blogs = await Blog.find({}).lean();
    const blogUrls = blogs.map(blog => `/blog/${blog.slug}`);

    // 3️ Tyre URLs (assuming you store slug in Tyre collection)
    const tyres = await Tyreall.find({}).lean();
    const tyreUrls = tyres.map(tyre => `/product/${tyre.slug}`);

    // 4️ Suburb URLs (using suburb name only)
    const suburbs = await ServiceArea.find({}).lean();
    const suburbUrls = suburbs.map(s => {
      const slug = s.suburb.toLowerCase().replace(/\s+/g, '-');
      return `/area-we-serve/${slug}`;
    });

    // === Build XML ===
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    [...staticUrls, ...blogUrls, ...suburbUrls].forEach(url => {
      sitemap += `  <url><loc>${baseUrl}${url}</loc></url>\n`;
    });

    sitemap += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);

  } catch (err) {
    console.error("Sitemap error:", err);
    res.status(500).send('Failed to generate sitemap');
  }
});


// Centralized Error Handler (catch all unhandled errors)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 🧠 Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel serverless function
module.exports = app;
