# Mongol Recipe API

A RESTful API for managing traditional Mongolian recipes, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Create, read, update, and delete recipes
- Protected routes — only authenticated users can manage their own recipes
- Password hashing with bcrypt
- MongoDB Atlas cloud database

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcryptjs

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account

### Installation

1. Clone the repository

\```bash
git clone https://github.com/Usukhbayar418/mongol-recipe-api.git
cd mongol-recipe-api
\```

2. Install dependencies

\```bash
npm install
\```

3. Create a `.env` file in the root directory

\```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
\```

4. Start the development server

\```bash
npm run dev
\```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |

### Recipes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/recipes | Get all recipes |
| GET | /api/recipes/:id | Get a single recipe |
| POST | /api/recipes | Create a new recipe |
| PUT | /api/recipes/:id | Update a recipe |
| DELETE | /api/recipes/:id | Delete a recipe |

## Authentication

All recipe endpoints require a valid JWT token in the Authorization header:

\```
Authorization: Bearer <your_token>
\```

## Recipe Schema

\```json
{
  "name": "Buuz",
  "description": "Traditional Mongolian steamed dumplings",
  "ingredients": ["beef", "flour", "onion", "salt"],
  "instructions": "Mix ingredients, wrap in dough, steam for 20 minutes",
  "cookTime": 30,
  "category": "мах"
}
\```

## License

MIT