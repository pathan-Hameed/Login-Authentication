// Sample JS for dashboard dynamic content
const totalUser = document.getElementById("totalUsers");
const logoutBtn = document.getElementById("logoutBtn");


const authGetAllUser = async (req, res) => {
    const token = localStorage.getItem('token');
    
    res = await fetch('http://localhost:3000/auth/allUsers', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json();
    totalUser.innerText = data.users.length;
}

authGetAllUser()

// LOGOUT 
logoutBtn.addEventListener("click", () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem("token");  
    window.location.href = "index.html";  
})



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