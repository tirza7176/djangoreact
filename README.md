name: tirza simon
email: t0527179413@gmail.com

# Project Overview

This project consists of a Django backend API combined with a React frontend client, forming a full-stack blogging application.

The backend is built with Django REST Framework and handles user authentication (including JWT tokens), article management, comments, and permissions.

The frontend is built with React and provides the user interface for the application. It allows users to:

Register and log in to the site using JWT-based authentication.

View and search blog articles.

Add comments to posts if they are authenticated.

Edit their own comments.

Admin users can create, update, and delete blog posts via the frontend.

The React app communicates with the backend API to perform these actions securely, using access and refresh tokens to maintain user sessions.

## Features

- User registration and JWT authentication (access and refresh tokens)
- CRUD operations on blog posts (articles)
- Adding and retrieving comments on posts
- User profiles management
- Permissions ensuring only admins can create/update/delete posts
- Search functionality on posts by title, content, and tags

---

## API Endpoints

POST /api/auth/register/ — Register a new user

POST /api/auth/login/ — Obtain JWT access and refresh tokens

POST /api/token/refresh/ — Refresh JWT access token

GET /api/posts/ — List all blog posts (supports search query param)

GET /api/posts/?search=<query> - Retrieves a list of posts filtered by the search query

POST /api/posts/ — Create a new post (admin only)

GET /api/posts/<id>/ — Retrieve post details by ID

PUT /api/posts/<id>/ — Update a post (admin only)

DELETE /api/posts/<id>/ — Delete a post (admin only)

GET /api/posts/<id>/comments/ — List comments for a post

POST /api/posts/<id>/comments/ — Add a comment to a post (authenticated users)

DELETE /api/comments/<id>/ — Delete a comment (admin only)
