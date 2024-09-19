import express from 'express';
import dotenv from 'dotenv';

import catRoutes from './routes/cat.js';

// Load environment variables
dotenv.config();

// Port
const PORT = process.env.PORT || 5003;

// Initialize express
const app = express();

// Parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', catRoutes);

// middleware

app.use(() => {
    console.log('Request received');
    next();
});

// routes

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found!' });
});

// Handler error
app.use((err, req, res) => {
    console.error(err);
    res.status(500).send('Server is down!');
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : http://${PORT}`);
});
