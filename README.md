# Tree Hops

## Introduction
"Tree Hops" is a web application designed to promote plant ownership and awareness about the environment. The core concept revolves around users posting pictures of plants and nominating others to participate, forming a chain with the collective goal of sharing a million plant pictures.

## Technologies Used:
- Frontend: React
- Backend: Python (Flask)
- Database and Additional Services: Firebase

## System Architecture
### Frontend - React
**Components:**
- HomePage: Introduction and instructions about the game.
- SignUp/LoginPage: For user authentication.
- Dashboard: Shows user's plants, nominations, and progress towards goals.
- PlantUploadComponent: For uploading plant pictures.
- NominationComponent: For nominating other users.
- ProgressTracker: Visual representation of the overall goal and user contribution.
- UserProfile: User details and their plant contributions.
State Management:** Using React Context or Redux for managing application state.
Responsive Design: Ensure compatibility with both desktop and mobile devices.

### Backend - Python (Flask)
**API Endpoints:**
- User authentication (signup, login, logout).
- Uploading and retrieving plant images.
- Sending and receiving nominations.
- Tracking and updating user progress.

**Integration with Firebase:**
- Use Firebase SDK to interact with Firebase services (Authentication, Firestore, Storage).

### Database - Firebase
**Firestore Collections:**
- Users: Stores user information, including email, name, and list of uploaded plants.
- Plants: Information about each plant uploaded, linked to the user.
- Nominations: Tracks nominations sent and received by users.
- GlobalProgress: Tracks overall progress towards the million-plant goal.
Security Rules: Ensure that users can only access and modify their own data.

### Storage - Firebase
- Plant Images: Store and retrieve plant images uploaded by users.
  
## Backend Functions - Firebase Functions
- SendNomination: Triggered when a user nominates others, sends invitation emails/notifications.
- UpdateProgress: Updates global and individual progress when a new plant is uploaded.
- UserActivityLogger: Logs user activities for moderation and analytics.
- ChainTracker: Tracks the nomination chain for each user.
  
## Security and Privacy
- User Authentication: Implement robust authentication using Firebase Authentication.
- Data Validation: Server-side validation of all inputs to prevent malicious data entry.
- Privacy: Ensure user data, especially emails and plant pictures, are handled according to privacy standards.
- Moderation: Implement a system for moderating uploaded plant images.

## Scalability and Performance
- Load Balancing: Use Flask’s built-in server for development and a more robust option like Gunicorn for production.
- Database Indexing: Index Firestore documents for efficient querying.
- Caching: Implement caching for frequently accessed data to reduce database load.
- Real-time Updates: Use Firebase Realtime Database or Firestore’s real-time capabilities for live updates in the application.

## Development and Deployment
- Version Control: Use Git for version control and GitHub for repository hosting.
- Continuous Integration/Continuous Deployment (CI/CD): Set up CI/CD pipelines for automated testing and deployment.
- Deployment: Deploy the Flask app on a cloud platform like Heroku, AWS, or Google Cloud. Host the React frontend on Firebase Hosting or a similar service.
- Monitoring and Logging: Implement monitoring and logging to track the health and usage of the application.

## Conclusion
"Tree Hops" aims to use a simple yet engaging concept to promote environmental awareness. By leveraging the strengths of React, Flask, and Firebase, we can create an application that is scalable, secure, and engaging for users. This design document provides a blueprint for the development and deployment of the "Tree Hops" application.


