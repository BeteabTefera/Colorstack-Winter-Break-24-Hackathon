# Colorstack-API

Welcome to the **Colorstack-API** repository!

This project was created for the **Colorstack Winter-Break Hackathon**. The goal of this project is simple. Lets break it down

# Problem
- 90% of ColorStack Members are CS & SWE Students, and the best way to grow as engineers is by building projects!
- While ColorStack already has Oyster, its issues for contribution is somewhat limited. To address this, we developed Colorstack-API, designed to sit on top of the Oyster platform. For this hackathon, we are using Supabase to simulate the Oyster Db. This idea, has the potential to grow far beyond its current scope, if integrated with oyster!

# Solution
- We created **[Colorstack-API](https://apiurlcolorstack.vercel.app/)** and **[Colorstack-API-Dashboard](https://api-dashboard-ten.vercel.app/)** 
- These tools empower ColorStack members to build applications specifically tailored for the ColorStack community.
- This initiative fosters greater inclusivity and involvement, encouraging members to innovate and contribute meaningfully to the community.
- our slogan is _**For stackers by Stackers!**_
# Demo
 ![Colorstack-API Demo](https://github.com/BeteabTefera/Winter-Break-24-Hackathon/blob/main/colorstack-api-dashboard/public/assets/demo.gif?raw=true)

# Overview
## Description of the ColorStack API
The ColorStack API is a robust backend service designed to facilitate the management and interaction with various data entities related to educational and collaborative environments. It integrates seamlessly with Supabase, providing a comprehensive set of endpoints to manage users, Slack channels, messages, and reactions.
Key Features:
   - User Management: Allows for the retrieval and management of student profiles, including their details such as name and email.
   - Slack Integration: Provides endpoints to manage Slack channels, messages, and reactions, enabling users to interact with their Slack workspace effectively.
   - Real-time Data Access: Utilizes Supabase's capabilities to fetch real-time data, ensuring users have up-to-date information at their fingertips.
   - Error Handling: Implements robust error handling to ensure that users receive meaningful feedback when issues arise.
## Description of the ColorStack API Dashboard
The ColorStack API Dashboard is a user-friendly interface that allows users to visualize their API usage and manage student data effectively. Built using React, it provides a responsive design that adapts to different screen sizes.
Key Components:
   - User Welcome Section: Greets users by name and provides a personalized experience.
   - API Usage Statistics: Displays important metrics such as total API requests and the timestamp of the last request, helping users monitor their usage effectively.
   - Student Management: Features a table displaying student information with options for searching and filtering based on activation status. This section allows users to easily navigate through student records.
   - Responsive Navigation: Includes a navigation bar that works seamlessly on both desktop and mobile devices, providing quick access to different sections of the dashboard.

# Oyster Integration Plan
- We hope to make this go as big as possible! if this gets implemented in the future here is a design for quick integration within **Oyster** :) 
  ![image](https://github.com/user-attachments/assets/16bc3e18-5909-4ba8-a8d5-fb14337c4aee)
_Integration Design made by Karachi Onwuanibe_

# What you can Build using our API ✴️
## Slack Wrapped 
![image](https://github.com/user-attachments/assets/0c0a3853-1976-4e26-95b5-d1c081d4dc8b)
## Study Buddy 
![image](https://github.com/user-attachments/assets/5fa4c5d4-0525-407e-8100-72befe008ac7)

## Repository Structure

The repository consists of two main parts:

1. **API**: This folder contains the backend API logic and services.
   - To learn more about the API, refer to the [API README](https://github.com/BeteabTefera/Winter-Break-24-Hackathon/blob/main/API/README.md).
   
2. **Dashboard**: This folder contains the frontend dashboard for the application.
   - To learn more about the dashboard, refer to the [Dashboard README](https://github.com/BeteabTefera/Winter-Break-24-Hackathon/blob/main/colorstack-api-dashboard/README.md).
## Folder Structure
- **Winter-Break-24-Hackathon/**  
  - **API/**: Contains the API backend code.
  - **colorstack-api-dashboard/**: Front-end dashboard project.
    - **.next/**: Next.js build output.
    - **app/**: Main application folder.
      - **api-docs/**: API documentation page.
        - `page.tsx`
      - **dashboard/**: Dashboard page.
        - `page.tsx`
      - **slack-wrapped-demo/**: Slack Wrapped Demo page.
        - `page.tsx`
      - **study-buddy-demo/**: Study Buddy Demo page.
        - `page.tsx`
      - `favicon.ico`: Favicon for the app.
      - `globals.css`: Global CSS styles.
      - `layout.tsx`: Main layout component.
      - `not-found.js`: 404 page.
      - `page.tsx`: Home page.
    - **components/**: Reusable components for the app.
      - `ApiDocs.tsx`
      - `Dashboard.tsx`
      - `LandingPage.tsx`
      - `Nav.tsx`
      - `PrivateRoute.tsx`
      - `SlackWrappedDemo.tsx`
      - `StudyBuddyDemo.tsx`
    - **contexts/**: Context for authentication.
      - `AuthContext.tsx`
    - **node_modules/**: Dependencies installed via npm.
    - **public/**: Static files accessible by the app.
      - **assets/**:
        - `demo.gif`
        - `logo.png`
    - `.env.local`: Local environment variables.
    - `.gitignore`: Git ignore file.
    - `eslint.config.mjs`: ESLint configuration file.
    - `loading.tsx`: Loading component.
    - `middleware.ts`: Middleware for the app.
    - `next-env.d.ts`: TypeScript environment file.
    - `next.config.js`: Next.js configuration file.
    - `package-lock.json`: Lock file for dependencies.
    - `package.json`: Project metadata and dependencies.
    - `postcss.config.js`: PostCSS configuration.
    - `README.md`: Project README file.
    - `tailwind.config.ts`: Tailwind CSS configuration.
    - `tsconfig.json`: TypeScript configuration.
  - `.gitignore`: Git ignore file.
  - `CONTRIBUTING.md`: Contribution guidelines.
  - `LICENSE`: License for the project.
  - `README.md`: Main project README file.
  - `yarn.lock`: Lock file for yarn dependencies.

## Getting Started

To get started with both the API and Dashboard, follow the instructions in their respective READMEs.

- For setting up the **API**, follow the steps in the [API README](./API/README.md).
- For setting up the **Dashboard**, follow the steps in the [Dashboard README](./colorstack-api-dashboard/README.md).

## Contributing

Feel free to fork this repository, make changes, and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License - 2025
