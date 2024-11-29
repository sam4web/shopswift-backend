# ShopSwift Backend

ShopSwift Backend is a feature-rich RESTful API built with **Node.js** and **Express.js**, forming the backbone of the
ShopSwift e-commerce platform. This backend handles secure user authentication, product and order management, and
seamless shopping cart functionality. Using **MongoDB** for robust data storage, it ensures an efficient and scalable
e-commerce experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Endpoints](#endpoints)
    - [Authentication](#authentication)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [Cart](#cart)
- [Project Links](#project-links)

## Features

- **User Authentication**: Secure user sign-up, login, and profile management with **JSON Web Tokens (JWT)**.
- **Product Listings**: Browse a wide range of products with detailed descriptions, prices, and stock availability.
- **Shopping Cart**: Add items to your cart, update quantities, and proceed to checkout.
- **Order Management**: Create, view, and track orders with real-time status updates.
- **Scalable Backend**: Optimized for performance and capable of handling large-scale data.

## Technologies Used

- **[Node.js](https://nodejs.org/)**: Server-side JavaScript runtime.
- **[Express.js](https://expressjs.com/)**: Fast and lightweight web framework for handling HTTP requests.
- **[MongoDB](https://www.mongodb.com/)**: Flexible NoSQL database for storing product, user, and order data.
- **[Mongoose](https://mongoosejs.com/)**: Simplifies MongoDB interactions with a schema-based approach.
- **[JWT (JSON Web Tokens)](https://jwt.io/)**: Provides secure authentication mechanisms.

## Endpoints

### Authentication

- **`POST /api/auth/register`**       ➜ Register a new user
- **`POST /api/auth/login`**          ➜ Log in an existing user
- **`POST /api/auth/logout`**         ➜ Log out the current user
- **`POST /api/auth/refresh`**        ➜ Refresh the JWT token
- **`POST /api/auth/products`**       ➜ Get products by current user's user

### Users

- **`GET /api/users/:id`**            ➜ Get user details about user
- **`DELETE /api/users/products`**    ➜ Get products created by user

### Products

- **`GET /api/products`**             ➜ Retrieve all products
- **`GET /api/products/:id`**         ➜ Retrieve a specific product by ID
- **`POST /api/products`**            ➜ Add a new product
- **`PATCH /api/products/:id`**       ➜ Update product details
- **`DELETE /api/products/:id`**      ➜ Delete a product

### Orders

- **`GET /api/orders`**               ➜ Retrieve all orders
- **`POST /api/orders`**              ➜ Place a new order

### Cart

- **`GET /api/cart`**                 ➜ Retrieve the current user's shopping cart
- **`POST /api/cart`**                ➜ Add items to the cart
- **`DELETE /api/cart/:id`**          ➜ Remove an item from the cart
- **`GET /api/cart/pricing`**      ➜ Get pricing detail

## Project Links

- **Source Code**:  [Backend Repository](https://github.com/sam4web/shopswift-backend)
- **Live API**: [Shopswift API](https://shopswift-backend-fiw1.onrender.com/)
- **Frontend Code**: [Frontend Repository](https://github.com/sam4web/shopswift-frontend)