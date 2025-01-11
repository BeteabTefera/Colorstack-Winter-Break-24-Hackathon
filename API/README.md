This is a **express API** project utilizing supabase database for now since we are emulating the tabels that oyster have. In the future we hope that this feature gets integrated with oyster DB.

## Pre-Request
- Make sure you have your **.env** setup, by setting up your Supabase Project. Reach out to beteabtefera@gmail.com to get added to the project to get access. 

    - NEXT_PUBLIC_SUPABASE_URL= YOUR_SUPABASE_ANON_KEY
    - NEXT_PUBLIC_SUPABASE_ANON_KEY= YOUR_SUPABASE_ANON_KEY
## Getting Started

First, run the development server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to test end points.

# Data-endpoints so far:
- GET /members - will get you all the current student's information to use for your application
- GET /members/:id - Will get you unique student information from Colorstack 
- GET /slack-channels: Fetches all channels from the slack_channels table.
- GET /slack-channels/:id: Fetches a specific channel by its ID.
- GET /slack-messages: Fetches all messages from the slack_messages table.
- GET /slack-messages/:student_id: Fetches a specific message by its ID.
- GET /slack-reactions: Fetches all reactions from the slack_reactions table.
- GET /slack-reactions/:student_id: Fetches a specific reaction by its ID.

# More To COME 🥳
- If integrated. Oyster DB has 58 tables that can be utilized for colorstack members to make applications off off!
