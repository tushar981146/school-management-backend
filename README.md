# School Management System

A RESTful API for managing school information with location-based distance calculation.

## Features

- ✅ Add new schools with location data
- ✅ List schools sorted by distance from user location
- ✅ Distance calculation using Haversine formula
- ✅ Error handling middleware
- ✅ CORS enabled for frontend integration
- ✅ MySQL database integration
- ✅ Async/await based controllers

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server
- Postman or similar API testing tool (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "School Management"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file in the root directory**
   ```
   PORT=5001
   MONGODB_URL=your_mongodb_url
   DB_PASSWORD=your_mysql_password
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Create MySQL Database**
   ```sql
   CREATE DATABASE schoolmanagement;
   
   USE schoolmanagement;
   
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address VARCHAR(255) NOT NULL,
     latitude DECIMAL(10, 8) NOT NULL,
     longitude DECIMAL(11, 8) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Project Structure

```
School Management/
├── config/
│   ├── db.js                 # Database connection
│   └── index.js              # Configuration settings
├── controllers/
│   ├── school.controller.js  # School business logic
│   └── error.controller.js   # Error handling middleware
├── routers/
│   └── school.routes.js      # API route definitions
├── service/
│   └── ShortPath.services.js # Distance calculation
├── repo/
│   └── school.repo.js        # Repository pattern (optional)
├── utils/
│   ├── asynchandler.js       # Async error wrapper
│   └── CustomError.js        # Custom error class
├── app.js                    # Express app setup
├── server.js                 # Server entry point
├── package.json
└── README.md
```

## Running the Server

**Development mode** (with nodemon auto-reload)
```bash
npm run dev
```

**Production mode**
```bash
npm start
```

Server will start on `http://localhost:5001`

## API Endpoints

### 1. Add School
- **Method:** `POST`
- **URL:** `/addschool`
- **Body:**
  ```json
  {
    "name": "Central High School",
    "address": "123 Main St, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Response:**
  ```json
  {
    "message": "School added successfully"
  }
  ```

### 2. List Schools (Sorted by Distance)
- **Method:** `GET`
- **URL:** `/listschools?latitude=40.7128&longitude=-74.0060`
- **Query Parameters:**
  - `latitude` (required): User's latitude
  - `longitude` (required): User's longitude
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Central High School",
      "address": "123 Main St, City",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "distance": 0.45
    }
  ]
  ```

## Technologies Used

- **Backend Framework:** Express.js v5.2.1
- **Database:** MySQL
- **Node.js Package:** mysql2/promise
- **Environment:** dotenv
- **Middleware:** CORS
- **Code Quality:** ESM modules

## Error Handling

The application includes centralized error handling with:
- Development mode: Full error details including stack trace
- Production mode: User-friendly error messages
- Custom error class for operational errors
- Async handler wrapper for automatic error catching

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5001 |
| MONGODB_URL | MongoDB connection string | - |
| DB_PASSWORD | MySQL password | - |
| FRONTEND_URL | Frontend URL for CORS | - |
| NODE_ENV | Environment mode | development |

## API Testing with Postman

1. **Add School:**
   - Set method to POST
   - URL: `http://localhost:5001/addschool`
   - Go to Body → Raw → JSON
   - Add the school data

2. **List Schools:**
   - Set method to GET
   - URL: `http://localhost:5001/listschools?latitude=40.7128&longitude=-74.0060`

## Future Enhancements

- [ ] Add authentication and authorization
- [ ] Implement pagination for list schools
- [ ] Add filters (by name, address, etc.)
- [ ] Database connection pooling
- [ ] Input validation middleware
- [ ] Request logging
- [ ] Rate limiting
- [ ] API documentation with Swagger

## Troubleshooting

**Database Connection Failed**
- Ensure MySQL is running
- Check DB_PASSWORD in .env
- Verify database `schoolmanagement` exists

**No Response from Endpoints**
- Check if server is running on correct port
- Verify routes are properly imported in app.js
- Check asyncHandler wrapper is correctly used

## License

ISC

## Contact

For questions or issues, please create an issue in the repository.
