# DIFAChat - Real-time Chat Application

DIFAChat is a full-stack, real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It provides a seamless and interactive chatting experience, complete with user authentication, one-on-one private messaging, and multimedia sharing capabilities.

## Features

- **Real-Time Messaging:** Instant message delivery using WebSockets via **Socket.IO**.
- **User Authentication:** Secure user registration and login with **JSON Web Tokens (JWT)** and password hashing using **bcrypt.js**.
- **Private One-to-One Chats:** Users can find and chat with anyone in the contact list.
- **Contact & Chat Lists:** Separate views for all registered users (Contacts) and users with whom you have active conversations (Chats).
- **Online Status:** Real-time presence indication shows whether a user is online or offline.
- **Image Messaging:** Send and receive images, which are hosted on **Cloudinary**.
- **Profile Customization:** Users can update their profile picture.
- **Email Notifications:** New users receive a welcome email upon registration, sent via **Resend**.
- **Security:** Protected API routes and WebSocket connections. Implemented **Arcjet** for bot detection, rate limiting, and protection against common web attacks.
- **Responsive UI:** A modern, responsive user interface built with **Tailwind CSS** and **DaisyUI**, featuring loading skeletons and animated elements.
- **Sound Effects:** Optional sound notifications for sending messages, typing, and receiving new messages, with a user-toggle.

## Tech Stack

| Category       | Technology                                                                                              |
| :------------- | :------------------------------------------------------------------------------------------------------ |
| **Monorepo**   | `npm` scripts to manage both frontend and backend installations and builds.                             |
| **Backend**    | Node.js, Express, MongoDB (with Mongoose), Socket.IO, JWT, bcryptjs, Cloudinary, Resend, Arcjet, dotenv |
| **Frontend**   | React, Vite, Zustand (State Management), Axios, Socket.IO Client, React Router, Tailwind CSS, DaisyUI   |
| **Deployment** | The Express server is configured to serve the static frontend build in a production environment.        |

## Project Structure

The project is a monorepo containing two main directories:

- `📁 backend`: The Node.js/Express server that handles API requests, WebSocket connections, and database interactions.
- `📁 frontend`: The React/Vite client-side application that provides the user interface.

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Request handling logic
│   │   ├── lib/          # Helper modules (DB, Socket, Auth)
│   │   ├── middlewares/  # Express middlewares
│   │   ├── models/       # Mongoose schemas
│   │   └── routes/       # API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Axios instance config
│   │   ├── pages/        # Page components (Login, Chat, etc.)
│   │   └── store/        # Zustand state management stores
│   └── package.json
└── package.json          # Root scripts for build/start
```

## Prerequisites

- Node.js (`>=20.0.0`)
- npm
- MongoDB (local instance or a cloud service like MongoDB Atlas)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nguyenduydan/chat-app.git
    cd chat-app
    ```

2.  **Configure Environment Variables:**

    Create a `.env` file in the `backend/` directory and add the following variables:

    ```env
    # Server Configuration
    PORT=3000
    APP_ENV=development # 'development' or 'production'

    # Database
    MONGO_URI=your_mongodb_connection_string

    # Authentication
    JWT_SECRET=your_strong_jwt_secret

    # Frontend URL (for CORS and emails)
    CLIENT_URL=http://localhost:5173

    # Resend (for sending emails)
    RESEND_API_KEY=your_resend_api_key
    EMAIL_FROM=your_sender_email@example.com
    EMAIL_FROM_NAME="DIFAChat Team"

    # Cloudinary (for image hosting)
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # Arcjet (for security)
    ARCJET_KEY=your_arcjet_site_key
    ```

### Development

To run the application in development mode with hot-reloading:

1.  **Install dependencies for both frontend and backend:**

    ```bash
    # From the root directory
    npm run build
    ```

    _(Note: The `build` script also handles `npm install` for both workspaces)._

2.  **Start the backend server:**

    ```bash
    # In a new terminal, from the root directory
    cd backend
    npm run dev
    ```

    The backend will be running on `http://localhost:3000` (or your configured `PORT`).

3.  **Start the frontend development server:**
    ```bash
    # In another terminal, from the root directory
    cd frontend
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:5173`.

### Production

To build and run the application for production:

1.  **Build the application:**
    This command installs all dependencies and creates an optimized production build of the frontend.

    ```bash
    # From the root directory
    npm run build
    ```

2.  **Start the server:**
    This command starts the Node.js server, which will also serve the frontend static files.
    ```bash
    # From the root directory
    npm run start
    ```
    The application will be available at `http://localhost:3000`.
