# automated-task-scheduler

Task scheduler using Open AI and Google calendar

Uses Supabase for Google OAuth authentication

Google Task API and Google Calendar API for task and calendar creation

Uses openai chat completion to optimally arrange tasks to fit schedule

To run project

1. `npm install` to install dependencies

2. Keys required in .env file on root folder

```REACT_APP_SUPABASE_KEY
REACT_APP_SUPABASE_URL
REACT_APP_OPENAI_API_KEY
REACT_APP_GOOGLECALENDAR_URL
```

3. `npm start` to run project

4. Go to [Dev server]http://localhost:3000

Visit live site [Here]https://automated-task-scheduler.vercel.app/

# To do

1. Google task api get conversion for tasks not created on the app
2. Google task api post to new category
3. Generate user calendar dynamically instead of embedding
4. Persistant tasks data for Task card when switching pages
