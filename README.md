# Adaptive Accessibility Assistant (AAA) Prototype

An intelligent, real-time adaptive accessibility platform designed to support temporary and invisible challenges without permanent labels or diagnoses. This project features a modern React frontend and a robust Node.js/Express backend.

## 🌟 Key Features

- **Real-Time Adaptation**: Dynamic UI adjustments based on user-selected "Modes" (Recovery, Low Focus, Eye Strain, Voice-First).
- **Permanent Dark Theme**: A sleek, high-comfort dark aesthetic enforced across the entire application.
- **Smart User Dashboard**: Personalized profile management coupled with a live view of active accessibility features.
- **Secure Authentication**: JWT-based registration and login system with schema-compliant user profiles.
- **Privacy First**: Ethical design that avoids diagnostic labeling, putting the user in full control.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JWT (Authentication), BcryptJS (Hashing)
- **Environment**: Dotenv

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `127.0.0.1:27017`)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd adaptive-accessibility-assistant-prototype
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend/` folder:
    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/AAA
    JWT_SECRET=your_jwt_secret_key
    ```

3.  **Setup Frontend**
    ```bash
    cd ../frontend
    npm install
    ```

---

## 🏃 Running the Project

For the prototype to function correctly, you must run both the backend and frontend simultaneously.

### 1. Start Backend Server
```bash
cd backend
npm run dev
```
*Expected Output: `MongoDB connected successfully` and `Server is running on port 5000`*

### 2. Start Frontend Application
```bash
cd frontend
npm run dev
```
*The app will be available at: `http://localhost:3000`*

---

## 📂 Project Structure

```text
/
├── backend/                # Express API
│   ├── src/
│   │   ├── controllers/    # Auth logic
│   │   ├── middlewares/    # Auth protection
│   │   ├── models/         # MongoDB Schemas
│   │   └── routes/         # API Endpoints
│   ├── .env                # Environment variables
│   └── server.js           # Server entry point
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # UI Components (Login, Dashboard, Welcome, etc.)
│   │   ├── ui/             # Reusable UI primitives (Radix UI)
│   │   └── App.jsx         # Global state & screen management
│   └── vite.config.ts      # Vite configuration
└── README.md
```

---

## 🛣️ API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT | No |
| `GET` | `/api/auth/profile` | Get user profile data | **Yes** |
| `GET` | `/api/health` | Backend status check | No |

---

## 📝 Design Principles

1.  **Non-Diagnostic**: We focus on current *symptoms* or *needs* rather than permanent *disabilities*.
2.  **Temporary by Default**: Modes are designed to be toggled as needed, acknowledging that accessibility needs can change throughout the day.
3.  **Low Friction**: Minimal steps to reach support, with real-time visual feedback.
