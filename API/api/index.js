const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabase = require('../supabaseClient');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.send('Supabase API is running!');
});

// Get list of all students
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
            .select('id, first_name, last_name, email, activated_at')
            .eq('email', email)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'No member found with this email.' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Slack channels
app.get('/slack-channels', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('slack_channels')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single Slack channel by ID
app.get('/slack-channels/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const { data, error } = await supabase
            .from('slack_channels')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'No channel found with this ID.' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Slack messages
app.get('/slack-messages', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('slack_messages')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single Slack message by student_id
app.get('/slack-messages/:student_id', async (req, res) => {
    try {
        const student_id = req.params.student_id;

        const { data, error } = await supabase
            .from('slack_messages')
            .select('*')
            .eq('student_id', student_id);

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'No messages found for this student.' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Slack reactions
app.get('/slack-reactions', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('slack_reactions')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single Slack reaction by student ID
app.get('/slack-reactions/:student_id', async (req, res) => {
    try {
        const student_id = req.params.student_id;

        const { data, error } = await supabase
            .from('slack_reactions')
            .select('*')
            .eq('student_id', student_id);

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'No reactions found for this student.' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
