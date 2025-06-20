// Base API URL
const API_URL = 'http://localhost:3000/posts';

// DOM Elements
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const editPostForm = document.getElementById('edit-post-form');
const editForm = document.getElementById('edit-form');
const cancelEditBtn = document.getElementById('cancel-edit');

// Current post being edited
let currentEditPostId = null;

// Main function that runs when DOM loads
function main() {
    displayPosts();
    addNewPostListener();
    addEditPostListener();
    addCancelEditListener();
}

// Display all posts
async function displayPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        
        postList.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `<strong>${post.title}</strong>`;
            postElement.dataset.id = post.id;
            
            postElement.addEventListener('click', () => handlePostClick(post.id));
            postList.appendChild(postElement);
        });

        // Show first post by default
        if (posts.length > 0) {
            handlePostClick(posts[0].id);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        postList.innerHTML = '<p>Error loading posts. Please try again.</p>';
    }
}

// Handle post click to show details
async function handlePostClick(postId) {
    try {
        const response = await fetch(`${API_URL}/${postId}`);
        const post = await response.json();
        
        postDetail.innerHTML = `
            <h3>${post.title}</h3>
            <p>By: ${post.author}</p>
            <div class="post-content">${post.content}</div>
            <button id="edit-post-btn">Edit</button>
            <button id="delete-post-btn">Delete</button>
        `;
        
        // Add event listeners for edit and delete buttons
        document.getElementById('edit-post-btn').addEventListener('click', () => showEditForm(post));
        document.getElementById('delete-post-btn').addEventListener('click', () => deletePost(post.id));
    } catch (error) {
        console.error('Error fetching post details:', error);
        postDetail.innerHTML = '<p>Error loading post details.</p>';
    }
}

// Show edit form with post data
function showEditForm(post) {
    currentEditPostId = post.id;
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    editPostForm.classList.remove('hidden');
}

// Add listener for new post form
function addNewPostListener() {
    newPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('new-title').value,
            content: document.getElementById('new-content').value,
            author: document.getElementById('new-author').value
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
            
            if (response.ok) {
                newPostForm.reset();
                displayPosts();
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post. Please try again.');
        }
    });
}

// Add listener for edit post form
function addEditPostListener() {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const updatedPost = {
            title: document.getElementById('edit-title').value,
            content: document.getElementById('edit-content').value
        };
        
        try {
            const response = await fetch(`${API_URL}/${currentEditPostId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });
            
            if (response.ok) {
                editPostForm.classList.add('hidden');
                displayPosts();
                handlePostClick(currentEditPostId);
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Error updating post. Please try again.');
        }
    });
}

// Add listener for cancel edit button
function addCancelEditListener() {
    cancelEditBtn.addEventListener('click', () => {
        editPostForm.classList.add('hidden');
    });
}

// Delete a post
async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                displayPosts();
                postDetail.innerHTML = '<p>Select a post to view details</p>';
                editPostForm.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post. Please try again.');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', main);