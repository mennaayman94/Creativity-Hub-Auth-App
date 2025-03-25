# Creativity Hub

## Project Overview

**Creativity Hub** is a full-stack web application built with **React**, **NestJS**, **TypeScript**, and **Docker**. This application provides a platform for users to sign up, sign in, and access a personalized welcome page after successful authentication.

It utilizes **MongoDB Atlas** for cloud database storage and secures user authentication through **HTTP-only cookies**. The frontend is built using **React** with **TypeScript**, while the backend is built with **NestJS** and **TypeScript**. For fast development and builds, **Vite** is used in the frontend.

This project is containerized using **Docker** and orchestrated with **Docker Compose**, making it easy to set up and run in a development or production environment.

---

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** NestJS, TypeScript
- **Database:** MongoDB Atlas
- **Authentication:** HTTP-only Cookies
- **Containerization:** Docker, Docker Compose
- **Build Tool:** Vite (for fast React builds)

---

## Features

- **Sign Up:** Users can create an account by providing their email and password.
- **Sign In:** Users can log in with their credentials, and the server will set a secure **HTTP-only cookie** for authentication.
- **Welcome Page:** After successful login, users are redirected to a personalized welcome page.
- **Database Storage:** User data is securely stored in **MongoDB Atlas**.
- **Secure Authentication:** Authentication is handled via **HTTP-only cookies** to enhance security.
- **Docker Support:** The app is fully containerized using **Docker** and can be easily run in any environment using **Docker Compose**.

---

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/) (for containerization)
- [Docker Compose](https://docs.docker.com/compose/)
- [Vite](https://vitejs.dev/) (for fast frontend builds)

---

### Installation and Setup

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mennaayman94/Creativity-Hub-Auth-App.git
   cd Creativity-Hub-Auth-App

2. **Install Dependencies**

Frontend (React):

Navigate to the frontend directory and install dependencies:

cd FrontEnd
npm install
Backend (NestJS):

Navigate to the backend directory and install dependencies:

cd BackEnd
npm install


3. **Run the Application Using Docker Compose**
Run the application with Docker Compose. This will start all necessary services (frontend, backend, and MongoDB):

docker compose up -d
This will build and run the Docker containers for the frontend, backend, and MongoDB.

## Running the Application
Once Docker Compose is running, the application will be available at:

Frontend (React): http://localhost:5173

Backend (NestJS API): http://localhost:3002

## Authentication Flow
Sign Up: Users can create a new account by providing their email and password.

Sign In: Users log in using their credentials. Upon successful login, an HTTP-only cookie is set for authentication.

Welcome Page: After successful authentication, users are redirected to a personalized welcome page.

## API Documentation
The backend API is fully documented in Postman. You can view the API documentation to explore all the available endpoints, request methods, and responses:

You can view the API documentation in Postman: [Creativity Hub API Docs on Postman](https://documenter.getpostman.com/view/37770239/2sAYkKGHQg)


## Folder Structure

Here is the directory structure of the project:

```bash
creativity-hub/
├── BackEnd/               # NestJS Backend
│   ├── src/               # Source code for the backend
│   ├── package.json
│   └── .env               # Backend environment variables (MongoDB URI, JWT secret)
├── FrontEnd/              # React Frontend
│   ├── src/               # Source code for the frontend
│   ├── package.json
│   └── .env               # Frontend environment variables (API URL)
├── docker-compose.yml     # Docker Compose configuration for containers
├── README.md              # This file (project description)

```
## Acknowledgments

MongoDB Atlas for providing the cloud database services.

Postman for API documentation.

Vite for providing a fast build tool for the frontend.

Docker and Docker Compose for simplifying the deployment process.
