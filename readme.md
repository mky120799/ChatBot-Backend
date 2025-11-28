# Chatbot Backend API

A **Node.js + Express** backend for a chatbot application, providing user authentication, chat management, and email notifications. This backend uses **MongoDB** for data storage and implements secure authentication and RESTful APIs.

---

## Table of Contents

* [Features](#features)
* [Folder Structure](#folder-structure)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Middlewares](#middlewares)
* [Database Models](#database-models)
* [Running the Server](#running-the-server)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* User registration, login, and authentication
* Create and manage conversations
* Send and receive chat messages
* Email notifications using custom middleware
* Secure API endpoints with authentication middleware

---

## Folder Structure

```
server/
├─ .env (ignored)
├─ .gitignore
├─ controllers/
│  ├─ chatControllers.js
│  └─ userControllers.js
├─ database/
│  └─ db.js
├─ index.js
├─ middlewares/
│  ├─ isAuth.js
│  └─ sendMail.js
├─ models/
│  ├─ Chat.js
│  ├─ Conversation.js
│  └─ User.js
├─ node_modules/ (ignored)
├─ package-lock.json
├─ package.json
├─ readme.md
└─ routes/
   ├─ chatRoutes.js
   └─ userRoutes.js
```

---

## Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT for authentication
* Nodemailer for email notifications
* dotenv for environment variables
* bcrypt for password hashing

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (see below).

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password_or_app_specific_password>
```

> **Note:** Never commit your `.env` file to GitHub. It contains sensitive credentials.

---

## API Endpoints

### **User Routes** (`routes/userRoutes.js`)

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| POST   | /api/users/signup | Register a new user         |
| POST   | /api/users/login  | Login existing user         |
| GET    | /api/users/me     | Get authenticated user info |

### **Chat Routes** (`routes/chatRoutes.js`)

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| POST   | /api/chats/create          | Create a new chat conversation      |
| GET    | /api/chats/:conversationId | Get all messages for a conversation |
| POST   | /api/chats/send            | Send a new message                  |

---

## Middlewares

* `isAuth.js`: Protect routes by verifying JWT token.
* `sendMail.js`: Send email notifications (e.g., on new chat messages or signup).

---

## Database Models

* `User.js`: Handles user authentication and profile data.
* `Conversation.js`: Stores chat conversations between users.
* `Chat.js`: Stores individual messages in a conversation.

---

## Running the Server

Start the server in development mode:

```bash
npm run dev
```

Or in production mode:

```bash
node index.js
```

Server should start at: `http://localhost:5000`

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.
© 2025 mky120799@gmail.com
