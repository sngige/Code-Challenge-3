# Code-Challenge-3
# Simple Blog Manager

A basic blog management application that allows you to create, view, and delete blog posts.

## Features

- View all blog posts in a list
- Click on a post to see its details
- Add new blog posts with title, content, and author
- Delete existing posts

## created Using

- HTML
- CSS
- JavaScript
- JSON Server

## Setup Instructions

1. Make sure you have Node.js and npm installed on your computer
2. Clone or download this repository
3. Navigate to the project folder in your terminal
4. Start the JSON Server by running npm install -g json-server
5. Run npm fund
6. Run json-server --watch db.json --port 3000
5. Open the `index.html` file in your web browser

## How to Use

1. The left panel shows all your blog posts
2. Click on any post to view its details in the right panel
3. Use the form at the bottom to add new posts
4. Click the "Delete Post" button to remove a post

## API Endpoints
The app uses these REST endpoints:
1. GET /posts - Get all posts
2. GET /posts/:id - Get a single post
3. POST /posts - Create a new post
4. DELETE /posts/:id - Delete a post

## project structure
simple-blog-manager/
index.html         # Main HTML file
styles.css         # CSS styles
index.js           # Main JavaScript file
db.json            # Database file for JSON Server
README.md          # This file


