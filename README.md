# Billeasy_Assignment

A backend REST API for managing books and reviews, built with Node.js, Express, and MongoDB.

---

## Project Setup Instructions

1. **Clone the repository:**
2. 
   git clone https://github.com/VISHESH0932/Billeasy_Assignment.git
   cd Billeasy_Assignment
   
2. **Install dependencies:**

npm install

3. **Create .env file:**
4. 
PORT=8001
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

**How to Run Locally**

npm start
The server will run on http://localhost:8001

**Example API Requests**

1. **Search Books**
GET /books/search?q=<search_term>&page=1&limit=5

curl -X GET "http://localhost:8001/books/search?q=gatsby&page=1&limit=5" \
-H "Authorization: Bearer <your_jwt_token>"

2. **Create a Review for a Book**
POST /books/:bookId/reviews

Body:json

{
  "rating": 5,
  "comment": "Amazing book, highly recommended!"
}
cURL:
curl -X POST "http://localhost:8001/books/<bookId>/reviews" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{"rating":5, "comment": "Amazing book, highly recommended!"}'

3. **Update a Review**
PUT /reviews/:reviewId

Body:
{
  "rating": 4,
  "comment": "Updated review comment"
}
cURL:

curl -X PUT "http://localhost:8001/reviews/<reviewId>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{"rating":4,"comment":"Updated review comment"}'

4.**Delete a Review**
DELETE /reviews/:reviewId

cURL:

curl -X DELETE "http://localhost:8001/reviews/<reviewId>" \
-H "Authorization: Bearer <your_jwt_token>"


**Database Schema**

**User Model**
Field	Type	Description
_id	ObjectId	Unique user identifier
name	String	User's name
email	String	User's email
password	String	Hashed password

**Book Model**
Field	Type	Description
_id	ObjectId	Unique book ID
title	String	Title of the book
author	String	Author name
genre	String	Book genre
description	String	Brief description

**Review Model**
Field	Type	Description
_id	ObjectId	Unique review ID
book	ObjectId	Reference to Book
user	ObjectId	Reference to the User who reviewed
rating	Number	Rating score (1 to 5)
comment	String	Review comment
createdAt	Date	Timestamp of creation
updatedAt	Date	Timestamp of last update
