import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Find study buddies based on similar interests and activity patterns
router.get('/match/:userId', async (req, res) => {
  const { userId } = req.params;
  const { major, interests } = req.query;

  try {
    // Get user's education info
    const { data: userEducation, error: educationError } = await supabase
      .from('educations')
      .select('*')
      .eq('student_id', userId)
      .single();

    // Find students with similar majors and activity patterns
    const { data: potentialBuddies, error: buddiesError } = await supabase
      .from('students')
      .select(`
        id,
        first_name,
        last_name,
        major,
        school_id,
        profile_picture,
        educations!inner(
          major,
          school_id
        )
      `)
      .neq('id', userId)
      .eq('educations.major', userEducation?.major)
      .limit(10);

    if (educationError || buddiesError) {
      throw educationError || buddiesError;
    }

    // Get activity levels for potential buddies
    const buddiesWithActivity = await Promise.all(
      potentialBuddies.map(async (buddy) => {
        const { data: activity } = await supabase
          .from('slack_messages')
          .select('count', { count: 'exact' })
          .eq('student_id', buddy.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        return {
          ...buddy,
          activityLevel: activity?.count || 0
        };
      })
    );

    // Sort by activity level and return top matches
    const matches = buddiesWithActivity
      .sort((a, b) => b.activityLevel - a.activityLevel)
      .slice(0, 5)
      .map(({ id, first_name, last_name, major, profile_picture, activityLevel }) => ({
        id,
        first_name,
        last_name,
        major,
        profile_picture,
        activityLevel
      }));

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request to be study buddies
router.post('/request', async (req, res) => {
  const { requesterId, recipientId, message } = req.body;

  try {
    const { data, error } = await supabase
      .from('study_buddy_requests')
      .insert({
        requester_id: requesterId,
        recipient_id: recipientId,
        message,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept/reject study buddy request
router.put('/request/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const { data, error } = await supabase
      .from('study_buddy_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

