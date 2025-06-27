
---





## 👨‍💼 My Contribution

I developed the backend architecture for this platform, with a focus on:

* 💠 Microservice structure
* ⚙️ Code evaluation using Docker containers
* 📆 Redis & BullMQ job queues
* 🚀 Fastify-based high-performance APIs
* 📘 MongoDB-backed problem and submission services
* ⟳ Real-time socket server for problem broadcasting

---

## 📚 Features

* ⚡ **Fast** and lightweight APIs via Fastify
* 🧪 Secure code execution using Dockerized environments
* ⟳ Job queuing system for submissions
* 🧠 Clean REST API for problem and submission handling
* 🪄 Modular service structure
* 📊 Real-time updates via Socket.IO
* 🧪 Postman-ready for testing

---

## 📊 Architecture Flowchart
![image](https://github.com/user-attachments/assets/24591450-deba-4d39-81c3-007e6a04b3ae)


### Step-by-Step Flow:

1. Client sends a request to the submission service
2. Submission service requests problem details from the Problem Admin Service
3. Problem Admin Service queries MongoDB for problem data
4. Returns problem details to Submission Service
5. Submission entry created in DB
6. Submission data added to Redis queue
7. Client is notified of submission
8. Evaluator Service picks job from Redis queue
9. Evaluator matches test cases, updates result to another Redis queue
10. Submission service retrieves evaluation result
11. Updates submission data in DB
12. Notifies WebSocket service of updated status
13. WebSocket sends final result to client

---

## 📦 Tech Stack

| Category        | Technology                   |
| --------------- | ---------------------------- |
| Backend         | Fastify, Node.js, TypeScript |
| Queuing         | Redis, BullMQ                |
| Code Execution  | Docker                       |
| Database        | MongoDB                      |
| Real-time       | Socket.IO                    |
| Frontend Viewer | Plain HTML (Dummy UI)        |
| Deployment      | Docker Compose (local setup) |
| Dev Tools       | Nodemon, Postman             |

---

## 📁 Folder Structure

```
.
├── dummy-frontend/            # Minimal frontend for displaying output
├── evaluator-service/         # Executes code in containers
├── problem-service/           # CRUD API for problems
│   └── socket-service/        # Real-time updates via sockets
└── submission-service/        # Handles submissions (Fastify)
```

---



## 🚀 Getting Started

### 🛠 Prerequisites

* Node.js v16+
* Docker
* MongoDB
* Redis

---

### 📦 Installation

```bash
git clone https://github.com/your-username/coding-platform-backend.git
cd coding-platform-backend

# Install dependencies
cd evaluator-service && npm install && cd ..
cd problem-service && npm install && cd ..
cd problem-service/socket-service && npm install && cd ../..
cd submission-service && npm install && cd ..
```

---

### 📟 Environment Setup

Create `.env` files in each service with values like:

```env
# Example (problem-service)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coding-platform
REDIS_URL=redis://localhost:6379
```

---

### ▶️ Run Services

In separate terminals:

```bash
cd evaluator-service && npm start
cd problem-service && npm start
cd problem-service/socket-service && npm start
cd submission-service && npm start
```

Then open `dummy-frontend/index.html` in browser to see the results.

---

## 📬 API Testing

### ➕ Add Problem (POST `http://localhost:5002/api/v1/problems`)

```json
{
  "title": "Missing Number",
  "description": "Find the missing number in an array containing n-1 distinct integers from 1 to n.",
  "difficulty": "easy",
  "testCases": [
    { "input": "5\n1 2 3 5", "output": "4" },
    { "input": "4\n1 3 4", "output": "2" }
  ],
  "editorial": "The sum of first n natural numbers is n*(n+1)/2. Subtract the sum of the array from it.",
  "codeStubs": [
    {
      "language": "JAVA",
      "startSnippet": "//{ Driver Code Starts\n// Initial Template for Java\n...",
      "userSnippet": "// User function Template for Java\nclass Solution {\n    int missingNumber(int n, int arr[]) {\n        // Your code here\n    }\n}",
      "endSnippet": ""
    }
  ]
}
```

### 🚀 Submit Code (POST `http://localhost:5001/api/v1/submission`)

```json
{
  "userId": "9",
  "problemId": "<paste problem _id here>",
  "code": "class Solution {\n    int missingNumber(int n, int arr[]) {\n        int sum = n * (n + 1) / 2;\n        for (int num : arr) sum -= num;\n        return sum;\n    }\n}",
  "language": "java"
}
```

### ✅ Example Output Response

```json
{
  "submissionId": "abc123xyz",
  "status": "Success",
  "passedTestCases": 2,
  "totalTestCases": 2,
  "verdict": "Accepted",
  "output": [
    { "input": "5\n1 2 3 5", "expected": "4", "received": "4" },
    { "input": "4\n1 3 4", "expected": "2", "received": "2" }
  ]
}
```

### 📫 Postman Collection

You can import the API test suite into Postman using this collection:

* Download JSON

### 🧪 Curl Examples





## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> 🚀 Built with care to empower coding learners and test execution systems
