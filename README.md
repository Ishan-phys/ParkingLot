# 🚗 Smart Parking Lot Backend (Node.js + MongoDB)

This project is a backend system for a smart parking lot. It supports parking spot allocation based on vehicle type, session tracking, and fee calculation.
It follows SOLID principles, object-oriented programming, and is structured using the MVC pattern.

---

## 📦 Features

- Auto-assign parking spots based on vehicle size
- Create and close parking sessions
- Calculate parking fees based on duration and vehicle type
- Real-time spot availability
- MongoDB-based persistence layer

---

## 🛠 Tech Stack

- Node.js (v18+ recommended)
- Express.js
- MongoDB + Mongoose
- UUID (for ticket IDs)

---

## 📁 Folder Structure

```
src/
├── app.js                  # App entry point
├── models/                 # Mongoose models
├── controllers/            # API controllers
├── services/               # Business logic (e.g. ParkingLotManager)
├── routes/                 # Express routes
├── repositories/           # DB access abstraction
├── core/                   # OOP classes (Vehicle, Floor, etc.)
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/Ishan-phys/ParkingLot.git
cd ParkingLot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB
Ensure MongoDB is running locally on port 27017 or update the connection string in .env file.

### 4. Start the Server
```bash
npm start
```

---

## 🧪 Sample APIs

### 🚗 Park a Vehicle
```
POST /api/parking/entry
{
  "licensePlate": "KA-01-HH-1234",
  "type": "car"
}
```
**Response:**
```json
{
  "ticketId": "9ecf57c6-d1d3-4b2e-998f-fdf7d0c38423"
}
```

### 🚙 Unpark a Vehicle
```
POST /api/parking/exit
{
  "licensePlate": "KA-01-HH-1234"
}
```
**Response:**
```json
{
  "licensePlate": "KA-01-HH-1234",
  "fee": 40
}
```

### 📊 Get Available Spots
```
GET /api/parking/availability
```
**Response:**
```json
{
    "availableSlots": {
        "small": 20,
        "medium": 19,
        "large": 20
    }
}
```

---

## ✅ Design Principles Followed

- **SOLID Principles** (Single Responsibility, Open/Closed, etc.)
- **Object-Oriented Design** for core logic
- **Repository Pattern** for DB access
- **MVC Architecture** for separation of concerns

---

## 📌 Future Enhancements

- Admin dashboards
- Dynamic floor/spot creation via API
- Spot reservation system
- Role-based authentication (JWT)

---

## 👨‍💻 Author
Designed and implemented as part of a Low-Level Design exercise.
