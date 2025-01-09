const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const PORT = 3000;

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

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
