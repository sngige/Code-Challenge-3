// API URL - Using JSON Server {const API_URL = 'http://localhost:3000/posts';}
const API_URL = 'https://your-json-server.typicode.com/sngige/Code-Challenge-3.git/posts';

// DOM Elements
const postListContainer = document.getElementById('post-list-container');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');

// Load posts when page loads
document.addEventListener('DOMContentLoaded', loadPosts);

// Function to load all posts
async function loadPosts() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const posts = await response.json();
        
        postListContainer.innerHTML = '';
        
        if (posts.length === 0) {
            postListContainer.innerHTML = '<p>No posts yet. Add your first post!</p>';
            postDetail.innerHTML = '<p>No posts available</p>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `<strong>${post.title}</strong> - ${post.author}`;
            postElement.addEventListener('click', () => showPostDetails(post.id));
            postListContainer.appendChild(postElement);
        });
        
        // Show first post by default
        showPostDetails(posts[0].id);
    } catch (error) {
        console.error('Error loading posts:', error);
        postListContainer.innerHTML = '<p>Error loading posts. Please try again.</p>';
        postDetail.innerHTML = '<p>Error loading post details</p>';
    }
}

// Function to show post details
async function showPostDetails(postId) {
    try {
        const response = await fetch(`${API_URL}/${postId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch post details');
        }
        
        const post = await response.json();
        
        postDetail.innerHTML = `
            <h3>${post.title}</h3>
            <p><em>By: ${post.author}</em></p>
            <div class="post-content">${post.content}</div>
            <button onclick="deletePost(${post.id})">Delete Post</button>
        `;
    } catch (error) {
        console.error('Error loading post details:', error);
        postDetail.innerHTML = '<p>Error loading post details. Please try again.</p>';
    }
}

// Function to add new post
newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPost = {
        title: document.getElementById('post-title').value,
        content: document.getElementById('post-content').value,
        author: document.getElementById('post-author').value
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add post');
        }
        
        // Clear form and reload posts
        newPostForm.reset();
        loadPosts();
    } catch (error) {
        console.error('Error adding post:', error);
        alert('Error adding post. Please try again.');
    }
});

// Function to delete post
async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            
            loadPosts();
            postDetail.innerHTML = '<p>Select a post to view details</p>';
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post. Please try again.');
        }
    }
}