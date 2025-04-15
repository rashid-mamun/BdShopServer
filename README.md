# BdShopDb API
A modern, scalable RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. It manages carts, orders, users, services, reviews, blogs, and team data with robust logging, input validation, and Docker support.

## Features
- Modular architecture with controllers, services, and models.
- Input validation using express-validator.
- Standardized API responses with success/error formats.
- Structured logging with Winston and daily rotation.
- Correlation IDs for request tracking.
- Custom error handling with status codes.
- MongoDB with Mongoose for data modeling.
- Dockerized for consistent deployment.
- Environment-specific configurations.

## Tech Stack
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Winston**: Logging library.
- **express-validator**: Input validation.
- **Docker**: Containerization.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bdshopdb-api.git
   cd bdshopdb-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   NODE_ENV=development
   ```

## Running the App
- Production mode:
  ```bash
  npm start
  ```
- Development mode (with nodemon):
  ```bash
  npm run start-dev
  ```

The API runs on `http://localhost:5000`.

## Docker Setup
1. Ensure Docker and Docker Compose are installed.
2. Build and run:
   ```bash
   docker-compose up --build
   ```
3. Access at `http://localhost:5000`.
4. Stop:
   ```bash
   docker-compose down
   ```

## API Endpoints
- **Users**: `/users`
  - `POST /`: Create a user.
  - `GET /:email`: Check admin status.
  - `PUT /`: Update user data.
  - `PUT /admin`: Promote to admin.
- **Carts**: `/carts`
  - `POST /`: Add item to cart.
  - `GET /:email`: Get cart items by email.
  - `DELETE /:itemId`: Remove item.
- **Orders**: `/orders`
  - `POST /`: Create an order.
  - `GET /`: Get all orders.
  - `GET /:email`: Get orders by email.
  - `PUT /:id`: Update order status.
  - `DELETE /:id`: Delete an order.
- **Services**: `/services`
  - `POST /`: Add a service.
  - `POST /all`: Add multiple services.
  - `GET /`: Get all services.
  - `GET /:id`: Get a service by ID.
  - `DELETE /:id`: Delete a service.
- **Reviews**: `/reviews`
  - `POST /`: Add a review.
  - `POST /all`: Add multiple reviews.
  - `GET /`: Get all reviews.
- **Public**: `/`
  - `GET /`: Welcome message.
  - `GET /ourteam`: Get team data.
  - `GET /blogs`: Get all blogs.
  - `POST /blogs`: Add a blog.
  - `POST /blogs/all`: Add multiple blogs.

## Environment Variables
- `DB_USER`: MongoDB username.
- `DB_PASS`: MongoDB password.
- `PORT`: Server port (default: 5000).
- `NODE_ENV`: `development` or `production`.

## Logging
Logs are stored in `./logs` with daily rotation:
- `app-YYYY-MM-DD.log`: General logs.
- `request-error-YYYY-MM-DD.log`: Request errors.
- `request-warn-YYYY-MM-DD.log`: Request warnings.
- `request-info-YYYY-MM-DD.log`: Request info (development only).