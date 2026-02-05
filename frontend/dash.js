// Sample JS for dashboard dynamic content

// Display username after login (you can store it in localStorage after login)
const usernameDisplay = document.getElementById('usernameDisplay');
const storedUser = localStorage.getItem('username') || "User";
usernameDisplay.textContent = storedUser;

// Sample dynamic numbers
document.getElementById('totalUsers').textContent = 125;
document.getElementById('activeSessions').textContent = 8;
document.getElementById('newMessages').textContent = 5;
document.getElementById('notifications').textContent = 3;

// Logout button functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('username'); // clear login
    alert('You have been logged out.');
    window.location.href = 'index.html'; // redirect to login page
});


// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('.sidebar');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Optional: hide sidebar when clicking a link
document.querySelectorAll('.sidebar .nav-links li').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});