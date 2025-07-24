# 💰 Expense Tracker API (Backend)

A simple and powerful RESTful API backend for tracking income and expenses, built with Express.js and MongoDB.

---

## 🚀 Features

- User registration & login (JWT Authentication)
- Add, edit, delete expenses
- Add, edit, delete incomes
- Get monthly & total reports
- Categorize transactions

---

## 📁 Project Structure

expense-tracker-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Route/
├── server.js
├── .env
├── .gitignore
├── package.json
├── README.md


---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- dotenv

---

## 📦 Installation & Setup

### 1. Clone the repo
---

git clone https://github.com/mahdijihad001/expanseTrackerBackend

---
### 2. Create a .env file and setup
---

MONGO_URI=your mongoodb cluster url  

JWT_SECRAT=your jwt secrate  

CLINT_URL=frontend url  

PORT= Server port number

---

### 3. open this project in vs code

- Run the server
---

nodemon server.js

---

## 📡 API Endpoints


### 🔐 Auth

| Method  | Route                        | Description   |
| ------  | ------------------           | ------------- |
| POST    | /api/v1/auth/register        | Register user |
| POST    | /api/v1/auth/login           | Login user    |
| GET     | /api/v1/auth/getuserinfo     | getuserinfo   |



### 🔐 Income

| Method  | Route                          | Description          |
| ------  | ------------------             | -------------        |
| POST    | /api/v1/income/add             | Add Income           |
| GET     | /api/v1/income/getIncome       | Get Income           |
| GET     | /api/v1/income/download        | Download Income info |
| DELETE  | /api/v1/income/:id             | Delete Income        |



### 🔐 Expanse

| Method  | Route                          | Description           |
| ------  | ------------------             | -------------         |
| POST    | /api/v1/expanse/add            | Add expanse           |
| GET     | /api/v1/expanse/getIncome      | Get expanse           |
| GET     | /api/v1/expanse/download       | Download expanse info |
| DELETE  | /api/v1/expanse/:id            | Delete Expanse        |



### 🔐 Dashboard

| Method  | Route                             | Description            |
| ------  | ------------------                | -------------          |
| POST    | /api/v1/dashboard/data            | Get All Dashboard Data |


