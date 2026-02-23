# Full-Stack To-Do List Application
A simple full-stack web application built with React, Node.js, Express, and SQLite. This project allows users to manage their daily tasks with a clean frontend interface and a persistent backend database.

## Features
* **Task Management:** Create, Read, Update (toggle completion status & edit text), and Delete (CRUD) tasks.
* **Component-Based UI:** Built with React, featuring separated components (`AddTodo`, `TodoList`, `TodoItem`) for better code organization.
* **Data Persistence:** Tasks are permanently stored in a local SQLite database (`database.sqlite`).
* **Bonus Feature (Editing):** Includes an inline editing mode that allows users to seamlessly modify any task description at any time.
* **Empty State Handling:** Displays a user-friendly prompt when no tasks are currently in the list.

## Installation
Clone the repository (or download the source code):
```
git clone https://github.com/chiaching-l/Simple-To-Do-Application.git
cd Project Assignment Simple To-Do Application
```

This project consists of two parts: the frontend (React) and the server (Node.js). You need to install dependencies for both.

1. Install Backend dependencies:
```
cd backend
npm install express cors sqlite3
```

2. Install Frontend dependencies:
```
cd frontend
npm install
```


## Configuration
This project uses SQLite for data storage. No `.env` files or external database URI configurations are required. The `database.sqlite` file and the `todo` table will be automatically created in the `server` directory the first time you run the backend server.

## Running the Application (Local)
You will need to open **two separate terminal windows** to run the frontend and backend simultaneously.

**Terminal 1: Start the Backend Server**
```
cd backend
node server.js
```

*You should see the following messages indicating the server and database are active:*
Server is running on http://localhost:4000
Connected to the SQLite database.
TABLE CREATED

**Terminal 2: Start the Frontend React App**
```
cd frontend
npm start
```

*The application will automatically open in your default browser at:*
http://localhost:3000

## API Testing Tool
The backend API can be tested using the VS Code REST Client extension. 

### 1. (GET) Retrieve all tasks
GET http://localhost:4000/api/todo

###

### 2. (POST) Add a new task
POST http://localhost:4000/api/todo
Content-Type: application/json

{
    "task": "Finish React frontend",
    "completed": 0
}

###

### 3. (PUT) Update a task (Text or Status)
# CHANGE YOUR_ID down below 
PUT http://localhost:4000/api/todo/1
Content-Type: application/json

{
    "task": "Finish React frontend and write README",
    "completed": 1
}

###

### 4. (DELETE) Delete a task
# CHANGE YOUR_ID down below 
DELETE http://localhost:4000/api/todo/1

###

## API Endpoints

### To-Do
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/todo` | Retrieve all to-do records |
| POST | `/api/todo` | Create a new to-do record (Body: `task`, `completed`) |
| PUT | `/api/todo/:id` | Update a to-do by ID (Body: `task` and/or `completed`) |
| DELETE | `/api/todo/:id` | Delete a to-do by ID |

## Project Structure
Project/
├── frontend/               
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTodo.js
│   │   │   ├── TodoItem.js
│   │   │   └── TodoList.js
│   │   ├── App.js          # Main React component
│   │   └── index.js
│   └── package.json
├── backend/                 
│   ├── database.js         # SQLite initialization
│   ├── routes.js           # API controllers and routing
│   ├── server.js           # Entry point & App configuration
│   ├── database.sqlite     # Auto-generated database file
│   └── package.json
└── README.md

## Dependencies
**Backend:**
* `express`: Web framework for Node.js routing.
* `sqlite3`: Driver for the local SQLite database.
* `cors`: Middleware to enable Cross-Origin Resource Sharing (allowing React on port 3000 to fetch data from port 4000).

**Frontend:**
* `react`: Library for building the user interface.
* `axios`: Promise-based HTTP client for making API requests to the backend.