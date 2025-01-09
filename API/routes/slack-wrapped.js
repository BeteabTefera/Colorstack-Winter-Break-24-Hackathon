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

// Get user's Slack Wrapped stats
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const timeframe = req.query.timeframe || 'year'; // default to yearly stats
  
  try {
    // Get messages count and channels participated in
    const { data: messages, error: messagesError } = await supabase
      .from('slack_messages')
      .select(`
        id,
        channel_id,
        text,
        created_at,
        slack_channels!inner(name)
      `)
      .eq('user_id', userId)
      .gte('created_at', getTimeframeDate(timeframe));

    // Get reactions given and received
    const { data: reactionsGiven, error: reactionsGivenError } = await supabase
      .from('slack_reactions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', getTimeframeDate(timeframe));

    const { data: reactionsReceived, error: reactionsReceivedError } = await supabase
      .from('slack_reactions')
      .select(`
        *,
        slack_messages!inner(user_id)
      `)
      .eq('slack_messages.user_id', userId)
      .gte('created_at', getTimeframeDate(timeframe));

    // Get completed activities
    const { data: activities, error: activitiesError } = await supabase
      .from('completed_activities')
      .select('*')
      .eq('student_id', userId)
      .gte('created_at', getTimeframeDate(timeframe));

    if (messagesError || reactionsGivenError || reactionsReceivedError || activitiesError) {
      throw messagesError || reactionsGivenError || reactionsReceivedError || activitiesError;
    }

    // Calculate statistics
    const stats = {
      totalMessages: messages?.length || 0,
      channelsParticipated: new Set(messages?.map(m => m.channel_id)).size,
      reactionsGiven: reactionsGiven?.length || 0,
      reactionsReceived: reactionsReceived?.length || 0,
      topReactionsGiven: getTopReactions(reactionsGiven || []),
      topReactionsReceived: getTopReactions(reactionsReceived || []),
      totalPoints: activities?.reduce((sum, activity) => sum + activity.points, 0) || 0,
      mostActiveChannels: getMostActiveChannels(messages || []),
      activityByMonth: getActivityByMonth(messages || []),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper functions
function getTimeframeDate(timeframe) {
  const now = new Date();
  switch (timeframe) {
    case 'month':
      return new Date(now.getFullYear(), now.getMonth() - 1).toISOString();
    case 'quarter':
      return new Date(now.getFullYear(), now.getMonth() - 3).toISOString();
    case 'year':
    default:
      return new Date(now.getFullYear() - 1, now.getMonth()).toISOString();
  }
}

function getTopReactions(reactions) {
  const counts = reactions.reduce((acc, { reaction }) => {
    acc[reaction] = (acc[reaction] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([reaction, count]) => ({ reaction, count }));
}

function getMostActiveChannels(messages) {
  const channels = messages.reduce((acc, message) => {
    const channelId = message.channel_id;
    acc[channelId] = (acc[channelId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(channels)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([channelId, count]) => ({
      channelId,
      channelName: messages.find(m => m.channel_id === channelId)?.slack_channels?.name,
      messageCount: count
    }));
}

function getActivityByMonth(messages) {
  return messages.reduce((acc, message) => {
    const month = new Date(message.created_at).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
}

export default router;

