# Colorstack-API

Welcome to the **Colorstack-API** repository!

This project was created for the **Colorstack Winter-Break Hackathon**. The goal of this project is simple. Lets break it down

# Problem
- 90% of Color Stack Members are CS & SWE Students. And the best way to be a better engineer is to do projects!
- ColorStack has oyster but issues are being limited, so we made a colorstack-api tht we hope it sits on top of the Oyster application. As of right now we are using Supabase to simulate for the hackathon. But this idea has a big potential!

# Solution
- We created **[Colorstack-API](https://apiurlcolorstack.vercel.app/)** and **Colorstack-API-Dashboard** 🥳

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

**We are having issue deploying the dashboard to Vercel so here is the functionality and UI from local host
**## Colorstack-API-Dashboard UI Overview
## landing Page
- Utilizing Supabase Auth , only colorstack memebers in the Oyster DB can get in by activating their account and they get magic link
![image](https://github.com/user-attachments/assets/ee01066f-c27f-41c4-a834-da3a6b23feba)

## Dashboard
![image](https://github.com/user-attachments/assets/a3971d7b-2aed-432b-8e3e-94719d1116dd)

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

## Getting Started

To get started with both the API and Dashboard, follow the instructions in their respective READMEs.

- For setting up the **API**, follow the steps in the [API README](./API/README.md).
- For setting up the **Dashboard**, follow the steps in the [Dashboard README](./colorstack-api-dashboard/README.md).

## Contributing

Feel free to fork this repository, make changes, and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License - 2025
