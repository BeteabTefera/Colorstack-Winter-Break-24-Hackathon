const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.send('Supabase API is running!');
});
// get list of all students
app.get('/members', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('students') // Replace with your table name
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get a single student
app.get('/members/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Validate the email
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email provided.' });
        }

        const { data, error } = await supabase
            .from('students')
            .select('id, first_name,last_name, email')
            .eq('email', email);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'No member found with this email.' });
        }

        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
