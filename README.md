# Workday Integration Project

## Project Description

This project is a basic CRUD (Create, Read, Update, Delete) application to manage a list of items. It includes a user interface to add, edit, and delete items, and stores the data in a local database. Additionally, it integrates with Workday to provide authentication, data synchronization, API integration, custom reports and dashboards, notifications and alerts, and data security and compliance.

## Technology Stack

- **MongoDB** 🍃: Used as the database to store the items.
- **Express.js** 🚀: Used to create the backend server and handle API requests.
- **Angular** 🅰️: Used to build the user interface for the application.
- **Node.js** 🟢: Used as the runtime environment for the backend server.

## Setup and Running the Project

### Prerequisites

- Node.js
- MongoDB
- Angular CLI

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## Workday Integration Setup

### Authentication and Authorization

1. Set up Workday's OAuth 2.0 authentication to securely access Workday APIs.
2. Ensure proper user roles and permissions are set up to control access to Workday data.

### Data Synchronization

1. Set up data synchronization between the application and Workday to keep data up-to-date.
2. Implement periodic data refresh to ensure the latest information is available.

### API Integration

1. Utilize Workday's REST or SOAP APIs to fetch and update data.
2. Implement error handling and logging for API requests to ensure reliability.

### Custom Reports and Dashboards

1. Create custom reports and dashboards using Workday data to provide insights to users.
2. Allow users to filter and export data for further analysis.

### Notifications and Alerts

1. Set up notifications and alerts for important events or changes in Workday data.
2. Implement email or in-app notifications to keep users informed.

### Data Security and Compliance

1. Ensure data security and compliance with relevant regulations (e.g., GDPR, HIPAA).
2. Implement encryption and secure data storage to protect sensitive information.

## CI/CD Setup

### GitHub Actions

1. The CI/CD pipeline is configured using GitHub Actions. The workflow file is located at `backend/.github/workflows/ci-cd.yml`.
2. The pipeline includes steps for setting up Node.js, MongoDB, running tests, building, and deploying the backend and frontend.

### Docker

1. The project includes Dockerfiles and docker-compose files for containerization.
2. To build and run the containers, navigate to the `backend` or `frontend` directory and run:
   ```bash
   docker-compose up --build
   ```

## Running Tests

### Backend Tests

1. Unit tests for backend routes are located in `backend/tests/items.test.js`.
2. To run the backend tests, navigate to the `backend` directory and run:
   ```bash
   npm test
   ```

### Frontend Tests

1. Playwright tests for frontend components are located in `frontend/tests/playwright.spec.ts`.
2. To run the frontend tests, navigate to the `frontend` directory and run:
   ```bash
   npm test
   ```

## Deployment

1. The CI/CD pipeline includes steps for deploying the application to a server.
2. Ensure the deployment commands are properly configured in the GitHub Actions workflow file.
