const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const supabase = require('./config/supabase');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Supabase is initialized by the controllers through config/supabase.js.

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://happen-five.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/media', require('./routes/mediaRoutes'));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const { error } = await supabase.from('events').select('id').limit(1);
  if (error) return res.status(503).json({ message: 'Supabase connection failed', error: error.message });
  res.status(200).json({ message: 'Backend and Supabase are running successfully' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
