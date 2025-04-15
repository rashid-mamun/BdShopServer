# BdShopDb API 🚀
A modern, scalable RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. It efficiently manages carts, orders, users, services, reviews, blogs, and team data, featuring robust logging, input validation, and Docker support.

## Features ✨
- **Modular Architecture**: Organized with controllers, services, and models for maintainability. 
- **Input Validation**: Secured with `express-validator` for reliable data handling. 
- **Standardized Responses**: Consistent success/error formats for predictable APIs. 
- **Structured Logging**: Uses Winston with daily rotation for debugging and monitoring. 
- **Correlation IDs**: Tracks requests for better traceability. 
- **Custom Error Handling**: Provides meaningful error messages and status codes. 
- **MongoDB Integration**: Leverages Mongoose for robust data modeling. 
- **Docker Support**: Ensures consistent deployment across environments. 
- **Environment Configurations**: Supports development and production setups. 

## Tech Stack 🛠️
- **Node.js**: Backend runtime (v18+).
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **Winston**: Logging library with rotation and environment support.
- **express-validator**: Middleware for input validation.
- **Docker**: Containerization for deployment.

## Prerequisites ✅
- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/)).
- **MongoDB**: Local instance or MongoDB Atlas account ([Setup](https://www.mongodb.com/cloud/atlas)).
- **Docker**: Optional, for containerized deployment ([Install](https://docs.docker.com/get-docker/)).
- **Git**: For cloning the repository ([Install](https://git-scm.com/downloads)).

## Installation 🧑‍💻
1. Clone the repository:
   ```bash
   git clone https://github.com/rashid-mamun/bdshopdb-api.git
   cd bdshopdb-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   NODE_ENV=development
   ```

## Running the App ▶️
- **Production Mode**:
  ```bash
  npm start
  ```
- **Development Mode** (with auto-restart via nodemon):
  ```bash
  npm run start-dev
  ```

The API will be available at `http://localhost:5000` (or the port specified in `.env`). 

## Docker Setup 🐳
1. Ensure Docker and Docker Compose are installed.
2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
3. Access the API at `http://localhost:5000`.
4. Stop the containers:
   ```bash
   docker-compose down
   ```

## API Endpoints 🌐
| Resource   | Endpoint                | Method | Description                       |
|------------|-------------------------|--------|-----------------------------------|
| **Users**  | `/users`               | POST   | Create a new user              |
|            | `/users/:email`        | GET    | Check if user is admin         |
|            | `/users`               | PUT    | Update user data           |
|            | `/users/admin`         | PUT    | Promote user to admin         |
| **Carts**  | `/carts`               | POST   | Add item to cart               |
|            | `/carts/:email`        | GET    | Get cart items by email        |
|            | `/carts/:itemId`       | DELETE | Remove item from cart         |
| **Orders** | `/orders`              | POST   | Create a new order           |
|            | `/orders`              | GET    | Get all orders                 |
|            | `/orders/:email`       | GET    | Get orders by email           |
|            | `/orders/:id`          | PUT    | Update order status           |
|            | `/orders/:id`          | DELETE | Delete an order               |
| **Services**| `/services`            | POST   | Add a new service ️            |
|            | `/services/all`        | POST   | Add multiple services         |
|            | `/services`            | GET    | Get all services             |
|            | `/services/:id`        | GET    | Get a service by ID            |
|            | `/services/:id`        | DELETE | Delete a service             |
| **Reviews**| `/reviews`             | POST   | Add a new review             |
|            | `/reviews/all`         | POST   | Add multiple reviews           |
|            | `/reviews`             | GET    | Get all reviews             |
| **Public** | `/`                    | GET    | Welcome message                |
|            | `/ourteam`             | GET    | Get team data                 |
|            | `/blogs`               | GET    | Get all blogs                |
|            | `/blogs`               | POST   | Add a new blog               |
|            | `/blogs/all`           | POST   | Add multiple blogs            |

## Environment Variables ⚙️
| Variable    | Description                          | Default         |
|-------------|--------------------------------------|-----------------|
| `DB_USER`   | MongoDB username                     | -               |
| `DB_PASS`   | MongoDB password                     | -               |
| `PORT`      | Server port                          | 5000            |
| `NODE_ENV`  | Environment (`development`/`production`) | development |

## Logging 📜
Logs are stored in the `./logs` directory with daily rotation:
- `app-YYYY-MM-DD.log`: General application logs 
- `request-error-YYYY-MM-DD.log`: HTTP request errors 
- `request-warn-YYYY-MM-DD.log`: HTTP request warnings ⚠
- `request-info-YYYY-MM-DD.log`: Detailed request info (development only) ℹ

## Testing 🧪
To test the API, use tools like [Postman](https://www.postman.com/) or `curl`. Example:
```bash
curl -X POST http://localhost:5000/carts \
-H "Content-Type: application/json" \
-d '{"itemId":"123","email":"test@example.com","img":"image.jpg","description":"Test item","model":"Test model","price":100}'