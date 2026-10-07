# Shiftly Backend API 🚀

A Node.js-based RESTful API server that processes and stores data for the Shiftly application. It utilizes MongoDB for data management and JWT for secure user authentication.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Security:** JSON Web Token (JWT), CORS

## 📂 Project Structure
- `models/` : MongoDB database schemas (User, Shift, Permission, Comment)
- `controllers/` : Core business logic for handling API requests
- `routes/` : Endpoint URL routing configuration
- `server.js` : Main server entry point, middleware, and database connection

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Community Server installed and running (default port: 27017)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the server (development mode):
```bash
npm start
```