# Focus: Track Your Daily Progress  

Welcome to **Focus**, a fullstack web application designed to help users track their progress in selected focus areas, with comprehensive statistics and insights into their growth. You can visit the website at [stayfocusednow.com](https://stayfocusednow.com/)  

The project is built with a modern web stack using React.js on the frontend, Node.js Express on the backend, and MongoDB as the database. It is built entirely with TypeScript, providing a type-safe development environment that reduces runtime errors and enhances maintainability. It leverages a robust CI/CD pipeline for testing and deployment, ensuring high-quality releases and a smooth development workflow.  

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Authentication](#authentication)
- [Testing](#testing)
- [CI/CD and Deployment](#cicd-and-deployment)
- [Screenshots](#screenshots)

## Features

-	**Customizable Focus Areas:** Users can define specific areas to track progress.
-	**Detailed Statistics:** Visualize progress with comprehensive statistics and trends over time.
-	**Authentication:** Secure login with JWT and Google OAuth.
-	**Responsive Design:** Optimized for mobile, tablet, and desktop screens.
-	**Type-Safe Development:** Full TypeScript support for both frontend and backend.
-	**Performance Optimized:** React Query for efficient data fetching and state management with Redux.
-	**HTTPS Support:** SSL certificate ensures secure connections.  

## Tech Stack

### Frontend:

-	**React.js with TypeScript:** Component-based architecture with static typing.
-	**Redux:** State management for cross-component data.
-	**React Query:** Optimized server state management and caching.
-	**CSS Modules:** Scoped, maintainable styling.
-	**Vitest:** Unit and integration testing framework.
-	**React Testing Library:** For DOM testing and simulating user interactions.
-	**Cypress:** For end2end testing.

### Backend:

-	**Node.js with TypeScript:** Type-safe server-side code.
-	**Express:** Web framework for handling routes, middleware, and APIs.
-	**MongoDB:** NoSQL database for flexible data modeling.

### DevOps:

-	**Amazon EC2:** Scalable cloud infrastructure.
- **Amazon Load Balancer:** Efficient traffic distribution for high availability.
-	**Docker:** Containerized deployment for consistency across environments.
-	**GitHub Actions:** CI/CD pipeline for automated testing and deployment.

### Security:

-	**JWT:** Token-based authentication.
-	**Google OAuth:** Secure, third-party authentication.
-	**SSL Certificate:** Enforced HTTPS for secure communication.

## Backend Architecture

-	**Express REST API:** Provides endpoints for user management, focus areas, and progress tracking.
-	**MongoDB:** Stores users, their focus areas, and progress data. Flexible schema to accommodate various user needs.
-	**Authentication:** JWT is used to handle secure, stateless authentication. Google OAuth offers easy and secure login for users.

## Frontend Architecture

-	**React.js with TypeScript:** The component-based structure with TypeScript enables scalability, maintainability, and type safety.
-	**Redux:** Manages global state such as user sessions and authentication.
-	**React Query:** Used for server state fetching and caching to ensure optimal performance and seamless data synchronization.
-	**CSS Modules:** Ensures styles are scoped to their respective components, reducing CSS conflicts and making the app easier to style.

## Authentication

Focus uses a combination of **JWT** and **Google OAuth** for secure authentication. Users can sign in through their Google accounts or create accounts within the system.

-	**JWT** is used for user session management, ensuring secure token-based authorization.
-	**Google OAuth** simplifies user login, offering a seamless third-party authentication experience.

## Testing

The testing suite for Focus is comprehensive, automated, and integral to maintaining code quality. All tests are run automatically in the CI/CD pipeline, ensuring each code change is thoroughly validated before deployment.

-	**End-to-End Testing with Cypress:** E2E tests are written in Cypress, simulating real-world user interactions. The Cypress setup includes:
    -	Backend server integration and automated connection to a dedicated testing database.
	  -	Full test automation in the CI/CD pipeline for smooth workflow integration.
-	**Unit Testing with Vitest:** Critical functions and components are unit-tested to ensure stability and correctness.
    -	All units are type-safe, utilizing TypeScript’s type definitions.
-	**Integration Testing with Vitest and React Testing Library:** Integration tests evaluate how different parts of the application, such as components and Redux state management, interact.
    -	Tests verify Redux’s integration within the application to ensure consistent and reliable state handling.

## CI/CD and Deployment

Focus employs a robust CI/CD pipeline:

-	**GitHub Actions:** Automates testing (unit, integration, and end-to-end) and deployment.
    -	Tests are automatically triggered on each push to the main branch, ensuring code stability.
    -	After tests pass, the application is Dockerized and deployed to **Amazon EC2**, promoting consistent environments across development, testing, and production.
	  -	**Amazon Load Balancer** manages traffic distribution for high availability and performance.
-	**SSL Support:** An SSL certificate is integrated, ensuring HTTPS communication for added security.

## Screenshots

### Dashboard

![Focus Dashboard](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/dashboard-desktop.png)

### Stats

![Focus Stats Header](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/stats-header.png)
![Focus Stats Main](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/stats-main.png)
![Focus Stats Charts](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/stats-charts.png)

### Category Page

![Focus Category Top Section](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/category.png)
![Focus Category Stats](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/category-stats.png)

### Day Logging

![Focus Day Logging](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/day-input.png)

### Configuration

![Focus Configure Categories](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/configure-categories.png)
![Focus Configure Importance](https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/configure-importance.png)

### Phone view

<p float="left">
  <img src="https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/dashboard-phone.png" alt="Focus Dashboard Phone" width="300"/>
  <img src="https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/phone-calendar.png" alt="Focus Calendar Phone" width="300"/>
  <img src="https://raw.githubusercontent.com/victor823543/focus/screenshots/screenshots/stats-phone.png" alt="Focus Stats Phone" width="300"/>
</p>



