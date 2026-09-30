# Product Management System

A full-stack product management application built using the MERN stack.

The project provides secure authentication and complete product CRUD functionality through a responsive React interface and a RESTful Node.js/Express backend.

---

## 🚀 Features

### Authentication

- User registration
- User login
- User logout
- Access token authentication
- Refresh token handling
- Protected routes
- Get current authenticated user
- Password hashing using bcrypt
- HTTP-only refresh token cookie

### Product Management

- Create products
- View all products
- View a single product
- Update products
- Delete products
- Product category
- Product price
- Product stock
- Product size
- Product description
- Multiple product image uploads

### Validation

- Client-side form validation using React Hook Form
- Server-side validation using Express Validator
- Product input validation
- Authentication input validation
- Protected API endpoints

### UI

- Responsive design
- Dark themed interface
- Orange accent color
- Product cards
- Product detail page
- Add product form
- Update product form
- Delete product functionality
- Responsive navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- React Hook Form
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- Multer
- ImageKit

---

## 📁 Project Structure

```text
project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── shared/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md