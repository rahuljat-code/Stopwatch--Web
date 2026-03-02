# Dockerized Stopwatch Web App

This is a modern and feature-rich stopwatch web application built with React, TypeScript, and Tailwind CSS. The application is fully containerized using Docker and served with Nginx for optimal performance.

## Features

- **Core Stopwatch Functionality:** Start, stop, and reset the stopwatch with precision.
- **Lap Time Tracking:** Record and display an unlimited number of laps.
- **Performance Analysis:** Automatically highlights the fastest and slowest lap times.
- **Responsive Design:** A sleek and intuitive user interface that works seamlessly on both desktop and mobile devices.
- **Dockerized for Production:** Includes a multi-stage Dockerfile for building a lightweight production-ready container.

## Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons
- **Containerization & Deployment:**
  - [Docker](https://www.docker.com/)
  - [Nginx](https://www.nginx.com/)

## Getting Started

You can run this application either using Docker or by setting it up locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker](https://www.docker.com/get-started) (for Docker-based setup)

### Option 1: Running with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stopwatch-web-app.git
   cd stopwatch-web-app
   ```
2. **Build and run the application with Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```
The application will be available at [http://localhost:3000](http://localhost:3000).

### Option 2: Running Locally for Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stopwatch-web-app.git
   cd stopwatch-web-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
The application will be available at [http://localhost:5173](http://localhost:5173).

## Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Builds the application for production to the `dist` folder.
- `npm run lint`: Lints the code using ESLint to enforce code quality.
- `npm run preview`: Previews the production build locally.
- `npm run typecheck`: Performs a static type check of the TypeScript code.

## Docker Deployment

The project includes a multi-stage `Dockerfile` that optimizes the production build.

1. **Build Stage:** It uses a `node:20-alpine` image to install dependencies and build the React application.
2. **Production Stage:** The built static files are then copied to a lightweight `nginx:alpine` image.
3. **Nginx Configuration:** The `nginx.conf` file is configured to serve the application and handle routing, caching, and Gzip compression for better performance.

To build the Docker image manually, run:
```bash
docker build -t stopwatch-app .
```

To run the container:
```bash
docker run -p 3000:80 stopwatch-app
```
The application will be accessible at `http://localhost:3000`.
